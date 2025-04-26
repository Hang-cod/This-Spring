from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from fake_inpainting import make_fake_difference
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# React 개발 환경용 CORS 허용
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
async def inpaint_image(file: UploadFile = File(...)):
    try:
        print("✅ 파일 수신 시작")
        original_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(original_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        print("✅ 파일 저장 완료")

        result_path = os.path.join(RESULT_DIR, f"modified_{file.filename}")
        diff_box = make_fake_difference(original_path, result_path)
        print("✅ 수정본 생성 완료")

        return JSONResponse({
            "original": f"/{original_path}",
            "modified": f"/{result_path}",
            "diffBox": diff_box
        })
    except Exception as e:
        print("❌ 에러 발생:", str(e))
        return JSONResponse({"error": str(e)}, status_code=500)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

# /uploads/..., /results/... 경로로 이미지를 가져올 수 있도록 설정
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/results", StaticFiles(directory="results"), name="results")


# //http://localhost:8000/docs 접속시 페이지 나오면 로직문제.
# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
