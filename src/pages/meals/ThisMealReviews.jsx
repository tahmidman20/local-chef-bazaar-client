import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader";

const ThisMealReviews = ({ meal }) => {
  const foodId = meal._id;
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", foodId],
    enabled: !!foodId,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews/${foodId}`
      );
      return res.data;
    },
  });
  refetch();

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Customer Reviews ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews for this meal yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="p-5 rounded-lg bg-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.reviewerImage}
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-yellow-500 font-medium">
                ⭐ {review.rating} / 5
              </p>

              <p className="mt-1 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThisMealReviews;
