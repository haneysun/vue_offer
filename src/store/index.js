import Cookies from 'js-cookie'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state :{
      userInfo:{},
      isLogin:0
  },
  mutations : {
      saveInfo(state, data) {
          state.userInfo = data;
          state.isLogin = data.isLogin;
          if (data.auto){
             Cookies.set('isLogin',data.isLogin,{expires : 1/3});
             Cookies.set('userInfo',JSON.stringify(data),{expires: 1/3})
          }else {
             Cookies.set('isLogin',data.isLogin);
             Cookies.set('userInfo',JSON.stringify(data))
          }
      }
  }
})
export default store
