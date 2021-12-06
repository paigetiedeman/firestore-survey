import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { title, response1, response2, response3, response4, response5, surveyId, id } = action;
  switch (action.type) {
    case c.ADD_RESPONSE:
      return Object.assign({}, state, {
        [id]: {
          title: title,
          response1: response1,
          response2: response2,
          response3: response3,
          response4: response4,
          response5: response5,
          surveyId: surveyId,
          id: id
        }
      });
    case c.DELETE_RESPONSE:
      let newState = {...state};
      delete newState[id];
      return newState;
    default:
      return state;
  }
}