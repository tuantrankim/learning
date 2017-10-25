import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component
{
  render(){
    return (
      <div>
       <h1> {this.props.txt}</h1>
       </div>
    )
  }
}

App.propTypes = {
  txt: PropTypes.string,
  cat: PropTypes.number.isRequired
}

App.defaultProps = {
  txt: "this is the default txt"
}

export default App;
