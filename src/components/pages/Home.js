import React, { Fragment } from "react";
import Search from "../users/Search";
import Users from "../users/Users";

const Home = ({ searchUsers, clearUsers, showClear, users }, props) => {
  return (
    <Fragment>
      <Search
        searchUsers={searchUsers}
        clearUsers={clearUsers}
        showClear={showClear}
        showAlert={props.showAlert}
      />
      <Users loading={props.loading} users={users} />
    </Fragment>
  );
};

export default Home;
