/**
 * 入口JS
 */
import React from 'react';
import ReactDom from 'react-dom';
import './assets/css/base.css';
import storageUtils from './utils/storageUtils';
import App from './App';
// 将storageUtils绑定到react全局
// 使用：React.$storage_utils
React.$storage_utils = storageUtils;
ReactDom.render(<App />,document.getElementById('root'));