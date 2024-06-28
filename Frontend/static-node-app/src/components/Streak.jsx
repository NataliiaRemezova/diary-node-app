import { useState, useEffect } from 'react';
import { Image } from '@nextui-org/react';
import kingImage from '../assets/king.png';
import '../styles/Streak.css';

const Streak = () => {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/streak/get-streak', {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Error fetching streak');
                }
                const data = await response.json();
                setStreak(data.streak);
            } catch (error) {
                console.error('Error fetching streak:', error);
            }
        };

        fetchStreak();
    }, []);

    return (
        <div className="streakContainer">
            <div className="streakDisplay">
                <Image src={kingImage} alt="King Icon" />
                <div className="streakCount">
                    {streak > 0
                        ? `You have a streak of ${streak} day(s)! Great!`
                        : 'No streak yet. Start writing your diary!'}
                </div>
            </div>
        </div>
    );
};

export default Streak;
