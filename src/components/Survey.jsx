import React, { useState } from 'react';
import Question from './Question';
import * as babel from '@babel/standalone';
import * as babelReact from '@babel/preset-react';

const babelSettings = {
  parserOpts: {
    'allowReturnOutsideFunction': true
  },
  presets: [babelReact]
}

const Survey = (props) => {
  const [state, setState] = useState(props.initialState);

  const surveyStyle = {
    'marginLeft':'auto',
    'marginRight':'auto',
    'minWidth':'36em',
    'maxWidth':'72em'
  };
  const title = {
    'fontSize':'4em'
  };
  const container = {
    'maxWidth':'72em',
  };
  const left = {
    'width': '36em',
    'float':'left'
  };
  const right = {
    'width':'36em',
    'overflow':'hidden'
  };

  const resultBabelTransformed = babel.transform(props.result, babelSettings).code;
  const resultFunction = Function('state','React', resultBabelTransformed);

  return (
    <div style={surveyStyle}>
      <div style={title}>
        {props.name}
      </div>
      <div style={container}>
        <div style={left}>
          <h1>Questions</h1>
          {
            props.questions.map((question) => Question({
              ...question,
              'state': state,
              'setState': setState
            }))
          }
        </div>
        <div style={right}>
          <h1>Result</h1>
          {
            resultFunction(state, React)
          }
        </div>
      </div>
    </div>
  );
}

export default Survey;