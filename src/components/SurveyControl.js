import React from 'react'
import NewSurveyForm from './NewSurveyForm'
import NewResponseForm from './NewResponseForm'
import SurveyList from './SurveyList'
import SurveyDetail from './SurveyDetail'
import EditSurvey from './EditSurvey'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as a from './../actions'
import { withFirestore } from 'react-redux-firebase'

class SurveyControl extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedSurvey: null,
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


  handleAddSurvey = (newSurvey) => {
    const {dispatch} = this.props;
    const action = a.addSurvey(newSurvey);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSurvey = (id) => {
    const foundSurvey = this.props.mainSurveyList[id];
    this.setState({selectedSurvey: foundSurvey})
  }

  handleAddResponse = (response) => {
    const {dispatch} = this.props;
    const action = a.addResponse(response);
    dispatch(action);
    this.setState({responding: false});
  }



  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if(this.props.formVisible){
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
    else if(this.state.selectedSurvey != null) {
      currentlyVisibleState = <SurveyDetail 
      survey={this.state.selectedSurvey} 
      onClickRespond={this.handleRespondToSurvey} />
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
  formVisible: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    mainSurveyList: state.mainSurveyList,
    formVisible: state.formVisible,
    mainResponseList: state.mainResponseList
  }
}

SurveyControl = connect(mapStateToProps)(SurveyControl);

export default SurveyControl;


