import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
// import {v4} from 'uuid';
import { useFirestore } from 'react-redux-firebase'

export default function NewSurveyForm(props) {

  const firestore = useFirestore();

  function addSurveyToFirestore(e)  {
    e.preventDefault();
    props.onNewSurveyCreation();
    return firestore.collection('surveys').add({
      name: e.target.name.value,
      question1: e.target.question1.value,
      question2: e.target.question2.value,
      question3: e.target.question3.value,
      question4: e.target.question4.value,
      question5: e.target.question5.value
    });
  }
  
  return (
    <div>
      <ReusableForm formSubmissionHandler={addSurveyToFirestore} 
      buttonText="Add New Survey"/>
    </div>
  )
}

NewSurveyForm.propTypes = {
  onNewSurveyCreation: PropTypes.func,
}
