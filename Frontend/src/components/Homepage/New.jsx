// New.js
import React, { useEffect, useRef, useState } from 'react';
import './New.css';
import pc from  'D:/ECOSYNC/Frontend/src/assets/pc.png'

const New = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false); // Reset visibility when it goes out of view
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.6 // Trigger when 10% of the element is visible
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div className="container" ref={ref}>
            <div className="image-container">
                <img
                    className="img-css"
                    src={pc}
                    alt="Gaming Character"
                />
            </div>
            <div className={`text-container ${isVisible ? 'fade-in' : ''}`}>
                <h2>Learn Through Play</h2>
                <p>Uncover the mysteries of our world by embarking on an adventure through gameplay</p>
            </div>
        </div>
    );
};

export default New;
