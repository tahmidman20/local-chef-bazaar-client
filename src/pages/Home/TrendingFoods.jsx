import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiStar, FiHeart, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';
import Button from '../../components/Button';

const trendingFoods = [
  {
    id: 1,
    name: "Truffle Infused Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    price: 14.99,
    rating: 4.9,
    category: "Gourmet",
    tag: "Trending Now"
  },
  {
    id: 2,
    name: "Korean Bibimbap",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&auto=format&fit=crop",
    price: 13.50,
    rating: 4.8,
    category: "Korean",
    tag: "High Demand"
  },
  {
    id: 3,
    name: "Greek Meze Platter",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=400&auto=format&fit=crop",
    price: 21.00,
    rating: 4.7,
    category: "Greek",
    tag: "Chef's Choice"
  },
  {
    id: 4,
    name: "Classic New York Cheesecake",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=400&auto=format&fit=crop",
    price: 8.50,
    rating: 4.9,
    category: "Dessert",
    tag: "Best Seller"
  }
];

const TrendingFoods = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4"
            >
              <FiTrendingUp /> Hot Right Now
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-section text-text-primary"
            >
              Trending Foods
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-md text-lg"
          >
            Stay updated with the most popular dishes loved by our community this week.
          </motion.p>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-soft-bg rounded-[2rem] overflow-hidden border border-border-base/50 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Trending Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-dark text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {food.tag}
                  </span>
                </div>

                {/* Favorite */}
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-text-secondary hover:text-danger p-2 rounded-xl shadow-sm transition-colors cursor-pointer">
                  <FiHeart className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                    {food.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <FiStar className="text-accent fill-accent w-3 h-3" />
                    <span className="text-xs font-bold text-text-primary">{food.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                  {food.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-text-primary">${food.price.toFixed(2)}</span>
                  <Button variant="icon" className="!w-10 !h-10 !rounded-xl">
                    <FiArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingFoods;
