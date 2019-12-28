import React from 'react';

const Answer = (props) => {

	const answerStyle = {
		'fontSize':'1.5em',
		'padding':'1em',
	};
	// eslint-disable-next-line
	const selectedIfFunc = Function('state',props.selectedIf);
	// eslint-disable-next-line
	const actionFunc = Function('state', props.action);

	if (selectedIfFunc(props.state)) {
		answerStyle.backgroundColor = 'lightBlue';
	}

	return (
		<div key={props._id} style={answerStyle} onClick={() => { props.setState({ ...props.state, ...actionFunc(props.state)}) } }>
			{props.answer}
		</div>
	);
}

export default Answer;