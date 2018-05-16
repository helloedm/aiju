<template>
    <div id="gooffer" class="hrm_module">
        <div class="hrm_module_con">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ name: 'talentpool' }">录用</el-breadcrumb-item>
                <el-breadcrumb-item>发offer</el-breadcrumb-item>
            </el-breadcrumb>
            <el-steps :space="400" :active="active" :center="true">
                <el-step title="信息填写" description=""></el-step>
                <el-step title="薪酬信息" description=""></el-step>
                <el-step title="预览offer" description=""></el-step>
            </el-steps>
            <div v-show="active==1">
                <h1>个人信息</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="150px" class="clearfix">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" class="width_220"></el-input>
                    </el-form-item>
                </el-form>
                <h1>联系方式</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="150px" class="clearfix">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone" @blur="phoneNoExit" class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="offer接受邮箱" prop="email">
                        <el-input v-model="ruleForm.email" class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="入职联系人" prop="contactName">
                        <el-input v-model="ruleForm.contactName" class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" prop="contactPhone">
                        <el-input v-model="ruleForm.contactPhone" class="width_220"></el-input>
                    </el-form-item>
                </el-form>
                <h1>工作信息</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" label-width="150px" class="clearfix">
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
                    <el-form-item label="试用期" prop="probation" style="height:36px;">
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
                            <el-option :label="dept.name" :value="dept.id" v-for="dept in depts" :key="dept.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位" prop="positionId">
                        <el-select v-model="ruleForm.positionId" placeholder="请选择职位">
                            <el-option :label="posiotion.name" :value="posiotion.id" v-for="posiotion in positions" :key="posiotion.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇报对象" prop="reportUserId">
                        <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2' ref="tree1" :tree-select-data="treeSelectData1"></tree-component>
                    </el-form-item>
                </el-form>
                <h1>入职准备</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm4" label-width="150px" class="clearfix">
                    <el-form-item label="入职材料提醒">
                        <el-button @click="dialogVisible=true">预览</el-button>
                    </el-form-item>
                </el-form>
                <div class="text_algin_center margin_t_20">
                    <el-button type="primary" @click="saveBasics('ruleForm')">下一步</el-button>
                </div>
            </div>
            <div v-show="active == 2" class="float_none">
                <h1>正式工资(选填)</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="基本工资">
                        <el-input v-model="ruleForm.basicSalary" class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位工资">
                        <el-input v-model="ruleForm.jobSalary" class="width_220"></el-input>
                    </el-form-item>
                </el-form>
                <h1>试用期工资(选填)</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="试用期工资">
                        <el-select v-model="autoSalary" placeholder="请选择员工类型" @change="getSalaryPre">
                            <el-option label="按正式工资的80%计算" value="80"></el-option>
                            <el-option label="按正式工资的85%计算" value="85"></el-option>
                            <el-option label="按正式工资的90%计算" value="90"></el-option>
                            <el-option label="按正式工资的95%计算" value="95"></el-option>
                            <el-option label="按正式工资计算" value="100"></el-option>
                            <el-option label="自定义试用期工资" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="基本工资">
                        <el-input v-model="ruleForm.basicSalaryPre" class="width_220"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位工资">
                        <el-input v-model="ruleForm.jobSalaryPre" class="width_220"></el-input>
                    </el-form-item>
                </el-form>
                <h1>薪资备注(选填)</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="clearfix">
                    <el-form-item label="薪资备注">
                        <el-input v-model="ruleForm.salaryRemark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                    </el-form-item>
                </el-form>
                <div class="" style="width:80%;margin:20px auto;padding-left:1px;">
                    <el-button type="primary" @click="getnext(1)" style="margin-left:149px;">上一步</el-button>
                    <el-button type="primary" @click="saveHireEmployer">下一步</el-button>
                </div>
            </div>
            <div class="hrm_module padding_20_0 activeThree" v-if="active==3">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="offer模板">
                        <el-button v-for="temp in templetList" @click="createOffer(temp.id)" :key="temp.id">{{temp.name}}</el-button>
                    </el-form-item>
                    <el-form-item label="邮件主题">
                        <el-input v-model="emailTheme" placeholder="请输入邮件主题"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件正文">
                        <div class="employset_main" >
                            <el-button type="info" size="small" :plain="true" @click="addContent('name')" class="employset_main_btn">姓名</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('phone')" class="employset_main_btn">手机号</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('email')" class="employset_main_btn">邮箱</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('dept')" class="employset_main_btn">入职部门</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('position')" class="employset_main_btn">入职职位</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('shiyongqi')" class="employset_main_btn">试用期</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('companyName')" class="employset_main_btn">公司名称</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('company')" class="employset_main_btn">公司地址</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('linkmanphone')" class="employset_main_btn">联系人电话</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('linkman')" class="employset_main_btn">入职联系人</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('zhuanzheng')" class="employset_main_btn">转正薪资</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('shiyong')" class="employset_main_btn">试用期薪资</el-button>
                            <el-button type="info" size="small" :plain="true" @click="addContent('remake')" class="employset_main_btn">薪酬备注</el-button>
                            <i class="el-icon-information"></i>
                        </div>
                        <quill-editor v-model="offerContent"
                                        ref="myQuillEditor"
                                        :options="editorOption"
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @change="onEditorChange($event)"
                                        @ready="onEditorReady($event)">
                        </quill-editor>
                    </el-form-item>
                    <el-form-item label="添加附件">
                        <file-upload :param="param" @fileId="fileId" @deleFileId="deleFileId" :empty="empty"></file-upload>
                    </el-form-item>
                    <el-form-item label="抄送人员">
                        <tree-component @treeAssign="treeAssign2" :tree-btn-name="treeBtnName2" :tree-support-select="false" ref="tree" :tree-type='2' :tree-select-data="treeSelectData"></tree-component>
                    </el-form-item>
                     <el-form-item label="审批人员">
                         <tree-component @treeOrderAssign="treeOrderAssign" :tree-btn-name="treeBtnName3" :tree-support-select="false" ref="tree2" :tree-type='2' :tree-select-data="treeSelectData2"></tree-component>
                    </el-form-item>
                    <el-form-item label="offer有效时间" required>
                        <el-input v-model="effectiveDate" placeholder="请输入数字" style="width:200px"><template slot="append">自然日</template></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveAndSendOffer" v-loading.fullscreen.lock="saveAndSendLoading">发送offer</el-button>
                        <el-button type="primary" @click="sendApprove" v-loading.fullscreen.lock="saveAndSendLoading">发起审批</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-dialog
                title="入职材料提醒"
                :visible.sync="dialogVisible"
                size="tiny">
                <div v-for="(items,key) in JoinCertificate" :key="key">
                    <div class="font_weight_500">提前{{key}}个自然日</div>
                    <ul class="list_style_disc">
                        <li v-for="item in items" :key="item">{{item}}</li>
                    </ul>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import treeComponent from '../tree.vue';
