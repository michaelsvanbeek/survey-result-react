import React, { 
  useEffect,
  useState, 
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as babel from '@babel/standalone';
import * as babelReact from '@babel/preset-react';
import Question from './Question';

const babelSettings = {
  parserOpts: {
    'allowReturnOutsideFunction': true
  },
  presets: [babelReact]
};

const loadingSurvey = {
  'name': 'loading...',
  'initialState': {},
  'questions': [],
  'result': '',
};

const Survey = () => {
  let { surveyId } = useParams();
  const [surveyDef, setSurveyDef] = useState(loadingSurvey);
  const [state, setState] = useState({});
  useEffect(() => {
    async function fetchSurvey() {
      const result = await axios(
        'http://localhost:3000/surveys/' + surveyId
      );
      setSurveyDef(result.data);
      setState(result.data.initialState);
    }
    fetchSurvey();
  }, [surveyId]);

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

  const resultBabelTransformed = babel.transform(surveyDef.result, babelSettings).code;
  // eslint-disable-next-line
  const resultFunction = Function('state','React', resultBabelTransformed);

  return (
    <div style={surveyStyle}>
      <div style={title}>
        {surveyDef.name}
      </div>
      <div style={container}>
        <div style={left}>
          <h1>Questions</h1>
          {
            surveyDef.questions.map((question) => Question({
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