import React from "react";
import MealCard from "./MealCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader";

// const mealsPromise = fetch("/mealsData.json").then((res) => res.json());

const Meals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });
  console.log(meals);

  if (isLoading) return <Loader></Loader>;
  return (
    <div>
      {meals && meals.length > 0 ? (
        <div className="bg-yellow-50">
          <h1 className="text-3xl font-bold mb-6 text-center text-secondary">
            Daily Meals
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal}></MealCard>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Meals;
