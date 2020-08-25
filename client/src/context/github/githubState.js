import React, { useReducer } from 'react';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import axios from 'axios';
import { SEARCH_USERS, GET_USER, SET_LOADING, GET_REPOS, CLEAR_USERS } from '../types.js';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search users
  const REACT_APP_GITHUB_CLIENT_ID = '280d4ce1d2626ada69b5';
  const REACT_APP_GITHUB_CLIENT_SECRET = '617a24a1a582744675999859c2e922e46cfc7775';
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get('/api/products');
    console.log('............res......' + JSON.stringify(res));
    dispatch({ type: SEARCH_USERS, payload: res.data });
  };

  //get User
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&
     client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({ type: GET_USER, payload: res.data });
  };
  //get Repos

  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&
     client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  //clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}>
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
