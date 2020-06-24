import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
import PropType from 'prop-types';
import { validateTel, validateEmail, validatePsw } from './../../utils/validate.js';

const Item = Form.Item;
const { Option } = Select;
class UserForm extends PureComponent {
  static propTypes = {
    roles: PropType.array.isRequired,
    user: PropType.object
  }
  /**
    * 提交
    */
  // submit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields(() => {

  //   })
  // }
  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles, user } = this.props;
    // const {username} = this.props.user;
    // console.log('xxxx',user)
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form {...formItemLayout}>
        <Item label="用户名">
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [{
              required: true, message: '用户名不能为空'
            }]
          })(
            <Input placeholder="请输入用户名" />
          )}
        </Item>
        {
          user._id ? null : (
            <Item label="密码">
              {getFieldDecorator('password', {
                initialValue: user.password,
                rules: [{
                  validator: validatePsw
                }]
              })(
                <Input.Password placeholder="请输入密码" />
              )}
            </Item>
          )
        }
        <Item label="手机号码">
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [{
              validator: validateTel
            }]
          })(
            <Input placeholder="请输入手机号码" />
          )}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [{
              validator: validateEmail
            }]
          })(
            <Input placeholder="请输入邮箱" />
          )}
        </Item>
        <Item label="角色">
          {getFieldDecorator('role_id', {
            initialValue: user.role_id,
            rules: [{
              required: true, message: '角色不能为空'
            }]
          })(
            <Select placeholder="请选择角色">
              {
                roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
              }
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);