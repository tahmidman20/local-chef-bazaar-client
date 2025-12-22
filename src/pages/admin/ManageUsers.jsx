import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, [axiosSecure]);

  const handleMakeFraud = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make fraud",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fraud/${id}`).then(() => {
          setUsers(
            users.map((u) => (u._id === id ? { ...u, status: "fraud" } : u))
          );

          Swal.fire("Done!", "User marked as fraud", "success");
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(
              (user, index) => (
                console.log(user),
                (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td className="capitalize">{user.role}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "fraud"
                            ? "badge-error"
                            : "badge-success"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      {user.role === "admin" || user.status === "fraud" ? (
                        <button className="btn btn-xs btn-disabled">
                          Make Fraud
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeFraud(user._id)}
                          className="btn btn-xs btn-error"
                        >
                          Make Fraud
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
