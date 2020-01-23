import React, {
  useEffect,
  useState,
} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import QuestionEditor from './QuestionEditor';
import CodeEditor from './CodeEditor';
import { getSurvey, putSurvey } from '../api/SurveyAPI';
import { surveyTemplate } from '../classes/Survey';
import { questionTemplate } from '../classes/Question';

const Survey = () => {
  let { surveyId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [surveyDef, setSurveyDef] = useState(surveyTemplate);
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
    updatedSurvey.questions.push(questionTemplate);
    setSurveyDef(updatedSurvey);
  };

  const removeQuestion = (q_index) => {
    let updatedSurvey = { ...surveyDef };
    updatedSurvey.questions.splice(q_index,1);
    setSurveyDef(updatedSurvey);
  };

  if (redirect) {
    return (<Redirect to={`/survey/${surveyDef._id}`} />);
  } 

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
          code={surveyDef.initialState} 
          validate="json"
          onValueChange={(code) => {
            updateSurvey({ initialState: code});
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
          validate="code"
          onValueChange={(code) => {
            updateSurvey({result: code})
          }}
        />
      </div>
      <div>
        <h1>Config</h1>
        {
        Object.entries(surveyDef.config).map((item) => (
            <div>
              {item[0]}: 
              <input 
                type='text'
                value={item[1]}
                onChange={(e) => {
                  let newConfig = {...surveyDef.config};
                  newConfig[item[0]] = e.target.value;
                  setSurveyDef({
                    ...surveyDef,
                    config: newConfig})
                  }} />
            </div>
          ))
        }
      </div>
      <button 
        onClick={ 
          () => {
            putSurvey(surveyDef).then(() => {setRedirect(true)})
          } 
        }>
          Update Survey
      </button>
    </div>
  );
}

export default Survey;