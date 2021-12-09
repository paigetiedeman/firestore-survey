import React from 'react'
import firebase from 'firebase/app';
import { withFirestore, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import SignOut from './SignOut'
import SignUp from './SignUp'

class SignInControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signedUp: true
    };
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
    // this.backToSignIn()
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

  handleSignUp = () => {
    this.setState({signedUp: false});
  }

  backToSignIn = () => {
    this.setState({signedUp: true});
  }

  resetSignIn = () => {
    this.setState({loggedIn: false, signedUp: true});
  }

  render() {
    const auth = this.props.firebase.auth();
    let visibleState = null;

    if (isLoaded(auth) && auth.currentUser != null){
      visibleState = <SignOut signOut={this.doSignOut}/>
    }
    else if (isLoaded(auth) && !this.state.loggedIn){
      if(!this.state.signedUp){
        visibleState = <SignUp signUp={this.doSignUp}
        backToSignIn={this.backToSignIn}/>
    
      } else {
        visibleState = <SignIn signIn={this.doSignIn}
          onSignUp={this.handleSignUp} />
      }
    } else if(isLoaded(auth) && this.state.loggedIn && auth.currentUser != null){
      visibleState = <SignOut signOut={this.doSignOut}/>
    }else{
      visibleState = 
      <div>
        <p>That email is not registered</p>
        {/* <button OnClick={this.resetSignIn()}>Try Again</button> */}
      </div>
    }

    return (
      <div>
        <h1>this is SignIn Control</h1>
        {visibleState}
      </div>
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

SignInControl = connect(mapStateToProps)(SignInControl);

export default withFirestore(SignInControl);

