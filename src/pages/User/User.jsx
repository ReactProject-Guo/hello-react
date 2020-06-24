import React, { Component } from 'react';
import { Card, Button, Table, message, Modal, Tag } from 'antd';
import moment from 'moment';
import { pagations } from './../../utils/tablePagination';
import {reqUsers,reqDeleteUsers,reqAddOrUpdateUsers} from './../../api';
import UserForm from './UserForm';
class User extends Component {
  state = {
    users: [], // 用户列表数据
    roles:[], // 记录用户身份
    loading:false,
    userEditorModal:false,
  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render:(create_time)=>moment(create_time).format('YYYY-MM-DD  hh:mm:ss')
      }, {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        key: 'action',
        render: (text, user) => (
          <div>
            <Tag color="#2DAC91" onClick={()=>this.editUser(user)}>修改</Tag>
            <Tag color="#2DAC91" onClick={() => this.delUser(user)}>删除</Tag>
          </div>
        ),
      },
    ];

  }
  /**
   * 获取用户列表
  */
  getUserList = async () => {
    this.setState({loading:true});
    const res = await reqUsers();
    this.setState({loading:false});
    if(res.status === 0) {
      const {users,roles} = res.data;
      this.initRoleName(roles);
      this.setState({users,roles});
    } else {
      message.error('用户列表获取失败');
    }
  }
  /*
    处理用户列表数据 
  */
  initRoleName = (roles) => {
    // reduce有四个参数，第一个参数代表上一次循环的值，第二个参数当前item，第三个参数：index,第四个参数：当前数组
    const roleNames = roles.reduce((pre,role)=> {
      pre[role._id] = role.name
      return pre
    },{})
    this.roleNames = roleNames;
  }
  /**
   * 删除用户
  */
  delUser = (user) => {
    const {_id,username} = user;
    Modal.confirm({
      title: `确定删除${username}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteUsers(_id);
        if(res.status === 0) {
          message.success('删除用户成功');
          this.getUserList();
        }
      }
    });
  }
  /**
   * 编辑
   */
  editUser = (user)=> {
    this.setState({userEditorModal:true});
    this.user = user;
    console.log('用户当前',user);
  }
  /**
   * 确认添加或编辑用户
   */
  addOrEditUser = ()=> {
    // this.setState()
    /**
     * 1、安全校验
     * 2、获取用户输入的数据
     * 3、请求接口
     * 4、重新渲染页面
     */
    this.form.validateFields(async (error,values) => {
      if(!error) {
        if(this.user) {
          values._id = this.user._id;
        }
        const res = await reqAddOrUpdateUsers(values);
        // 清除输入框数据
        this.form.resetFields();
        this.setState({userEditorModal: false});
        if(res.status === 0) {
          
          // 如果用户修改的是自己的，则更改本地localStorage中的数据
          // 因为没有相应的接口获取用户自己的信息，所有当用户更改自己的信息时，强制退出登录
          let localuser = JSON.parse(React.$storage_utils.getUser());
          console.log('user',this.user,localuser);
          if(localuser._id === this.user._id) {
            React.$storage_utils.removeUser();
            this.props.history.push('/login');
            message.success('当前用户信息被重置，请重新登陆！');
          } else {
            message.success(`${this.user ? '修改' : '添加'}用户成功`);
            this.getUserList();
          }

        } else {
          message.error(`${this.user ? '修改' : '添加'}用户失败`);
        }
      }
    })

    // console.log('xxx',user);
  }
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getUserList();
  }
  render() {
    const { columns } = this;
    const user = this.user || {};
    const { users,roles,userEditorModal } = this.state;
    const cardTit = (
      <div>
        <Button type="primary" style={{ marginRight: 10 }} onClick={()=> {
          this.user = null; // 去除前面保存的user
          this.setState({userEditorModal:true})
        }}>创建用户</Button>
      </div>
    )
    return (
      <Card type="inner" className="product-index" title={cardTit}>
        <Table
          columns={columns}
          dataSource={users}
          bordered={true}
          pagination={pagations}
          rowKey='_id'
        />
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={userEditorModal}
          onOk={this.addOrEditUser}
          onCancel={()=> {
            this.form.resetFields()
            this.setState({userEditorModal:false})
          }}
        >
          <UserForm 
            setForm={form => this.form = form}
            roles={roles} 
            user={user} 
          />
        </Modal>
      </Card>
    );
  }
}

export default User;