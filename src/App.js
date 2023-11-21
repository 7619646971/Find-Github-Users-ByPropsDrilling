import React, { useState, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import "./App.css";
import NotFound from "./components/pages/NotFound";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  //Search Github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  //Get singel Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  //Get urers repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:as&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  //clear users from dtate
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //Aleart masg
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <Router>
      <div className='App'>
        {/* <Navbar title="My Custom Title" icon="fab fa-custom-icon" /> */}
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path='/'
              element={
                <Fragment>
                  <Search
                    clearUsers={clearUsers}
                    showAlert={showAlert}
                    showClear={users.length > 0 ? true : false}
                    searchUsers={searchUsers}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />

            <Route
              exact
              path='/user/:login'
              render={(routeProps) => (
                <User
                  {...routeProps}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />

            <Route exact path='/about' component={About} />
            <Route path='*' component={NotFound} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
