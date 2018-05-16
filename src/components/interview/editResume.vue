<template>
  <div id="edit_resume" v-loading.fullscreen.lock="loading" :element-loading-text="loadingText">
  <el-breadcrumb separator=">" v-if="btnShow==-3">
        <el-breadcrumb-item to="/ATS/interviewWeedOut">面试</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator=">" v-if="btnShow==-2">
        <el-breadcrumb-item to="/ATS/interviewPass">面试</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator=">" v-if="btnShow==-1">
        <el-breadcrumb-item to="/ATS/interviewHire">面试</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator=">" v-if="btnShow==0">
        <el-breadcrumb-item to="/ATS/interviewInit">面试</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb>  
    <el-breadcrumb separator=">" v-if="btnShow==1">
        <el-breadcrumb-item to="/ATS/talents/newResume">候选</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb> 
    <el-breadcrumb separator=">" v-if="btnShow==2">
        <el-breadcrumb-item to="/ATS/talents/alternative">备选库</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb> 
    <el-breadcrumb separator=">" v-if="btnShow==3">
        <el-breadcrumb-item to="/ATS/talents/library">面试库</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb> 
    <el-breadcrumb separator=">" v-if="btnShow==4">
        <el-breadcrumb-item to="/ATS/talents/enterprise">企业人才库</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb> 
    <el-breadcrumb separator=">" v-if="btnShow==5">
        <el-breadcrumb-item to="/ATS/pool/talentpool">录用库</el-breadcrumb-item>
        <el-breadcrumb-item>简历详情</el-breadcrumb-item>
    </el-breadcrumb> 

  <div style="width:1000px;margin:20px auto 20px;">
    <el-button type="primary" @click="checkExist('resumeRule')">保存简历</el-button>
  </div>
  <ul class="edit_resume">
    <li>
      <h2 class="essential_title">基本信息</h2>
      <div class="headImg">
        <img :src="resume.InterviewerInfo.headImg">
        <el-button type="primary" size="small" class="head_img_btn" @click="changeHeadImg">上传头像</el-button>
      </div>
      <el-form  :model="resume.InterviewerInfo" label-width="80px" class="essential clearfix" :rules="resumeRule" ref="resumeRule">
        <el-form-item label="姓 名" class="word_nuber_two" prop="name">
          <el-input v-model="resume.InterviewerInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性 别">
          <el-radio class="radio" v-model="resume.InterviewerInfo.sex" :label="1">男</el-radio>
          <el-radio class="radio" v-model="resume.InterviewerInfo.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="resume.InterviewerInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="resume.InterviewerInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-select v-model="resume.InterviewerInfo.workYear" placeholder="请选择">
            <el-option label="应届" :value="0"></el-option>
            <el-option label="一年" :value="1"></el-option>
            <el-option label="二年" :value="2"></el-option>
            <el-option label="三年" :value="3"></el-option>
            <el-option label="四年" :value="4"></el-option>
            <el-option label="五年" :value="5"></el-option>
            <el-option label="六年" :value="6"></el-option>
            <el-option label="七年" :value="7"></el-option>
            <el-option label="八年" :value="8"></el-option>
            <el-option label="九年" :value="9"></el-option>
            <el-option label="十年" :value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker
          v-model="resume.InterviewerInfo.birthday"
          type="date"
          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="教育程度">
          <el-select v-model="resume.InterviewerInfo.educationLev" placeholder="请选择">
            <el-option
              v-for="item in educationLevArr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="resume.InterviewerInfo.marryStatus" placeholder="请选择">
            <el-option label="未婚" :value="1"></el-option>
            <el-option label="已婚" :value="2"></el-option>
            <el-option label="离异" :value="3"></el-option>
            <el-option label="保密" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现 住 地" style="margin-bottom:20px;">
          <el-input v-model="resume.InterviewerInfo.nowLiveAddress"></el-input>
        </el-form-item>
      </el-form>

    </li>
    <li>
      <h2 class="essential_title">求职意向</h2>
      <el-form label-width="80px" class="essential clearfix">
        <el-form-item label="到岗时间">
          <el-input v-model="resume.InterviewerInfo.joinDate"></el-input>
        </el-form-item>
        <el-form-item label="工作性质">
          <el-select v-model="resume.InterviewerInfo.workType" placeholder="请选择">
            <el-option label="全职" :value="1"></el-option>
            <el-option label="兼职" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期望行业">
          <el-input v-model="resume.InterviewerInfo.expectIndustry"></el-input>
        </el-form-item>
        <el-form-item label="期望地点">
          <el-input v-model="resume.InterviewerInfo.expectPlace"></el-input>
        </el-form-item>
        <el-form-item label="期望薪资">
          <el-input v-model="resume.InterviewerInfo.expectSalary"></el-input>
        </el-form-item>
        <el-form-item label="期望职能" style="margin-bottom:20px;" required="">
          <el-input v-model="resume.InterviewerInfo.expectPosition"></el-input>
        </el-form-item>
      </el-form>
    </li>
    <li>
      <h2 class="essential_title">自我评价</h2> 
      <el-form label-width="80px" class="essential clearfix">
        <el-form-item label="自我评价" style="width:605px;height:auto;margin-bottom:20px;">
          <el-input v-model="resume.InterviewerInfo.myEvaluation" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </li>
    <li>
        <h2 class="essential_title">工作经历</h2>
        <el-form label-width="80px" class="essential clearfix for_wrap" v-for="(work,index) in resume.WorkHistory" :style="{marginTop:index>=1?'40px':'0px'}" :key="index">
          <el-form-item label="工作经历" class="essential_head">
            <span>{{index+1}}</span>
            <span class="el-icon-close close" @click="deleArrOfIndex(resume.WorkHistory,index)"></span>
          </el-form-item>
          <el-form-item label="开始时间">
              <el-date-picker
              v-model="work.startDate"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
              <el-date-picker
              v-model="work.endDate"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="work.workCompany"></el-input>  
          </el-form-item>
          <el-form-item label="担任职位">
            <el-input v-model="work.position"></el-input>  
          </el-form-item>
          <el-form-item label="工作职责" style="width:605px;height:auto;float:none;clear:both;margin-bottom:20px;">
            <el-input v-model="work.descript" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>  
          </el-form-item>
        </el-form>
        <div style="width:650px;margin:10px auto;">
          <el-button type="text" @click="addWork">新增一条工作经历</el-button>
        </div>
      </li>
      <li>
        <h2 class="essential_title">项目经验</h2> 
        <el-form label-width="80px" class="essential clearfix for_wrap" v-for="(project,index) in resume.InterviewerProject" :style="{marginTop:index>=1?'40px':'0px'}" :key="index">
          <el-form-item label="项目经验" class="essential_head">
            <span>{{index+1}}</span>
            <span class="el-icon-close close" @click="deleArrOfIndex(resume.InterviewerProject,index)"></span>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
            v-model="project.startDate"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
            v-model="project.endDate"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="项目名称" style="width:605px;height:auto;float:none;clear:both;margin-bottom:20px;">
            <el-input v-model="project.projectName"></el-input>  
          </el-form-item>
          <el-form-item label="项目内容" style="width:605px;height:auto;float:none;clear:both;margin-bottom:20px;">
            <el-input v-model="project.projectDescription" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>  
          </el-form-item>
        </el-form>
        <div style="width:650px;margin:10px auto;">
          <el-button type="text" @click="addProject">新增一条项目经验</el-button>
        </div>
      </li>
      <li>
        <h2 class="essential_title">教育经历</h2> 
        <el-form label-width="80px" class="essential clearfix for_wrap" v-for="(edu,index) in resume.EducationHistory" :style="{marginTop:index>=1?'40px':'0px'}" :key="index">
          <el-form-item label="教育经历" class="essential_head">
            <span>{{index+1}}</span>
            <span class="el-icon-close close" @click="deleArrOfIndex(resume.EducationHistory,index)"></span>
          </el-form-item>
          <el-form-item label="开始时间">
              <el-date-picker
              v-model="edu.startDate"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
              <el-date-picker
              v-model="edu.endDate"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="毕业学校">
              <el-input v-model="edu.graduateSchool"></el-input>  
          </el-form-item>
          <el-form-item label="所学专业">
            <el-input v-model="edu.major"></el-input>  
          </el-form-item>
          <el-form-item label="学历" style="margin-bottom:20px">
            <el-select v-model="edu.educationLev" placeholder="请选择">
              <el-option label="博士" :value="1"></el-option>
              <el-option label="研究生" :value="2"></el-option>
              <el-option label="本科" :value="3"></el-option>
              <el-option label="大专" :value="4"></el-option>
              <el-option label="其他" :value="5"></el-option>
            </el-select> 
          </el-form-item>
        </el-form>
        <div style="width:650px;margin:10px auto;">
          <el-button type="text" @click="addEdu">新增一条教育经历</el-button>
        </div>
      </li>
      <li>
        <h2 class="essential_title">培训经历</h2> 
        <el-form label-width="80px" class="essential clearfix for_wrap" v-for="(item,index) in resume.TrainingHistory" :style="{marginTop:index>=1?'40px':'0px'}" :key="index">
          <el-form-item label="培训经历" class="essential_head">
            <span>{{index+1}}</span>
            <span class="el-icon-close close" @click="deleArrOfIndex(resume.TrainingHistory,index)"></span>
          </el-form-item>
          <el-form-item label="开始时间">
              <el-date-picker
              v-model="item.startDate"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
              <el-date-picker
              v-model="item.endTime"
              type="date"
              placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="培训机构">
              <el-input v-model="item.tranOrganization"></el-input>  
          </el-form-item>
          <el-form-item label="培训课程" style="margin-bottom:20px;">
            <el-input v-model="item.tranContent"></el-input>  
          </el-form-item>
        </el-form>
        <div style="width:650px;margin:10px auto;">
          <el-button type="text" @click="addTraining">新增一条培训经历</el-button>
        </div>
      </li>
  </ul>
  <my-upload field="img"
  @crop-success="cropSuccess"
  @crop-upload-success="cropUploadSuccess"
  @crop-upload-fail="cropUploadFail"
  v-model="show"
  :url="imgUpload"
  :width="100"
  :height="100"
  :params="params"
  :headers="headers"
  img-format="png"></my-upload>
