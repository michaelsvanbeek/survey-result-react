import React from 'react';
import Survey from './components/Survey';

import survey from './survey';

function App() {

  const containerStyle = {
    'width':'72em',
    'marginLeft':'auto',
    'marginRight':'auto'
  }

  return (
    <div style={containerStyle}>
      {Survey(survey)}
    </div>
  );
}

export default App;
