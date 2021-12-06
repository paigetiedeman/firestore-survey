import React from 'react'
import Survey from './Survey'
import PropTypes from 'prop-types'

export default function SurveyList(props) {
  return (
    <div>
      {Object.values(props.surveyList).map((survey) => {
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

SurveyList.propTypes = {
  surveyList: PropTypes.object,
  onSurveySelection: PropTypes.func,
}
