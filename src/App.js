import React from 'react';
import routes from './routes';
import './reset.scss';
import './App.scss';

function App(props) {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
