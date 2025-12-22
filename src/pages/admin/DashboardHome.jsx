import Loader from "../../components/Loader";
import useRole from "../../hooks/useRole";

import PlatformStatistics from "./PlatformStatistics";

const DashboardHome = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loader />;

  if (role === "admin") {
    return <PlatformStatistics />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-4xl font-bold mb-4 text-center">
        👋 Welcome to Your Dashboard
      </h1>
    </div>
  );
};

export default DashboardHome;
