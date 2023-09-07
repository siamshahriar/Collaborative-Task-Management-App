import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <figure className="px-10 pt-10">
          <img src={user?.imgURL} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.displayName}</h2>
          <p>Email: {user?.email}</p>
          <p>Bio: {user?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
