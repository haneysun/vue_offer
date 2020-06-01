
import http from "./http";

var api = {};

//登录
api.userLogin = function (params) {
  return http.fetchPost('/login/login', params);
};

//获取左侧权限树
api.menuList = function (params) {
  return http.fetchPost('/login/getUser', params);
};


//获取客户列表
api.customerList = function (params) {
  return http.fetchGet('/customer/list', params);
};
//修改客户状态
api.customerStatus = function (params) {
  return http.fetchPost('/customer/modifyStatus', params);
};
//添加客户
api.customerAdd = function (params) {
  return http.fetchPost('/customer/add', params);
};
//查询客户详情
api.customerDetail = function (id) {
  return http.fetchGet('/customer/'+id+'/detail', null);
};
//修改客户信息
api.customerModify = function (params) {
  return http.fetchPost('/customer/modify', params);
};
//删除客户
api.customerDelete = function (id) {
  return http.fetchPost('/customer/'+id+'/delete', null);
};
export default api;
