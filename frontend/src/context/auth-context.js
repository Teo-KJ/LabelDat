import React, { useState, useCallback } from "react";
import axios from "axios";

export const AuthContext = React.createContext({
  user: null,
  fetchUser: () => {},
  signIn: () => {},
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const signInHandler = async (values) => {
    const res = await axios.post("/api/users/signin", values);
    if (res.status === 200) setUser(res.data.data);
  };

  const fetchUserHandler = useCallback(async () => {
    const res = await axios.get("/api/users/current-user");
    setUser(res.data.data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: signInHandler,
        fetchUser: fetchUserHandler,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
