const addUsersToDB = (data) => {
  let users = getUsersFromDB();
  // console.log(users);

  const exists = users.find(
    (each) => each.username === data.username || each.email === data.email
  );

  if (exists) {
    return true;
  }

  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));
};

const getUsersFromDB = () => {
  let users = [];
  const stored = localStorage.getItem("users");

  if (stored) {
    users = JSON.parse(stored);
  }
  return users;
};

const loginUser = (data) => {
  let users = getUsersFromDB();
  console.log(users);

  const exists = users.find(
    (each) => each.password === data.password && each.email === data.email
  );

  // console.log(exists);
  if (exists) {
    localStorage.setItem("loggedUser", JSON.stringify(exists));
    return true;
  } else {
    return false;
  }
};

const logOutUser = () => {
  localStorage.setItem("loggedUser", JSON.stringify(null));
};

// Users Login/register part ended

const teamsGet = () => {
  let teams = [];
  const stored = localStorage.getItem("teams");

  if (stored) {
    teams = JSON.parse(stored);
  }

  return teams;
};

const teamsAdd = (data) => {
  let teams = teamsGet();
  const exists = teams.find((each) => each.id === data.id);

  if (exists) {
    return true;
  }

  teams.push(data);
  localStorage.setItem("teams", JSON.stringify(teams));
};

const teamsAlldlt = () => {
  localStorage.setItem("teams", JSON.stringify([]));
};

const leaveTeam = (data) => {
  // console.log(data.username);
  let teams = teamsGet();
  let delTeam = teams.find((each) => each.members.includes(data.username));
  let restTeams = teams.filter((each) => each.id !== delTeam.id);
  // console.log(delTeam);
  delTeam.members = delTeam.members.filter((each) => each !== data.username);
  localStorage.setItem("teams", JSON.stringify([...restTeams, delTeam]));
};

// Create teamsAdd, leave, delete all teams ended

const teamLessUsers = () => {
  let allUsernames = getUsersFromDB();
  let allTeamsMembers = teamsGet().flatMap((each) => each.members);
  // console.log(getUsersFromDB(), teamsGet());
  const teamlessUsersFounded = allUsernames.filter(
    (obj) => !allTeamsMembers.includes(obj.username)
  );
  return teamlessUsersFounded;
};

// const teamInviteGet = () => {
//   let invites = [];
//   const stored = localStorage.getItem("invites");

//   if (stored) {
//     invites = JSON.parse(stored);
//   }

//   return invites;
// };

const teamInviteAdd = (data) => {
  let { joinStatus, eachData } = data;
  const exists = joinStatus.invites.includes(eachData.username);

  if (exists) {
    return true;
  }

  joinStatus.invites.push(eachData.username);
  // console.log(joinStatus);

  const restTeams = teamsGet().filter((each) => each.id !== joinStatus.id);
  const newTeam = [...restTeams, joinStatus];
  // console.log(newTeam);
  localStorage.setItem("teams", JSON.stringify(newTeam));
  return false;
};

const teamInviteAccept = (data) => {
  const { eachData, user } = data;
  // console.log(eachData, user);
  let teams = teamsGet();
  let delTeam = teams.find((each) => each.invites.includes(user.username));
  // console.log(delTeam);
  let restTeams = teams.filter((each) => each.id !== delTeam.id);
  delTeam.invites = delTeam.invites.filter((each) => each !== user.username);
  delTeam.members.push(user.username);
  // console.log(delTeam);
  localStorage.setItem("teams", JSON.stringify([...restTeams, delTeam]));
  return true;
};

const teamInviteReject = (data) => {
  const { eachData, user } = data;
  let teams = teamsGet();
  let delTeam = teams.find((each) => each.invites.includes(user.username));
  // console.log(delTeam);
  let restTeams = teams.filter((each) => each.id !== delTeam.id);
  delTeam.invites = delTeam.invites.filter((each) => each !== user.username);
  localStorage.setItem("teams", JSON.stringify([...restTeams, delTeam]));
  return true;
};

// Teams join, Invite, accept, reject done

// Tasks handle starts

const tasksAssign = (teamTasks) => {
  let { joinStatus, task } = teamTasks;
  let teams = teamsGet();
  // console.log(joinStatus, task);
  // console.log(joinStatus);
  // joinStatus.tasks.push(task);
  // joinStatus.tasks.push(task);

  const exists = joinStatus.tasks.find(
    (each) => each.id === task.id || each.title === task.title
  );
  // console.log(exists);
  if (exists) {
    return true;
  }

  // console.log(exists);

  joinStatus.tasks.push(task);
  let restTeams = teams.filter((each) => each.id !== joinStatus.id);
  // console.log(restTeams);
  // console.log(joinStatus);
  console.log(joinStatus, restTeams);
  localStorage.setItem("teams", JSON.stringify([...restTeams, joinStatus]));
};

// Task pending InProgress Completed marker and Delete Starts

const tasksPendingMarker = (data) => {
  let { joinStatus, eachTask } = data;
  let teams = teamsGet();
  let restTasks = joinStatus.tasks.filter((each) => each.id !== eachTask.id);

  eachTask.pending = true;
  eachTask.inProgress = false;
  eachTask.completed = false;

  joinStatus.tasks = [...restTasks, eachTask];

  let restTeams = teams.filter((each) => each.id !== joinStatus.id);
  // console.log([...restTeams, joinStatus]);
  localStorage.setItem("teams", JSON.stringify([...restTeams, joinStatus]));

  return true;
};
const tasksinProgressMarker = (data) => {
  let { joinStatus, eachTask } = data;
  let teams = teamsGet();
  let restTasks = joinStatus.tasks.filter((each) => each.id !== eachTask.id);

  eachTask.pending = false;
  eachTask.inProgress = true;
  eachTask.completed = false;

  joinStatus.tasks = [...restTasks, eachTask];

  let restTeams = teams.filter((each) => each.id !== joinStatus.id);
  // console.log([...restTeams, joinStatus]);
  localStorage.setItem("teams", JSON.stringify([...restTeams, joinStatus]));

  return true;
};
const tasksCompletedMarker = (data) => {
  let { joinStatus, eachTask } = data;
  let teams = teamsGet();
  let restTasks = joinStatus.tasks.filter((each) => each.id !== eachTask.id);

  eachTask.pending = false;
  eachTask.inProgress = false;
  eachTask.completed = true;

  joinStatus.tasks = [...restTasks, eachTask];

  let restTeams = teams.filter((each) => each.id !== joinStatus.id);
  // console.log([...restTeams, joinStatus]);
  localStorage.setItem("teams", JSON.stringify([...restTeams, joinStatus]));

  return true;
};
const tasksDeleteMaker = (data) => {
  let { joinStatus, eachTask } = data;
  let teams = teamsGet();
  joinStatus.tasks = joinStatus.tasks.filter((each) => each.id !== eachTask.id);

  let restTeams = teams.filter((each) => each.id !== joinStatus.id);
  // console.log([...restTeams, joinStatus]);
  localStorage.setItem("teams", JSON.stringify([...restTeams, joinStatus]));

  return true;
};

export {
  addUsersToDB,
  getUsersFromDB,
  logOutUser,
  loginUser,
  teamsAdd,
  teamsAlldlt,
  teamsGet,
  leaveTeam,
  teamLessUsers,
  teamInviteAdd,
  teamInviteAccept,
  teamInviteReject,
  tasksAssign,
  tasksPendingMarker,
  tasksinProgressMarker,
  tasksCompletedMarker,
  tasksDeleteMaker,
};
