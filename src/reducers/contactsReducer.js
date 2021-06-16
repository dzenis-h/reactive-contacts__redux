import {
  ADD_CONTACT,
  GET_CONTACTS,
  REMOVE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../actions/types';

const initialState = {
  contacts: [],
  filtered: null,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      const updatedContacts = state.contacts.concat(action.payload);
      return {
        ...state,
        contacts: updatedContacts,
      };
    case REMOVE_CONTACT:
      const updContacts = state.contacts.filter(
        (c) => c._id !== action.payload
      );
      return {
        ...state,
        contacts: updContacts,
      };
    case UPDATE_CONTACT:
      const existingIndex = state.contacts.findIndex(
        (c) => c._id === action.payload.id
      );
      let existingItem = state.contacts[existingIndex];
      existingItem = action.payload.newData;
      let updatedItems = [...state.contacts];
      updatedItems[existingIndex] = existingItem;
      return {
        ...state,
        contacts: updatedItems,
      };
    case FILTER_CONTACTS:
      const filteredContacts = state.contacts.filter((contact) => {
        const regex = new RegExp(`${action.payload}`, 'gi');
        return contact.name.match(regex) || contact.email.match(regex);
      });
      return {
        ...state,
        filtered: filteredContacts,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    default:
      return state;
  }
};

export default contactsReducer;
