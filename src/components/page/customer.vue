<template>
    <div>
      <!--面包屑导航区域-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--卡片视图区域-->
      <el-card class="box-card">

        <!-- 搜索与添加区域 -->
        <el-row :gutter="20">
          <!--<el-col :span="1"><span class="search_input">交易所</span></el-col>-->
          <el-col :span="5"><el-input placeholder="请输入交易所" prefix-icon="el-icon-search" v-model="input2" /></el-col>
          <el-col :span="5"><el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="input2" /></el-col>
          <el-col :span="5"><el-input placeholder="请输入状态" prefix-icon="el-icon-search" v-model="input2" /></el-col>
          <el-col :span="2"><el-button type="primary">搜索</el-button></el-col>
          <el-col :span="2"><el-button type="primary">添加客户</el-button></el-col>
        </el-row>

        <!-- 客户列表区域 -->
        <el-table :data="customerList" style="width: 100%" border stripe>
          <el-table-column type="index" label="编号"> </el-table-column>
          <el-table-column prop="bourse" label="交易所" width="180"> </el-table-column>
          <el-table-column prop="name" label="客户名"> </el-table-column>
          <el-table-column prop="apiKey" label="api-key"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.status">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="assets" label="资产"> </el-table-column>
          <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
                <el-button type="primary" icon="el-icon-view" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑客户" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除客户" placement="top">
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.page" :page-sizes="[1, 10, 50, 100]" :page-size="queryInfo.rows" layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            queryInfo:{
              bourse:'',
              name:'',
              status:'',
              page:1,
              rows:10
            },
            customerList:[],
            total:0
          }
        },
        created() {
          this.getUserList()
        },
        methods:{
          getUserList(){
             let _this = this;
             api.customerList(this.queryInfo).then(function (response) {
                 _this.customerList = response.data.data.records;
                 _this.total = response.data.data.total
             })
          },
          //监听 pageSize 改变的事件
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          //监听 页码值 改变的事件
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          }
        }
    }
</script>

<style scoped>
  .search_input{
     float: right;
  }
</style>
