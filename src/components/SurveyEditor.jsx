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

const templateQuestion = {
  question: 'New question',
  answers: []
};

const Survey = () => {
  let { surveyId } = useParams();
  const [surveyDef, setSurveyDef] = useState(loadingSurvey);
  useEffect(() => {
    getSurvey(surveyId).then(setSurveyDef)
  }, [surveyId]);

  const updateSurvey = (changes) => {
    let updatedSurvey = { 
      ...surveyDef,
      ...changes
    };
    setSurveyDef(updatedSurvey);
  };

  const addQuestion = () => {
    let updatedSurvey = {...surveyDef};
    updatedSurvey.questions.push(templateQuestion);
    setSurveyDef(updatedSurvey);
  };

  const removeQuestion = (q_index) => {
    let updatedSurvey = { ...surveyDef };
    updatedSurvey.questions.splice(q_index,1);
    setSurveyDef(updatedSurvey);
  };

  return (
    <div>
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
            updateSurvey({ initialState: JSON.parse(code)});
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
                    <button onClick={() => { removeQuestion(q_index) }}>
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
                <button onClick={addQuestion} >
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
            updateSurvey({result: code})
          }}
        />
      </div>
      <button 
        onClick={ 
          () => {
            putSurvey(surveyDef).then(() => {})
          } 
        }>
          Update Survey
      </button>
    </div>
  );
}

export default Survey;