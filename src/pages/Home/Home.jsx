import React from "react";
import Banner from "./Banner ";
import CustomerReviews from "./CustomerReviews";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <h1>This in home</h1>
      <Banner></Banner>
      <CustomerReviews reviewPromise={reviewPromise}></CustomerReviews>
    </div>
  );
};

export default Home;
