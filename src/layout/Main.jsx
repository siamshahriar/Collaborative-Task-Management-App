import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      <div className="xl:px-64">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
    
  );
};

export default Main;
