/**
 * 根组件
 */
import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import intl from 'react-intl-universal';

import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

const locales = {
    "en-us": require('./config/locales/en-us.json'),
    "zh-cn": require('./config/locales/zh-cn.json'),
};

 class App extends Component {
    state = {
        initDone: false
    }
    componentDidMount() {
       this.loadLocales(); 
    }

    loadLocales = () => {
        // react-intl-universal 是单例模式, 只应该实例化一次
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
        });
        // 默认为汉语
        // currentLocale = React.$storage_utils.getLang('local_lang') || 'zh-cn';
        intl.init({
            currentLocale: React.$storage_utils.getLang('local_lang') || 'zh-cn', // TODO: determine locale here
            locales,
        })
        .then(() => {
            // console.log(currentLocale);
            this.setState({initDone: true});
        });
        
    }

     render() { 
         return (
            this.state.initDone && (
                <BrowserRouter>
                    <Switch> {/* 只匹配其中一个路由 */}
                        <Route path="/login" component={Login}></Route>
                        <Route path="/" component={Admin}></Route>                    
                    </Switch>
                </BrowserRouter>
            )
        );
     }
 }
  
 export default App;