import React, { useState } from 'react';
import Question from './components/Question';

import survey from './survey';

function App() {

  const [state, setState] = useState(survey.initial_state);

  return (
    <div>
    <h1>{survey.name}</h1>
      {
        survey.questions.map((question) => Question({...question, 'state':state,'setState':setState}))
      }
      {
        survey.result(state)
      }
    </div>
  );
}

export default App;
