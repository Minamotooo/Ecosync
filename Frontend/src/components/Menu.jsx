import React, { useState } from 'react';
import './Menu.css';

export default function Menu() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`menu ${isHovered ? 'hover-bg' : ''}`}
        >
            <div className="menu-body">
                <div className="title">
                    <div className="element">
                        <span>1.</span>
                        <h3 
                            className="hollow"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            
                            SEA LEVEL
                        </h3>
                    </div>
                    <div className="element">
                        <span>2.</span>
                        <h3 
                            className='hollow'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            WILDFIRE
                        </h3>
                    </div>
                </div>
                <div className="title">
                    <div className="element">
                        <span>3.</span>
                        <h3 
                            className="hollow"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            DROUGHT
                        </h3>
                    </div>
                    <div className="element">
                        <span>4.</span>
                        <h3 
                            className='hollow'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            BIODIVERSITY
                        </h3>
                    </div>
                </div>
                <div className="title center">
                    <div className="element">
                        <span>5.</span>
                        <h3 
                            className="hollow"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                           GLOBAL WARMING
                        </h3>
                    </div>
                </div>
            </div>
            <div className="menu-banner">
                <div className="team">BUET ASTRONOVA</div>
                <div className="project">Ecosync</div>
            </div>
        </div>
    );
}
