import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star, Clock, ChefHat, Info, Heart, ShoppingBag, ShieldAlert } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import AddReview from "./AddReview ";
import ThisMealReviews from "./ThisMealReviews";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useDbUser from "../../hooks/useDbUser";
import LoadingButton from "../../components/loading/LoadingButton";
import { motion } from "framer-motion";

const DetailSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6 mt-10 space-y-8">
    <div className="bg-gray-200 aspect-video w-full rounded-[2.5rem] animate-pulse" />
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-10 bg-gray-200 w-1/2 rounded-full animate-pulse" />
        <div className="h-10 bg-gray-200 w-24 rounded-full animate-pulse" />
      </div>
      <div className="h-6 bg-gray-200 w-32 rounded-full animate-pulse" />
      <div className="h-32 bg-gray-200 w-full rounded-[2rem] animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 bg-gray-200 rounded-[2rem] animate-pulse" />
        <div className="h-24 bg-gray-200 rounded-[2rem] animate-pulse" />
      </div>
    </div>
  </div>
);

const ViewMealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const dbUser = useDbUser();
  const [reviewRefetch, setReviewRefetch] = useState(null);
  const [isAddingFav, setIsAddingFav] = useState(false);

  const handleAddFavorite = async (meal) => {
    if (!user?.email) {
      Swal.fire({
        title: "Login Required",
        text: "Please login first to add favorites.",
        icon: "warning",
        confirmButtonColor: "#FF6B35",
        background: "#FFF3E9",
      });
      return;
    }

    setIsAddingFav(true);
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
          confirmButtonColor: "#FF6B35",
          background: "#FFF3E9",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Meal added to favorites successfully",
          timer: 1500,
          showConfirmButton: false,
          background: "#FFF3E9",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingFav(false);
    }
  };

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals/${id}`);
      return result.data;
    },
  });

  if (isLoading) return <DetailSkeleton />;

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

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl shadow-orange-900/5 rounded-[3rem] overflow-hidden border border-border-base/50">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-full">
              <img src={image} alt={foodName} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="font-bold text-dark">{rating}/5.0</span>
              </div>
            </div>

            <div className="p-8 lg:p-12 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold text-dark leading-tight">{foodName}</h1>
                  <span className="text-3xl font-bold text-primary">${price}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{estimatedDeliveryTime} mins delivery time</span>
                </div>
              </div>

              {/* Chef Info Card */}
              <div className="bg-secondary/40 p-6 rounded-[2rem] border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark">Meet the Chef</h3>
                    <p className="text-sm text-text-secondary font-medium">{chefName}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                  <span className="px-3 py-1 bg-white rounded-full">Exp: {chefExperience}</span>
                  <span className="px-3 py-1 bg-white rounded-full">ID: {chefId}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-dark">
                  <Info className="w-5 h-5 text-primary" />
                  Ingredients & Story
                </h3>
                <p className="text-text-secondary leading-relaxed bg-soft-bg p-5 rounded-2xl border border-border-base/30 italic">
                  "{ingredients}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {dbUser?.status === "fraud" ? (
                  <div className="col-span-2 flex items-center justify-center gap-2 p-4 bg-danger/10 text-danger rounded-full font-bold">
                    <ShieldAlert />
                    Account Restricted
                  </div>
                ) : (
                  <>
                    <LoadingButton
                      isLoading={isAddingFav}
                      onClick={() => handleAddFavorite(meal)}
                      variant="outline"
                      className="rounded-full h-14"
                    >
                      <Heart className={isAddingFav ? 'fill-danger stroke-danger' : ''} />
                      Add to Favorites
                    </LoadingButton>
                    <Link to={`/order-now/${meal._id}`}>
                      <LoadingButton
                        variant="primary"
                        className="rounded-full h-14 w-full"
                      >
                        <ShoppingBag />
                        Order Now
                      </LoadingButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ThisMealReviews
              meal={meal}
              setReviewRefetch={setReviewRefetch}
            />
          </div>
          <div>
            <AddReview meal={meal} refetchReviews={reviewRefetch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMealDetails;
