import React, { useState, useEffect } from 'react';
import { register } from '../actions/authActions';
import classes from './Register.module.css';
import { connect } from 'react-redux';

const Register = ({ history, isAuth, register }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuth) history.push('/');
  }, [isAuth, history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('PASSWORDS DO NOT MATCH');
      return;
    }
    register(user);
  };

  const { name, email, password, confirmPassword } = user;

  return (
    <form className={classes.register} onSubmit={onSubmit}>
      <h4>Register a User</h4>
      <label htmlFor="name">Name:</label>
      <input name="name" value={name} onChange={onChange} required />
      <label htmlFor="email">E-mail:</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={onChange}
        required
      />
      <label htmlFor="name">Password:</label>

      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        required
      />
      <label htmlFor="name">Confirm Password:</label>
      <input
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        type="password"
        required
      />
      <button>Register</button>
    </form>
  );
};

export default connect(null, { register })(Register);
