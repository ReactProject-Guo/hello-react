import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incre,decre,increAsync} from './../redux/actions'
import Counter from './../components/Counter';
import count from '../redux/reducer';
// 容器组件，负责管理数据和业务逻辑，不负责UI呈现

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    incre: (number)=>dispatch(incre(number)),
    decre: (number)=>dispatch(decre(number)),
    increAsync: (number)=>dispatch(increAsync(number)),
  } 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);


// 简化版本
// export default connect(
//   state => ({state:count}),
//   {incre,decre}
// )(Counter);