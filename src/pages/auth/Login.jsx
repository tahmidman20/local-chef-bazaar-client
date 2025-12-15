import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { saveOrUpdateUser } from "../../utlis";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    singInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const dbUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        saveOrUpdateUser(dbUser).then(() => {
          toast.success("Login successful");
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="max-w-3xl mx-auto mt-6 bg-gray-100 p-10">
      <h1 className="text-4xl font-semibold text-center text-secondary">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <h2 className="text-3xl font-semibold text-center text-secondary">
          Login Now
        </h2>
        <fieldset className="fieldset ">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-secondary mt-4 w-full">Login</button>
        </fieldset>
        <p>
          Don't have an account?{" "}
          <Link
            state={location.state}
            className="text-blue-500 underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
