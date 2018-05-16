<template>
  
  <div id="talents">
    <el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
      <el-breadcrumb-item>招聘管理</el-breadcrumb-item>
      <el-breadcrumb-item>候选人</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
       <el-tab-pane label="候选" name="1">
        <div slot="label">候选<span>{{resumeNum.newRepo>99?'99+':resumeNum.newRepo}}</span></div>
      </el-tab-pane>
      <el-tab-pane label="备选" name="2">
        <div slot="label">备选<span>{{resumeNum.spareRepo>99?'99+':resumeNum.spareRepo}}</span></div>
      </el-tab-pane>
      <el-tab-pane label="面试" name="3">
        <div slot="label">面试<span>{{resumeNum.interviewRepo>99?'99+':resumeNum.interviewRepo}}</span></div>
      </el-tab-pane>
      <el-tab-pane label="录用" name="4">
        <div slot="label">录用<span>{{resumeNum.hireRepo>99?'99+':resumeNum.hireRepo}}</span></div>
      </el-tab-pane>
      <el-tab-pane label="淘汰" name="5">
        <div slot="label">淘汰<span>{{resumeNum.eliminateRepo>99?'99+':resumeNum.eliminateRepo}}</span></div>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'talents',
  data(){
    return{
      activeName:'1',
      resumeNum:{
        newRepo:0,//新简历库
        hireRepo:0,//录用
        spareRepo:0,//备选
        eliminateRepo:0,//淘汰
        interviewRepo:0,//面试
      }
    }
  },
  mounted(){
    this.countRepoStoredResume();
    this.index();
  },
  methods:{
    index(){
      var self=this;
      switch (self.$route.name) {
        case "newResume":
          self.activeName='1';
          break;
        case "alternative":
          self.activeName='2';
          break;
        case "library":
          self.activeName='3';
          break;
        case "talentpool":
          self.activeName='4';
          break;
        case "eliminate":
          self.activeName='5';
          break;
        default:
          break;
      }
    },
    handleClick(name){
      var self=this;
      self.countRepoStoredResume();
      switch (name) {
        case '1':
          self.$router.push("/ATS/talents/newResume")
          break;
        case '2':
          self.$router.push("/ATS/talents/alternative");
          break;
        case"3":
          self.$router.push({name:'library'});
          break;
        case '4':
          self.$router.push({name:'talentpool'});
          break;
        case '5':
          self.$router.push({name:'eliminate'});
          break;
        default:
          break;
      }
    },
    countRepoStoredResume(){
      var self=this;
      var method="resumeDetail/countRepoStoredResume",
          param=JSON.stringify({}),
          successd=function(res){
            console.log(res);
            self.resumeNum=res.data.data;
          };
      self.$http(method,param,successd);
    }
  }
}
</script>
<style scoped>
.el-breadcrumb{
  padding: 16px 0 16px 16px;
  background: #fff;
}
.el-tabs__item span{
  margin-left:8px;
  padding:2px 4px;
  font-size:12px;
  color:#56A6F1;
  background:rgba(86,166,241,0.16);
  border-radius: 10px;
}
</style>


