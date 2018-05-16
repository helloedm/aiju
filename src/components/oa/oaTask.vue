<template>
    <div id='oaReport'>
        <p class="oa_Report_num" v-if="waitNoRead != 0">{{waitNoRead}}</p>
        <el-tabs v-model="activeName" class="oa_common" @tab-click="getList">
            <el-tab-pane label="我收到的" name="0">
                <ul>
                    <li v-for="list in inboxListData" class="hrm_module">
                        <div @click="detailToggle(list.id,list.step)" style="cursor: pointer;">
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.userName != null?list.userName.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.userName}}</span>
                                    <el-tag type="primary" v-show="list.step==0&&list.isForward==0" class="oa_common_msg_tag">待处理</el-tag>
                                    <el-tag type="success" v-show="list.step==1&&list.isForward==0" class="oa_common_msg_tag">处理中</el-tag>
                                    <el-tag type="danger" v-show="list.step==2&&list.isForward==0" class="oa_common_msg_tag">已完成</el-tag>
                                    <el-tag type="danger" v-show="list.step==3&&list.isForward==0" class="oa_common_msg_tag">已撤回</el-tag>
                                    <el-tag type="danger" v-show="list.step==4&&list.isForward==0" class="oa_common_msg_tag">已过期</el-tag>
                                    <el-tag type="danger" v-show="list.isForward==1" class="oa_common_msg_tag">已转发</el-tag>
                                    <span class="oa_common_msg_span">接收人：<span class="">{{list.sendToPersonName}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">任务标题</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.title" autosize icon="none"   resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">任务内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">开始时间</p>
                                    <p class="oa_common_detail_con">{{list.startDate}}</p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">结束时间</p>
                                    <p class="oa_common_detail_con">{{list.expireDate}}</p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">任务进程</p>
                                    <div class="oa_common_detail_con">
                                        <el-steps :space="100" :active="100" style="margin-top: 20px;">
                                            <el-step v-for="item in historyLogList" v-bind:title="item.forward" v-bind:description="item.userName"></el-step>
                                        </el-steps>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id)" class="btn oa_common_btn"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-button type="text" class="btn oa_common_btn" v-if="list.step==0" @click="startTask(list.id,list.step)"><i class="iconfont">&#xe718; </i> 开始</el-button>
                                <el-button type="text" class="btn oa_common_btn" v-if="list.step==1"><i class="iconfont" @click="finishTask(list.id)">&#xe72d; </i> 完成</el-button>
                                <el-button type="text" class="btn changeTask oa_common_btn" v-if="list.step==0||list.step==1" @click="changeTask(list.id)"><i class="iconfont">&#xe61f; </i> 转发
                                   <tree-component @treeOrderAssign="changeTaskEmp" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2' :tree-position="left" class="changeTask_btn"></tree-component>
                                </el-button>
                                <!--<el-tooltip placement="top" effect="light">
                                    <div slot="content">
                                        <span v-for="like in list.likePersons">{{like.name}}</span>
                                    </div>
                                    <el-button type="text" class="btn" @click="likeAjax(list.id,list.likePersons)" v-if="list.isLike"><i class="iconfont">&#xe7ee;</i>取消点赞</el-button>
                                    <el-button type="text" class="btn" @click="likeAjax(list.id,list.likePersons)" v-else><i class="iconfont">&#xe60e;</i>点赞</el-button>
                                </el-tooltip>-->
                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="inboxListData.length == 0&&!inboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="inboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="inboxListPage.totalCount" @current-change="inboxList" v-if="inboxListPage.totalCount||inboxListPage.totalCount!=0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我发送的" name="1">
                 <ul>
                    <li v-for="list in sentboxListData" class="hrm_module">
                        <div @click="detailToggle(list.id,list.step)" style="cursor: pointer;">
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.userName != null?list.userName.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.userName}}</span>
                                    <el-tag type="primary" v-show="list.step==0" class="oa_common_msg_tag">待处理</el-tag>
                                    <el-tag type="success" v-show="list.step==1" class="oa_common_msg_tag">处理中</el-tag>
                                    <el-tag type="danger" v-show="list.step==2" class="oa_common_msg_tag">已完成</el-tag>
                                    <el-tag type="danger" v-show="list.step==3" class="oa_common_msg_tag">已撤回</el-tag>
                                    <el-tag type="danger" v-show="list.step==4" class="oa_common_msg_tag">已过期</el-tag>
                                    <span class="oa_common_msg_span">接收人：<span class="">{{list.sendToPersonName}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">任务标题</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.title" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">任务内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">开始时间</p>
                                    <p class="oa_common_detail_con">{{list.startDate}}</p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">结束时间</p>
                                    <p class="oa_common_detail_con">{{list.expireDate}}</p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">任务进程</p>
                                    <div class="oa_common_detail_con">
                                        <el-steps :space="100" :active="100" style="margin-top: 20px;">
                                            <el-step v-for="item in historyLogList" v-bind:title="item.forward" v-bind:description="item.userName"></el-step>
                                        </el-steps>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id)" class="btn oa_common_btn"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-button type="text" class="btn oa_common_btn" v-if="list.step ==0" @click="oaRecall(list.id)"><i class="iconfont">&#xe633; </i> 撤回</el-button>
                                <!--<el-tooltip placement="top" effect="light">
                                    <div slot="content">
                                        <span v-for="like in list.likePersons">{{like.name}}</span>
                                    </div>
                                    <el-button type="text" class="btn" @click="likeAjax(list.id,list.likePersons)" v-if="list.isLike"><i class="iconfont">&#xe7ee;</i>取消点赞</el-button>
                                    <el-button type="text" class="btn" @click="likeAjax(list.id,list.likePersons)" v-else><i class="iconfont">&#xe60e;</i>点赞</el-button>
                                </el-tooltip>-->
                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="sentboxListData.length == 0&&!sentboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="sentboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="sentboxListPage.totalCount" @current-change="sentboxList" v-if="sentboxListPage.totalCount||sentboxListPage.totalCount!=0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待我执行" name="2">
                <ul>
                    <li v-for="list in waitListData" class="hrm_module">
                        <div @click="detailToggle(list.id,list.step)" style="cursor: pointer;">
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.userName != null?list.userName.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.userName}}</span>
                                    <el-tag type="primary" v-show="list.step==0" class="oa_common_msg_tag">待处理</el-tag>
                                    <el-tag type="success" v-show="list.step==1" class="oa_common_msg_tag">处理中</el-tag>
                                    <el-tag type="danger" v-show="list.step==2" class="oa_common_msg_tag">已完成</el-tag>
                                    <el-tag type="danger" v-show="list.step==3" class="oa_common_msg_tag">已撤回</el-tag>
                                    <el-tag type="danger" v-show="list.step==4" class="oa_common_msg_tag">已过期</el-tag>
                                    <span class="oa_common_msg_span">接收人：<span class="">{{list.sendToPersonName}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">任务标题</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.title" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">任务内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">开始时间</p>
                                    <p class="oa_common_detail_con">{{list.startDate}}</p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">结束时间</p>
                                    <p class="oa_common_detail_con">{{list.expireDate}}</p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">任务进程</p>
                                    <div class="oa_common_detail_con">
                                        <el-steps :space="100" :active="100" style="margin-top: 20px;">
                                            <el-step v-for="item in historyLogList" v-bind:title="item.forward" v-bind:description="item.userName"></el-step>
                                        </el-steps>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id)" class="btn oa_common_btn"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-button type="text" class="btn oa_common_btn" v-if="list.step==1" @click="finishTask(list.id)"><i class="iconfont">&#xe72d; </i> 完成</el-button>
                                <el-button type="text" class="btn oa_common_btn" v-if="list.step==0" @click="startTask(list.id,list.step)"><i class="iconfont">&#xe718; </i> 开始</el-button>
                                <el-button type="text" class="btn changeTask oa_common_btn" v-if="list.step==0||list.step==1" @click="changeTask(list.id)"><i class="iconfont">&#xe61f; </i> 转发
                                   <tree-component @treeOrderAssign="changeTaskEmp" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2' :tree-position="left" class="changeTask_btn"></tree-component>
                                </el-button>
                                <!--<el-tooltip placement="top" effect="light">
                                    <div slot="content">
                                        <span v-for="like in list.likePersons">{{like.name}}</span>
                                    </div>
                                    <el-button type="text" class="btn" @click="likeAjax(list.id,list.likePersons)" v-if="list.isLike"><i class="iconfont">&#xe7ee;</i>取消点赞</el-button>
                                    <el-button type="text" class="btn" @click="likeAjax(list.id,list.likePersons)" v-else><i class="iconfont">&#xe60e;</i>点赞</el-button>
                                </el-tooltip>-->
                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="waitListData.length == 0&&!waitListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="waitListLoading">暂无数据</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="waitListPage.totalCount" @current-change="waitList" v-if="waitListPage.totalCount||waitListPage.totalCount!=0"></el-pagination>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="新增任务" name="3">
                <div class="hrm_module">
                    <div class="hrm_module_con" style="padding-top: 32px;">
                        <el-form label-position="right" label-width="150px" :model="addForm" :rules="addRules" ref="addForm">
                            <el-form-item label="任务标题" class="oa_common_form_input" prop="title">
                                <el-input type="" v-model="addForm.title" style="width: 600px;"></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述" class="oa_common_form_input" prop="content">
                                <el-input type="textarea" style="width: 600px;" :rows="4" v-model="addForm.content" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="开始日期" class="oa_common_form_input" prop="startDate" >
                                <el-date-picker type="datetime" placeholder="选择日期" style="width: 200px;" v-model="addForm.startDate" :picker-options="pickerOptions0"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束日期" class="oa_common_form_input" prop="expireDate" >
                                <el-date-picker type="datetime" placeholder="选择日期" style="width: 200px;" v-model="addForm.expireDate" :picker-options="pickerOptions0"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="执行人" class="oa_common_form_input" prop="sendToPerson">
                                   <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2'></tree-component>
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
    </div>
