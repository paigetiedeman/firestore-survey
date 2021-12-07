import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase'


export default function NewResponseForm(props) {
  const {survey} = props;
  const firestore = useFirestore();

  const handleAddResponseToFirestore = (e) => {
    e.preventDefault();
    props.onResponseSubmission();
    return firestore.collection('responses').add({
      title: survey.name,
      response1: e.target.response1.value,
      response2: e.target.response2.value,
      response3: e.target.response3.value,
      response4: e.target.response4.value,
      response5: e.target.response5.value,
      surveyId: survey.id,
    })
  }

  return (
    <div>
      <h2> {survey.name} </h2>
        <form onSubmit={handleAddResponseToFirestore}>
        <label htmlFor="response1">{survey.question1}</label>
        <input
        type="text"
        name="response1"
        className="form-control"
        required
        />
        <br />
        <label htmlFor="response2">{survey.question2}</label>
        <input
        type="text"
        name="response2"
        className="form-control"
        />
        <br />
        <label htmlFor="response3">{survey.question3}</label>
        <input
        type="text"
        name="response3"
        className="form-control"
        />
        <br />
        <label htmlFor="response4">{survey.question4}</label>
        <input
        type="text"
        name="response4"
        className="form-control"
        />
        <br />
        <label htmlFor="response">{survey.question5}</label>
        <input
        type="text"
        name="response5"
        className="form-control"
        />
        <br />
        <button type="submit" className="btn btn-dark">{props.buttonText}</button>
      </form>
    </div>
  )
}

NewResponseForm.propTypes = {
  onResponseSubmission: PropTypes.func,
  buttonText: PropTypes.string
}

