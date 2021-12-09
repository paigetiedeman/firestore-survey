import React from 'react';
import PropTypes from 'prop-types';

export default function SignOut(props) {
  return (
    <React.Fragment>
      <button onClick={props.signOut} className="btn btn-dark">Sign out</button>
    </React.Fragment> 
  )
}

SignOut.propTypes ={
  signOut: PropTypes.func
}
