import React from 'react'
import NewSurveyForm from './NewSurveyForm'
import NewResponseForm from './NewResponseForm'
import SurveyList from './SurveyList'
import SurveyDetail from './SurveyDetail'
import EditSurvey from './EditSurvey'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as a from './../actions'
import { withFirestore, isLoaded } from 'react-redux-firebase'



class SurveyControl extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedSurvey: null,
      selectedSurveyResponse: null,
      editing: false,
      responding: false
    };
  }
  
  handleRespondToSurvey = () => {
    this.setState({responding: true})
  }

  handleClick = () => {
    if (this.state.selectedSurvey != null) {
      this.setState({
        selectedSurvey: null,
        editing: false,
        responding: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddSurvey = () => {
    const {dispatch} = this.props;
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleDeletingSurvey =(id) => {
    this.props.firestore.delete({collection: 'surveys', doc: id})
    this.handleDeletingAllResponses(id);
    this.setState({selectedSurvey: null});
  }

  handleDeletingSingleResponse = (id) => {
    this.props.firestore.delete({collection: 'responses', doc: id})
  }

  handleDeletingAllResponses = (id) => {
    this.props.firestore.collection('responses')
    .where('surveyId', "==", id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.handleDeletingSingleResponse(doc.id)
      })
    })
  }

  handleChangingSurvey = (id) => {
    this.props.firestore.get({collection: 'surveys', doc: id}).then((survey) => {
      const firestoreSurvey = {
        name: survey.get('name'),
        question1: survey.get('question1'),
        question2: survey.get('question2'),
        question3: survey.get('question3'),
        question4: survey.get('question4'),
        question5: survey.get('question5'),
        id: survey.id
      }
      this.setState({selectedSurvey: firestoreSurvey})
    });
  }

  handleAddResponse = () => {
    this.setState({responding: false});
  }


  render() {
    const auth = this.props.firebase.auth();
    let currentlyVisibleState = null;
    let buttonText = null;
    if(!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth) && (auth.currentUser == null))) {        
        currentlyVisibleState = <SurveyList surveyList={this.props.mainSurveyList}
        onSurveySelection={this.handleChangingSurvey}/>
        buttonText = "Add Survey";      
    }
    if (this.props.formVisible){
      currentlyVisibleState = <NewSurveyForm onNewSurveyCreation={this.handleAddSurvey}
      onResponseSubmission={this.handleAddResponse}/>
      buttonText = "Return to List" ;
    } 
    else if (this.state.responding){
      currentlyVisibleState = <NewResponseForm 
      survey={this.state.selectedSurvey}
      onResponseSubmission={this.handleAddResponse}
      buttonText='Respond'
      />
      buttonText = 'Return To List';
    }
    else if (this.state.editing){
      currentlyVisibleState = <EditSurvey />
      buttonText = 'Return To List';
    }
    else if (this.state.selectedSurvey != null) {
      currentlyVisibleState = <SurveyDetail
      auth={auth} 
      survey={this.state.selectedSurvey} 
      onClickRespond={this.handleRespondToSurvey}
      responseList={this.props.mainResponseList}
      onClickDelete={this.handleDeletingSurvey}
      onResponseDelete={this.handleDeletingSingleResponse} />
      buttonText = "Return to List" ;
    } 
    else {
      currentlyVisibleState = <SurveyList surveyList={this.props.mainSurveyList}
      onSurveySelection={this.handleChangingSurvey}/>
      buttonText = "Add Survey";
    }
    return ( 
    <div>
      {currentlyVisibleState}
      <button onClick={this.handleClick} className="btn btn-dark">{buttonText}</button>
    </div>
    );    
  }
}

SurveyControl.propTypes = {
  mainSurveyList: PropTypes.object,
  formVisible: PropTypes.bool,
  mainResponseList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    mainSurveyList: state.mainSurveyList,
    formVisible: state.formVisible,
    mainResponseList: state.mainResponseList
  }
}

SurveyControl = connect(mapStateToProps)(SurveyControl);

export default withFirestore(SurveyControl);


