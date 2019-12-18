import React, { useState } from 'react';
import Question from './Question';

function Survey(props) {
  const [state, setState] = useState(props.initial_state);

  return (
    <div>
    <h1>{props.name}</h1>
      {
        props.questions.map((question) => Question({...question, 'state':state,'setState':setState}))
      }
      {
        props.result(state)
      }
    </div>
  );
}

export default Survey;