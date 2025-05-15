import { useEffect } from 'react';
import { checkOrCreateUser } from '../api/userApi';

export const useInitUser = () => {
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) return;

        const deviceId = getOrCreateDeviceId();

        checkOrCreateUser(deviceId)
            .then((res) => {
                localStorage.setItem('userId', res.userId.toString());
                localStorage.setItem('nickname', res.nickname);
                console.log('[✅ 사용자 식별 완료]', res);
            })
            .catch((err) => {
                console.error('[❌ 사용자 식별 실패]', err);
            });
    }, []);
};

const getOrCreateDeviceId = (): string => {
    const key = 'deviceId';
    let id = localStorage.getItem(key);
    if (!id) {
        id = 'device-' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem(key, id);
    }
    return id;
};
