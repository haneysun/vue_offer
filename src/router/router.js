import Vue from 'vue';
import Router from 'vue-router'
import Login from '../components/login.vue'

Vue.use(Router)

const router = new Router({
	routes:[
		{
		  path : '/',
      redirect:'/login'
    },
		{
		  path : '/login',
      component:Login
    },
    {
      path: '/home',
      component: resolve => require(['../components/page/home.vue'], resolve),
      redirect:'/welcome',
      children:
        [{
          path: '/welcome',
          component: resolve => require(['../components/welcome.vue'], resolve)
        },
        {
          path: '/customer',
          component: resolve => require(['../components/page/customer.vue'], resolve)
        }]
    }
	]
})

//路由导航守卫,控制页面访问权限
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数,表示放行
  // next() 放行  next('/login')表示强制跳转
  if (to.path === '/login') {
      return next()
  }else {
      const token = window.sessionStorage.getItem('userInfo')
    if (!token){
      return next('/login')
    }else {
      next()
    }
  }

})


export default router
