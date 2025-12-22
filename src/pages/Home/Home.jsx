import React from "react";

import CustomerReviews from "./CustomerReviews";
import DailyMeals from "../meals/DailyMeals ";
import WhyChooseUs from "./WhyChooseUs";
import Banner from "./Banner ";

const reviewPromise = fetch(`${import.meta.env.VITE_API_URL}/reviews`).then(
  (res) =>
    res.json().catch((error) => {
      console.log(error);
    })
);

console.log(reviewPromise);
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
