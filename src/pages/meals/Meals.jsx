import React, { useState } from "react";
import MealCard from "./MealCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { FoodCardSkeleton } from "../../components/loading/SkeletonLoaders";
import EmptyState from "../../components/loading/EmptyState";

const ITEMS_PER_PAGE = 9;

const Meals = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["meals", currentPage, sortOrder],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/meals?page=${currentPage}&limit=${ITEMS_PER_PAGE}&sort=${sortOrder}`
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const meals = data?.meals || [];
  const totalMeals = data?.totalMeals || 0;
  const totalPages = Math.ceil(totalMeals / ITEMS_PER_PAGE);

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="heading-section text-dark mb-4">
          Explore Our <span className="text-primary">Delicious Bazaar</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Discover a world of local flavors prepared by passionate chefs right in your neighborhood.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <p className="text-text-secondary">
          Showing <span className="text-dark font-semibold">{meals.length}</span> of <span className="text-dark font-semibold">{totalMeals}</span> meals
        </p>
        
        <select
          className="select select-bordered rounded-full px-6 bg-white border-border-base focus:border-primary focus:ring-1 focus:ring-primary/20"
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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <FoodCardSkeleton key={i} />
          ))}
        </div>
      ) : meals.length > 0 ? (
        <>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-3">
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                    currentPage === page 
                      ? "bg-primary text-white shadow-lg shadow-primary/30" 
                      : "bg-white text-text-secondary hover:bg-secondary border border-border-base"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <EmptyState 
          title="No Meals Found" 
          message="We couldn't find any meals matching your criteria. Try different sorting or check back later!"
          actionText="Clear Filters"
          onClickAction={() => {
            setSortOrder("");
            setCurrentPage(0);
          }}
        />
      )}
    </div>
  );
};

export default Meals;
