import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const chartData = [
    { name: "Pending", value: data.pendingOrders },
    { name: "Delivered", value: data.deliveredOrders },
  ];

  const COLORS = ["#FACC15", "#22C55E"];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📊 Platform Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-4xl font-bold text-primary">{data.totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-4xl font-bold text-warning">
            {data.pendingOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">Delivered Orders</h3>
          <p className="text-4xl font-bold text-success">
            {data.deliveredOrders}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
