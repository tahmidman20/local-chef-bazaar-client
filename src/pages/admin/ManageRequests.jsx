import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { TableSkeleton } from "../../components/loading/SkeletonLoaders";
import EmptyState from "../../components/loading/EmptyState";
import LoadingButton from "../../components/loading/LoadingButton";
import { ClipboardList, CheckCircle, XCircle, Clock } from "lucide-react";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requests/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Request approved");
      queryClient.invalidateQueries(["requests"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requests/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.error("Request rejected");
      queryClient.invalidateQueries(["requests"]);
    },
  });

  if (isLoading) return <TableSkeleton rows={8} />;

  const statusBadge = (status) => {
    if (status === "pending") return "bg-accent/10 text-accent";
    if (status === "approved") return "bg-success/10 text-success";
    if (status === "rejected") return "bg-danger/10 text-danger";
    return "bg-dark/10 text-dark";
  };

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="heading-section text-dark mb-4">Manage <span className="text-primary">Requests</span></h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          Review and process chef registrations and other platform requests.
        </p>
      </div>

      {requests.length === 0 ? (
        <EmptyState 
          title="No Requests Pending" 
          message="Everything is up to date! There are no new requests to process at this time."
          icon={ClipboardList}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-orange-900/5 border border-border-base/50">
            <table className="table w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">User</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Type</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Status</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Time</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-base/30">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-soft-bg/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-dark">{req.userName}</span>
                        <span className="text-xs text-text-secondary">{req.userEmail}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                        {req.requestType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 w-fit ${statusBadge(req.requestStatus)}`}>
                        {req.requestStatus === 'pending' && <Clock className="w-3 h-3" />}
                        {req.requestStatus === 'approved' && <CheckCircle className="w-3 h-3" />}
                        {req.requestStatus === 'rejected' && <XCircle className="w-3 h-3" />}
                        {req.requestStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-text-secondary">
                      {new Date(req.requestTime).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <LoadingButton
                          isLoading={approveMutation.isPending && approveMutation.variables === req._id}
                          disabled={req.requestStatus !== "pending"}
                          onClick={() => approveMutation.mutate(req._id)}
                          variant="primary"
                          className="rounded-full !py-1 !px-4 text-xs h-8 min-w-[80px]"
                          loadingText="Wait..."
                        >
                          Accept
                        </LoadingButton>
                        <LoadingButton
                          isLoading={rejectMutation.isPending && rejectMutation.variables === req._id}
                          disabled={req.requestStatus !== "pending"}
                          onClick={() => rejectMutation.mutate(req._id)}
                          variant="outline"
                          className="rounded-full !py-1 !px-4 text-xs h-8 min-w-[80px] !border-danger text-danger hover:!bg-danger hover:text-white"
                          loadingText="Wait..."
                        >
                          Reject
                        </LoadingButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden grid gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="card-premium"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-dark">{req.userName}</h3>
                    <p className="text-xs text-text-secondary">{req.userEmail}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusBadge(req.requestStatus)}`}>
                    {req.requestStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="font-bold text-primary uppercase tracking-wider text-xs">{req.requestType}</span>
                  <span className="text-xs text-text-secondary">
                    {new Date(req.requestTime).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border-base/30">
                  <LoadingButton
                    isLoading={approveMutation.isPending && approveMutation.variables === req._id}
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => approveMutation.mutate(req._id)}
                    variant="primary"
                    className="flex-1 rounded-full h-10"
                    loadingText="..."
                  >
                    Accept
                  </LoadingButton>
                  <LoadingButton
                    isLoading={rejectMutation.isPending && rejectMutation.variables === req._id}
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => rejectMutation.mutate(req._id)}
                    variant="outline"
                    className="flex-1 rounded-full h-10 !border-danger text-danger"
                    loadingText="..."
                  >
                    Reject
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageRequests;
