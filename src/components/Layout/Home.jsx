import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../providers/AuthProviders";

const Home = () => {
  // Context API
  const { fullLoading } = useContext(AuthContext);

  // Loading when page is reload
  if (fullLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

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
