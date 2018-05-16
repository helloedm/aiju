<template>
  <div class="recruitment" id="recruitment">
    <!-- <h1>每次相遇有趣的你,都是我的小确幸</h1> -->

    <div class="hrm_module">
    <div class="hrm_module_con recruitment_header">
      <dl class="calendar">
        <dt class="calendar_header">
          <button class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="preMonth"></button>
          <span class="padding_0_5">{{chooseYear}}</span>年<span class="padding_0_5">{{chooseMonth}}</span>月
          <button class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right" @click="nextMonth"></button>
        </dt>
        <dd class="calendar_con">
          <table class="el-date-table" cellspacing="0" cellpadding="0">
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
            <tr v-for="week in mounthList">
              <td 
              v-for="day in week" 
              :key="day.chooseDay" 
              :class="{'disabled':!day.current,'available':day.current,'today':day.chooseYear==nowYear&&day.chooseMonth==nowMonth&&day.chooseDay==nowDay,'current':day.chooseDay==chooseDay,'hasRecord':day.value==1}" 
              @click="chooseDate(day)"
              >
                <div>
                  <span>{{day.chooseDay}}</span>
                </div>
              </td>
            </tr>
          </table>
        </dd>
      </dl>
      <div class="right_con">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="'待面试('+page1.totalCount+')'" name="1">
            <dl class="deal_interview" v-for="interview in awaitInterviewRecords" :key="interview.interviewId" @click="resume(interview.interviewerId,'3')">
              <dt><img :src="interview.headImg"></dt>
              <dd>
                <h2>{{interview.name}}</h2>
                <p>{{interview.positionName}}</p>
              </dd>
            </dl>

            <div class="no_data" v-if="awaitInterviewRecords.length==0">
              <p class="color_99a9bf">暂无面试安排</p>
            </div>

             <el-pagination
              layout="prev, pager, next"
              @current-change="changePageNum1"
              :total="page1.totalCount">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="'待录用('+page2.totalCount+')'" name="2">
            <dl class="deal_interview" v-for="hire in awaitHireRecords" :key="hire.interviewId" @click="resume(hire.interviewerId,5)">
              <dt><img :src="hire.headImg"></dt>
              <dd>
                <h2>{{hire.name}}</h2>
                <p>{{hire.positionName}}</p>
              </dd>
            </dl>

            <div class="no_data" v-if="awaitHireRecords.length==0">
              <p class="color_99a9bf">暂无待录用</p>
            </div>

            <el-pagination
              layout="prev, pager, next"
              @current-change="changePageNum2"
              :total="page2.totalCount">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="'待入职('+page3.totalCount+')'" name="3">
            <dl class="deal_interview" v-for="entry in awaitEntryRecords" :key="entry.interviewId" @click="resume(entry.interviewerId,4,'entry')">
              <dt><img :src="entry.headImg"></dt>
              <dd>
                <h2>{{entry.name}}</h2>
                <p>{{entry.positionName}}</p>
              </dd>
            </dl>

            <div class="no_data" v-if="awaitEntryRecords.length==0">
              <p class="color_99a9bf">暂无待入职</p>
            </div>

            <el-pagination
              layout="prev, pager, next"
              @current-change="changePageNum3"
              :total="page3.totalCount">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="12" class="">
        <div class="position_management">
          <h2>职位管理</h2>
          <el-row class="management_top">
            <el-col :span="12">
              <h6>在招职位数</h6>
              <p @click="toList">{{recruitIndexInfo.recruitingPositionMap.recruitingPositionCount}}</p>
            </el-col>
            <el-col :span="12">
              <dl class="issue_resume" @click="toPost">
                <dt>添加新职位</dt>
                <dd><i class="iconfont">&#xe767;</i></dd>
              </dl>
            </el-col>
          </el-row>
          <el-row class="add_resume_header">
            <el-col :span="20">在招职位</el-col>
            <el-col :span="4" class="icon" @click.native="toList" title="查看更多"><i class="iconfont">&#xe622;</i></el-col>
          </el-row>
          <el-row class="add_resume_con" v-for="(position,index) in recruitIndexInfo.recruitingPositionMap.recruitingPositionList" :key="position.id" v-if="index<3">
            <el-col :span="10" class="white-space-nowrap">{{position.positionName}}</el-col>
            <el-col :span="4" class="white-space-nowrap">{{position.workCity?position.workCity:'不限'}}</el-col>
            <el-col :span="10" class="white-space-nowrap">{{position.posiPublishTime?position.posiPublishTime.substring(0,10):''}}</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" class="">
        <div class="position_management">
          <h2>招聘管理</h2>
          <el-row class="management_top">
            <el-col :span="12">
              <h6>新增投递量</h6>
              <p @click="toNewResume">{{recruitIndexInfo.todaysResumeMap.newResumeCount}}</p>
            </el-col>
            <el-col :span="12">
              <h6>未查阅投递量</h6>
              <p @click="toNewResume">{{recruitIndexInfo.unreadResumeCount}}</p>
            </el-col>
          </el-row>
          <el-row class="add_resume_header">
            <el-col :span="20">新增简历</el-col>
            <el-col :span="4" class="icon" @click.native="toNewResume" title="查看更多"><i class="iconfont">&#xe622;</i></el-col>
          </el-row>
          <el-row class="add_resume_con" v-for="(newResume,index) in recruitIndexInfo.todaysResumeMap.newResumeList" ::key="newResume.id" v-if="index<3">
            <el-col :span="10" class="white-space-nowrap">{{newResume.positionName}}</el-col>
            <el-col :span="4" class="white-space-nowrap">{{newResume.name}}</el-col>
            <el-col :span="10" class="white-space-nowrap" v-if="newResume.workYear">{{newResume.workYear}}年工作经历</el-col>
          </el-row>
          <el-row class="add_resume_con" v-if="recruitIndexInfo.todaysResumeMap.newResumeList==null||recruitIndexInfo.todaysResumeMap.newResumeList.length==0">
            <el-col :span="24" class="color_99a9bf">今日暂无新投递简历</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name:'recruitment',
  data(){
    var nowYear=new Date().getFullYear();
    var nowMonth=(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1);
    var nowDay=(new Date().getDate())<10?'0'+(new Date().getDate()):(new Date().getDate());
    return{
      activeName:'1',
      chooseDateVal:nowYear+'-'+nowMonth+'-'+nowDay,
      chooseMonth:nowMonth,
      chooseYear:nowYear,
      chooseDay:nowDay,
      nowMounths:[],
      mounthList:{},
      nowYear:'',
      nowMonth:'',
      nowDay:'',
      page1:{
        pageSize:8,
        pageNum:1,
        totalCount:0
      },
      page2:{
        pageSize:8,
        pageNum:1,
        totalCount:0
      },
      page3:{
        pageSize:8,
        pageNum:1,
        totalCount:0
      },
      awaitHireRecords:[],//待录用
      awaitEntryRecords:[],//待入职
      awaitInterviewRecords:[],//待面试
      recruitIndexInfo:{
        recruitingPositionMap:{},
        todaysResumeMap:{},
        unreadResumeCount:0
      },
    }
  },
  mounted(){
    this.getDateList();
    this.index();
    this.interviewArrangement();
  },
  methods:{
    //获取日历
    getDateList(){
      var self=this;
      var method="promotionPage/haveRecordDates",
          param=JSON.stringify({
            chooseMonth:self.chooseMonth,
            chooseYear:self.chooseYear
          }),
          successd=function(res){
            var dateObj=res.data.data.haveRecordDates;
            self.nowYear=res.data.data.nowDate.substring(0,4);
            self.nowMonth=res.data.data.nowDate.substring(5,7);
            self.nowDay=res.data.data.nowDate.substring(8,10);
            var nowMounths=new Array();
            for (var key in dateObj) {
              // self.nowMounths.push([key.substring(8)]=dateObj[key]);
              var chooseYear=key.substring(0,4);
              var chooseMonth=key.substring(5,7);
              var chooseDay=key.substring(8,10);
              nowMounths.push({
                'chooseYear':chooseYear,
                'chooseMonth':chooseMonth,
                'chooseDay':chooseDay,
                'value':dateObj[key],
                'current':self.chooseMonth==chooseMonth
              });
            }
            self.nowMounths=JSON.parse(JSON.stringify(nowMounths));
            self.mounthList=new Array();
            for(var i=0;i<6;i++){
              if(nowMounths.length>0){
                self.mounthList.push(nowMounths.splice(0,7));
              }
            }
            console.log(self.mounthList);
            console.log(self.nowMounths);
          };
      self.$http(method,param,successd);
    },
    index(){
      var self=this;
      var method="recruitIndexInfo/getRecruitIndexInfo",
          param=JSON.stringify({}),
          successd=function(res){
            self.recruitIndexInfo=res.data.data;
          };
      self.$http(method,param,successd);
    },
    interviewArrangement(){
      var self=this;
      var method="promotionPage/interviewArrangement",
          param=JSON.stringify({
            selectDate:self.chooseDateVal,
            pageSize1:self.page1.pageSize,
            pageNum1:self.page1.pageNum,
            pageSize2:self.page2.pageSize,
            pageNum2:self.page2.pageNum,
            pageSize3:self.page3.pageSize,
            pageNum3:self.page3.pageNum,
          }),
          successd=function(res){
            self.awaitInterviewRecords=res.data.data.awaitInterviewRecords;//待面试
            self.page1=res.data.data.awaitInterviewRecordsPage;
            self.awaitHireRecords=res.data.data.awaitHireRecords;//待录用
            self.page2=res.data.data.awaitHireRecordsPage;
            self.awaitEntryRecords=res.data.data.awaitEntryRecords;//待入职
            self.page3=res.data.data.awaitEntryRecordsPage;
          };
      self.$http(method,param,successd);
    },
    chooseDate(day){
      var self=this;
      if(!day.current){return false}
      self.chooseYear=day.chooseYear;
      self.chooseMonth=day.chooseMonth;
      self.chooseDay=day.chooseDay;
      self.chooseDateVal=day.chooseYear+'-'+day.chooseMonth+'-'+day.chooseDay;
      console.log(self.chooseDateVal);
      self.interviewArrangement();
    },
    preMonth(){//上一月
      this.chooseDateVal=new Date(new Date(this.chooseDateVal).getTime()-30*24*60*60*1000);
      this.chooseYear=this.chooseDateVal.getFullYear();
      this.chooseMonth=this.chooseDateVal.getMonth()<9?'0'+(this.chooseDateVal.getMonth()+1):this.chooseDateVal.getMonth()+1;
      this.chooseDay=this.chooseDateVal.getDate();
      this.chooseDateVal=this.chooseYear+'-'+this.chooseMonth+'-'+this.chooseDay;
      this.getDateList();
      this.interviewArrangement();
    },
    nextMonth(){
      this.chooseDateVal=new Date(new Date(this.chooseDateVal).getTime()+30*24*60*60*1000);
      this.chooseYear=this.chooseDateVal.getFullYear();
      this.chooseMonth=this.chooseDateVal.getMonth()<9?'0'+(this.chooseDateVal.getMonth()+1):this.chooseDateVal.getMonth()+1;
      this.chooseDay=this.chooseDateVal.getDate();
      this.chooseDateVal=this.chooseYear+'-'+this.chooseMonth+'-'+this.chooseDay;
      this.getDateList();
      this.interviewArrangement();
    },
    toPost(){
      this.$router.push({name:'publishPosition'});
    },
    toList(){
      this.$router.push({name:'publishList'});
    },
    toNewResume(){
      this.$router.push({name:'newResume'});
    },
    changePageNum1(val){
      this.page1.pageNum=val;
      this.interviewArrangement;
    },
    changePageNum2(val){
      this.page2.pageNum=val;
      this.interviewArrangement;
    },
    changePageNum3(val){
      this.page3.pageNum=val;
      this.interviewArrangement;
    },
    resume(id,btnShow,type){
      if(type=='entry'&&id==0){
        this.$router.push({name:'talentpool'});
        localStorage.talentStatus=3;
        return
      }
      this.$router.push({name:'resume',query:{id:id,btnShow:btnShow}})
    },
  },
  components:{
    
  }
}
</script>

