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
  const {answer1, answer2, answer3, answer4, answer5, surveyId, id} = response;
  return {
    type: c.ADD_RESPONSE,
    answer1: answer1,
    answer2: answer2,
    answer3: answer3,
    answer4: answer4,
    answer5: answer5,
    surveyId: surveyId,
    id: id
  }
}

export const deleteResponse = id => ({
  type: c.DELETE_RESPONSE,
  id
});