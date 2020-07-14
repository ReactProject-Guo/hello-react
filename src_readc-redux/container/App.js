import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incre,decre} from './../redux/actions'
import Counter from './../components/Counter';

// 最终的简化版本(如果看不懂，请看App_base.js)
export default connect(
  state=> ({count:state}),
  {incre,decre}
)(Counter);
