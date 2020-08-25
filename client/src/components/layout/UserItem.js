import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
  const { name, imageUrl } = props.user;
  return (
    <div className="card text-center">
      <img src={imageUrl} alt="" className="round-img" style={{ width: '60px' }} />
      <h3> {name}</h3>
     
    </div>
  );
};

export default UserItem;
