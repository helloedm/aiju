<template>
  <div id="library" class="">
    <div class="hrm_module">
      <el-row :gutter="20" class="padding_top_20 hrm_module_con">
        <el-col class="el-col" :span="4" :offset="2"><ul class="talentpool_head_ul" @click="changetalentStatus(1)" :class="{'active':talentStatus==1}"><li>待接收面试</li><li class="font_size_20">{{count.waitRecieveCount}}</li></ul></el-col>
        <el-col class="el-col" :span="4"><ul class="talentpool_head_ul" @click="changetalentStatus(2)" :class="{'active':talentStatus==2}"><li>已接收面试</li><li class="font_size_20">{{count.acceptCount}}</li></ul></el-col>
        <el-col class="el-col" :span="4"><ul class="talentpool_head_ul" @click="changetalentStatus(3)" :class="{'active':talentStatus==3}"><li>已拒绝面试</li><li class="font_size_20">{{count.refuseCount}}</li></ul></el-col>
        <el-col class="el-col" :span="4"><ul class="talentpool_head_ul" @click="changetalentStatus(4)" :class="{'active':talentStatus==4}"><li>已过期面试</li><li class="font_size_20">{{count.outoftimeCount}}</li></ul></el-col>
        <el-col class="el-col" :span="4"><ul class="talentpool_head_ul" @click="changetalentStatus(5)" :class="{'active':talentStatus==5}"><li>爽约</li><li class="font_size_20">{{count.breakPromiseCount}}</li></ul></el-col>
      </el-row>
    </div>
    <ul class="hrm_module">
      <li class="hrm_module_btn">
        <el-button type="danger" @click="giveup()" :disabled="resumeCheckboxNum!=1"><i class="iconfont hrm_btn_icon">&#xe612;</i>放弃</el-button>
        <el-button type="primary" :disabled="resumeCheckboxNum!=1" @click="moveToHireRepo"><i class="iconfont hrm_btn_icon ">&#xe64e;</i>录用</el-button>
        <el-button type="primary" @click="breakAppointment" :disabled="resumeCheckboxNum!=1" v-if="talentStatus==2"><i class="iconfont hrm_btn_icon">&#xe64a;</i>爽约</el-button>
        <!-- <el-button type="primary" :disabled="resumeCheckboxNum!=1" @click="notice" v-if="talentStatus==2">下一轮</el-button> -->
        <el-button type="primary" :disabled="resumeCheckboxNum!=1" @click="moveToNewInterviewrepertory" v-if="talentStatus>3"><i class="iconfont hrm_btn_icon">&#xe64d;</i>移入新简历库</el-button>
        <el-button type="primary" :disabled="resumeCheckboxNum!=1" @click="moveToSpareRepo" v-if="talentStatus>3"><i class="iconfont hrm_btn_icon">&#xe64d;</i>移入备选库</el-button>
        <el-button type="primary" :disabled="resumeCheckboxNum!=1" @click="notice" v-if="talentStatus==3"><i class="iconfont hrm_btn_icon">&#xe71e;</i>重邀面试</el-button>
        <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':gjSearchCon}"></i></el-button>
        <el-input
        placeholder="输入工作年限、应聘职位、学历等搜索"
        
        icon="search"
        v-model="keyWord"
        class="search_newResume"
        @keyup.enter.native="index"
        @blur="index">
        </el-input>
      </li>
      <li v-show="gjSearchCon" class="hrm_module_search">
        <el-form :model="form" label-width="100px" class="clearfix">
        <div class="clearfix">
          <el-form-item label="性别" class="" style="float:left;margin-bottom:10px;">
            <el-radio class="radio" v-model="form.sex" label="3">不限</el-radio>
            <el-radio class="radio" v-model="form.sex" label="1">男</el-radio>
            <el-radio class="radio" v-model="form.sex" label="2">女</el-radio>
          </el-form-item>
          <!-- <el-form-item label="简历状态" class="float_left">
            <el-checkbox-group v-model="form.resumeStatus">
              <el-checkbox label="0">未读</el-checkbox>
              <el-checkbox label="1">已读</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
        </div>
        <el-form-item label="来源渠道">
          <el-checkbox-group v-model="form.resumeFrom">
            <el-checkbox :label="item.value" v-for="item in source" :key="item.vlaue">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="clearfix">
          <el-form-item label="工作年限" style="float:left;margin-bottom:10px;">
            <el-select v-model="form.workYearLow" placeholder="最低">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form.workYearHigh" placeholder="最高">
              <el-option
                v-for="item in options"
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
              <el-option label="今天" value="1"></el-option>
              <el-option label="一周内" value="2"></el-option>
              <el-option label="两周内" value="3"></el-option>
              <el-option label="一月内" value="4"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="面试时间">
          <el-date-picker
            v-model="form.interviewDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="index()">搜索</el-button>
          <el-button @click="chongzhi">重置</el-button>
        </el-form-item>
      </el-form>
      </li>
      <li class="hrm_module_con">
        <el-table
          :data="tableData"
          border
          @selection-change="dutyCheckList"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            class-name="text-align-left"
            width="135"
            label="姓名">
            <template scope="scope">
              <span class="library_head" v-if="scope.row.head==1">今</span>
              <span class="library_head" v-if="scope.row.head==2">待</span>
              <span><img :src="scope.row.headImg" alt="头像" @click="resume(scope.row.id)" style="cursor: pointer;width:25px;height:25px;border-radius:50%;overflow:hidden;vertical-align:middle; cursor: pointer;"></span>
              <el-button type="text" @click="resume(scope.row.id)">{{scope.row.name}}</el-button>
              <!-- <el-tag type="success" v-if="scope.row.foot==1">下一轮</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="workYearStr"
            label="工作年限">
          </el-table-column>
          <el-table-column
            prop="eduStr"
            label="学历">
          </el-table-column>
          <el-table-column
            prop="positionName"
            label="应聘职位">
          </el-table-column>
          <el-table-column
            prop="intervieweeName"
            label="面试官">
          </el-table-column>
          <el-table-column
            prop="interviewAddress"
            show-overflow-tooltip
            label="面试地点">
          </el-table-column>
          <el-table-column
            v-if="talentStatus<3"
            show-overflow-tooltip
            label="面试时间(可调整)">
            <template scope="scope">
              <el-button type="text" @click="updateDateShow(scope.row)" >{{scope.row.interviewTime}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            v-else
            label="面试时间">
            <template scope="scope">
              <span>{{scope.row.interviewTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractName"
            label="面试联系人">
          </el-table-column>
          <el-table-column
            prop="contractPhone"
            show-overflow-tooltip
            label="联系人电话">
          </el-table-column>
          <!-- <el-table-column
            width="100"
            label="面试轮数">
            <template scope="scope">
              <span>{{scope.row.interviewCount}}</span>
              <el-popover
                ref="popover1"
                placement="top-end"
                width="200"
                trigger="hover">
                <dl class="popover_ul">
                  <dd class="popover_dd2">
                    <el-steps :space="50" direction="vertical">
                        <el-step :title="interview.interviewCount" :description="interview.intervieweeName+interview.interviewTime" v-for="interview in scope.row.interviewList"></el-step>
                    </el-steps>
                  </dd>
                </dl>
              </el-popover>
              <i class="el-icon-information" v-popover:popover1></i>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="200" v-if="talentStatus>1&&talentStatus!=4">
            <template scope="scope">
              <el-button type="text" @click="basicInfo(scope.row.id)">应聘登记表</el-button>
              <el-button type="text" @click="goRating(scope.row.id)" :disabled="scope.row.isEvaluate==0">评价表</el-button>
              <!-- <el-button type="text" v-if="scope.row.isDisplay==1&&scope.row.processStaus!=17" @click="hrConfirmResume(scope.row.id)">审核</el-button>
              <span v-if="scope.row.isDisplay==1&&scope.row.processStaus==17">已审核</span> -->
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
        <ul>
          <li>
            <span></span>
          </li>
        </ul>
      </li>
    </ul>

    <el-dialog :visible.sync="updateDate" title="修改面试时间" size="tiny">
      <el-form>
        <el-form-item label="面试时间" label-width="80px">
           <el-date-picker
            v-model="interviewTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            format="yyyy-MM-dd HH:mm"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDate = false">取 消</el-button>
        <el-button type="primary" @click="resetInterviewTime">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="放弃" :visible.sync="giveUpShow" size="tiny">
        <div class="giveup_personal">
          <span class="margin_l_20">{{baseInfo.name}} </span>
          <span class="margin_l_20">{{baseInfo.positionName}}</span> 
          <span class="margin_l_20">{{baseInfo.phone}}</span>
        </div>
        <el-checkbox v-model="giveupObj.isSendEmail">向{{baseInfo.name}}（{{baseInfo.email}}）发送通知</el-checkbox>
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

      <el-dialog title="应聘登记表" size="tiny" :visible.sync="registrationShow">
        <div>
          <img src="" alt="">
        </div>
        <el-form label-width="130px" label-position="left" class="applicant_form">
          <div class="applicant_form_name">{{interviewerInfo.name}}</div>
          <!-- <el-form-item label="姓  名:">{{interviewerInfo.name}}</el-form-item> -->
          <el-form-item label="性  别:">{{interviewerInfo.sex==1?'男':interviewerInfo.sex==2?'女':'未知'}}</el-form-item>
          <el-form-item label="民  族:">{{interviewerInfo.nation}}</el-form-item>
          <el-form-item label="出生年月:">{{interviewerInfo.birthday?interviewerInfo.birthday.substr(0,10):''}}</el-form-item>
          <el-form-item label="婚姻状况:">{{interviewerInfo.marryStatus==1?'未婚':interviewerInfo.marryStatus==2?'已婚':interviewerInfo.marryStatus==3?'离异':'保密'}}</el-form-item>
          <el-form-item label="手 机 号:">{{interviewerInfo.phone}}</el-form-item>
          <el-form-item label="邮 箱:">{{interviewerInfo.email}}</el-form-item>
          <el-form-item label="现 住 址:">{{interviewerInfo.nowLiveAddress}}</el-form-item>
          <el-form-item label="公司有无认识的人:">{{interviewerInfo.haveAcquaintance==0?'无':interviewerInfo.friendRemaik}}</el-form-item>
          <el-form-item label="期望薪资（税前）:">{{interviewerInfo.expectSalary}}</el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name:'library',
  data(){
    return{
      talentStatus:1,
      offerRecordsCount0:1,
      offerRecordsCount1:1,
      offerRecordsCount2:1,
      offerRecordsCount3:1,
      offerRecordsCount4:1,
      gjSearchCon:false,
      input2:"",
      form:{
        sex:'',
        resumeStatus:[],
        resumeFrom:[],
        workYearLow:'',
        workYearHigh:'',
        educationLev:'',
        interviewTimeType:'',
        interviewDate:'',
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
      options2:[{
        value: '选项1',
        label: '黄金糕'
      }],
      tableData:[],
      page:{
        pageSize:10,
        pageNum:1,
        totalCount:0,
      },
      courseLisbrary:[{
        name:'大熊',
        date:'2017-09-25'
      },{
        name:'大熊',
        date:'2017-09-25'
      },{
        name:'大熊',
        date:'2017-09-25'
      }],
      courseLisbraryVal:2,

      keyWord:'',
      count:{
        refuseCount:0,
        breakPromiseCount:0,
        outoftimeCount:0,
        acceptCount:0,
        waitRecieveCount:0
      },
      updateDate:false,
      interviewTime:new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()-3600 * 1000 * 24;
        }
      },
      InterviewId:'',

      //放弃
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
        intervewerRepo:''
      },

      addtagShow:false,
      addtagName:'',

      registrationShow:false,
      interviewerInfo:{
        name:'',

      },
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
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    changetalentStatus(type){
      var self=this;
      self.talentStatus=type;
      localStorage.library=type;
      self.index();
    },
    handleIconClick(){

    },
    index(){
      var self=this;
      //判断之前点击的是那个面试库
      self.talentStatus=localStorage.library?localStorage.library:1;
      var parameter=JSON.parse(JSON.stringify(self.form));
      parameter.resumeStatus=parameter.resumeStatus.join();
      parameter.resumeFrom=parameter.resumeFrom.join();
      parameter.interviewDate =self.$date(parameter.interviewDate);
      var method="queryResume/queryInterviewRepo",
          param=JSON.stringify({
            pageSize:self.page.pageSize,
            pageNum:self.page.pageNum,
            processStatus:self.talentStatus,
            parameter:parameter,
            keyWord:self.keyWord,
          }),
          successd=function(res){
            console.log(res);
            self.page=res.data.data.page;
            self.count=res.data.data.count;
            self.tableData=self.$tableNull(res.data.data.resultList);
          };
      self.$http(method,param,successd);
    },
    resetInterviewTime(){
      var self=this;
      var method="queryResume/resetInterviewTime",
          param=JSON.stringify({
            interviewTime:self.$date(self.interviewTime,"time"),
            InterviewId:self.InterviewId
          }),
          successd=function(res){
            self.updateDate=false;
            self.index();
          };
      self.$http(method,param,successd);
    },
    giveup(){
      var self=this;
      var method="operateResume/getQuitBaseInfo",
          param=JSON.stringify({
            id:self.resumeCheckboxObj.id
          }),
          successd=function(res){
            self.baseInfo=res.data.data.baseInfo;
            self.eliminateReason=res.data.data.eliminateReason;
            self.tags=res.data.data.tags;
            self.giveUpShow=true;
          };
      self.$http(method,param,successd);
    },
    dutyCheckList(selection, row) {
      this.resumeCheckboxNum = selection.length;
      if (selection.length > 0) {
        this.resumeCheckboxObj = selection[0];
        this.resumeCheckboxArr = selection;
        this.giveupObj.interviewerId=selection[0].id;
      }
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
    giveupSubmit(){
      var self=this;
      var method="operateResume/moveManyToQuitRepo";
      var param={},tagIds=[];
      param.quitList=[];
      param.quitList.push({id:self.giveupObj.interviewerId,isSend:self.giveupObj.isSendEmail?'1':'0'});
      // param.interviewerId=self.giveupObj.interviewerId;
      // param.isSendEmail=self.giveupObj.isSendEmail?'1':'0';
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
        self.index();
      };
      self.$http(method,params,successd);
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
        interviewDate:'',
      }
    },
    handleSizeChange(val){
      this.page.pageSize=val;
      this.index();
    },
    handleCurrentChange(val){
      this.page.pageNum=val;
      this.index();
    },
    breakAppointment(){
      var self=this;
      var method="operateResume/moveToBreakPromiseRepo",
          param=JSON.stringify({ids:self.resumeCheckboxObj.id}),
          successd=function(res){
            self.index();
          };
      self.$http(method,param,successd);
    },
    notice(){
      this.$router.push({name:'notice',params:{id:this.giveupObj.interviewerId}});
    },
    moveToNewInterviewrepertory(){
      var self=this;
      var method="queryResume/moveToNewInterviewrepertory",
          param=JSON.stringify({
            InterviewId:self.resumeCheckboxObj.id
          }),
          successd=function(res){
            self.index();
          };
      self.$http(method,param,successd);
    },
    moveToHireRepo(){
      var self=this;
      var method="operateResume/moveToHireRepo",
          param=JSON.stringify({
            ids:self.resumeCheckboxObj.id
          }),
          successd=function(res){
            self.index();
          };
      self.$http(method,param,successd);
    },
    moveToSpareRepo(){
      var self=this;
      var method="operateResume/moveToSpareRepo",
          param=JSON.stringify({
            ids:self.resumeCheckboxObj.id
          }),
          successd=function(res){
            self.index();
          };
      self.$http(method,param,successd);
    },
    basicInfo(interviewerId){
      var self=this;
      var method="interviewerRegisterForm/getInterviewerInfoById",
          param=JSON.stringify({
            interviewerId:interviewerId
          }),
          successd=function(res){
            self.interviewerInfo=res.data.data.registrationForm;
            self.registrationShow=true;
          };
      self.$http(method,param,successd);
    },
    resume(id){
      this.$router.push({name:'resume',query:{id:id,btnShow:3}})
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
    goRating(id){
      this.$router.push({name:'rating',query:{id:id}});
    },
    changeEliminateReason(id){
      var self=this;
      self.eliminateReason.forEach(function(item){
        if(item.id==id){
          self.giveupObj.eliminateReason=item.remark;
        }
      })
    },
    //打开更新面试时间弹框
    updateDateShow(row){
      let nowDate = new Date(),interviewTime=row.interviewTime;
      nowDate.setFullYear(interviewTime.slice(0,4),interviewTime.slice(5,7)-1,interviewTime.slice(8,10));
      nowDate.setHours(interviewTime.slice(11,13),interviewTime.slice(14,16),interviewTime.slice(17,19));
      console.log(nowDate);
      this.interviewTime=nowDate;
      this.InterviewId=row.id;
      this.updateDate=true;
    },
    //HR确认生效
    hrConfirmResume(id){
      var self=this;
      var method="positionRecommend/hrConfirmResume",
          param=JSON.stringify({
            interviewerId:id,
            whichRepo:'mianshi'
          }),
          successd=function(res){
            self.$message({
              message:res.data.data.resMsg,
              type:'success'
            });
            self.index();
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
  }
}
</script>
<style scoped>
.talentpool_head_ul{width: 100%;cursor: pointer;}
.talentpool_head_ul.active{color: #5aa2e7;}
.talentpool_head_ul li{width: 100%;text-align: center;height: 30px;line-height: 30px;}
.popover_ul{width: 200px;}
.popover_dt div{width: 50px;height: 50px;background: #5aa2e7;color: #fff;border-radius: 50%;float: left;line-height: 50px;text-align:center;}
.popover_dt h1{margin-left: 55px;display: block;padding-top: 10px;}
.popover_dt h2{margin-left: 55px;}
.popover_dd1{margin-top: 20px;margin-left: 30px;}
.popover_dd2{margin-left: 20px;margin-top: 20px;}
.search_newResume{width:500px;float: right;}
.gj_search{float: right;}
.resume_dele{font-size: 12px;display: inline-block;background-color: #ddd;color: #fff;border-radius: 50%;padding: 2px;position: absolute;right: -8px;top: -8px;}
.resume_tag{position: relative;}
.applicant_form{width:300px;margin: 0 auto;}
.applicant_form_name{width:70px;height:70px;border-radius: 50%;background-color: #EEF1F6;margin: 0 auto 50px;line-height: 70px;text-align: center;overflow: hidden}
.giveup_personal{margin-bottom: 10px;}
.giveup_personal span{font-size: 16px;margin-right:20px;font-weight: 600;}
.el-col{border-right:1px solid #e5e5e5;}
.el-col:last-child{border-right:0;}
</style>
<style>
#library .applicant_form .el-form-item{margin-bottom:0;}
#library .el-step__description{width:120px;}
#library .library_head {position:absolute;display:block;width:14px;height:14px;background-color:#f00;color:#fff;left:0;top:0;line-height:14px;}
</style>



