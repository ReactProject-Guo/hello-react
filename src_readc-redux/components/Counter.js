import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * UI组件
 */
class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    incre: PropTypes.func.isRequired,
    decre: PropTypes.func.isRequired
  } 
  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }
  increment = ()=> {
    const number = this.numberRef.current.value * 1;
    this.props.incre(number);
  }
  decrement = ()=> {
    const number = this.numberRef.current.value * 1;
    this.props.decre(number);
  }
  render() { 
    const count = this.props.count;
    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>            
          </select>
          <div className="btnGroup">
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button> 
          </div>
        </div>
      </div>
    );
  }
}
 
export default Counter;