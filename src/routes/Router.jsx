import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Meals from "../pages/meals/Meals";
import PrivateRoute from "./PrivateRoute";
import ViewMealDetails from "../pages/meals/ViewMealDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMeals from "../pages/Dashboard/AddMeals";
import OrderNow from "../pages/OrderNow";
import MyOrders from "../pages/Dashboard/MyOrders";
import PaymentSuccess from "../pages/Dashboard/payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/payment/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "meals",
        Component: Meals,
      },
      {
        path: "meal-details/:id",
        element: (
          <PrivateRoute>
            <ViewMealDetails></ViewMealDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "order-now/:id",
        element: (
          <PrivateRoute>
            <OrderNow></OrderNow>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-meal",
        Component: AddMeals,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
