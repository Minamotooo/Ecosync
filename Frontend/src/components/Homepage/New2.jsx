// New.js
import React, { useEffect, useRef, useState } from 'react';
import './New2.css';

const New2 = () => {
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
            
            <div className={`text-container ${isVisible ? 'fade-in' : ''}`}>
                <h2>Interactive Global Map</h2>
                <p>Explore Earth's systems with our interactive globe, powered by a Machine Learning model to reveal ecosystem patterns.</p>
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
