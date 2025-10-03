import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { reviewerImage, reviewerName, reviewDate, ratingPoint, comments } = review;

  return (
    <div className="p-5 h-full border border-blue-200 rounded-xl shadow-lg text-gray-500 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex items-center mb-3">
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
      <p className="mb-2 font-semibold text-yellow-500 flex items-center gap-1"><FaStar></FaStar> {ratingPoint}</p>
      <p className="text-sm text-gray-600">{comments}</p>
    </div>
  );
};

export default ReviewCard;
