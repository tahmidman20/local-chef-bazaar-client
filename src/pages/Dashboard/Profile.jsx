import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user, loading } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setDbLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setDbLoading(false);
        });
    }
  }, [user]);

  if (loading || dbLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">User Name</p>
            <p className="font-semibold text-gray-800">{dbUser?.name}</p>
          </div>

          {/* Email */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">User Email</p>
            <p className="font-semibold text-gray-800">{user?.email}</p>
          </div>

          {/* Address */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold text-gray-800">
              {dbUser?.address || "Not Provided"}
            </p>
          </div>

          {/* Role */}
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

          {/* Chef ID only if role === chef */}
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
