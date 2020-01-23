import React, { Fragment } from 'react';

const PageFooter = (props) => {
  const footerGridStyle = {
    display: 'grid',
    gridTemplateColumns: '2em auto 2em',
    gridTemplateRows: '2em'
  };

  const backButtonStyle = {
    gridColumn: 1,
    gridRow: 1,
  };

  const textStyle = {
    textAlign: 'center',
    gridColumn: 2,
    gridRow: 1,
  };

  const nextButtonStyle = {
    gridColumn: 3,
    gridRow: 1,
  };

  return (
    <div style={footerGridStyle}>
      <div style={backButtonStyle}>
        <button 
          disabled={props.index === 0}
          onClick={() => { props.setIndex(props.index - 1) }}
          >
          Previous
        </button>
      </div>
      <div style={textStyle}>
        {
          props.index < props.questionCount &&
          (
            <Fragment>
              Question {props.index + 1} of {props.questionCount}
            </Fragment>
          )
        }
        {
          props.index === props.questionCount &&
          (
            <Fragment>
              Results
            </Fragment>
          )
        }
      </div>
      <div style={nextButtonStyle}>
        <button
          disabled={props.index === props.questionCount}
          onClick={() => { props.setIndex(props.index + 1) }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageFooter;
