import React from "react";
import { FaUtensils, FaLeaf, FaShippingFast, FaStar } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUtensils className="text-4xl text-secondary" />,
      title: "Expert Local Chefs",
      description:
        "All meals are prepared by verified and experienced local chefs you can trust.",
    },
    {
      icon: <FaLeaf className="text-4xl text-secondary" />,
      title: "Fresh Ingredients",
      description: "We use only fresh and quality ingredients in every meal.",
    },
    {
      icon: <FaShippingFast className="text-4xl text-secondary" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep.",
    },
    {
      icon: <FaStar className="text-4xl text-secondary" />,
      title: "Top Rated",
      description: "Highly rated meals from happy customers.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-secondary">Us</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Enjoy fresh, homemade meals prepared by local chefs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
