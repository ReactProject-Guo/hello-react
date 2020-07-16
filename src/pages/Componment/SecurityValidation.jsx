import React, { Component } from 'react';
import {Card,Button} from 'antd';
import './../../assets/css/com.less'
// import SlideVerify from './../../components/SlideVerify';
// import './../../components/SlideVerify'
class SecurityValidation extends Component {
  // state = {
  //     url: ""
  // }

  
  // componentDidMount() {
  //     this.setState({ url: this.getImage() })
  // }

  // onReload = () => {
  //   this.setState({ url: this.getImage() })
  // }
  // getImage = () => {
  //   return `https://picsum.photos/300/150/?image=1`
  // }
  render() { 
    return (
      <div className="container category-container">
        <Card title="滑动验证">
          {/*
            <div className="desc-text">点击按钮调出滑动验证模块，相关配置如下：</div>
            <Button type="primary">验证</Button>
            <div class="container">
              <div id="captcha" style="position: relative"></div>
            </div>
          */}
        </Card>
      </div>
    );
  }
}
 
export default SecurityValidation;