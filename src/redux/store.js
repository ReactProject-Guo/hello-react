import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer';

// 用来实现redux异步的中间件插件
import thunk from 'redux-thunk';

// redux调试工具
import {composeWithDevTools} from 'redux-devtools-extension';

 
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));