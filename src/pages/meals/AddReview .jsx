import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useDbUser from "../../hooks/useDbUser";

const AddReview = ({ meal, refetchReviews }) => {
  const { user } = useAuth();
  // console.log(meal);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const dbUser = useDbUser();

  const handleSubmitReview = async () => {
    if (!user) {
      return toast.error("Please login to give a review");
    }

    if (!comment.trim()) {
      return toast.error("Please write a comment");
    }

    const reviewData = {
      foodId: meal._id,
      mealName: meal.foodName,
      reviewerName: user.displayName || "Anonymous",
      userEmail: user.email,
      reviewerImage: user.photoURL || "",
      rating: Number(rating),
      comment: comment,
      date: new Date(),
    };
    console.log(reviewData);

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        reviewData
      );

      if (res.data?.insertedId) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
        refetchReviews();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-6 bg-base-200 rounded-xl">
      <h3 className="text-2xl font-bold mb-4">Give Review</h3>

      <label className="block mb-2 font-semibold">Rating</label>
      <select
        className="select select-bordered w-full mb-4"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Star
          </option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Comment</label>
      <textarea
        className="textarea textarea-bordered w-full mb-4"
        rows="4"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {dbUser?.status === "fraud" ? (
        <button disabled className="btn btn-error w-full">
          🚫 Fraud Account
        </button>
      ) : (
        <button
          onClick={handleSubmitReview}
          disabled={loading}
          className="btn btn-secondary hover:bg-blue-600 w-full"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      )}
    </div>
  );
};

export default AddReview;
