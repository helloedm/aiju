<template>
    <div id="confirmjoin" class="hrm_module">
        <div class="hrm_module_con">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/ATS/pool/talentpool' }">人才库</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/ATS/pool/talentpool' }">待入职</el-breadcrumb-item>
                <el-breadcrumb-item>确认到岗</el-breadcrumb-item>
            </el-breadcrumb>
            <el-steps :space="400" :active="active" :center="true" style="margin-top:20px;">
                <el-step title="确认信息" description=""></el-step>
                <el-step title="入职清单" description=""></el-step>
                <el-step title="完成" description=""></el-step>
            </el-steps>
            <div v-show="active==1">
                <h1>个人信息</h1>
                <el-form :model="form" :rules="rules" ref="form1" label-width="150px" class="clearfix">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-radio-group v-model="form.identificationType">
                            <el-radio label="1">身份证</el-radio>
                            <el-radio label="2">护照</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.nick"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input v-model="form.identificationNo"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input v-model="form.birthday"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="户籍类型">
                        <el-select v-model="form.registryType" placeholder="请选择户籍类型">
                            <el-option label="本地城镇" value="1"></el-option>
                            <el-option label="本地农村" value="2"></el-option>
                            <el-option label="外地城镇(省内)" value="3"></el-option>
                            <el-option label="外地农村(省内)" value="4"></el-option>
                            <el-option label="外地城镇(省外)" value="5"></el-option>
                            <el-option label="外地农村(省外)" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="婚姻情况">
                        <el-radio-group v-model="form.marrayStatus">
                            <el-radio :label="1">未婚</el-radio>
                            <el-radio :label="2">已婚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="户籍地址">
                        <el-input v-model="form.registryAddress"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="生育情况">
                        <el-radio-group v-model="form.bearStatus">
                            <el-radio :label="1">未育</el-radio>
                            <el-radio :label="2">已育</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <h1>教育水平</h1>
                <el-form :model="form" :rules="rules" ref="form2" label-width="150px" class="clearfix">
                    <el-form-item label="最高学历">
                        <el-select v-model="form.educationLev" placeholder="请选择最高学历">
                            <el-option label="博士后" value="1"></el-option>
                            <el-option label="博士" value="2"></el-option>
                            <el-option label="硕士" value="3"></el-option>
                            <el-option label="本科" value="4"></el-option>
                            <el-option label="专科" value="5"></el-option>
                            <el-option label="专科以下" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="毕业院校">
                        <el-input v-model="form.graduateSchool"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.graduateTime" style="width: 217px;"></el-date-picker>
                    </el-form-item>
                </el-form>
                <h1>联系方式</h1>
                <el-form :model="form" :rules="rules" ref="form3" label-width="150px" class="clearfix">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="form.phone"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="微信">
                        <el-input v-model="form.wechatNo"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人">
                        <el-input v-model="form.contractName"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人关系">
                        <el-input v-model="form.contractRelation"  class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人联系方式">
                        <el-input v-model="form.contractPhone"  class="width_220"></el-input>
                    </el-form-item>
                </el-form>
                <h1>工作信息</h1>
                <el-form :model="form" :rules="rules" ref="form4" label-width="150px" class="clearfix">
                    <el-form-item label="到岗日期" prop="joinDate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.joinDate" style="width: 217px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="员工类型" prop="userDraw">
                        <el-select v-model="form.userDraw" placeholder="请选择员工类型">
                            <el-option label="正式" value="1"></el-option>
                            <el-option label="试用" value="2"></el-option>
                            <el-option label="兼职" value="3"></el-option>
                            <el-option label="实习" value="4"></el-option>
                            <el-option label="劳务派遣" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="试用期" prop="probation">
                        <el-select v-model="form.probation" placeholder="请选择试用期">
                            <el-option label="一个月" value="1"></el-option>
                            <el-option label="二个月" value="2"></el-option>
                            <el-option label="三个月" value="3"></el-option>
                            <el-option label="四个月" value="4"></el-option>
                            <el-option label="五个月" value="5"></el-option>
                            <el-option label="六个月" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="deptId">
                        <el-select v-model="form.deptId" placeholder="请选择部门">
                            <el-option :key="dept.id" :label="dept.name" :value="dept.id" v-for="dept in depts"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位" prop="positionId">
                        <el-select v-model="form.positionId" placeholder="请选择职位">
                            <el-option :key="posiotion.id" :label="posiotion.name" :value="posiotion.id" v-for="posiotion in positions"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报对象" prop="reportUserId">
                        <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2' :tree-select-data="treeSelectData" ref="tree"></tree-component>
                    </el-form-item>
                    <el-form-item label="合同主体" prop="companyName">
                        <el-input v-model="form.companyName"  class="width_220"></el-input>
                    </el-form-item>
                </el-form>
                <div class="text_algin_center margin_t_20">
                    <el-button type="primary" @click="saveBasics('form')">下一步</el-button>
                </div>
            </div>
            <div v-show="active == 2" class="float_none">
                <h1>请勾选已完成的项目</h1>
                <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="clearfix">
                    <el-form-item label="">
                        <el-checkbox-group v-model="entry">
                            <el-checkbox v-for="item in entryList" :label="item.id" style="display:block;margin-left:0;">{{item.itemName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="warning" @click="setmemorandumShow=true">备忘录设置</el-button>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="immediatelySend">确认到岗</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="active == 3" class="text_algin_center margin_t_20">
                <p style="font-size:16px;margin-bottom:30px;">到岗成功 , 快邀请他开通自助服务吧~</p>
                <img src="https://aijuhr.com/images/comm/app_ewm.png">
            </div>
            <el-dialog
            title="提示"
            :visible.sync="setmemorandumShow"
            size="tiny">
                <el-form ref="memorandum" :model="memorandum" label-width="80px" class="memorandum">
                    <el-form-item label="提醒自己">
                        <el-switch
                        v-model="memorandum.type1"
                        on-color="#13ce66"
                        off-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="提醒内容" v-show="memorandum.type1">
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="memorandum.content1">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="提醒时间" v-show="memorandum.type1">
                        <el-input
                        placeholder="天数"
                        style="width:50px"
                        v-model="memorandum.remindDay">
                        </el-input>
                        <span>天后早上9点，消息提醒自己</span>
                    </el-form-item>
                    <el-form-item label="提醒员工" style="margin-top:50px;">
                        <el-switch
                        v-model="memorandum.type2"
                        on-color="#13ce66"
                        off-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="提醒内容" style="margin-bottom:0;" v-show="memorandum.type2">
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="memorandum.content2">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="" v-show="memorandum.type2">
                        <span>今天21点，短信提醒员工准备以上内容</span>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setmemorandumShow = false">取 消</el-button>
                    <el-button type="primary" @click="savesetmemorandum">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import treeComponent from '../tree.vue';
    export default {
        name:'confirmjoin',
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
                form:{
                    extId:'', //-  int 入职登记表的id   
                    hireEmployId:'',// -  int 待入职员工的id   
                    name:'',// -  string 姓名 
                    nick:'',// -  string 昵称/花名 
                    birthday:'',// -  string 生日 
                    marrayStatus:'',// -  int 婚姻状况 1.未婚 2.已婚 
                    bearStatus:'',// -  int 生育状况  1.未育 2.已育
                    identificationType:'1',// -  int 证件类型 1.身份证 2.护照
                    identificationNo:'',// -  string 证件号 
                    educationLev:'',// -  itn 学历 1.博士后 2.博士 3.硕士 4.本科 5.专科 6.专科以下
                    graduateSchool:'',// -  string 毕业学校 
                    graduateTime:'',// -  string 毕业时间 
                    registryType:'',// -  int 户籍类型 1.本地城镇 2.本地农村 3.外地城镇（省内）4.外地农村（省内）5.外地城镇（省外）6.外地农村（省外） 
                    registryAddress:'',// -  string 户籍地址 
                    //- -  - - 
                    phone:'',// -  string 电话 
                    wechatNo:'',// -  string 微信号 
                    contractName:'',// -  string 紧急联系人的姓名 
                    contractRelation:'',// -  string 与紧急联系人的电话 
                    contractPhone:'',// -  string 紧急联系人电话 
                    joinDate:'',// -  string 入职日期 
                    userDraw:'1',// - string 员工类型 
                    probation:'',// - string 试用期 
                    deptId:"",// - string 部门id 
                    positionId:'',// - string 职位id 
                    reportUserId:'',// - string 汇报对象的id 
                    companyName:'',// - string 合同主体 
                },
                rules:{
                    name:[{required:true,message:'请输入姓名',trigger:'blur'}],
                    phone:[{required:true,message:'请输入手机号',trigger:'blur'},{ validator: validatePass, trigger: 'blur' }],
                    companyName:[{required:true,message:'请输入合同主体',trigger:'blur'}],
                    email:[{required:true,message:'请输入邮箱',trigger:'blur'}],
                    contactName:[{required:true,message:'请输入入职联系人',trigger:'blur'}],
                    contactPhone:[{required:true,message:'请输入联系人电话',trigger:'blur'}],
                    joinDate:[{type:'date',required:true,message:'请选择到岗日期',trigger:'change'}],
                    userDraw:[{required:true,message:'请选择员工类型',trigger:'change'}],
                    probation:[{required:true,message:'请选择试用期',trigger:'change'}],
                    deptId:[{type:'number',required:true,message:'请选择部门',trigger:'change,blur'}],
                    positionId:[{type:'number',required:true,message:'请选择职位',trigger:'change,blur'}],
                },
                entry:[],
                entryList:[],
                depts:[],
                positions:[],
                treeBtnName:'选择汇报对象',
                treeSelectData:{
                    keys:[],
                    names:[],
                },
                memorandum:{
                    type1:true,
                    type2:true,
                    content1:'',
                    content2:'',
                    remindDay:''
                },
                setmemorandumShow:false,
            }
        },
        mounted () {
            this.getDeptPosition();
            this.index();
            this.getEntryList();
        },
        methods:{
            getDeptPosition(){
                var self=this;
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
            index(){
                var self=this;
                console.log(self.$route.params.hireEmployerId);
                if(!self.$route.params.hireEmployerId){
                    self.$router.push("/manage/pool/talentpool");
                    return false;
                }
                var method="acceptOffer/getEmployeeInfoById",
                    param=JSON.stringify({hireEmployId:self.$route.params.hireEmployerId}),
                    // param=JSON.stringify({hireEmployId:'16'}),
                    successd=function(res){
                        console.log(res ,"false");
                        if(!res.data.data){
                            self.$router.push("/manage/pool/talentpool");
                            return false;
                        }
                        self.form=res.data.data;
                        self.form.userDraw=self.form.userDraw +'';
                        self.form.registryType=self.form.registryType+"";
                        self.form.educationLev=self.form.educationLev+"";
                        self.form.probation=self.form.probation+"";
                        self.form.identificationType=self.form.identificationType+'';
                        self.$nextTick(function(){
                            var reg= /\,/;
                            if (reg.test(self.form.reportUserId)) {
                                self.treeSelectData.keys=self.form.reportUserId.split(',');
                            } else {
                                self.treeSelectData.keys=[];
                            }
                            self.treeSelectData.names=res.data.data.reportUserName;
                            self.$refs.tree.setChecked();
                        })
                    };
                self.$http(method,param,successd);
                
            },
            treeAssign(v){
                this.form.reportUserId = v[0];
            },
            saveBasics(){
                var self=this;
                var method="acceptOffer/confirmEmployeeInfo",
                    param=JSON.stringify({
                        employeeInfo:self.form
                    }),
                    successd=function(res){
                        self.active=2;
                    };
                self.$http(method,param,successd);
            },
            getEntryList(){
                var self=this;
                var method="acceptOffer/getEntryList",
                    param=JSON.stringify({}),
                    successd=function(res){
                        console.log(res);
                        self.entryList=res.data.data;
                    };
                self.$http(method,param,successd);
            },
            savesetmemorandum(){
                var self=this;
                var remindArray=[];
                if(self.memorandum.type1){
                    remindArray.push({
                        type:1,
                        content:self.memorandum.content1,
                        remindDay:self.memorandum.remindDay
                    })
                }
                if(self.memorandum.type2){
                    remindArray.push({
                        type:2,
                        content:self.memorandum.content2,
                        hireEmployId:self.form.hireEmployId
                    })
                }
                var method="acceptOffer/saveRemind",
                    param=JSON.stringify({
                        remindArray:remindArray
                    }),
                    successd=function(res){
                        console.log(res);
                        self.setmemorandumShow=false;
                        self.$message({
                            type:'success',
                            message:'设置成功!'
                        })
                    };
                self.$http(method,param,successd);
            },
            getnext(v){
                this.active=v;
            },
            immediatelySend(){
                var self=this;
                var method="acceptOffer/confirmJoin",
                    param=JSON.stringify({
                        hireEmployId:self.form.hireEmployId,
                        certificateIds:self.entry.join()
                    }),
                    successd=function(){
                        self.active=3;
                    };
                self.$http(method,param,successd);
            }
        },
        components:{
            treeComponent,
            // fileUpload
        }
    }
</script>

<style>
    #confirmjoin h1{font-size: 16px;line-height: 50px;border-bottom: 1px solid #e9ecef;padding-left: 20px;margin: 20px 0;}
    #confirmjoin .el-form-item{width: 50%;float: left;}
    #confirmjoin .memorandum .el-form-item{width: auto;float: none;}
    #confirmjoin .float_none .el-form-item{float: none;}
    #confirmjoin .el-form{width: 80%;margin: 0 auto;}
    #confirmjoin .list_style_disc{list-style-type:disc; padding-left: 20px;}
    #confirmjoin .list_style_disc li{list-style-type:disc;}
    #confirmjoin .font_weight_500{font-weight: 500;}
    #confirmjoin .activeThree .el-form-item{width: 100%;float: none}
    #confirmjoin .activeThree .el-form{width: 100%;}
    #confirmjoin .ql-container.ql-snow{width:100%;min-height: 500px;}
    #confirmjoin .employset_main{border:1px solid #ccc;border-bottom: none;padding: 20px;}
    #confirmjoin .employset_main_btn{border-color: #5aa2e7;color: #5aa2e7;}
</style>