import fileUpload from '../fileUpload.vue';

    export default {
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
                effectiveDate:'',
                form:{},
                editorOption:{},
                autoSalary:'80',
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
                    deptId:[{type:'number',required:true,message:'请选择部门',trigger:'change'}],
                    positionId:[{type:'number',required:true,message:'请选择职位',trigger:'change'}],
                },
                active:1,
                depts:[],
                positions:[],
                treeBtnName:'选择汇报对象',
                treeSelectData1: {
                    keys: [],
                    names: ''
                },
                dialogVisible:false,
                input:'',
                JoinCertificate:[],
                hireEmployerId:'',
                offerTempleId:'',
                templetList:[],
                emailTheme:'',
                offerContent:'',
                param:{
                    businessId:9,
                    fId:-1
                },
                empty:'',
                fileIds:[],
                treeBtnName2:'选择抄送人员',
                treeBtnName3:'选择审批人员',
                treeSelectData: {
                    keys: [],
                    names: ''
                },
                treeSelectData2: {
                    keys: [],
                    names: ''
                },
                tagInf:{},
                recieveUids:[],
                approvalUserIds:[],
                saveAndSendLoading:false,
                routeParams:{},
            }
        },
        mounted(){
            this.getDeptPost();
            this.getJoinCertificate();
            this.getOfferTempletList();
            // this.createOffer();
            // this.getTagInf();
        },
        methods:{
            onEditorBlur(editor) {
                // console.log('editor blur!', editor)
                // console.log(editor.getSelection());
            },
            onEditorFocus(editor) {
                // console.log('editor focus!', editor)
                this.selection = editor.getSelection().index;
                this.selectionLength = editor.getSelection().length;
            },
            onEditorReady(editor) {
                // console.log('editor ready!', editor)
                // console.log(this.content);
            },
            onEditorChange({ editor, html, text }) {
                // console.log('editor change!', editor, html, text)
                // console.log(editor.getSelection());
                if(editor.getSelection()){
                    this.selection = editor.getSelection().index;
                    this.selectionLength = editor.getSelection().length;
                }
                // this.content = html
            },
            addContent(v){//添加标签
                // this.content+="<a href='#'>aaaaa</a>";
                var self = this;
                var text=self.tagInf[v]||'';
                this.$refs.myQuillEditor.quill.insertText(self.selection,text,true)
            },
            getnext(v){
                this.active=v;
                this.getHireEmployerById();
            },
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
                var params = self.routeParams = self.$route.params;
                if(params.active){
                    self.active=params.active;
                }
                if(params.hireEmployerId){
                    self.hireEmployerId=params.hireEmployerId;
                    self.getHireEmployerById();
                }
            },
            getHireEmployerById(){//获取已经录入的员工信息
                var self=this;
                var method="hireEmployer/getHireEmployerById",
                    param=JSON.stringify({hireEmployerID:self.hireEmployerId,offerApprovalId:self.routeParams.offerApprovalId}),
                    successd=function(res){
                        self.effectiveDate =typeof res.data.data.effectiveDate == 'number' ? res.data.data.effectiveDate : '';
                        self.ruleForm=res.data.data;
                        self.ruleForm.joinDate =res.data.data.joinDate? new Date(res.data.data.joinDate):new Date();
                        self.ruleForm.probation=self.ruleForm.probation?self.ruleForm.probation+"":'3';
                        self.ruleForm.userDraw=self.ruleForm.userDraw?self.ruleForm.userDraw+'':'2';
                        self.ruleForm.reportUserId = res.data.data.reportUserId;
                        self.treeSelectData1.keys = res.data.data.reportIdList || [];
                        self.treeSelectData1.names = res.data.data.reportNameList ? res.data.data.reportNameList.join() : '选择汇报对象';
                        self.approvalUserIds = res.data.data.approvalIdList || [];
                        self.treeSelectData2.keys =  res.data.data.approvalIdList || [];
                        self.treeSelectData2.names = res.data.data.approvalNameList ? res.data.data.approvalNameList.join() : '';
                        self.$refs.tree1.setChecked();
                        
                    };
                self.$http(method,param,successd);
            },
            // 树组件赋值
            treeAssign(v) {
                this.ruleForm.reportUserId = v[0];
            },
            treeAssign2(v) {
                console.log(v);
                this.recieveUids = v;
            },
            treeOrderAssign(v) {
                var _this = this;
                if (v.checked) {
                    if(_this.approvalUserIds.indexOf(String(v.id)) == -1){
                        _this.approvalUserIds.push(v.id);
                    }            
                } else {
                    for(var i=0;i<_this.approvalUserIds.length;i++){
                        if(_this.approvalUserIds[i] ==v.id){
                            _this.approvalUserIds.splice(i,1);
                        }
                    }
                }                
            },
            getSalaryPre(){//自动计算试用期工资
                if(!isNaN(this.autoSalary * this.ruleForm.basicSalary/100)){
                    this.ruleForm.basicSalaryPre = this.autoSalary * this.ruleForm.basicSalary/100;
                }else{
                   this.ruleForm.basicSalaryPre=0; 
                }
                if(!isNaN(this.autoSalary * this.ruleForm.jobSalary/100)){
                    this.ruleForm.jobSalaryPre = this.autoSalary * this.ruleForm.jobSalary/100;
                }else{
                   this.ruleForm.jobSalaryPre=0; 
                }
                // this.ruleForm.basicSalaryPre = this.ruleForm.autoSalary * this.ruleForm.basicSalary/100;
                // this.ruleForm.jobSalaryPre = this.ruleForm.autoSalary * this.ruleForm.jobSalary/100;
            },
            phoneNoExit(){
                var self=this;
                var method="hireEmployer/phoneNoExit",
                    param=JSON.stringify({
                        checkPhone:self.ruleForm.phone
                    }),
                    successd=function(res){
                        console.log(res);
                    };
                var reg=/^1[3578][0-9]{9}$/;
                if(reg.test(self.ruleForm.phone)){
                    self.$http(method,param,successd);
                }
            },
            getJoinCertificate(){//获取提醒内容
                var self=this;
                var method="hireEmployer/getJoinCertificate",
                    param=JSON.stringify({companyId:localStorage.companyId}),
                    successd=function(res){
                        self.JoinCertificate=res.data.data;
                    };
                self.$http(method,param,successd);
            },
            saveBasics(roleForm){
                var self=this,valid1=true;
                self.ruleForm.joinDate = new Date(self.ruleForm.joinDate)  
                for(var i=1;i<4;i++){
                    console.log(self.$refs[roleForm+i]);
                    self.$refs[roleForm+i].validate((valid)=>{
                        if(valid){

                        }else{
                            valid1=false;
                        }
                    });
                }
                if(valid1){       
                    if (self.hireEmployerId) {//编辑
                        var hireEmployer=JSON.parse(JSON.stringify(self.ruleForm));
                        hireEmployer.joinDate=self.$date(self.ruleForm.joinDate);
                        var method="hireEmployer/updateHireEmployerById";
                        var param=JSON.stringify({'hireEmployer':hireEmployer});
                        var successd=function(res){
                                self.active=2;
                            };
                    } else {
                        var hireEmployer=JSON.parse(JSON.stringify(self.ruleForm));
                        hireEmployer.joinDate=self.$date(self.ruleForm.joinDate);
                        var method="hireEmployer/saveHireEmployer";
                        var param=JSON.stringify({'hireEmployer':hireEmployer});
                        var successd=function(res){
                                self.active=2;
                                self.hireEmployerId=res.data.data;
                            };
                    }
                    self.$http(method,param,successd);
                }
            },
            saveHireEmployer(e){
                var self=this;
                if(localStorage.hireEmployerId){
                    self.hireEmployerId=localStorage.hireEmployerId;
                }
                // self.ruleForm.joinDate=self.$date(self.ruleForm.joinDate);
                var method="hireEmployer/saveHireEmployerSalary",
                    param=JSON.stringify({
                        id:self.hireEmployerId,
                        basicSalary:self.ruleForm.basicSalary,
                        jobSalary:self.ruleForm.jobSalary,
                        basicSalaryPre:self.ruleForm.basicSalaryPre,
                        jobSalaryPre:self.ruleForm.jobSalaryPre,
                        salaryRemark:self.ruleForm.salaryRemark                      
                    }),
                    successd=function(res){
                        self.active=3;
                        // self.hireEmployerId=res.data.data;
                        self.createOffer();
                        self.getTagInf();
                    };
                self.$http(method,param,successd);
            },
            createOffer(id){
                var self=this;
                if(id){
                    self.offerTempleId=id;
                }
                var method="sendOffer/createOffer",
                    param=JSON.stringify({
                        hireEmployerId:self.hireEmployerId,
                        offerTempleId:self.offerTempleId
                    }),
                    successd=function(res){
                        console.log(res);
                        self.emailTheme=res.data.data.emailTheme;
                        self.offerContent=res.data.data.offerContent;
                        self.recieveUids=res.data.data.recieveIdList;
                        self.treeSelectData.keys=res.data.data.recieveIdList;
                        self.treeSelectData.names=res.data.data.recieveNameList.join();
                        // self.$nextTick(function(){
                            self.$refs.tree.setChecked();
                             if(self.treeSelectData2.keys && self.treeSelectData2.keys.length>0){
                                 self.$refs.tree2.setChecked();
                              } 
                            
                        // })
                    };
                self.$http(method,param,successd);
            },
            getOfferTempletList(){
                var self=this;
                var method="offerTemplet/getOfferTempletList",
                    param=JSON.stringify({}),
                    successd=function(res){
                        self.templetList=res.data.data;
                        if(self.hireEmployerId){
                            self.createOffer(res.data.data[0].id);
                        }
                    };
                self.$http(method,param,successd);
            },
            fileId(id){
                this.fileIds.push(id);
                console.log(id);
            },
            deleFileId(id){
                var _this = this;
                for(var i=0;i<_this.fileIds.length;i++){
                    if(_this.fileIds[i] == id){
                        _this.fileIds.splice(i,1);
                    }
                }
            },
            getTagInf(){
                var self=this;
                var method='sendOffer/getTagInf',
                    param=JSON.stringify({hireEmployerId:self.hireEmployerId}),
                    successd=function(res){
                        self.tagInf=res.data.data;
                    };
                self.$http(method,param,successd);
            },
            saveAndSendOffer(){
                var self=this;
                self.effectiveDate-=0;
                var isNum=typeof self.effectiveDate === 'number' && !isNaN(self.effectiveDate);
                if(!isNum){
                    self.$message.error("请输入正确的offer有效期时间");
                    return;
                }
                self.saveAndSendLoading=true;
                var method="sendOffer/saveAndSendOffer",
                    param=JSON.stringify({
                        hireEmployerId:self.hireEmployerId,
                        emailTheme:self.emailTheme,
                        recieveUids:self.recieveUids.join(),
                        effectiveDate:self.effectiveDate,
                        fileIds:self.fileIds.join(),
                        offerContent:self.offerContent
                    }),
                    successd=function(res){
                        self.saveAndSendLoading=false;
                        self.$message({
                            message:'发送成功!',
                            type:'success'
                        });
                        self.$router.push({name:'talentpool'});
                    },
                    c=function(){
                        self.saveAndSendLoading=false;
                    };
                self.$http(method,param,successd,c);
            },
            /**
             * 发起审批
            */
            sendApprove(){
                var self = this
                self.effectiveDate-=0;
                var isNum=typeof self.effectiveDate === 'number' && !isNaN(self.effectiveDate);
                if(!isNum){
                    self.$message.error("请输入正确的offer有效期时间");
                    return;
                }
                if(!(Array.isArray(self.approvalUserIds) && self.approvalUserIds.length>0)){
                     self.$message({
                            message:'请选择审核人员!',
                            type:'warning'
                        });
                    return;
                }
                self.saveAndSendLoading=true;
                var method="sendOffer/saveOfferApproval",
                    param=JSON.stringify({
                        hireEmployerId:self.hireEmployerId,
                        emailTheme:self.emailTheme,
                        recieveUids:self.recieveUids.join(),
                        effectiveDate:self.effectiveDate,
                        fileIds:self.fileIds.join(),
                        offerContent:self.offerContent,
                        approvalUserIds:self.approvalUserIds.join(),
                        isUpdate:self.routeParams.offerApprovalId?1:0,
                        offerApprovalId:self.routeParams.offerApprovalId,
                        offerId:self.routeParams.offerId
                    }),
                    successd=function(res){
                        self.saveAndSendLoading=false;
                        self.$message({
                            message:'发送成功!',
                            type:'success'
                        });
                        self.$router.push({name:'talentpool'});
                    },
                    c=function(){
                        self.saveAndSendLoading=false;
                    };
                self.$http(method,param,successd,c);
                
            },
            // templetDetail(id){//查看模板详情
            //     var self=this;
            //     self.templetId=id;
            //     var method="offerTemplet/getOfferTemplet",
            //         param=JSON.stringify({
            //             id:id
            //         }),
            //         successd=function(res){
            //             console.log(res);
            //             self.emailTheme=res.data.data.theme;
            //             self.content=res.data.data.content;
            //             self.templetId=res.data.data.id;
            //         };
            //     self.$http(method,param,successd);
            // },
        },
        components:{
            treeComponent,
            fileUpload
        }
    }
</script>

<style>
    #gooffer h1{font-size: 16px;line-height: 50px;border-bottom: 1px solid #e9ecef;padding-left: 20px;margin: 20px 0;}
    #gooffer .el-form-item{width: 50%;float: left;}
    #gooffer .float_none .el-form-item{float: none;}
    #gooffer .el-form{width: 80%;margin: 0 auto;}
    #gooffer .list_style_disc{list-style-type:disc; padding-left: 20px;}
    #gooffer .list_style_disc li{list-style-type:disc;}
    #gooffer .font_weight_500{font-weight: 500;}
    #gooffer .activeThree .el-form-item{width: 100%;float: none}
    #gooffer .activeThree .el-form{width: 100%;}
    #gooffer .ql-container.ql-snow{width:100%;min-height: 500px;}
    #gooffer .employset_main{border:1px solid #ccc;border-bottom: none;padding: 20px;}
    #gooffer .employset_main_btn{border-color: #5aa2e7;color: #5aa2e7;}
</style>