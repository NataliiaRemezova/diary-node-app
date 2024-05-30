import { Image } from '@nextui-org/react';
import kingImage from '../assets/king.png';
import '../styles/Streak.css';

const Streak = () => {


    return (
        <div className="streakContainer">
            <div className="streakDisplay">
                <Image src={kingImage} alt="King Icon" />
                <div className="streakCount"> day streak</div>
            </div>
        </div>
    );
};

export default Streak;
