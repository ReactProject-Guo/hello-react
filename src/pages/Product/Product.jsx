import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProductIndex from './Index';
import ProductDetail from './Details';
import ProductEdit from './ProductEdit';
import './../../assets/css/product.less'

class Product extends Component {
  render() {
    /**
     * 注意：路由匹配默认是逐层匹配
     * 如果不想逐层匹配需要设置 exact 路径完全匹配
     */
    return (
      <Switch>
        <Route path="/pro/product" component={ProductIndex} exact />
        <Route path="/pro/product/detail" component={ProductDetail} />
        <Route path="/pro/product/edit" component={ProductEdit} />
        {/* 用户输入的路径匹配不到，需要进行路由的重定向 */}
        <Redirect to='/pro/product' />
      </Switch>
    );
  }
}

export default Product;