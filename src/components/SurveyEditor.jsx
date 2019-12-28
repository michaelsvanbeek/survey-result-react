import React, {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import QuestionEditor from './QuestionEditor';
import CodeEditor from './CodeEditor';
import { getSurvey, putSurvey } from '../api/SurveyAPI'; 

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
    getSurvey(surveyId).then(setSurveyDef)
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
        <CodeEditor 
          code={JSON.stringify(surveyDef.initialState)} 
          onValueChange={(code) => {
            let initialState = JSON.parse(code)
            let updatedSurveyDef = {
              ...surveyDef,
              initialState
            }
            setSurveyDef(updatedSurveyDef);
          }}
        />
      </div>
      <div>
        <h1>Questions</h1>
        <table>
          <tbody>
            {
              surveyDef.questions.map((question, q_index) => (
                <tr>
                  <td>
                    <button>
                      Remove Question
                    </button>
                  </td>
                  <td>
                    {QuestionEditor({
                      ...question,
                      surveyDef,
                      setSurveyDef,
                      q_index
                    })}
                  </td>
                </tr>
              ))
            }
            <tr>
              <td>
                <button>
                  Add Question
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1>Result</h1>
        <CodeEditor 
          code={surveyDef.result} 
          onValueChange={(code) => {
            let updatedSurveyDef = {
              ...surveyDef,
              'result' : code
            }
            setSurveyDef(updatedSurveyDef);
          }}
        />
      </div>
      <button 
        onClick={ 
          () => {
            let updatedSurveyDef = {...surveyDef};
            delete updatedSurveyDef._id;
            putSurvey(updatedSurveyDef).then(() => {})
          } 
        }>
          Update Survey
      </button>
    </div>
  );
}

export default Survey;