import * as c from './ActionTypes';

export const addSurvey = (survey) => {
  const {name, question1, question2, question3, question4, question5, id} = survey;
  return {
    type: c.ADD_SURVEY,
    name: name,
    question1: question1,
    question2: question2,
    question3: question3,
    question4: question4,
    question5: question5,
    id: id  
  }
}

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const deleteSurvey = id => ({
  type: c.DELETE_SURVEY,
  id
});

export const addResponse = (response) => {
  const {title, response1, response2, response3, response4, response5, surveyId, id} = response;
  return {
    type: c.ADD_RESPONSE,
    title: title,
    response1: response1,
    response2: response2,
    response3: response3,
    response4: response4,
    response5: response5,
    surveyId: surveyId,
    id: id
  }
}

export const deleteResponse = id => ({
  type: c.DELETE_RESPONSE,
  id
});