import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import {
  leaveTeam,
  teamsAdd,
  teamsAlldlt,
  teamsGet,
} from "../../addToDB/addToDB";

const Teams = () => {
  const { user } = useContext(AuthContext);
  const [joinStatus, setJoinStatus] = useState(false);
  const [makeRender, setMakeRender] = useState(false);

  useEffect(() => {
    setJoinStatus(
      teamsGet().find((each) => each.members.includes(user.username))
    );
  }, [makeRender]);

  // console.log(joinStatus);

  const deleteAllTeamsHadler = () => {
    teamsAlldlt();
    setMakeRender(!makeRender);
  };

  const leaveTeamhandler = (data) => {
    leaveTeam(data);
    setMakeRender(!makeRender);
  };

  const createTeamFormHandler = (e) => {
    e.preventDefault();
    let id = e.target.teamID.value;
    let name = e.target.teamName.value;
    let members = [user.username];
    let tasks = [];

    const result = teamsAdd({ id, name, members, tasks });
    if (result) {
      window.alert("team ID exists, try with different Team ID");
    } else {
      e.target.reset();
      window.alert(" team created and joined successfully");
      setMakeRender(!makeRender);
    }
  };
  return (
    <div>
      <div className="lg:flex justify-center gap-10 mt-10">
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Create Team</h2>
            <div className="card-actions justify-center mt-5">
              <button
                className={joinStatus ? "btn btn-disabled" : "btn"}
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Create
              </button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl text-black">
                  {/* form starts  */}

                  <div className="hero  bg-base-200">
                    <div className="hero-content ">
                      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form
                          onSubmit={createTeamFormHandler}
                          className="card-body"
                        >
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                team unique ID/name
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="unique name/ID"
                              className="input input-bordered"
                              name="teamID"
                              required
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Team Name</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Team name"
                              className="input input-bordered"
                              name="teamName"
                              required
                            />
                          </div>

                          <div className="form-control mt-6">
                            <button className="btn btn-primary">
                              Create team
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* form ends  */}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">
              Invite Teamless Users
            </h2>
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-primary">Invite</button>
            </div>
          </div>
        </div>
      </div>

      {joinStatus && (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto mt-10">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold">You are on Team</h2>
            <p>Leave this Team to Create or Join</p>
            <div className="card-actions justify-center mt-4">
              <button
                onClick={() => leaveTeamhandler(user)}
                className="btn btn-primary"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mt-10">
        <button onClick={deleteAllTeamsHadler} className="btn btn-warning">
          Delete all Teams
        </button>
      </div>
    </div>
  );
};

export default Teams;
