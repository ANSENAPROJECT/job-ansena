import * as actionTypes from '../actionTypes';

const initialState = {
  isLogin: false,
  adminStatus: null,
  coadminStatus: null,
  code: null,
  idUser: null,
  name: null,
  token: null,
};

const AuthReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_TRUE':
      return {
        ...prevState,
        isLogin: true,
        adminStatus: action.data.adminStatus,
        coadminStatus: action.data.coadminStatus,
        code: action.data.code,
        idUser: action.data.idUser,
        name: action.data.name,
        token: action.data.token,
      };
    case actionTypes.LOGOUT:
      return {
        ...prevState,
        isLogin: false,
        adminSatus: null,
        coadminStatus: null,
        code: null,
        idUser: null,
        name: null,
        token: null,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default AuthReducer;
