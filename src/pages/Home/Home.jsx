import React from "react";

import CustomerReviews from "./CustomerReviews";
import WhyChooseUs from "./WhyChooseUs";
import Hero from "./Hero";
import FeaturedChefs from "./FeaturedChefs";
import PopularMeals from "./PopularMeals";
import TrendingFoods from "./TrendingFoods";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";

const reviewPromise = fetch(`${import.meta.env.VITE_API_URL}/reviews`).then(
  (res) =>
    res.json().catch((error) => {
      console.log(error);
    })
);

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedChefs />
      <PopularMeals />
      <WhyChooseUs />
      <TrendingFoods />
      <HowItWorks />
      <CustomerReviews reviewPromise={reviewPromise} />
      <Newsletter />
    </div>
  );
};

export default Home;
