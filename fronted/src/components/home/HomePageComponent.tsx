// 📁 src/components/home/HomePageComponent.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ChecklistItem {
    id: number;
    text: string;
    path: string;
    completed: boolean;
}

const HomePageComponent: React.FC = () => {
    const location = useLocation(); // ✅ 페이지 이동 감지
    const [items, setItems] = useState<ChecklistItem[]>([
        { id: 1, text: '카드 뒤집기', path: '/card-game', completed: false },
        { id: 2, text: '틀린 그림 찾기', path: '/spot-diff', completed: false },
        { id: 3, text: '그림 의미 서술', path: '/describe', completed: false },
    ]);

    // ✅ localStorage에 저장된 완료 상태를 반영
    useEffect(() => {
        const cardGameDone = localStorage.getItem('card-game-done') === 'true';
        const spotDiffDone = localStorage.getItem('spot-diff-done') === 'true';
        const describeDone = localStorage.getItem('describe-done') === 'true';

        setItems(prevItems =>
            prevItems.map(item => {
                if (item.text === '카드 뒤집기') return { ...item, completed: cardGameDone };
                if (item.text === '틀린 그림 찾기') return { ...item, completed: spotDiffDone };
                if (item.text === '그림 의미 서술') return { ...item, completed: describeDone };
                return item;
            })
        );
    }, [location]); // ✅ 페이지 들어올 때마다 최신 상태 반영

    // ✅ 경고 후 수동 체크 (카드, 틀린그림만)
    const confirmBeforeCheck = (id: number, text: string) => {
        const confirmed = window.confirm('정말 완료했나요? 다시 변경할 수 없어요!');
        if (!confirmed) return;

        // 체크 표시 상태 반영 및 저장
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, completed: true } : item
            )
        );

        // localStorage에 기록
        if (text === '카드 뒤집기') {
            localStorage.setItem('card-game-done', 'true');
        } else if (text === '틀린 그림 찾기') {
            localStorage.setItem('spot-diff-done', 'true');
        }
    };

    // 📅 날짜 포맷
    const formatDate = () => {
        const today = new Date();
        return today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

    return (
        <div className="min-h-screen px-4 py-8 max-w-md mx-auto bg-sakura-base">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-sakura-brown">
                {formatDate()}
            </h2>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-sakura-brown">
                    오늘의 활동
                </h3>

                <ul className="space-y-4">
                    {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between gap-3">
                            <label className="flex items-center gap-3 flex-1">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => {
                                        if (item.completed) return;
                                        if (item.text === '그림 의미 서술') return; // 자동 체크 항목은 클릭 막음
                                        confirmBeforeCheck(item.id, item.text);
                                    }}
                                    disabled={item.completed || item.text === '그림 의미 서술'}
                                    className="w-5 h-5 accent-red-500 rounded focus:ring-red-500"
                                />
                                <span
                                    className={`text-base sm:text-lg ${item.completed ? 'line-through text-gray-400' : 'text-sakura-brown'}`}
                                >
                                    {item.text}
                                </span>
                            </label>

                            <Link
                                to={item.path}
                                className="text-sm px-3 py-1 bg-cherry DEFAULT text-white rounded-md hover:bg-cherry-dark transition-colors"
                            >
                                이동
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePageComponent;
