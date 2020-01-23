import React from 'react';
import CodeEditor from './CodeEditor';

const AnswerEditor = (props) => {

  const updateSurveyAnswer = (changes) => {
    let updatedSurvey = { ...props.surveyDef };
    updatedSurvey.questions[props.q_index].answers[props.a_index] = {
      ...updatedSurvey.questions[props.q_index].answers[props.a_index],
      ...changes
    };
    props.setSurveyDef(updatedSurvey);
  };

  return (
    <table key={props._id} style={ {'border':'1px solid grey'} }>
      <tbody>
        <tr>
          <td>Answer</td>
          <td>
            <input
              type="text"
              size={50}
              value={props.answer}
              onChange={e => {
                updateSurveyAnswer({ 'answer': e.target.value })
              }} 
            />
          </td>
        </tr>
        <tr>
          <td>Action</td>
          <td>
            <CodeEditor 
              code={props.action} 
              validate="code"
              onValueChange={(code) => {
                updateSurveyAnswer({ 'action': code })
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Selected If</td>
          <td>
            <CodeEditor 
              code={props.selectedIf} 
              validate="code"
              onValueChange={(code) => {
                updateSurveyAnswer({ 'selectedIf': code })
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default AnswerEditor;
