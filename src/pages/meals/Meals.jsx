import React from "react";
import MealCard from "./MealCard";

const mealsPromise = fetch("/mealsData.json").then((res) => res.json());

const Meals = () => {
  return (
    <div className="bg-yellow-50">
      <MealCard mealsPromise={mealsPromise}></MealCard>
    </div>
  );
};

export default Meals;
