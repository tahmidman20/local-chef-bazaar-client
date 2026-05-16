import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, SearchX } from 'lucide-react';
import { Link } from 'react-router';

const EmptyState = ({ 
  title = "No Delicacies Found", 
  message = "We couldn't find what you're looking for. Try adjusting your filters or search terms.",
  icon: Icon = SearchX,
  actionText,
  actionLink = "/",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-primary relative z-10"
        >
          <Icon size={48} />
        </motion.div>
        
        {/* Decorative Background Elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-accent/20 rounded-full blur-2xl -z-10"
        />
        <ChefHat className="absolute -top-4 -right-4 w-10 h-10 text-accent/40 rotate-12" />
      </div>

      <h3 className="text-2xl font-heading font-bold text-dark mb-4">{title}</h3>
      <p className="text-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
        {message}
      </p>

      {actionText && (
        <Link to={actionLink}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bazaar-btn-primary rounded-full px-8 py-3"
          >
            {actionText}
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
