import React, { Component } from 'react';
import { Card, Icon, List } from 'antd';
import {reqCategory} from './../../api'
const Item = List.Item;
/**
 * Product商品详情页
 */
class ProductDetail extends Component {
  state = {
    cName1:'', // 一级分类的名称
    cName2:'', // 二级分类的名称 
  }
  async componentDidMount() {
    const {pCategoryId,categoryId} = this.props.location.state.record; 
    if(pCategoryId === '0') { // 获取一级分类的ID
      const res1 = await reqCategory(categoryId); 
      const cName1 = res1.data.name;
      this.setState({cName1});       
    } else {
      /**
       * 通过多个await发送请求，后面一个请求是在前一个请求成功之后才发送的
       *  const res1 = await reqCategory(pCategoryId);            
       *  const res2 = await reqCategory(categoryId); 
       */
      const res = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]) 
      const cName1 = res[0].data.name;
      const cName2 = res[1].data.name;      
      this.setState({cName1,cName2});
    }
  }

  render() {
    const {name,desc,price,detail,imgs} = this.props.location.state.record;const {cName1,cName2} = this.state;    
    // console.log('携带的参数',this.props.location.state.record);

    const cardTit = (
      <div>
        <Icon type="arrow-left" className="arrow" onClick={() =>this.props.history.goBack()} />
        商品详情
      </div>
    )
    return (
      <Card title={cardTit} bordered={false} className="product-index product-detail">
        <List>
          <Item>
            <span className="left-tit">商品名称：</span>
            <span className="right-con">{name}</span>
          </Item>
          <Item>
            <span className="left-tit">商品描述：</span>
            <span className="right-con">{desc}</span>
          </Item>
          <Item>
            <span className="left-tit">商品价格：</span>
            <span className="right-con">{price}元</span>
          </Item>
          <Item>
            <span className="left-tit">所属分类：</span>
            <span className="right-con">{cName1}{cName2 ? `--> ${cName2}` : ''}</span>
          </Item>
          <Item>
            <span className="left-tit">商品图片：</span>
            <div className="right-con">
              {imgs.map(img => (<img key={img} src={img} className="picker" alt="img" />))}
            </div>
          </Item>
          <Item>
          <span className="left-tit">商品详情：</span>
          <span className="right-con" dangerouslySetInnerHTML={{__html:detail}}></span>
        </Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;