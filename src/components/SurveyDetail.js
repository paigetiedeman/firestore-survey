import React from 'react';
import Response from './Response';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'

export default function SurveyDetail(props) {
  const { survey, onClickRespond, onClickDelete } = props;

  useFirestoreConnect([{collection: 'responses'}])

  const responses = useSelector(state => state.firestore.ordered.responses)
  
  const sortByID = (postList, id) => {
    const foundResponses = postList.filter(response => response.surveyId === id);
    return foundResponses
  };
  //this object is an array containing objects

  let responsesVisible = null;
  
  if (isLoaded(responses)) {
    
  const responseList = sortByID(responses, survey.id);

  responsesVisible = responseList.map((response) => {
    return <Response 
    title={response.title}
    response1={response.response1}
    response2={response.response2}
    response3={response.response3}
    response4={response.response4}
    response5={response.response5}
    id={response.id} 
    key={response.id}/>
  })}
  else {
    responsesVisible = <React.Fragment>
                        <h3>Loading...</h3>
                      </React.Fragment>
    }

  return (
    <div>
      <h2>{survey.name}</h2>
      <p>{survey.question1}</p>
      <p>{survey.question2}</p>
      <p>{survey.question3}</p>
      <p>{survey.question4}</p>
      <p>{survey.question5}</p>
      <button onClick={() => onClickRespond(survey.id)} className="btn btn-dark">Respond to Survey</button>
      <button onClick={() => onClickDelete(survey.id)} className="btn btn-dark">Delete Survey</button>
      {responsesVisible} 
    </div>
  )}


SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickRespond: PropTypes.func,
  responseList: PropTypes.object,
  onClickDelete: PropTypes.func
}
