import React from 'react';
import Header from './Header'
import SurveyControl from './SurveyControl';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignIn from './SignIn'

function App() {
  return (
    <Router>
        <Header />
      <div className="App container">
        <Switch>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/">
        <SurveyControl />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
