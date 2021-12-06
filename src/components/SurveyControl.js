import React from 'react'
import NewSurveyForm from './NewSurveyForm'
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
    };
  }

  handleClick = () => {
    if (this.state.selectedSurvey != null) {
      this.setState({
        selectedSurvey: null,
        editing: false
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

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if(this.props.formVisible){
      currentlyVisibleState = <NewSurveyForm onNewSurveyCreation={this.handleAddSurvey}/>
      buttonText = "Return to List" ;
    } else if(this.state.selectedSurvey != null) {
      currentlyVisibleState = <SurveyDetail survey= {this.state.selectedSurvey}/>
      buttonText = "Return to List" ;
    } else {
      currentlyVisibleState = <SurveyList surveyList={this.props.mainSurveyList}/>
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
    formVisible: state.formVisible
  }
}

SurveyControl = connect(mapStateToProps)(SurveyControl);

export default SurveyControl;


