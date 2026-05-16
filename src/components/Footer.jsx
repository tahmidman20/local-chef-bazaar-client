import React from 'react';
import { Link } from 'react-router';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiMail, FiPhone, FiMapPin, FiShoppingBag } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-dark text-stone-400 pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
                <FiShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Local Chef <span className="text-primary">Bazaar</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              Connecting passionate local home chefs with food lovers. Experience fresh, healthy, and authentic homemade meals delivered to your doorstep.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<FiFacebook />} href="#" />
              <SocialLink icon={<FiInstagram />} href="#" />
              <SocialLink icon={<FiTwitter />} href="#" />
              <SocialLink icon={<FiLinkedin />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/meals">Explore Meals</FooterLink></li>
              <li><FooterLink to="/chefs">Our Chefs</FooterLink></li>
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/register">Become a Chef</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 shrink-0" />
                <span>123 Culinary Lane, Foodie District, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" />
                <span>support@localchefbazaar.com</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Operating Hours</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span>Sun - Thu:</span>
                <span className="text-white font-medium">09:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat:</span>
                <span className="text-white font-medium">10:00 AM - 11:00 PM</span>
              </li>
              <li className="pt-4 border-t border-white/5">
                <p className="text-xs italic text-stone-500 italic">
                  * Holiday hours may vary. Please check our mobile app for real-time updates.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Local Chef Bazaar. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300 border border-white/5"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
  >
    {children}
  </Link>
);

export default Footer;
