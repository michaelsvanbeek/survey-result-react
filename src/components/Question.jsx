import React from 'react';
import Answer from './Answer';

const Question = (props) => {

	const questionStyle = {
		//'border':'1px solid black',
		'marginTop':'4em',
		'marginBottom':'4em'
	};

	return (
		<div style={questionStyle} key={props._id}>
			<h2>{props.question}</h2>
			{
				props.answers.map((answer) => Answer({
					...answer,
					'state':props.state,
					'setState':props.setState,
					'config':props.config,
				}))
			}
		</div>
	);
}

export default Question;