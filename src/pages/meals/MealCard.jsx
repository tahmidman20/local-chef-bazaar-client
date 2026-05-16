import { Link } from "react-router";
import LoadingButton from "../../components/loading/LoadingButton";
import { Star } from "lucide-react";

const MealCard = ({ meal }) => {
  const { chefName, chefId, foodName, image, price, rating, _id } = meal;
  
  return (
    <div className="card-premium group">
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img 
          src={image} 
          alt={foodName} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="text-sm font-bold text-dark">{rating}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-heading font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
          {foodName}
        </h2>
        <p className="text-text-secondary text-sm">
          Crafted by <span className="font-semibold text-dark">{chefName}</span>
        </p>
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">Price</span>
            <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
          </div>
          
          <Link to={`/meal-details/${_id}`}>
            <LoadingButton
              variant="primary"
              className="rounded-full"
            >
              View Details
            </LoadingButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
