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
  delTeam.members = delTeam.members.filter((each) => each !== data.username);
  localStorage.setItem("teams", JSON.stringify([...restTeams, delTeam]));
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
};
