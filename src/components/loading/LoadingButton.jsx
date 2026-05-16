import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingButton = ({ 
  children, 
  isLoading, 
  loadingText, 
  variant = 'primary', 
  className = '', 
  disabled,
  onClick,
  ...props 
}) => {
  const variants = {
    primary: 'bazaar-btn-primary',
    secondary: 'bazaar-btn-secondary',
    dark: 'bazaar-btn-dark',
    outline: 'bazaar-btn-outline',
  };

  return (
    <button
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`relative min-w-[120px] overflow-hidden ${variants[variant]} ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-5 h-5" />
            </motion.div>
            <span>{loadingText || 'Loading...'}</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-center gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Button Shine Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%]"
        whileHover={{
          translateX: '200%',
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
    </button>
  );
};

export default LoadingButton;
