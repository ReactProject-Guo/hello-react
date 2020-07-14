
import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {incre,decre} from './redux/actions';
class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  } 
  state = {
    // count: 0
  }
  constructor(props) {
    super(props);
    // React.createRef() 在React 16.3 版本之后，使用此方法来创建ref，将其赋值给一个变量，通过ref挂载到DOM节点或组件上，该ref的current属性将能够拿到dom节点或组件的实例
    this.numberRef = React.createRef();
  }
  increment = ()=> {
    const number = this.numberRef.current.value * 1;
    // this.setState(state => ({ count: state.count + number }));
    this.props.store.dispatch(incre(number));
  }
  decrement = ()=> {
    const number = this.numberRef.current.value * 1;
    // this.setState(state => ({ count: state.count - number }));
    this.props.store.dispatch(decre(number));
  }
  incrementIfOdd = ()=> {
    const number = this.numberRef.current.value * 1;
    if(this.state.count%2 === 0) {
      this.setState(state => ({ count: state.count + number }));      
    }
  }
  incrementAsync = ()=> {
    const number = this.numberRef.current.value * 1;
    setTimeout(() => {
      this.setState(state => ({ count: state.count + number }));            
    },1000)    
  }
  render() { 
    const count = this.props.store.getState();
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
  
 export default App;