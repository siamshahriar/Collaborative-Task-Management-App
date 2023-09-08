import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { logOutUser } from "../../../addToDB/addToDB";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const { user, setLogChange } = useContext(AuthContext);
  // console.log(user);
  const handleLogOut = () => {
    logOutUser();
    setLogChange(Math.random());
    const notify = () => toast.success("logout successfull");
    notify();
  };

  return (
    <div>
      <div className="navbar bg-base-300 xl:px-64">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Task Management App
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link onClick={handleLogOut} to="/">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar tooltip tooltip-right"
            data-tip={user?.username}
          >
            <div className="w-10 rounded-full">
              <img
                src={
                  user
                    ? `${user.imgURL}`
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
