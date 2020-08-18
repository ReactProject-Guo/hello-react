import intl from 'react-intl-universal';
import storageUtil from './../utils/storageUtils';
let local_lang = storageUtil.getLang('local_lang') || 'zh-cn';

const lang = require('./locales/'+local_lang+'.json');
const menuList = [
  {
    title:  lang.menu_index,
    key:'/home',
    icon:'home',
    isPublic:true, // 公开的，不管什么用户都能看到该Itme
  },
  {
    title: lang.menu_product,
    key:'/pro',
    icon:'appstore',
    children:[{
      title: lang.menu_product_category,
      key:'/pro/category',
      icon:'unordered-list',
    },{
      title: lang.menu_product_pro,
      key:'/pro/product',
      icon:'appstore',
    }]
  },{
    title: lang.menu_role,
    key:'/role',
    icon:'user'
  },{
    title: lang.menu_user,
    key:'/user',
    icon:'user'
  },{
    title: lang.menu_graph,
    key:'/graph',
    icon:'line-chart',
    children:[{
      title: lang.menu_graph_bar,
      key:'/graph/bar',
      icon:'bar-chart',
    },{
      title: lang.menu_graph_line,
      key:'/graph/line',
      icon:'stock',
    },{
      title: lang.menu_graph_pie,
      key:'/graph/pie',
      icon:'pie-chart',
    }]
  },{
    title: lang.menu_excel,
    key:'/excel',
    icon:'file-excel',
    children:[{
      title: lang.menu_excel_in_out,
      key:'/excel/inOrOut',
      icon:'file-excel',
    }]
  },{
    title: lang.menu_com,
    key:'/com',
    icon:'code',
    children:[{
      title: lang.menu_com_security,
      key:'/com/security',
      icon:'security-scan',
    },{
      title: lang.menu_com_slider,
      key:'/com/slider',
      icon:'sliders',
    },{
      title: lang.menu_com_upload,
      key:'/com/user-intl',
      icon:'cloud-upload',
    },{
      title: lang.menu_com_magnifier,
      key:'/com/magnifier',
      icon:'cloud-upload',
    }]
  },{
    title: lang.menu_code,
    key:'/code',
    icon:'line-chart',
  },{
    title: lang.menu_guide,
    key:'/guide',
    icon:'notification',
  }
];
export default menuList;