</template>

<script>
    import replyComponent from '../reply.vue';
    import treeComponent from '../tree.vue';

    export default {
        data() {
            return {
                treeBtnName: "请选择人员",

                inboxListData: [],
                inboxListPage: {},

                sentboxListData: [],
                sentboxListPage: {},

                waitListData: [],
                waitListPage: {},


                activeName: '2',
                replyShow: 0,// 回复组件是否显示
                sceneType: 2,// 回复内容类型
                detailShow: 0, // 查看详情是否显示
                // 新增
                reportType: [
                    {
                        value: '0',
                        label: '日报'
                    }, {
                        value: '1',
                        label: '周报'
                    }, {
                        value: '2',
                        label: '月报'
                    }
                ],// 类型
                addForm: {
                    title: '',
                    content: '',
                    startDate: '',
                    expireDate: '',
                    sendToPerson: '',
                },// 添加表单数据
                addRules: {
                    title: [{ required: true, message: '请输入任务标题' }],
                    content: [{ required: true, message: '请输入任务内容' }],
                    startDate: [{ required: true, message: '请选择开始日期' }],
                    expireDate: [{ required: true, message: '请选择结束日期' }],
                    sendToPerson: [{ required: true, message: '请选择联系人' }],
                },
                left:'left',
                changeTaskId:'',//暂存转发Id
                historyLogList:[],
                waitNoRead:0,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                inboxListLoading:true,
                sentboxListLoading:true,
                waitListLoading:true,
            }
        },
        mounted: function () {
            this.waitList();
            this.getUrlGoDo();
            this.getContacts();
        },
        methods: {
            // 获取我收到的列表
            inboxList: function (pageNum) {
                var self = this;
                self.inboxListLoading = true;
                var method = 'taskInfo/getTaskInfos',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        type: 1
                    }),
                    succeed = function (res) {
                        self.inboxListData = res.data.data.task;
                        self.inboxListPage = res.data.data.page;
                        for(var i=0;i<self.inboxListData.length;i++){
                            self.inboxListData[i].bgC = Util.noHeadImage[self.inboxListData[i].lastLetter] || "";
                        }
                        self.inboxListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 获取我发送的列表
            sentboxList: function (pageNum) {
                var self = this;
                self.sentboxListLoading = true;
                var method = 'taskInfo/getTaskInfos',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        type: 2
                    }),
                    succeed = function (res) {
                        self.sentboxListData = res.data.data.task;
                        self.sentboxListPage = res.data.data.page;
                        for(var i=0;i<self.sentboxListPage.length;i++){
                            self.sentboxListPage[i].bgC = Util.noHeadImage[self.sentboxListPage[i].lastLetter] || "";
                        }
                        self.sentboxListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 获取待我执行列表
            waitList: function (pageNum) {
                var self = this;
                self.waitListLoading = true;
                var method = 'taskInfo/getTaskInfos',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        type: 3
                    }),
                    succeed = function (res) {
                        self.waitListData = res.data.data.task;
                        self.waitListPage = res.data.data.page;
                        for(var i=0;i<self.waitListData.length;i++){
                            self.waitListData[i].bgC = Util.noHeadImage[self.waitListData[i].lastLetter] || "";
                        }
                        self.waitNoRead = res.data.data.task.length;
                        if(self.waitNoRead > 99){
                            self.waitNoRead = "99+";
                        }
                        self.waitListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 查看详情
            detailToggle: function (id,type) {
                if (this.detailShow == id) {
                    this.detailShow = 0
                } else {
                    var _this = this;
                    var method = "taskInfo/getTaskInfoById";
                    var param = JSON.stringify({id:id,type:type});
                    var successd = function (res) {
                        _this.historyLogList = res.data.data.historyLogList;
                        _this.detailShow = id;
                    }
                    _this.$http(method,param,successd);
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
                this.addForm.sendToPerson = v[0];
            },
            // 提交表单
            submitForm(formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'taskInfo/addTaskInfos',
                            param = JSON.stringify({
                                companyId:61,
                                userId:64660,
                                taskInfo:{
                                    title: self.addForm.title,
                                    content: self.addForm.content,
                                    startDate: self.addForm.startDate,
                                    expireDate: self.addForm.expireDate,
                                    sendToPerson: self.addForm.sendToPerson
                                },
                                from:"PC"
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '发送任务成功!',
                                    type: 'success'
                                });
                                self.sentboxList();
                                self.activeName = '1'
                                self.$refs[formName].resetFields();
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
                    var method = 'taskInfo/withdrawTaskInfos',
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
            startTask(id,step){
                var _this = this;
                _this.$confirm('您确定要开始此任务', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    var method = "taskInfo/startDealTask",
                        param = JSON.stringify({
                            taskId:id,
                            taskStep:step
                        }),
                        successd = function (res) {
                            _this.$message({
                                message:"操作成功",
                                type:"success"
                            });
                            _this.waitList();
                            _this.activeName = '2';
                        }
                    _this.$http(method,param,successd);
                }).catch(() => {
                });
            },
            finishTask(id){
                var _this = this;
                _this.$confirm('您确定要完成此任务', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    var method = "taskInfo/finishTaskInfos",
                        param = JSON.stringify({
                            id:id
                        }),
                        successd = function (res) {
                            _this.$message({
                                message:"操作成功",
                                type:"success"
                            });
                            _this.inboxList();
                            _this.activeName = '0';
                        }
                    _this.$http(method,param,successd);
                }).catch(() => {
                });
            },
            //转发任务
            changeTask(id){
                this.changeTaskId = id;
            },
            changeTaskEmp(emp){//接受转发人ID
                var _this = this;
                if (emp.checked) {
                     _this.$confirm('您确定要转发此任务给'+emp.name, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                    var method = "taskInfo/changeTaskInfos",
                        param = JSON.stringify({
                            id:_this.changeTaskId,
                            empId:emp.id
                        }),
                        successd = function (res) {
                            _this.$message({
                                message:"操作成功",
                                type:"success"
                            });
                            if (_this.activeName == 0) {
                                _this.inboxList();
                            } else {
                                _this.waitList();
                            }
                        }
                    _this.$http(method,param,successd);
                }).catch(() => {
                });
                } else {
                    return;
                }
            },
            getList(tab,event){
                if (tab.name == 0) {
                    this.inboxList();
                } else if(tab.name == 1){
                    this.sentboxList();
                }else if(tab.name == 2){
                    this.waitList();
                }else if(tab.name == 3){
                    
                }
            },
            getUrlGoDo(){
                var self = this;
                var hash = location.hash;
                if(hash == "#/oa/task?add"){
                    self.activeName = "3";
                }
            },
            //获取历史联系人
            getContacts(){
                var self = this;
                var method = "user/getContacts";
                var param = JSON.stringify({sceneType:3});
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
                        self.treeBtnName = nameArr[0];
                    };
                    self.addForm.sendToPerson = personIds[0];
                }
                self.$http(method,param,successd);
            }
        },
        components: {
            replyComponent,
            treeComponent
        }
    }

</script>

<style scoped>
    .add_filter {
        margin-bottom: 10px;
    }
    .changeTask{position: relative;overflow: hidden;}
    .changeTask .changeTask_btn{position: absolute;top: 0;left: 0;opacity: 0;}
    #oaReport{position: relative;}
    .oa_Report_num{position: absolute;top: 5px;left: 250px;width: 20px;height: 20px;border-radius: 10px;background-color: #d5080f;z-index: 999;color: #fff;text-align: center;line-height: 20px;font-size: 12px;}
</style>