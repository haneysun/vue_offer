
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
export default api;
