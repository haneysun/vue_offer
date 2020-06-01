<template>
  <!--<div>HOME 组件</div>-->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="" alt="">
        <span>电商后台管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button></el-header>
    <el-container>
      <!-- 侧边栏菜单区域开始 -->
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#333744" text-color="#ffffff"  :collapse="isCollapse" :unique-opened="true" :router="true">
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i :class="subItem.icon"></i>
                <span slot="title">{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边栏菜单区域结束 -->
      <el-container>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: true,
        menuList:[],
        param: {
            id : -1
        }
      };
    },
    created() {
      this.getMenuList()
    },
    methods:{
        logout(){
            //1 清空sessionStorage缓存
            window.sessionStorage.clear()
            //2 跳转回登录页
          this.$router.push("/login")
        },
        handleOpen(key, keyPath) {
          /*console.log(key, keyPath);*/
        },
        handleClose(key, keyPath) {
          /*console.log(key, keyPath);*/
        },
        getMenuList(){
            this.param.id = JSON.parse(window.sessionStorage.getItem('userInfo')).id;
            api.menuList(this.param).then(res => {
                this.menuList = res.data.data;
                console.log(res.data.data)
            })
        }

      }
}
</script>

<style scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      align-items: center;
      color: #ffffff;
      font-size: 20px;
      > div {
        display: flex;
        align-items: center;
        span {
          margin-left: 15px;
        }
      }
  }
  .el-aside{
     background-color: #333744;
    .el-menu {
       border-right: none;
    }
  }
  .el-main{
     background-color: #eaedf1;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
