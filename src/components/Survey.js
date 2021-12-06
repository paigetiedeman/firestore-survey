import React from 'react'
import PropTypes from 'prop-types'

export default function Survey(props) {
  return (
    <div className='card'>
      <h2>{props.name}</h2>
      <p>{props.question1}</p>
      <p>{props.question2}</p>
      <p>{props.question3}</p>
      <p>{props.question4}</p>
      <p>{props.question5}</p>
      <button onClick={props.whenSurveyClicked}>details</button>
    </div>
  )
}

Survey.propTypes = {
  name: PropTypes.string,
  question1: PropTypes.string,
  question2: PropTypes.string,
  question3: PropTypes.string,
  question4: PropTypes.string,
  question5: PropTypes.string,
  id: PropTypes.string,
  whenSurveyClicked: PropTypes.func,
}
