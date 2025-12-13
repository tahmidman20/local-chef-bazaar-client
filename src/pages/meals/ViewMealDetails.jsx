// import React from "react";

// const ViewMealDetails = () => {
//   return (
//     <div>
//       <h1 className="text-3xl">Welcome to Details page</h1>
//     </div>
//   );
// };

// export default ViewMealDetails;

import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
// import { useLoaderData, Link } from "react-router";

const ViewMealDetails = () => {
  // const meal = useLoaderData(); // যদি React Router Loader ব্যবহার করো

  // const {
  //   foodName,
  //   image,
  //   chefName,
  //   chefExperience,
  //   ingredients,
  //   estimatedDeliveryTime,
  //   rating,
  //   price,
  //   deliveryArea,
  // } = meal || {};

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image */}
        <img
          src="https://i.ibb.co.com/vvQ2Pf2n/Beef-Steak-with-Garlic-Butter.jpg"
          alt=""
          className="w-full h-80 object-cover"
        />

        <div className="p-8">
          {/* Title + Price */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-800">foodName</h1>
            <p className="text-2xl font-semibold text-secondary">$price</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <Star className="text-yellow-400 fill-yellow-400" size={22} />
            <span className="font-semibold text-gray-700">rating/5</span>
          </div>

          {/* Chef Info */}
          <div className="mt-6 bg-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Chef Information
            </h2>
            <p>
              <span className="font-bold">Chef Name:</span> chefName
            </p>
            <p>
              <span className="font-bold">Experience:</span> chefExperience
            </p>
          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
            <ul className="list-disc ml-6 text-gray-700 mt-2">
              <li className="mt-1">item.trim</li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 bg-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Delivery Information
            </h2>
            <p>
              <span className="font-bold">Delivery Time:</span>{" "}
              estimatedDeliveryTime
            </p>
            <p>
              <span className="font-bold">Delivery Area:</span> deliveryArea
            </p>
          </div>

          {/* Button */}
          <div className="mt-8 text-center">
            <Link to="/meals">
              <button className="btn btn-secondary px-8 text-lg">
                Back to Meals
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMealDetails;
