import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(){
        super();
        this.state ={
            red:0,
            green:0,
            blue:0
        }
        this.update = this.update.bind(this)
    }

    update(e){
        this.setState({
            red: this.refs.red.refs.inp.value,
            //same result from findDOMNode
            green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
            blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
        })
    }
    render(){
        return (
            <div>
                <Slider ref="red" update={this.update}/>
                {this.state.red}
                <Slider ref="green" update={this.update}/>
                {this.state.green}
                <hr/>
                <NumInput
                ref="blue"
                min={0}
                max={255}
                step={0.1}
                val={+this.state.blue}
                type="range"
                label="bluenum"
                update={this.update}/>
            </div>
        )
    }
}
class Slider extends React.Component{
    render(){
        return(
            <div>
                <input ref="inp" type="range"
                min="0"
                max="255"
                onChange={this.props.update} />
            </div>
        );
    }
}
class NumInput extends React.Component{
    render(){
        let label= this.props.label !==''?
            <label>{this.props.label} - {this.props.val}</label>: ''
        return(
            <div>
                <input ref="inp"
                type={this.props.type}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                defaultValue={this.props.val}
                onChange={this.props.update}/>
                {label}
            </div>
        )
    }
}
NumInput.propType={
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    val: PropTypes.number,
    label: PropTypes.string,
    update: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['number','range'])
}

NumInput.defaultProps = {
    min:0,
    max:0,
    step:1,
    val:0,
    label:'',
    type:'range'
}
export default App