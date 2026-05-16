import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiUser, FiShoppingBag } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Button from "../../../components/Button";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Meals", path: "/meals" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-lg" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
            <FiShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-text-primary tracking-tight">
            Local Chef <span className="text-primary">Bazaar</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-semibold transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-border-base mx-2" />

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <NavLink to="/dashboard/profile" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                    <img 
                      src={user?.photoURL || "https://i.ibb.co/Txy1pYZv/istockphoto-1130884625-612x612.jpg"} 
                      alt="User Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </NavLink>
                <button 
                  onClick={handleLogOut}
                  className="p-2 text-text-secondary hover:text-danger transition-colors cursor-pointer"
                  title="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-text-primary hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="!py-2.5 !px-6 text-sm">
                    Join as Chef
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-text-primary cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-border-base"
          >
            <ul className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-lg font-bold transition-colors ${
                        isActive ? "text-primary" : "text-text-primary"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <div className="h-px bg-border-base my-2" />
              {user ? (
                <>
                  <li>
                    <NavLink to="/dashboard/profile" className="flex items-center gap-3 py-2 text-lg font-bold">
                      <FiUser /> Profile
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogOut}
                      className="flex items-center gap-3 py-2 text-lg font-bold text-danger w-full text-left cursor-pointer"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/login">
                    <Button variant="secondary" fullWidth>Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" fullWidth>Join as Chef</Button>
                  </Link>
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
