import React, {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionEditor from './QuestionEditor';
import CodeEditor from './CodeEditor';

const loadingSurvey = {
  'name': 'loading...',
  'initialState': {},
  'questions': [],
  'result': '',
};

const Survey = () => {
  let { surveyId } = useParams();
  const [surveyDef, setSurveyDef] = useState(loadingSurvey);
  useEffect(() => {
    async function fetchSurvey() {
      const result = await axios(
        'http://localhost:3000/surveys/' + surveyId
      );
      setSurveyDef(result.data);
    }
    fetchSurvey();
  }, [surveyId]);

  const surveyStyle = {
    'marginLeft': 'auto',
    'marginRight': 'auto',
    'minWidth': '36em',
    'maxWidth': '72em'
  };

  return (
    <div style={surveyStyle}>
      <div style={ {'fontSize': '4em'} }>
        <input 
          type="text" 
          size={36}
          value={surveyDef.name}
          onChange={e => setSurveyDef({ ...surveyDef, name: e.target.value }) }
          style={ {'fontSize':'1em'} }
        />
      </div>
      <div>
        <h1>Initial State</h1>
        <CodeEditor code={JSON.stringify(surveyDef.initialState)} />
      </div>
      <div>
        <h1>Questions</h1>
        {
          surveyDef.questions.map((question, q_index) => QuestionEditor({
            ...question,
            q_index
          }))
        }
      </div>
      <div>
        <h1>Result</h1>
        <CodeEditor code={surveyDef.result} />
      </div>
    </div>
  );
}

export default Survey;