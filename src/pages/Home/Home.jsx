import React from "react";
import Banner from "../Home/Banner ";
import CustomerReviews from "./CustomerReviews";
import DailyMeals from "../meals/DailyMeals ";
import WhyChooseUs from "./WhyChooseUs";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <DailyMeals></DailyMeals>
      <CustomerReviews reviewPromise={reviewPromise}></CustomerReviews>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
