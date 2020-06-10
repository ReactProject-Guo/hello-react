import React, { Component } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import './../../assets/css/category.less'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from './../../api';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';
import { pagations } from './../../utils/tablePagination';
class Category extends Component {
  state = {
    categorys: [], // 存储分类列表数据
    loading: false,
    parentId: '0',
    // selectedId: '', // 用于设置默认选中
    parentName: '',
    subCategory: [], // 存储二级分类
    showStatus: 0, // 记录当前是更新还是添加 0：关闭  1:显示添加 2：显示更新
  }
  // 初始话table表头
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      }, {
        title: '操作',
        width: '25%',
        dataIndex: '',
        render: (category) => <div>
          <span className="link" onClick={() => this.showUpdate(category)}><Icon type="edit" />修改分类</span>
          {/*
              onClick={this.showSubCategory} 这样写的话没有办法传递参数 
              this.showSubCategory(category) 这样写是在页面渲染的时候直接执行该函数，而不是点击的时候才执行该函数
           */}
          {this.state.parentId === '0' ? <span className='link' onClick={() => this.showSubCategory(category)}><Icon type="edit" />查看子分类</span> : null}
        </div>,
      },
    ];
  }
  /**
   * 发送异步的ajax请求，获取分类列表数据
   */
  getCategorys = async (parentId) => {
    this.setState({ loading: true });

    parentId = parentId || this.state.parentId;
    const res = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (res.status === 0) {
      const categorys = res.data;
      if (parentId === '0') { // 默认是一级分类
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategory: categorys
        })
      }
    } else {
      message.error('获取分类列表失败');
    }
  }
  // 获取一级分类
  showCategory = () => {
    this.setState({
      parentId: '0',
      subCategory: [],
      parentName: ''
    })
  }
  // 获取二级分类
  showSubCategory = (category) => {
    // 注意：因为setState是异步操作，所以在更改过parentId之后，执行发送请求的操作
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      this.getCategorys();
    })
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
    this.getCategorys();
  }
  /**
   * 右侧添加按钮
   */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  /**
   * 编辑
   */
  showUpdate = (category) => {
    this.edit_category = category;
    this.setState({
      showStatus: 2
    })
  }
  /**
   * 确认添加按钮
   */
  addCategory = () => {
    /**
     * 1、安全校验
     * 2、获取父ID，用户输入的要添加的类别名称
     * 3、重新请求渲染页面
    */
    this.form.validateFields(async (errors, values) => {
      if (!errors) {
        // 隐藏确认框
        this.setState({
          showStatus: 0
        })
        const { categoryName, parentId } = values;
        const res = await reqAddCategory({ parentId, categoryName });
        // 清除输入框输入数据
        this.form.resetFields()
        if (res.status === 0) {
          // 添加的分类就是当前分类列表下的分类
          if (parentId === this.state.parentId) {
            // 重新获取当前分类的列表
            this.getCategorys();
          } else if (parentId === '0') { // 在二级分类列表下添加一级分类，重新获取一级分类列表但不需要显示一级分类
            this.getCategorys('0');
          }
        }
      }
    })
  }
  /**
   * 确认编辑按钮
   */
  updateCategory = () => {
    /**
      * 1、将类别名称传递给子组件updateCategory
      * 2、调用接口更新当前类别
      * 3、重新渲染页面
    */
    this.form.validateFields(async (errors, values) => {
      if (!errors) {
        const categoryId = this.edit_category._id;
        /**
         * 需要获取子组件中的数据
         * 此时需要注意：this.form绑定的是子组件的form
         */
        const categoryName = this.form.getFieldValue('categoryName');
        const res = await reqUpdateCategory({ categoryId, categoryName });
        this.form.resetFields(); // 重置输入控件的值
        if (res.status === 0) {
          this.getCategorys();
        }
        this.handleCancel();
      }
    })

  }

  handleCancel = e => {
    this.form.resetFields(); // 重置输入控件的值
    this.setState({
      showStatus: 0
    })
  };


  render() {

    const { categorys, loading, parentId, subCategory, parentName, showStatus } = this.state;
    const edit_category = this.edit_category || {}; // 为了防止页面第一次渲染的时候this.edit_category不存在报错

    this.selectedId = parentId === '0' ? categorys[0] && categorys[0]._id : parentId;

    const left_title = parentId === '0' ? '品类管理' : (
      <div>
        <span className="link" onClick={this.showCategory}>品类管理</span>
        <Icon type="arrow-right" style={{ marginRight: 10, marginLeft: 10 }} />
        <span>{parentName}</span>
      </div>
    );
    const extra = (
      <Button type="primary" onClick={this.showAdd}><Icon type="plus" />添加</Button>
    )

    return (
      <div className="container category-container">
        <Card title={left_title} extra={extra}>
          <Table rowKey='_id' dataSource={parentId === '0' ? categorys : subCategory} bordered loading={loading} columns={this.columns} pagination={pagations} />
          <Modal
            title='添加分类'
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
          >
            {/* 子组件向父组件传递数据，需要子组件向父组件传递一个函数 (form)=>this.form = form} */}
            <AddCategory categorysList={categorys} setForm={(form) => this.form = form} parentId={parentId} />
          </Modal>
          <Modal
            title='更新分类'
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateCategory categoryName={edit_category.name} setForm={(form) => this.form = form} />
          </Modal>
        </Card>

      </div>
    );
  }
}

export default Category;