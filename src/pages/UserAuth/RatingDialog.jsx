import React from 'react';
import StarRating from '../../components/StarRating';

const RatingDialog = ({ DialogData }) => {
    return (
        <div className="rating-dialog">
            <p>Overall Rating:</p>
            <StarRating rating={DialogData.rating} />
            <p>Professionalism: </p>
            <StarRating rating={DialogData.Professionalism} />
            <p>Punctuality: </p>
            <StarRating rating={DialogData.Punctuality} />
            <p>Service Quality: </p>
            <StarRating rating={DialogData.Servicequality} />
            <p>Treatment: </p>
            <StarRating rating={DialogData.Treatment} />
            <p>Price: </p>
            <StarRating rating={DialogData.Price} />
            <p>Satisfaction: </p>
            <StarRating rating={DialogData.satisfaction} />
        </div>
    );
};

export default RatingDialog;
