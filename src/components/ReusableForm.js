import React from 'react';
import PropTypes from 'prop-types';

export default function ReusableForm(props) {
  return (
    <div>
      <form onSubmit={props.formSubmissionHandler}>
        <label htmlFor="name">Name: </label>
        <input
        type="text"
        name="name"
        className="form-control"
        required
        />
        <label htmlFor="question1">Question: 1 </label>
        <input
        type="text"
        name="question1"
        className="form-control"
        required
        />
        <br />
        <label htmlFor="question2">Question 2: </label>
        <input
        type="text"
        name="question2"
        className="form-control"
        />
        <br />
        <label htmlFor="question3">Question 3: </label>
        <input
        type="text"
        name="question3"
        className="form-control"
        />
        <br />
        <label htmlFor="question4">Question 4: </label>
        <input
        type="text"
        name="question4"
        className="form-control"
        />
        <br />
        <label htmlFor="question5">Question 5: </label>
        <input
        type="text"
        name="question5"
        className="form-control"
        />
        <br />
        <button type="submit" className="btn btn-dark">{props.buttonText}</button>
      </form>
      <br />
    </div>
  )
}

ReusableForm.propTypes = {
  buttonText: PropTypes.string,
  formSubmissionHandler: PropTypes.func,
}
