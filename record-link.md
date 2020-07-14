## axios

`cnpm install axios`

## localStorage

> localStorage在某些浏览器上存在兼容性，所以使用  store  效果会更好些

```
https://github.com/marcuswestin/store.js
npm i store

```
## 富文本编辑器

`yarn add react-draft-wysiwyg draft-js draftjs-to-html` 

或者 

`cnpm install --save react-draft-wysiwyg draft-js draftjs-to-html` 

> <https://github.com/jpuri/react-draft-wysiwyg> 
>
> <https://jpuri.github.io/react-draft-wysiwyg/#/demo> 

## Redux状态管理

* **下载依赖**

  `cnpm install --save redux react-redux redux-thunk redux-devtools-extension`

* 在 `src` 下新建 `redux`文件夹

  ```js
  redux 下新建：store.js / action.js / reducer.js / action-types.js
  ```

  ```js
  store.js
  
  import {createStore,applyMiddleware} from 'redux';
  import reducer from './reducer';
  
  // 用来实现redux异步的中间件插件
  import thunk from 'redux-thunk';
  
  // redux调试工具
  import {composeWithDevTools} from 'redux-devtools-extension';
  
  export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
  ```

  ```js
  reducer.js
  // 在reducer.js中定义自己要 存储的数据
  import React from 'react';
  import {combineReducers} from 'redux'
  import {SET_HEAD_TITLE,RECIVER_USER,SHOW_ERROR_MSG} from './action-types';
  
  function userinfo(state={},action) {
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
  ```

  ```js
  action-type.js
  // 定义常量，防止书写错误
  export const SET_HEAD_TITLE = 'set_head_title';
  export const RECIVER_USER = 'reciver_user';
  
  export const SHOW_ERROR_MSG = 'show_error_msg';
  ```

  ```js
  action.js
  //  在该文件可以执行异步 操作
  
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
      // 1、执行异步ajax请求 下面是自己封装的登录的请求
      const result = await reqLogin(username,password);
      if(result.status === 0) {  // 2.1 如果成功，分发成功的同步action
        const user = result.data;
        dispatch(reciverUser(user));
      } else { // 2.2 如果失败，分发失败的同步action
        const msg = result.msg;
        dispatch(showErrorMsg(msg));
      }
    }
  }
  ```

* `src` -> `index.js`

  ```js
  /**
   * 入口JS
   */
  import React from 'react';
  import ReactDom from 'react-dom';
  import App from './App';
  import store from './redux/store';
  import {Provider} from 'react-redux';
  // Provider 组件接收 store 属性，让所有组件都可以看到 store ,从而通过 store 读取/更新状态
  ReactDom.render((
    <Provider store={store}>
      <App />
    </Provider>
  ),document.getElementById('root'));
  ```

* 在 相应的 页面中需要使用 store 中的数据，和调用action中的方法

  ```js
  // 1. 
  import {connect} from 'react-redux';
  import {setHeadTitle} from './../../redux/action';
  
  // 2. 将 UI 组件包装成容器组件
  将： export default NavMenu;
  修改成下面的：
  export default connect(
    state => ({userinfo:state.userinfo}),
    {setHeadTitle}
  )(NavMenu);
  
  // 3. 在页面中使用
  
  let userinfo = this.props.userinfo; // 获取store中的数据
  
  this.props.setHeadTitle('修改HeadTitle的值'); // 调用action中的方法
  ```

* 以上代码并没有将 redux 相关的理论只是，只是想对 redux 使用的步骤记录一下，如果对上面代码不理解，可以参考 <https://juejin.im/post/5efd7dae5188252e937bd981#heading-11> 



### 使用BrowserRouter的问题

问题：刷新某个路由路径时，会出现404的错误

原因：项目根路径后的path路径会被当做后台路由路径，去请求对应的后台路由

解决：使用自定义中间件去读取返回index页面展现

```js
后台项目的 server.js

const fs = require('fs');
// 必须在路由器中间之后声明使用
app.use((req,res) => {
   fs.readFile(__dirname+'/public/index.html',(err,data) => {
       if(err) {
           res.send('后台错误')
       } else {
           res.writeHead(200,{
               'Content-Type': 'text/html;charset=utf-8'
           })
           res.end(data);
       } 
   }) 	
})
```

注意：前端路由路径不要与后台路由路径相同，