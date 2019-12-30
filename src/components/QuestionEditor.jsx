import React from 'react';
import AnswerEditor from './AnswerEditor';

const QuestionEditor = (props) => {

  const templateAnswer = {
    answer: '',
    action: 'return {"value":"newValue"}',
    selectedIf: 'return state.value === "newValue"'
  };

  const questionStyle = {
    'border':'1px solid grey',
  };

  const questionHeaderStyle = {
    'fontSize': '1em'
  }

  const q_index = props.q_index;

  const updateSurveyQuestion = (changes) => {
    let updatedSurvey = { ...props.surveyDef };
    updatedSurvey.questions[props.q_index] = {
      ...updatedSurvey.questions[props.q_index],
      ...changes
    };
    props.setSurveyDef(updatedSurvey);
  };

  const addAnswer = () => {
    let updatedSurvey = { ...props.surveyDef };
    updatedSurvey.questions[props.q_index].answers.push(templateAnswer);
    props.setSurveyDef(updatedSurvey);
  };

  const removeAnswer = (a_index) => {
    let updatedSurvey = { ...props.surveyDef };
    updatedSurvey.questions[props.q_index].answers.splice(a_index,1);
    props.setSurveyDef(updatedSurvey);
  };

  return (
    <div style={questionStyle} key={props._id}>
      <h2>
        Question: 
        <input 
          type="text" 
          size={50}
          value={props.question} 
          onChange={e => {
            updateSurveyQuestion({'question':e.target.value});
          } } 
          style={questionHeaderStyle } 
        />
      </h2>
      <table>
        <tbody>
          {
            props.answers.map((answer, a_index) => (
              <tr>
                <td>
                  <button onClick={() => { removeAnswer(a_index) }}>
                    Remove Answer
                  </button>
                </td>
                <td>
                {
                  AnswerEditor({
                    ...answer,
                    q_index,
                    a_index,
                    'surveyDef': props.surveyDef,
                    'setSurveyDef': props.setSurveyDef,
                  })
                }
                </td>
              </tr>
            ))
          }
          <tr>
            <td>
              <button onClick={addAnswer}>
                Add Answer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QuestionEditor;