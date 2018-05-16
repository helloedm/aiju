<template>
  <div id="rating" v-if="evaluateDetailList&&evaluateDetailList.length!=0">
    <ul class="appraiser_ul">
      <li class="appraiser_li" v-for="(evaluateDetail,index) in evaluateDetailList" :class="{'active':evaluateDetailIndex==index}" :key="index" @click="evaluateChoose(evaluateDetail,index)">
        <div class="appraiser">
          <div class="appraiser_line"></div>
          <div class="appraiser_icon">{{index+1}}</div>
        </div>
        <div class="appraiser_btn">
          <el-button type="text">{{evaluateDetail.creatorName+'('+evaluateDetail.positionName+')'}}</el-button>
        </div>
      </li>
    </ul>
    <el-form class="border hrm_module_con" v-if="evaluateDetail">
      <el-form-item :label="index+1" label-width="50px" v-for="(field,index) in evaluateFieldArray" :key="field.id">
        <div class="" v-if="field.type==1">
          <div>{{field.evaluateField}} （{{field.fieldRemark}}）</div>
          <el-radio-group v-model="field.checked">
            <el-radio :label="index2+1" v-for="(option,index2) in field.option" :disabled="field.checked!=index2+1" :key="option">{{option}}</el-radio>
          </el-radio-group>
        </div>
        <div class="" v-else>
          <div>{{field.evaluateField}}</div>
          <el-input type="textarea" class="w_500" v-model="checked[index]" disabled=""></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="50px" label="评价">
        <el-input type="textarea" class="w_500" v-model="evaluateText" disabled=""></el-input>
      </el-form-item>
      <el-form-item label-width="50px" label="决定" v-if="evaluateDetail">
        <span class="decision">{{evaluateDetail.decisionTypeStr}}</span>
        <span v-if="evaluateDetail.reason">({{evaluateDetail.reason}})</span>
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    暂无面试评价!
  </div>
</template>
<script>
export default {
  name:'rating',
  data(){
    return{
      evaluateText:'',
      evaluateDetailList:[],
      evaluateFieldArray:[],
      evaluateDetailIndex:0,
      evaluateDetail:{},
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
      var method="evaluate/getEvaluateDetailList",
          param=JSON.stringify({
            interviewerId:self.$route.query.id
          }),
          successd=function(res){
            self.evaluateDetailList=res.data.data;
            self.evaluateFieldArray=res.data.data[0].evaluateFieldArray;
            self.evaluateText=res.data.data[0].evaluateText;
            self.evaluateDetail=res.data.data[0];
          };
      self.$http(method,param,successd);
    },
    activeevaluateDetail(index){
      this.evaluateDetailIndex=index;
      this.evaluateFieldArray=this.evaluateDetailList[index].evaluateFieldArray;
      this.evaluateText=res.data.data[index].evaluateText;
      this.evaluateDetail=this.evaluateDetailList[index];
    },
    evaluateChoose(evaluateDetail,index){
      this.evaluateDetailIndex=index;
      this.evaluateDetail=evaluateDetail;
      this.evaluateFieldArray=evaluateDetail.evaluateFieldArray;
      this.evaluateText=evaluateDetail.evaluateText;
    }
  }
}
</script>
<style scoped>
  .rating_head{text-align: center;margin-top: 20px;}
  .decision{font-size: 20px;font-weight: 600;}
  .appraiser_ul{text-align: center;}
  .appraiser_li{display: inline-block;overflow: hidden;}
  .appraiser_li:last-child .appraiser_line{display: none;}
  .active.appraiser_li .appraiser_icon{background-color: #20a0ff;}
  .appraiser{position: relative;width:300px;}
  .appraiser_icon{width: 30px;height: 30px;background-color: #bfcbd9;color: #fff;line-height: 30px;text-align: center;border-radius: 50%;}
  .appraiser_line{width: 100%;height:2px;position:absolute;top:14px;left: 30px;background-color:#bfcbd9; }
  .appraiser_btn{width:100%;text-align: left;}
  .appraiser_btn span{color: #1f2d3d;}
</style>
<style>
#rating .el-step__main{width:300px;margin-left:-50px !important;}
.appraiser_btn button{color: #1f2d3d;}
.appraiser_btn button:hover{color: #20a0ff;}
.active.appraiser_li .appraiser_btn button{color:#20a0ff;}
</style>



