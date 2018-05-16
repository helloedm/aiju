<template>
    <div id='oa_Notice' v-loading="loading" element-loading-text="拼命加载中">
        <el-tabs v-model="activeName" class="oa_common">
            <el-tab-pane label="我收到的" name="1">
                <ul>
                    <li v-for="list in inboxList" class="hrm_module">
                        <div @click="detailToggle(list.id,list)" style="cursor: pointer;">
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.userName != null?list.userName.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <!--<span class="oa_common_unread" v-if="list.isRead != '1'"></span>-->
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_span">{{list.userName}}</span>
                                    <el-tag type="primary" v-show="list.step==0" class="f_r">日报</el-tag>
                                    <span class="oa_common_msg_span oa_common_time oa_notice_createTime">{{list.createTime}} </span>
                                    <!--<span>发送人:<span class="oa_common_msg_con_span">{{list.recipientDept}}</span></span>-->
                                    <span class="oa_common_msg_span oa_common_time f_r">{{isRead[list.id][0]+"未读/"+(isRead[list.id][1]?isRead[list.id][1]:"0")+"已读"}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <!--<div class="oa_common_detail">
                                    <p class="oa_common_detail_label">公告签名</p>
                                    <p class="oa_common_detail_con">{{list.signature}}</p>
                                </div>-->
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">公告标题</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.title" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail"  v-show="detailShow==list.id">
                                    <p class="oa_common_detail_label">公告内容</p>
                                    <p class="oa_common_detail_con"><el-input type="textarea" class="oa_common_detail_textarea" v-model="list.content" autosize icon="none" readonly resize="none"></el-input></p>
                                </div>
                                <div class="oa_common_detail" v-show="detailShow==list.id">
                                    <ul v-for="file in list.fileList" class="oa_common_fileListImg">
                                        <li v-if="file.type == 'jpg' ||file.type == 'gif' || file.type == 'png'">
                                            <img :src="file.url" @click.stop="clickImg(file)">
                                        </li>
                                    </ul>
                                    <ul v-for="file in list.fileList" class="oa_common_fileList">
                                        <li v-if="!(file.type == 'jpg' || file.type == 'gif' || file.type == 'png')">
                                            <i class="el-icon-document"></i><span>{{file.fileName}}</span><a href="javascript:void(0);" @click.stop="downloadFile(file)">下载</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="stickAjax(list.id, list.isTop)" v-if="list.isTop==1" class="btn oa_common_btn"><i class="iconfont ff9948">&#xe615;</i>取消</el-button>
                                <el-button type="text" @click="stickAjax(list.id, list.isTop)" v-if="list.isTop==0" class="btn oa_common_btn"><i class="iconfont">&#xe615;</i>置顶</el-button>
                                <el-button type="text" @click="deleteAjax(list.id)" class="btn oa_common_btn" v-if="isDeal == 1"><i class="iconfont">&#xe6f2;</i>删除</el-button>
                            </div>
                        </div>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="inboxList.length == 0&&!inboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="inboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="prev, pager, next" :total="inboxPage.totalCount" @current-change="inboxAjax" v-if="inboxPage.totalCount||inboxPage.totalCount!=0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="新增公告" name="2" v-if="isDeal == 1">
                <div class="hrm_module">
                    <div class="hrm_module_con" style="padding-top: 32px;">
                        <el-form label-position="right" label-width="150px" :model="addForm" :rules="addRules" ref="addForm">
                            <!--<el-form-item label="公告签名" class="oa_common_form_input" prop="content" v-if="addForm.signature == 0">
                                <el-input type="text" style="width: 200px;" :rows="6" v-model="addForm.content"></el-input>
                            </el-form-item>-->
                            <el-form-item label="公告标题" class="oa_common_form_input" prop="title">
                                <el-input type="text" style="width: 600px;" :rows="6" v-model="addForm.title"></el-input>
                            </el-form-item>
                            <el-form-item label="公告内容" class="oa_common_form_input" prop="content">
                                <el-input type="textarea" style="width: 600px;" :rows="6" v-model="addForm.content"></el-input>
                            </el-form-item>
                            <el-form-item label="附件上传" class="oa_common_form_input">
                                <file-upload :param="param" @fileId="fileId" @deleFileId="deleFileId" :empty="empty"></file-upload>
                            </el-form-item>
                            <el-form-item label="接收人" class="oa_common_form_input" prop="recipientDept">
                                                                <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='1'></tree-component>
                            </el-form-item>
                            <el-form-item label="" class="oa_common_form_input">
                                <el-button @click="activeName='1';inboxAjax()">返回</el-button>
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
import Util from '../../script/util.js';
import replyComponent from '../reply.vue';
import treeComponent from '../tree.vue';
import fileUpload from '../fileUpload.vue';


export default {
    name: '',
    data() { 
        return {
            isDeal:0,
            inboxList: [],// 列表
            inboxPage:{},
            sentboxList: [],// 列表
            oaPage: 10,// 分页页数 1页10条数据
            activeName: '1',
            replyShow: 0,// 回复组件是否显示
            sceneType: 1,// 回复内容类型
            detailShow: 0, // 查看详情是否显示
            // 新增
            addForm: {
                title: '',
                content: '',
                recipientDept: '',
            },// 添加表单数据
            addRules: {
                title: [
                    { required: true, message: '请输入公告标题' },
                    { max: 100, message: '说明长度最多100个字符' }
                ],
                content: [
                    { required: true, message: '请输入公告内容' },
                    { max: 500, message: '说明长度最多500个字符' }
                ],
                recipientDept: [
                    { required: true, message: '请选择接收部门' },
                ],
            },
            treeBtnName: '请选择部门',
            loading: false,
            param:{
                    businessId:9,
                    fId:-1
                },
            fileIds:[],
            dialogFileImage:false,
            dialogImageUrl:'',
            isRead:{},
            empty:'',
            inboxListLoading:true,
        }
    },
    mounted: function () {
        this.inboxAjax();
        this.getContacts();
    },
    methods: {
        // 获取我收到的列表
        inboxAjax: function (pageNum) {
            var self = this;
            self.inboxListLoading = true;
            var method = 'announcement/getAnnouncements',
                param = JSON.stringify({
                    userId: 64660,
                    companyId: 61,
                    pageNum: pageNum?pageNum:1,
                    pageSize: 10,
                }),
                succeed = function (res) {
                    self.inboxList = res.data.data.announcements;
                    self.inboxPage = res.data.data.page;
                    self.isRead = res.data.data.isRead;
                    self.isDeal = res.data.data.isDeal;
                    for(var i=0;i<self.inboxList.length;i++){
                        self.inboxList[i].bgC = Util.noHeadImage[self.inboxList[i].lastLetter] || "";
                    }
                    self.inboxListLoading = false;
                };
            this.$http(method, param, succeed);
        },
        // 查看详情
        detailToggle: function (id,list) {
            if (this.detailShow == id) {
                this.detailShow = 0
            } else {
                this.detailShow = id;
                this.getAnnouncementId(id);
                list.isRead = 1;
            }
        },
        // 树组件赋值
        treeAssign(v) {
            this.addForm.recipientDept = v.join();
        },
        // 提交表单
        submitForm(addForm) {
            var self = this,file="";
            if(self.fileIds != []){
                file = self.fileIds.join();
            }
            // if(self.addForm.recipientDept !=[]){
            //     self.addForm.recipientDept = self.addForm.recipientDept.join();
            // }
            this.$refs[addForm].validate((valid) => {
                if (valid) {
                    var method = 'announcement/addAnnouncement',
                        param = JSON.stringify({
                            userId: 64660,
                            companyId: 61,
                            announcement: self.addForm,
                            fileIds: file,
                            from:"PC"
                        }),
                        succeed = function (res) {
                            self.addForm = {
                                title: '',
                                content: '',
                                recipientDept: '',
                            };
                            self.$refs[addForm].resetFields();
                            self.empty = self.empty+"1";
                            self.fileIds = [];
                            self.inboxAjax();
                            self.activeName = "1";
                        };
                    this.$http(method, param, succeed);
                }
            });
        },
        // 删除
        deleteAjax: function (id) {
            var self = this;
            var method = 'announcement/deleteAnnouncement',
                param = JSON.stringify({
                    id: id, 
                }),
                succeed = function (res) {
                    self.inboxAjax();
                    self.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                };
            this.$http(method, param, succeed);
        },
        // 置顶
        stickAjax: function (id,istop) {
            var self = this;
            var method = 'announcement/isTopAnnouncement',
                param = JSON.stringify({
                    isTop: istop==1?'0':'1',
                    announcementId: id, 
                }),
                succeed = function (res) {
                    self.inboxAjax();
                    self.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                };
            this.$http(method, param, succeed);
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
        getAnnouncementId(id){
            var method = "announcement/getAnnouncementId",
                param = JSON.stringify({
                    announcementId:id
                }),
                successd = function (res) {
                    
                };
            this.$http(method,param,successd);
        },
        //获取历史联系人
        getContacts(){
            var self = this;
            var method = "user/getContacts";
            var param = JSON.stringify({sceneType:1});
            var successd = function(res) {
                var dept = res.data.data.contactDept;
                var nameArr = [];
                var deptIds = [];
                dept.forEach(function(item){
                    nameArr.push(item.name);
                    deptIds.push(item.id);
                })
                if(nameArr.length != 0){
                    self.treeBtnName = nameArr.join();
                };
                self.addForm.recipientDept = deptIds.join(',');
            }
            self.$http(method,param,successd);
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
.oa_notice_createTime{margin-left: 20px;}
#oa_Notice{position: relative;}
.oa_Notice_num{position: absolute;top: 5px;left: 75px;width: 20px;height: 20px;border-radius: 10px;background-color: #d5080f;z-index: 999;color: #fff;text-align: center;line-height: 20px;font-size: 12px;}
</style>