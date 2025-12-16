import { Navigate } from "react-router";

import useRole from "../hooks/useRole";
import Loader from "../components/Loader";

const ChefRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loader />;

  if (role !== "chef") {
    return <Navigate to="/" />;
  }

  return children;
};
export default ChefRoute;
