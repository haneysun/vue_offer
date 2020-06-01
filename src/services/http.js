
import axios from 'axios'
import Cookies from 'js-cookie';
import qs from 'qs'

var data=Cookies.get('userInfo')?Cookies.get('userInfo'):'';
if(data){
  var user=JSON.parse(data);
  var token= user.token;
  var userId= user.userId;
  var tel= user.mobile;
  var phone= tel.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2");
  console.log(user,'user')
  console.log(token,'token')
}
axios.defaults.timeout = 500000;                        //响应时间
axios.create({
  // 设置Content - Type
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
});
var environment_due = "";
var environment_test = "http://localhost:8077/";

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = 'http://localhost:8077/';  //配置接口测试地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.log('错误的传参')
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
  if(!res.data.success){
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
var fetchPost = function( url, params) {
  //url = environment_test + url;
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

////返回一个Promise(发送get请求)
var fetchGet = function(url, params) {
  //url = environment_test + url;
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })

}
export default {
  fetchPost,
  fetchGet,
}
