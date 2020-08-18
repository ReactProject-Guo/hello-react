import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class DropDown extends Component {

  menu = () => {
    return (
      <Menu>
        <Menu.Item key="1"><Icon type="user" /><span>{React.$intl.get('dropdown_user')}</span></Menu.Item>
        <Menu.Item key="2"><Icon type="setting" />{React.$intl.get('dropdown_sys')}</Menu.Item>
        <Menu.Item key="3"><span onClick={this.props.loginOut}><Icon type="logout" />{React.$intl.get('dropdown_logiout')}</span></Menu.Item>
      </Menu>
    )
  }

  render() {
    // const {loginOut} = this.props;
    return (
      <div>
        <Dropdown overlay={this.menu.bind(this)}>
          <span className="ant-dropdown-link" href="#" onClick={e => e.preventDefault()}>
            {React.$intl.get('personal_center')}
          </span>
        </Dropdown>
      </div>
    );
  }
}

export default DropDown;