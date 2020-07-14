import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * UI组件：
 *  只负责UI呈现，不带有任何业务逻辑
 */
class Counter extends Component {
 
  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }
  static propTypes = {
    count: PropTypes.number.isRequired,
    incre: PropTypes.func.isRequired,
    decre: PropTypes.func.isRequired,
    increAsync: PropTypes.func.isRequired
  }
  increment = ()=> {
    const number = this.numberRef.current.value * 1;
    
    this.props.incre(number);
  }
  decrement = ()=> {
    const number = this.numberRef.current.value * 1;

    this.props.decre(number);
  }
  incrementIfOdd = ()=> {
    const number = this.numberRef.current.value * 1;
    if(this.props.count % 2 === 0) {
      this.props.incre(number);
    }
  }
  incrementAsync = ()=> {
    const number = this.numberRef.current.value * 1;
    setTimeout(()=>{
      this.props.increAsync(number);
    },1000)    
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
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementAsync}>increment async</button>            
        </div>
      </div>
      </div>
    );
  }
}
 
export default Counter;