<template>
    <div id="goCare" class="hrm_module">
        <div class="hrm_module_con">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/manage/usercare' }">员工关怀</el-breadcrumb-item>
                <el-breadcrumb-item>去关怀</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="gocare_con">
                <div class="gocare_con_left">
                    <el-form :model="ruleForm"  ref="" label-width="100px" class="gocare_form">
                        <el-form-item label="关怀场景" prop="">
                            <el-select v-model="ruleForm.region" placeholder="请选择节日" @change="getCareTempletList">
                            <el-option :label="item.name" :value="item.id" v-for="item in scene"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="关怀标题" prop="">
                            <el-input v-model="TempletDetail.title" class="gocare_header"></el-input>
                        </el-form-item>
                        <el-form-item label="选择模板" required class="gocare_querymuban">
                            <el-button class="gocare_btn" v-for="item in CareTempletList" @click="getCareTempletDetail(item.id,item.type)">{{item.name}}</el-button>
                            <el-button type="warning" v-if="CareTempletList.length<10&&inputVisible" @click="addCareTemplet">新增模板</el-button>
                            <el-input
                            class="input-new-tag"
                            v-if="CareTempletList.length<10&&!inputVisible"
                            v-model="inputValue"
                            ref="saveMubanInput"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="插入标签" prop="">
                            <el-button type="" size="small" class="cursor_pointer" @click="userNameShow=!userNameShow">员工姓名</el-button>
                            <el-button type="" size="small" class="cursor_pointer" @click="qiyeNameShow=!qiyeNameShow">企业名称</el-button>
                            <el-button type="" size="small" class="cursor_pointer" @click="sendTimeShow=!sendTimeShow">祝福发送日期</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="gocare_con_right">
                    <div class="gocare_mubanbtn">
                        <el-button type="primary" @click="saveMuiban" :disabled="!TempletDetail.id">确认</el-button>
                        <el-button @click="resetCareTempletDetail" :disabled="!TempletDetail.id">重置</el-button>
                        <el-button @click="deleCareTemplet(TempletDetail.id,TempletDetail.isTemplet)" :disabled="!TempletDetail.id">删除</el-button>
                    </div>
                    <div class="gocare_muban">
                        <p class="gocare_muban_cankao">图片参考尺寸：346*312</p>
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :data="params"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="TempletDetail.url != null" :src="TempletDetail.url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="w260" v-show="userNameShow">
                            <span contenteditable="true" id="receiveStr">{{TempletDetail.receiveStr||"亲爱的:"}}</span><el-tag type="primary"  key="1" :closable="true" @close="userNameShow=false">员工姓名</el-tag>
                        </div>
                        <el-input type="textarea" autosize class="gocare_content" placeholder="请输入祝福内容" resize="none" v-model="TempletDetail.content"></el-input>
                        <div class="text_algin_right w260" v-show="qiyeNameShow">
                           <el-tag type="primary"  key="2" :closable="true" @close="qiyeNameShow=false">企业名称</el-tag> 
                        </div>
                        <div class="text_algin_right w260" v-show="sendTimeShow">
                            <el-tag type="primary" key="3" :closable="true" @close="sendTimeShow=false">祝福发送日期</el-tag>
                        </div>
                    </div>
                </div>
            </div>
            <el-form :model="ruleForm"  ref="" label-width="100px" class="gocare_form">
                    <el-form-item label="发放人员" prop="">
                        <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='0'></tree-component>
                    </el-form-item>
                    <el-form-item label="发放日期" prop="">
                        <el-radio class="radio" v-model="radio" label="1">立即发送</el-radio>
                        <el-radio class="radio" v-model="radio" label="2">节日发送</el-radio>
                        <el-radio class="radio" v-model="radio" label="3">
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="发送人数">
                        <span>{{selectUserNo+"人"}}</span>
                    </el-form-item>
                    <el-form-item label="" prop="">
                        <el-button type="primary" @click="addCompanyCare">发送</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
