import React from "react";

const ReviewCard = ({ review }) => {
  const { reviewerImage, reviewerName, reviewDate, ratingPoint, comments } = review;

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md text-gray-800">
      <div className="flex items-center mb-2">
        <img
          src={reviewerImage}
          alt={reviewerName}
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h4 className="font-semibold">{reviewerName}</h4>
          <p className="text-xs text-gray-500">{new Date(reviewDate).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="mb-2 font-semibold">Rating: ⭐ {ratingPoint}</p>
      <p className="text-sm">{comments}</p>
    </div>
  );
};


export default ReviewCard;
