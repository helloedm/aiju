<template>
  <dl class="hrm_module" id="newRe">
    <div class="btn_top">
      <el-button type="text" @click="uploadResumeShow=true;"><i class="iconfont hrm_btn_icon">&#xe648;</i>上传简历</el-button>
      <el-button type="text" @click="channelSet()"><i class="iconfont hrm_btn_icon">&#xe84d;</i>渠道导入</el-button>
      <el-button type="text" @click="emailToLead()"><i class="iconfont hrm_btn_icon">&#xe676;</i>邮箱导入简历</el-button>
    </div>
    <dt class="hrm_module_btn">
      <el-button type="danger" @click="giveup" :disabled="resumeCheckboxNum ==0"><i class="iconfont hrm_btn_icon">&#xe612;</i>放弃</el-button>
      <el-button type="primary" @click="notice" :disabled="resumeCheckboxNum !=1"><i class="iconfont hrm_btn_icon">&#xe613;</i>面试通知</el-button>
      <el-button type="primary" @click="downloadResume" :disabled="resumeCheckboxNum !=1"><i class="iconfont hrm_btn_icon">&#xe649;</i>下载</el-button>
      <el-button type="primary" @click="moveToSpareRepo" :disabled="resumeCheckboxNum !=1"><i class="iconfont hrm_btn_icon">&#xe64d;</i>移入备选库</el-button>
      <!-- <el-button type="primary" @click="hrConfirmResume" :disabled="!(resumeCheckboxNum ==1 && resumeCheckboxObj.isDisplay==1)"><i class="iconfont hrm_btn_icon">&#xe64d;</i>确认有效</el-button> -->
      <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':gjSearchCon}"></i></el-button>
      <el-input
      placeholder="输入工作年限、应聘职位、学历等搜索"
      style="z-index:9;"
      icon="search"
      v-model="keyWord"
      class="search_newResume"
      @keyup.enter.native="getqueryNewOrSpareRepo()"
      @blur="getqueryNewOrSpareRepo()">
      </el-input>
    </dt>
    <dd class="hrm_module_search" v-show="gjSearchCon">
      <el-form :model="form" label-width="100px" class="clearfix">
        <div class="clearfix">
          <el-form-item label="性别" class="" style="float:left;margin-bottom:10px;">
            <el-radio class="radio" v-model="form.sex" label="3">不限</el-radio>
            <el-radio class="radio" v-model="form.sex" label="1">男</el-radio>
            <el-radio class="radio" v-model="form.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="简历状态" class="float_left">
            <el-checkbox-group v-model="form.resumeStatus">
              <el-checkbox label="1">已读</el-checkbox>
              <el-checkbox label="0">未读</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <el-form-item label="来源渠道">
          <el-checkbox-group v-model="form.resumeFrom">
            <el-checkbox :label="item.value" v-for="item in source" :key="item.vlaue">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="clearfix">
          <el-form-item label="工作年限" style="float:left;margin-bottom:10px;">
            <el-select v-model="form.workYearLow" placeholder="最低" @change="changeWorkYear('min')">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form.workYearHigh" placeholder="最高" @change="changeWorkYear('max')">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最高学历" style="float:left;margin-bottom:10px;">
            <el-select v-model="form.educationLev" placeholder="最高学历">
              <el-option label="博士后" value="1"></el-option>
              <el-option label="博士" value="2"></el-option>
              <el-option label="硕士" value="3"></el-option>
              <el-option label="本科" value="4"></el-option>
              <el-option label="大专" value="5"></el-option>
              <el-option label="其他" value="6"></el-option>
              <el-option label="985/211" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应聘时间" style="float:left;margin-bottom:10px;">
            <el-select v-model="form.interviewTimeType" placeholder="应聘时间">
              <el-option label="今天" value="0"></el-option>
              <el-option label="一周内" value="1"></el-option>
              <el-option label="两周内" value="2"></el-option>
              <el-option label="一月内" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="gjSearch">搜索</el-button>
          <el-button @click="chongzhi">重置</el-button>
        </el-form-item>
      </el-form>
    </dd>
    <dd class="hrm_module_con">
      <el-table
      :data="tableData"
      border
      @selection-change="dutyCheckList"
      :row-style="rowStyle"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="left"
        class-name="text-align-left"
        width="100">
        <template scope="scope">
          <span class="isRead" v-if="scope.row.isRead=='-'"></span>
          <span><img :src="scope.row.headImg" alt="头像" @click="resume(scope.row.id)" style="cursor: pointer;width:25px;height:25px;border-radius:50%;overflow:hidden;vertical-align:middle;"></span>
          <el-button type="text" @click="resume(scope.row.id)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="workYearStr"
        label="工作年限">
      </el-table-column>
      <el-table-column
        prop="eduStr"
        width="80"
        label="学历">
      </el-table-column>
      <el-table-column
        prop="positionName"
        :show-overflow-tooltip='true'
        label="应聘职位">
      </el-table-column>
      <el-table-column
        prop="sexStr"
        width="80"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="graduateSchool"
        :show-overflow-tooltip='true'
        label="毕业学校">
      </el-table-column>
      <el-table-column
        prop="date"
        :show-overflow-tooltip='true'
        label="应聘时间">
      </el-table-column>
      <!-- <el-table-column
        prop="importWayStr"
        :show-overflow-tooltip='true'
        label="导入方式">
      </el-table-column>
      <el-table-column
        prop="resumeFormStr"
        :show-overflow-tooltip='true'
        label="渠道">
      </el-table-column> -->
      <el-table-column
        prop="resumeFormStr"
        :show-overflow-tooltip='true'
        label="简历来源">
        <template scope="scope">
          <span>{{scope.row.resumeFormStr}}</span>
          <el-tooltip class="item" effect="dark" :content="scope.row.shareNickname" placement="top" v-if="scope.row.isDisplay==1">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip='true'
        label="操作">
        <template scope="scope">
          <el-button type="text" v-if="scope.row.isDisplay==1&&scope.row.processStaus!=17" @click="hrConfirmResume(scope.row.id)">审核</el-button>
          <span v-if="scope.row.isDisplay==1&&scope.row.processStaus==17">已审核</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="page.totalCount>0"
      class="margin_t_20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount">
    </el-pagination>

      <el-dialog title="上传简历" :visible.sync="uploadResumeShow">
        <el-form label-width="80px">
          <el-form-item label="上传方式">
            <el-radio class="radio" v-model="uploadmore" label="1">单份上传</el-radio>
            <el-radio class="radio" v-model="uploadmore" label="2">批量上传</el-radio>
          </el-form-item>
          <!-- <el-form-item label="简历来源">
            <el-select v-model="sourceVal" placeholder="请选择">
              <el-option
                v-for="item in source"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="选择文件">
            <el-upload
              v-if="uploadmore==1"
              class="upload-demo"
              :action="util.uploadURLForCommon"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :on-success="successed"
              :data="params"
              :multiple="false"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">请点击按钮上传，文件大小不能超过5M</div>
            </el-upload>
            <el-upload
              v-if="uploadmore==2"
              class="upload-demo"
              :action="util.uploadURLForCommon"
              :on-remove="handleRemove2"
              :on-success="successed2"
              :data="params"
              :multiple="true"
              :file-list="fileList2">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">请点击按钮上传，文件大小不能超过5M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="员工姓名" v-if="sourceVal==4">
            <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2' style="display:inline-block"></tree-component>
            <el-input v-model="recommendPhone" class="w200" disabled=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadResumeShow = false">取 消</el-button>
          <el-button type="primary" @click="uploadResume" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </div>
      </el-dialog>

    <el-dialog title="渠道导入" size="tiny" :visible.sync="channelSetShow">
      <el-table
        ref="multipleTable"
        :data="platformList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          :selectable="checkSelectable"
          width="55">
        </el-table-column>
        <el-table-column
          label="渠道名称"
          prop="platformName">
        </el-table-column>
      </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="channelSetShow = false">取 消</el-button>
          <el-button type="primary" @click="channelExport()">导入</el-button>
        </div>
      </el-dialog>

      <el-dialog title="邮箱导入" size="tiny" :visible.sync="emailToleadShow">
      <el-table
        :data="emailList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="emailToleadShowChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email">
        </el-table-column>
      </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="emailToleadShow = false">取 消</el-button>
          <el-button type="primary" @click="emailToleadShowExport()">导入</el-button>
        </div>
      </el-dialog>


      <el-dialog title="放弃" :visible.sync="giveUpShow" size="tiny">
        <div class="giveup_personal">
          <span class="margin_l_20">{{baseInfoList[0]?baseInfoList[0].name:''}} </span>
          <span class="margin_l_20">{{baseInfoList[0]?baseInfoList[0].positionName:''}} </span>
          <span class="margin_l_20">{{baseInfoList[0]?baseInfoList[0].phone:''}} </span>
        </div>
        <el-checkbox v-model="baseInfo.isSendEmail" v-for="baseInfo in baseInfoList" :key="baseInfo.id">向{{baseInfo.name}}（{{baseInfo.email}}）发送通知</el-checkbox>
        <el-form>
          <el-form-item label="简历移至企业人才库:" label-width="150px">
            <el-radio class="radio" v-model="giveupObj.intervewerRepo" label="1">人才储备</el-radio>
            <el-radio class="radio" v-model="giveupObj.intervewerRepo" label="2">淘汰库</el-radio>
          </el-form-item>
          <el-form-item label="放弃原因" label-width="80px">
            <el-select v-model="giveupObj.interviewerRejectReasonId" placeholder="请选择" @change="changeEliminateReason">
              <el-option
                v-for="item in eliminateReason"
                :key="item.id"
                :label="item.eliminateReason"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明" label-width="80px">
            <el-input type="textarea" v-model="giveupObj.eliminateReason"></el-input>
          </el-form-item>
          <el-form-item label="标签" label-width="80px">
            <el-button size="small" v-for="tag in tags" :key="tag.id" :class="{'el-button--primary':tag.isShow==1}" @click="tag.isShow==1?tag.isShow=0:tag.isShow=1" class="resume_tag">
              {{tag.name}}
              <i class="iconfont resume_dele" @click.stop="deleTag(tag.id)" v-if="tag.isDefaultTag!=1">&#xe612;</i>
            </el-button>
            <el-button size="small" type="warning" @click="addtagShow=true">添加</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="giveUpShow = false">取 消</el-button>
          <el-button type="primary" @click="giveupSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加标签" size="tiny" :visible.sync="addtagShow">
        <el-form>
          <el-form-item label="标签名字" label-width="80px">
            <el-input v-model="addtagName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addtagShow = false">取 消</el-button>
          <el-button type="primary" @click="addtag">确 定</el-button>
        </div>
      </el-dialog>
      <!-- boss直聘验证码 -->
      <el-dialog title="请输入验证码" size="tiny" :visible.sync="bossReg">
        <el-form>
          <el-form-item>
              <img style="text-align:center;" :src="bossCode"/>
            <el-input v-model="vcode" placeholder="请输入验证码">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bossReg = false">取 消</el-button>
          <el-button type="primary" @click="bossCodeReg">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 展示多份上传之后的反馈 -->
      <el-dialog title="上传结果" size="tiny" :visible.sync="moreUpShow">
        <div>上传失败{{moreUpCount}}个</div>
        <p v-for="item in moreUpList" :key="item.fileName">{{item.fileName}}</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="moreUpShow = false">取 消</el-button>
          <el-button type="primary" @click="moreUpShow=false">确 定</el-button>
        </div>
      </el-dialog>
    </dd>
  </dl>
