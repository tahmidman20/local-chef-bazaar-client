import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { TableSkeleton } from "../../components/loading/SkeletonLoaders";
import EmptyState from "../../components/loading/EmptyState";
import { HeartOff } from "lucide-react";
import LoadingButton from "../../components/loading/LoadingButton";

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

  if (isLoading) return <TableSkeleton rows={6} />;

  // ❌ Delete favorite
  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: "This meal will be removed from your list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      confirmButtonColor: "#FF6B35",
      cancelButtonColor: "#1F1F1F",
      background: "#FFF3E9",
      customClass: {
        title: 'font-heading font-bold text-dark',
        popup: 'rounded-[2rem]',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/favorites/${id}`)
          .then(() => {
            Swal.fire({
              title: "Removed!",
              text: "Meal removed from favorites successfully.",
              icon: "success",
              confirmButtonColor: "#FF6B35",
              background: "#FFF3E9",
            });
            refetch();
          });
      }
    });
  };

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="heading-section text-dark mb-4">⭐ Your <span className="text-primary">Favorites</span></h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          Keep track of the dishes you love most from our bazaar.
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState 
          title="No Favorites Yet" 
          message="Start exploring our bazaar and heart the meals that catch your eye!"
          icon={HeartOff}
          actionText="Explore Meals"
          actionLink="/meals"
        />
      ) : (
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-orange-900/5 border border-border-base/50">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">#</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Meal Name</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Chef Name</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Date Added</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-base/30">
                {favorites.map((fav, index) => (
                  <tr key={fav._id} className="hover:bg-soft-bg/50 transition-colors">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6 font-bold text-dark">{fav.mealName}</td>
                    <td className="py-4 px-6 font-medium text-text-secondary">{fav.chefName}</td>
                    <td className="py-4 px-6 text-text-secondary">{new Date(fav.addedTime).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-center">
                      <LoadingButton
                        onClick={() => handleDelete(fav._id)}
                        variant="outline"
                        className="rounded-full !py-1 !px-4 text-xs h-8 min-w-[80px]"
                        loadingText="Removing..."
                      >
                        Remove
                      </LoadingButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;
