import React, { Component } from 'react';
import './RadioGroup.css'

class RadioGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
    	value: this.props.value
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange = name => (e) => {

  	this.setState({value:[name]})
  	this.props.onSubmit(e)

  }

  componentDidMount(){
  }



  render(){
  	return (<div>
  	
  		{this.props.radiosConfig.map((el, idx) =>{
  			
  			var {...props} = el
  			return(
  				<label className="label" key={el.value} htmlFor={el.value}
  				style={
  					{borderColor:(this.state.value == el.value) ? "grey" : "rgb(0,0,0,0)"}
  				}>{this.props.labels[idx]}
  				<input className="input" id={el.value} type="radio" {...props}
  				checked={(this.state.value == el.value)} onChange={this.onChange(el.value)}>
  				</input></label>
  			)
  	
  				}	)
  		}
  	
  		</div>)
  }
}    

export default RadioGroup;
