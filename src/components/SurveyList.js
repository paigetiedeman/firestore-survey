import React from 'react'
import Survey from './Survey'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'

export default function SurveyList(props) {
  useFirestoreConnect([
    { collection:'surveys'}
  ])

  const surveyList = useSelector(state => state.firestore.ordered.surveys)

  if (isLoaded(surveyList)){
    return (
      <div>
        {surveyList.map((survey) => {
          return <Survey 
          whenSurveyClicked={props.onSurveySelection}
          name= {survey.name}
          question1 = {survey.question1}
          question2 = {survey.question2}
          question3 = {survey.question3}
          question4 = {survey.question4}
          question5 = {survey.question5}
          id = {survey.id}
          key={survey.id}
          />
        })}
        
      </div>
    )
  }
  else{
    return(
      <React.Fragment>
        <h4>Loading...</h4>
      </React.Fragment>
    )
  }
  }

  SurveyList.propTypes = {
    onSurveySelection: PropTypes.func,
  }
