<template>
    <div id="come" class="hrm_module">
        <div class="hrm_module_con">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/manage/pool/talentpool' }">人才库</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/manage/pool/talentpool' }">待入职</el-breadcrumb-item>
                <el-breadcrumb-item>确认到岗</el-breadcrumb-item>
            </el-breadcrumb>
            <el-steps :space="400" :active="active" :center="true" class="margin_t_20">
                <el-step title="信息填写" description=""></el-step>
                <el-step title="薪酬信息" description=""></el-step>
                <el-step title="预览offer" description=""></el-step>
            </el-steps>
            <div v-if="active==1">
                <h1>个人信息</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <h1>联系方式</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="offer接受邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="入职联系人" prop="contactName">
                        <el-input v-model="ruleForm.contactName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" prop="contactPhone">
                        <el-input v-model="ruleForm.contactPhone"></el-input>
                    </el-form-item>
                </el-form>
                <h1>工作信息</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="到岗日期" prop="joinDate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.joinDate" style="width: 217px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="员工类型" prop="userDraw">
                        <el-select v-model="ruleForm.userDraw" placeholder="请选择员工类型">
                            <el-option label="正式" value="1"></el-option>
                            <el-option label="试用" value="2"></el-option>
                            <el-option label="兼职" value="3"></el-option>
                            <el-option label="实习" value="4"></el-option>
                            <el-option label="劳务派遣" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="试用期" prop="probation">
                        <el-select v-model="ruleForm.probation" placeholder="请选择试用期">
                            <el-option label="一个月" value="1"></el-option>
                            <el-option label="二个月" value="2"></el-option>
                            <el-option label="三个月" value="3"></el-option>
                            <el-option label="四个月" value="4"></el-option>
                            <el-option label="五个月" value="5"></el-option>
                            <el-option label="六个月" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="deptId">
                        <el-select v-model="ruleForm.deptId" placeholder="请选择部门">
                            <el-option :label="dept.name" :value="dept.id" v-for="dept in depts"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位" prop="positionId">
                        <el-select v-model="ruleForm.positionId" placeholder="请选择部门">
                            <el-option :label="posiotion.name" :value="posiotion.id" v-for="posiotion in positions"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报对象" prop="reportUserId">
                        <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2'></tree-component>
                    </el-form-item>
                </el-form>
                <h1>入职准备</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="入职材料提醒">
                        <el-button @click="dialogVisible=true">预览</el-button>
                    </el-form-item>
                </el-form>
                <div class="text_algin_center margin_t_20">
                    <el-button type="primary" @click="getnext(2)">下一步</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import treeComponent from '../tree.vue';
  export default {
    name:'come',
    data(){
        var validatePass=(rule,value,callback)=>{
            var reg = /^1[3578][0-9]{9}$/;
            if (!reg.test(value)) {
                callback(new Error("请输入正确的手机号"))
            } else {
                callback();
            }
        };
        return{
            active:1,
            ruleForm:{
                name:'',
                phone:'',
                email:'',
                contactName:'',
                contactPhone:'',
                joinDate:'',
                userDraw:'',
                probation:'',
                deptId:'',
                positionId:'',
                reportUserId:'',
                basicSalary:'',
                jobSalary:'',
                basicSalaryPre:'',
                jobSalaryPre:'',
                salaryRemark:'',
                autoSalary:'80',
            },
            rules:{
                name:[{required:true,message:'请输入姓名',trigger:'blur'}],
                phone:[{required:true,message:'请输入手机号',trigger:'blur'},{ validator: validatePass, trigger: 'blur' }],
                email:[{required:true,message:'请输入邮箱',trigger:'blur'}],
                contactName:[{required:true,message:'请输入入职联系人',trigger:'blur'}],
                contactPhone:[{required:true,message:'请输入联系人电话',trigger:'blur'}],
                joinDate:[{type:'date',required:true,message:'请选择到岗日期',trigger:'change'}],
                userDraw:[{required:true,message:'请选择员工类型',trigger:'change'}],
                probation:[{required:true,message:'请选择试用期',trigger:'change'}],
                deptId:[{type:'number',required:true,message:'请选择到岗日期',trigger:'change'}],
                positionId:[{type:'number',required:true,message:'请选择到岗日期',trigger:'change'}],
            },
            treeBtnName:'选择汇报对象',
            depts:[],
            positions:[],
        }
    },
    components:{
        treeComponent
    },
    mounted(){
        this.getDeptPost();
    },
    methods:{
        getDeptPost(){
            var self = this;
            var method = "department/getDepartmentList",
                param=JSON.stringify({pageNum:1,pageSize:100}),
                successd1=function(res){
                    self.depts = res.data.data.result;
                };
            self.$http(method,param,successd1);
            var method2="positionManage/getPositionInfoListByParams",
                successd2=function(res){
                    self.positions = res.data.data.result;
                };
            self.$http(method2,param,successd2);
        },
    }
  } 
</script>

<style scoped>
    #come h1{font-size: 16px;line-height: 50px;border-bottom: 1px solid #e9ecef;padding-left: 20px;margin: 20px 0;}
    #come .el-form-item{width: 50%;float: left;}
    #come .float_none .el-form-item{float: none;}
    #come .el-form{width: 80%;margin: 0 auto;}
    #come .list_style_disc{list-style-type:disc; padding-left: 20px;}
    #come .list_style_disc li{list-style-type:disc;}
    #come .font_weight_500{font-weight: 500;}
    #come .activeThree .el-form-item{width: 100%;float: none}
    #come .activeThree .el-form{width: 100%;}
    #come .ql-container.ql-snow{width:100%;min-height: 500px;}
    #come .employset_main{border:1px solid #ccc;border-bottom: none;padding: 20px;}
    #come .employset_main_btn{border-color: #5aa2e7;color: #5aa2e7;}
</style>