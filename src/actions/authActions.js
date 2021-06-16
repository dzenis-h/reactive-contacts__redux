import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, GET_USER } from './types';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const register = (formData) => async (dispatch) => {
  const { data } = await axios.post('/api/users', formData, config);
  dispatch({ type: REGISTER_USER, payload: data });
  getUser(data.token);
};

export const login = (formData) => async (dispatch) => {
  const { data } = await axios.post('/api/auth', formData, config);
  dispatch({ type: LOGIN_USER, payload: data });
  getUser(data.token);
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

export const getUser = (token) => async (dispatch) => {
  axios.defaults.headers.common['x-auth-token'] = token;
  const { data } = await axios.get('/api/auth');
  dispatch({ type: GET_USER, payload: data });
};
