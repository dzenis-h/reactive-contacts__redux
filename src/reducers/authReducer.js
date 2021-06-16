import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  GET_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: localStorage.getItem('token') !== null ? true : false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuth: true,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        token: state.token,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isAuth: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
