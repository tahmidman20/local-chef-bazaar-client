import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-meals?email=${user.email}`)
        .then((res) => setMeals(res.data))
        .catch(console.error);
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/meals/${id}`).then(() => {
          setMeals(meals.filter((meal) => meal._id !== id));
          Swal.fire("Deleted!", "Meal deleted successfully", "success");
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
      Swal.fire("Updated!", "Meal updated successfully", "success");

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
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center my-4">My Meals</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-100 shadow-xl px-5">
            <figure>
              <img src={meal.image} alt={meal.foodName} />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{meal.foodName}</h2>

              <p>
                <strong>Price:</strong> ${meal.price}
              </p>
              <p>
                <strong>Rating:</strong> {meal.rating}
              </p>
              <p>
                <strong>Ingredients:</strong> {meal.ingredients}
              </p>
              <p>
                <strong>Delivery:</strong> {meal.deliveryTime} min
              </p>
              <p>
                <strong>Chef:</strong> {meal.chefName}
              </p>
              <p>
                <strong>Chef ID:</strong> {meal.chefId}
              </p>

              <div className="card-actions justify-between mt-4">
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setSelectedMeal(meal);
                    document.getElementById("update_modal").showModal();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Meal</h3>

          {selectedMeal && (
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="foodName"
                defaultValue={selectedMeal.foodName}
                className="input input-bordered w-full"
                placeholder="Food Name"
              />

              <input
                name="price"
                type="number"
                defaultValue={selectedMeal.price}
                className="input input-bordered w-full"
                placeholder="Price"
              />

              <input
                name="rating"
                type="number"
                step="0.1"
                defaultValue={selectedMeal.rating}
                className="input input-bordered w-full"
                placeholder="Rating"
              />

              <input
                name="deliveryTime"
                defaultValue={selectedMeal.deliveryTime}
                className="input input-bordered w-full"
                placeholder="Delivery Time"
              />

              <textarea
                name="ingredients"
                defaultValue={selectedMeal.ingredients}
                className="textarea textarea-bordered w-full"
                placeholder="Ingredients"
              />

              <div className="modal-action">
                <button className="btn btn-success" type="submit">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
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
