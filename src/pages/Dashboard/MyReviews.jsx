import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { useState } from "react";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedReview, setSelectedReview] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-reviews?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire({
        title: "Deleted!",
        text: "Your review has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, rating, comment }) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        rating,
        comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      setSelectedReview(null);
      toast.success("Review updated successfully");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-8">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 shadow-lg p-5 mx-4 sm:mx-0"
            >
              <h3 className="text-xl font-semibold">{review.mealName}</h3>

              <p>⭐ Rating: {review.rating}</p>
              <p className="mt-2">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(review.date).toLocaleDateString()}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>

                <button
                  onClick={() => setSelectedReview(review)}
                  className="btn btn-info btn-sm"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReview && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Review</h3>

            <input
              type="number"
              min="1"
              max="5"
              defaultValue={selectedReview.rating}
              className="input input-bordered w-full mb-3"
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  rating: Number(e.target.value),
                })
              }
            />

            <textarea
              defaultValue={selectedReview.comment}
              className="textarea textarea-bordered w-full"
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  comment: e.target.value,
                })
              }
            ></textarea>

            <div className="modal-action">
              <button
                onClick={() =>
                  updateMutation.mutate({
                    id: selectedReview._id,
                    rating: selectedReview.rating,
                    comment: selectedReview.comment,
                  })
                }
                className="btn btn-success"
              >
                Update
              </button>

              <button onClick={() => setSelectedReview(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyReviews;
