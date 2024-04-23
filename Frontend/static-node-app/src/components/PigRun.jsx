import React, { useState, useEffect } from 'react';
import '../styles/PigRun.css';
function PigRun() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImage = async (index) => {
            try {
                const imageModule = await import(`../assets/pigRun${index}.png`);
                const imageUrl = imageModule.default;
                setImages((prevImages) => [...prevImages, imageUrl]);
            } catch (error) {
                console.error('Fehler beim Laden des Bildes:', error);
            }
        };

        // Lade alle Bilder
        const loadImages = async () => {
            for (let i = 0; i < 4; i++) {
                await loadImage(i);
            }
        };
        loadImages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pigdiv">
            <img src={images[currentImageIndex]} alt={`Schwein Bild ${currentImageIndex}`} className="PigRun" />
        </div>
    );
}

export default PigRun;
