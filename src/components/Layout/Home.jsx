import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-[98%] md:w-[90%] mx-auto">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
