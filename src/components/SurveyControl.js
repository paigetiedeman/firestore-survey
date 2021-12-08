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
    // this.props.firestore.delete({collection: 'surveys', doc: id})
    this.handleDeletingAllResponses(id);
    this.setState({selectedSurvey: null});
  }

  handleDeletingSingleResponse = (id) => {

    this.props.firestore.delete({collection: 'responses', doc: id})
  }

  // handleDeletingResponse = (surveyId) => {
  // this.props.firestore.get({collection: 'responses', doc: surveyId}).then((returnedResponses) => { returnedResponses.map( (response) => {console.log(response.id)
  //   this.handleDeletingSingleResponse(response.id);
    
  //   this.props.firestore.delete({collection: 'responses', doc: response.id})})
  //     // const firestoreResponse = {
  //     //   title: response.get('title'),
  //     //   response1: response.get('response1'),
  //     //   response2: response.get('response2'),
  //     //   response3: response.get('response3'),
  //     //   response4: response.get('response4'),
  //     //   response5: response.get('response5'),
  //     //   id: response.id,
  //     //   surveyId: response.get('surveyId')
  //     // }
  //     // console.log(response.id)
  //     // this.handleDeletingSingleResponse(response.id);
      
  //     // this.props.firestore.delete({collection: 'responses', doc: response.id})
  //   })
  // }

handleDeletingAllResponses = (surveyId) => {
  
  this.props.firestore.collection('responses')
  .get()
  .then(querySnapshot => {
    const documents = querySnapshot.docs.map(doc => doc.data())
    const filteredResponses = documents.filter(doc => doc.surveyId === surveyId)
    console.log(filteredResponses);
    filteredResponses.forEach(response => {
      console.log(response)
      // this.handleDeletingSingleResponse(response);
    })
  })
}
//trouble getting all responses(really trouble getting more than 1)
// get their ids
// managed to put all the response ids into an array, and then delete single response on each id
// map and use delete single response should work


  // import { collection, query, where, getDocs } from "firebase/firestore";
  // const q = query(collection(db, "responses"), where("surveyId", "===", id));
  
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });



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
    // const foundSurvey = this.props.mainSurveyList[id];
    // this.setState({
    //   selectedSurvey: foundSurvey,
    // })
  }

  handleAddResponse = (response) => {

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


