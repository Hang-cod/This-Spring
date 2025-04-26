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

// 틀린 그림 찾기 API 응답 타입
export const uploadImageForInpaint = async (file: File) => {
    const formData = new FormData();
    console.log(formData); // 디버깅용 콘솔 출력
    formData.append("file", file);

    const res = await axios.post<InpaintResponse>("http://localhost:8000/api/inpaint", formData, {
        // headers: { "Content-Type": "multipart/form-data" },
        // axios는 자동으로 Content-Type을 설정해줌
    });

    return res.data;
};
