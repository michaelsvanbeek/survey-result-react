import React from 'react';
import CodeEditor from './CodeEditor';

const AnswerEditor = (props) => {
  return (
    <table key={props._id}>
      <tbody>
        <tr>
          <td>Answer {props.a_index}</td>
          <td>
            <input
              type="text"
              size={50}
              value={props.answer}
              onChange={e => {
                let updatedSurvey = { ...props.surveyDef };
                updatedSurvey.questions[props.q_index].answers[props.a_index].answer = e.target.value;
                props.setSurveyDef(updatedSurvey);
              }} 
            />
          </td>
        </tr>
        <tr>
          <td>Action</td>
          <td>
            <CodeEditor 
              code={props.action} 
              onValueChange={(code) => {
                let updatedSurvey = { ...props.surveyDef };
                updatedSurvey.questions[props.q_index].answers[props.a_index].action = code;
                props.setSurveyDef(updatedSurvey);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Selected If</td>
          <td>
            <CodeEditor 
              code={props.selectedIf} 
              onValueChange={(code) => {
                let updatedSurvey = { ...props.surveyDef };
                updatedSurvey.questions[props.q_index].answers[props.a_index].selectedIf = code;
                props.setSurveyDef(updatedSurvey);
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default AnswerEditor;
