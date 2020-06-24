import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { reqRoleList, reqAddRole,reqUpdateRole } from './../../api';
import { pagations } from './../../utils/tablePagination';
import AddRole from './AddRole';
import RoleAuth from './RoleAuth'
import moment from 'moment';
class Role extends Component {
  constructor(props) {
    super(props);
    /**
     * Refs时使用React.creactRef()创建的
     * 并通过ref属性附加到react元素
     * 访问Refs:this.xxx.current
     */
    this.menuKeys = React.createRef();

  }
  state = {
    roleList: [], // 用户角色列表
    loading: false,
    isShowAdd: false, // 显示添加弹框
    isShowAuth: false,
    role: {}, // 选中的role
  }
  /**
   * 初始化表头
   */
  initColunms = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(create_time)=> moment(create_time).format('YYYY-MM-DD  hh:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:(auth_time)=> moment(auth_time).format('YYYY-MM-DD  hh:mm:ss')
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ];
  }
  /**
   * 获取角色列表
  */
  getRoleList = async () => {
    this.setState({ loading: true });
    const res = await reqRoleList();
    this.setState({ loading: false });
    if (res.status === 0) {
      const roleList = res.data;
      this.setState({ roleList });
    } else {
      message.error('角色列表获取失败');
    }
  }
  /**
   * 创建角色
  */
  addRole = () => {
    this.form.validateFields(async (errors, values) => {
      console.log('创建角色', values, errors);
      if (!errors) {
        // 隐藏创建角色弹窗
        this.setState({
          isShowAdd: false
        });
        const { roleName } = values;
        this.form.resetFields();
        const res = await reqAddRole(roleName);
        console.log('xxxx', res);
        if (res.status === 0) {
          message.success('角色添加成功！');
          // 更新 roleList 数据列表
          // 但是下面这种写法，react建议
          const role = res.data;

          // const roleList = this.state.roleList;
          // roleList.push(role);
          // this.setState({roleList});

          // react建议的写法
          // 更新roleList状态，基于原本状态数据更新
          this.setState(state => ({
            roleList: [...state.roleList, role]
          }))

        } else {
          message.error('角色添加失败！');
        }
      }
    })
  }
  /**
  * 更新角色权限 
  */
  updateRoleAuth = async () => {
    this.setState({isShowAuth:false})
    // 1、需要获取到用户设置的权限数据
    // 2、调用接口，更新用户权限
    // 3、根据状态提示
    // 4、更新数据
    const menuKeys = this.menuKeys.current.getMenus();
    const role = this.state.role;
    const userinfo = JSON.parse(React.$storage_utils.getUser());
    role.auth_time = Date.now();
    role.auth_name = userinfo.username;
    role.menus = menuKeys;
    // console.log('xxxxxxx',userinfo._id,role._id);
    const res = await reqUpdateRole(role);
    if(res.status === 0) {
      // 当用户更改的是自己的权限
      // 应该要退出系统
      if(role._id === userinfo._id) {
        React.$storage_utils.removeUser();
        this.props.history.push('/login');
        message.success('当前用户角色权限设置成功！');        
      } else {
       
        /**
         * 下面的代码是更新本地的数据
         * 疑问：为什么上面更改的是role,但是roleList数据会发生变化呢？
         * 因为role是roleList的一个引用变量,是roleList其中的一个，当role更改的时候，this.state.roleList的值也会更改
         */
        // 如果当前更新的是自己角色的权限，强制退出
        if(userinfo.role_id === role._id) {
          // userinfo = {};          
          React.$storage_utils.removeUser();
          this.props.history.replace('/login');
          message.success('当前用户角色权限修改，请重新登录！');
        } else {
          message.success('设置角色权限成功！');
          this.setState({
            roleList:[...this.state.roleList]
          })
        }
      }
     
    }
  }
  /**
 * 此时Dom还未渲染
 * 为第一次render准备数据
 */
  componentWillMount() {
    this.initColunms();
  }
  /**
   * 组件第一次渲染完成，此时DOM节点已经生成，一般在这里调用ajax请求，返回数据，重新setState后，组件会重新渲染
  */
  componentDidMount() {
    this.getRoleList();
  }
  render() {
    const { role, roleList, loading, isShowAdd, isShowAuth } = this.state;
    const cardTit = (
      <div>
        <Button type="primary" style={{ marginRight: 10 }} onClick={() => { this.setState({ isShowAdd: true }) }}>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
      </div>
    )
    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: true,
      onSelect: (role) => { // 选择某个radio时的回调
        // console.log('onSelect', role);
        this.setState({ role })
      }
    };
    return (
      <Card type="inner" className="product-index" title={cardTit}>
        <Table
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={roleList}
          loading={loading}
          bordered={true}
          rowKey='_id'
          pagination={pagations}
        />
        <Modal
          title="添加角色"
          okText="确定"
          cancelText="取消"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
          }}
        >
          {/* 接收函数类型的属性 */}
          <AddRole
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRoleAuth}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <RoleAuth role={role} ref={this.menuKeys} />
        </Modal>
      </Card>
    );
  }
}

export default Role;