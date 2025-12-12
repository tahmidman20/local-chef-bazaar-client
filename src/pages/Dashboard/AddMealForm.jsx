import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utlis";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const AddMealForm = () => {
  const { user } = useAuth();

  //useMutation hooks
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/meals`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Meal added successfully");
      mutationReset();
      //query key
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("post this data", payload);
    },
    retry: 3,
  });

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      foodName,
      chefName,
      chefExperience,
      chefId,
      estimatedDeliveryTime,
      ingredients,
      price,
      rating,
      userEmail,
      foodImage,
    } = data;
    const imageFile = foodImage[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      const mealData = {
        image: imageUrl,
        foodName,
        chefName,
        chefExperience,
        chefId,
        estimatedDeliveryTime,
        ingredients,
        price: Number(price),
        rating: Number(rating),
        userEmail,
      };

      await mutateAsync(mealData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  if (isPending) return <Loader></Loader>;
  if (isError) return <p>Error 404</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Meal
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Food Name */}
        <div>
          <input
            type="text"
            {...register("foodName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Food Name"
          />
          {errors.foodName && (
            <p className="text-red-500 text-sm">Food name is required</p>
          )}
        </div>

        {/* Chef Name */}
        <div>
          <input
            type="text"
            {...register("chefName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Chef Name"
          />
          {errors.chefName && (
            <p className="text-red-500 text-sm">Chef name is required</p>
          )}
        </div>

        {/* Food Image */}
        <div className="md:col-span-2">
          <input
            type="file"
            accept="image/*"
            {...register("foodImage", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.foodImage && (
            <p className="text-red-500 text-sm">Food image is required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
            placeholder="Price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Price is required</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            {...register("rating", { required: true })}
            className="input input-bordered w-full"
            placeholder="Rating (0 - 5)"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">Rating is required</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="md:col-span-2">
          <textarea
            {...register("ingredients", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Ingredients (comma separated)"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm">Ingredients are required</p>
          )}
        </div>

        {/* Estimated Delivery Time */}
        <div>
          <input
            type="text"
            {...register("estimatedDeliveryTime", { required: true })}
            className="input input-bordered w-full"
            placeholder="Estimated Delivery Time"
          />
          {errors.estimatedDeliveryTime && (
            <p className="text-red-500 text-sm">
              Estimated delivery time is required
            </p>
          )}
        </div>

        {/* Chef Experience */}
        <div>
          <textarea
            {...register("chefExperience", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Chef Experience"
          ></textarea>
          {errors.chefExperience && (
            <p className="text-red-500 text-sm">Chef experience is required</p>
          )}
        </div>

        {/* Chef ID */}
        <div>
          <input
            type="text"
            {...register("chefId", { required: true })}
            className="input input-bordered w-full"
            placeholder="Chef ID"
          />
          {errors.chefId && (
            <p className="text-red-500 text-sm">Chef ID is required</p>
          )}
        </div>

        {/* User Email */}
        <div>
          <input
            type="email"
            value={user?.email}
            readOnly
            {...register("userEmail")}
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-secondary w-full md:col-span-2 mt-4">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;
