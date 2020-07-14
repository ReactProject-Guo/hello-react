import {SET_HEAD_TITLE,RECIVER_USER,SHOW_ERROR_MSG} from './action-types';
import {reqLogin} from './../api'
import storageUtils from './../config/menuConfig'
/**
 * 包含 n个action creator 函数的模块
 * 同步action: 对象 {type:'xxx',data:数据值}
 * 异步action: 函数 dispatch => {} 
 */

export const setHeadTitle = (headTitle) => ({type:SET_HEAD_TITLE,data:headTitle})

export const reciverUser = (userinfo) => ({type:RECIVER_USER,data:userinfo});

// 显示错误信息
export const showErrorMsg = (errorMsg) => ({type:SHOW_ERROR_MSG,data:errorMsg}); 


// 登录的异步action
export const loginFunc = (username,password) => {
  return async dispatch => {
    // 1、执行异步ajax请求
    const result = await reqLogin(username,password);
    if(result.status === 0) {  // 2.1 如果成功，分发成功的同步action
      const user = result.data;
      this.props.history.replace('/'); // 路由不可以回退，不用记录路由历史
      storageUtils.setUser(JSON.stringify(user));
      dispatch(reciverUser(user));
    } else { // 2.2 如果失败，分发失败的同步action
      const msg = result.msg;
      dispatch(showErrorMsg(msg));
    }
  }
}

