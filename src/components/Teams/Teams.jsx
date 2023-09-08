import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import {
  leaveTeam,
  teamInviteAccept,
  teamInviteAdd,
  teamInviteReject,
  teamLessUsers,
  teamsAdd,
  teamsAlldlt,
  teamsGet,
} from "../../addToDB/addToDB";
import { toast } from "react-hot-toast";

const Teams = () => {
  const { user } = useContext(AuthContext);
  const [joinStatus, setJoinStatus] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);
  const [makeRender, setMakeRender] = useState(false);
  const [teamLess, setTeamLess] = useState([]);

  useEffect(() => {
    const foundTeam = teamsGet();
    if (foundTeam) {
      setJoinStatus(
        foundTeam.find((each) => each.members.includes(user.username))
      );
    }
  }, [makeRender]);

  useEffect(() => {
    setTeamLess(teamLessUsers());
  }, [makeRender]);

  useEffect(() => {
    const foundTeam = teamsGet();
    if (foundTeam) {
      setJoinRequests(
        foundTeam.filter((each) => each.invites.includes(user.username))
      );
    }
  }, [makeRender]);

  // console.log(joinRequests);

  // console.log(teamLess);

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
    let invites = [];

    const result = teamsAdd({ id, name, members, tasks, invites });
    if (result) {
      const notify = () =>
        toast.error("team ID exists, try with different Team ID");
      notify();
    } else {
      e.target.reset();
      const notify = () =>
        toast.success(" team created and joined successfully");
      notify();
      setMakeRender(!makeRender);
    }
  };

  const inviteHandler = (eachData) => {
    const result = teamInviteAdd({ joinStatus, eachData });
    // console.log(result);
    if (result) {
      const notify = () => toast.error("you already invited the user");
      notify();
    } else {
      const notify = () => toast.success("Invitesion successfull !");
      notify();
    }
  };

  const acceptHandler = (eachData) => {
    if (joinStatus) {
      const notify = () =>
        toast.error("Please leave the current team to Accept new Team");
      notify();
    } else {
      const result = teamInviteAccept({ eachData, user });
      if (result) {
        const notify = () => toast.success("Accepted");
        notify();
        setMakeRender(!makeRender);
      }
    }
  };
  const rejectHandler = (eachData) => {
    if (joinStatus) {
      const notify = () =>
        toast.error("Please leave the current team to Reject any Request");
      notify();
    } else {
      const result = teamInviteReject({ eachData, user });
      if (result) {
        const notify = () => toast.success("Rejected");
        notify();
        setMakeRender(!makeRender);
      }
    }
  };

  console.log(joinRequests);
  return (
    <div>
      <div className="lg:flex justify-center gap-10 mt-10">
        {/* Create teams starts  */}
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
        {/* Create teams Ended  */}

        {/* Invite teamless starts  */}
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
              <button
                className={joinStatus ? "btn" : " btn btn-disabled"}
                onClick={() =>
                  document.getElementById("my_modal_4_invite").showModal()
                }
              >
                Invite
              </button>
              <dialog id="my_modal_4_invite" className="modal">
                <div className="modal-box w-11/12 max-w-5xl text-black">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {teamLess?.map((each, index) => (
                          <tr key={index}>
                            <td>{each.username}</td>
                            <td>{each.email}</td>
                            <td
                              onClick={() => inviteHandler(each)}
                              className="btn btn-accent"
                            >
                              Invite
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
        {/* Invite Teamless Ends  */}
        {/* Join Team Starts */}
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">
              Incoming Requests
            </h2>
            <div className="card-actions justify-center mt-5">
              <button
                className={joinStatus ? " btn btn-disabled" : "btn"}
                onClick={() =>
                  document.getElementById("my_modal_4_join").showModal()
                }
              >
                Check
              </button>
              <dialog id="my_modal_4_join" className="modal">
                <div className="modal-box w-11/12 max-w-5xl text-black">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Team Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {joinRequests?.map((each, index) => (
                          <tr key={index}>
                            <td>{each.name}</td>
                            <td
                              onClick={() => acceptHandler(each)}
                              className="btn btn-secondary mr-2"
                            >
                              Accept
                            </td>
                            <td
                              onClick={() => rejectHandler(each)}
                              className="btn btn-error"
                            >
                              Reject
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {joinRequests.length === 0 && (
                      <p className="text-center text-2xl font-semibold bg-yellow-300 mt-10 ">
                        {" "}
                        No Join Requests{" "}
                      </p>
                    )}
                  </div>

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
        {/* Join Team Ends */}
      </div>

      {joinStatus ? (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto mt-10">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold">You are on Team</h2>
            <p className="font-semibold text-xl text-red-500">
              Create Team and Incoming Request Buttons are disabled
            </p>
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
      ) : (
        <div className="card w-96 bg-base-200 shadow-xl mx-auto mt-10">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold">
              Invite Teamless Users Button is Disabled
              <br />
              <br />
              Create a Team or Join a Team To Invite People
            </h2>
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
