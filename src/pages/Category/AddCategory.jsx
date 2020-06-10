import React, { Component } from 'react';
import { Select, Input, Form } from 'antd';
import './../../assets/css/category.less'
import PropType from 'prop-types';
const { Option } = Select;
const Item = Form.Item; // 注意const不能写在import之前

class AddCategory extends Component {
  static propTypes = {
    categorysList: PropType.array.isRequired,
    setForm: PropType.func.isRequired,
    parentId: PropType.string.isRequired
  }
  componentWillMount() {
    // 将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form);
  }
  render() {
    const { categorysList, parentId } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="edit-category">
        <Form onSubmit={this.handleSubmit}>
          <Item label="所属分类：">
            {getFieldDecorator('parentId', {
              initialValue: parentId,
              rules: [{ required: true, message: '请选择所属分类！' }],
            })(
              <Select
                style={{ width: '100%' }}
                placeholder="请选择所属分类！"
              >
              <Option value='0'>品类管理</Option>
              {categorysList.map(res => {
                return (<Option value={res._id} key={res._id}>{res.name}</Option>)
              })}
              </Select>
            )}
          </Item>
          <Item label="分类名称：">
            {getFieldDecorator('categoryName', {
              rules: [
                { required: true, message: '请输入分类名称' },
                { min: 4, message: '分类名称长度必须大于4位！' },
                { max: 12, message: '分类名称长度必须小于12位' }
              ],
            })(<Input placeholder="请输入分类名称" />)}
          </Item>
        </Form>
      </div>
    );
  }
}

// export default AddCategory;
/**
 * 包装Form组件生成一个新的组件：Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 */
const add_category = Form.create()(AddCategory);
export default add_category;