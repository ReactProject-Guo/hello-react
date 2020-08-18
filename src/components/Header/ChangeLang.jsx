import React, { Component } from 'react';
import './../../assets/css/lang.less';
import intl from 'react-intl-universal';
// const lang = 

class ChangeLang extends Component {
    state = {
        isZh: true,
    }
    changeLang = (lang) => {
        React.$storage_utils.setLang(lang);
        this.setState({
            isZh: lang === 'zh-cn' ? true : false
        })
    }   
    componentDidMount() {
        this.setState({
            isZh: intl.get('lang') === 'zh-cn' ? true : false
        })
    } 
    render() {
        let {isZh} = this.state;
        return (
            <div>
                <span className={isZh?'checked':''} onClick={() => {this.changeLang('zh-cn')}}>ZH</span>
                    /
                <span className={isZh?'':'checked'} onClick={() => {this.changeLang('en-us')}}>EN</span>
            </div>
        );
    }
}

export default ChangeLang;