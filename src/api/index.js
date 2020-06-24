/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax';
// const baseApi = 'http://rap2.taobao.org:38080/app/mock/253236';
const baseApi = 'http://39.100.225.255:5000';
const weatherApi = `http://wthrcdn.etouch.cn/weather_mini?city=北京`; 
// 登录
/*
    export function reqLogin(username,password) {
        return ajax('/login',{username,password},'POST')
    }
 */

export const reqLogin = ({username,password}) => ajax(`${baseApi}/login`,{username,password},'POST');

// 添加用户
export const reqAddUser = user=> ajax('/manage/user/add',user,'POST');

//获取天气数据

export const reqWeather = () => ajax(weatherApi);

// 获取品类列表
export const reqCategorys = parentId => ajax(`${baseApi}/manage/category/list`,{parentId});
// 添加分类
export const reqAddCategory = ({categoryName, parentId}) => ajax(`${baseApi}/manage/category/add`,{parentId,categoryName},'POST');
// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(`${baseApi}/manage/category/update`,{categoryId,categoryName},'POST');

// 获取商品分页列表
export const reqProducts = ({pageNum, pageSize}) => ajax(`${baseApi}/manage/product/list`, {pageNum, pageSize});

/**
 * 搜索获取商品分页列表
 * 如何让变量的值作为属性名
 *  - 给变量添加[]
*/
export const reqSearchProducts = ({pageNum, pageSize,searchName,searchType}) => ajax(`${baseApi}/manage/product/search`, {pageNum, pageSize,[searchType]:searchName});

/**
 * 根据分类ID获取分类名称
 */
export const reqCategory = (categoryId) => ajax(`${baseApi}/manage/category/info`,{categoryId});

/*
 * 更新商品的状态(上架/下架)
 *  status: 1 / 2 (1:在售  2:下架) 
 */ 
export const reqUpdateStatus = (productId, status) => ajax(`${baseApi}/manage/product/updateStatus`, {productId, status}, 'POST');

/**
 * 删除图片
 */

export const reqDeleteImg = (name) => ajax(`${baseApi}/manage/img/delete`,{name},'POST');
// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(`${baseApi}/manage/product/${product._id?'update':'add'}`, product, 'POST');
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST');

// 获取角色列表
export const reqRoleList = () => ajax(`${baseApi}/manage/role/list`);

// 添加角色
export const reqAddRole = (roleName)=> ajax(`${baseApi}/manage/role/add`,{roleName},'POST');

// 更新角色
export const reqUpdateRole = (role)=> ajax(`${baseApi}/manage/role/update`,role,'POST');

// 获取用户列表
export const reqUsers = () => ajax(`${baseApi}/manage/user/list`);
// 删除指定的用户
export const reqDeleteUsers = (userId) => ajax(`${baseApi}/manage/user/delete`,{userId},'POST');

// 添加/更新用户
export const reqAddOrUpdateUsers = (user) => ajax(`${baseApi}/manage/user/${user._id?'update':'add'}`,user,'POST');





