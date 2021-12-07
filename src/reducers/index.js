import formVisibleReducer from './form-visible-reducer';
import surveyListReducer from './survey-list-reducer';
import responseListReducer from './response-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';


const rootReducer = combineReducers({
  mainResponseList: responseListReducer,
  formVisible: formVisibleReducer,
  mainSurveyList: surveyListReducer,
  firestore: firestoreReducer
});

export default rootReducer;