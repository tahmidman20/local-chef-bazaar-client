import React from "react";
import { BsQuote } from "react-icons/bs";

const ReviewCard = ({ review }) => {
  const { name, rating, text, location, photoURL } = review;

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => (
      <span
        key={i}
        className={
          i < rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"
        }
      >
        ★
      </span>
    ));
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div className="text-4xl text-cyan-600 mb-4">
          <BsQuote />
        </div>

        <p className="text-gray-700 text-base mb-6 leading-relaxed">“{text}”</p>

        <hr className="border-t-2 border-dashed border-gray-300 my-6" />

        <div className="flex items-center space-x-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-600">
              <img
                src={photoURL || "https://i.ibb.co/0VZ8VHt/default-avatar.png"}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-gray-800">{name}</div>
            <div className="text-sm text-gray-500">{location}</div>
            <div className="mt-1">{renderStars(rating)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
