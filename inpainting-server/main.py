from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
import uuid

# LaMa 실제 모델 함수 임포트
from real_inpainting import (
    load_image_into_tensor,
    load_mask_into_tensor,
    inpaint_image,
    save_result_image
)

app = FastAPI()

# CORS 허용
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

# ✅ /api/inpaint: 진짜 AI 모델 적용 버전
@app.post("/api/inpaint")
async def inpaint_route(
    image: UploadFile = File(...),
    mask: UploadFile = File(...)
):
    try:
        # 원본 파일 저장
        image_filename = f"{uuid.uuid4().hex}_{image.filename}"
        mask_filename = f"{uuid.uuid4().hex}_{mask.filename}"

        image_path = os.path.join(UPLOAD_DIR, image_filename)
        mask_path = os.path.join(UPLOAD_DIR, mask_filename)

        with open(image_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
        with open(mask_path, "wb") as f:
            shutil.copyfileobj(mask.file, f)

        # 텐서 변환
        image.file.seek(0)
        mask.file.seek(0)
        image_tensor = load_image_into_tensor(image)
        mask_tensor = load_mask_into_tensor(mask)

        # AI Inpainting 실행
        result_np = inpaint_image(image_tensor, mask_tensor)

        # 결과 저장
        result_path = save_result_image(result_np, output_dir=RESULT_DIR)

        #  diffBox는 아직 fake 처리 (필요시 LaMa 결과 기반으로 설정)
        fake_diff_box = { "x": 100, "y": 100, "width": 50, "height": 50 }

        return JSONResponse({
            "original": f"/{image_path}",
            "modified": f"/{result_path}",
            "diffBox": fake_diff_box
        })

    except Exception as e:
        print("❌ 에러 발생:", str(e))
        return JSONResponse({"error": str(e)}, status_code=500)

# 정적 파일 경로 설정
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/results", StaticFiles(directory="results"), name="results")

# 실행용 코드
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
