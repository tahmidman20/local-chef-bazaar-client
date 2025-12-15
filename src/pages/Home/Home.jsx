import React from "react";
import Banner from "../Home/Banner ";
import CustomerReviews from "./CustomerReviews";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="bg-yellow-50">
      <Banner></Banner>
      <CustomerReviews reviewPromise={reviewPromise}></CustomerReviews>
    </div>
  );
};

export default Home;
