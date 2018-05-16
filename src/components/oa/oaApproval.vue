<template>
    <div id='oaApproval'>
        <p class="oa_Report_num" v-if="waitNoRead != 0">{{waitNoRead}}</p>
        <el-tabs v-model="activeName" class="oa_common"  @tab-click="getList">
            <el-tab-pane label="我收到的" name="0">
                <ul>
                    <li v-for="list in inboxListData" class="hrm_module">
                        <div>
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.user.name != null?list.user.name.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.user.name}}</span>
                                    <el-tag type="primary" class="oa_common_msg_tag">{{list.stepText}}</el-tag>
                                    <span v-if="list.persons!=undefined" class="oa_common_msg_span">审批人：<span>{{list.persons}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail" v-if="list.flowType == 2">
                                    <p class="oa_common_detail_label">请假说明</p>
                                    <p class="oa_common_detail_con">{{list.content}}</p>
                                    <div>
                                        <el-table :data="list.vacationList" border>
                                            <el-table-column prop="vacationTypeStr" label="请假类型">
                                            </el-table-column>
                                            <el-table-column prop="startDate" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endDate" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="period" label="请假天数">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail" v-if="list.flowType == 3">
                                    <div>
                                        <el-table :data="list.reimburseList" border>
                                            <el-table-column prop="feeTypeStr" label="报销类型">
                                            </el-table-column>
                                            <el-table-column prop="remark" label="报销说明">
                                            </el-table-column>
                                            <el-table-column prop="fees" label="金额">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail" v-if="list.flowType == 4">
                                    <p class="oa_common_detail_label">申诉说明</p>
                                    <p class="oa_common_detail_con">{{list.content}}</p>
                                    <div>
                                        <el-table :data="list.signAppealList" border v-if="list.signAppealType == 3">
                                            <el-table-column prop="themeStr" label="申诉类型">
                                            </el-table-column>
                                            <el-table-column prop="startTime" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endTime" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="signAppealTypeStr" label="申诉理由">
                                            </el-table-column>
                                            <el-table-column prop="city" label="出差城市">
                                            </el-table-column>
                                        </el-table>
                                        <el-table :data="list.signAppealList" border v-else>
                                            <el-table-column prop="themeStr" label="申诉类型">
                                            </el-table-column>
                                            <el-table-column prop="startTime" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endTime" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="signAppealTypeStr" label="申诉理由">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">审批进程</p>
                                    <div class="oa_common_detail_con">
                                        <el-steps :space="100" :active="list.inboxApprovals" style="margin-top: 20px;">
                                            <el-step v-for="item in list.replyList" v-bind:title="item.agreeText" v-bind:description="item.receiveName"></el-step>
                                        </el-steps>
                                    </div>
                                </div>
                                <div class="oa_common_detail">
                                    <ul v-for="file in list.fileLists" class="oa_common_fileListImg">
                                        <li v-if="file.type == 'jpg' ||file.type == 'gif' || file.type == 'png'">
                                            <img :src="file.url" @click.stop="clickImg(file)">
                                        </li>
                                    </ul>
                                    <ul v-for="file in list.fileLists" class="oa_common_fileList">
                                        <li v-if="!(file.type == 'jpg' || file.type == 'gif' || file.type == 'png')">
                                            <i class="el-icon-document"></i><span>{{file.fileName}}</span><a href="javascript:void(0);" @click.stop="downloadFile(file)">下载</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id)" class="btn oa_common_btn" v-if="list.flowType != 4"><i class="iconfont">&#xe70d;</i>回复</el-button>

                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="inboxListData.length == 0&&!inboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="inboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="inboxListPage.totalCount" @current-change="inboxList" v-if="inboxListPage.totalCount||inboxListPage.totalCount !=0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我发送的" name="1">
                <ul>
                    <li v-for="list in sentboxListData" class="hrm_module">
                        <div>
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.user.name != null?list.user.name.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.user.name}}</span>
                                    <el-tag type="primary" class="oa_common_msg_tag">{{list.stepText}}</el-tag>
                                    <span v-if="list.persons!=undefined" class="oa_common_msg_span">审批人：<span>{{list.persons}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail" v-if="list.flowType == 2">
                                    <p class="oa_common_detail_label">请假说明</p>
                                    <p class="oa_common_detail_con">{{list.content}}</p>
                                    <div>
                                        <el-table :data="list.vacationList" border>
                                            <el-table-column prop="vacationTypeStr" label="请假类型">
                                            </el-table-column>
                                            <el-table-column prop="startDate" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endDate" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="period" label="请假天数">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail" v-if="list.flowType == 3">
                                    <div>
                                        <el-table :data="list.reimburseList" border>
                                            <el-table-column prop="feeTypeStr" label="报销类型">
                                            </el-table-column>
                                            <el-table-column prop="remark" label="报销说明">
                                            </el-table-column>
                                            <el-table-column prop="fees" label="金额">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail" v-if="list.flowType == 4">
                                    <p class="oa_common_detail_label">申诉说明</p>
                                    <p class="oa_common_detail_con">{{list.content}}</p>
                                    <div>
                                        <el-table :data="list.signAppealList" border v-if="list.signAppealType == 3">
                                            <el-table-column prop="themeStr" label="申诉类型">
                                            </el-table-column>
                                            <el-table-column prop="startTime" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endTime" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="signAppealTypeStr" label="申诉理由">
                                            </el-table-column>
                                            <el-table-column prop="city" label="出差城市">
                                            </el-table-column>
                                        </el-table>
                                        <el-table :data="list.signAppealList" border v-else>
                                            <el-table-column prop="themeStr" label="申诉类型">
                                            </el-table-column>
                                            <el-table-column prop="startTime" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endTime" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="signAppealTypeStr" label="申诉理由">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">审批进程</p>
                                    <div class="oa_common_detail_con">
                                        <el-steps :space="100" :active="list.sendboxApprovals" style="margin-top: 20px;">
                                            <el-step v-for="item in list.replyList" v-bind:title="item.agreeText" v-bind:description="item.receiveName"></el-step>
                                        </el-steps>
                                    </div>
                                </div>
                                <div class="oa_common_detail">
                                    <ul v-for="file in list.fileLists" class="oa_common_fileListImg">
                                        <li v-if="file.type == 'jpg' ||file.type == 'gif' || file.type == 'png'">
                                            <img :src="file.url" @click.stop="clickImg(file)">
                                        </li>
                                    </ul>
                                    <ul v-for="file in list.fileLists" class="oa_common_fileList">
                                        <li v-if="!(file.type == 'jpg' || file.type == 'gif' || file.type == 'png')">
                                            <i class="el-icon-document"></i><span>{{file.fileName}}</span><a href="javascript:void(0);" @click.stop="downloadFile(file)">下载</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id)" class="btn oa_common_btn" v-if="list.flowType != 4"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-button type="text" @click="oaRecall(list.id)" class="btn oa_common_btn" v-if="list.step == 1||list.step == 0"><i class="iconfont">&#xe633;</i>撤回</el-button>

                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="sentboxListData.length == 0&&!sentboxListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="sentboxListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="sentboxListPage.totalCount" @current-change="sentboxList" v-if="sentboxListPage.totalCount||sentboxListPage.totalCount != 0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待我审批" name="2">
                <ul>
                    <li v-for="list in waitListData" class="hrm_module">
                        <div>
                            <div class="oa_common_msg">
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-if="list.logo == null">{{list.user.name != null?list.user.name.slice(-2):"无名"}}</span>
                                <span class="oa_common_msg_header" :style="{backgroundColor:list.bgC}" v-else=""><img :src="list.logo" alt=""></span>
                                <div class="oa_common_msg_con">
                                    <span class="oa_common_msg_name">{{list.user.name}}</span>
                                    <el-tag type="primary" class="oa_common_msg_tag">{{list.stepText}}</el-tag>
                                    <span v-if="list.persons!=undefined" class="oa_common_msg_span">审批人：<span>{{list.persons}}</span></span>
                                    <span class="oa_common_msg_span oa_common_time f_r">{{list.createTime}} </span>
                                </div>
                            </div>
                            <div class="oa_common_con">
                                <div class="oa_common_detail" v-if="list.flowType == 2">
                                    <p class="oa_common_detail_label">请假说明</p>
                                    <p class="oa_common_detail_con">{{list.content}}</p>
                                    <div>
                                        <el-table :data="list.vacationList" border>
                                            <el-table-column prop="vacationTypeStr" label="请假类型">
                                            </el-table-column>
                                            <el-table-column prop="startDate" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endDate" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="period" label="请假天数">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail" v-if="list.flowType == 3">
                                    <div>
                                        <el-table :data="list.reimburseList" border>
                                            <el-table-column prop="feeTypeStr" label="报销类型">
                                            </el-table-column>
                                            <el-table-column prop="remark" label="报销说明">
                                            </el-table-column>
                                            <el-table-column prop="fees" label="金额">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail" v-if="list.flowType == 4">
                                    <p class="oa_common_detail_label">申诉说明</p>
                                    <p class="oa_common_detail_con">{{list.content}}</p>
                                    <div>
                                        <el-table :data="list.signAppealList" border v-if="list.signAppealType == 3">
                                            <el-table-column prop="themeStr" label="申诉类型">
                                            </el-table-column>
                                            <el-table-column prop="startTime" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endTime" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="signAppealTypeStr" label="申诉理由">
                                            </el-table-column>
                                            <el-table-column prop="city" label="出差城市">
                                            </el-table-column>
                                        </el-table>
                                        <el-table :data="list.signAppealList" border v-else>
                                            <el-table-column prop="themeStr" label="申诉类型">
                                            </el-table-column>
                                            <el-table-column prop="startTime" label="开始日期">
                                            </el-table-column>
                                            <el-table-column prop="endTime" label="结束日期">
                                            </el-table-column>
                                            <el-table-column prop="signAppealTypeStr" label="申诉理由">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div class="oa_common_detail">
                                    <p class="oa_common_detail_label">审批进程</p>
                                    <div class="oa_common_detail_con">
                                        <el-steps :space="100" :active="list.waitApprovals" style="margin-top: 20px;">
                                            <el-step v-for="item in list.replyList" v-bind:title="item.agreeText" v-bind:description="item.receiveName"></el-step>
                                        </el-steps>
                                    </div>
                                </div>
                                <div class="oa_common_detail">
                                    <ul v-for="file in list.fileLists" class="oa_common_fileListImg">
                                        <li v-if="file.type == 'jpg' ||file.type == 'gif' || file.type == 'png'">
                                            <img :src="file.url" @click.stop="clickImg(file)">
                                        </li>
                                    </ul>
                                    <ul v-for="file in list.fileLists" class="oa_common_fileList">
                                        <li v-if="!(file.type == 'jpg' || file.type == 'gif' || file.type == 'png')">
                                            <i class="el-icon-document"></i><span>{{file.fileName}}</span><a href="javascript:void(0);" @click.stop="downloadFile(file)">下载</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oa_common_reply clearfix">
                            <div class="oa_common_reply_main">
                                <el-button type="text" @click="replyClick(list.id)" class="btn oa_common_btn" v-if="list.flowType != 4"><i class="iconfont">&#xe70d;</i>回复</el-button>
                                <el-button type="text" @click="oaAgree(list.id,2)" class="btn oa_common_btn"><i class="iconfont">&#xe6f2;</i>拒绝</el-button>
                                <el-button type="text" @click="oaAgree(list.id,1)" class="btn oa_common_btn"><i class="iconfont">&#xe72d;</i>同意</el-button>
                            </div>
                        </div>
                        <!--回复组件-->
                        <reply-component v-if="replyShow==list.id" v-bind:replyid="list.id" v-bind:scenetype="sceneType" v-bind:userId="list.userId"></reply-component>
                    </li>
                    <li class="hrm_module oa_model_none" v-show="waitListData.length == 0&&!waitListLoading">暂无数据</li>
                    <li class="hrm_module oa_model_none" v-show="waitListLoading">加载中....</li>
                </ul>
                <div class="oa_common_page">
                    <el-pagination layout="total, prev, pager, next" :total="waitListPage.totalCount" @current-change="waitList" v-if="waitListPage.totalCount || waitListPage.totalCount != 0"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="新增审批" name="3">
                <div class="hrm_module">
                    <div class="hrm_module_con" style="padding-top: 32px;">
                        <el-form label-position="right" label-width="100px" :model="addForm" :rules="addRules" ref="addForm">
                            <el-form-item label="审批类型" class="oa_common_form_input">
                                <el-radio class="radio" v-model="addForm.flowType" label="2"> 请假单</el-radio>
                                <el-radio class="radio" v-model="addForm.flowType" label="3">报销单</el-radio>
                            </el-form-item>
                            <el-form-item label="请假类型" class="oa_common_form_input" prop="vacationType" v-if="addForm.flowType == 2">
                                <el-select v-model="addForm.vacationType" placeholder="请选择" style="width: 200px;">
                                    <el-option v-for="item in leaveType" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开始日期" class="oa_common_form_input" prop="startDate" v-if="addForm.flowType == 2">
                                <el-date-picker type="date" placeholder="选择日期" style="width: 200px;" v-model="addForm.startDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束日期" class="oa_common_form_input" prop="expireDate" v-if="addForm.flowType == 2">
                                <el-date-picker type="date" placeholder="选择日期" style="width: 200px;" v-model="addForm.endDate"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="请假天数" class="oa_common_form_input" prop="period" v-if="addForm.flowType == 2">
                                <el-input type="age" style="width: 200px;" :rows="6" v-model.number="addForm.period"></el-input>
                            </el-form-item>
                            <el-form-item label="请假说明" class="oa_common_form_input leaveThat" prop="content" v-if="addForm.flowType == 2">
                                <el-input type="textarea" style="width: 600px;" :rows="6" v-model="addForm.content"></el-input>
                            </el-form-item>
                            <div v-for="(multipleItem, index) in addForm.multiple" v-if="addForm.flowType == 3" class="clearfix">
                                <el-form-item :label="'报销类型'" :key="'multiple.'+index+'.feeType'" :prop="'multiple.'+index+'.feeType'" :rules="[{ required: true, message: '请选择报销类型', trigger: 'change'}]" style="width: 300px;float: left;">
                                    <el-select v-model="multipleItem.feeType" placeholder="请选择">
                                        <el-option v-for="item in reimbursedType" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="'报销金额'" :key="'multiple.'+index+'.fees'" :prop="'multiple.'+index+'.fees'" :rules="[{required: true, message: '请输入正确的报销金额'},{type:'number',message:'报销金额必须为数字'}]" style="width: 300px;float: left;">
                                    <el-input type="" v-model.number="multipleItem.fees" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item :label="'报销说明'" :key="'multiple.'+index+'.remark'" :prop="'multiple.'+index+'.remark'" :rules="[{required: true, message: '请输入正确的报销说明', trigger: 'blur'}]" style="width: 300px;float: left;">
                                    <el-input type="" v-model="multipleItem.remark"></el-input>
                                </el-form-item>
                                <el-button @click="removeDomain(multipleItem)" style="margin-left: 20px;" v-if="index!=0">删除</el-button>
                            </div>
                            </el-form>
                            <el-form label-width="100px">
                            <el-form-item label="附件上传" class="oa_common_form_input">
                                <file-upload :param="param" @fileId="fileId" @deleFileId="deleFileId" :empty="empty"></file-upload>
                            </el-form-item>


                            <el-form-item label="审批人" class="oa_common_form_input" prop="sendToPerson">
                                <tree-component @treeOrderAssign="treeOrderAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='2'></tree-component>
                            </el-form-item>
                            <el-form-item label="" class="oa_common_form_input">
                                <el-button @click="activeName='0';inboxList();">返回</el-button>
                                <el-button type="primary" @click="addMultiple" v-if="addForm.flowType == 3">新增</el-button>
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


    export default {
        name: '',
        data() {
            return {
                inboxListData: [],
                inboxListPage: {},

                sentboxListData: [],
                sentboxListPage: {},

                waitListData: [],
                waitListPage: {},

                activeName: '2',
                replyShow: 0,// 回复组件是否显示
                sceneType: 3,// 回复内容类型
                detailShow: 0, // 查看详情是否显示

                // 新增
                leaveType: [
                    { value: '1', label: '事假' },
                    { value: '2', label: '病假' },
                    { value: '3', label: '调休' },
                    { value: '4', label: '年休假' },
                    { value: '5', label: '婚假' },
                    { value: '6', label: '生育假' },
                    { value: '7', label: '丧假' },
                    { value: '8', label: '加班' },
                    { value: '9', label: '外勤' },
                    { value: '10', label: '出差' },
                    { value: '11', label: '其他' },
                ],// 请假类型
                reimbursedType: [
                    
                    { value: '1', label: '招待费' },
                    { value: '2', label: '交通费' },
                    { value: '3', label: '住宿费' },
                    { value: '4', label: '办公费' },
                    { value: '5', label: '通讯费' },
                    { value: '6', label: '补贴费' },
                    { value: '7', label: '其他' },
                ],// 请假类型
                addForm: {
                    flowType: '2',// 审批类型
                    content: '',// 请假说明
                    sendToPerson: '',// 审批人
                    vacationType: '',// 请假类型
                    startDate: '',// 开始时间
                    endDate: '',// 结束时间
                    period: '',// 天数
                    multiple: [
                        {
                            feeType: '',// 报销类型
                            fees: '',// 报销金额
                            remark: '',// 报销说明
                        },
                    ]
                },// 添加表单数据
                addRules: {
                    content: [
                        { max: 100, message: '说明长度最多100个字符' }
                    ],
                    remark: [
                        { max: 100, message: '说明长度最多100个字符' }
                    ],
                    vacationType: [
                        { required: true, message: '请选择请假类型' },
                    ],
                    startDate: [
                        { required: true, message: '请选择开始日期' },
                    ],
                    endDate: [
                        { required: true, message: '请选择结束日期' },
                    ],
                    period: [
                        { required: true, message: '天数不能为空' },
                        { type: 'number', message: '天数必须为数字值' }
                    ],
                    fees: [
                        { required: true, message: '报销金额不能为空' },
                        { type: 'number', message: '报销金额必须为数字值' }
                    ],
                    feeType: [
                        { required: true, message: '请选择请假类型' },
                    ],
                    sendToPerson: [
                        { required: true, message: '请选择审批人' },
                    ]
                },

                treeBtnName: '请选择员工',
                param:{
                    businessId:9,
                    fId:-1
                },
                fileIds:[],
                dialogFileImage:false,
                dialogImageUrl:'',
                temporarySendToPerson:[],
                temporarySendToPersonName:[],
                inboxApprovals:1,
                sendboxApprovals:1,
                waitApprovals:1,
                waitNoRead:0,
                empty:'',
                inboxListLoading:true,
                waitListLoading:true,
                sentboxListLoading:true,
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
                var method = 'flowInfo/getFlowInfoList',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        type: 1
                    }),
                    succeed = function (res) {
                        self.inboxListData = res.data.data.result;
                        self.inboxListPage = res.data.data.page;
                        for(var i=0;i<self.inboxListData.length;i++){
                            self.inboxListData[i].bgC = Util.noHeadImage[self.inboxListData[i].lastLetter] || "";
                            var replyList = self.inboxListData[i].replyList;
                            self.inboxListData[i].inboxApprovals = 1;
                            for(var k=0;k<replyList.length;k++){
                                if(replyList[k].isAgree == 1 || replyList[k].isAgree == 2){
                                    self.inboxListData[i].inboxApprovals = k+1;
                                }
                            }
                        }
                        self.inboxListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 获取我发送的列表
            sentboxList: function (pageNum) {
                var self = this;
                self.sentboxListLoading = true;
                var method = 'flowInfo/getFlowInfoList',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        type: 2
                    }),
                    succeed = function (res) {
                        self.sentboxListData = res.data.data.result;
                        self.sentboxListPage = res.data.data.page;
                        for(var i=0;i<self.sentboxListData.length;i++){
                            self.sentboxListData[i].bgC = Util.noHeadImage[self.sentboxListData[i].lastLetter] || "";
                            var replyList = self.sentboxListData[i].replyList;
                            self.sentboxListData[i].sendboxApprovals = 1;
                            for(var k=0;k<replyList.length;k++){
                                if(replyList[k].isAgree == 1){
                                    self.sentboxListData[i].sendboxApprovals = k+1;
                                }
                            }
                        }
                        self.sentboxListLoading = false;
                    };
                this.$http(method, param, succeed);
            },
            // 获取待我执行的列表
            waitList: function (pageNum) {
                var self = this;
                self.waitListLoading = true;
                var method = 'flowInfo/getFlowInfoList',
                    param = JSON.stringify({
                        userId: 64660,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        type: 3
                    }),
                    succeed = function (res) {
                        self.waitListData = res.data.data.result;
                        self.waitListPage = res.data.data.page;
                        for(var i=0;i<self.waitListData.length;i++){
                            self.waitListData[i].bgC = Util.noHeadImage[self.waitListData[i].lastLetter] || "";
                            var replyList = self.waitListData[i].replyList;
                            self.waitListData[i].waitApprovals = 1;
                            for(var k=0;k<replyList.length;k++){
                                if(replyList[k].isAgree == 1){
                                    self.waitListData[i].waitApprovals = k+1;
                                }
                            }
                        };
                        self.waitNoRead = res.data.data.result.length;
                        if(self.waitNoRead > 99){
                            self.waitNoRead = "99+";
                        }
                        self.waitListLoading = false;
                    };
                this.$http(method, param, succeed);
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
            treeOrderAssign(v) {
                var _this = this;
                if (v.checked) {
                    _this.temporarySendToPerson.push(v.id);
                    _this.temporarySendToPersonName.push(v.name);
                } else {
                    for(var i=0;i<_this.temporarySendToPerson.length;i++){
                        if(_this.temporarySendToPerson[i] ==v.id){
                            _this.temporarySendToPerson.splice(i,1);
                            _this.temporarySendToPersonName.splice(i,1);
                        }
                    }
                }
                _this.addForm.sendToPerson = _this.temporarySendToPerson.join(',');
                _this.btnName = _this.temporarySendToPersonName.join();
            },
            addMultiple: function () {
                this.addForm.multiple.push({
                    feeType: '',// 报销类型
                    fees: '',// 报销金额
                    remark: '',// 报销说明
                });
                
            },
            removeDomain(item) {
                    var index = this.addForm.multiple.indexOf(item)
                    if (index !== -1) {
                        this.addForm.multiple.splice(index, 1)
                    }
                },
            // 提交表单
            submitForm(formName) {
                var self = this,file="";
                if(self.fileIds !=[]){
                   file = self.fileIds.join();
                }
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (self.addForm.flowType == 2) {
                            var param = JSON.stringify({
                                companyId: 61,
                                userId: 64660,
                                from:"PC",
                                flowInfo: {
                                    flowType: self.addForm.flowType,
                                    content: self.addForm.content,
                                    sendToPerson: self.addForm.sendToPerson,
                                    "file":file
                                },
                                multiple: [
                                    {
                                        vacationType: self.addForm.vacationType,
                                        startDate: this.$date(self.addForm.startDate),
                                        endDate: this.$date(self.addForm.endDate),
                                        period: self.addForm.period
                                    }
                                ]
                            })
                        } else if (self.addForm.flowType == 3) {
                            var param = JSON.stringify({
                                companyId: 61,
                                userId: 64660,
                                from:"PC",
                                flowInfo: {
                                    flowType: self.addForm.flowType,
                                    sendToPerson: self.addForm.sendToPerson,
                                    "file":file
                                },
                                multiple: self.addForm.multiple
                            })
                        }

                        var method = 'flowInfo/addFlowInfo',

                            succeed = function (res) {
                                self.$message({
                                    message: '发送审批成功!',
                                    type: 'success'
                                });
                                self.sentboxList();
                                self.activeName = '1'
                                self.$refs[formName].resetFields();
                                self.empty=self.empty+"1";
                                self.fileIds=[];
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
                    var method = 'flowInfo/withdrawFlowInfo',
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
            // 同意or拒绝
            oaAgree: function (id, isAgree) {
                var self = this;
                var method = 'flowInfo/dealFlowInfo',
                    param = JSON.stringify({
                        pid: id,
                        sceneType: 3,
                        isAgree: isAgree,

                    }),
                    succeed = function (res) {
                        self.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        self.waitList();
                    };
                self.$http(method, param, succeed);
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
            getList(tab,event){
                if (tab.name == 0) {
                    this.inboxList();
                } else if(tab.name == 1){
                    this.sentboxList();
                }else if(tab.name == 2){
                    this.waitList();
                }else if(tab.name == 3){
                    //location.href = "https://aijuhr.com/dist/#/oa/approval?add1";
                }
            },
            getUrlGoDo(){
                var self = this;
                var hash = location.hash;
                if(hash == "#/oa/approval?add1"){//请假
                    self.activeName = "3";
                    self.addForm.flowType = "2";
                }else if(hash == "#/oa/approval?add2"){//报销
                    self.activeName = "3";
                    self.addForm.flowType = "3";
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
                        self.treeBtnName = nameArr.join();
                        console.log(self.treeBtnName);
                    };
                    self.addForm.sendToPerson = personIds.join(',');
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

 #oaApproval{position: relative;}
.oa_Report_num{position: absolute;top: 5px;left: 250px;width: 20px;height: 20px;border-radius: 10px;background-color: #d5080f;z-index: 999;color: #fff;text-align: center;line-height: 20px;font-size: 12px;}
.oa_Report_num{position: absolute;top: 5px;left: 240px;width: 20px;height: 20px;border-radius: 10px;background-color: #d5080f;z-index: 999;color: #fff;text-align: center;line-height: 20px;font-size: 12px;}
#oaApproval .leaveThat{margin-bottom: 20px;}
</style>