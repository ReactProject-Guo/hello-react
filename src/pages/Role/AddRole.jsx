import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropType from 'prop-types';

class AddRole extends Component {
  static propTypes = {
    setForm: PropType.func.isRequired
  }
  componentWillMount() {
    // 将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form.Item label="角色名称" labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('roleName',{
            initialValue:'',
            rules: [{
              required:true, message: '角色名称必须输入'
            }]
          })(
            <Input placeholder="请输入角色名称" />            
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Form.create()(AddRole);