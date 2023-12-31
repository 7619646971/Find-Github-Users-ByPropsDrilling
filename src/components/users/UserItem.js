import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  const { login, avatar_url } = user;

  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt='imageOfUser'
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${user.login}`} className='btn btn-dark btn-sm my-1'>
          more
        </Link>
      </div>
    </div>
  );
};

UserItem.prototype = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
