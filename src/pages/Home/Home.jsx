import React from "react";
import Banner from "../Home/Banner ";
import CustomerReviews from "./CustomerReviews";
import DailyMeals from "../meals/DailyMeals ";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <DailyMeals></DailyMeals>
      <CustomerReviews reviewPromise={reviewPromise}></CustomerReviews>
    </div>
  );
};

export default Home;
