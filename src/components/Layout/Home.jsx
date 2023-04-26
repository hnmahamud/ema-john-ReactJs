import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
