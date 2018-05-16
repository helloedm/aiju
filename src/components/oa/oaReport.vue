<template>
    <div id='oaReport'>
        <p class="oa_Report_num" v-if="inboxNoRead != 0">{{inboxNoRead}}</p>
        <el-tabs v-model="activeName" class="oa_common" @tab-click="getList">
            <el-tab-pane label="我收到的" name="0">
                <ul>
                    <li v-for="list in inboxListData" class="hrm_module">
                        <div @click="detailToggle(list.id,list)" style="cursor: pointer;">
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.userName != null?list.userName.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else><img :src="list.logo" alt=""></span>
                                <span class="oa_common_unread" v-if="list.isRead == '0'"></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.userName}}</span>
                                    <el-tag type="primary" v-show="list.workReportType==1||list.workReportType==0" class="oa_common_msg_tag">日报</el-tag>
                                    <el-tag type="success" v-show="list.workReportType==2" class="oa_common_msg_tag">周报</el-tag>
                                    <el-tag type="danger" v-show="list.workReportType==3" class="oa_common_msg_tag">月报</el-tag>
                                    <span v-if="list.depts!=undefined" class="oa_common_msg_span">接收部门：<span class="">{{list.depts}}</span></span>
                                    <span v-if="list.persons!=undefined" class="oa_common_msg_span">接收人：<span class="">{{list.persons}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail clearfix">
                                    <p class="oa_common_detail_label" v-show="list.workReportType==1||list.workReportType==0">今天工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==2">本周工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==3">本月工作内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content.sum_con" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail clearfix" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label" v-show="list.workReportType==1||list.workReportType==0">明天工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==2">下周工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==3">下月工作内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content.play_con" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail clearfix" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">工作心得体会</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content.learnt_con" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail clearfix" v-show="detailShow==list.id">
                                    <ul v-for="file in list.fileInfos" class="oa_common_fileListImg">
                                        <li v-if="file.type == 'jpg' ||file.type == 'gif' || file.type == 'png'">
                                            <img :src="file.url" @click.stop="clickImg(file)">
                                        </li>
                                    </ul>
                                    <ul v-for="file in list.fileInfos" class="oa_common_fileList">
                                        <li v-if="!(file.type == 'jpg' || file.type == 'gif' || file.type == 'png')">
                                            <i class="el-icon-document"></i><span>{{file.fileName}}</span><a href="javascript:void(0);" @click.stop="downloadFile(file)">下载</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id,list)" class="btn oa_common_btn"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-tooltip placement="bottom" effect="light" :disabled="list.likePersons.length ==0 ? true:false">
                                    <div slot="content">
                                        <span v-for="like in list.likePersons">{{like.name}}</span>
                                    </div>
                                    <el-button type="text" class="btn oa_common_btn" @click="likeAjax(list.id,list.likeId,list)" v-if="list.likeId != 0"><i class="iconfont ff9948">&#xe707;</i>取消</el-button>
                                    <el-button type="text" class="btn oa_common_btn" @click="likeAjax(list.id,list.likeId,list)" v-else><i class="iconfont">&#xe707;</i>点赞</el-button>
                                </el-tooltip>
                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="inboxListData.length == 0 && !inboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="inboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="inboxListPage.totalCount" @current-change="inboxList" v-if="inboxListPage.totalCount != 0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我发送的" name="1">
                <ul>
                    <li v-for="list in sentboxListData" class="hrm_module">
                        <div @click="detailToggle(list.id,list)" style="cursor: pointer;">
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.userName != null?list.userName.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.userName}}</span>
                                    <el-tag type="primary" v-show="list.workReportType==1||list.workReportType==0" class="oa_common_msg_tag">日报</el-tag>
                                    <el-tag type="success" v-show="list.workReportType==2" class="oa_common_msg_tag">周报</el-tag>
                                    <el-tag type="danger" v-show="list.workReportType==3" class="oa_common_msg_tag">月报</el-tag>
                                    <span v-if="list.depts!=undefined" class="oa_common_msg_span">接收部门：<span class="">{{list.depts}}</span></span>
                                    <span v-if="list.persons!=undefined" class="oa_common_msg_span">接收人：<span class="">{{list.persons}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail clearfix">
                                    <p class="oa_common_detail_label" v-show="list.workReportType==1||list.workReportType==0">今天工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==2">本周工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==3">本月工作内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content.sum_con" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail clearfix" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label" v-show="list.workReportType==1||list.workReportType==0">明天工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==2">下周工作内容</p>
                                    <p class="oa_common_detail_label" v-show="list.workReportType==3">下月工作内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content.play_con" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail clearfix" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">工作心得体会</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content.learnt_con" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail clearfix" v-show="detailShow==list.id">
                                    <ul v-for="file in list.fileInfos" class="oa_common_fileListImg">
                                        <li v-if="file.type == 'jpg' ||file.type == 'gif' || file.type == 'png'">
                                            <img :src="file.url" @click.stop="clickImg(file)">
                                            <!--<img src="http://pic.58pic.com/58pic/13/61/00/61a58PICtPr_1024.jpg" @click.stop="clickImg(file)">-->
                                        </li>
                                    </ul>
                                    <ul v-for="file in list.fileInfos" class="oa_common_fileList">
                                        <li v-if="!(file.type == 'jpg' || file.type == 'gif' || file.type == 'png')">
                                            <i class="el-icon-document"></i><span>{{file.fileName}}</span><a href="javascript:void(0);" @click.stop="downloadFile(file)">下载</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id,list)" class="btn oa_common_btn"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-tooltip placement="bottom" effect="light" :disabled="list.likePersons.length ==0 ? true:false">
                                    <div slot="content">
                                        <span v-for="like in list.likePersons">{{like.name}}</span>
                                    </div>
                                    <el-button type="text" class="btn oa_common_btn" @click="likeAjax(list.id,list.likeId,list)" v-if="list.likeId != 0"><i class="iconfont ff9948">&#xe707;</i>取消</el-button>
                                    <el-button type="text" class="btn oa_common_btn" @click="likeAjax(list.id,list.likeId,list)" v-else><i class="iconfont">&#xe707;</i>点赞</el-button>
                                </el-tooltip>
                                <el-button type="text" @click="oaRecall(list.id)" class="btn oa_common_btn"><i class="iconfont">&#xe633;</i>撤回</el-button>
                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="sentboxListData.length == 0 && !sentboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="sentboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="sentboxListPage.totalCount" @current-change="sentboxList" v-if="sentboxListPage.totalCount != 0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="新增工作汇报" name="2">
                <div class="hrm_module">
                    <div class="hrm_module_con" style="padding-top: 32px;">
                        <el-form label-position="right" label-width="150px" :model="addForm" :rules="addRules" ref="addForm">
                            <el-form-item label="工作汇报类型" class="oa_common_form_input" prop="workLogType">
                                <el-select v-model="addForm.workLogType" placeholder="请选择" @change="changeWorkLogType">
                                    <el-option v-for="item in reportType" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="workContent.today" class="oa_common_form_input">
                                <el-input type="textarea" style="width: 600px;" :rows="4" v-model="addForm.sum_con" placeholder="" @blur="saveDraft" @change="changeDraft"></el-input>
                            </el-form-item>
                            <el-form-item :label="workContent.next" class="oa_common_form_input" prop="play_con">
                                 <el-input type="textarea" style="width: 600px;" :rows="4" v-model="addForm.play_con" placeholder="" @blur="saveDraft" @change="changeDraft"></el-input>
                            </el-form-item>
                            <el-form-item :label="workContent.learnt" class="oa_common_form_input" prop="learnt_con">
                                <el-input type="textarea" style="width: 600px;" :rows="4" v-model="addForm.learnt_con" placeholder="" @blur="saveDraft" @change="changeDraft"></el-input>
                            </el-form-item>
                            <el-form-item label="附件上传" class="oa_common_form_input">
                                <file-upload :param="param" @fileId="fileId" @deleFileId="deleFileId" :file-list-edit = "fileListEdit" :empty="empty"></file-upload>
                            </el-form-item>
                            <el-form-item label="接收人" class="oa_common_form_input">
                                <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='0'></tree-component>
                            </el-form-item>
                            <el-form-item label="" class="oa_common_form_input">
                                <el-button @click="activeName='0';inboxList();">返回</el-button>
                                <el-button type="primary" @click="submitForm('addForm')">发送</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--图片预览弹窗-->
        <el-dialog :visible.sync="dialogFileImage" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import replyComponent from '../reply.vue';
    import treeComponent from '../tree.vue';
    import fileUpload from '../fileUpload.vue';
    import Util from "../../script/util.js";
