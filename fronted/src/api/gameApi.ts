// 📁 src/api/gameApi.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const saveGameResult = async (userId: number, gameType: 'CARD' | 'SPOTDIFF', wrongCount: number) => {
    return axios.post(`${API_BASE_URL}/api/games/save`, {
        userId,
        gameType,
        wrongCount,
        date: new Date().toISOString().split('T')[0]
    });
};
