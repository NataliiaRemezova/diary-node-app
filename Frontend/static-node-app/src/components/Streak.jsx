import { useState, useEffect } from 'react';
import { Image } from '@nextui-org/react';
import kingImage from '../assets/king.png';
import sleepImage from '../assets/pigSleep.png';
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
                <div className="streakCount">
                    {streak > 0 ?
                        ( <div className="contentWrapper">
                                <Image src={kingImage} alt="Sleep" className="streakImg"/>
                                <p> You have a streak of {streak} day(s)! Great! </p>
                        </div>
                        ):(
                            <div className="contentWrapper">
                                <Image src={sleepImage} alt="King Icon"  className="streakImg"/>
                                <p>No streak yet. Start writing your diary!</p>
                            </div>)}
                </div>
            </div>
        </div>
    );
};

export default Streak;
