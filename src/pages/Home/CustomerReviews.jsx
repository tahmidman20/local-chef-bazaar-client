import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CustomerReviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  console.log(reviews);

  return (
    <div className="mb-10 mt-5">
      <h2 className="text-3xl text-center font-bold text-secondary">
        Customer Reviews
      </h2>
      <div>
        <>
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
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {reviews?.length > 0 &&
              reviews?.map((review) => (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review}></ReviewCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default CustomerReviews;
