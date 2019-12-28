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
              onChange={e => { }} 
            />
          </td>
        </tr>
        <tr>
          <td>Action</td>
          <td>
            <CodeEditor code={props.action} />
          </td>
        </tr>
        <tr>
          <td>Selected If</td>
          <td>
            <CodeEditor code={props.selectedIf} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default AnswerEditor;
