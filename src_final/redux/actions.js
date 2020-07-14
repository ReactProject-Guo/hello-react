import {INCREMENT,DECREMENT} from './action-types';

export const incre = (number)=>({type:INCREMENT,data:number});
// 返回对象
export const decre = (number)=>({type:DECREMENT,data:number});

// 增加异步的action,返回的是函数
export const increAsync = number => {
  return dispatch => {
    /**
     * 执行异步操作(定时器，ajax请求，promise)
    */
    setTimeout(() => {
      // 当异步任务执行完成时，分发一个同步action
      dispatch(incre(number));
    }, 1000);
  }
}