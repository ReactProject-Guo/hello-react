import React, { Component } from 'react';
import MaginfierBig from './../../assets/img/magnifier-big.jpg';
import MaginfierSmall from './../../assets/img/magnifier-small.jpg';


class Index extends Component {

  componentWillMount() {

  }
  componentDidMount() { // 组件第一次渲染完成，此时DOM节点已经生成，可以在这里调用ajax请求，返回数据后组件会重新渲染
    this.init();
  }
  init = () => {
    let box = this.refs.box;
    let smallBox = box.children[0];
    let mask = smallBox.children[1];

    let bigBox = box.children[1];
    let bigBoxImg = bigBox.children[0];

    // 鼠标进入small盒子，显示遮罩层
    smallBox.onmouseenter = function () {
      mask.style.display = 'block';
      bigBox.style.display = 'block';
    }
    smallBox.onmouseleave = function (e) {
      mask.style.display = 'none';
      bigBox.style.display = 'none';
    }
    /**
     * mouseenter mouseleave  不会触发事件冒泡
     * mouseover mouseout 会触发事件冒泡
    */
    box.onmousemove = (e) => {
      e = e || window.event;
      /**
       * 让遮罩层随着鼠标进行移动
       *  1、获取鼠标在盒子中的位置 = 鼠标在当前页面的位置 - 盒子距离浏览器的位置
       *  2、让鼠标出现在mask的中心位置 
      */
      let maskX = (e.pageX - box.offsetLeft) - mask.offsetWidth / 2;
      let maskY = (e.pageY - box.offsetTop) - mask.offsetHeight / 2;

      /**
       * 把mask限制在box中
      */
      maskX = maskX < 0 ? 0 : maskX;
      maskY = maskY < 0 ? 0 : maskY;

      let maskMaxX = box.offsetWidth - mask.offsetWidth;
      let maskMaxY = box.offsetHeight - mask.offsetHeight;

      maskX = maskX > maskMaxX ? maskMaxX : maskX;
      maskY = maskY > maskMaxY ? maskMaxY : maskY;

      mask.style.left = `${maskX}px`;
      mask.style.top = `${maskY}px`;

      // 设置大图偏移的位置
      // mask移动的距离 / mask最大能够移动的距离 = 大图片移动的距离 / 大图片最大能够移动的距离

      // 大图片最大能够移动的距离
      let bigImgMaxX = bigBoxImg.offsetWidth - bigBox.offsetWidth; // 得到的是一个负数
      let bigImgMaxY = bigBoxImg.offsetHeight - bigBox.offsetHeight; // 得到的是一个负数


      // 大图片移动的距离
      let bigImgX = maskX / maskMaxX * bigImgMaxX;
      let bigImgY = maskY / maskMaxY * bigImgMaxY;

      bigBoxImg.style.left = `${-bigImgX}px`;
      bigBoxImg.style.top = `${-bigImgY}px`;
    }
  }

  render() {
    // 遮罩宽度 / 小盒子宽度 = 大盒子宽度 / 大盒子中图片的宽度
    return (
      <div className="main-container magnifier">
        放大镜效果
        <div className="box" ref="box">
          <div className="small">
            {/*  webp 是google公司研发的，在ie和火狐中是不支持的，(webp相比其它格式的图片体积更小) */}
            <img src={MaginfierSmall} alt="" />
            <div className="mask"></div>
          </div>
          <div className="big">
            <img src={MaginfierBig} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;