import React from 'react';
import AnswerEditor from './AnswerEditor';

const QuestionEditor = (props) => {

  const questionStyle = {
    //'border':'1px solid black',
    'marginTop': '4em',
    'marginBottom': '4em'
  };

  const questionHeaderStyle = {
    'fontSize': '1em'
  }

  const q_index = props.q_index;

  return (
    <div style={questionStyle} key={props._id}>
      <h2>
        Question {q_index}: 
        <input 
          type="text" 
          size={50}
          value={props.question} 
          onChange={e => {
            let updatedSurvey = { ...props.surveyDef };
            updatedSurvey.questions[q_index].question = e.target.value;
            props.setSurveyDef(updatedSurvey);
          } } 
          style={questionHeaderStyle } 
        />
      </h2>
      {
        props.answers.map((answer, a_index) => AnswerEditor({
          ...answer,
          q_index,
          a_index,
          'surveyDef':props.surveyDef,
          'setSurveyDef': props.setSurveyDef,
        }))
      }
    </div>
  );
}

export default QuestionEditor;