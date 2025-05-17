// 📁 src/hooks/useUserInfo.ts
import { useEffect, useState } from 'react';
import { getUser } from '@/api/userApi';


export const useUserInfo = (userId: number) => {
    const [nickname, setNickname] = useState<string>('');

    useEffect(() => {
        if (!userId) return;
        getUser(userId).then(user => {
            setNickname(user.nickname);
        });
    }, [userId]);

    return { nickname };
};