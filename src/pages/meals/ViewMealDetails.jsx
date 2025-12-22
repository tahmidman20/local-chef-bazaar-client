import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import Loader from "../../components/Loader";
import AddReview from "./AddReview ";
import ThisMealReviews from "./ThisMealReviews";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useDbUser from "../../hooks/useDbUser";

const ViewMealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const dbUser = useDbUser();
  const [reviewRefetch, setReviewRefetch] = useState(null);
  const handleAddFavorite = async (meal) => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login first", "warning");
      return;
    }

    const favoriteData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/favorites`,
        favoriteData
      );

      if (res.data.message === "Already added to favorites") {
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This meal is already in your favorites",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Meal added to favorites ",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user);
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals/${id}`);
      return result.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  const {
    image,
    foodName,
    chefName,
    chefId,
    chefExperience,
    ingredients,
    price,
    rating,
    estimatedDeliveryTime,
  } = meal;
  console.log(meal);
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img src={image} alt="" className="w-full h-80 object-cover" />

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{foodName}</h1>
            <p className="text-2xl font-semibold text-secondary">${price}</p>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Star className="text-yellow-400 fill-yellow-400" size={22} />
            <span className="font-semibold text-gray-700">{rating}/5</span>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Chef Information
            </h2>
            <p>
              <span className="font-bold">Chef Name:</span>
              {chefName}
            </p>
            <p>
              <span className="font-bold">Chef Id:</span>
              {chefId}
            </p>
            <p>
              <span className="font-bold">Experience:</span> {chefExperience}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
            <ul className="list-disc ml-6 text-gray-700 mt-2">
              <li className="mt-1">{ingredients}</li>
            </ul>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Delivery Information
            </h2>
            <p>
              <span className="font-bold">Delivery Time:</span>{" "}
              {estimatedDeliveryTime}
            </p>
            <p>
              <span className="font-bold">Delivery Area:</span>{" "}
              {dbUser?.address || "N/A"}
            </p>
          </div>

          <div className="mt-8 text-center">
            {dbUser?.status === "fraud" ? (
              <button disabled className="btn btn-error w-full  mb-2">
                🚫Fraud Account
              </button>
            ) : (
              <button
                onClick={() => handleAddFavorite(meal)}
                className="btn btn-outline btn-error w-full mt-3"
              >
                ❤️ Add to Favorite
              </button>
            )}
            {dbUser?.status === "fraud" ? (
              <button disabled className="btn btn-error w-full">
                🚫 Fraud Account
              </button>
            ) : (
              <Link to={`/order-now/${meal._id}`}>
                <button className="btn btn-outline px-8 w-full hover:bg-secondary hover:text-amber-50 mt-4 text-md">
                  Order Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ThisMealReviews
        meal={meal}
        setReviewRefetch={setReviewRefetch}
      ></ThisMealReviews>
      <AddReview meal={meal} refetchReviews={reviewRefetch}></AddReview>
    </div>
  );
};

export default ViewMealDetails;
