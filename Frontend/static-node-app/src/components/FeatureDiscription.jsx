import {useEffect, useRef, useState} from "react";
import '../styles/FeatureDiscription.css';
import Book from  '../assets/book.png';
import Note from '../assets/note.png';
import {Image} from "@nextui-org/react";
function FeatureDiscription(){
    const [animateFeature1, setAnimateFeature1] = useState(false);
    const [animateFeature2, setAnimateFeature2] = useState(false);
    const [animateFeature3, setAnimateFeature3] = useState(false);
    const featureRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (featureRef.current && !featureRef.current.contains(event.target)) {
                setAnimateFeature1(false);
                setAnimateFeature2(false);
                setAnimateFeature3(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleFeatureClick = (feature) => {
        // Reset all feature animations
        setAnimateFeature1(false);
        setAnimateFeature2(false);
        setAnimateFeature3(false);

        // Set animation for the clicked feature
        switch (feature) {
            case 1:
                setAnimateFeature1(true);
                break;
            case 2:
                setAnimateFeature2(true);
                break;
            case 3:
                setAnimateFeature3(true);
                break;
            default:
                break;
        }
    };

    return (
        <div className="feature">
            <div
                className={`blockFeature ${
                    animateFeature1 ? 'animateExpand' : 'animateShrink'
                }`}
                onClick={() => handleFeatureClick(1)}
            >
                <Image src={Book} className="featureImage"/>
            </div>
            <div
                className={`blockFeature ${
                    animateFeature2 ? 'animateExpand' : 'animateShrink'
                }`}
                onClick={() => handleFeatureClick(2)}
            >
                <Image src={Note} className="featureImage"/>
            </div>
            <div
                className={`blockFeature ${
                    animateFeature3 ? 'animateExpand' : 'animateShrink'
                }`}
                onClick={() => handleFeatureClick(3)}
            >
                feature 3
            </div>
        </div>
    );
}

export default FeatureDiscription;