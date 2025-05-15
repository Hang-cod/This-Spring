import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface EmotionRequest {
    userId: number;
    imageId: string;
    description: string;
    date: string; // '2025-05-15' 같은 포맷
}

export const saveEmotion = async (data: EmotionRequest) => {
    const response = await axios.post(`${API_BASE_URL}/api/emotion/save`, data);
    console.log(data, '데이터');
    return response.data;
};
