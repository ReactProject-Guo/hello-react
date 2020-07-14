/**
 * 入口JS
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './container/App';
import store from './redux/store';
ReactDom.render(<App store={store} />,document.getElementById('root'));

// store.subscribe(()=> {
//   ReactDom.render(<App store={store} />,document.getElementById('root'));  
// })