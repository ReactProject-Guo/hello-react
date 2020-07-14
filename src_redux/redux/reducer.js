/**
 * reducer函数模块：根据当前state和指定action返回一个新的state
*/
import {INCREMENT,DECREMENT} from './action-types'
// 管理count状态数据的reducer
export default function count(state=2,action) { // 参数是固定的 (state指的就是数据本身)
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default: 
      return state;  
  }
} 