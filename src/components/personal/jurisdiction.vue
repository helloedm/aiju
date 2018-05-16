<template>
  <div id="jurisdiction" class="hrm_module">
    <div class="hrm_module_con" v-show="!editjur">
      <el-table style="width: 100%" :data="tableData" class="table_data">
        <el-table-column label="权限" prop="roleName" align="left" class-name="table_column_left">
          <template scope="scope">
            <span class="role_head" :class="{'admin':scope.row.firstChar=='管'}">{{scope.row.firstChar}}</span>
            <span>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="授权数" width="80" prop="roleCount"></el-table-column>
        <el-table-column label="授权人" prop="userNames"></el-table-column>
        <el-table-column label="操作" width="80">
          <template scope="scope">
              <span v-if="scope.row.roleName=='管理员'">-</span>
              <el-button type="text" @click="editjurFun(scope.row.roleId)" v-else>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑权限 -->
    <div class="hrm_module_con" v-show="editjur">
       <h2 class="edit_back" @click="editjur=false;qryPermitUser()"><i class="iconfont">&#xe67b;</i>返回</h2>
       <div class="edit_name">
        <div class="edit_name_1">{{roleInfo.name}}</div>
        <p v-if="roleInfo.remark"><i class="iconfont">&#xe65e;</i>{{roleInfo.remark}}</p>
        <el-button icon="plus" type="primary" class="add_btn" @click="dialogTableVisibleShow">添加权限人</el-button>
       </div>
       <div class="edit_choose" v-if="selectArr&&selectArr.length!=0">
         <i class="el-icon-information"></i>
         <span>已选择<em>{{selectArr.length}}</em>人</span>
         <el-button type="text" style="margin-left:15px;" @click="cancelPermitUser">取消授权</el-button>
       </div>
       <el-table :data="userList" @selection-change="selectUser" style="margin-top:15px">
         <el-table-column  type="selection" width="50"></el-table-column>
         <el-table-column  label="姓名" prop="name"></el-table-column>
         <el-table-column  label="部门" prop="deptName"></el-table-column>
         <el-table-column  label="职位" prop="positionName"></el-table-column>
       </el-table>
       <el-pagination small layout="prev, pager, next" :total="page.totalCount" style="margin-top:20px" @current-change="changePage"></el-pagination>
    </div>

    <!-- 添加权限人弹框 -->
    <el-dialog title="编辑权限人" :visible.sync="dialogTableVisible" class="dialog_w540">
      <el-transfer v-model="userIds" :data="userData2" :props="{key: 'id',label: 'name'}" :titles="['未授权','已授权']" filterable></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPermitUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'jurisdiction',
  data(){
    return{
      tableData:[],
      editjur:false,
      userList:[],
      page:{
        pageNum:1,
        pageSize:10,
        totalCount:0
      },
      roleInfo:{
        id:null,
        menus:'',
        name:'',
        numLimit:'',
        remark:''
      },
      selectArr:[],
      dialogTableVisible:false,
      userIds:[],
      userData:[],
      userData2:[],
    }
  },
  mounted(){
    this.qryPermitUser();
    this.getUsers();
  },
  methods:{
    qryPermitUser(){
      let self=this;
      let method="permissionManage/qryPermitUser",
          param=JSON.stringify({}),
          successd=function(res){
            console.log(res);
            self.tableData=self.$tableNull(res.data.data);
          };
      self.$http(method,param,successd);
    },
    selectUser(select,row){
      this.selectArr=select;
    },
    editjurFun(roleId){
      let self=this;
      if(!roleId){
        roleId=self.roleInfo.id;
      }
      self.editjur=true;
      let method="permissionManage/qryUserListByRoleId",
          param=JSON.stringify({
            pageNum:self.page.pageNum,
            pageSize:self.page.pageSize,
            roleId:roleId
          }),
          successd=function(res){
            self.userList=res.data.data.result;
            self.page=res.data.data.page;
            self.roleInfo=res.data.data.roleInfo;
            self.unused=res.data.data.unused;
            self.userData2= self.userData.filter(key => {
              let count=0;
              res.data.data.userIds.forEach(item=>{
                if(item==key.id){
                  count++
                }
              })
              if(count==0){
                return true
              }
            });
          };
      self.$http(method,param,successd);
    },
    cancelPermitUser(){
      let self=this;
      let userIds=[];
      self.selectArr.forEach(function(item){
        userIds.push(item.id)
      })
      let method="permissionManage/cancelPermitUser",
          param=JSON.stringify({
            roleId:self.roleInfo.id,
            userIds:userIds.join()
          }),
          successd=function(res){
            self.$message({
              message:'取消授权成功!',
              type:'success'
            });
            self.selectArr=[];
            self.editjurFun(self.roleInfo.id);
          };
      self.$confirm('确定取消选中员工的权限吗?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(()=>{
        self.$http(method,param,successd);
      })
    },
    getUsers(){
      let self=this;
      let method="user/getUsers",
          param=JSON.stringify({"pageNum":1,"pageSize":10000,"character":"","userDraw":"","sex":"-1","searchDeptIds":"","positionId":""}),
          successd=function(res){
            self.userData=[];
            res.data.data.users.forEach((item,index)=>{
              if(item.isAdmin!=1){
                self.userData.push(item);
              }
            })
          };
      self.$http(method,param,successd);
    },
    //新增角色
    addPermitUser(){
      let self=this;
      let method="permissionManage/addPermitUser",
          param=JSON.stringify({
            roleId:self.roleInfo.id,
            userIds:self.userIds.join()
          }),
          successd=function(res){
            self.$message({
              message:"新增成功",
              type:'success'
            })
            self.dialogTableVisible=false;
            self.editjurFun();
          };
      self.$http(method,param,successd);
    },
    //新增角色按钮
    dialogTableVisibleShow(){
      if(this.unused==0){
        this.$confirm('您的账号数已经用完，请先购买或版本升级','提示',{
          confirmButtonText:'立即购买',
          cancelButtonText:'取消',
          type: 'warning'
        }).then(()=>{
          location.href="https://aijuhr.com/price/";
          }).catch(()=>{
            
            })
      }else{
        this.userIds=[];
        this.dialogTableVisible=true;
      }
    },
    changePage(val){
      this.page.pageNum=val;
      this.editjurFun();
    }
  },
}
</script>

<style scoped>
.role_head{width: 32px;height: 32px;background-color: #5aa2e7;color: #fff;border-radius: 50%;display: inline-block;line-height: 32px;text-align: center;margin-right: 10px;}
.role_head.admin{background-color: #f2a654;}
.edit_back{color: #475669;line-height: 22px;font-weight: 400;cursor: pointer;}
.edit_back .iconfont{color: #5aa2e7;font-weight: 600;font-size: 14px;margin-right: 5px;}
.edit_name{position: relative;min-height: 36px;margin-top:15px}
.edit_name .edit_name_1{display: inline-block;line-height: 36px;font-size: 16px;color: #1F2D3D;font-weight: 600;}
.edit_name p{display: inline-block;color: #98A9BF;margin-left: 15px;margin-right: 120px;}
.edit_name p i{font-size: 14px;margin-right: 5px;}
.edit_name .add_btn{position:absolute;right:0;top:0px;}
.edit_choose{background-color: rgba(86,166,241,0.16);margin-top: 15px;border-radius: 4px;}
.edit_choose i{color: #5aa2e7;margin-left: 15px;margin-right: 10px;}
.edit_choose em{color: #5aa2e7;margin: 0 5px;}
</style>
<style>
#jurisdiction .table_data .el-table__row{height:56px;}
</style>




