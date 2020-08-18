import React, { Component } from 'react';
import {Card,Button} from 'antd';
import './../../assets/css/userIntl.less';
class UploadImg extends Component {
   
  render() { 
    return (
      <div className="main-container magnifier">
        <Card title="react-intl-universal库基本使用" style={{height: '100%'}}>
            <ul className="user_intl">
                <li>{React.$intl.get('hello')}</li>
                <li>{React.$intl.getHTML('hello_html')}</li>
                {/* 下例中的变量为num，给它标记为plural后，它的值只能为数字。当num值为0时，显示"no photos."；当值为1时，显示"one photo."；当值为其他数字比如25000时，显示“25,000 photos.”，这里的'#'表示给num的值添加千分位分隔符后显示 */}
                <li>{React.$intl.get('hello_num',{num:0})}</li>
                {/* 具体语法为{变量名, 类型, 格式化}，下例中变量名为"price"，它的类型是number，"USD"表示在值前面加上美元符号($) */}
                <li>{React.$intl.get('hello_usd',{price:123456.78})}</li>
                <li>{React.$intl.get('hello_starttime',{start: new Date()})}</li>
                <li>{React.$intl.get('hello_endtime',{end: new Date()})}</li>
                <li><a href="https://github.com/alibaba/react-intl-universal" target="_blank">更多参考</a></li>
            </ul>
        </Card>
      </div>
    );
  }
}
 
export default UploadImg;