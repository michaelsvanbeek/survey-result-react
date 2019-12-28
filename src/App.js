import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Survey from './components/Survey';
import SurveyEditor from './components/SurveyEditor';
import SurveyList from './components/SurveyList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SurveyList />
        </Route>
        <Route path="/survey/:surveyId/edit">
          <SurveyEditor />
        </Route>
        <Route path="/survey/:surveyId">
          <Survey />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
