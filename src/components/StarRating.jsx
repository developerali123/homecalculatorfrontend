import React from 'react';
import { CiStar } from "react-icons/ci";

const StarRating = ({ rating }) => {
    return (
        <div style={{ display: 'flex' }}>
            {[...Array(5)].map((_, index) => (
                <CiStar key={index} size={30} style={{ color: index < rating ? 'gold' : 'gray' }} />
            ))}
        </div>
    );
};

export default StarRating