import sys
sys.path.append("C:/This-Spring-clean/lama-model")  # LAMA 모델 경로

import torch
import numpy as np
import cv2
from fastapi import UploadFile
from PIL import Image
from io import BytesIO
from saicinpainting.training.trainers import load_checkpoint
from saicinpainting.evaluation.utils import move_to_device
from omegaconf import OmegaConf
import uuid
import os

DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'

# config.yaml 경로와 weight 파일 경로
CONFIG_PATH = "C:/This-Spring-clean/lama-model/configs/big-lama.yaml"
WEIGHT_PATH = "C:/This-Spring-clean/lama-model/big-lama.pt"

# config 로드 후 checkpoint 로드
config = OmegaConf.load(CONFIG_PATH)
model = load_checkpoint(config, WEIGHT_PATH, strict=False, map_location=DEVICE)
model = model.to(DEVICE)
model.eval()

def load_image_into_tensor(image_file: UploadFile):
    image = Image.open(BytesIO(image_file.file.read())).convert("RGB")
    image_np = np.array(image).astype('float32') / 255.0
    image_tensor = torch.from_numpy(image_np).permute(2, 0, 1).unsqueeze(0)
    return image_tensor

def load_mask_into_tensor(mask_file: UploadFile):
    mask = Image.open(BytesIO(mask_file.file.read())).convert("L")
    mask_np = np.array(mask).astype('float32') / 255.0
    mask_tensor = torch.from_numpy(mask_np).unsqueeze(0).unsqueeze(0)
    return mask_tensor

def inpaint_image(image_tensor, mask_tensor):
    with torch.no_grad():
        batch = {
            'image': image_tensor.to(DEVICE),
            'mask': mask_tensor.to(DEVICE)
        }
        batch = move_to_device(batch, DEVICE)
        result = model(batch)['inpainted']
        result = result[0].permute(1, 2, 0).cpu().numpy()
        result = (result * 255).astype('uint8')
        return result

def save_result_image(result_np, output_dir="results"):
    os.makedirs(output_dir, exist_ok=True)
    filename = f"{uuid.uuid4().hex}.png"
    filepath = os.path.join(output_dir, filename)
    cv2.imwrite(filepath, cv2.cvtColor(result_np, cv2.COLOR_RGB2BGR))
    return filepath
