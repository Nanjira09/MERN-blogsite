import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import SinglePost from "./components/SinglePost";
import Write from "./components/Write";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/write" exact>
            {user ? <Write /> : <Login />}
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/profile" exact>
            {user ? <Profile /> : <HomePage />}
          </Route>
          <Route path="/:id" exact>
            <SinglePost />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
