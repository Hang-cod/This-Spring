from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from fake_inpainting import make_fake_difference

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
    original_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(original_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result_path = os.path.join(RESULT_DIR, f"modified_{file.filename}")
    diff_box = make_fake_difference(original_path, result_path)

    return JSONResponse({
        "original": f"/{original_path}",
        "modified": f"/{result_path}",
        "diffBox": diff_box
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
