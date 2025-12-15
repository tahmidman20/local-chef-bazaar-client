import React from "react";
import { useForm, Watch } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { saveOrUpdateUser } from "../../utlis";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    console.log("After register", data.photo[0]);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password, data.name)
      .then((result) => {
        console.log(result);
        toast.success("Registration successful");
        navigate(location?.state || "/");
        //store image and get url
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageApiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(imageApiURL, formData).then((res) => {
          console.log("after image upload", res);
          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.display_url,
          };

          updateUserProfile(userProfile)
            .then(() => {
              const dbUser = {
                name: data.name,
                email: data.email,
                photoURL: res.data.data.display_url,
                address: data.address,
              };

              saveOrUpdateUser(dbUser).then(() => {
                navigate(location?.state || "/");
              });
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 p-10 mt-6">
      <h1 className="text-4xl font-semibold text-center text-secondary">
        Welcome to Local-Cher-Bazaar
      </h1>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <h2 className="text-3xl font-semibold text-center text-secondary">
          Register Now
        </h2>
        <fieldset className="fieldset ">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
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
          {/* image */}
          <label className="label">Image</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="input w-full file-input"
            placeholder="Your Image"
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          {/* address */}
          <label className="label">Address</label>
          <input
            type="text"
            {...register("address", { required: true })}
            className="input w-full"
            placeholder="Your Address"
          />
          {errors.address?.type === "required" && (
            <p className="text-red-500">Address is required</p>
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
          {/* confirm password */}
          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="input w-full "
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-secondary mt-4 w-full">Register</button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
            state={location.state}
            className="text-blue-500 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