import treeComponent from '../tree.vue';
import Util from '../../script/util.js';
import md5 from 'js-md5';
    export default {
        data(){
            return {
                name: 'custom-toolbar-example',
                ruleForm:{
                    region:"1",
                    name:"",
                },
                imageUrl:false,
                editorOption:{
                   modules: {
                        toolbar: '#toolbar'
                    }
                },
                content:'',
                radio:'1',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value1:"",
                scene:[],
                CareTempletList:[],//模板列表
                TempletDetail:{//模板详情
                    files:"",
                    sendStr:"亲爱的 : ",
                    content:'',
                    title:'',
                    receiveStr:'',
                    isSendTime:'',
                    url:null
                },
                userNameShow:true,
                qiyeNameShow:true,
                sendTimeShow:true,
                inputVisible:true,
                inputValue:'',
                treeBtnName:"选择人员",
                selectUserNo:0,
                sendToPerson:[],
                sendToDept:[],
                uploadUrl:Util.uploadURLForCommon,
                params:{
                    sign:md5('methodfileUpload/insertFileRecordparam'+JSON.stringify({businessId:10,fId:-1})+'ecbao'),
                    param:JSON.stringify({businessId:10,fId:-1})
                }
            }
        },
        mounted(){
            this.getFestivalList();
            this.getCareTempletList();
        },
        methods:{
            handleAvatarSuccess(res,file){
                this.TempletDetail.url = URL.createObjectURL(file.raw);
                this.imageUrl = true;
                this.TempletDetail.files=file.response.data.ids;
                this.TempletDetail.url=res.data.fileInfoList[0].url;
                console.log(this.TempletDetail);
                console.log(file);
                console.log(res);
            },
            beforeAvatarUpload(file){
                var isImg = (file.type == 'image/jpeg'||file.type =='image/png'||file.type =='image/gif');
                var isLt2M = file.size / 1024 / 1024 < 2;
                if(!isImg){
                    this.$message.error('请上传图片!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isImg && isLt2M;
            },
            customButtonClick(event,a,b){
                console.log(this.content)
            },
            getFestivalList(){
                var self = this;
                var method= "careTemplet/getFestivalList",
                    param= JSON.stringify({}),
                    successd = function(res) {
                        self.scene = res.data.data;
                    };
                self.$http(method,param,successd);
            },
            getCareTempletList(){
                var self =this;
                var method="careTemplet/getCareTempletList",
                    param=JSON.stringify({
                        type:self.ruleForm.region
                    }),
                    successd=function(res){
                        self.CareTempletList = res.data.data;
                    };
                self.$http(method,param,successd);
            },
            getCareTempletDetail(id,type){
                var self=this;
                var method="careTemplet/getCareTempletDetail",
                    param=JSON.stringify({
                        id:id,
                        type:type
                    }),
                    successd = function(res) {
                        self.TempletDetail = res.data.data;
                    };
                self.$http(method,param,successd);
            },
            addCareTemplet(){//新增模板
                this.inputVisible = false;
                this.$nextTick(_ => {
                    this.$refs.saveMubanInput.$refs.input.focus();
                });
            },
            handleInputConfirm(){
                var inputValue = this.inputValue;
                var self = this;
                if (inputValue) {
                    var method="careTemplet/addCareTemplet",
                        param=JSON.stringify({
                            "name":inputValue,
                            "type":self.ruleForm.region
                        }),
                        successd=function(res){
                            self.$message({
                                message: '新增模板成功',
                                type: 'success'
                            });
                            self.getCareTempletList();
                        };
                    self.$http(method,param,successd);
                }
                this.inputVisible = true;
                this.inputValue = '';
            },
            treeAssign(val){
                var self = this;
                self.sendToPerson = val.person;
                self.sendToDept = val.dept;
                var method="user/sendUserNum",
                    param=JSON.stringify({
                        sendToPerson:self.sendToPerson.join(),
                        sendToDept:self.sendToDept.join()
                    }),
                    successd = function(res){
                        self.selectUserNo = res.data.data;
                    };
                self.$http(method,param,successd);
            },
            saveMuiban(){
                var self = this;
                self.TempletDetail.receiveStr = document.getElementById("receiveStr").innerText;
                var method="careTemplet/saveCareTemplet",
                    param=JSON.stringify({
                        'id':self.TempletDetail.id,
                        'content':self.TempletDetail.content,
                        'files':self.TempletDetail.files,
                        'type':self.ruleForm.region,
                        'receiveStr':self.TempletDetail.receiveStr,
                        'isSendTime':self.sendTimeShow?1:0,
                        'sendStr':self.qiyeNameShow?1:0,
                        'title':self.TempletDetail.title
                    }),
                    successd=function(res){
                        self.getCareTempletList();
                        self.getCareTempletDetail(res.data.data,self.TempletDetail.type);
                    };
                self.$http(method,param,successd);
            },
            resetCareTempletDetail(){
                var self = this;
                var method="careTemplet/getCareTempletDetail",
                    param=JSON.stringify({
                        id:self.TempletDetail.id,
                        type:self.TempletDetail.type,
                        isTemplet:self.TempletDetail.isTemplet
                    }),
                    successd = function(res) {
                        self.TempletDetail = res.data.data;
                    };
                self.$http(method,param,successd);
            },
            addCompanyCare(){
                var self = this;
                var method="care/addCompanyCare",
                    param=JSON.stringify({
                        type:self.ruleForm.region,
                        title:self.TempletDetail.title,
                        sendStr:self.qiyeNameShow?1:0,
                        isSendTime:self.sendTimeShow?1:0,
                        receiveStr:self.TempletDetail.receiveStr,
                        content:self.TempletDetail.content,
                        files:self.TempletDetail.files,
                        sendToPerson:self.sendToPerson.join(),
                        sendToDept:self.sendToDept.join(),
                        sendTime:self.radio==3?self.$date(self.value1):"",
                        sendType:self.radio==2?1:2
                    }),
                    successd=function(res){
                        self.$message({
                            message: '关怀发送成功',
                            type: 'success'
                        });
                        self.$router.push({path:'/manage/usercare'});
                    };
                self.$http(method,param,successd);
            },
            deleCareTemplet(id,isTemplet){
                var self = this;
                var method = "careTemplet/delCareTemplet",
                    param=JSON.stringify({
                        id:id,
                        isTemplet:isTemplet
                    }),
                    successd = function(res){
                        self.getCareTempletList();
                        self.TempletDetail= {
                            files:"",
                            sendStr:"亲爱的 : ",
                            content:'',
                            title:'',
                            receiveStr:'',
                            isSendTime:'',
                            id:''
                        }
                    };
                self.$http(method,param,successd);
            },
        },
         components: {
            treeComponent
        }
    }
</script>

<style>
#goCare .gocare_con{
    height: 577px;
    /*background-color: #bfcbd9;*/
    border: solid 1px #bfcbd9;
    margin-top: 30px;
}
#goCare .gocare_con_left{
    width: 45%;
    height: 100%;
    float: left
}
#goCare .gocare_con_right{
    /*width: 54%;*/
    height: 100%;
    margin-left: 45%;
    border-left: 1px solid #bfcbd9;
}
#goCare .gocare_form{margin-top: 20px;}
#goCare .gocare_muban{width: 300px;margin: 0 auto;height: 500px;border: 1px solid #ddd;overflow: auto;}
#goCare .avatar-uploader .el-upload {
    border: 1px dashed #bfcbd9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    margin: 10px auto;
    overflow: hidden;
    display: block;
    width: 260px;
}
#goCare .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
#goCare .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 235px;
    line-height: 235px;
    text-align: center;
}
#goCare .avatar {
    width: 100%;
    /*height: 178px;*/
    display: block;
}
#goCare #toolbar{
    height: 50px;
}
#goCare .ql-container.ql-snow{
    width: 50%;
    margin: 0 auto;
}
#goCare .gocare_content .el-textarea__inner{min-height: 120px;border:none;width: 260px;margin: 0 auto;padding: 0;}
#goCare .w260{width: 260px;margin: 0 auto;}
#goCare .text_algin_right{text-align: right;margin: 10px auto 0;}
#goCare .gocare_header{width: 90%;}
#goCare .gocare_btn{margin: 0 10px 10px 0;}
#goCare .gocare_querymuban{margin-bottom: 10px;}
#goCare .input-new-tag{width: auto;}
.gocare_mubanbtn{margin-left: 20px;padding: 20px 0;text-align: center;}
.gocare_muban_cankao{text-align: center;color: #99a9bf;}
</style>