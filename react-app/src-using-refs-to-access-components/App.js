import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class App extends Component
{
  constructor(){
    super()
    this.state = {a:'', b:'', c:'', d:''}
  }

  /*
  //without using ref
  update(e)
  {
    // this.state.a = e.target.value
    // this.state.b = e.target.value
    // this.setState({});
    //or
    this.state.a = e.target.value
    this.state.b = e.target.value
    this.setState({
      a:e.target.value,
      b:e.target.value
    });

  }
  render(){
    return (
      <div>
        <input onChange={this.update.bind(this)}
        />
        {this.state.a}
        <hr/>
        <input onChange={this.update.bind(this)}
        />
        {this.state.b}
      </div>
    )
  }
  */

  //using ref
  update(e)
  {
    this.setState({
      //using e.target
      a:e.target.value,
      //using ref
      b:this.refs.b.value,
      //using component ref without div
      c:ReactDOM.findDOMNode(this.c).value,
      //using component ref with div
      d:this.d.refs.input.value
    });

  }
  render(){
    return (
      <div>
        <input ref="a" onChange={this.update.bind(this)}
        />
        {this.state.a}
        <hr/>
        <input ref="b" onChange={this.update.bind(this)}
        />
        {this.state.b}
        <hr/>
        <Input ref={component => this.c = component} update={this.update.bind(this)}
        />
        {this.state.c}
        <hr/>
        <DivInput ref={component => this.d = component} update={this.update.bind(this)}
        />
        {this.state.d}
      </div>
    )
  }
}

class Input extends React.Component{
  render(){
      return <input type="text" onChange={this.props.update}/>
  }
}

class DivInput extends React.Component{
  render(){
      return <div><input ref="input" type="text" onChange={this.props.update}/></div>
  }
}

export default App;
