import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';
import menuList from './../../config/menuConfig'
import PropType from 'prop-types';

const Item = Form.Item;
const { TreeNode } = Tree;

class RoleAuth extends Component {
  static propTypes = {
    role: PropType.object
  }
  constructor(props) {
    super(props);
    const {menus} = this.props.role
    // console.log('menu',menus);
    this.state = {
      checkedKeys: menus // 选中复选框的树节点
    }
  }
  // 点击复选框触发
  onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  getTreeNodes = menuList => {
    return menuList.reduce((pre,item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key} >
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre;
    },[]); // 如果要是没有数据默认返回一个空数组[]
  }
  
  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList);
  }  

  /**
   * 只要父级组件重新渲染时，这个生命周期就会调用，不管props有没有变化
   * 当props发生变化时调用
   * 注意：当页面第一次渲染的时候不会调用该生命周期
   */
  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus;
    this.setState({
      checkedKeys:menus
    })
  }


  /**
   * 将选中权限数据，传递给父组件
   */
  getMenus = () => this.state.checkedKeys;
    
  render() {
    const {name} = this.props.role;
    return (
      <div>
        <Item label="角色名称" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Input placeholder="请输入角色名称" disabled value={name} />
        </Item>
        <Item>
          <Tree
            checkable
            defaultExpandAll={true}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
          >
            <TreeNode title="平台权限" key="all">
              {this.treeNodes}
            </TreeNode>
          </Tree>
        </Item>
      </div>
    );
  }
}

export default RoleAuth;