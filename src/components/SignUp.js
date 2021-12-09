import React from 'react'
import PropTypes from 'prop-types'

export default function SignUp(props) {
  
  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={props.signUp}>
        <input
          type='text'
          name='email'
          placeholder='email'
          className='form-control'/>
          <br />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='form-control'/>
          <br />
        <button type='submit' className="btn btn-dark">Sign up</button>
          </form>
          <h3>Already registered?</h3>
          <button onClick={() => props.backToSignIn()} className="btn btn-dark">Sign In</button>
    </div>
  )
}

SignUp.propTypes = {
  signUp: PropTypes.func,
  backToSignIn: PropTypes.func
}