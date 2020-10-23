import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import ChangeLang from './ChangeLang';
import {connect} from 'react-redux';
import {SwitchTheme} from './SwitchTheme'

import './../../assets/css/header.less';
import moment from 'moment';
class Header extends Component {
  // 对props中的值进行类型限制和必要性限制
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggleCollapsed: PropTypes.func.isRequired,
    loginOut: PropTypes.func.isRequired
  }
  state = {
    currentTime: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  toggleCollapsed = () => {
    this.props.toggleCollapsed();
  }
  getCurrentTime = () => {
    this.timer = setInterval(() => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.setState({currentTime});
    },1000)
  }
  getWeather = () => {
    // $.ajax({
    //   url:"http://wthrcdn.etouch.cn/weather_mini?city=北京",
		//    //dataType:'json',
		// 	type:"get",
		// 	success:function(data){
		// 		console.log("success");
		// 		console.log(data);
			
		// 	}
    // })
    // const res = reqWeather;
    // console.log('getWeather',reqWeather);

    // axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then((res) => {
    //   console.log('getWeather',res)
    // })
    // console.log('res',reqWeather());
  }
  /**
   * 第一次render之后执行，一般在此执行异步操作，发ajax请求 / 启动定时器
   */
  componentDidMount() {
    this.getCurrentTime();
    this.getWeather();
  }
  componentWillUnmount = () => {
    clearInterval(this.timer);
  }
  render() {
    const { collapsed,loginOut,headetitle } = this.props;
    let user = JSON.parse(React.$storage_utils.getUser());
    // let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log()
    return (
      <div className="navHeader">
        <div className="toggle-btn" onClick={this.toggleCollapsed} id="collapseBtn">
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div className="centerText">{headetitle}</div>
        <div className="header-info">
          <div className="welcome">
            <p id="currentTime">{this.state.currentTime}</p> 
            欢迎<span>{user.username}</span>
          </div>
          <div id="usercenter">
            <DropDown loginOut={loginOut} />
          </div>
          <div className="lang">
            <ChangeLang />
          </div>
          <div className="switch-theme">
            <SwitchTheme />
          </div>
        </div>
      </div>
    );
  }
}

// export default Header;
// export default React.memo(Header);

// 将UI组件包装成函数组件
export default connect(
  state => ({headetitle:state.headetitle}),
  {}
)(React.memo(Header));
