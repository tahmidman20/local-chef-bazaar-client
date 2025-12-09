import React from "react";
import Banner from "./Banner ";
import CustomerReviews from "./CustomerReviews";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CustomerReviews reviewPromise={reviewPromise}></CustomerReviews>
    </div>
  );
};

export default Home;
