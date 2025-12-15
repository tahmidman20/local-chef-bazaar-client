import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const OrderNow = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // load meal data
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["orderMeal", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals/${id}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch("quantity") || 1;
  const totalPrice = (meal.price * quantity).toFixed(2);

  if (isLoading) return <Loader></Loader>;

  const onSubmit = async (data) => {
    const orderData = {
      mealId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity: Number(data.quantity),
      totalPrice: Number(totalPrice),
      chefId: meal.chefId,
      chefName: meal.chefName,
      userEmail: user.email,
      userAddress: data.userAddress,
      orderStatus: "pending",
      orderTime: new Date(),
    };

    const result = await Swal.fire({
      title: "Confirm Order?",
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // backend call
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData);

      Swal.fire("Success!", "Your order has been placed.", "success");
      navigate("/dashboard/my-orders");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Confirm Your Order
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Meal Name */}
        <div>
          <label className="label">Meal Name</label>
          <input
            value={meal.foodName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price (per item)</label>
          <input
            value={`$${meal.price}`}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="label">Quantity</label>
          <input
            type="number"
            min="1"
            {...register("quantity", { required: true, min: 1 })}
            className="input input-bordered w-full"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">Quantity is required</p>
          )}
        </div>

        {/* Chef ID */}
        <div>
          <label className="label">Chef ID</label>
          <input
            value={meal.chefId}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="label">Your Email</label>
          <input
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Total Price */}
        <div>
          <label className="label">Total Price</label>
          <input
            value={`$${totalPrice}`}
            readOnly
            className="input input-bordered w-full font-bold text-secondary"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="label">Delivery Address</label>
          <textarea
            {...register("userAddress", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Enter your delivery address"
          ></textarea>
          {errors.userAddress && (
            <p className="text-red-500 text-sm">Address is required</p>
          )}
        </div>

        <button className="btn btn-secondary md:col-span-2 text-lg">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderNow;