</div>
</template>
<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
import util from '../../script/util.js';
export default {
  name:'editResume',
  data(){
    var validatePhone=(rule,value,callback)=>{
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (!(/^1[34578][0-9]{9}$/.test(value))) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        }
      }, 1000);
    }
    return{
      id:this.$route.query.id,
      loading:false,
      loadingText:'拼命加载中请稍后..',
      imgUpload:util.uploadURLForCommon,
      params:{
        param:JSON.stringify({businessId:'12',fId:'-1'}),
        sign:this.$md5('fileUpload/insertFileRecord',JSON.stringify({businessId:'12',fId:'-1'}))
      },
      headers:{},
      input:'',
      educationLev:'',
      educationLevArr:[
        {name:'博士',value:1},
        {name:'研究生',value:2},
        {name:'本科',value:3},
        {name:'大专',value:4},
        {name:'其他',value:5}
      ],
      marriage:'',
      value1:'',
      textarea:'',
      show:false,
      resume:{
        InterviewerInfo:{
          name:'',
          sex:'',
          phone:'',
          email:'',
          workYear:'',
          birthday:'',
          educationLev:'',
          marryStatus:"",
          nowLiveAddress:'',
          headImg:'http://121.199.182.2/hrm/upload/head.png',
          joinDate:'',
          workType:'',
          expectIndustry:'',
          expectPlace:'',
          expectSalary:'',
          expectPosition:"",
          myEvaluation:'',
        },
        WorkHistory:[{
          startDate:'',
          endDate:'',
          workCompany:'',
          position:'',
          descript:''
        },
        {
          startDate:'',
          endDate:'',
          workCompany:'',
          position:'',
          descript:''
        }],
        InterviewerProject:[{
          startDate:'',
          endDate:'',
          projectName:'',
          projectDescription:''
        }],
        EducationHistory:[{
          startDate:'',
          endDate:'',
          graduateSchool:'',
          major:'',
          educationLev:'3'
        }],
        TrainingHistory:[{
          startTime:'',
          endTime:'',
          tranOrganization:'',
          tranContent:''
        }],
        LanguageSkill:[{
          languageSkill:'',
          languageLevel:''
        }],
        Qualification:[{
          qualificationDate:'',
          qualificationName:''
        }]
      },
      resumeRule:{
        name:[{ required: true, message: '请输入姓名', trigger: 'blur,change' }],
        phone:[{required: true, validator: validatePhone, trigger: 'blur,change' }],
        email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        // expectPosition:[{required:true,message:'请输入应聘职位'}]
      },
      btnShow:this.$route.query.btnShow
    }
  },
  mounted(){
    if(this.$route.query.id){
      this.getInterviewDetail();
    }else{
      if(localStorage.resume){
        this.resume = JSON.parse(localStorage.resume);
        this.resume.WorkHistory = this.filterArr(this.resume.WorkHistory);
        this.resume.InterviewerProject = this.filterArr(this.resume.InterviewerProject);
        this.resume.EducationHistory = this.filterArr(this.resume.EducationHistory);
        this.resume.TrainingHistory = this.filterArr(this.resume.TrainingHistory);
        this.resume.LanguageSkill = this.filterArr(this.resume.LanguageSkill);
        this.resume.Qualification = this.filterArr(this.resume.Qualification);
      }
    }
  },
  methods:{
    changeHeadImg() {
			this.show = !this.show;
		},
    deleArrOfIndex(arr,index){
      arr.splice(index,1)
    },
    //添加一条工作经历
    addWork(){
      this.resume.WorkHistory.push({
        startDate:'',
        endDate:'',
        workCompany:'',
        position:'',
        descript:''
      })
    },
    //添加一条项目经验
    addProject(){
      this.resume.InterviewerProject.push({
        startDate:'',
        endDate:'',
        projectName:'',
        projectDescription:''
      })
    },
    //添加一条教育经历
    addEdu(){
      this.resume.EducationHistory.push({
        startDate:'',
        endDate:'',
        graduateSchool:'',
        major:'',
        educationLev:3
      })
    },
    //添加一条培训记录
    addTraining(){
      this.resume.TrainingHistory.push({
        startTime:'',
        endTime:'',
        tranOrganization:'',
        tranContent:''
      })
    },
    //头像切割完成
    cropSuccess(){

    },
    //头像上传成功
    cropUploadSuccess(res){
      if(res.code==0){
        this.resume.InterviewerInfo.headImg=res.data.fileInfoList[0].url;
        this.show=false;
      }
    },
    //头像上传失败
    cropUploadFail(){

    },
    //保存简历
    saveResume(){
      let self=this;
      let id=self.$route.query.id;
      let method="addResume/saveChangeResume",
          param=JSON.stringify(self.resume),
          successd=function(res){
            self.$router.push({name:'newResume'});
          };
      self.$http(method,param,successd);
    },
    //修改简历
    updateResumeInfo(){
      let self=this;
      let id=self.$route.query.id;
      let resume={};
      resume.workHistory=self.resume.WorkHistory;
      resume.interviewerProject=self.resume.InterviewerProject;
      resume.basicInfo=self.resume.InterviewerInfo;
      resume.educationHistory=self.resume.EducationHistory;
      resume.trainingHistory=self.resume.TrainingHistory;
      resume.languageSkill=self.resume.LanguageSkill;
      resume.qualification=self.resume.Qualification;
      let method="resumeDetail/updateResumeInfo",
          param=JSON.stringify({resumeInfo:resume}),
          successd=function(res){
            self.loading=false;
            self.$router.push({name:'resume',query:{id:self.id,btnShow:self.btnShow}});
          },
          c=function(res){
            self.loading=false;
          };
      self.$http(method,param,successd,c);
    },
    //保存简历之前验证数据库中是否已经存在
    checkExist(rule2){
      let self=this;
      self.loading=true;
      self.loadingText="正在效验数据,请稍等...";
      if(self.id){
        self.updateResumeInfo();
        return false;
      }
      let method="addResume/isExit",
          param=JSON.stringify({
            basicInfo:{
              email:self.resume.InterviewerInfo.email,
              expectPosition:self.resume.InterviewerInfo.expectPosition,
              phone:self.resume.InterviewerInfo.phone.toString(),
            }
          }),
          successd=function(res){
            if(res.data.data.resultType==1){
              self.saveResume();
            }else if(res.data.data.resultType==2){
              self.$message.error("系统中已存在这份简历")
            }else{
              self.$message.error("系统中这份简历投递了其他的岗位")
            }
            self.loading=false;
          },
          errord=function(res){
            self.loading=false;
          };
      self.$refs[rule2].validate((valid)=>{
        if (valid) {
          self.$http(method,param,successd,errord);
        } else {
          self.loading=false;
          return false;
        }
      });
    },
    //获取简历详情
    getInterviewDetail(){
      var self=this;
      var method="resumeDetail/getInterviewDetail",
          param=JSON.stringify({
            interviewerId:self.id
          }),
          successd=function(res){
            res.data.data.interviewerInfo.headImg=res.data.data.headImg;
            self.resume.WorkHistory=res.data.data.workHistory;
            self.resume.InterviewerProject=res.data.data.interviewerProject;
            self.resume.InterviewerInfo=res.data.data.interviewerInfo;
            self.resume.EducationHistory=res.data.data.educationHistory;
            self.resume.TrainingHistory=res.data.data.trainingHistory;
            self.resume.LanguageSkill=res.data.data.languageSkill;
            self.resume.Qualification=res.data.data.qualification;
            console.log(self.resume,'12')
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    myUpload
  }
}
</script>
<style scoped>
.edit_resume{width: 1000px;margin:0 auto;}
.edit_resume li {background-color: #fff;margin-bottom: 20px;border-bottom:1px solid #E5E9F2;box-shadow: 0px 1px 5px 1px #E5E9F2;position: relative;}
.headImg{position: absolute;width:70px;height: 120px;left: 50%;top: 90px;margin-left: -485px;}
.headImg img{width: 70px;height: 70px;border-radius: 50%;}
.head_img_btn{margin: 20px auto;}
.essential{width:650px;margin: 0 auto;}
.essential.for_wrap{border:1px solid #ddd;}
.essential_title{font-weight: 600;height: 44px;padding-left: 20px;line-height: 44px;border-bottom: 1px solid #E5E9F2;margin-bottom: 20px;}
#edit_resume .essential_head{float: none;background-color: #eef1f6;width: auto;}
.close{cursor: pointer;float: right;display: block;width: 36px;height: 36px;line-height: 36px;text-align: center;color: #bfcbd9;transition:transform 0.1s;}
.close:hover{color: #5aa2e7;transform: rotateZ(180deg);}
</style>
<style>
.essential .el-form-item{width:50%;float: left;height:37px;}
.essential .el-form-item .el-input{width:200px;}
</style>



