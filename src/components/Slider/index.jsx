import React, { Component } from 'react';
// import PropType from 'prop-types';

import sliderImg1 from './img/wf1.jpg';
import sliderImg2 from './img/wf2.jpg';
import sliderImg3 from './img/wf3.jpg';
import sliderImg4 from './img/wf4.jpg';
import sliderImg5 from './img/wf5.jpg';
import './slider.less';
import SerialNum from './SliderDots.jsx'


class Slider extends Component {
    static defaultProps = {
        autoPlay: true, // 是否自动播放
        autoplaySpeed: 2000, // 播放速度
    }
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0, // 记录当前索引
            serialNum: 0, // 记录item数量
            parentDom: ``, // 被移动元素的父元素
            moveLen: 0, // 要移动的距离
            sliderWidth: 0, // slider item的宽度
            timerId: null, // 自动播放定时器
        }
    }
   
    componentDidMount() { // 组件第一次渲染完成，此时DOM节点已经生成，可以在这里调用ajax请求，返回数据后组件会重新渲染
        this.getDom();
    }
    getDom = () => {
        let sliderBox = this.refs.sliderBox;
        let slider = sliderBox.children[0];

        let sliderWidth = slider.offsetWidth;
        let ul = slider.children[0]
        // let ol = slider.children[1];

        let arrow = sliderBox.children[1];
        let preBtn = arrow.children[0];    
        let nextBtn = arrow.children[1];
        
        let liLen = ul.children.length;

        this.setState({
            serialNum: liLen,
            sliderWidth,
            parentDom: ul,
        })  
       
        // 无缝滚动，获取ul中的第一个和最后一个元素
        // 获取ul中的第一个li
        let firstLi = ul.children[0];
        ul.appendChild(firstLi.cloneNode(true));
        let {autoPlay} = this.props;
        if(autoPlay) { // 自动播放
            this.autoPlay();            
        }

    }
    // 2、点击序号 动画的方式，切换图片
    serialNumClick = (currentIndex) => {
        let {parentDom,sliderWidth} = this.state;
        this.setState({currentIndex});
        // 以动画的方式切换图片
        this.moveSlider(parentDom,-currentIndex*sliderWidth);
    }
    // 3 鼠标放到盒子上显示箭头
    mouseEnter = () => {
        this.refs.arrow.style.display = 'block';
        this.stopautoPlay();
    }
    mouseeave = () => {
        this.refs.arrow.style.display = 'none';   
        this.autoPlay();     
    }
    // 4 实现上一张和下一张的功能
    preBtn = () => {
        let {currentIndex,serialNum,parentDom,sliderWidth} = this.state;
        setTimeout(() => {
            // 判断是否是克隆的第一张图片，如果是克隆的第一张图片，此时修改ul的坐标，显示真正的第一张图片
            if(currentIndex === 0) {
                this.serialNumClick(0); 
                this.setState({
                    currentIndex: serialNum
                })
                parentDom.style.left = - serialNum*sliderWidth + 'px';
            }

            this.setState((state) => ({
                currentIndex: state.currentIndex - 1
            }))
            this.serialNumClick(this.state.currentIndex); 
        },0)
    }
    nextBtn = () => {
        let {currentIndex,serialNum,parentDom,sliderWidth} = this.state;
        // 将setState操作改为同步的
        setTimeout(() => {
            // 判断是否是克隆的第一张图片，如果是克隆的第一张图片，此时修改ul的坐标，显示真正的第一张图片
            if (currentIndex === serialNum) {
                parentDom.style.left = '0px';
                this.setState({
                    currentIndex: 0
                })
            }
            this.setState(state => ({
                currentIndex: state.currentIndex + 1
            }))
            // 总共有5张图片，但是还有一张克隆的图片  克隆的图片的索引是5
            if(this.state.currentIndex < serialNum) {
                this.serialNumClick(this.state.currentIndex)                    
            } else { //如果是最后一张图片 以动画的方式，移动到克隆的第一张图片
                this.moveSlider(parentDom,-this.state.currentIndex*sliderWidth);
                this.refs.serialNum.serialNumChecked(0);
            }
            
        },0);
    }
    // 5 自动切换图片 
    autoPlay = () => {
        let {autoplaySpeed} = this.props;
        this.stopautoPlay();
        let timerId = setInterval(() => {
            this.nextBtn();
        },autoplaySpeed)
        this.setState({timerId})
    }
    // 停止自动不妨
    stopautoPlay = () => {
        clearInterval(this.state.timerId);
    }

    // slider移动动画 
    moveSlider = (element, target) => { // 要移动的元素，要移动多远的距离
        // 判断页面上只有一个定时器在执行动画
        if (element.timerId) {
          clearInterval(element.timerId);
          element.timerId = null;
        }
  
        element.timerId = setInterval(function () {
          // 步进  每次移动的距离
          let step = 10;
          // 盒子当前的位置
          let current = element.offsetLeft;
          // 当从400 到 800  执行动画
          // 当从800 到 400  不执行动画
  
          // 判断如果当前位置 > 目标位置 此时的step  要小于0
          if (current > target) {
            step = - Math.abs(step);
          }
  
          if (Math.abs(current - target) <= Math.abs(step)) {
            // 让定时器停止
            clearInterval(element.timerId);
            // 让盒子到target的位置
            element.style.left = target + 'px';
            return;
          }
          // 移动盒子
          current += step;
          element.style.left = current + 'px';
        }, 8)
    }
    
    render() { 
        let {serialNum,parentDom,moveLen,sliderWidth,currentIndex} = this.state;
        console.log('xxxx',this.props);
        return (  
            <div className="main-container magnifier">
                <div className="slider-container" ref="sliderBox" onMouseEnter={() => {this.mouseEnter()}} onMouseLeave={() => {this.mouseeave()}}>
                    <div className="slider">
                        <ul>
                            <li><img src={sliderImg1} alt="" /></li>
                            <li><img src={sliderImg2} alt="" /></li>
                            <li><img src={sliderImg3} alt="" /></li>
                            <li><img src={sliderImg4} alt="" /></li>
                            <li><img src={sliderImg5} alt="" /></li> 
                        </ul>    
                        {/* <slot name="slider"></slot> */}
                        {/* <ol dangerouslySetInnerHTML={{__html:serialNum}}></ol> */}
                        <SerialNum serialNum={serialNum} currentIndex={currentIndex} serialNumClick={this.serialNumClick} ref="serialNum" />
                    </div>
                    <div className="arrow" ref="arrow">
                        <span className="leftArr" onClick={() => {this.preBtn()}}>&lt;</span>
                        <span className="rightArr" onClick={() => {this.nextBtn()}}>&gt;</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;