import { setTimeout } from 'timers';

    export default {
        data() {
            return {
                treeBtnName: "请选择部门或人员",

                inboxListData: [],
                inboxListPage: {
                    totalCount:"0"
                },

                sentboxListData: [],
                sentboxListPage: {
                    totalCount:"0"
                },

                activeName: '0',
                replyShow: 0,// 回复组件是否显示
                sceneType: 1,// 回复内容类型
                detailShow: 0, // 查看详情是否显示
                // 新增
                reportType: [
                    {
                        value: '1',
                        label: '日报'
                    }, {
                        value: '2',
                        label: '周报'
                    }, {
                        value: '3',
                        label: '月报'
                    }
                ],// 类型
                workContent:{
                    today:"今日工作总结",
                    next:'明日工作计划',
                    learnt:'工作心得体会'
                },
                addForm: {
                    workLogType: '',// 工作汇报类型
                    sum_con: '',
                    play_con: '',
                    learnt_con: '',
                    fileIds: '',
                    sendToPerson: '',
                    sendToDept: '',

                },// 添加表单数据
                addRules: {
                    workLogType: [{ required: true, message: '请选择工作汇报类型' }],
                    todayCon: [{ max: 500, message: '长度最多500个字符' }],
                    tomorrowCon: [{ max: 500, message: '长度最多500个字符' }],
                    feelCon: [{ max: 500, message: '长度最多500个字符' }],
                    // sum_con:[{required:true,message:"请输入今日工作总结",trigger:'blur'}]
                },

                param:{
                    businessId:6,
                    fId:-1
                },
                fileIds:[],
                dialogFileImage:false,
                dialogImageUrl:'',
                inboxNoRead:0,
                fileListEdit:[],
                empty:"",
                inboxListLoading:true,
                sentboxListLoading:true,
                draftId:null,//草稿Id
                timer:null,//定时保存
            }
        },
        mounted: function () {
            this.inboxList();
            this.getUrlGoDo();
            this.getContacts();
        },
        methods: {
            // 获取我收到的列表
            inboxList: function (pageNum) {
                var self = this;
                self.inboxListLoading = true;
                var method = 'workReport/getWorkReportList',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        from: 'PC',
                        type: 2
                    }),
                    succeed = function (res) {
                        self.inboxListData = res.data.data.result;
                        self.inboxListPage = res.data.data.page;
                        for(var i=0;i<self.inboxListData.length;i++){
                            self.inboxListData[i].bgC = Util.noHeadImage[self.inboxListData[i].lastLetter] || "";
                        }
                        self.inboxNoRead = res.data.data.unReadNum;
                        if(self.inboxNoRead>99){
                            self.inboxNoRead = "99+";
                        }
                        self.inboxListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 获取我发送的列表
            sentboxList: function (pageNum) {
                var self = this;
                self.sentboxListLoading = true;
                var method = 'workReport/getWorkReportList',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        from: 'PC',
                        type: 1
                    }),
                    succeed = function (res) {
                        self.sentboxListData = res.data.data.result;
                        self.sentboxListPage = res.data.data.page;
                        for(var i=0;i<self.sentboxListPage.length;i++){
                            self.sentboxListPage[i].bgC = Util.noHeadImage[self.sentboxListPage[i].lastLetter] || "";
                        }
                        self.sentboxListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 查看详情
            detailToggle: function (id,list) {
                if (this.detailShow == id) {
                    this.detailShow = 0
                     this.replyShow = 0;
                } else {
                    this.detailShow = id;
                     this.setRead(id,list);
                    list.isRead = 1;
                    this.replyShow = id;
                }
            },
            // 查看回复
            replyClick: function (id) {
                if (this.replyShow == id) {
                    this.replyShow = 0;
                } else {
                    this.replyShow = id;
                }
            },
            // 树组件赋值
            treeAssign(v) {
                this.addForm.sendToDept = v.dept.join(',');
                this.addForm.sendToPerson = v.person.join(',');
            },
            // 提交表单
            submitForm(formName) {
                var self = this;
                var fileIds = "";
                if(self.fileIds !=[]){
                    fileIds = self.fileIds.join();
                }
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'workReport/saveWorkReport',
                            param = JSON.stringify({
                                companyId: 61,
                                userId: 64660,
                                draftId: self.draftId,
                                workLogType: self.addForm.workLogType,
                                content: {
                                    sum_con: self.addForm.sum_con,
                                    play_con: self.addForm.play_con,
                                    learnt_con: self.addForm.learnt_con
                                },
                                fileIds: fileIds,
                                sendToPerson: self.addForm.sendToPerson,
                                sendToDept: self.addForm.sendToDept,
                                from:"PC"
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '发送工作汇报成功!',
                                    type: 'success'
                                });
                                self.sentboxList();
                                self.activeName = '1'
                                self.$refs[formName].resetFields();
                                self.empty =self.empty+"1";
                                self.fileIds = [];
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 撤回
            oaRecall: function (id) {
                this.$confirm('此操作将撤回该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'workReport/withdrawReport',
                        param = JSON.stringify({
                            id: id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '撤回成功',
                                type: 'success'
                            });
                            self.sentboxList();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            fileId(id){
                this.fileIds.push(id);
            },
            deleFileId(id){
                var _this = this;
                for(var i=0;i<_this.fileIds.length;i++){
                    if(_this.fileIds[i] == id){
                        _this.fileIds.splice(i,1);
                    }
                }
            },
            clickImg(file){
                this.dialogImageUrl =file.url;
                this.dialogFileImage = true;
            },
            downloadFile(file){
                var param = {
                    "isTemplate":0,
                    "id":file.id
                }
                this.$download(JSON.stringify(param));
            },
            likeAjax(id,likeId,list){
                var _this = this;
                var method = "workReport/changeLike";
                var param = JSON.stringify({
                    likeId:likeId,
                    id:id
                });
                var successd = function (res) {
                    _this.inboxList();
                    _this.sentboxList();
                };
                _this.$http(method,param,successd);

            },
            getList(tab,event){
                let self=this;
                if (tab.name == 0) {
                    self.inboxList();
                    clearInterval(self.timer);
                } else if(tab.name == 1){
                    self.sentboxList();
                    clearInterval(self.timer);
                }else if(tab.name == 2){
                    self.addForm.workLogType='1'
                }
            },
            //标记已读
            setRead(id,list){
                var _this = this;
                var method = "workReport/updateReadStatus";
                var param = JSON.stringify({
                    "id":id
                });
                var successd = function(res) {
                    //_this.inboxList(_this.inboxListPage.pageNum);
                    if(list.isRead !=1){
                        self.inboxNoRead--;
                    }
                }
                _this.$http(method,param,successd);
            },
            getUrlGoDo(){
                var self = this;
                var hash = location.hash;
                if(hash == "#/oa/report?add1"){//新增工作汇报
                    self.activeName = "2";
                    self.addForm.workLogType = "1";
                    self.getDraft('1');
                }else if(hash == "#/oa/report?add2"){
                    self.activeName = "2";
                    self.addForm.workLogType = "2";
                    self.getDraft('2');
                }
            },
            changeWorkLogType(val){
                if (val == 3) {
                    this.workContent={
                        today:"本月工作总结",
                        next:'下月工作计划',
                        learnt:'工作心得体会'
                    };
                } else if(val == 2){
                     this.workContent={
                        today:"本周工作总结",
                        next:'下周工作计划',
                        learnt:'工作心得体会'
                    };
                }else{
                    this.workContent={
                        today:"今日工作总结",
                        next:'明日工作计划',
                        learnt:'工作心得体会'
                    };
                }
                this.getDraft(val);

            },
            getDraft(val){//获取草稿
                let self=this;
                let method="workReport/getDraft",
                    param=JSON.stringify({
                        sceneType:1,
                        subType:val,
                    }),
                    successd=function(res){
                        if(res.data.data.haveDraft==1){
                            self.draftId=res.data.data.draft.id;
                            let content=JSON.parse(res.data.data.draft.content);
                            self.addForm.sum_con=content.sum_con;
                            self.addForm.play_con=content.play_con;
                            self.addForm.learnt_con=content.learnt_con;
                        }else{
                            self.draftId=null;
                            self.addForm.sum_con='';
                            self.addForm.play_con='';
                            self.addForm.learnt_con='';
                        }
                        if(!self.timer){
                            self.timer=setTimeout(function(){
                                self.saveDraft();
                                self.timer=null;
                            },5000);
                        }
                    };
                if(val){
                    self.$http(method,param,successd);
                }
            },
            //获取历史联系人
            getContacts(){
                var self = this;
                var method = "user/getContacts";
                var param = JSON.stringify({sceneType:1});
                var successd = function(res) {
                    var dept = res.data.data.contactDept;
                    var person = res.data.data.contactUser;
                    var nameArr = [];
                    var deptIds = [],personIds = [];
                    dept.forEach(function(item){
                        nameArr.push(item.name);
                        deptIds.push(item.id);
                    })
                    person.forEach(function(item) {
                        nameArr.push(item.name);
                        personIds.push(item.id);
                    })
                    if(nameArr.length != 0){
                        self.treeBtnName = nameArr.join();
                    };
                    self.addForm.sendToDept = deptIds.join(',');
                    self.addForm.sendToPerson = personIds.join(',');
                }
                self.$http(method,param,successd);
            },
            saveDraft(){//保存草稿
                let self=this;
                let method="workReport/saveDraft",
                    param=JSON.stringify({
                        sceneType:1,
                        subType:self.addForm.workLogType,
                        draftId:self.draftId,
                        content:JSON.stringify({
                            sum_con: self.addForm.sum_con,
                            play_con: self.addForm.play_con,
                            learnt_con: self.addForm.learnt_con
                        })
                    }),
                    successd=function(res){
                        self.draftId=res.data.data.draftId;
                    };
                self.$http(method,param,successd);
            },
            changeDraft(){
                let self=this;
                if(!this.timer){
                    self.timer=setTimeout(function(){
                        self.saveDraft();
                        self.timer=null;
                    },5000)
                }
            }

        },
        components: {
            replyComponent,
            treeComponent,
            fileUpload
        }
    }

</script>

<style scoped>
    .add_filter {
        margin-bottom: 10px;
    }
    #oaReport{position: relative;}
    .oa_Report_num{position: absolute;top: 5px;left: 75px;width: 20px;height: 20px;border-radius: 10px;background-color: #d5080f;z-index: 999;color: #fff;text-align: center;line-height: 20px;font-size: 12px;}
</style>
