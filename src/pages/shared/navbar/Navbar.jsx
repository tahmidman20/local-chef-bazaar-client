import React from "react";
import { GrHome } from "react-icons/gr";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
    toast
      .success("Logout successful")
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(user?.photoURL);
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive && "font-bold text-md text-secondary underline"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive && "font-bold text-md text-secondary underline"
          }
        >
          Meals
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            // className={({ isActive }) =>
            //   isActive && "font-bold text-md text-secondary underline"
            // }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <img
            className="h-13"
            src="https://i.ibb.co.com/qMNhKD5v/Local-Chef-Bazaar.png"
            alt=""
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <a onClick={handleLogOut} className="btn btn-secondary">
              Log Out
            </a>
          ) : (
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          )}
        </div>
        {/* image */}
        <NavLink
          to="/dashboard/my-profile"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? "text-yellow-500 font-bold" : ""}`
          }
        >
          <div className="w-11 h-11 rounded-full overflow-hidden mb-2 ring ring-primary mx-3">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co.com/Txy1pYZv/istockphoto-1130884625-612x612.jpg"
              }
              alt="User Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
