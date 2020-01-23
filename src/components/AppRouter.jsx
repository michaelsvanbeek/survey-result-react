import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SinglePageSurvey from './SinglePageSurvey';
import PagedSurvey from './PagedSurvey';
import SurveyCreate from './SurveyCreate';
import SurveyEditor from './SurveyEditor';
import SurveyList from './SurveyList';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SurveyList />
        </Route>
        <Route path="/survey/create">
          <SurveyCreate />
        </Route>
        <Route path="/survey/:surveyId/edit">
          <SurveyEditor />
        </Route>
        <Route path="/survey/:surveyId">
          <SinglePageSurvey />
        </Route>
        <Route path="/surveyp/:surveyId">
          <PagedSurvey />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
