/**
 * 根组件
 */

import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

 class App extends Component {
     render() { 
         return (
            <BrowserRouter>
                <Switch> {/* 只匹配其中一个路由 */}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>                    
                </Switch>
            </BrowserRouter>
        );
     }
 }
  
 export default App;