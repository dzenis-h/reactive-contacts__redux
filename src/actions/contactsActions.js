import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from './types';
import axios from 'axios';
import setToken from '../utils/setToken';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getContacts = () => async (dispatch) => {
  setToken(localStorage.token);
  const { data } = await axios.get('api/contacts');
  dispatch({ type: GET_CONTACTS, payload: data });
};

export const addContect = (contact) => async (dispatch) => {
  setToken(localStorage.token);
  const { data } = await axios.post('api/contacts', contact, config);
  dispatch({ type: ADD_CONTACT, payload: data });
};

export const removeContact = (id) => async (dispatch) => {
  await axios.delete(`api/contacts/${id}`);
  dispatch({ type: REMOVE_CONTACT, payload: id });
};

export const updateContact = (id, newData) => async (dispatch) => {
  await axios.put(`api/contacts/${id}`, newData, config);
  dispatch({ type: UPDATE_CONTACT, payload: { id, newData } });
};

export const filterContacts = (text) => (dispatch) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

export const clearFiltered = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};
