/**
 * callback() 验证通过
 * callback("xxx") 验证失败，并指定提示的文本
*/

export const validatePsw = (rule, value, callback) => {
  if (!value) {
    callback('请输入密码');
  } else if(!/^[a-zA-Z0-9_]{4,6}$/.test(value)) {
    callback('密码必须由数字、字母、下划线组成,且长度为 4~6 位！');
  } else {
    callback();
  }
}

export const validateTel = (rule, value, callback) =>{
  if (!value) {
    callback('请输入手机号');
  } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
    callback('手机号格式不正确');
  } else { // 验证通过
    callback();
  }
}

export const validateEmail = (rule,value,callback)=> {
  if(!value) {
    callback('请输入邮箱');
  } else if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
    callback('邮箱格式不正确');
  } else {
    callback();
  }
}