import React from "react";
import Banner from "../Home/Banner ";
import CustomerReviews from "./CustomerReviews";
import DailyMeals from "../meals/DailyMeals ";
import WhyChooseUs from "./WhyChooseUs";

const reviewPromise = fetch(`${import.meta.env.VITE_API_URL}/reviews`).then(
  (res) => res.json()
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
