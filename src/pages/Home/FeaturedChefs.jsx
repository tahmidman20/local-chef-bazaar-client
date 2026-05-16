import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiHeart, FiUser, FiCheckCircle, FiClock, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router';
import Button from '../../components/Button';

// Import local images
import chefMaria from '../../assets/chefs/Chef Maria Rodriguez.jpg';
import chefJulian from '../../assets/chefs/Chef Julian Chen.jpg';
import chefSarah from '../../assets/chefs/Chef Sarah Williams.jpg';
import chefAhmed from '../../assets/chefs/Chef Ahmed Hassan.jpg';

const chefs = [
  {
    id: 1,
    name: "Chef Maria Rodriguez",
    image: chefMaria,
    specialty: "Italian Pasta & Pizza",
    rating: 4.9,
    reviews: 128,
    mealsCount: 15,
    experience: "8 Years",
    description: "Passionate about authentic Italian flavors. I use traditional recipes passed down through my family.",
    isVerified: true,
    deliveryTime: "30-45 min"
  },
  {
    id: 2,
    name: "Chef Julian Chen",
    image: chefJulian,
    specialty: "Asian Fusion & Sushi",
    rating: 4.8,
    reviews: 95,
    mealsCount: 12,
    experience: "10 Years",
    description: "Expert in blending traditional Asian techniques with modern flavors. Freshness is my priority.",
    isVerified: true,
    deliveryTime: "25-40 min"
  },
  {
    id: 3,
    name: "Chef Sarah Williams",
    image: chefSarah,
    specialty: "Healthy Bowls & Salads",
    rating: 4.7,
    reviews: 210,
    mealsCount: 20,
    experience: "5 Years",
    description: "Creating nutritious and colorful meals that taste as good as they look. Eat well, live better.",
    isVerified: true,
    deliveryTime: "20-35 min"
  },
  {
    id: 4,
    name: "Chef Ahmed Hassan",
    image: chefAhmed,
    specialty: "Middle Eastern Cuisine",
    rating: 4.9,
    reviews: 156,
    mealsCount: 18,
    experience: "12 Years",
    description: "Bringing the rich spices and slow-cooked traditions of the Middle East to your kitchen.",
    isVerified: true,
    deliveryTime: "40-55 min"
  }
];

const FeaturedChefs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-soft-bg">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4"
          >
            Culinary Masters
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-4"
          >
            Featured Local Chefs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Meet the talented individuals behind your favorite homemade meals. Every chef is verified for quality and hygiene.
          </motion.p>
        </div>

        {/* Chefs Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {chefs.map((chef) => (
            <ChefCard key={chef.id} chef={chef} variants={itemVariants} />
          ))}
        </motion.div>

        {/* Section Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/register">
            <button className="inline-flex items-center gap-2 text-text-primary font-bold hover:text-primary transition-colors group cursor-pointer">
              Want to join our expert chef team? <span className="underline decoration-primary group-hover:decoration-primary">Become a Chef</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ChefCard = ({ chef, variants }) => (
  <motion.div 
    variants={variants}
    className="card-premium group"
  >
    {/* Image Container */}
    <div className="relative mb-6 rounded-[2rem] overflow-hidden aspect-[4/5]">
      <img 
        src={chef.image} 
        alt={chef.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Floating Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {chef.isVerified && (
          <div className="bg-white/90 backdrop-blur-md text-success p-2 rounded-xl shadow-sm border border-white/50" title="Verified Chef">
            <FiCheckCircle className="w-5 h-5" />
          </div>
        )}
      </div>

      <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-text-secondary hover:text-danger p-2.5 rounded-xl shadow-sm border border-white/50 transition-colors cursor-pointer">
        <FiHeart className="w-5 h-5" />
      </button>

      {/* Rating Badge */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/50 flex items-center gap-1.5">
        <FiStar className="text-accent fill-accent w-4 h-4" />
        <span className="font-bold text-text-primary text-sm">{chef.rating}</span>
        <span className="text-text-secondary text-xs">({chef.reviews})</span>
      </div>
    </div>

    {/* Content */}
    <div className="px-2 pb-2">
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg border border-primary/10">
          {chef.specialty}
        </span>
      </div>

      <h3 className="card-title text-text-primary mb-2 group-hover:text-primary transition-colors">
        {chef.name}
      </h3>

      <p className="text-text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
        {chef.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 border-y border-border-base py-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <FiShoppingBag className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">{chef.mealsCount}+</span>
            <span className="text-[10px] text-text-secondary uppercase font-medium">Meals</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <FiClock className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">{chef.experience}</span>
            <span className="text-[10px] text-text-secondary uppercase font-medium">Exp.</span>
          </div>
        </div>
      </div>

      {/* <Link to={`/chef-profile/${chef.id}`}>
        <Button variant="primary" fullWidth className="py-4">
          View Profile
        </Button>
      </Link> */}
    </div>
  </motion.div>
);

export default FeaturedChefs;
