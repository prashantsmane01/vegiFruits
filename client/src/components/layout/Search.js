import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
//import AlertContext from '../../context/alerts/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  // const alerContext = useContext(AlertContext);
  const { clearUsers, searchUsers, users } = githubContext;
  //const { setAlert } = alerContext;
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (text === '') {
    //   alerContext.setAlert('Please enter something', 'light');
    // } else {
    searchUsers(text);

    setText('');
    // }
  };

  return (
    <div>
      <form className="Form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="Search Users ....." value={text} onChange={onChange} />
        <input type="submit" value="search" className="btn btn-dark btn-block" />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
