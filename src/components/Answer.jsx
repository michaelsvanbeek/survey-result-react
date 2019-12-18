import React from 'react';

function Answer(props) {

	const style = {
		'border':'1px solid black',
		'fontSize':'1.75em',
		'padding':'1em',
	};
	if (props.selectedIf(props.state)) {
		style.backgroundColor = 'blue';
	}

	return (
		<div style={style} onClick={() => { props.setState({...props.state,...props.action}) } }>
			{props.answer}
		</div>
	);
}

export default Answer;