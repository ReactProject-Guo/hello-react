import React from 'react';
import {combineReducers} from 'redux'
import storageUtil from './../utils/storageUtils';
import {SET_HEAD_TITLE,RECIVER_USER,SHOW_ERROR_MSG} from './action-types';



const initUser = JSON.parse(storageUtil.getUser());
function userinfo(state=initUser,action) {
  switch (action.type) {
    case RECIVER_USER:
      return action.data;
    case SHOW_ERROR_MSG:
      const errorMsg = action.data;
      // 注意：返回的数据需要是一个对象
      // 在原有的状态数据基础上，添加新的数据
      return {...state,errorMsg}  
    default:
      return state;
  }
}

function headetitle(state='首页',action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
}


export default combineReducers({
  userinfo,
  headetitle
})

