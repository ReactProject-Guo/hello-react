import React, { Component } from 'react';
import { Card, Icon, Button, Select, Input, Table, Tag,message } from 'antd';
import { reqProducts, reqSearchProducts,reqUpdateStatus } from './../../api'
import { PAGE_SIZE } from './../../utils/constants'
const { Option } = Select;

/**
 * Product的默认子路由组件
 */
class ProductIndex extends Component {
  state = {
    productList: [],
    total: '',
    loading: false,
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索 productName:按商品名称搜索  productDesc:按商品描述搜索
  }
  // 初始化table表头
  initColumns = () => {
    this.columns = [{
      title: '商品名称',
      dataIndex: 'name',
      render: text => <a href="/#">{text}</a>,
    }, {
      title: '商品描述',
      dataIndex: 'desc',
    }, {
      title: '价格',
      width: 100,
      dataIndex: 'price',
      render: (price) => `￥${price}`
    }, {
      title: '状态',
      width: 100,
      // dataIndex: 'status',
      render: (product) => {
        const {status,_id,name } = product;
        return (
          <div style={{ textAlign: 'center' }}>
            <Tag color={status === 1 ? '#2DAC91' : '#f00'} onClick={() => this.productStatus(status===1?2:1,_id,name)}>
              {status ===1 ? '下架' : '上架' }
            </Tag><br />
            <span style={{ color:(status === 1) ? '#2DAC91' : '#999'}}>{status ===1 ? '在售' : '已下架' }</span>
          </div>
        )
      },
    }, {
      title: '操作',
      dataIndex: 'product',
      width: 150,
      render: (text, record) =>
        <div>
          <Tag color='#2DAC91' onClick={() => this.props.history.push('/pro/product/detail', { record })}>
            详情
          </Tag>
          <Tag color='#2DAC91' onClick={() => this.props.history.push('/pro/product/edit',record)}>
            编辑
          </Tag>
        </div>
    }]
  }
  // 商品列表数据
  getProducts = async (pageNum) => {
    this.pageNum = pageNum;
    this.setState({ loading: true });
    const { searchName, searchType } = this.state
    let res
    if (searchName) {
      res = await reqSearchProducts({ pageSize: PAGE_SIZE, pageNum, searchName, searchType });
    } else {
      res = await reqProducts({ pageSize: PAGE_SIZE, pageNum });
    }
    console.log(res);

    this.setState({ loading: false });
    if (res.status === 0) {
      const { total, list } = res.data;
      this.setState({
        total,
        productList: list
      })
    }
  }
  /**
   * 此时Dom还未渲染
   * 为第一次render准备数据
   */
  componentWillMount() {
    this.initColumns();
  }
  /**
    * 组件第一次渲染完成，此时DOM节点已经生成，一般在这里调用ajax请求，返回数据setState后组件会重新渲染
    */
  componentDidMount() {
    this.getProducts(1);
  }

  /**
   * 更新商品状态
  */
  productStatus = async (status,productId,name) => {
    // const {categoryId,status} = category;
    
    const res = await reqUpdateStatus(productId,status);
    if(res.status === 0) {
      // message.success(`更新${name}商品成功`);
      message.success(`商品更新成功`);
      this.getProducts(this.pageNum);
    }
  }
  render() {
    const { productList, total, loading, searchType } = this.state;
    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/pro/product/edit')}><Icon type="plus" />添加商品</Button>
    )
    const cardTit = (
      <div>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </div>
    )
    return (
      <Card type="inner" className="product-index" title={cardTit} extra={extra}>
        <Table
          columns={this.columns}
          dataSource={productList}
          bordered
          loading={loading}
          rowKey='_id'
          pagination={{
            current: this.pageNum,
            total: total,
            defaultCurrent: 1,
            defaultPageSize: PAGE_SIZE,
            onChange: this.getProducts,
            showQuickJumper: true
          }}
        />
      </Card>
    );
  }
}

export default ProductIndex;