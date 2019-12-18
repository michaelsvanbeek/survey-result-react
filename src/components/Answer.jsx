import React from 'react';

const Answer = (props) => {

	const answerStyle = {
		//'border':'1px solid black',
		'fontSize':'1.5em',
		'padding':'1em',
	};
	if (props.selectedIf(props.state)) {
		answerStyle.backgroundColor = 'lightBlue';
	}

	return (
		<div style={answerStyle} onClick={() => { props.setState({...props.state,...props.action(props.state)}) } }>
			{props.answer}
		</div>
	);
}

export default Answer;