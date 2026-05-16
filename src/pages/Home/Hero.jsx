import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiUsers, FiShoppingBag, FiAward } from 'react-icons/fi';
import { Link } from 'react-router';
import Button from '../../components/Button';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-soft-bg pt-20 pb-12 lg:pt-32 lg:pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6"
            >
              ✨ Best Homemade Food in Town
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="heading-hero text-text-primary mb-6"
            >
              Discover <span className="text-primary">Homemade</span> Food From Local Expert Chefs
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-text-secondary mb-10 max-w-lg leading-relaxed font-body"
            >
              Experience the authentic taste of home with meals prepared by passionate local chefs. Fresh ingredients, traditional recipes, delivered to your doorstep.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link to="/meals">
                <Button variant="primary">
                  Explore Foods <FiArrowRight />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">
                  Become a Chef
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Visuals */}
          <div className="relative">
            {/* Main Food Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-orange-900/10 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Delicious Homemade Bowl" 
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating Elements */}
              {/* Rating Badge */}
              <motion.div 
                animate={floatingAnimation}
                className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/50 z-20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-yellow-400">
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                    <FiStar fill="currentColor" />
                  </div>
                  <span className="font-bold text-[#431407]">4.9</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">(2.4k+ Reviews)</p>
              </motion.div>

              {/* Chef Card */}
              <motion.div 
                animate={{
                  y: [0, 15, 0],
                  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-white/50 z-20 flex items-center gap-4 max-w-[240px]"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1583394293214-28dea15ee548?q=80&w=200&auto=format&fit=crop" 
                    alt="Chef Maria" 
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#431407] text-sm">Chef Maria R.</h4>
                  <p className="text-xs text-orange-600 font-semibold mb-1">Italian Specialist</p>
                  <div className="flex items-center gap-1 text-[10px] text-stone-500">
                    <FiAward className="text-orange-500" /> Top Rated
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 -right-12 w-24 h-24 bg-orange-400 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-20" />
            </motion.div>

            {/* Background Layered Design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-orange-100 rounded-[50px] -rotate-6 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-white/40 rounded-[50px] rotate-3 -z-20 backdrop-blur-[2px]" />
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 lg:mt-32 grid grid-cols-2 md:grid-cols-3 gap-8 p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl shadow-orange-900/5 relative overflow-hidden"
        >
          {/* Stats Glass Decoration */}
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-orange-50 to-transparent opacity-50" />
          
          <StatItem icon={<FiShoppingBag className="text-orange-500" />} number="500+" label="Delicious Meals" />
          <StatItem icon={<FiUsers className="text-orange-500" />} number="120+" label="Expert Chefs" />
          <StatItem icon={<FiStar className="text-orange-500" />} number="5K+" label="Happy Orders" className="col-span-2 md:col-span-1" />
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ icon, number, label, className = "" }) => (
  <div className={`flex flex-col items-center md:flex-row md:items-start gap-4 ${className}`}>
    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">
      {icon}
    </div>
    <div className="text-center md:text-left">
      <h3 className="text-3xl font-bold text-[#431407]">{number}</h3>
      <p className="text-stone-500 font-medium">{label}</p>
    </div>
  </div>
);

export default Hero;
