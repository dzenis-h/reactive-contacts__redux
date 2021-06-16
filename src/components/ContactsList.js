import React, { useEffect, useRef } from 'react';
import ContactsItem from './ContactsItem';
import classes from './ContactsList.module.css';
import { connect } from 'react-redux';
import {
  getContacts,
  filterContacts,
  clearFiltered,
} from '../actions/contactsActions';

const ContactsList = ({
  isAuth,
  getContacts,
  filterContacts,
  clearFiltered,
  filtered,
  contacts,
}) => {
  const filterInput = useRef('');

  useEffect(() => {
    if (isAuth) getContacts();
    if (filterInput.current.value === '') clearFiltered();
  }, [isAuth, clearFiltered, getContacts]);

  const onChange = (e) => {
    if (filterInput.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFiltered();
    }
  };

  const list = filtered
    ? filtered.map((f) => <ContactsItem contact={f} key={f._id} />)
    : contacts.map((c) => <ContactsItem contact={c} key={c._id} />);

  return (
    <div className={classes.list}>
      <label htmlFor="filter">Filter contacts:</label>
      <input ref={filterInput} name="filter" onChange={onChange} />
      {list}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.contacts,
    filtered: state.contacts.filtered,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, {
  getContacts,
  filterContacts,
  clearFiltered,
})(ContactsList);
