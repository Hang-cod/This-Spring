from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
import uuid

# ✅ 실제 모델 말고 가짜 이미지 리턴용 함수
from fake_inpainting import inpaint_image  # 함수 1개만 사용

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
RESULT_DIR = "results"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

@app.post("/api/inpaint")
async def inpaint_route(
    image: UploadFile = File(...),
    mask: UploadFile = File(...)
):
    try:
        # 파일 저장
        image_filename = f"{uuid.uuid4().hex}_{image.filename}"
        mask_filename = f"{uuid.uuid4().hex}_{mask.filename}"

        image_path = os.path.join(UPLOAD_DIR, image_filename)
        mask_path = os.path.join(UPLOAD_DIR, mask_filename)

        with open(image_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
        with open(mask_path, "wb") as f:
            shutil.copyfileobj(mask.file, f)

        # 🟢 가짜 inpainting 실행 → 그냥 복사본 or 디폴트 이미지
        result_path = inpaint_image(image_path, mask_path)  # 이 함수 안에서 copy or dummy 생성

        fake_diff_box = {"x": 100, "y": 100, "width": 50, "height": 50}

        return JSONResponse({
            "original": f"/{image_path}",
            "modified": f"/{result_path}",
            "diffBox": fake_diff_box
        })

    except Exception as e:
        print("❌ 에러 발생:", str(e))
        return JSONResponse({"error": str(e)}, status_code=500)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/results", StaticFiles(directory="results"), name="results")
