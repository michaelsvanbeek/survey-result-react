import { useState, useEffect } from 'react';
import axios from 'axios';
import Survey from './components/Survey';

function App() {
  const surveyId = "5e04670da63c1e6585f6e52a";

  const [surveyDef, setSurveyDef] = useState({'name':'loading...','initialState':{},'questions':[],'result':''});
  useEffect(() => {
    async function fetchSurvey() {
      const result = await axios(
        'http://localhost:3000/surveys/' + surveyId
      );
      setSurveyDef(result.data);
    }
    fetchSurvey();
  }, []);

  return (
      Survey(surveyDef)
  );
}

export default App;
