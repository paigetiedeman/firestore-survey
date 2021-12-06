import React from 'react';
import PropTypes from 'prop-types';
import {v4} from 'uuid';

export default function NewResponseForm(props) {
  const {survey} = props;

  const handleAddResponse = (e) => {
    e.preventDefault();
    props.onResponseSubmission({
      title: survey.name,
      response1: e.target.response1.value,
      response2: e.target.response2.value,
      response3: e.target.response3.value,
      response4: e.target.response4.value,
      response5: e.target.response5.value,
      surveyId: survey.id,
      id: v4()
    })
  }

  return (
    <div>
      <h2> {survey.name} </h2>
        <form onSubmit={handleAddResponse}>
        <label for="response1">{survey.question1}</label>
        <input
        type="text"
        name="response1"
        className="form-control"
        required
        />
        <br />
        <label for="response2">{survey.question2}</label>
        <input
        type="text"
        name="response2"
        className="form-control"
        />
        <br />
        <label for="response3">{survey.question3}</label>
        <input
        type="text"
        name="response3"
        className="form-control"
        />
        <br />
        <label for="response4">{survey.question4}</label>
        <input
        type="text"
        name="response4"
        className="form-control"
        />
        <br />
        <label for="response">{survey.question5}</label>
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

