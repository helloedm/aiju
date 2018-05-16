<template> 
<div id="resume">
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

    
    <div id="" class="hrm_module">  
        <div class="hrm_module_btn" v-if="btnShow>0">
            <el-button type="danger" @click="giveup" v-if="btnShow!=5 && btnShow==3 && libraryType!=2">放弃</el-button>
            <el-button type="danger" @click="moveToHireRepo" v-if="btnShow!=5 && btnShow==3 && libraryType!=5">录用</el-button>
            <el-button type="danger" @click="breakAppointment" v-if="btnShow!=5 && btnShow==3 && libraryType==2">爽约</el-button>
            <el-button type="danger" @click="notice" v-if="btnShow!=5 && btnShow==3 && libraryType==3 && libraryType==4 && libraryType==5">重邀面试</el-button>
            <el-button type="primary" @click="moveToSpareRepo" v-if="btnShow!=2 && btnShow!=5 && btnShow==3 && libraryType==4 && libraryType==5">移入备选库</el-button>
            <el-button type="primary" @click="moveToNewInterviewrepertory" v-if="btnShow!=1 && btnShow!=5 && btnShow==3 && libraryType==4 && libraryType==5">移入新简历库</el-button>
            <el-button type="primary" @click="notice" v-if="btnShow!=5&&btnShow!=3">面试通知</el-button>
            <el-button type="primary" @click="downloadResume" v-if="data.interviewerInfo&&data.interviewerInfo.resumeFrom!=9&&data.interviewerInfo.resumeUrl">查看简历源文件</el-button>
            <el-button type="primary" @click="editResume">编辑</el-button>
        </div>
        <div class="hrm_module_btn" v-else>
            <el-button type="primary" @click="editResume">编辑</el-button>
        </div>
    <div class="leftSide" v-if="data.interviewerInfo">
        <!-- <div class="content">
            <el-button>123</el-button>
        </div> -->
        <div class="header" v-if="data.interviewerInfo.headImg">
            <img :src="data.interviewerInfo.headImg" alt="头像">
        </div>
        <ul class="info">
            <li>
                <dt class="title">{{ data.interviewerInfo.name }} <span v-if="data.interviewerInfo.sex == 2" class="sex">女</span><span v-if="data.interviewerInfo.sex == 1" class="sex man">男</span></dt>
                <dd> <span>手机号码:</span>{{ data.interviewerInfo.phone }}</dd>
                <dd> <span>电子邮箱:</span>{{ data.interviewerInfo.email }}</dd>
                <dd> <span>工作年限:</span>{{ data.interviewerInfo.workYear }}</dd>
                <dd> <span>年龄:</span>{{ age }}</dd>
                <dd> <span>教育程度:</span>{{ transform.educationLev[data.interviewerInfo.educationLev] }}</dd>
                <dd> <span>婚姻状况:</span>{{ transform.marryStatus[data.interviewerInfo.marryStatus] }}</dd>
                <div style="padding:20px 0 0 0;clear:both;">
                    <el-button size="small" v-for="tag in resumeDefaultTags" :key="tag.id" :class="{'el-button--primary':tag.isShow==1}" @click="tagShow(tag)" class="resume_tag">
                        {{tag.name}}
                        <!-- <i class="iconfont resume_dele" @click.stop="deleTag(tag.id)" v-if="tag.isDefaultTag!=1">&#xe612;</i> -->
                    </el-button>
                    <el-button size="small" v-for="tag in resumeNonDefaultTags" :key="tag.id" class="resume_tag el-button--primary">
                        {{tag.name}}
                        <i class="iconfont resume_dele" @click.stop="deleTag(tag.id)" v-if="tag.isDefaultTag!=1">&#xe612;</i>
                    </el-button>
                    <el-button size="small" type="warning" @click="addtagShow=true" class="resume_tag">添加标签</el-button>
                </div>
            </li>
            <!-- <li>
                <dt class="title">面试信息</dt>
                <dd> <span>面试官:</span>{{ data.resumeInterviewResults.name }}</dd>
                <dd> <span>面试时间:</span>{{ data.resumeInterviewResults.interviewTime }}</dd>
                <dd> <span>面试联系人:</span>{{ data.resumeInterviewResults.contractName }}</dd>
                <dd> <span>联系电话:</span>{{ data.resumeInterviewResults.contractPhone }}</dd>
                <dd> <span>面试评估模板:</span>{{ data.resumeInterviewResults.templateId }}</dd>
                <dd> <span>面试地点:</span>{{ data.resumeInterviewResults.interviewAddress }}</dd>
            </li> -->
            <li>
                <dt class="title">基本信息</dt>
                <dd> <span>姓名:</span>{{ data.interviewerInfo.name }}</dd>
                <dd> <span>手机号码:</span>{{ data.interviewerInfo.phone }}</dd>
                <dd> <span>毕业学校:</span>{{ data.interviewerInfo.graduateSchool }}</dd>
                <dd> <span>电子邮箱:</span>{{ data.interviewerInfo.email }}</dd>
                <dd> <span>专业:</span>{{ data.interviewerInfo.speciality }}</dd>
                <dd> <span>现住地:</span>{{ data.interviewerInfo.nowLiveAddress }}</dd>
            </li>
            <li>
                <dt class="title">求职意向</dt>
                <dd> <span>到岗时间:</span>{{ data.interviewerInfo.joinDate }}</dd>
                <dd> <span>工作性质:</span>{{ data.interviewerInfo.workType==1?'全职':"兼职" }}</dd>
                <dd> <span>期望行业:</span>{{ data.interviewerInfo.expectIndustry }}</dd>
                <dd> <span>期望地点:</span>{{ data.interviewerInfo.expectPlace }}</dd>
                <dd> <span>期望薪资:</span>{{ data.interviewerInfo.expectSalary }}</dd>
                <dd> <span>期望职能:</span>{{ data.interviewerInfo.expectPosition }}</dd>
            </li>
            <li>
                <dt class="title">自我评价</dt>
                <dd style="width:80%;">{{ data.interviewerInfo.myEvaluation }}</dd>
            </li>
             <li class="vfor">
                <dt class="title" style="padding-bottom: 10px;">工作经历</dt>
                <div class="workExperience" v-for="(item, index) in data.workHistory" :key="item.id" :class="{border: index<data.workHistory.length-1}">
                    <div class="time">{{item.startDate | dateFilter}} -- {{item.updateTime | dateFilter}}</div>
                    <div class="companyWrap">
                         <div class="company">{{ item.workCompany }} <span>{{ item.position }}</span></div>
                            <div class="describe">
                                <p class="describeTitle">工作描述:</p>
                                <el-input type="textarea" v-model="item.descript" autosize icon="none" readonly resize="none" border="0">{{ item.descript }}</el-input>
                            </div>
                    </div>
                </div>
            </li>
             <li class="vfor">
                <dt class="title" style="padding-bottom: 10px;">项目经验</dt>
                <div class="workExperience" v-for="(item, index) in data.interviewerProject" :key="item.id" :class="{border: index<data.interviewerProject.length-1}">
                    <div class="time">{{item.startDate | dateFilter}} -- {{item.endDate | dateFilter}}</div>
                    <div class="companyWrap">
                         <div class="company">{{ item.title }}</div>
                            <div class="describe">
                                <p class="describeTitle">项目描述:</p>
                                <!-- <p>{{ item.projectDescription }}</p> -->
                                <el-input type="textarea" v-model="item.projectDescription" autosize icon="none" readonly resize="none" border="0">{{ item.descript }}</el-input>
                            </div>
                    </div>
                </div>
            </li>
             <li>
                <dt class="title">教育经历</dt>
                <ul class="educationExperience">
                    <li v-for="item in data.educationHistory" :key="item.id">
                        <div class="time">{{item.startDate | dateFilter}} -- {{item.endDate | dateFilter}}</div>
                        <b class="blod">{{ item.graduateSchool }}</b>
                        <span>{{ item.major }}</span>
                    </li>
                </ul>
            </li>
            <li>
                <dt class="title">培训经历</dt>
                <ul class="educationExperience">
                    <li v-for="item in data.trainingHistory" :key="item.id">
                       <div class="time">{{item.startTime | dateFilter}} -- {{item.endTime | dateFilter}}</div>
                        <b class="blod">{{ item.tranOrganization }}</b>
                        <span>{{ item.tranContent }}</span>
                    </li>
                </ul>
            </li>
            <li>
                <dt class="title">语言能力</dt>
                <ul class="educationExperience">
                    <li v-for="item in data.languageSkill" :key="item.id">
                        <span>{{ item.languageLevel }}</span>
                        <span>{{ item.languageSkill }}</span>
                    </li>
                </ul>
            </li>
            <li>
                <dt class="title">荣誉证书</dt>
                <ul class="educationExperience">
                    <li>
                        <span>{{ data.qualification?data.qualification.qualificationName:'' }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="rightSide">
        <div class="rightSideTop solidBottom">
            <div class="title ">当前简历状态</div>
            <el-tag class="elTag" v-if="resumeStatus.processStatus != 6 && resumeStatus.processStatus != null">{{ transform.interviewStatus[resumeStatus.processStatus] }}</el-tag>
            <img src="../../images/interview/weekOut.png" alt="已淘汰" v-if="resumeStatus.processStatus == 6">
            <ul>
                <li>应聘职位: <span>{{resumeStatus.positionName}}</span> </li>
                <li>应聘时间: <span>{{resumeStatus.postTime}}</span> </li>
            </ul>
        </div>
        <div class="rightSideBottom" v-if="data.zpRecord.length!=0">
            <div class="title solidBotto">招聘记录</div>
            <!-- <el-steps :space="100" direction="vertical" v-if="data.zpRecord.length!=0">
                <el-step 
                :title="record.operateStatus==1?'上传简历':record.operateStatus==2?'移到备选库':record.operateStatus==3?'面试邀约':'发送offer'" 
                :description="record.operateTime+(record.operateStatus==3?record.interviewAddress:'')" 
                v-for="record in data.zpRecord" 
                :key="record.id"></el-step>
            </el-steps> -->
            <ul class="record" v-if="data.zpRecord.length!=0">
                <li class="record_item" 
                v-for="record in data.zpRecord" 
                :key="record.id">
                    <span class="name">{{record.operateName}}</span>
                    <span class="dot"></span>
                    <div style="overflow:hidden;">
                    <div class="record_con">
                        <p class="">{{operateStatus[record.operateStatus]}}</p>
                        <p v-if="record.operateStatus==3">时间:{{record.interviewTime.substr(0,16)}}</p>
                        <p v-if="record.operateStatus==3">地址:{{record.interviewAddress}}</p>
                        <p class="time"><i class="iconfont">&#xe736;</i>{{record.operateTime}}</p>
                    </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div> 
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
</div>
 
</template>
<script>
export default {
  name:'resume',
  data(){
    return{
       transform: {
           marryStatus: [,'未婚', '已婚', '离异', '保密'],
           educationLev: ['', '博士', '研究生', 'MBA', '本科', '大专', '大学', '高中', '中专', '技校', '中技', '初中', '小学',,'大专以下','硕士'],
           interviewStatus:['','待面试','已签到','已提交登记表','录用','已入职','已淘汰','已接受面试','已拒绝面试','已过期面试','爽约','新简历','人才储备','待接受面试','备选库','需要下一轮面试','录用']
       },
       data: {
    "qualification": null,//荣誉证书
    "zpRecord": [
    //   {
    //     "id": 1,
    //     "interviewAddress": null, //面试地址 状态为3时用到该字段
    //     "interviewCount": 1, //面试轮数
    //     "interviewTime": null, //面试时间 状态为3时用到该字段
    //     "interviewerId": 12, //面试人id
    //     "operateId": null, //操作人id
    //     "operateName": null, //操作的时间
    //     "operateStatus": 2, //操作状态 1:上传简历 2:移动到备选库 3:面试邀约 4:发offer
    //     "operateTime": '2017.01.01' //操作的时间
    //   }
    ],
    "workHistory": [
    //   {
    //     "createTime": "", //创建时间
    //     "endDate": null, //在职结束时间
    //     "id": 11, //
    //     "interviewPhone": null, //面试者的电话
    //     "interviewerId": 12, //
    //     "leader": null, //上级主管
    //     "leaderPhone": null, //上级主管联系方式
    //     "leaveReason": null, //离职原因
    //     "position": "前端工程师", //工作的岗位
    //     "salary": "6000元/月", //薪资
    //     "startDate": "2017-02-01 00:00:00", //在职开始时间
    //     "updateTime": "2017-09-18 19:15:46", //在职结束时间
    //     "workCompany": null, //工作公司
    //     "descript":null//工作描述
    //   },
    //   {
    //     "createTime": "2017-09-18 19:15:46",
    //     "endDate": null,
    //     "id": 12,
    //     "interviewPhone": null,
    //     "interviewerId": 12,
    //     "leader": null,
    //     "leaderPhone": null,
    //     "leaveReason": null,
    //     "position": "研发工程师",
    //     "salary": null,
    //     "startDate": "2015-05-01 00:00:00",
    //     "updateTime": "2017-09-18 19:15:46",
    //     "workCompany": null
    //   }
    ],
    "interviewerProject": [
    //   {
    //     "endDate": "2017-02-01 00:00:00", //项目结束的时间
    //     "id": 4,
    //     "interviewerId": 12,
    //     "projectDescription": "监控信息集中管理平台:目的在于集中接入中国移动通信集团贵州有限公司现有网管支撑系统重点网络指标信息,结合移动应用,分群体推送监控结论和报表,聚焦关注点,提升工作效率。\r\n技术栈:SpringMVC4.0+, MyBatis, ApacheShiro, ehcache, Jquery,\r\nBootStrap,WebSocket", //项目描述
    //     "projectName": "监控日报系统开发", //项目名称
    //     "responsibilities": "负责项目前端搭建,需求沟通。\r\n独立开发前端组件,处理好页面的动态效果,精准匹配设计人员的设计方案,\r\n后端工程师紧密配合,高质高效完成开发工作(并参与部分后端代码编写),\r\n完成单元测试。(其中为了提高开发效率使用angular重构原有项目)\r\n项目业绩:\r\n目前已经完成该项目任务并成功交付使用。", //项目职责
    //     "startDate": "2016-10-01 00:00:00", //项目开始时间
    //     "title": "前端工程师" //项目的标题
    //   },
    //   {
    //     "endDate": "2016-07-01 00:00:00",
    //     "id": 5,
    //     "interviewerId": 12,
    //     "projectDescription": "告警采集分析模块通过对告警数据进行实时的汇总分析,快速发现设备产生的告警量突变并及时通知相关人员,以达到及时定位告警异常设备,提供网络质量。同时,通过数据进行横向和纵向比对,统计设备告警量产生的规律,便于相关人员根据设备告警量产生规律合理安排设备维护等后续相关工作",
    //     "projectName": "集中故障告警分析",
    //     "responsibilities": "负责项目前端搭建,需求沟通。\r\n与后端工程师紧密配合,高质高效完成开发工作(并参与部分后端代码编写),\r\n项目业绩:\r\n目前已经完成该项目任务并成功交付使用。",
    //     "startDate": "2016-04-01 00:00:00",
    //     "title": "前端工程师"
    //   },
    //   {
    //     "endDate": "2015-04-01 00:00:00",
    //     "id": 6,
    //     "interviewerId": 12,
    //     "projectDescription": "为提高公司测试人员工作效率,规范测试工作,缩短测试周期,避免人为出错内部开发出的自动化测试网站。",
    //     "projectName": "自动化测试网站",
    //     "responsibilities": "项目采用.net 的MVC网站架构,实习期间主要负责\r\n1、基于html5标准进行PC网站的页面制作,兼容各种主流浏览器\r\n2、配合后端技术增加页面的JS交互效果以及CSS排版\r\n项目业绩:\r\n目前项目已经成功上线并交付使用",
    //     "startDate": "2014-10-01 00:00:00",
    //     "title": "前端工程师"
    //   }
    ],
    "trainingHistory": [
    //   {
    //     "endTime": "2017-09-12 11:39:24", //培训结束时间
    //     "id": 1,
    //     "interviewerId": 12,
    //     "startTime": "2017-09-05 11:39:21", //培训开始时间
    //     "tranContent": "drfeswwe", //培训描述
    //     "tranOrganization": "dfsf" //培训机构
    //   }
    // ],
    // "languageSkill": [
    // {
    //   "id": 3,
    //   "interviewerId": 12,
    //   "languageLevel": null,//表达的语言类型 比如英语 ，日语 法语
    //   "languageSkill": "普通话" //语言表达的水平
    // }
    ],
    "educationHistory": [
    //   {
    //     "createTime": "2017-09-18 19:15:46",//创建时间
    //     "endDate": "2015-07-01 00:00:00", //教育经历结束时间
    //     "graduateSchool": "西南交通大学", //毕业院校
    //     "id": 6,
    //     "interviewPhone": null,//面试者的电话
    //     "interviewerId": 12,
    //     "major": "软件工程", //所学专业
    //     "startDate": "2011-09-01 00:00:00",//教育经历起始时间
    //     "updateTime": "2017-09-18 19:15:46"//更新时间
    //   }
    ],
    "resumeInterviewResults": [
    //   {
    //     "companyId": 169359,
    //     "contractName": "小天明", //面试联系人
    //     "contractPhone": 17080346772, //联系人电话
    //     "createTime": null,// 创建时间
    //     "email": null,//邮箱
    //     "evaluateTempletId": 5, //评价模板表的主键id
    //     "id": null,
    //     "industry": null,//行业
    //     "interviewAddress": "杭州 公元里", //面试地址
    //     "interviewCount": null,//面试轮数
    //     "interviewStatus": null,//简历状态：1:待面试 2:已签到 3:已提交登记表 4:录用 5:已入职 6:已淘汰7:已接受面试 8:已拒绝面试 9:已过期面试 10:爽约
    //     "interviewTime": "2017-09-25 10:20:20", //面试时间
    //     "interviewType": null,//当前面试类型： 1现场面试 2电话面试
    //     "intervieweeId": 13,//新选择的面试官id
    //     "interviewerId": 12,//面试者ID
    //     "interviewerRejectReasonId": 0,//面试者拒绝原因ID
    //     "isDelete": null,//是否删除
    //     "monthSalary": null,//月薪
    //     "name": "hujian324",//面试官姓名
    //     "phone": null,//手机号
    //     "position": null,//职位
    //     "positionId": null,//职位ID
    //     "remindType": null,//提醒面试人类型 1 短信 2 邮件 3 短信和邮件
    //     "remindTypes": null,//
    //     "signTime": null,//签到时间
    //     "templateId": null,//评价模板ID
    //     "yearSalary": null//年薪
    //   }
    ],
    "interviewerInfo": {
        "headImg":null,
      "birthday": "",//生日
      "censusRegister": "",//户籍
      "companyId": null,//公司ID
      "createTime": "",//创建时间
      "creatorId": null,//创建人ID
      "educationLev": 2,//最高学历1博士、2研究生、3MBA、4本科、5大专、6大学、7高中、8中专、9技校、10中技、11初中、12小学13其他（双学位归并到本科，大学是指原文只提到大学，没有其他相关信息的情况）14大专以下15硕士
      "email": "",//邮箱
      "expectIndustry": null,//期望行业
      "expectPlace": null,//期望地点
      "expectPosition": null,//期望职位
      "expectSalary": null,//期望薪资
      "friendRemaik": null,//认识的熟人的描述
      "graduateSchool": "",//毕业学校
      "graduatetime": "",//毕业时间
      "haveAcquaintance": 0,//公司有没有认识的熟人 0:没有 1:有
      "height": 180,//身高
      "homeAddress": "",//家庭住址
      "hukouAddress": "",//户口所在地
      "hukouType": 1,//户口类型，0农村1非农
      "id": 12,//
      "idCardNo": "",//身份证号
      "importWay": 1,//导入方式 1:手动上传 2:其他(待后期添加具体的值)
      "jobStatus": 2,//1：离职 2：在职 3：准备跳槽
      "joinDate": null,//入职时间
      "jsonContent": null,//简历解析后的json字符串
      "marryStatus": 1,//1：未婚 2：已婚 3：离异4：保密
      "myEvaluation": null,//自我评价
      "name": "",//名字
      "national": null,//民族
      "nowLiveAddress": "",//现住址
      "phone": "",//手机号
      "politicalStatus": 2,//政治面貌01 中共党员02 中共预备党员03共青团员04 民革党员05 民盟盟员06 民建会员07 民进会员
      "positionName": null,//职位名称
      "postTime": null,//应聘时间/简历投递时间
      "processStatus": '',//1,面试者的状态1:待面试 2:已签到 3:已提交登记表 4:录用 5:已入职 6:已淘汰7:已接受面试 8:已拒绝面试 9:已过期面试 10:爽约 11上传简历（初始状态）
      "qq": "12345678",//qq号
      "recommendId": null,//推荐人ID
      "recommendPhone": null,//推荐人手机号
      "resumeFrom": 1,//简历来源1:前程无忧 2:智联招聘 3:中华英才网 4:58同城 5:大街网 6:拉勾 7:boss直聘 8:猎聘 9:微招聘 10:手动上传 11:邮箱导入 12:员工推荐 13:赶集网 14:人才捕手 15:其他
      "resumeStatus": null,//简历状态0：未读1：已读
      "resumeUrl": null,//简历url
      "sex": 0,//性别1：男 2：女 3：未知
      "speciality": "",//专业
      "tagIds": "",//标签id
      "updateTime": "",//更新时间
      "workType": null,//工作性质
      "workYear": 3//工作年限
    }
  },
    resumeStatus:{
        positionName:"",
        postTime:'',
        processStatus:'',
    },
    giveUpShow:false,
    resumeCheckboxObj:{},
    resumeCheckboxArr:[],
    resumeCheckboxNum:0,
    eliminateReason:[],
    baseInfo:{},
    tags:[],
    giveupObj:{
        interviewerId:this.$route.query.id,
        isSendEmail:'',
        interviewerRejectReasonId:'',
        eliminateReason:'',
        tagIds:[],
        intervewerRepo:''
    },

    addtagShow:false,
    addtagName:'',

    resumeDefaultTags:[],
    resumeNonDefaultTags:[],
    
    btnShow:this.$route.query.btnShow?this.$route.query.btnShow:0,//进入简历详情来源0.面试过程进入1.新简历库进入2.备选库进入3.面试库进入4.人才库进入
    libraryType:localStorage.library?localStorage.library:'1',//面试库来源状态

    operateStatus:[
        '求职者投递简历',
        '上传简历',
        '移入备选库',
        '面试邀约',
        '发送offer',
        '移入爽约库',
        '录用',
        '淘汰',
        '移入人才储备库',
        '重新发送面试邀约',
        '下载简历(查看完整简历)',
        '移入新简历库',
        '查看简历',
        '确认该offer到岗'
    ]
    }
  },
  methods:{
     init(){
        var self=this;
        let method = 'queryResume/getResumeDetails',
        params = JSON.stringify({
            interviewerId: self.$route.query.id
        }),
        successd = function(res){
            console.log(res);
            self.data=res.data.data;
            self.getresumeStatus();
        }
        this.$http(method, params, successd)
     },
     getresumeStatus(){
         var self=this;
         var method="interviewer/resumeStatus",
            param=JSON.stringify({
                interviewerId:self.$route.query.id
            }),
            successd=function(res){
                self.resumeStatus=res.data.data;
                // self.data.interviewerInfo.positionName=res.data.data.positionName;
                // self.data.interviewerInfo.postTime=res.data.data.postTime;
                // self.data.interviewerInfo.processStatus=res.data.data.processStatus;
                self.data.interviewerInfo.headImg=res.data.data.headImg;
            };
        self.$http(method,param,successd);
     },
     history(){
        this.$router.go(-1);
     },
    giveup(){
      var self=this;
      var method="operateResume/getQuitBaseInfo",
          param=JSON.stringify({
            id:self.$route.query.id
          }),
          successd=function(res){
            self.baseInfo=res.data.data.baseInfo;
            self.eliminateReason=res.data.data.eliminateReason;
            self.tags=res.data.data.tags;
            self.giveUpShow=true;
          };
      self.$http(method,param,successd);
    },
    giveupSubmit(){
      var self=this;
      var method="operateResume/moveManyToQuitRepo";
      var param={},tagIds=[];
      param.quitList=[];
      param.quitList.push({id:self.giveupObj.interviewerId,isSend:self.giveupObj.isSendEmail?'1':'0'});
    //   param.interviewerId=self.giveupObj.interviewerId;
    //   param.isSendEmail=self.giveupObj.isSendEmail?'1':'0';
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
    addtag(){
      var self=this;
      var method="resumeTag/addResumeTagToInterviewerInfo",
          param=JSON.stringify({
            interviewerId:self.giveupObj.interviewerId,
            tagName:self.addtagName
          }),
          successd=function(res){
              if(self.giveUpShow){
                self.giveup();
              }else{
                self.getResumeTags();
              };
              self.addtagShow=false;
          };
      self.$http(method,param,successd);
    },
    notice(){
      this.$router.push({name:'notice',params:{id:this.giveupObj.interviewerId}});
    },
    moveToSpareRepo(){
      var self=this;
      var method="operateResume/moveToSpareRepo",
          param=JSON.stringify({
            ids:self.giveupObj.interviewerId
          }),
          successd=function(res){
            self.$router.go(-1);
            self.$message({
              message:res.data.data,
              type:'success'
            });
          };
      self.$http(method,param,successd);
    },
    downloadResume(){
      var self=this;
      var method="queryResume/downloadResume",
          param=JSON.stringify({
            InterviewId:self.giveupObj.interviewerId
          }),
          successd=function(res){
              var reg = new RegExp("pdf");
              var result = reg.test(res.data.data);
              if(result){
                window.open(res.data.data);
              }else{
                location.href=res.data.data;
              }
          };
      self.$http(method,param,successd);
    },
    getResumeTags(){
        var self=this;
        var method="resumeTag/getResumeTags",
            param=JSON.stringify({
                interviewerId:self.$route.query.id
            }),
            successd=function(res){
                self.resumeDefaultTags=res.data.data.resumeDefaultTags;
                self.resumeNonDefaultTags=res.data.data.resumeNonDefaultTags;
            };
        self.$http(method,param,successd);
    },
    tagShow(tag){
        var self=this;
        var method="resumeTag/addDefaultResumeTag";
        if(tag.isShow==1){
            tag.isShow=0;
        }else{
            tag.isShow=1;
        }
        var param=JSON.stringify({
            interviewerId:self.$route.query.id,
            id:tag.id,
            isSelected:tag.isShow
        }),
        successd=function(res){
            self.$message({
                message:'操作成功!',
                type:'success'
            });
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
            if(self.giveUpShow){
                self.giveup();
              }else{
                self.getResumeTags();
              };
          };
      self.$http(method,param,successd);
    },
    changeEliminateReason(id){
      var self=this;
      self.eliminateReason.forEach(function(item){
        if(item.id==id){
          self.giveupObj.eliminateReason=item.remark;
        }
      })
    },
    moveToNewInterviewrepertory(){
      var self=this;
      var method="queryResume/moveToNewInterviewrepertory",
          param=JSON.stringify({
            InterviewId:self.giveupObj.interviewerId
          }),
          successd=function(res){
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    },
    moveToHireRepo(){
      var self=this;
      var method="operateResume/moveToHireRepo",
          param=JSON.stringify({
            ids:self.giveupObj.interviewerId
          }),
          successd=function(res){
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    },
    breakAppointment(){
      var self=this;
      var method="operateResume/moveToBreakPromiseRepo",
          param=JSON.stringify({ids:self.giveupObj.interviewerId}),
          successd=function(res){
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    },
    editResume(){
        this.$router.push({name:'editResume',query:{id:this.$route.query.id,btnShow:this.btnShow}})
    }
  },
  filters: {
    dateFilter: function (value) {
        if(typeof value == "string"){
          var d = new Date(value);
          return  d.getFullYear()+ "." + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1));
        }
    }
  },
  computed:{
      age(){
         let birthday = new Date(this.data.interviewerInfo.birthday);
         if(this.data.interviewerInfo.birthday){
             return new Date().getFullYear() - birthday.getFullYear();
         }else{
             return null;
         }
      },
  },
  mounted(){
    this.init();
    this.getResumeTags();
  }
}
</script>
<style scoped>
.hrm_module{
    position: relative;
    top: 15px;
    border: none;
}
.leftSide{
    width: auto;
    /* height: 800px; */
    margin-right: 286px;
    position: relative;
}
.header{
    width: 70px;
    height: 70px;
    /* background: red; */
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 20px;
}
.header>img{
    width: 70px;
    height: 70px;
    vertical-align: top;
}
.info>li{
    padding-left: 120px;    
    overflow: auto;
    padding-bottom: 20px;
    border-bottom: 1px solid #E0E6ED;        
}
.info>li.vfor{
    padding: 0 20px 0 40px;
}
.info>li.vfor>dt, .info>li>div{
    padding-left: 80px;  
}
.title{
    font-size: 16px;
    font-weight: 600;
    padding: 20px 0 25px;
}
.info dd{
    display: inline-block;
    width: 50%;
    float: left;
    color: #1F2D3D;
    font-size: 14px;
    line-height: 27px;
}
dd span{
    color: #475669;
    min-width: 72px;
    display: inline-block;
}
.rightSide{
    width: 266px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-left: 20px;
    background-color: #f5f8fa;
}
.content{
    width: 100%;
    height: 200px;
    background-color: yellow;
}
.sex{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ff6197;
    font-size: 5px;
    line-height: 15px;
    text-align: center;
    color:#fff;
    display: inline-block;
}
.sex.man{
    background-color: #22be8c;
}
.companyWrap{
    display: inline-block;
    margin: -20px 0px 0 150px;
    width: auto;
    min-width: 80%;
}
.company{
    color: #1F2D3D;
    font-weight: 600;
}
.company span{
    float: right;
    margin-right: 20px;
}
.workExperience.border{
    border-bottom: 1px dotted #E0E6ED;
    /* padding: 20px 0; */
}
.workExperience{
    padding: 20px 0;
}
.time{
    width: 150px;
    display: inline-block;
    /* float: left; */
}
.describeTitle{
    color: #475669;
    font-size: 14px;
    margin: 15px 0 15px;
}
.blod{
    font-weight: 600;
}
.educationExperience li span{
    margin-left: 10px;
}
.rightSideTop, .rightSideBottom{
    padding: 0 20px;
    background-color: #fff;
    height: 132px;
}
.rightSideTop img{
    position: absolute;
    top: 10px;
    right: 10px;
}
.solidBottom{
     border-bottom: 1px solid #E0E6ED;
}
.rightSideBottom{
    margin-top: 20px;
    height: auto;
    padding-bottom: 20px;
}
.elTag{
    position: absolute;
    right: 20px;
    top: 20px;
}
.resume_dele{font-size: 12px;display: inline-block;background-color: #ddd;color: #fff;border-radius: 50%;padding: 2px;position: absolute;right: -8px;top: -8px;}
.resume_tag{position: relative;margin-top: 10px;}
.record{padding-left:60px;}
.record_item{position: relative;border-left: 2px solid #c0ccda;padding-left:10px;height: 100px;}
.record_item:last-child{border-color: #fff;}
.record_item:first-child .dot{background-color:#5aa2e7;}
.record_item .name{position: absolute;left: -70px;top: -5px;text-align: right;width: 60px;}
.record_item .dot{position: absolute;left: -6px;top: 0px;width: 10px;height: 10px;border-radius: 50%;background-color: #c0ccda;}
.record_item .record_con{position: absolute;top:-5px;left:10px;width: 170px;}
.record_con .iconfont{font-size: 12px;}
.record_con .time{color: #99A9Bf;width: auto;}
.giveup_personal{margin-bottom: 10px;}
.giveup_personal span{font-size: 16px;margin-right:20px;font-weight: 600;}
</style>
<style>
#resume .el-step__description{
    width: 120px;
}
#resume .describe textarea{border: none;padding:0;}
/* #resume .describeTitle textarea{padding:0;} */
</style>



