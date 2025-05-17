// 📁 src/pages/UserStatsPage.tsx
import React from 'react';
import CalendarStatsView from '@/components/userstat/CalendarStatsView';
import UserStatsHeader from '@/components/userstat/UserStatsHeader';
import { useUserInfo } from '@/hooks/useUserInfo';

const UserStatsPage: React.FC = () => {
    const userId = Number(localStorage.getItem('user-id'));
    const { nickname } = useUserInfo(userId);

    return (
        <div className= "p-6 min-h-screen bg-sakura-base" >
        <UserStatsHeader nickname={ nickname } />
            < CalendarStatsView userId = { userId } />
                </div>
    );
};

export default UserStatsPage;