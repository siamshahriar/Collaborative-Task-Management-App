import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import {
  tasksAssign,
  tasksCompletedMarker,
  tasksDeleteMaker,
  tasksPendingMarker,
  tasksinProgressMarker,
  teamsGet,
} from "../../addToDB/addToDB";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [joinStatus, setJoinStatus] = useState(false);
  const [makeRender, setMakeRender] = useState(false);

  useEffect(() => {
    const foundTeam = teamsGet();
    if (foundTeam) {
      setJoinStatus(
        foundTeam.find((each) => each.members.includes(user.username))
      );
    }
  }, [makeRender]);

  const handleAssignForm = (e) => {
    e.preventDefault();
    const form = e.target;
    let id = form.taskID.value;
    let title = form.taskTitle.value;
    let description = form.description.value;
    let dueDate = form.dueDate.value;
    let priority = form.priority.value;
    let assignedTo = form.assignTo.value;
    let completed = false;
    let inProgress = false;
    let pending = true;
    let task = {
      id,
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      completed,
      inProgress,
      pending,
    };

    const result = tasksAssign({ task, joinStatus });
    if (result) {
      window.alert(
        "same Task ID or Title exists, try creating with different ID and Title"
      );
    } else {
      setMakeRender(!makeRender);
      window.alert("assigned success");
    }
  };

  const HandlePendingMarker = (eachTask) => {
    const result = tasksPendingMarker({ eachTask, joinStatus });
    setMakeRender(!makeRender);
  };
  const HandleInProgressMarker = (eachTask) => {
    const result = tasksinProgressMarker({ eachTask, joinStatus });
    setMakeRender(!makeRender);
  };
  const HandleCompletedMarker = (eachTask) => {
    const result = tasksCompletedMarker({ eachTask, joinStatus });
    setMakeRender(!makeRender);
  };
  const HandleTaskDeleted = (eachTask) => {
    const result = tasksDeleteMaker({ eachTask, joinStatus });
    setMakeRender(!makeRender);
  };

  return (
    <div className="lg:flex justify-center gap-10 mt-10">
      {/* Team Tasks Lists Starts  */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Team Tasks</h2>
          <p>"All team Tasks and Assigned Tasks are Here"</p>
          <div className="card-actions justify-end">
            <button
              className={joinStatus ? "btn" : "btn-disabled"}
              onClick={() =>
                document.getElementById("my_modal_4_team_tasks").showModal()
              }
            >
              View
            </button>
            <dialog id="my_modal_4_team_tasks" className="modal">
              <div className="modal-box w-11/12 max-w-fit">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Task Title</th>
                        <th>Description</th>
                        <th>DueDate</th>
                        <th>Priority</th>
                        <th>AssignedTo</th>
                        <th>Pending</th>
                        <th>InProgress</th>
                        <th>Completed</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {joinStatus &&
                        joinStatus.tasks.map((each, index) => (
                          <tr key={index}>
                            <td>{each.title}</td>
                            <td>{each.description}</td>
                            <td>{each.dueDate}</td>
                            <td>{each.priority}</td>
                            <td>{each.assignedTo}</td>
                            <td
                              onClick={() => HandlePendingMarker(each)}
                              className={
                                each.pending
                                  ? "bg-green-600 text-white rounded-xl cursor-pointer"
                                  : "bg-yellow-100 text-black rounded-xl cursor-pointer "
                              }
                            >
                              Pending
                            </td>
                            <td
                              onClick={() => HandleInProgressMarker(each)}
                              className={
                                each.inProgress
                                  ? "bg-green-600 text-white rounded-xl cursor-pointer"
                                  : "bg-yellow-100 text-black rounded-xl cursor-pointer "
                              }
                            >
                              InProgress
                            </td>
                            <td
                              onClick={() => HandleCompletedMarker(each)}
                              className={
                                each.completed
                                  ? "bg-green-600 text-white rounded-xl cursor-pointer"
                                  : "bg-yellow-100 text-black rounded-xl cursor-pointer "
                              }
                            >
                              Completed
                            </td>
                            <td
                              onClick={() => HandleTaskDeleted(each)}
                              className="bg-red-500 text-white rounded-xl cursor-pointer"
                            >
                              remove
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
      {/* Team Tasks Lists Ends  */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Assign Tasks</h2>
          <p>
            `Assign task to self or Team Members ( Only Team Members can access
            this )`
          </p>
          <div className="card-actions justify-end">
            <button
              className={joinStatus ? "btn" : "btn-disabled"}
              onClick={() =>
                document.getElementById("my_modal_4_assign_tasks").showModal()
              }
            >
              Assign
            </button>
            <dialog id="my_modal_4_assign_tasks" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                {/* Assign task Form starts */}
                <div className="hero  bg-base-100">
                  <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                      <form onSubmit={handleAssignForm} className="card-body">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Task Unique ID</span>
                          </label>
                          <input
                            type="text"
                            placeholder="unique Task ID"
                            className="input input-bordered"
                            name="taskID"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Task Title</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Task Title"
                            className="input input-bordered"
                            name="taskTitle"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Description</span>
                          </label>
                          <input
                            type="text"
                            placeholder="description"
                            className="input input-bordered"
                            name="description"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">DueDate</span>
                          </label>
                          <input
                            type="text"
                            placeholder="DueDate"
                            className="input input-bordered"
                            name="dueDate"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Priority</span>
                          </label>
                          <select
                            name="priority"
                            className="select select-bordered w-full max-w-xs"
                          >
                            <option value="3">High</option>
                            <option value="2">Medium</option>
                            <option value="1">low</option>
                          </select>
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">
                              Assign this Task to =>
                            </span>
                          </label>
                          <select
                            name="assignTo"
                            className="select select-bordered w-full max-w-xs"
                          >
                            {joinStatus &&
                              joinStatus.members.map((each, index) => (
                                <option key={index} value={each}>
                                  {each === user.username ? "Myself" : each}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="form-control mt-6">
                          <button className="btn btn-primary">Assign</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Assign task Form Ends */}
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
    </div>
  );
};

export default Tasks;
