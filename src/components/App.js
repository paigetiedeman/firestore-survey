
import React from 'react';
import Header from './Header'
import SurveyControl from './SurveyControl';
import SignInControl from './SignInControl';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Header />
      <div className="App container">
        <Switch>
          <Route path="/signInControl">
            <SignInControl />
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
