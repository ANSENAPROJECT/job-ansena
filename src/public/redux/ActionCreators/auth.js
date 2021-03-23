import * as actionTypes from '../actionTypes';

export const setLoginTrue = (data) => {
  return {
    type: 'LOGIN_TRUE',
    data,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
