import React from "react";

const Home = () => {
  return (
    <div>
      <div
        className="hero min-h-screen lg:min-h-[690px]"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Collaborative Task Management App
            </h1>
            <p className="mb-5">
              The application will allow users to create, assign, and track
              tasks in a team environment.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
