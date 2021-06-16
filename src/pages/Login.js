import React, { useState, useEffect } from 'react';
import classes from './Register.module.css';
import { login } from '../actions/authActions';
import { connect } from 'react-redux';

const Register = ({ history, isAuth, login }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuth) history.push('/');
  }, [isAuth, history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(user);
    // if (isAuth)
    // history.push('/');
  };

  const { email, password } = user;

  return (
    <form className={classes.register} onSubmit={onSubmit}>
      <h4>LOGIN</h4>

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
      <button>Login</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth };
};

export default connect(mapStateToProps, { login })(Register);
