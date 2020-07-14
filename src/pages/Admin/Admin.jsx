import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Modal } from 'antd';
import storageUtils from './../../utils/storageUtils';
import LeftNav from './../../components/LeftNav';
import Header from './../../components/Header';
import Home from './../Home/Home'
import Category from './../Category/Category';
import Product from './../Product/Product';
import Role from './../Role/Role';
import User from './../User/User';
import Bar from './../Graph/Bar';
import Line from './../Graph/Line';
import PieChart from './../Graph/PieChart';
import NotFound from './../NotFound'

import './../../assets/css/admin.less'

const { Footer, Sider, Content } = Layout;
const { confirm } = Modal;
class Admin extends Component {
  state = {
    collapsed: false
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  loginOut = () => {
    confirm({
      content: '确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        console.log('OK', this.props.history);
        React.$storage_utils.removeUser();
        this.props.history.replace('/login');
      },
    });
  }
 
  render() {
    let user = JSON.parse(storageUtils.getUser());
    console.log('用户信息',user);
    if (!user || !user._id) {
      return <Redirect to='/login' />;
    }
    const { collapsed } = this.state;
    return (
      // <div className={['left-nav',collapsed ? ' left-nav-collapsed':''].join('')}>
      <Layout style={{ minHeight: '100%' }}>
        <Sider collapsed={collapsed}>
          <LeftNav collapsed={collapsed} />
        </Sider>
        <Layout>
          {/* 父组件将值传递给子组件 */}
          <Header collapsed={collapsed} toggleCollapsed={this.toggleCollapsed} loginOut={this.loginOut} />
          <Content>
            <Switch>
              {/* 完全匹配(精确匹配) */}
              <Redirect exact={true} from='/' to='/home' />
              <Route path="/pro/category" component={Category} />
              <Route path="/pro/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/graph/bar" component={Bar} />
              <Route path="/graph/line" component={Line} />
              <Route path="/graph/pie" component={PieChart} />
              <Route path="/home" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>推荐获得最佳的效果体验</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;