import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component
{
  constructor(){
    super()
    this.state = {currentEvent: '___'}
    this.update = this.update.bind(this)
  }

  update(e){
    this.setState({currentEvent: e.type})
  }
  render(){
    return (
      <div>
        <textarea
        onClick={this.update}
        /* onMouseDown={this.update}
        onMouseEnter={this.update}
        onMouseOver={this.update}
        onMouseUp={this.update} */
        onKeyPress={this.update}
        onCopy={this.update}
        onCut={this.update}
        onPaste={this.update}
        onFocus={this.update}
        onBlur={this.update}
        onDoubleClick={this.update}
        onTouchStart={this.update}
        onTouchEnd={this.update}
        onKeypress={this.update}
        cols="30"
        rows="10"
        />

        <h1>{this.state.currentEvent}</h1>
          
      </div>
    )
  }
}

export default App;
