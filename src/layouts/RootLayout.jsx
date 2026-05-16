import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/navbar/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import PageTransition from "../components/loading/PageTransition";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-soft-bg font-body">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-20 lg:pt-24">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
