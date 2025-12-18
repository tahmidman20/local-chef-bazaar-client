import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";

const FavoriteMeals = () => {
  const { user } = useAuth();

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // ❌ Delete favorite
  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: "This meal will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/favorites/${id}`)
          .then(() => {
            Swal.fire(
              "Removed!",
              "Meal removed from favorites successfully.",
              "success"
            );
            refetch();
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">⭐ Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite meals found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-xs w-full ">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal Name</th>
                <th>Chef Name</th>

                <th>Date Added</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((fav, index) => (
                <tr key={fav._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{fav.mealName}</td>
                  <td>{fav.chefName}</td>

                  <td>{new Date(fav.addedTime).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;
