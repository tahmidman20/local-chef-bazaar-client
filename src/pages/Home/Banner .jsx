import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import Loader from "../../components/Loader";

const HeroBanner = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const bannerMeal = meals[Math.floor(Math.random() * meals.length)];

  if (!bannerMeal) return null;

  return (
    <section className="bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-3 px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold">
            Fresh • Homemade • Daily
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            {bannerMeal.foodName}
          </h1>

          <p className="mt-4 text-gray-600">
            Prepared by{" "}
            <span className="font-semibold">{bannerMeal.chefName}</span>
          </p>

          <p className="mt-3 text-2xl font-bold text-secondary">
            $ {bannerMeal.price}
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to={`/order-now/${bannerMeal._id}`}
              className="px-7 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-blue-600 transition"
            >
              Order Now
            </Link>

            <Link
              to="/meals"
              className="px-7 py-3 rounded-lg border border-secondary text-sec font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              View All Meals
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={bannerMeal.image || bannerMeal.foodImage}
            alt={bannerMeal.foodName}
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
