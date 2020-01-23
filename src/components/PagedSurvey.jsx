import React, { 
  useEffect,
  useState,
  Fragment, 
} from 'react';
import { Link, useParams } from 'react-router-dom';
import * as babel from '@babel/standalone';
import * as babelReact from '@babel/preset-react';
import Question from './Question';
import { getSurvey } from '../api/SurveyAPI'; 
import PageFooter from './PageFooter';

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
  'config':{}
};

const gridStyle = {
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto 72em auto',
  gridTemplateRows: '6em auto 2em',
};

const titleStyle = {
  gridColumn: 2,
  gridRow: 1,
};

const bodyStyle = {
  height: '100%',
  border: '1px solid grey',
  gridColumn: 2,
  gridRow: 2,
};

const footerStyle = {
  gridColumn: 2,
  gridRow: 3,
};

const PagedSurvey = () => {
  let { surveyId } = useParams();
  const [surveyDef, setSurveyDef] = useState(loadingSurvey);
  const [state, setState] = useState({});
  const [index,setIndex] = useState(0);
  useEffect(() => {
    getSurvey(surveyId)
      .then((survey) => {
        setSurveyDef(survey);
        try {
          let initialState = JSON.parse(survey.initialState);
          setState(initialState);
        } catch (e) {
          console.log(e);
        }
      })
  }, [surveyId]);

  const resultBabelTransformed = babel.transform(surveyDef.result, babelSettings).code;
  // eslint-disable-next-line
  const resultFunction = Function('state','React', resultBabelTransformed);

  console.log(surveyDef.config);

  return (
    <div style={gridStyle}>
      
      <div style={titleStyle}>
        <div style={{ 'fontSize': '4em' }}>
          {surveyDef.name}
        </div>
        <Link to={"/survey/" + surveyDef._id + "/edit"}>
          Edit
        </Link>
      </div>

      <div style={bodyStyle}>
        {
          index < surveyDef.questions.length &&
          (Question({
            ...surveyDef.questions[index],
            'state': state,
            'setState': setState,
            'config': surveyDef.config,
          }))
        }
        {
          index === surveyDef.questions.length &&
          (
            <Fragment>
              <h1>Result</h1>
              {
                resultFunction(state, React)
              }
            </Fragment>
          )
        }
      </div>

      <div style={footerStyle}>
        <PageFooter index={index} setIndex={setIndex} questionCount={surveyDef.questions.length} />
      </div>
    </div>
  );
}

export default PagedSurvey;