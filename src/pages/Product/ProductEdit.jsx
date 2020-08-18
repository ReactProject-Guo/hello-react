import React, { Component } from 'react';
import { Card, Icon, Input, Button, Form, Cascader,message } from 'antd';
import { reqCategorys,reqAddOrUpdateProduct } from './../../api';
import UploadImg from './../../components/UploadImg';
import RichText from './../../components/RichText';

const Item = Form.Item;
const { TextArea } = Input;
/**
 * Product商品添加与更新的组件
 */
class ProductEdit extends Component {
  constructor(props) {
    super(props);
    /**
     * Refs是使用 React.createRef()创建的，并通过ref属性附加到react元素
     * 访问Refs: this.uploadimg.current
     */
    this.uploadimg = React.createRef();
    /**
     * 调用子组件的方法，获取数据
     */
    this.richtext = React.createRef();
  }
  state = {
    options: [],
  }
  /*
    验证价格的自定义验证函数
  */
  validatePrice = (rule, value, callback) => {
    console.log('值验证', value * 1, typeof value)
    if (value * 1 > 0) {
      callback(); // 验证通过
    } else {
      callback('商品价格必须大于0')
    }
  }
  /**
  * 提交表单
  */
  submit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
     
      console.log('验证', values);      
      if (!err) {
        // 1、收集数据, 并封装成product对象
        const {name, desc, price, categorysId} = values
        let pCategoryId,categoryId;
        if(categorysId.length === 1) {
          pCategoryId = '0';
          categoryId = categorysId[0];
        } else {
          pCategoryId = categorysId[0];
          categoryId = categorysId[1];
        }
        const imgs = this.uploadimg.current.getImgs();
        const detail = this.richtext.current.getEditorText();
        // const product = {name,desc,price,pCategoryId,categoryId};
        console.log(detail);
        const product = {name, desc, price, imgs, detail, pCategoryId, categoryId}
        // 如果是更新，添加_id
        if(this.isUpdate) {
          product._id = this.product._id;
        }
        
        // 2、调用接口请求函数去添加/更新
        const res = await reqAddOrUpdateProduct(product);
        // 3、根据状态进行提示
        if(res.status === 0) {
          message.success(`${this.isUpdate ? '更新' : '添加'}商品成功！`);
          this.props.history.goBack();
        } else {
          message.success(`${this.isUpdate ? '更新' : '添加'}商品失败！`);          
        }
      }

    })
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    // 根据选中的分类，请求获取二级分类列表
    // 注意：this.getCategorys返回的数据是异步的，这一需要使用await
    const subCategories = await this.getCategorys(selectedOptions[0].value);
    targetOption.loading = false;
    if (subCategories && subCategories.length > 0) {
      const cOptions = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      targetOption.children = cOptions
    } else { // 当前选中的分类没有二级分类
      targetOption.isLeaf = true;
    }
    // 重新更新options数据
    this.setState({
      options: [...this.state.options]
    })
  }
  /**
   * 获取一级分类列表
  */
  getCategorys = async (parentId) => {
    const res = await reqCategorys(parentId);
    // console.log('一级分类列表',res);  
    if (res.status === 0) {
      const categorys = res.data;
      if (parentId === 0) {
        this.initOptions(res.data);
      } else {
        return categorys;
      }
    }
  }

  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => (
      {
        value: c._id,
        label: c.name,
        isLeaf: false,
      }
    ))

    /**
     * 如果是一个二级分类商品的更新
     */
    const { isUpdate, product } = this;
    const { pCategoryId } = product;

    if (isUpdate && pCategoryId !== '0') {
      const subCategories = await this.getCategorys(pCategoryId);

      // 生成二级下拉列表的option
      const childOption = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))

      /**
       * 难点：在更新的时候，默认二级分类是选不中的，添加下面的代码可以选中
      */
      // 找到当前对应的一级Option对象
      const targetOption = options.find(option => option.value === pCategoryId);
      // 将二级下拉列表的option关联到一级分类的 option 上
    //   targetOption.children = childOption;
    }

    this.setState({ options });
  }

  componentDidMount() {
    this.getCategorys(0);
  }
  componentWillMount() {
    const product = this.props.location.state;
    // 保存是否是更新的标识
    this.isUpdate = !!product

    // 保存商品信息
    this.product = product || {};
  }
  render() {
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId, imgs,detail } = product;
    const categorysId = [];
    if (pCategoryId === '0') { // 一级分类ID
      categorysId.push(categoryId);
    } else {
      categorysId.push(pCategoryId);
      categorysId.push(categoryId);
    }
    console.log('imgs', imgs);
    // 得到具有强大功能的form对象
    const { getFieldDecorator } = this.props.form;
    const cardTit = (
      <div>
        <Icon type="arrow-left" className="arrow" onClick={() => this.props.history.goBack()} />
        {isUpdate ? '修改商品' : '添加商品'}
      </div>
    )
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 12 },
    };

    return (
      <Card title={cardTit} bordered={false} className="product-index product-edit">
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [
                { required: true, message: '请输入商品名称' },
              ],
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                { required: true, message: '请输入商品描述' },
              ],
            })(<TextArea autoSize={{ minRows: 1, maxRows: 5 }} placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                { required: true, validator: this.validatePrice }
              ],
            })(<Input type="number" addonAfter="元" placeholder="请输入商品价格" />)}
          </Item>
          {/* categorysId ? categoryId : [] 如果要是不这样写的话，placeholder 不起作用 */}
          <Item label="商品分类">
            {getFieldDecorator('categorysId', {
              initialValue: categorysId ? categorysId : [],
              rules: [
                { required: true, message: '请选择商品分类' },
              ],
            })(<Cascader
              placeholder="请选择商品分类"
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChangeSelect}
            />)}
          </Item>
          <Item label="商品图片">
            <UploadImg ref={this.uploadimg} imgs={imgs} />
          </Item>
          <Item label="商品详情" labelCol={{span:2}} wrapperCol={{span:14}}>
            <RichText ref={this.richtext} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" >确定</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

// export default ProductEdit;
const WrapProductEdit = Form.create()(ProductEdit);
export default WrapProductEdit;