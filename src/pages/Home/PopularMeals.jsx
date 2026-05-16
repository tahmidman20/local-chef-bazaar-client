import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiHeart, FiShoppingBag, FiClock, FiEye } from 'react-icons/fi';
import { Link } from 'react-router';
import Button from '../../components/Button';

const popularMeals = [
  {
    id: 1,
    name: "Classic Italian Lasagna",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=400&auto=format&fit=crop",
    category: "Italian",
    price: 18.50,
    rating: 4.9,
    chef: "Chef Maria Rodriguez",
    deliveryTime: "30-45 min",
    description: "Multi-layered pasta with rich meat sauce, béchamel, and melted mozzarella."
  },
  {
    id: 2,
    name: "Spicy Salmon Sushi Roll",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop",
    category: "Japanese",
    price: 22.00,
    rating: 4.8,
    chef: "Chef Julian Chen",
    deliveryTime: "25-35 min",
    description: "Fresh Atlantic salmon, avocado, and spicy mayo wrapped in premium nori."
  },
  {
    id: 3,
    name: "Quinoa Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop",
    category: "Healthy",
    price: 15.75,
    rating: 4.7,
    chef: "Chef Sarah Williams",
    deliveryTime: "20-30 min",
    description: "Nutritious mix of quinoa, roasted sweet potatoes, kale, and tahini dressing."
  },
  {
    id: 4,
    name: "Slow Cooked Lamb Shank",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop",
    category: "Middle Eastern",
    price: 28.00,
    rating: 5.0,
    chef: "Chef Ahmed Hassan",
    deliveryTime: "45-60 min",
    description: "Tender lamb shank braised for 12 hours with aromatic spices and herbs."
  },
  {
    id: 5,
    name: "Authentic Pad Thai",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400&auto=format&fit=crop",
    category: "Thai",
    price: 16.50,
    rating: 4.6,
    chef: "Chef Liam Nguyen",
    deliveryTime: "25-40 min",
    description: "Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce."
  },
  {
    id: 21, // ID change to avoid duplicate key warning if any
    name: "Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=400&auto=format&fit=crop",
    category: "Italian",
    price: 19.99,
    rating: 4.8,
    chef: "Chef Maria Rodriguez",
    deliveryTime: "35-50 min",
    description: "Creamy Arborio rice with wild mushrooms, parmesan, and truffle oil."
  }
];

const PopularMeals = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4"
          >
            Customer Favorites
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-4"
          >
            Popular Meals
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Most loved homemade dishes from local chefs, prepared with fresh ingredients and authentic recipes.
          </motion.p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularMeals.map((meal, index) => (
            <MealCard key={meal.id} meal={meal} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/meals">
            <Button variant="secondary">
              View All Meals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const MealCard = ({ meal, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="card-premium group"
  >
    {/* Image Container */}
    <div className="relative mb-6 rounded-[2rem] overflow-hidden aspect-[4/3]">
      <img 
        src={meal.image} 
        alt={meal.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/50">
          {meal.category}
        </span>
      </div>

      {/* Floating Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <button className="bg-white text-text-secondary hover:text-danger p-2.5 rounded-xl shadow-lg transition-colors cursor-pointer">
          <FiHeart className="w-5 h-5" />
        </button>
        <button className="bg-white text-text-secondary hover:text-primary p-2.5 rounded-xl shadow-lg transition-colors cursor-pointer">
          <FiEye className="w-5 h-5" />
        </button>
      </div>

      {/* Delivery Time Badge */}
      <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-xs font-bold">
        <FiClock className="w-4 h-4" />
        {meal.deliveryTime}
      </div>
    </div>

    {/* Content */}
    <div className="px-2">
      <div className="flex justify-between items-start mb-2">
        <h3 className="card-title text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
          {meal.name}
        </h3>
        <div className="flex items-center gap-1 shrink-0 bg-primary/10 px-2 py-1 rounded-lg">
          <FiStar className="text-primary fill-primary w-3.5 h-3.5" />
          <span className="text-xs font-bold text-text-primary">{meal.rating}</span>
        </div>
      </div>
      
      <p className="text-xs text-text-secondary mb-3 font-medium uppercase tracking-wide">
        By <span className="text-stone-600 font-bold">{meal.chef}</span>
      </p>

      <p className="text-text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
        {meal.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-text-secondary font-medium block">Price</span>
          <span className="text-2xl font-bold text-primary">${meal.price.toFixed(2)}</span>
        </div>
        <Button variant="dark" className="!p-4">
          <FiShoppingBag className="w-6 h-6" />
        </Button>
      </div>
    </div>
  </motion.div>
);

export default PopularMeals;
