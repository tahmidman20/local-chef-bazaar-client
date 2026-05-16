import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiSmile } from 'react-icons/fi';

const steps = [
  {
    id: 1,
    title: "Browse Meals",
    description: "Explore a wide variety of homemade meals prepared by local expert chefs in your area.",
    icon: <FiSearch />,
    color: "bg-orange-500"
  },
  {
    id: 2,
    title: "Place Order",
    description: "Select your favorite dishes, customize your preferences, and securely place your order.",
    icon: <FiShoppingCart />,
    color: "bg-yellow-500"
  },
  {
    id: 3,
    title: "Enjoy Your Meal",
    description: "Receive your fresh, hot meal delivered right to your door and enjoy the authentic taste of home.",
    icon: <FiSmile />,
    color: "bg-green-500"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-soft-bg">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Order delicious homemade food in three simple steps. We make it easy for you to enjoy authentic flavors.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Connector Line (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 border-t-2 border-dashed border-primary/20 -z-10" />
              )}

              {/* Icon & Step Number */}
              <div className="relative mb-8 inline-block">
                <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center text-4xl text-white shadow-xl shadow-orange-900/10 transform rotate-3 hover:rotate-0 transition-transform`}>
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-soft-bg">
                  {step.id}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {step.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
