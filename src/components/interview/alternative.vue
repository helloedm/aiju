<template>
  <dl class="hrm_module" id="newRe">
    <dt class="hrm_module_btn">
      <!-- <el-button type="primary" @click="uploadResumeShow=true;"><i class="iconfont hrm_btn_icon">&#xe648;</i>上传简历</el-button> -->
      <el-button type="primary" @click="giveup" :disabled="resumeCheckboxNum !=1">放弃</el-button>
      <el-button type="primary" @click="notice" :disabled="resumeCheckboxNum !=1">面试通知</el-button>
      <el-button type="primary" @click="downloadResume" :disabled="resumeCheckboxNum !=1"><i class="iconfont hrm_btn_icon">&#xe649;</i>下载</el-button>
      <el-button type="primary" @click="moveToNewInterviewrepertory" :disabled="resumeCheckboxNum !=1">移入新简历库</el-button>
      <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':gjSearchCon}"></i></el-button>
      <el-input
      placeholder="输入工作年限、应聘职位、学历等搜索"
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
          <!-- <el-form-item label="简历状态" class="float_left">
            <el-checkbox-group v-model="form.resumeStatus">
              <el-checkbox label="0">已读</el-checkbox>
              <el-checkbox label="1">未读</el-checkbox>
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
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        class-name="text-align-left"
        width="180">
        <template scope="scope">
          <span><img :src="scope.row.headImg" alt="头像" style="width:25px;height:25px;border-radius:50%;overflow:hidden;vertical-align:middle;"></span>
          <el-button type="text" @click="resume(scope.row.id)">{{scope.row.name}}</el-button>
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
        prop="sexStr"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="graduateSchool"
        label="毕业学校">
      </el-table-column>
      <el-table-column
        prop="date"
        label="应聘时间">
      </el-table-column>
      <!-- <el-table-column
        prop="importWayStr"
        label="导入方式">
      </el-table-column> -->
      <el-table-column
        prop="resumeFormStr"
        label="渠道">
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
          <el-form-item label="简历来源">
            <el-select v-model="sourceVal" placeholder="请选择">
              <el-option
                v-for="item in source"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择文件">
            <el-upload
              class="upload-demo"
              :action="util.uploadURLForCommon"
              :on-remove="handleRemove"
              :on-success="successed"
              :data="params"
              :file-list="fileList">
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
          <el-button type="primary" @click="uploadResume">确 定</el-button>
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
      options2:[{
        value: '选项1',
        label: '黄金糕'
      }],
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
      fileIds:[],
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
        intervewerRepo:''
      },

      addtagName:'',
      addtagShow:false,
      
    }
  },
  mounted(){
    this.getqueryNewOrSpareRepo();
  },
  methods:{
    handleSizeChange(val){
      this.page.pageSize=val;
      this.getqueryNewOrSpareRepo();
    },
    handleCurrentChange(val){
      this.page.pageNum=val;
      this.getqueryNewOrSpareRepo();
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
            processStatus:2,
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
    gjSearch(){
      console.log(this.form);
      var parameter=JSON.parse(JSON.stringify(this.form));
      parameter.resumeStatus=parameter.resumeStatus.join();
      parameter.resumeFrom=parameter.resumeFrom.join();
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
    handleRemove(file, fileList) {
        var _this = this;
        var method = "fileUpload/delFileRecord";
        var param = JSON.stringify({id:file.response.data.ids});
        var successd = function (res) {
            _this.$emit('deleFileId',file.response.data.ids)
            _this.fileIds.forEach(function(item,i) {
              if(item==file.response.data.ids){
                _this.fileIds.splice(i,1);
              }
            console.log(_this.fileIds);
            });
        }
        _this.$http(method,param,successd);
      },
      successed(response,file,fileList){
        var _this = this;
        console.log(response,file,fileList);
        if (response.code == 0) {
          _this.fileIds.push(response.data.ids);
        } else {
          _this.fileList.pop();
          _this.$message.error(response.message);
        }
      },
      uploadResume(){
        var self=this;
        var method="addResume/uploadResume",
            param=JSON.stringify({
              ids:self.fileIds.join(),
              resumeFrom:self.sourceVal,
              recommendId:self.sourceVal==4?self.recommendId:'',
              recommendPhone:self.sourceVal==4?self.recommendPhone:''
            }),
            successd=function(res){
              self.uploadResumeShow=false;
              self.getqueryNewOrSpareRepo();
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
    moveToNewInterviewrepertory(){
      var self=this;
      var method="queryResume/moveToNewInterviewrepertory",
          param=JSON.stringify({
            InterviewId:self.giveupObj.interviewerId
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
      this.$router.push({name:'resume',query:{id:id,btnShow:2}})
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
    }
  },
  components: {
    treeComponent
  }
}
</script>

<style scoped>
.search_newResume{width:350px;float: right;}
.gj_search{float: right;}
.giveup_personal{margin-bottom: 10px;}
.giveup_personal span{font-size: 16px;margin-right:20px;font-weight: 600;}
.resume_dele{font-size: 12px;display: inline-block;background-color: #ddd;color: #fff;border-radius: 50%;padding: 2px;position: absolute;right: -8px;top: -8px;}
.resume_tag{position: relative;}
</style>

<style>
#newRe .el-upload__tip{line-height:12px;}
</style>


