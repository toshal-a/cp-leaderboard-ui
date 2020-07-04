import React from 'react';
import { RootState } from 'store/rootReducer';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthGuard({ children }) {
  const account = useSelector((state : RootState) => state.login);

  if (!account.user) {
    return <Redirect to="/home" />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
