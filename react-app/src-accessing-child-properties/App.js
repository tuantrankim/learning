import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component
{
  render(){
    return (
      <Button> I <Heart /> React </Button>
    )
  }
}

const Button = (props) => <button>{props.children} </button>

class Heart extends Component
{
  render(){
    return <span>&hearts;</span>
  }
}
export default App;
