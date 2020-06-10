/**
 * 发送异步请求的ajax模块
 * 封装axios库
 * 函数的返回值，promise对象
 * 统一处理错误请求异常？
 *  - 在外层包一个自己创建的promise对象，
 */
import axios from 'axios';
import {message} from 'antd';
export default function ajax(url,data={},type='GET') { // type指请求方式，一共有两种，(如果不传递参数)默认是get，
    console.log('params',url,data,type);
    /**
     * 1、执行ajax请求
     * 2、请求成功resolve(response)
     * 3、请求失败reject(err)
     */
    return new Promise((resolve,reject) => {
        let promise;
        if(type === 'GET') {
            promise = axios.get(url,{
                params: data
            })
        } else { 
            promise = axios.post(url,data);
        }
        promise.then(response => {
            resolve(response.data);
        }).catch(err => {
            message.error('请求出错'+err);
        })

    })

}