import React from 'react';
import Response from './Response';

import PropTypes from 'prop-types';

export default function SurveyDetail(props) {
  const { survey, onClickRespond, responseList } = props;
  
  const sortByID = (postList, id) => {
    const arrayResponses = Object.entries(responseList);
    const foundResponses = arrayResponses.filter(response => response[1].surveyId === survey.id);
    return Object.fromEntries(foundResponses);
  };
  const responses = sortByID(responseList, survey.id);
  
  console.log(responses)
  console.log(responseList)



  return (
    <div>
      <h2>{survey.name}</h2>
      <p>{survey.question1}</p>
      <p>{survey.question2}</p>
      <p>{survey.question3}</p>
      <p>{survey.question4}</p>
      <p>{survey.question5}</p>
      <button onClick={() => onClickRespond(survey.id)} className="btn btn-dark">respond to survey</button>
      {Object.values(responses).map((response) => {
        return <Response 
        title={response.title}
        response1={response.response1}
        response2={response.response2}
        response3={response.response3}
        response4={response.response4}
        response5={response.response5}
        id={response.id}
        
        />
      })}
    </div>
  )}



SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickRespond: PropTypes.func,
  responseList: PropTypes.object
}
