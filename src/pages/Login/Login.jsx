import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './../../assets/css/login.less'
import { Form, Input, Button,message,notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from './../../api'
import storageUtils from './../../utils/storageUtils';
const Item = Form.Item; // 注意const不能写在import之前

class Login extends Component {
  state = {
    loading: false
  }
  enterLoading = () => {
    this.setState({
      loading: true
    })
  }
  handleSubmit = e=> {
    e.preventDefault();
    this.props.form.validateFields(async (err,values) => {
      if(!err) {
        let { username,password } = values;
        console.log('用户输入数据',values);
        /**
         * 使用 async 和 await 简化 promise 的操作，不用使用 .then()来指定成功或失败的回调函数
         * 以同步编码(没有回调函数了，有回调函数的就是异步编码方式)
         * 1、哪里写 await ?
         *    - 在返回promise的表达式的左侧写await,不想要promise,想要promise异步执行成功的结果
         * 2、哪里写 async ?
         *    - await所在函数(最近的)定义的左侧写async 
         */
        // try {
        //   const response = await reqLogin({ username,password });
        //   console.log('请求成功',response.data);
        // } catch(error) {
        //   console.log('请求出错',error);
        // }
        const response = await reqLogin({ username,password });
        // console.log('请求成功',response);
        
        this.enterLoading();
        if(response.status === 0) {
          message.success('登录成功！');
          storageUtils.setUser(JSON.stringify(response.data));
          // goBack() 返回上一级路由
          // this.props.history.push('/'); 使用push的话，路由可以回退 
          this.props.history.replace('/'); // 路由不可以回退，不用记录路由历史
        } else {
          this.setState({
            loading:false
          })
          message.error(response.msg)
        }
      } else {
        console.log('检验失败!')
      }
    })
  }
  // 对密码进行自定义验证
  validatePwd = (rule, value, callback)=> {
    // callback() 验证通过
    // callback("xxx") 验证失败，并指定提示的文本
    if(!value) {
      callback('必须输入密码！');
    } else if(value.length < 4) {
      callback('密码长度必须大于4位！');      
    } else if(value.length > 12 ) {
      callback('密码长度必须小于12位');
    } else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
      console.log(value);
      callback('密码必须是由数字、字母或下划线组成');      
    } else { // 验证通过
      callback();
    }
  }

  componentDidMount() {
    notification.open({
      message: '欢迎使用后台管理平台',
      duration: null,
      description: '账号 admin(管理员) 其它(游客) 密码随意'
    })
  }
  componentWillUnmount() {
    notification.destroy();
    this.timer && clearTimeout(this.timer);
  }

  render() {
    // 判断用户是否已经登录
    let user = JSON.parse(storageUtils.getUser());
    if(user && user.username) {
      return <Redirect to='/' />;
    }

    // 得到具有强大功能的form对象
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="loginForm">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            onSubmit={this.handleSubmit}
          >
            <Item>
              {getFieldDecorator('username', {
                // 声明式验证，直接使用别人定义好的验证规则进行验证
                rules: [
                  { required: true,whitespace:false, message: 'Please input your username!' },
                  { min: 4, message: '用户名长度必须大于4位！' },
                  { max: 12, message: '用户名长度必须小于12位' },
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是由数字、字母或下划线组成'}
                ]
              })(
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className="form-input" />
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{
                  // 自定义验证
                  validator: this.validatePwd
                }]
              })(
                <Input prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  className="form-input"
                  placeholder="Password"
                />
              )}
            </Item>
            <Item
              name="submit-btn"
              className="submitBtn"
            >
              <Button type="primary" htmlType="submit" className="login-form-button"
              loading={this.state.loading}>
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}
/**
 * 高阶函数
 *   1). 一类特别的函数
 *        a. 接收函数类型的参数
 *        b. 返回值是函数  
 * 高阶组件
 *   1). 本质就是一个函数
 *   2). 接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
 *   被包装组件是包装组件的一个子组件
 *   3). 作用：扩展组件功能
 *   4). 高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数
 *   
 */

/**
 * 包装Form组件生成一个新的组件：Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 */
const WrapLogin = Form.create()(Login);
export default WrapLogin;