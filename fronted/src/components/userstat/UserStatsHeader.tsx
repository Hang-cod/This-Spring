// 📁 src/components/userstat/UserStatsHeader.tsx
import React from 'react';

interface Props {
    nickname: string;
}

const UserStatsHeader: React.FC<Props> = ({ nickname }) => {
    return (
        <h2 className= "text-2xl font-bold mb-4 text-sakura-brown" >
             { nickname }의 하루 기본 기록
        </h2>
    );
};
