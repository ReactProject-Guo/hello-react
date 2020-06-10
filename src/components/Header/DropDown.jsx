import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class DropDown extends Component {

  menu = () => {
    return (
      <Menu>
        <Menu.Item key="1"><Icon type="user" /><span>用户设置</span></Menu.Item>
        <Menu.Item key="2"><Icon type="setting" />系统设置</Menu.Item>
        <Menu.Item key="3"><span onClick={this.props.loginOut}><Icon type="logout" />退出登录</span></Menu.Item>
      </Menu>
    )
  }

  render() {
    // const {loginOut} = this.props;
    return (
      <div>
        <Dropdown overlay={this.menu.bind(this)}>
          <span className="ant-dropdown-link" href="#" onClick={e => e.preventDefault()}>
            个人中心
          </span>
        </Dropdown>
      </div>
    );
  }
}

export default DropDown;