<style scoped>
.recruitment h1{font-size: 16px;font-weight: 500;margin:0 0 20px 20px;}
.recruitment_header{height: 280px;padding: 20px;}
.calendar{width:230px;min-height: 280px;float: left;border:1px solid #eee;padding: 0 20px;}
.calendar_header{text-align: center;margin:12px;line-height: 22px;}
.calendar_con{text-align: center;}
.right_con{margin-left: 290px;height: 280px;}
.el-tabs{clear:none;}
.deal_interview{display: inline-block;margin: 0px 30px 15px 20px;cursor: pointer;}
.deal_interview dt {width:60px;height:60px;border-radius: 50%;overflow: hidden;float: left;}
.deal_interview dt img{width:60px;height: 60px;vertical-align: top;}
.deal_interview dd{margin-left: 80px;height: 60px;font-size: 14px;margin-top: 10px;}
.deal_interview dd h2,.deal_interview dd p{font-size: 14px;font-weight: 500;width: 112px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap; }
.position_management{height:310px;background-color: #fff;box-shadow: 1px 1px 10px 1px #eee;}
.position_management h2{height: 50px;border-bottom: 1px solid #E5E9F2;color: #1F2D3D;font-size: 16px;line-height: 50px;padding-left: 20px;font-weight: 500;}
.management_top{text-align: center;height: 100px}
.management_top h6{font-size: 14px;font-weight: 500;margin: 20px 0 10px;}
.management_top p{font-size: 36px;color: #5aa2e7;cursor: pointer;}
.add_resume_header{margin: 10px 20px;height: 40px;;line-height: 40px;font-size: 16px;border-bottom: 1px solid #eee;}
.add_resume_header .icon{text-align: right;cursor: pointer;}
.add_resume_header .icon .iconfont{font-size: 24px;}
.add_resume_con{height: 30px;line-height: 30px;margin: 0 20px;}
.issue_resume{width: 75px;height: 75px;background-color: #46BE8A;color:#fff;border-radius: 4px;margin: 15px auto 0;line-height: 30px;cursor: pointer}
.issue_resume dt{padding-top:10px;}
.issue_resume dd{line-height: 24px;}
.issue_resume dd .iconfont{font-size: 28px;}

.el-date-table td{position: relative;}
.hasRecord:after{content:'';width:4px;height:4px;border-radius: 50%;background-color: #ff4949;display: block;position: absolute;bottom: 3px;left: 50%;margin-left: -2px;}
.white-space-nowrap{white-space:nowrap;overflow: hidden;}
.no_data{height: 200px;text-align: center;color: #99a9bf;background: url(../../images/noData.png) no-repeat center center}
.no_data p{padding-top:20px;margin-left: -20px;}
</style>


