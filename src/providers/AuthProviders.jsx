import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logChange, setLogChange] = useState(0);

  useEffect(() => {
    let activeUser = null;
    const stored = localStorage.getItem("loggedUser");

    if (stored) {
      activeUser = JSON.parse(stored);
    }

    setUser(activeUser);
    setLoading(false);
  }, [logChange]);

  const authInfo = {
    user,
    loading,
    setLogChange,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
