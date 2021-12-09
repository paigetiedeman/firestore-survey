import React from 'react'
import firebase from 'firebase/app';
import { withFirestore, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'

class SignIn extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  handleLogIn = () =>{
    this.setState({ loggedIn: true})

  }
  handleLogOut = () =>{
    this.setState({ loggedIn: false})
  }

  doSignUp = (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      console.log('successfully signed up!')
    }).catch(function(error){
      console.log(error.message);
    })
    
  }
  
  doSignIn=(event) =>{

    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
    }).catch(function(error) {
      console.log(error.message);
    });
    this.setState({loggedIn: true})
    
  }

  doSignOut=(e)=> {
    e.preventDefault()
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
    this.setState({loggedIn: false})
    
  }
  
  render() {
    const auth = this.props.firebase.auth();
    let visibleState = null;

    if (isLoaded(auth) && auth.currentUser === null){
      visibleState = 
      <React.Fragment>
        <h1>Sign Up</h1>
        <form onSubmit={this.doSignUp}>
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
        <form onSubmit={this.doSignIn}>
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
      </React.Fragment>
    } else if (isLoaded(auth) && auth.currentUser != null){
      visibleState = 
      <React.Fragment>
        <button onClick={this.doSignOut} className="btn btn-dark">Sign out</button>
      </React.Fragment>
    } else {
      visibleState = <p>Loading...</p>
    }

  return(
    <React.Fragment>
      {visibleState}
    </React.Fragment>
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    mainSurveyList: state.mainSurveyList,
    formVisible: state.formVisible,
    mainResponseList: state.mainResponseList
  }
}

SignIn = connect(mapStateToProps)(SignIn);

export default withFirestore(SignIn);