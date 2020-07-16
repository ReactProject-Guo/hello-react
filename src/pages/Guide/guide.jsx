const steps = [{
  element: '#navAside',
  popover: {
    title: '菜单导航',
    description: '点击菜单可切换菜单内容',
    position: 'right',
  },
  padding: 0
},{
  element: '#collapseBtn',
  stageBackground:'#fff',
  popover: {
    title: '折叠按钮',
    description: '点击收缩和展开菜单导航',
    position: 'bottom',
  },
},{
  element: '#currentTime',
  popover: {
    title: '时间',
    description: '当前时间',
    position: 'left',
  },
},{
  element: '#usercenter',
  popover: {
    title: '个人中心',
    description: '点击图标显示操作',
    position: 'left',
  },
}] 
// 

export default steps;