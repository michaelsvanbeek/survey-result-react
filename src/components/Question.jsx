import React from 'react';
import Answer from './Answer';

function Question(props) {

	const style = {'border':'1px solid black'}

	return (
		<div style={style}>
			<h2>{props.question}</h2>
			{
				props.answers.map((answer) => Answer({
					...answer,
					'state':props.state,
					'setState':props.setState,
				}))
			}
		</div>
	);
}

export default Question;