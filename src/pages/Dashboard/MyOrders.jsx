import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/user?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const handlePayment = async (order) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          orderId: order._id,
          totalPrice: order.totalPrice,
        }
      );

      window.location.replace(res.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "pending") return "badge badge-warning";
    if (status === "accepted") return "badge badge-info";
    if (status === "delivered") return "badge badge-success";
    if (status === "cancelled") return "badge badge-error";
    return "badge";
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">My Orders</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow-xl p-5">
            <h3 className="text-xl font-semibold mb-2">{order.mealName}</h3>

            <p>
              <b>Status:</b>{" "}
              <span className={getStatusBadge(order.status)}>
                {order.status}
              </span>
            </p>

            <p>
              <b>Payment:</b>{" "}
              <span
                className={
                  order.paymentStatus === "paid"
                    ? "badge badge-success"
                    : "badge badge-warning"
                }
              >
                {order.paymentStatus || "pending"}
              </span>
            </p>

            <p>
              <b>Price:</b> ${order.price}
            </p>
            <p>
              <b>Quantity:</b> {order.quantity}
            </p>

            <p>
              <b>Order Time:</b> {new Date(order.orderTime).toLocaleString()}
            </p>

            <div className="bg-gray-100 p-3 rounded mt-3">
              <p>
                <b>Chef Name:</b> {order.chefName}
              </p>
              <p>
                <b>Chef ID:</b> {order.chefId}
              </p>
            </div>

            <p className="font-bold mt-3 text-right">
              Total: ${order.totalPrice}
            </p>

            {order.status === "accepted" &&
              order.paymentStatus === "pending" && (
                <button
                  onClick={() => handlePayment(order)}
                  className="btn btn-secondary w-full mt-4"
                >
                  Pay Now
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
