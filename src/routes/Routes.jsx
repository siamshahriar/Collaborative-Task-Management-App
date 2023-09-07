import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Profile from "../components/Profile/Profile";
import Teams from "../components/Teams/Teams";
import Tasks from "../components/Tasks/Tasks";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/teams",
        element: (
          <PrivateRoute>
            <Teams></Teams>
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <Tasks></Tasks>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
