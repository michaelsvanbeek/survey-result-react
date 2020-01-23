import React, { Fragment, useState } from 'react';
import Editor from 'react-simple-code-editor';
import * as babel from '@babel/standalone';
import * as babelReact from '@babel/preset-react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import './CodeEditor.css';

const babelSettings = {
  parserOpts: {
    'allowReturnOutsideFunction': true
  },
  presets: [babelReact]
};

const CodeEditor = (props) => {

  const [error, setError] = useState("");

  const onValueChange = (newValue) => {
    if(props.validate && props.validate === "json") {
      try {
        JSON.parse(newValue)
        setError("")
      } catch (e) {
        setError(e.message)
      }
    }
    if(props.validate && props.validate === "code") {
      try {
        babel.transform(newValue, babelSettings);
        setError("")
      } catch (e) {
        setError(e.message)
      }
    }
    props.onValueChange(newValue);
  };

  return (
    <Fragment>
      <Editor
        value={props.code}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      {
        props.validate &&
        <div style={{ "backgroundColor": error.length > 0 ? "red" : "green" }}>
          {error.length > 0 && error}
          {error.length === 0 && "Vaidation: Success"}
        </div>
      }
    </Fragment>
  );
};

export default CodeEditor;
