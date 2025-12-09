import React from "react";

const CustomerReviews = () => {
  const reviews = [
    {
      _id: 3,
      reviewerName: "Saraf Ali",
      reviewerImage: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "customer Review ",
      createdAt: "12/04/2025",
    },
    {
      _id: 3,
      reviewerName: "Mokkel; Miah",
      reviewerImage: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "customer Review ",
      createdAt: "23/12/2025",
    },
    {
      _id: 3,
      reviewerName: "Hanif Ali",
      reviewerImage: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "customer Review ",
      createdAt: "12/04/2025",
    },
  ];

  return (
    <div className="review-section my-8 p-6 bg-gray-50 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {review.reviewerName}
                </h3>
                <p className="text-gray-500 text-sm">{review.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
