import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import { addUsersToDB } from "../../addToDB/addToDB";
import { toast } from "react-hot-toast";

const Register = () => {
  const { user, createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const username = form.name.value;
    const email = form.email.value;
    const imgURL = form.imgURL.value;
    const bio = form.bio.value;
    const password = form.password.value;
    // console.log(name, email, password);
    // let user = {username, email, password, imgURL, bio}

    const result = addUsersToDB({ username, email, password, imgURL, bio });
    console.log(result);
    if (result) {
      const notify = () =>
        toast.error("User exists, try with different email and username");
      notify();
    } else {
      const notify = () => toast.success("register success");
      notify();
      form.reset();
      navigate("/login");
    }
    // if (!result) {
    //   console.log(result);
    // } else {
    //   console.log(result);
    // }
  };
  return (
    <div>
      <div className="hero bg-base-100">
        <div className="hero-content flex-col ">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Register Now!</h1>
            <p className="py-6">Register to access the Tasks, Teams features</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="URL"
                  name="imgURL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <input
                  type="text"
                  placeholder="bio"
                  name="bio"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-success">Register</button>
              </div>

              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  Already having account? Login here
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
