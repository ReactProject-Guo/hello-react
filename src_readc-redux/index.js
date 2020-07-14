/**
 * 入口JS
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './container/App';
import store from './redux/store';
import {Provider} from 'react-redux';
// ReactDom.render(<App store={store} />,document.getElementById('root'));

// // 默认情况下 store中的数据发生改变，不会触发组件的更新
// store.subscribe(() => { // store内部的状态数据发生改变时的回调
//   // 重新渲染APP组件标签
//   ReactDom.render(<App store={store} />,document.getElementById('root'));  
// })
ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
),document.getElementById('root'));
