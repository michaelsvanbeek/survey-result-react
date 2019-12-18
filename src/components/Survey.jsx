import React, { useState } from 'react';
import Question from './Question';

function Survey(props) {
  const [state, setState] = useState(props.initial_state);

  return (
    <div>
    <h1>{props.name}</h1>
      {
        props.questions.map((question) => Question({
          ...question, 
          'state':state,
          'setState':setState
        }))
      }
     <h1>Result</h1>
      {
        props.result(state)
      }
    </div>
  );
}

export default Survey;