<template>
    <div id='jur'>
        <!--<div class="jur_common_btn">
            <el-button @click="" @click="jurPop=true" type="primary">添加角色</el-button>
        </div>
        <div class="jur_common_con">
            <el-table :data="roleListData" highlight-current-row   align="center" class="common_table">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column label="权限">
                    <template scope="scope">
                        <el-tag type="gray" v-for="tag in scope.row.authority" class="common_table_tag">{{tag}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="编辑">
                    <template scope="scope">
                        <el-button @click="roleEdit(scope.$index)" type="text">编辑</el-button>
                        <el-button @click="roleDel()" type="text">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="jur_common_page">
                <el-pagination layout="prev, pager, next" :total="roleTotalPage" @current-change=""></el-pagination>
            </div>
        </div>
        <el-dialog title="设置员工权限" :visible.sync="jurPop" size="tiny">
            <div class="common_item clearfix">
                <span class="common_item_label">角色名称</span>
                <div class="common_item_com">
                    <el-input placeholder="请输入角色名称" v-model="roleEditData.roleName"></el-input>
                </div>
            </div>
            <div class="common_item clearfix">
                <span class="common_item_label">角色权限</span>
                <div class="common_item_com">
                    <el-checkbox-group v-model="roleEditCheckData" class='common_item_checkbox'>
                        <el-checkbox label="所有权限">全选</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="roleEditCheckData" class='common_item_checkbox'>
                        <el-checkbox label="OA权限"></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="roleEditCheckData" class='common_item_checkbox'>
                        <el-checkbox label="薪资管理"></el-checkbox>
                        <el-checkbox label="发放工资单" disabled></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="roleEditCheckData" class='common_item_checkbox'>
                        <el-checkbox label="组织管理"></el-checkbox>
                        <el-checkbox label="部门管理" disabled></el-checkbox>
                        <el-checkbox label="职务管理" disabled></el-checkbox>
                        <el-checkbox label="员工管理" disabled></el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="roleEditCheckData" class='common_item_checkbox'>
                        <el-checkbox label="权限管理"></el-checkbox>
                        <el-checkbox label="角色管理" disabled></el-checkbox>
                        <el-checkbox label="员工授权" disabled></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jurPop = false">取消</el-button>
                <el-button type="primary" @click="jurPop = false">确定</el-button>
            </span>
        </el-dialog>-->
        <iframe id="role_permission" :src="ifUrl" width="100%" height="1000px" style="overflow-y: auto;"></iframe>
    </div>
</template>

<script>
import Util from '../../script/util.js'
// import CommonData from '../../script/data.js'

export default {
    name: 'jur',
    data() {
        return{
            roleListData: [],
            roleEditData: {},
            roleEditCheckData: [],
            roleTotalPage: 1,
            jurPop: false,
            ifUrl:''
        }
    },
    mounted: function (){
        this.jurSetUrl();
    }, 
    methods: {
        roleDel: function (){
            this.$message({
                message: '删除成功',
                type: 'success'
            });
        },
        roleEdit: function (index){
            this.roleEditData = this.roleListData[index];
            this.roleEditCheckData = this.roleListData[index].authority
            this.jurPop = true;
        },
        jurSetUrl(){
			if (self == top) {
				this.ifUrl = "https://oa.ecbao.cn/dsb/permission_manage/role_manage?showHrm=1&closeSystem=1&isHrm=1";
			}else {
				this.ifUrl ="https://oa.ecbao.cn/dsb/permission_manage/role_manage?showHrm=1";
			}
        }
    }
}
</script>

<style scoped>
iframe{border: none;}

</style>