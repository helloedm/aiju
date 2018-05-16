<template>
  <div id="evaluate">
    <el-breadcrumb separator=">" style="margin-bottom:20px;">
      <el-breadcrumb-item>评价模板</el-breadcrumb-item>
      <el-breadcrumb-item>评价表</el-breadcrumb-item>
    </el-breadcrumb>
  <div class="hrm_module">
    <el-form class="border hrm_module_con">
      <el-form-item :label="index+1" label-width="50px" v-for="(field,index) in fieldList" :key="field.id">
        <div class="" v-if="field.type==1">
          <div>{{field.evaluateField}} （{{field.fieldRemark}}）</div>
          <el-radio-group v-model="checked[index]">
            <el-radio :label="index2+1" v-for="(option,index2) in field.option" :key="option" >{{option}}</el-radio>
          </el-radio-group>
        </div>
        <div class="" v-else>
          <div>{{field.evaluateField}}</div>
          <el-input type="textarea" class="w_500" v-model="checked[index]"></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="100px" label="您的评价">
        <el-input type="textarea" class="w_500" v-model="evaluateText"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="您的决定">
        <!-- <el-radio class="radio" v-model="decisionType" label="0">需要再次面试</el-radio> -->
        <el-radio class="radio" v-model="decisionType" label="1">录用</el-radio>
        <el-radio class="radio" v-model="decisionType" label="2">淘汰</el-radio>
        <el-radio class="radio" v-model="decisionType" label="3">人才储备</el-radio>
        <div v-if="decisionType==0">
          <el-radio class="radio" v-model="whenAgain" label="2">再通知</el-radio>
          <el-radio class="radio" v-model="whenAgain" label="1">现在面</el-radio>
          <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="true" :tree-type='2'></tree-component>
        </div>
        <div v-if="decisionType==2||decisionType==3">
          <p style="display:inline-block;margin:10px 0 0 200px" :style="{'margin-left':(decisionType==2?'70':'140')+'px'}">原因</p>
          <el-select v-model="reasonId" placeholder="请选择原因">
            <el-option v-for="item in reasonList" :key="item.id" :label="item.eliminateReason" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" :disabled="!interviewCount" @click="evaluateInterview">提交评价</el-button>
        <el-button @click="getBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script>
import treeComponent from '../tree.vue';
export default {
  name: "evaluate",
  data() {
    return {
      treeBtnName: '选择面试官',
      evaluateTempletId: '',
      fieldList: [],
      reasonList:[],
      decisionType:'1',
      evaluateText:'',
      whenAgain:'',
      reasonId:'',
      checked:[],

      interviewCount:null,
      interviewerId:'',
    }
  },
  mounted() {
    this.index();
    this.getReasonList();
  },
  methods: {
    treeAssign(id) {
      this.nextIntervieweeId=id[0];
    },
    index() {
      console.log(this.$route.params);
      this.interviewCount=this.$route.params.interviewerCount;
      this.interviewerId=this.$route.params.interviewerId;
      this.evaluateTempletId=this.$route.params.evaluateTempletId;
      this.previewEvaluateTemplet(this.$route.params.evaluateTempletId);
    },
    previewEvaluateTemplet(id) {
      var self = this;
      self.templetDetailId2 = id;
      var method = "evaluateTemplet/previewEvaluateTemplet",
        param = JSON.stringify({
          templetId: id
        }),
        successd = function(res) {
          self.fieldList = res.data.data.fieldList;
          self.checked.length=self.fieldList.length;
          self.evaluateTempletId = res.data.data.id;
        };
      self.$http(method, param, successd);
    },
    getReasonList() {
      var self = this;
      var method = "eliminateReason/getReasonList",
        param = JSON.stringify({
          pageNum: 1,
          pageSize: 100
        }),
        successd = function(res) {
          console.log(res);
          self.reasonList = res.data.data.reasonList;
        };
      self.$http(method, param, successd);
    },
    getBack(){
      this.$router.go(-1);
    },
    evaluateInterview(){
      var self=this;
      self.fieldList.forEach(function(item,i) {
        if(item.type==1){
          item.checked=self.checked[i];
        }else{
          item.manyRowText=self.checked[i];
        }
      });
      var reason;
      self.reasonList.forEach(function(item){
        if(item.id==self.reasonId){
          reason=item.eliminateReason;
        }
      })
      var method="evaluate/evaluateInterview",
          param=JSON.stringify({
            interviewerId:self.interviewerId,
            interviewCount:self.interviewCount,
            evaluateTempletId:self.evaluateTempletId,
            evaluateFieldResult:self.fieldList,
            evaluateText:self.evaluateText,
            decisionType:self.decisionType,
            reasonId:self.reasonId,
            reason:reason,
            isAgain:self.decisionType==0?'1':'0',
            whenAgain:self.whenAgain,
            nextIntervieweeId:self.nextIntervieweeId
          }),
          successd=function(res){
            self.$router.go(-1);
            // console.log(res);
          };
      self.$http(method,param,successd);
    }
  },
  components: {
    treeComponent
  }
}
</script>
<style scoped>

</style>


