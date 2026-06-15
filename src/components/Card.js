import React, { useState } from 'react';
import './Card.css';

function Card({ painting }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                className="card-image" 
                src={painting.image} 
                alt={painting.title}
                loading="lazy"
            />
            <div className="card-footer">
                <div className='vertical-line'></div>
                <div className="card-info">
                    <div className={`card-info-normal ${isHovered ? 'hidden' : ''}`}>
                        <div className={`card-title ${painting.titleColor === 'white' ? 'card-title-white' : ''}`}>
                            {painting.title}
                        </div>
                        <div className="card-year">{painting.year}</div>
                    </div>
                    <div className={`card-info-hover ${isHovered ? 'visible' : ''}`}>
                        <div className="card-title">JEAN-HONORE FRAGONARD</div>
                        <div className="card-year">LOUVRE MUSEUM</div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Card;