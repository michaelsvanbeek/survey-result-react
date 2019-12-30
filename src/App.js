import React from 'react';
import AppRouter from './components/AppRouter';

function App() {
  const containerStyle = {
    'marginLeft': 'auto',
    'marginRight': 'auto',
    'minWidth': '36em',
    'maxWidth': '72em'
  };

  return (
    <div style={containerStyle}>
      <AppRouter />
    </div>
  );
}

export default App;
