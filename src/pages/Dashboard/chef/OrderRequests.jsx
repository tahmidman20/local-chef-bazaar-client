import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { FoodCardSkeleton } from "../../../components/loading/SkeletonLoaders";
import EmptyState from "../../../components/loading/EmptyState";
import LoadingButton from "../../../components/loading/LoadingButton";
import { ShoppingBasket, MapPin, User, DollarSign, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

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

  if (isLoading) return (
    <div className="section-spacing container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => <FoodCardSkeleton key={i} />)}
      </div>
    </div>
  );

  const getStatusStyle = (status) => {
    switch(status) {
      case 'accepted': return 'bg-success/10 text-success';
      case 'cancelled': return 'bg-danger/10 text-danger';
      case 'delivered': return 'bg-primary/10 text-primary';
      default: return 'bg-accent/10 text-accent';
    }
  };

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="heading-section text-dark mb-4">Incoming <span className="text-primary">Orders</span></h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          Manage your active orders and track delivery status for your customers.
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState 
          title="No Orders Yet" 
          message="You don't have any incoming orders at the moment. Make sure your meals are visible in the bazaar!"
          icon={ShoppingBasket}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => {
            const isCancelled = order.status === "cancelled";
            const isAccepted = order.status === "accepted";
            const isDelivered = order.status === "delivered";
            const isPending = order.status === "pending";

            return (
              <div key={order._id} className="card-premium group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                    <Package size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${getStatusStyle(order.status)}`}>
                    {isPending && <Clock size={12} />}
                    {isAccepted && <CheckCircle size={12} />}
                    {isDelivered && <Truck size={12} />}
                    {isCancelled && <XCircle size={12} />}
                    {order.status}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-dark mb-4">{order.mealName}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <User size={16} className="text-primary" />
                    <span className="font-medium">{order.userEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin size={16} className="text-primary" />
                    <span className="font-medium line-clamp-1">{order.userAddress}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <DollarSign size={16} className="text-primary" />
                    <span className="font-bold text-dark">${order.price} × {order.quantity}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-border-base/30">
                  <div className="grid grid-cols-2 gap-2">
                    <LoadingButton
                      isLoading={updateStatusMutation.isPending && updateStatusMutation.variables?.status === "cancelled" && updateStatusMutation.variables?.orderId === order._id}
                      disabled={!isPending}
                      onClick={() =>
                        updateStatusMutation.mutate({
                          orderId: order._id,
                          status: "cancelled",
                        })
                      }
                      variant="outline"
                      className="rounded-full !border-danger text-danger hover:!bg-danger hover:text-white"
                      loadingText="..."
                    >
                      Cancel
                    </LoadingButton>

                    <LoadingButton
                      isLoading={updateStatusMutation.isPending && updateStatusMutation.variables?.status === "accepted" && updateStatusMutation.variables?.orderId === order._id}
                      disabled={!isPending}
                      onClick={() =>
                        updateStatusMutation.mutate({
                          orderId: order._id,
                          status: "accepted",
                        })
                      }
                      variant="primary"
                      className="rounded-full"
                      loadingText="..."
                    >
                      Accept
                    </LoadingButton>
                  </div>

                  <LoadingButton
                    isLoading={updateStatusMutation.isPending && updateStatusMutation.variables?.status === "delivered" && updateStatusMutation.variables?.orderId === order._id}
                    disabled={!isAccepted}
                    onClick={() =>
                      updateStatusMutation.mutate({
                        orderId: order._id,
                        status: "delivered",
                      })
                    }
                    variant="dark"
                    className="rounded-full w-full"
                    loadingText="Delivering..."
                  >
                    <Truck size={18} />
                    Mark Delivered
                  </LoadingButton>
                </div>

                <div className="mt-4 text-[10px] text-text-secondary font-bold uppercase tracking-widest text-center">
                  Ordered: {new Date(order.orderTime).toLocaleString()}
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
