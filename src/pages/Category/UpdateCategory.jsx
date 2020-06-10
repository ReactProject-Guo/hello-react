import React, { Component } from 'react';
import { Input, Form } from 'antd';
import './../../assets/css/category.less'
import PropType from 'prop-types';
const Item = Form.Item; // 注意const不能写在import之前

class UpdateCategory extends Component {
  static propType = {
    categoryName: PropType.string.isRequired,
    setForm: PropType.func.isRequired
  }
  componentWillMount() {
    // 将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {categoryName} = this.props;
    return (
      <div className="edit-category">
        <Form>
          <Item label="分类名称：" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('categoryName', {
              rules: [
                { required: true, message: '请输入分类名称' },
                { min: 4, message: '分类名称长度必须大于4位！' },
                { max: 12, message: '分类名称长度必须小于12位' },
              ],
              initialValue:categoryName
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
const update_category = Form.create()(UpdateCategory);
export default update_category;