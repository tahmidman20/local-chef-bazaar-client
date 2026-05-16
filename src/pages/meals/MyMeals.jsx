import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FoodCardSkeleton } from "../../components/loading/SkeletonLoaders";
import EmptyState from "../../components/loading/EmptyState";
import LoadingButton from "../../components/loading/LoadingButton";
import { Star, Clock, Trash2, Edit } from "lucide-react";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      axiosSecure
        .get(`/my-meals?email=${user.email}`)
        .then((res) => {
          setMeals(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted permanently from the bazaar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#1F1F1F",
      background: "#FFF3E9",
      customClass: {
        title: 'font-heading font-bold text-dark',
        popup: 'rounded-[2rem]',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/meals/${id}`).then(() => {
          setMeals(meals.filter((meal) => meal._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Meal deleted successfully.",
            icon: "success",
            confirmButtonColor: "#FF6B35",
            background: "#FFF3E9",
          });
        });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedMeal = {
      foodName: form.foodName.value,
      price: Number(form.price.value),
      ingredients: form.ingredients.value,
      deliveryTime: form.deliveryTime.value,
      rating: Number(form.rating.value),
    };

    axiosSecure.patch(`/meals/${selectedMeal._id}`, updatedMeal).then(() => {
      Swal.fire({
        title: "Updated!",
        text: "Meal updated successfully.",
        icon: "success",
        confirmButtonColor: "#FF6B35",
        background: "#FFF3E9",
      });

      setMeals(
        meals.map((meal) =>
          meal._id === selectedMeal._id ? { ...meal, ...updatedMeal } : meal
        )
      );

      setSelectedMeal(null);
      document.getElementById("update_modal").close();
    });
  };

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="heading-section text-dark mb-4">My <span className="text-primary">Meals</span></h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          Manage your culinary creations and keep them updated for your customers.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <FoodCardSkeleton key={i} />
          ))}
        </div>
      ) : meals.length === 0 ? (
        <EmptyState 
          title="No Meals Yet" 
          message="You haven't added any meals to your kitchen yet. Start sharing your delicious recipes!"
          actionText="Add New Meal"
          actionLink="/dashboard/add-meal"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div key={meal._id} className="card-premium group">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={meal.image} 
                  alt={meal.foodName} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-bold text-dark">{meal.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-dark">{meal.foodName}</h2>
                
                <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{meal.deliveryTime} min</span>
                  </div>
                  <div className="font-bold text-primary">${meal.price}</div>
                </div>

                <p className="text-sm text-text-secondary line-clamp-2">
                  <span className="font-semibold text-dark">Ingredients:</span> {meal.ingredients}
                </p>

                <div className="flex items-center justify-between pt-4 gap-4">
                  <LoadingButton
                    onClick={() => handleDelete(meal._id)}
                    variant="outline"
                    className="flex-1 rounded-full !border-danger text-danger hover:!bg-danger hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </LoadingButton>

                  <LoadingButton
                    variant="dark"
                    className="flex-1 rounded-full"
                    onClick={() => {
                      setSelectedMeal(meal);
                      document.getElementById("update_modal").showModal();
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    Update
                  </LoadingButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <dialog id="update_modal" className="modal">
        <div className="modal-box rounded-[2.5rem] bg-soft-bg p-8 max-w-md border border-white">
          <h3 className="text-2xl font-heading font-bold text-dark mb-6">Update Your Meal</h3>

          {selectedMeal && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-dark px-2">Meal Name</label>
                <input
                  name="foodName"
                  defaultValue={selectedMeal.foodName}
                  className="input-premium py-3"
                  placeholder="Food Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-dark px-2">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={selectedMeal.price}
                    className="input-premium py-3"
                    placeholder="Price"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-dark px-2">Rating</label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    defaultValue={selectedMeal.rating}
                    className="input-premium py-3"
                    placeholder="Rating"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-dark px-2">Delivery Time (min)</label>
                <input
                  name="deliveryTime"
                  defaultValue={selectedMeal.deliveryTime}
                  className="input-premium py-3"
                  placeholder="Delivery Time"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-dark px-2">Ingredients</label>
                <textarea
                  name="ingredients"
                  defaultValue={selectedMeal.ingredients}
                  className="input-premium py-3 min-h-[100px] rounded-2xl resize-none"
                  placeholder="Ingredients"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <LoadingButton className="flex-1 rounded-full" type="submit">
                  Save Changes
                </LoadingButton>
                <button
                  type="button"
                  className="bazaar-btn-dark rounded-full px-6"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyMeals;
