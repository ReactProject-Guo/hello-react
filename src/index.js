/**
 * 入口JS
 */
import React from 'react';
import ReactDom from 'react-dom';
import '@/assets/css/main.less';
import storageUtils from './utils/storageUtils';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';
import intl from 'react-intl-universal';

// switch theme
import {initTheme} from '@/assets/css/theme/theme.js';
initTheme(true);

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
