import React from "react";
import { Outlet } from "react-router";
import PageTransition from "../components/loading/PageTransition";

const AuthLayout = () => {
  return (
    <PageTransition>
      <Outlet></Outlet>
    </PageTransition>
  );
};

export default AuthLayout;
