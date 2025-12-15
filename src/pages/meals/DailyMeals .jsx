import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";

const DailyMeals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const dailyMeals = meals.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary">
            Today’s Daily Meals
          </h2>
          <p className="text-gray-500 mt-2">
            Fresh homemade meals prepared by our local chefs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dailyMeals.map((meal) => (
            <motion.div
              key={meal._id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={meal.image}
                alt={meal.foodName}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {meal.foodName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">By {meal.chefName}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-secondary">
                    $ {meal.price}
                  </span>

                  <span className="text-sm text-gray-600">
                    ⭐ {meal.rating}
                  </span>
                </div>
                <Link
                  to={`/meal-details/${meal._id}`}
                  className="mt-4 inline-block w-full text-center px-4 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/meals"
            className="inline-block px-8 py-3 rounded-lg border border-secondary text-secondary] font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            View All Meals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DailyMeals;
