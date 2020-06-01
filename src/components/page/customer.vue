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
          <el-col :span="5"><el-input placeholder="请输入交易所" v-model="queryInfo.bourse" clearable @clear="getUserList" /></el-col>
          <el-col :span="5"><el-input placeholder="请输入用户名" v-model="queryInfo.name" clearable @clear="getUserList"/></el-col>
          <el-col :span="5">
            <el-input placeholder="请输入状态" v-model="queryInfo.status" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"/>
            </el-input>
          </el-col>
          <!--<el-col :span="2"><el-button type="primary" >搜索</el-button></el-col>-->
          <el-col :span="2"><el-button type="primary" @click="addDialogVisible = true">添加客户</el-button></el-col>
        </el-row>

        <!-- 客户列表区域 -->
        <el-table :data="customerList" style="width: 100%" border stripe>
          <el-table-column type="index" label="编号"> </el-table-column>
          <el-table-column prop="bourse" label="交易所" width="180"> </el-table-column>
          <el-table-column prop="name" label="客户名"> </el-table-column>
          <el-table-column prop="apiKey" label="api-key"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch @change="userStatusChanged(scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.status">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="assets" label="资产">
            <template slot-scope="scope">
              {{scope.row.assets || "--"}}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑客户" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除客户" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCustomer(scope.row.id)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.page" :page-sizes="[1, 10, 50, 100]" :page-size="queryInfo.rows" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>

      <!-- 添加客户 对话框 -->
      <el-dialog title="添加客户" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed('addFormRef')">
        <!--内容主体区域-->
       <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="120px">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
         <el-form-item label="交易所" prop="bourse">
           <el-input v-model="addForm.bourse" placeholder="请输入交易所"></el-input>
         </el-form-item>
          <el-form-item label="API_KEY" prop="apiKey">
            <el-input v-model="addForm.apiKey" placeholder="请输入API_KEY"></el-input>
          </el-form-item>
         <el-form-item label="API_KEY密码" prop="passphrase">
           <el-input v-model="addForm.passphrase" placeholder="请输入API_KEY密码"></el-input>
         </el-form-item>
        </el-form>
        <!--内容底部区域-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCustomer">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改客户 对话框-->
      <el-dialog title="修改客户" :visible.sync="modifyDialogVisible" width="40%" @close="editDialogClosed('editFormRef')">
        <!--内容主体区域-->
        <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="120px">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="交易所" prop="bourse">
            <el-input v-model="editForm.bourse" placeholder="请输入交易所"></el-input>
          </el-form-item>
          <el-form-item label="API_KEY" prop="apiKey">
            <el-input v-model="editForm.apiKey" placeholder="请输入API_KEY"></el-input>
          </el-form-item>
          <el-form-item label="API_KEY密码" prop="passphrase">
            <el-input v-model="editForm.passphrase" placeholder="请输入API_KEY密码"></el-input>
          </el-form-item>
        </el-form>
        <!--内容底部区域-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyCustomer">确 定</el-button>
        </div>
      </el-dialog>
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
            total:0,
            //控制添加客户对话框的显示与隐藏
            addDialogVisible:false,
            addForm:{
              name:'',
              apiKey:'',
              bourse:'',
              passphrase:'',
              status: 0
            },
            addFormRules:{
               name:[
                 {required:true, message:'请输入客户名',trigger:'blur'},
                 {max:20,message: "请保持在20字符内",trigger: 'blur'}
               ],
              bourse:[
                {required:true, message:'请输入交易所',trigger:'blur'},
                {max:20,message: "请保持在20字符内",trigger: 'blur'}
              ],
              apiKey:[
                {required:true, message:'请输入API_KEY',trigger:'blur'},
                {max:64,message: "请保持在64字符内",trigger: 'blur'}
              ],
              passphrase:[
                {required:true, message:'请输入API_KEY密码',trigger:'blur'},
                {max:64,message: "请保持在64字符内",trigger: 'blur'}
              ]
            },
            //控制修改客户对话框的显示与隐藏
            modifyDialogVisible:false,
            editForm:{
              name:'',
              apiKey:'',
              bourse:'',
              passphrase:'',
            }
          }
        },
        created() {
          this.getUserList()
        },
        methods:{
          /*客户列表信息*/
          getUserList(){
             let _this = this;
             api.customerList(this.queryInfo).then(function (response) {
                 _this.customerList = response.data.data.records;
                 _this.total = response.data.data.total
             })
          },
          //监听 pageSize 改变的事件
          handleSizeChange(newPage) {
            this.queryInfo.rows = newPage;
            this.getUserList();
          },
          //监听 页码值 改变的事件
          handleCurrentChange(newRows) {
            this.queryInfo.page = newRows;
            this.getUserList();
          },
          //监听 switch 开关状态的改变
          userStatusChanged(userinfo){
            let _this = this;
            api.customerStatus(userinfo).then(function (response) {
              if (response.data.code == 200){
                _this.$message.success(response.data.message);
              }else {
                _this.$message.error(response.data.message,'error');
              }
            });
          },
          //监听 添加客户对话框的关闭事件
          addDialogClosed(addFormRef){
            this.$refs[addFormRef].resetFields();
          },
          /*添加客户*/
          addCustomer(){
            let _this = this;
            _this.$refs.addFormRef.validate(valid => {
               if (!valid) return
               api.customerAdd(_this.addForm).then(function (response) {
                 if (response.data.code == 200){
                   _this.$message.success(response.data.message);
                   _this.addDialogVisible = false;
                   _this.getUserList();
                 }else {
                   _this.$message.error(response.data.message);
                 }
               })
            })
          },
          /*显示编辑对话框*/
          showEditDialog(id){
             let _this = this;
             api.customerDetail(id).then(function (response) {
              console.log(response)
               if (response.data.code == 200){
                 _this.editForm = response.data.data
                 _this.modifyDialogVisible = true
               }
             })

          },
          /*初始化编辑框*/
          editDialogClosed(editFormRef){
            this.$refs[editFormRef].resetFields();
          },
          /*修改客户*/
          modifyCustomer(){
            let _this = this;
            _this.$refs.editFormRef.validate(valid => {
              if (!valid) return
              api.customerModify(_this.editForm).then(function (response) {
                if (response.data.code == 200){
                  _this.$message.success(response.data.message);
                  _this.modifyDialogVisible = false;
                  _this.getUserList();
                }else {
                  _this.$message.error(response.data.message);
                }
              })
            })
          },
          /*删除客户*/
          async removeCustomer(id){
            const confirmResult = await this.$confirm("此操作将永久删除该用户,是否继续?","提示",{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               type:'warning',
            }).catch(err => err)

            if (confirmResult !== 'confirm'){
               return this.$message.info("已取消")
            }
            let _this = this;
            api.customerDelete(id).then(function (response) {
              if (response.data.code == 200){
                _this.$message.success(response.data.message);
                _this.getUserList();
              }else {
                _this.$message.error(response.data.message);
              }
            })

          }
        }
    }
</script>

<style scoped>
  .search_input{
     float: right;
  }
</style>
