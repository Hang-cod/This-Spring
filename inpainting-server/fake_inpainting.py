from PIL import Image, ImageDraw
import random

def make_fake_difference(image_path: str, output_path: str):
    img = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(img)

    # 가짜로 바꾼 부분의 좌표 (x, y, width, height)
    x = random.randint(50, 200)
    y = random.randint(50, 150)
    w, h = 50, 50

    # 네모 박스로 덮기 (색 바꾸는 방식)
    draw.rectangle([x, y, x + w, y + h], fill="red")

    img.save(output_path)

    return {
        "x": x,
        "y": y,
        "width": w,
        "height": h
    }
