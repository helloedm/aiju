<template>
    <div id='hrmjur' class="hrm_module">
        <div class="hrm_module_btn">
            <el-button @click="" @click="jurSet()" type="primary">设置员工权限</el-button>
        </div>
        <div class="hrm_module_con">
            <el-table border :data="accreditList" highlight-current-row @current-change="jurClickTable"   align="center" class="common_table">
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="deptName" label="部门"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="手机号码"></el-table-column>
                <el-table-column prop="isActiveName" label="用户状态">
                    <!--<template scope="scope">
                         <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==0">已激活</el-tag>
                         <el-tag type="gray" class="common_table_tag" v-show="scope.row.state==1">未激活</el-tag>
                    </template>-->
                </el-table-column>
                <el-table-column prop="userRoles" label="已分配角色">
                    <!--<template scope="scope">
                         <el-tag type="gray" class="common_table_tag" v-for="tag in scope.row.allocation">{{tag}}</el-tag>
                    </template>-->
                </el-table-column>
            </el-table>
            <div class="hrm_module_page">
                <el-pagination layout="prev, pager, next" :total="page.totalCount" @current-change="getTableData"></el-pagination>
            </div>
        </div>
        <el-dialog title="设置员工权限" :visible.sync="jurPop" size="tiny">
            <!--<el-checkbox :label="role.role_name" v-for="role in companyRoles" :disabled="role.role_name == '管理员'||role.role_name == '普通用户'" class="roleItem" :checked="role.checked"></el-checkbox>-->
            <label class="el-checkbox roleItem" v-for="role in companyRoles" @mousedown="changeChecked(role)">
                <span class="el-checkbox__input" :class="{'is-checked': role.checked,'is-disabled':role.role_name == '管理员'||role.role_name == '普通用户'}">
                    <span class="el-checkbox__inner"></span>
                    <input type="checkbox" class="el-checkbox__original" :value="role.id">
                </span>
                <span class="el-checkbox__label">{{role.role_name}}</span>
            </label>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jurPop = false">取 消</el-button>
                <el-button type="primary" @click="setNewRoles">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Util from '../../script/util.js'
// import CommonData from '../../script/data.js'


export default {
    name: 'jur',
    data() {
        return{
            accreditList:[],
            accreditTotalPage: 1,
            jurPop: false,
            accreditTableData: '',
            jurPopCheckData:[],
            page:{
                pageNum:1,
                pageSize:10,
                totalCount:0,
            },
            companyRoles:[],
            uploadUser:{},
        }
    },
    mounted: function (){
        this.getTableData();
    }, 
    methods: {
        jurClickTable: function (row){
            this.accreditTableData = row.userRoles;
            this.uploadUser = row;
            if(!this.accreditTableData){
                return;
            }
            this.jurPopCheckData = this.accreditTableData.split(",");
            for(var k =0;k<this.companyRoles.length;k++){
                this.companyRoles[k].checked = false;
                for(var i=0;i<this.jurPopCheckData.length;i++){
                    if(this.companyRoles[k].role_name == this.jurPopCheckData[i]){
                        this.companyRoles[k].checked = true;
                        console.log(this.companyRoles[k]);
                    }
                }
            };
        },
        jurSet: function (){
            console.log(this.uploadUser);
            if(!this.uploadUser.id){
                this.$message({
                    message: '请点击表格选择人员',
                    type: 'warning'
                });
            }else{
                if(this.accreditTableData == "管理员"){
                    this.$message({
                        message: '管理员无法分配角色',
                        type: 'warning'
                    });
                    return 
                }
                this.jurPop = true;
            }
            
        },
        getTableData(pageNum){
            var _this = this;
            if(pageNum){
                _this.page.pageNum = pageNum;
            }
            var method = "permissionManage/getEmpSetPermitList";
            var param = JSON.stringify({
                pageNum:_this.page.pageNum,
                pageSize:_this.page.pageSize,
            });
            var successd = function(res){
                console.log(res);
                _this.accreditList = res.data.data.empSetPermitList;
                _this.page = res.data.data.page;
                // _this.companyRoles = res.data.data.companyRoles;
                var newArr =res.data.data.companyRoles;;
                newArr.forEach(function(item){
                    item.checked = false;
                })
                _this.companyRoles = newArr;
            };
            _this.$http(method,param,successd);
        },
        checkedRole(role_name){
            if(this.jurPopCheckData != []){
                for(var i=0;i<this.jurPopCheckData.length;i++){
                    if(role_name == this.jurPopCheckData[i]){
                        return true;
                    }
                }
            }
        },
        changeChecked(role){
            if(role.role_name == '管理员'||role.role_name == '普通用户'){
                return;
            }
            role.checked = !role.checked;
        },
        setNewRoles(){
            var _this = this;
            var arr = _this.companyRoles;
            var uploadUser = _this.uploadUser;
            var roleIds = [];
            arr.forEach(function(item){
                if(item.checked){
                    roleIds.push(item.id);
                }
            });
            var method = "permissionManage/setEmpPermit";
            var param = JSON.stringify({
                empId:uploadUser.id,
                roleIds:roleIds.join()
            });
            var successd = function(res) {
                _this.jurPop = false
                _this.getTableData();
            }
            _this.$http(method,param,successd);
        }
    }
}
</script>

<style scoped>
.roleItem{min-width: 150px;margin-left: 15px;}
</style>