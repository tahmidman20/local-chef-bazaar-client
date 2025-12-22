import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);
  const { role } = useRole();

  const handleRequest = async (type) => {
    await axiosSecure.post("/requests", {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,
    });
    toast.success("Request submitted!");
  };

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)

        .then((res) => {
          setDbUser(res.data);
          setDbLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setDbLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (loading || dbLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={user?.photoURL || "https://i.ibb.co/2d9Jp9y/user.png"}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-yellow-400 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            {dbUser?.name || "N/A"}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="flex flex-row gap-4 w-full my-4">
          {role === "chef" && (
            <button
              onClick={() => handleRequest("admin")}
              className="btn btn-primary btn-outline w-full flex-1"
            >
              Be an admin
            </button>
          )}
          {role === "user" && (
            <div className="flex flex-row gap-4 w-full my-4">
              <button
                onClick={() => handleRequest("admin")}
                className="btn btn-primary btn-outline w-full flex-1"
              >
                Be an admin
              </button>

              <button
                onClick={() => handleRequest("chef")}
                className="btn btn-secondary btn-outline w-full flex-1"
              >
                Be a chef
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">User Name</p>
            <p className="font-semibold text-gray-800">{dbUser?.name}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">User Email</p>
            <p className="font-semibold text-gray-800">{user?.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold text-gray-800">
              {dbUser?.address || "Not Provided"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Role</p>
            <span className="badge badge-warning capitalize">
              {dbUser?.role}
            </span>
          </div>

          {/* Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`badge ${
                dbUser?.status === "active" ? "badge-success" : "badge-error"
              } capitalize`}
            >
              {dbUser?.status}
            </span>
          </div>

          {dbUser?.role === "chef" && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Chef ID</p>
              <p className="font-semibold text-gray-800">{dbUser?.chefId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
