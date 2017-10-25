import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// not use default txt
// ReactDOM.render(<App cat={5} txt="this is prop text"/>,document.getElementById('root'))

//use default txt
ReactDOM.render(<App cat={5} />,document.getElementById('root'))