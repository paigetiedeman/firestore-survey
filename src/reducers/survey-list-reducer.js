import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { name, question1, question2, question3, question4, question5 , id } = action;
  switch (action.type) {
    case c.ADD_SURVEY:
      return Object.assign({}, state, {
        [id]: {
          name: name,
          question1: question1,
          question2: question2,
          question3: question3,
          question4: question4,
          question5: question5,
          id: id
        }
      });
    case c.DELETE_SURVEY:
      let newState = {...state};
      delete newState[id];
      return newState;
    default:
      return state;
  }
}