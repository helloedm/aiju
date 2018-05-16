<template>
  <div id="notice" class="hrm_module">
    <div class="hrm_module_con">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ name: 'newResume' }">候选</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ name: 'newResume' }">新简历库</el-breadcrumb-item> -->
        <el-breadcrumb-item>面试通知</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="form" label-width="150px">
        <h1 class="form_item">面试类型</h1>
        <div class="clearfix margin_t_20">
          <el-form-item label="当前面试类型" style="float:left;">
            <div class="w_360">
              <el-radio class="radio" v-model="interviewType" label="1">现场面试</el-radio>
              <el-radio class="radio" v-model="interviewType" label="2">电话面试</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="提醒候选人" style="float:left;">
            <el-checkbox-group v-model="remindTypes">
              <el-checkbox label="1">短信提醒</el-checkbox>
              <el-checkbox label="2">系统邮件提醒</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <h1 class="form_item">候选人信息</h1>
        <div class="clearfix margin_t_20">
          <el-form-item label="姓名" style="float:left;">
            <el-input v-model="basicInfo.name" class="input_w_360"></el-input>
          </el-form-item>
          <el-form-item label="手机号" style="float:left;">
            <el-input v-model="basicInfo.phone" class="input_w_360"></el-input>
          </el-form-item>
        </div>
        <div class="clearfix margin_t_20">
          <el-form-item label="邮箱" style="float:left;">
            <el-input v-model="basicInfo.email" class="input_w_360"></el-input>
          </el-form-item>
          <el-form-item label="应聘职位" style="float:left;">
            <el-input v-model="basicInfo.positionName" class="input_w_360"></el-input>
          </el-form-item>
        </div>
        <h1 class="form_item">面试信息</h1>
        <div class="clearfix margin_t_20 h_36">
          <el-form-item label="面试官" style="float:left;height:36px">
            <tree-component @treeAssign="treeAssign1" :tree-btn-name="treeBtnName1" :tree-support-select="false" :tree-type='2'></tree-component>
          </el-form-item>
          <el-form-item label="面试联系人" style="float:left;height:36px">
            <tree-component @treeAssign="treeAssign2" :tree-btn-name="treeBtnName2" :tree-support-select="true" :tree-type='2'></tree-component>
          </el-form-item>
        </div>
        <div class="clearfix margin_t_20 h_36">
          <el-form-item label="联系电话" style="float:left;height:36px">
            <el-input v-model="contractPhone" class="input_w_360"></el-input>
          </el-form-item>
          <el-form-item label="面试时间" style="float:left;height:36px">
            <el-date-picker
              v-model="interviewTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="clearfix margin_t_20">
          <el-form-item label="面试地点" style="float:left;">
            <el-input v-model="interviewAddress" class="input_w_360"></el-input>
          </el-form-item>
          <el-form-item label="面试邮件模板" style="float:left;">
            <el-select v-model="emailTempletId" placeholder="请选择">
              <el-option
                v-for="(item,key) in emailTempletMap"
                :key="key"
                :label="item"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <el-form-item label="面试评估模板">
          <el-select v-model="evaluateTempletId" placeholder="请选择">
            <el-option
              v-for="(item,key) in evaluateTempletMap"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="noticeInterview" :disabled="loading">立即发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import treeComponent from '../tree.vue';
export default {
  name:'notice',
  data(){
    return{
      treeBtnName1: "请选择面试官",
      treeBtnName2: "请选择面试联系人",

      form:{
        radio:'1',
        checkList:[],
        input:'',
        value:''
      },
      basicInfo:{
        positionName:'',
        phone:'',
        name:'',
        email:''
      },
      emailTempletMap:{},
      evaluateTempletMap:{},
      intervieweeId:[],
      contractManId:'',
      interviewType:'1',
      remindTypes:['1'],
      contractPhone:'',
      interviewTime:'',
      interviewAddress:'',
      emailTempletId:"",
      evaluateTempletId:'',
      loading:false,
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
      if(!self.$route.params.id){
        self.$router.go(-1);
        return;
      }
      var method="resume/getNoticeInterviewInfo",
          param=JSON.stringify({InterviewerInfoId:self.$route.params.id}),
          successd=function(res){
            self.emailTempletMap=res.data.data.emailTempletMap;
            self.evaluateTempletMap=res.data.data.evaluateTempletMap;
            self.basicInfo=res.data.data.basicInfo;
          };
      self.$http(method,param,successd);
    },
    treeAssign1(val){//
      let self=this;
      self.intervieweeId=val.length?val:[];
    },
    treeAssign2(val){
      var self=this;
      self.contractManId=val[0];
      var method="addResume/getRecommendPhone",
          param=JSON.stringify({
            recommendId:self.contractManId
          }),
          successd=function(res){
            self.contractPhone = res.data.data;
          };
      if(self.contractManId){
        self.$http(method,param,successd);
      }
    },
    noticeInterview(){
      var self=this;
      self.loading=true;
      var method="resume/noticeInterview",
          param=JSON.stringify({
            candidateInfo:{
              interviewerId:self.$route.params.id,
              interviewType:self.interviewType,
              remindTypes:self.remindTypes,
              name:self.basicInfo.name,
              phone:self.basicInfo.phone,
              email:self.basicInfo.email,
              position:self.basicInfo.positionName,
              intervieweeIds:self.intervieweeId.join(),
              contractManId:self.contractManId,
              contractPhone:self.contractPhone,
              interviewTime:self.$date(self.interviewTime,"time"),
              interviewAddress:self.interviewAddress,
              emailTempletId:self.emailTempletId,
              evaluateTempletId:self.evaluateTempletId
            }
          }),
          successd=function(res){
            self.$message({
              message:"邀请成功!",
              type:'success'
            });
            self.loading=false;
            self.$router.go(-1);
          },
          chatched=function(error){
            self.loading=false;
          };
      let method2="resume/judjeInterviewNum",
          param2=JSON.stringify({
            intervieweeIds:self.intervieweeId.join()
          }),
          successd2=function(res){
            self.$http(method,param,successd,chatched);
          },
          chatched2=function(error){
            self.loading=false;
          };
      self.$http(method2,param2,successd2,chatched2);
    }
  },
  components:{
    treeComponent
  }
}
</script>
<style scoped>
.form_item{margin-top: 20px;padding-bottom: 10px;border-bottom:1px solid #E9ECEF;font-size: 16px}
</style>


