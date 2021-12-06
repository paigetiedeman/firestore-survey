import React from 'react';

import PropTypes from 'prop-types';

export default function SurveyDetail(props) {
  const { survey, onClickRespond } = props;

  return (
    <div>
      <h2>{survey.name}</h2>
      <p>{survey.question1}</p>
      <p>{survey.question2}</p>
      <p>{survey.question3}</p>
      <p>{survey.question4}</p>
      <p>{survey.question5}</p>
      <button onClick={() => onClickRespond(survey.id)} className="btn btn-dark">respond to survey</button>
    </div>
  )
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickRespond: PropTypes.func
}
