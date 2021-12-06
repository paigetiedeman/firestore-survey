import React from 'react';
import Response from './Response';

export default function SurveyDetail(props) {
  const { survey } = props;

  return (
    <div>
      <h2>{survey.name}</h2>
      <p>{survey.question1}</p>
      <p>{survey.question2}</p>
      <p>{survey.question3}</p>
      <p>{survey.question4}</p>
      <p>{survey.question5}</p>
      <Response />
    </div>
  )
}
