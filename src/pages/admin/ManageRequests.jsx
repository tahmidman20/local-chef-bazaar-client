import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

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

  if (isLoading) return <Loader />;

  const statusBadge = (status) => {
    if (status === "pending") return "badge badge-warning";
    if (status === "approved") return "badge badge-success";
    if (status === "rejected") return "badge badge-error";
    return "badge";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Manage Requests</h2>

      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td className="capitalize">{req.requestType}</td>
                <td>
                  <span className={statusBadge(req.requestStatus)}>
                    {req.requestStatus}
                  </span>
                </td>
                <td>{new Date(req.requestTime).toLocaleString()}</td>
                <td className="text-center space-x-2">
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => approveMutation.mutate(req._id)}
                    className="btn btn-success btn-xs"
                  >
                    Accept
                  </button>
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => rejectMutation.mutate(req._id)}
                    className="btn btn-error btn-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid gap-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow rounded-xl p-4 space-y-2"
          >
            <h3 className="font-semibold text-lg">{req.userName}</h3>

            <p className="text-sm text-gray-600">{req.userEmail}</p>

            <div className="flex justify-between items-center">
              <span className="capitalize font-medium">{req.requestType}</span>
              <span className={statusBadge(req.requestStatus)}>
                {req.requestStatus}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              {new Date(req.requestTime).toLocaleString()}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                disabled={req.requestStatus !== "pending"}
                onClick={() => approveMutation.mutate(req._id)}
                className="btn btn-success btn-sm flex-1"
              >
                Accept
              </button>
              <button
                disabled={req.requestStatus !== "pending"}
                onClick={() => rejectMutation.mutate(req._id)}
                className="btn btn-error btn-sm flex-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No requests found</p>
      )}
    </div>
  );
};

export default ManageRequests;
