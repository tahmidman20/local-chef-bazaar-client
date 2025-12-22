import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";

const OrderRequests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  //fetch chef orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["chefOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders?chefEmail=${user.email}`
      );
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chefOrders", user?.email],
      });
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Incoming Order Requests
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No order requests yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const isCancelled = order.status === "cancelled";
            const isAccepted = order.status === "accepted";
            const isDelivered = order.status === "delivered";
            return (
              <div key={order._id} className="card bg-base-100 shadow-xl p-5">
                <h3 className="text-xl font-semibold mb-2">{order.mealName}</h3>

                <p>
                  <b>Price:</b> $ {order.price}
                </p>
                <p>
                  <b>Quantity:</b> {order.quantity}
                </p>
                <p>
                  <b>User:</b> {order.userEmail}
                </p>
                <p>
                  <b>Address:</b> {order.userAddress}
                </p>
                <p>
                  <b>Payment:</b> {order.paymentStatus || "unpaid"}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`badge ${
                      order.status === "accepted"
                        ? "badge-success"
                        : order.status === "cancelled"
                        ? "badge-error"
                        : order.status === "delivered"
                        ? "badge-primary"
                        : "badge-warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.orderTime).toLocaleString()}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    disabled={isCancelled || isAccepted || isDelivered}
                    onClick={() =>
                      updateStatusMutation.mutate({
                        orderId: order._id,
                        status: "cancelled",
                      })
                    }
                    className="btn btn-error btn-sm"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={isCancelled || isAccepted || isDelivered}
                    onClick={() =>
                      updateStatusMutation.mutate({
                        orderId: order._id,
                        status: "accepted",
                      })
                    }
                    className="btn btn-success btn-sm"
                  >
                    Accept
                  </button>

                  <button
                    disabled={!isAccepted || isCancelled || isDelivered}
                    onClick={() =>
                      updateStatusMutation.mutate({
                        orderId: order._id,
                        status: "delivered",
                      })
                    }
                    className="btn btn-primary btn-sm"
                  >
                    Deliver
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
