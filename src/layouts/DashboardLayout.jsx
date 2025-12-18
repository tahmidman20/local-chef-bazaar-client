import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { CiInboxIn } from "react-icons/ci";
import {
  MdDeliveryDining,
  MdFavorite,
  MdOutlineFoodBank,
  MdReviews,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loader from "../components/Loader";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked
      />

      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-yellow-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <img
              className="h-13"
              src="https://i.ibb.co.com/qMNhKD5v/Local-Chef-Bazaar.png"
              alt=""
            />
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* chef */}
            {/* our dashboard links */}
            {role === "chef" && (
              <li>
                <NavLink
                  to="/dashboard/add-meal"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Create Meal"
                >
                  <GiHotMeal />{" "}
                  <span className="is-drawer-close:hidden">Create Meal</span>
                </NavLink>
              </li>
            )}
            {/* chef my meals */}
            {role === "chef" && (
              <li>
                <NavLink
                  to="/dashboard/my-meals"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="my Meals"
                >
                  <MdOutlineFoodBank />{" "}
                  <span className="is-drawer-close:hidden">My Meals</span>
                </NavLink>
              </li>
            )}
            {/* order request */}
            {role === "chef" && (
              <li>
                <NavLink
                  to="/dashboard/order-requests"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Order Requests"
                >
                  <CiInboxIn />{" "}
                  <span className="is-drawer-close:hidden">Order Requests</span>
                </NavLink>
              </li>
            )}
            {/* user my-orders */}
            {role === "user" && (
              <li>
                <NavLink
                  to="/dashboard/my-orders"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Orders"
                >
                  <MdDeliveryDining />{" "}
                  <span className="is-drawer-close:hidden">My Orders</span>
                </NavLink>
              </li>
            )}
            {/* user my-reviews */}
            {role === "user" && (
              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Reviews"
                >
                  <MdReviews />{" "}
                  <span className="is-drawer-close:hidden">My Reviews</span>
                </NavLink>
              </li>
            )}
            {/* user my-favorites */}
            {role === "user" && (
              <li>
                <NavLink
                  to="/dashboard/favorite-meals"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Favorite Meals"
                >
                  <MdFavorite />{" "}
                  <span className="is-drawer-close:hidden">Favorite Meals</span>
                </NavLink>
              </li>
            )}

            {/* List item */}
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                {/* Settings icon */}
                <FaUserCircle />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
