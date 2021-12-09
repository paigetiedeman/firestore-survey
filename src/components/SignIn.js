import React from 'react'
import PropTypes from 'prop-types'


export default function SignIn(props) {
  

  return(
    <React.Fragment>
        <h1>Sign In</h1>
        <form onSubmit={props.signIn}>
          <input
            type='text'
            name='signInEmail'
            placeholder='email'
            className='form-control'/>
            <br />
          <input
            type='password'
            name='signInPassword'
            placeholder='Password'
            className='form-control'/>
            <br />
          <button type='submit' className="btn btn-dark">Sign In</button>
          </form>
          <h3>Don't have an account?</h3>
          <button onClick={() => props.onSignUp()} className="btn btn-dark">Register Here</button>
    </React.Fragment>
    )
  } 

SignIn.propTypes = {
  signIn: PropTypes.func,
  onSignUp: PropTypes.func
}


