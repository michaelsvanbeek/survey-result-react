import React, { 
  useEffect,
  useState, 
} from 'react';
import { Link, useParams } from 'react-router-dom';
import * as babel from '@babel/standalone';
import * as babelReact from '@babel/preset-react';
import Question from './Question';
import { getSurvey } from '../api/SurveyAPI'; 

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

const SinglePageSurvey = () => {
  let { surveyId } = useParams();
  const [surveyDef, setSurveyDef] = useState(loadingSurvey);
  const [state, setState] = useState({});
  useEffect(() => {
    getSurvey(surveyId)
      .then((survey) => {
        setSurveyDef(survey);
        try {
          let initialState = JSON.parse(survey.initialState);
          console.log(initialState);
          setState(initialState);
        } catch(e) {
          console.log(e);
        }
      })
  }, [surveyId]);

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
    <div>
      <div style={title}>
        {surveyDef.name}
      </div>
      <Link to={"/survey/" + surveyDef._id + "/edit"}>Edit</Link>
      <div style={container}>
        <div style={left}>
          <h1>Questions</h1>
          {
            surveyDef.questions.map((question) => Question({
              ...question,
              'state': state,
              'setState': setState,
              'config':surveyDef.config,
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

export default SinglePageSurvey;