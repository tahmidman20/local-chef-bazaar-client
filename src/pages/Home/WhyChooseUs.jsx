import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiUserCheck, FiTruck, FiDollarSign } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: "Fresh Homemade Meals",
    description: "Every dish is prepared fresh on order using high-quality ingredients and authentic family recipes.",
    icon: <FiHeart />,
    color: "from-orange-400 to-red-500"
  },
  {
    id: 2,
    title: "Trusted Local Chefs",
    description: "Our chefs are verified professionals who are passionate about sharing their culinary heritage with you.",
    icon: <FiUserCheck />,
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 3,
    title: "Fast & Safe Delivery",
    description: "Enjoy hot and fresh meals delivered directly to your doorstep with our reliable delivery network.",
    icon: <FiTruck />,
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 4,
    title: "Affordable Pricing",
    description: "Get premium homemade food at competitive prices. Quality nutrition should be accessible to everyone.",
    icon: <FiDollarSign />,
    color: "from-yellow-400 to-orange-500"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-soft-bg relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-white text-primary font-bold text-xs uppercase tracking-wider mb-4 shadow-sm"
          >
            The Bazaar Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-4"
          >
            Why Choose Local Chef Bazaar
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Experience the warmth of home-cooked meals combined with the convenience of a modern marketplace.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative card-glass rounded-[2.5rem] p-8 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                {feature.icon}
              </div>

              <h3 className="card-title text-text-primary mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
