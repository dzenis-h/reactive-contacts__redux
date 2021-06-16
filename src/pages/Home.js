import React, { Fragment } from 'react';
import ContactsForm from '../components/ContactsForm';
import classes from './Home.module.css';
import ContactsList from '../components/ContactsList';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuth }) => {
  return (
    <div className={classes.Home}>
      {isAuth ? (
        <Fragment>
          <ContactsForm />
          <ContactsList />
        </Fragment>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth };
};

export default connect(mapStateToProps, null)(Home);
