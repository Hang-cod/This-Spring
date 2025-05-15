import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface UserResponse {
    userId: number;
    nickname: string;
}

export const checkOrCreateUser = async (deviceId: string): Promise<UserResponse> => {
    const response = await axios.post<UserResponse>(`${API_BASE_URL}/api/users/check`, { deviceId });
    return response.data;
};
