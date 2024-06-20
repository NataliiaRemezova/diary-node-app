import {useEffect, useRef, useState} from "react";
import '../styles/FeatureDiscription.css';
import Book from  '../assets/book.png';
import Note from '../assets/note.png';
import Pen from '../assets/pen.png';
import {Image, Spacer} from "@nextui-org/react";
function FeatureDiscription(){
    const [animateFeature1, setAnimateFeature1] = useState(false);
    const [animateFeature2, setAnimateFeature2] = useState(false);
    const [animateFeature3, setAnimateFeature3] = useState(false);
    const [timer1, setTimer1] = useState(null);
    const [timer2, setTimer2] = useState(null);
    const [timer3, setTimer3] = useState(null);
    const featureRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (featureRef.current && !featureRef.current.contains(event.target)) {
                resetAnimations();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const resetAnimations = () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        setAnimateFeature1(false);
        setAnimateFeature2(false);
        setAnimateFeature3(false);
    };

    const handleFeatureClick = (feature) => {
        resetAnimations();

        switch (feature) {
            case 1: {
                setAnimateFeature1(true);
                const timer1 = setTimeout(() => {
                    setAnimateFeature1(false);
                }, 6000);
                setTimer1(timer1);
                break;
            }
            case 2: {
                setAnimateFeature2(true);
                const timer2 = setTimeout(() => {
                    setAnimateFeature2(false);
                }, 6000);
                setTimer2(timer2);
                break;
            }
            case 3: {
                setAnimateFeature3(true);
                const timer3 = setTimeout(() => {
                    setAnimateFeature3(false);
                }, 6000);
                setTimer3(timer3);
                break;
            }
            default:
                break;
        }
    };


    return (
        <div className="feature">
            <div
                ref={featureRef}
                className={`blockFeature ${
                    animateFeature1 ? 'animateExpand' : animateFeature1 === null ? 'animateShrink' : 'animateShrink'
                }`}
                onClick={() => handleFeatureClick(1)}
            >
                {animateFeature1 ? (
                    <p>
                        Capture your thoughts and experiences daily with our intuitive journal feature, designed to help you reflect and grow.
                    </p>
                ):(
                    <div>
                        <Image src={Book} className="featureImage"/>
                        <Spacer y={3} />
                        <p className="pixelFont featureFont"> Diary</p>
                    </div>
                )}
            </div>
            <div
                ref={featureRef}
                className={`blockFeature ${
                    animateFeature2 ? 'animateExpand' : animateFeature2 === null ? 'animateShrink' : 'animateShrink'
                }`}
                onClick={() => handleFeatureClick(2)}
            >
                {animateFeature2 ? (
                    <p>
                        Stay on top of your goals with our habit tracker, making it easy to build and maintain positive routines.
                    </p>
                ):(
                    <div>
                        <Image src={Note} className="featureImage"/>
                        <Spacer y={3} />
                        <p className="pixelFont featureFont">Habit</p>
                    </div>
                    )}
            </div>
            <div
                ref={featureRef}
                className={`blockFeature ${
                    animateFeature3 ? 'animateExpand' : animateFeature3 === null ? 'animateShrink' : 'animateShrink'
                }`}
                onClick={() => handleFeatureClick(3)}
            >
                {animateFeature3 ? (
                    <p>
                        Organize your tasks efficiently with our to-do list, ensuring you never miss a deadline or important activity.
                    </p>
                ):(
                    <div>
                        <Image src={Pen} className="featureImage"/>
                        <Spacer y={3} />
                        <p className="featureFont">ToDo</p>
                    </div>
                    )}
            </div>
        </div>
    );
}

export default FeatureDiscription;