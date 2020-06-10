import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const { SubMenu } = Menu;

class NavMenu extends Component {
  static propTypes = {
    menuList: PropTypes.array.isRequired,
    collapsed: PropTypes.bool.isRequired
  }
  state = {
    openKeys: [],
    selectedKeys: []
  }
  // 处理 pathname
  getOpenKeys = string => {
    let newStr = '',
      newArr = [],
      arr = string.split('/').map(i => '/' + i)
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i]
      newArr.push(newStr)
    }
    return newArr; // 得到根路由 /graph/bar => /graph
  }

  // 页面刷新的时候可以定位到 menu 显示
  componentDidMount() {
    let { pathname } = this.props.location
    // 处理当前页面路由在，左侧导航栏没有显示，默认高亮显示其父导航按钮
    /**
     * 注意：一级 /pro
     *  二级必须为：/pro/XXXX
     *  三级必须为： /pro/XXXX/yyyy
     */
    if(this.getOpenKeys(pathname).length > 1) { 
      this.setState({
        selectedKeys: this.getOpenKeys(pathname)[1],
        openKeys: this.getOpenKeys(pathname)[0]
      })
    } else {
      this.setState({
        selectedKeys: [pathname],
        openKeys: this.getOpenKeys(pathname)
      })
    }
    
  }
  // 只展开一个 SubMenu
  onOpenChange = openKeys => {
    console.log('openChange');
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      console.log('openChange-if',openKeys)
      return
    }

    // 最新展开的 SubMenu
    const latestOpenKey = openKeys[openKeys.length - 1]

    // 这里与定义的路由规则有关
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }
  /**
   * 根据menu的数据数组生成对应的标签数组
   */
  getMenuNodes = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}><Icon type={item.icon} /><span>{item.title}</span></Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  /**
   * 使用reduce实现递归调用
  */

  getMenuNodes_2 = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      // 向pre中添加 Menu.item
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}><Icon type={item.icon} />{item.title}</Link>
          </Menu.Item>
        ))
      } else {
        // 查找一个与当前路径匹配的子item的父item的key
        const cItem = item.children.find(cItem => cItem.key === path);
        // 如果存在，说明当前item的子列表需要打开
        // this 指当前的组件对象
        if (cItem) {
          this.setState({
            // defaultOpenKeys: [item.key]
          })
        }
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_2(item.children)}
          </SubMenu>
        ))
      }
      return pre;
    }, []); // 初始值是 []空数组
  }



  render() {
    // 得到当前请求的路由路径(因为当前组件是非路由组件，所以需要借住于withRouter)
    const { menuList,collapsed } = this.props;
    let { openKeys, selectedKeys } = this.state;
    const defaultProps = collapsed ? [] : openKeys; // 用于解决menu收缩，二级菜单不跟随收缩的问题
    return (
      <div style={{ width: '100%' }}>
        <Menu
          mode="inline"
          theme='dark'
          selectedKeys={selectedKeys}
          onClick={({ key }) => this.setState({ selectedKeys: [key] })}
          onOpenChange={this.onOpenChange}
          openKeys={defaultProps}
        >
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    );
  }
}

/**
 * withRouter高阶组件：
 *  包装非路由组件，返回一个新的组件
 *  新的组件向非路由组件传递3个属性：history/location/match
 *  
 */

// export default NavMenu;
export default withRouter(NavMenu);