import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button component for Local Chef Bazaar
 * Optimized with clean, consistent variants: primary, secondary, dark, outline, icon
 */
const Button = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  as: Component = motion.button,
  ...props 
}) => {
  
  const variants = {
    primary: 'bazaar-btn-primary',
    secondary: 'bazaar-btn-secondary',
    dark: 'bazaar-btn-dark',
    outline: 'bazaar-btn-outline',
    icon: 'bazaar-btn-icon',
  };

  const selectedVariant = variants[variant] || variants.primary;
  const widthClass = fullWidth ? 'w-full' : '';

  // Handle motion props if it's not a motion component
  const motionProps = Component === motion.button ? { whileTap: { scale: 0.98 } } : {};

  return (
    <Component
      {...motionProps}
      type={Component === 'button' || Component === motion.button ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`${selectedVariant} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
