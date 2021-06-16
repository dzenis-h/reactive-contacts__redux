import React, { useState } from 'react';
import classes from './ContactsItem.module.css';
import { connect } from 'react-redux';
import {
  removeContact,
  updateContact,
  getContacts,
} from '../actions/contactsActions';

const ContactsItem = ({
  contact: { name, phone, email, type, _id },
  updateContact,
  removeContact,
  getContacts,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState({
    _id,
    name,
    email,
    phone,
    type,
  });

  const deleteFn = (id) => {
    removeContact(id);
    getContacts();
  };

  const editFn = (id, newValue) => {
    setIsEditing(!isEditing);
    updateContact(id, newValue);
    getContacts();
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes['grid-2']}>
      <div className={classes.card}>
        <ul>
          <li>
            <i className="fas fa-file-signature" /> {'  '}Name:{' '}
            <span>{name}</span> <br />
            {isEditing && (
              <input value={value.name} onChange={onChange} name="name" />
            )}
          </li>
          <li className={classes.icons}>
            <i className="fas fa-mobile-alt" /> {'  '}
            Phone: {'  '}
            <span>{phone}</span> <br />
            {isEditing && (
              <input value={value.phone} onChange={onChange} name="phone" />
            )}
          </li>
          <li className={classes.icon}>
            <i className="far fa-envelope" />
            {'  '} E-mail:
            <span>{email}</span>
            <br />
            {isEditing && (
              <input value={value.email} onChange={onChange} name="email" />
            )}
          </li>
          <li>
            <i className="far fa-address-card" /> Type:{' '}
            <b className={classes.type}>{type}</b> <br />
            {isEditing && (
              <div className={classes['edit-radio']}>
                <input
                  name="type"
                  type="radio"
                  value="personal"
                  onChange={onChange}
                  id="personal"
                  checked={value.type === 'personal'}
                />{' '}
                Personal
                <input
                  name="type"
                  type="radio"
                  value="professional"
                  onChange={onChange}
                  id="professional"
                  checked={value.type === 'professional'}
                />{' '}
                Professional
              </div>
            )}
          </li>

          {!isEditing ? (
            <li>
              <button onClick={() => deleteFn(_id)}>DELETE</button>
              <button onClick={() => setIsEditing(true)}>EDIT</button>
            </li>
          ) : (
            <button onClick={() => editFn(_id, value)}>Update</button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default connect(null, { removeContact, updateContact, getContacts })(
  ContactsItem
);
