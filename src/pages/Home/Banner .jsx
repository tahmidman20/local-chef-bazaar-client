import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="min-h-[85vh]  flex items-center">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Fresh Homemade Meals <br />
            <span className="text-secondary">From Local Chefs</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Discover delicious home-cooked meals made with love by trusted local
            chefs near you.
          </p>

          <div className="mt-7 flex gap-4">
            <Link to="/meals">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary px-6"
              >
                Explore Meals
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/kVCYrjKL/chef-logo-design-vector.jpg"
            alt="Chef Cooking"
            className="max-w-sm md:max-w-md rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
