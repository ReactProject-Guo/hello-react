import React, { Component } from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom'
import notFound from './../../assets/img/404.jpg';
import './../../assets/css/not-found.less';
class NotFound extends Component {
  
  render() { 
    return (
      <div className="notFoundPage">
        <img src={notFound} alt="NotFound" />
        <Link to='/' >
          <Button className="toIndex" type="primary" >回到首页</Button>
        </Link>
      </div>
    );
  }
}
 
export default NotFound;