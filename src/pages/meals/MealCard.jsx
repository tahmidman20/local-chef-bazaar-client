import { Link } from "react-router";

const MealCard = ({ meal }) => {
  const { chefName, chefId, foodName, image, price, rating, _id } = meal;
  console.log(meal);
  return (
    <div className="p-6 hover:scale-105 transition-transform duration-300">
      <div className="">
        <div
          key={meal._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img src={image} alt="" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{foodName}</h2>
            <p className="text-gray-600">
              Chef: {chefName} (ID: {chefId})
            </p>
            <p className="mt-2 font-bold">${price.toFixed(2)}</p>
            <p>Rating: {rating} ⭐</p>
            {/* <p>Delivery Area: {deliveryArea}</p> */}
            <Link
              to={`/meal-details/${_id}`}
              className="mt-4 w-full btn btn-secondary text-white py-2 rounded hover:bg-blue-600 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
