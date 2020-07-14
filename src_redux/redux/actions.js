/**
 * 包含n个用来创建action的工厂函数(action creator) 
*/
import {INCREMENT,DECREMENT} from './action-types'

// 增加的action
export const incre = (num) => ({type:INCREMENT,data:num});

// 减少的action
export const decre = (num) => ({type:DECREMENT,data:num}) 
 
