import React, { use } from "react";
import { Link } from "react-router";

const MealCard = ({ mealsPromise }) => {
  const mealsData = use(mealsPromise);
  console.log(mealsData);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-secondary">
        Daily Meals
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealsData.map((meal) => (
          <div
            key={meal.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meal.foodName}</h2>
              <p className="text-gray-600">
                Chef: {meal.chefName} (ID: {meal.chefId})
              </p>
              <p className="mt-2 font-bold">${meal.price.toFixed(2)}</p>
              <p>Rating: {meal.rating} ⭐</p>
              <p>Delivery Area: {meal.deliveryArea}</p>
              <Link
                to="/meal-details"
                className="mt-4 w-full btn btn-secondary text-white py-2 rounded hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCard;
