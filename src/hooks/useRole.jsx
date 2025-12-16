import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
      );
      return res.data;
    },
  });

  return {
    role: data?.role,
    isLoading: loading || isLoading,
  };
};

export default useRole;