</template>

<script>
import treeComponent from '../tree.vue';
import util from 'script/util.js';
import md5 from 'js-md5';
export default {
  name:'newResume',
  data(){
    return{
      bossReg: false,
      bossCode: '',
      randomKey: '',
      vcode: '',
      emailList: [],
      emailToleadShow: false,//邮箱导入
      channelSetShow: false,//渠道导入弹窗
      multipleSelection: [],
      channelSetArr:[],
      platformList: [],
      multipleSelectionArr:[],
      treeBtnName: "选择人员",
      recommendPhone:'',
      gjSearchCon:false,
      keyWord:'',
      tableData:[],
      page:{
        pageSize:10,
        pageNum:1,
        totalCount:0,
      },
      form:{
        sex:'',
        resumeStatus:[],
        resumeFrom:[],
        interviewTimeType:'',
        educationLev:'',
        workYearHigh:'',
        workYearLow:'',
      },
      options:[
        {value: '0',label: '应届'},
        {value: '1',label: '一年'},
        {value: '2',label: '两年'},
        {value: '3',label: '三年'},
        {value: '4',label: '四年'},
        {value: '5',label: '五年'},
        {value: '6',label: '六年'},
        {value: '7',label: '七年'},
        {value: '8',label: '八年'},
        {value: '9',label: '九年'},
        {value: '10',label: '十年'},
      ],
      options2:[
        {value: '0',label: '应届'},
        {value: '1',label: '一年'},
        {value: '2',label: '两年'},
        {value: '3',label: '三年'},
        {value: '4',label: '四年'},
        {value: '5',label: '五年'},
        {value: '6',label: '六年'},
        {value: '7',label: '七年'},
        {value: '8',label: '八年'},
        {value: '9',label: '九年'},
        {value: '10',label: '十年'},
        {value: '11',label: '不限'},
      ],
      source:[
        {value:'1',label:'前程无忧'},
        {value:'2',label:'智联招聘'},
        {value:'3',label:'中华英才网'},
        {value:'4',label:'58同城'},
        {value:'5',label:'大街网'},
        {value:'6',label:'拉勾'},
        {value:'7',label:'boss直聘'},
        {value:'8',label:'猎聘'},
        {value:'10',label:'手动上传'},
        {value:'11',label:'邮箱导入'},
        {value:'13',label:'赶集网'},
        {value:'14',label:'人才捕手'},
        {value:'15',label:'企业内推'},
        {value:'17',label:'招聘官网'},
        {value:'18',label:'小程序'},
        {value:'19',label:'微官网'},
        {value:'20',label:'微活动'},
        {value:'16',label:'其他'}
        ],
      uploadResumeShow:false,
      util:util,
      fileList:[],
      fileList2:[],
      fileIds:[],
      fileIds2:[],
      params:{
        param:JSON.stringify({businessId:14,fId:-1}),
        sign:md5('method'+"fileUpload/insertFileRecord"+"param"+JSON.stringify({businessId:14,fId:-1})+"ecbao")
      },
      sourceVal:'',
      uploadmore:'1',
      recommendId:'',

      giveUpShow:false,
      resumeCheckboxObj:{},
      resumeCheckboxArr:[],
      resumeCheckboxNum:0,
      eliminateReason:[],
      baseInfo:{},
      tags:[],
      giveupObj:{
        interviewerId:'',
        isSendEmail:'',
        interviewerRejectReasonId:'',
        eliminateReason:'',
        tagIds:[],
        intervewerRepo:'',
        quitList:[],
      },

      addtagName:'',
      addtagShow:false,

      // isDisplay:0,//是否展示 操作 确认有效 1 表示显示 0表示不显示
      fullscreenLoading:false,//全局loading
      moreUpShow:false,
      moreUpCount:0,
      moreUpList:[],
      baseInfoList:[],
      eliminateReasonList:[],
    }
  },
  mounted(){
    this.qryPlatformList();
    this.qrybindingEmailList();
    if(this.$route.query.interviewerIds){
      this.intoNewResumeStorehouse();
    }else{
      this.getqueryNewOrSpareRepo();
    }
  },
  methods:{
    checkSelectable(row) {
      console.log(row)
      console.log('row')
      return row.click
    },
    qrybindingEmailList(){//获取绑定邮箱列表
        let method = 'platform/qrybindingEmailList',
        params = {},
        callBack = (res)=>{
          this.emailList = res.data.data;
        }
        this.$webHttp(method, params, callBack);
    },
    qryPlatformList(){//获取绑定平台列表
      let method = 'platform/qryPlatformList',
        param = {},
        callBack = res=>{
          console.log(res.data.data)
          this.platformList = res.data.data;

        }
        this.$webHttp(method, param, callBack);
    },
    synchronizeResume(){
        let method = 'platform/synchronizeResume',
        param = {
          typeList: this.multipleSelectionArr
        },
        callBack = res=>{
          if(res.data.data != null && res.data.data.code == '1001'){
              this.bossReg = true;
              this.bossCode = res.data.data.vcode;
              this.randomKey = res.data.data.randomKey;
          }else{
            this.$message({
              message: res.data.message + ',请勿重复操作',
              type: 'success'
            });
          }
        }
        this.$webHttp(method, param, callBack);
    },
    bossCodeReg(){
        let method = 'platform/synchronizeVcodeResume',
        param = {
          platformType: this.multipleSelectionArr[0],
          vcode: this.vcode,
          randomKey: this.randomKey
        },
        callBack = res=>{
          if(res.data.data && res.data.data.code == '1001'){
             this.bossCode = res.data.data.vcode;
             this.randomKey = res.data.data.randomKey;
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }else{
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.bossReg = false;
          }
        }
        this.$webHttp(method, param, callBack);
    },
    emailToLead(){
      if(this.emailList.length > 0){
        this.emailToleadShow = true;
      }else{
         this.$confirm('您还未绑定邮箱，无法导入邮箱中的简历，是否 立即绑定邮箱！!', '提示', {
          confirmButtonText: '去绑定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push({path:'/emailToLead'});
        })
      }
    },
    channelSet(){
      this.qryPlatformList();
      if(this.platformList.length > 0){
        this.channelSetShow = true;
      }else{
         this.$confirm('您还未绑定可导入简历的渠道!', '提示', {
          confirmButtonText: '去绑定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push({path:'/channelSet'});
        })
      }
    },
    handleSelectionChange(val) {
       console.log(val)
      this.multipleSelection = val;
    },
    channelExport(){
      this.multipleSelectionArr = [];
      this.multipleSelection.forEach((e)=>{
        this.multipleSelectionArr.push(e.platformType);
      })
      console.log(this.multipleSelectionArr[0])
      this.channelSetShow = false;
      if(this.multipleSelectionArr.indexOf(5)== -1 || this.multipleSelectionArr.length == 1){
        this.synchronizeResume();
      }else{
          this.$message({
            message: 'BOSS直聘平台简历只能单独导入',
            type: 'warning'
          });
      }
    },
    emailToleadShowExport(){
      let emailStr = '';
      this.EmailMultipleSelection.forEach((e, i)=>{
        if(i == this.EmailMultipleSelection.length -1){
          emailStr += `${e.id}`
        }else{
          emailStr += `${e.id},`
        }
      })
      let method = 'platform/importByEmail',
        params = {
          ids: emailStr
        },
        callBack = (res)=>{
          this.$message({
            message: '正在导入...请稍后在【待筛选】中查看!',
            type: 'success'
          });
        }
        this.$webHttp(method, params, callBack);
    },
    emailToleadShowChange(val){
      this.EmailMultipleSelection = val;
    },
    handleSizeChange(val){
      this.page.pageSize=val;
      if(this.$route.query.interviewerIds){
        this.intoNewResumeStorehouse();
      }else{
        this.getqueryNewOrSpareRepo();
      }
    },
    handleCurrentChange(val){
      this.page.pageNum=val;
      if(this.$route.query.interviewerIds){
        this.intoNewResumeStorehouse();
      }else{
        this.getqueryNewOrSpareRepo();
      }
    },
    getqueryNewOrSpareRepo(parameter){
      var self=this;
      if(!parameter){
        var parameter=JSON.parse(JSON.stringify(self.form));
        parameter.resumeStatus=parameter.resumeStatus.join();
        parameter.resumeFrom=parameter.resumeFrom.join();
      }
      var method="queryResume/queryNewOrSpareRepo",
          param=JSON.stringify({
            processStatus:1,
            pageNum:self.page.pageNum,
            pageSize:self.page.pageSize,
            parameter:parameter,
            keyWord:self.keyWord
          }),
          successd=function(res){
            self.tableData=self.$tableNull(res.data.data.resultList);
            self.page=res.data.data.page;
          };
      self.$http(method,param,successd);
    },
    //从微招聘进来查询应聘人数列表
    intoNewResumeStorehouse(){
      var self=this;
      var method="recruitPosition/intoNewResumeStorehouse",
          param=JSON.stringify({
            interviewerIds: this.$route.query.interviewerIds,
            pageNum:self.page.pageNum,
            pageSize:self.page.pageSize,
          }),
          successd=function(res){
            self.tableData=self.$tableNull(res.data.data.resultList);
            self.page=res.data.data.page;
          };
      self.$http(method,param,successd);
    },
    chongzhi(){
      this.form={
        sex:'',
        resumeStatus:[],
        resumeFrom:[],
        interviewTimeType:'',
        educationLev:'',
        workYearHigh:'',
        workYearLow:'',
      }
    },
    //高级查询
    gjSearch(){
      var parameter=JSON.parse(JSON.stringify(this.form));
      parameter.resumeStatus=parameter.resumeStatus.join();
      parameter.resumeFrom=parameter.resumeFrom.join();
      this.page.pageNum=1;
      this.getqueryNewOrSpareRepo(parameter);
    },
    treeAssign(val){
      var self=this;
      if(val.length==0){
        return;
      }
      self.recommendId=val[0];
      var method="addResume/getRecommendPhone",
          param=JSON.stringify({
            recommendId:val[0]
          }),
          successd=function(res){
            self.recommendPhone=res.data.data;
          };
      self.$http(method,param,successd);
    },
    //删除单个上传的文件
    handleRemove(file, fileList) {
      var _this = this;
      var method = "fileUpload/delFileRecord";
      var param = JSON.stringify({id:file.response.data.ids});
      var successd = function (res) {
          _this.fileIds.forEach(function(item,i) {
            if(item==file.response.data.ids){
              _this.fileIds.splice(i,1);
            }
          console.log(_this.fileIds);
          });
      }
      _this.$http(method,param,successd);
    },
    //删除多个上传的文件
    handleRemove2(file, fileList) {
      var _this = this;
      var method = "fileUpload/delFileRecord";
      var param = JSON.stringify({id:file.response.data.ids});
      var successd = function (res) {
          _this.fileIds2.forEach(function(item,i) {
            if(item==file.response.data.ids){
              _this.fileIds2.splice(i,1);
            }
          console.log(_this.fileIds2);
          });
      }
      _this.$http(method,param,successd);
    },
    //单个文件上传成功回调
    successed(response,file,fileList){
      var _this = this;
      console.log(response,file,fileList);
      if (response.code == 0) {
        // _this.fileIds.push(response.data.ids);
        _this.fileIds[0]=response.data.ids;
        _this.fileList[0]=file;
        _this.fileList.splice(1,1);
      } else {
        _this.fileList.pop();
        _this.$message.error(response.message);
      }
    },
    //多个文件上传成功回调
    successed2(response,file,fileList){
      var _this = this;
      if (response.code == 0) {
        _this.fileIds2.push(response.data.ids);
      } else {
        _this.fileList.pop();
        _this.$message.error(response.message);
      }
    },
    uploadResume(){
      var self=this;
      if(self.uploadmore==2){//多份简历上传解析
        self.fullscreenLoading=true;
        var method="addResume/uploadResume",
            param=JSON.stringify({
              ids:self.fileIds2.join()
            }),
            successd=function(res){
              self.uploadResumeShow=false;
              self.fullscreenLoading=false;
              if (res.data.data.count!=0) {//部分上传成功
                self.moreUpCount=res.data.data.count;
                self.moreUpList=res.data.data.list;
                self.moreUpShow=true;
              }
            },
            c=function(){
              self.fullscreenLoading=false;
            };
        self.$http(method,param,successd,c);
      }else{
        var method="addResume/getResume",
            param=JSON.stringify({
              ids:self.fileIds[0],
              resumeFrom:'10'
            }),
            successd=function(res){
              localStorage.resume=JSON.stringify(res.data.data);
              self.$router.push({name:'editResume'});
            };
        self.$http(method,param,successd);
      }
    },
    dutyCheckList(selection, row) {
      this.resumeCheckboxNum = selection.length;
      if (selection.length > 0) {
        this.resumeCheckboxObj = selection[0];
        this.resumeCheckboxArr = selection;
        this.giveupObj.interviewerId=selection[0].id;
      }
    },
    // giveup(){
    //   var self=this;
    //   var method="operateResume/getQuitBaseInfo",
    //       param=JSON.stringify({
    //         id:self.resumeCheckboxObj.id
    //       }),
    //       successd=function(res){
    //         self.baseInfo=res.data.data.baseInfo;
    //         self.eliminateReason=res.data.data.eliminateReason;
    //         self.tags=res.data.data.tags;
    //         self.giveUpShow=true;
    //       };
    //   self.$http(method,param,successd);
    // },
    giveup(){
      var self=this;
      var ids=[];
      self.resumeCheckboxArr.forEach(function(item){
        ids.push(item.id);
      })
      var method="operateResume/getManyQuitBaseInfo",
          param=JSON.stringify({
            ids:ids.join()
          }),
          successd=function(res){
            res.data.data.baseInfo.forEach(function(item){
              item.isSendEmail=false;
            })
            self.baseInfoList=res.data.data.baseInfo;
            self.eliminateReason=res.data.data.eliminateReason;
            self.tags=res.data.data.tags;
            self.giveUpShow=true;
            self.giveupObj.quitList=[];
          };
      self.$http(method,param,successd);
    },
    addtag(){
      var self=this;
      var method="resumeTag/addResumeTagToInterviewerInfo",
          param=JSON.stringify({
            interviewerId:self.giveupObj.interviewerId,
            tagName:self.addtagName
          }),
          successd=function(res){
            self.giveup();
            self.addtagShow=false;
          };
      self.$http(method,param,successd);
    },
    deleTag(id){
      var self=this;
      var method="resumeTag/deleteInterviewerInfoResumeTag",
          param=JSON.stringify({
            id:id,
            interviewerId:self.giveupObj.interviewerId
          }),
          successd=function(res){
            self.giveup();
          };
      self.$http(method,param,successd);
    },
    giveupSubmit(){
      var self=this;
      var method="operateResume/moveManyToQuitRepo";
      var param={},tagIds=[];
      param.quitList=[];
      self.baseInfoList.forEach(function(item){
        param.quitList.push({id:item.id,isSend:item.isSendEmail?'1':'0'})
      })
      param.interviewerRejectReasonId=self.giveupObj.interviewerRejectReasonId;
      param.eliminateReason=self.giveupObj.eliminateReason;
      param.intervewerRepo=self.giveupObj.intervewerRepo;
      self.tags.forEach(function(item) {
        if(item.isShow==1){
          tagIds.push(item.id);
        }
      });
      param.tagIds=tagIds.join();
      var params=JSON.stringify({parameter:param});
      var successd=function(res){
        self.giveUpShow=false;
        self.getqueryNewOrSpareRepo();
      };
      self.$http(method,params,successd);
    },
    notice(){
      this.$router.push({name:'notice',params:{id:this.giveupObj.interviewerId}});
    },
    downloadResume(){
      var self=this;
      var method="queryResume/downloadResume",
          param=JSON.stringify({
            InterviewId:self.giveupObj.interviewerId
          }),
          successd=function(res){
            location.href=res.data.data;
          };
      self.$http(method,param,successd);
    },
    moveToSpareRepo(){
      var self=this;
      var method="operateResume/moveToSpareRepo",
          param=JSON.stringify({
            ids:self.giveupObj.interviewerId
          }),
          successd=function(res){
            self.getqueryNewOrSpareRepo();
            self.$message({
              message:res.data.data,
              type:'success'
            });
          };
      self.$http(method,param,successd);
    },
    resume(id){
      this.$router.push({name:'resume',query:{id:id,btnShow:1}})
    },
    changeWorkYear(type){
      if (type=="min") {
        if(this.form.workYearLow>this.form.workYearHigh){
          this.form.workYearHigh=this.form.workYearLow;
        }
      } else {
        if(this.form.workYearLow>this.form.workYearHigh){
          this.form.workYearLow=this.form.workYearHigh;
        }
      }
    },
    changeEliminateReason(id){
      var self=this;
      self.eliminateReason.forEach(function(item){
        if(item.id==id){
          self.giveupObj.eliminateReason=item.remark;
        }
      })
    },
    //HR确认生效
    hrConfirmResume(id){
      var self=this;
      var method="positionRecommend/hrConfirmResume",
          param=JSON.stringify({
            interviewerId:id
          }),
          successd=function(res){
            self.$message({
              message:res.data.data.resMsg,
              type:'success'
            });
            self.getqueryNewOrSpareRepo();
          };
      self.$confirm('此操作将会把红包发给分享者, 请您确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http(method,param,successd);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
    },
    //多份简历上传变成单份的,上传之前清楚之前上传的
    beforeUpload(file){
      console.log(file);
      console.log(this.fileList);
    },
    //table方法
    rowStyle(row,index){
      console.log(row);
      if(row.num > 1){
        return{'background-color':'rgba(249,104,104,0.08)'}
      }
    }
  },
  components: {
    treeComponent
  }
}
</script>

<style scoped>
.search_newResume{width:300px;float: right;}
.gj_search{float: right;}
.giveup_personal{margin-bottom: 10px;}
.giveup_personal span{font-size: 16px;margin-right:20px;font-weight: 600;}
.resume_dele{font-size: 12px;display: inline-block;background-color: #ddd;color: #fff;border-radius: 50%;padding: 2px;position: absolute;right: -8px;top: -8px;}
.resume_tag{position: relative;}
.isRead{width: 8px;height:8px;border-radius: 100%;background-color: #f96868;display: block;position: absolute;top: 8px;left: 8px;}
.btn_top{padding: 20px 0 0 20px;}

</style>

<style>
#newRe .el-upload__tip{line-height:12px;}
#newRe .btn_top button span{color: #475669}
#newRe .btn_top .hrm_btn_icon{color:#46BE8A;}
</style>


