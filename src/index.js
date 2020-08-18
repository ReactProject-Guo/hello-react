/**
 * 入口JS
 */
import React from 'react';
import ReactDom from 'react-dom';
import './assets/css/base.css';
import storageUtils from './utils/storageUtils';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';
import intl from 'react-intl-universal';

// 将storageUtils绑定到react全局
// 使用：React.$storage_utils
React.$storage_utils = storageUtils;

React.$intl = intl;

// ReactDom.render(<App />,document.getElementById('root'));
ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
),document.getElementById('root'));
