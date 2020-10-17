import React, { useState, useCallback } from "react";
import axios from "axios";
import history from "../history";

export const AuthContext = React.createContext({
  user: null,
  fetchUser: () => {},
  signIn: () => {},
  signOut: () => {},
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const signInHandler = async (values) => {
    const res = await axios.post("/api/users/signin", values);
    if (res.status === 200) {
      history.push("/");
      setUser(res.data.data);
    }
  };

  const fetchUserHandler = useCallback(async () => {
    try {
      const res = await axios.get("/api/users/current-user");
      if (res.status === 200) setUser(res.data.data);
    } catch (err) {
      if (err.response.status === 401) setUser({});
    }
  }, []);

  const signOutHandler = async () => {
    const res = await axios.get("/api/users/logout");
    if (res.status === 200) {
      history.push("/");
      setUser({});
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: signInHandler,
        fetchUser: fetchUserHandler,
        signOut: signOutHandler,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
