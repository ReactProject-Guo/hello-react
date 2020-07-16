import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import Driver from 'driver.js';
import steps from './guide'
import 'driver.js/dist/driver.min.css';

class Guide extends Component {
  state = {
    driver: null
  }
  componentDidMount() {
    this.driver = new Driver({
      opacity: 0.6,
      stageBackground: '#2DAC91'
    })
  }
  guide = () => {
    this.driver.defineSteps(steps)
    this.driver.start()
  }
  showDriver = (e) => {
    e.nativeEvent.stopImmediatePropagation(); // 阻止冒泡
    this.guide();
  }
  render() {
    return (
      <div className="main-container">
        <div className="guide-desc">
          <Icon type="bulb" />
          点击按钮可查看本管理系统的操作
        </div>
        <Button type="primary" onClick={e => this.showDriver(e)}>引导</Button>
      </div>
    );
  }
}

export default Guide;