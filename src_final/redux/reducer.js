// 根据当前state和action返回一个指定的action
import {INCREMENT,DECREMENT} from './action-types';
import {combineReducers} from 'redux'

function count (state=1,action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT: 
      return state - action.data;
    default:
      return state;
  }
}

function user (state ={},action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  count,
  user
})
// export default count;