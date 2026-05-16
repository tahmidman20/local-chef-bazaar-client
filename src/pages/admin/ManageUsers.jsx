import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TableSkeleton } from "../../components/loading/SkeletonLoaders";
import EmptyState from "../../components/loading/EmptyState";
import LoadingButton from "../../components/loading/LoadingButton";
import { ShieldAlert, Users } from "lucide-react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axiosSecure.get("/users")
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [axiosSecure]);

  const handleMakeFraud = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as fraud and restricted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as fraud",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#1F1F1F",
      background: "#FFF3E9",
      customClass: {
        title: 'font-heading font-bold text-dark',
        popup: 'rounded-[2rem]',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fraud/${id}`).then(() => {
          setUsers(
            users.map((u) => (u._id === id ? { ...u, status: "fraud" } : u))
          );

          Swal.fire({
            title: "Done!",
            text: "User marked as fraud successfully.",
            icon: "success",
            confirmButtonColor: "#FF6B35",
            background: "#FFF3E9",
          });
        });
      }
    });
  };

  return (
    <div className="section-spacing container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="heading-section text-dark mb-4">Manage <span className="text-primary">Users</span></h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          Overview of all platform users. Monitor roles and security statuses.
        </p>
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : users.length === 0 ? (
        <EmptyState 
          title="No Users Found" 
          message="There are currently no registered users in the bazaar."
          icon={Users}
        />
      ) : (
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-orange-900/5 border border-border-base/50">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">#</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Name</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Email</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Role</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs">Status</th>
                  <th className="py-5 px-6 text-dark font-bold uppercase tracking-wider text-xs text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-base/30">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-soft-bg/50 transition-colors">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6 font-bold text-dark">{user.name || "N/A"}</td>
                    <td className="py-4 px-6 text-text-secondary font-medium">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        user.role === 'admin' ? 'bg-primary/10 text-primary' : 
                        user.role === 'chef' ? 'bg-accent/10 text-accent' : 'bg-dark/10 text-dark'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === "fraud"
                            ? "bg-danger/10 text-danger"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        {user.status === 'fraud' && <ShieldAlert className="w-3 h-3 mr-1" />}
                        {user.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      {user.role === "admin" || user.status === "fraud" ? (
                        <span className="text-xs font-medium text-text-secondary italic">No Action Needed</span>
                      ) : (
                        <LoadingButton
                          onClick={() => handleMakeFraud(user._id)}
                          variant="outline"
                          className="rounded-full !py-1 !px-4 text-xs h-8 min-w-[100px] !border-danger text-danger hover:!bg-danger hover:text-white"
                          loadingText="Processing..."
                        >
                          Mark Fraud
                        </LoadingButton>
                      )}
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

export default ManageUsers;
