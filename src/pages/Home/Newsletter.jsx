import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import Button from '../../components/Button';

const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dark -z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center overflow-hidden"
        >
          {/* Floating Decorative Icons */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-10 left-10 text-6xl opacity-20 hidden lg:block"
          >
            🍕
          </motion.div>
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-10 right-10 text-6xl opacity-20 hidden lg:block"
          >
            🥗
          </motion.div>
          <motion.div 
            animate={{ 
              x: [0, 15, 0],
              y: [0, 15, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 right-20 text-4xl opacity-10 hidden lg:block"
          >
            🥐
          </motion.div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-3xl text-white mx-auto mb-8 shadow-2xl shadow-primary/20"
            >
              <FiMail />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Get Weekly Food Updates
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-stone-200 text-lg mb-10"
            >
              Subscribe to our newsletter and stay updated with the latest meals, exclusive offers, and featured chefs from our community.
            </motion.p>

            {/* Form */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 rounded-2xl md:rounded-[2rem] border border-white/10"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-transparent text-white px-6 py-4 outline-gray-600 placeholder:text-stone-400 font-medium"
                required
              />
              <Button 
                type="submit"
                variant="primary"
                className="!py-4 px-10 rounded-4xl group"
              >
                Subscribe <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.form>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-stone-500 text-xs"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
