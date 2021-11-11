import React, { useReducer } from "react";
import { UserContext } from "./UserContext";
import userReducer from "./userReducer";

function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [state, dispatch] = useReducer(userReducer, user);
  return (
    <UserContext.Provider value={{ user: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
