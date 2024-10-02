// New.js
import React, { useEffect, useRef, useState } from 'react';
import './New.css';

const New2 = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1 // Trigger when 10% of the element is visible
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
            
            <div className={`text-container ${isVisible ? 'fade-in' : ''}`}>
                <h2>Interactive Global Map</h2>
                <p>Uncover the mysteries of our world by embarking on an adventure through gameplay</p>
            </div>
            <div className="image-container">
                
                <video className="img-css" autoPlay loop muted>
                    <source src="https://earth.gov/ghgcenter/earth-gas.83289921.mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default New2;
