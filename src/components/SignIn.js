import React from 'react'
import firebase from 'firebase/app';
import { isLoaded } from 'react-redux-firebase'

export default function SignIn() {
  
  
  function doSignUp(e){
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      console.log('successfully signed up!')
    }).catch(function(error){
      console.log(error.message);
    })
  }
  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  
  
  return (

    <React.Fragment>
      <h1>Sign Up</h1>
      <form onSubmit={doSignUp}>
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
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
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
        </form>      <button onClick={doSignOut} className="btn btn-dark">Sign out</button>
    <br />
  </React.Fragment>
  )
}

