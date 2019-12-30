import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Survey from './Survey';
import SurveyEditor from './SurveyEditor';
import SurveyList from './SurveyList';

function AppRouter() {
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

export default AppRouter;
