import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incre,decre} from './../redux/actions'
import Counter from './../components/Counter';
/**
 * 容器组件：通过connect包装UI组件产生新的组件
*/

/**
 * 用来将redux管理的state数据映射成UI组件的一般属性的函数
 */
function mapStateToProps(state) {
  return {
    count: state
  }  
}

/**
 * 将包含dispatch代码的函数映射成UI组件的函数属性的函数
 *  
 */
function mapDispatchToProps(dispatch) {
  return {
    incre: (number)=>dispatch(incre(number)),
    decre: (number)=>dispatch(decre(number))
  }
}
/**
 * map 映射的意思
 */
export default connect(
  mapStateToProps, // 指定一般属性
  mapDispatchToProps, // 指定函数属性
)(Counter);

/**
 * 高阶组件：
 *  接收一个组件，返回一个组件函数
 *  connect() 高阶函数，返回的函数是一个高阶组件，接收一个UI组件，生成一个容器组件
 *  容器组件的责任：向UI组件传入特定的属性
 */