import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CustomerReviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);

  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="heading-section text-text-primary mb-4">
            Customer Reviews
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Hear from our community about their authentic experiences with our local chefs and delicious homemade meals.
          </p>
        </div>
        
        <div>
          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 3,
              stretch: "0%",
              depth: 100,
              modifier: 1,
              scale: 0.85,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="pb-16"
          >
            {reviews?.length > 0 &&
              reviews?.map((review) => (
                <SwiperSlide key={review.id} className="p-4">
                  <ReviewCard review={review}></ReviewCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
