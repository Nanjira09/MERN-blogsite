import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "./Nav.css";

function Nav() {
  const { user, dispatch } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>About</li>
        <li>
          <Link to="/write">Write</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => {
                dispatch({ type: "logout" });
              }}
            >
              Logout
            </li>
            <Link to="/profile">
              <img className="profileImg" src={user.userProfile} alt="" />
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
