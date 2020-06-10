import React, { Component } from 'react';
import { Avatar } from 'antd';

import './../../assets/css/leftNav.less'
import NavMenu from './NavMenu';
import logoImg from './../../assets/img/logo.jpg';
import menuList from './../../config/menuConfig'
import PropTypes from 'prop-types';

class LeftNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  }
  render() {
    return (
      <div className="left-nav">
        <div className="left-nav-header">
          <Avatar src={logoImg} size="large" />
          <h1>后台管理系统</h1>
        </div>
        <div className="left-nav-menu">
          <NavMenu menuList={menuList} collapsed={this.props.collapsed} />
        </div>
      </div>
    );
  }
}

export default LeftNav;