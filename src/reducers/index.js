import formVisibleReducer from './form-visible-reducer';
import surveyListReducer from './survey-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisible: formVisibleReducer,
  mainSurveyList: surveyListReducer
});

export default rootReducer;