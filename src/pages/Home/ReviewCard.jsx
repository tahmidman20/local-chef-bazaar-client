import React from "react";
import { BsQuote } from "react-icons/bs";
import { FiStar } from "react-icons/fi";

const ReviewCard = ({ review }) => {
  const { reviewerName, rating, comment, date, reviewerImage } = review;

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-border-base"
        }`}
      />
    ));
  };

  return (
    <div className="card-premium h-full flex flex-col group">
      <div className="text-4xl text-primary/20 group-hover:text-primary transition-colors mb-4">
        <BsQuote />
      </div>

      <p className="text-text-secondary text-base mb-6 leading-relaxed flex-1 italic">
        "{comment}"
      </p>

      <div className="pt-6 border-t border-border-base/50 mt-auto flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all shrink-0">
          <img
            src={reviewerImage || "https://i.ibb.co/Txy1pYZv/istockphoto-1130884625-612x612.jpg"}
            alt={reviewerName}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">
            {reviewerName}
          </h4>
          <div className="flex items-center gap-1 mt-1 mb-1">
            {renderStars(rating)}
          </div>
          <span className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
