import axios from "axios";

//타입도 export해줘야됨
//틀린 영역 좌표 타입
export interface DiffBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface InpaintResponse {
    original: string;
    modified: string;
    diffBox: DiffBox;
}

export const uploadImageForInpaint = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post<InpaintResponse>("http://localhost:8000/api/inpaint", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};
