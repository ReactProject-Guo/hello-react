import React, { Component } from 'react';
import PropType from 'prop-types';
class SliderDots extends Component {
   static propTypes = {
    serialNum: PropType.number.isRequired,
    currentIndex: PropType.number.isRequired
   }
   
   liList = (num) => {
        let li = [];
        for(let i = 0;i<num;i++) {
            li.push(i)
        }
        return li;
   }
   olLiClick = (i) => {
    this.props.serialNumClick(i);

   }
   serialNumChecked = (i) => { // 设置li选中状态
    let {serialNum} = this.props;
    for (let i = 0; i < serialNum; i++) {
        this.refs.serial_ol.children[i].className = ''
    }
    this.refs.serial_ol.children[i].className = 'current';
   }
    render() { 
        let {serialNum,currentIndex} = this.props;
        let liArr = this.liList(serialNum);
        return (
            <ol ref="serial_ol">
                {
                    liArr.map((i) => {
                        return <li className={currentIndex === i ? 'current' : ''} index={i} key={i} onClick={() => {this.olLiClick(i)}}>{i+1}</li>
                    })
                }                
            </ol>
        );
    }
}
 
export default SliderDots;