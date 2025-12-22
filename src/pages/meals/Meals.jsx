import React, { useState } from "react";
import MealCard from "./MealCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader";

const ITEMS_PER_PAGE = 9;

const Meals = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["meals", currentPage, sortOrder],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/meals?page=${currentPage}&limit=${ITEMS_PER_PAGE}&sort=${sortOrder}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;

  const meals = data?.meals || [];
  const totalMeals = data?.totalMeals || 0;
  const totalPages = Math.ceil(totalMeals / ITEMS_PER_PAGE);

  return (
    <div className="bg-base-200 py-8">
      <h1 className="text-3xl font-bold text-center text-secondary mb-6">
        All Meals
      </h1>

      <div className="flex justify-end px-6 mb-4">
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(0);
          }}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${
              currentPage === page ? "btn-secondary" : "btn-outline"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Meals;
