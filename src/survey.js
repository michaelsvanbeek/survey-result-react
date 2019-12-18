import React from 'react';

const survey = {
	'name':'Demo Survey',
  'initial_state': {
    'like_surveys':'',
    'favorite_color':'',
  },
  'questions': [
    {
      'question':"Do you like to take surveys?",
      'answers':[
        {
          'answer':"Yes",
          'action': (state) => {return {'like_surveys':'yes'}},
          'selectedIf': (state) => (state.like_surveys === 'yes')
        },
        {
          'answer':"No",
          'action':(state) => {return {'like_surveys':'no'}},
          'selectedIf': (state) => (state.like_surveys === 'no')
        },
      ]
    },
    {
      'question':"What is your favorite color",
      'answers':[
        {
          'answer':"Red",
          'action':(state) => {return {'favorite_color':'red'}},
          'selectedIf': (state) => (state.favorite_color === 'red')
        },
        {
          'answer':"Green",
          'action':(state) => {return {'favorite_color':'green'}},
          'selectedIf': (state) => (state.favorite_color === 'green')
        },
        {
          'answer':"Blue",
          'action':(state) => {return {'favorite_color':'blue'}},
          'selectedIf': (state) => (state.favorite_color === 'blue')
        },
      ]
    },
  ],
  'result':function(state) {
  	return (
  		<h3>
  			You do {state.like_surveys == 'no' && "not"} like surveys and your favorite color is {state.favorite_color}
  		</h3>
  	);
  }
};

export default survey;
