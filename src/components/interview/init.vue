<template>
  <div>
      <header>
         <el-row :gutter="20" style="padding-top: 30px">
                <el-col :span="6" :offset="3">
                  <ul class="talentpool_head_ul" @click="changetalentStatus(1)" :class="{'active':config.processStatus == '1'}">
                    <li>待面试</li>
                    <li class="font_size_20">{{countList.count1}}</li>
                  </ul>
                </el-col>
                <el-col :span="6">
                  <ul class="talentpool_head_ul" @click="changetalentStatus(2)" :class="{'active':config.processStatus == '2'}">
                    <li>已签到</li>
                    <li class="font_size_20">{{countList.count2}}</li>
                  </ul>
                </el-col>
                <el-col :span="6">
                  <ul class="talentpool_head_ul" @click="changetalentStatus(3)" :class="{'active':config.processStatus == '3'}">
                    <li>已提交登记表</li>
                    <li class="font_size_20">{{countList.count3}}</li>
                  </ul>
                </el-col>
            </el-row>
      </header>  
      <div id="content">
        <div class="left_btn">
          <el-button :disabled="multipleSelection.length != 1" type="primary" @click="evaluate">
            <i class="iconfont">&#xe616;</i>
            <span>评价</span>
            </el-button>
          <el-button :disabled="multipleSelection.length == 0" @click="breakAppointment" type="primary">
            <i class="iconfont">&#xe64a;</i>
            <span>爽约</span>
          </el-button>
          <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':gjSearchCon}"></i></el-button>            
          <el-input v-model="character"
            class="search_usercare"
            @keyup.enter.native="search()"
            @blur="search()" placeholder="输入工作年限、应聘职位、学历等搜索" icon="search"></el-input>
        </div>

        <div class="hrm_module_search"  v-show="gjSearchCon">
          <el-form :model="form" label-width="100px" class="clearfix">
            <div class="clearfix">
              <el-form-item label="性别" style="float:left;margin-bottom:10px;">
                <el-checkbox-group v-model="form.sex">
                  <!-- <el-checkbox label="3">不限</el-checkbox> -->
                  <el-checkbox label="1">男</el-checkbox>
                  <el-checkbox label="2">女</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <el-form-item label="来源渠道">
           
              <el-checkbox-group v-model="form.resumeFrom">
                <el-checkbox label="1">前程无忧</el-checkbox>
                <el-checkbox label="2">智联招聘</el-checkbox>
                <el-checkbox label="3">中华英才网</el-checkbox>
                <el-checkbox label="4">58同城</el-checkbox>
                <el-checkbox label="5">大街网</el-checkbox>
                <el-checkbox label="6">拉勾</el-checkbox>
                <el-checkbox label="7">boss直聘</el-checkbox>
                <el-checkbox label="8">猎聘</el-checkbox>
                <el-checkbox label="10">手动上传</el-checkbox>
                <el-checkbox label="11">邮箱导入</el-checkbox>
                <el-checkbox label="13">赶集网</el-checkbox>
                <el-checkbox label="14">人才捕手</el-checkbox>
                <el-checkbox label="15">企业内推</el-checkbox>
                <el-checkbox label="17">招聘官网</el-checkbox>
                <el-checkbox label="18">小程序</el-checkbox>
                <el-checkbox label="19">微官网</el-checkbox>
                <el-checkbox label="20">微活动</el-checkbox>
                <el-checkbox label="16">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="clearfix">
              <el-form-item label="工作年限" style="float:left;margin-bottom:10px;">
                <el-select v-model="form.workYearLowest" placeholder="最低" @change="workYaerChange('min')">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="form.workYearhighest" placeholder="最高" @change="workYaerChange('max')">
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
                  <el-option 
                    v-for="item in eduOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="应聘时间" style="float:left;margin-bottom:10px;">
                <el-select v-model="form.postTime" placeholder="应聘时间">
                  <el-option value="0" label="今天"></el-option>
                  <el-option value="1" label="一周内"></el-option>
                  <el-option value="2" label="两周内"></el-option>
                  <el-option value="3" label="一月内"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="resetAdvancedSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
          
        <el-table
          ref="multipleTable"
          :data="hireBeforeList"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            select="selectChange">
          </el-table-column>
          <el-table-column
            class-name="text-align-left"
            label="姓名">
            <template scope="scope">
              <span v-if="scope.row.headImg"><img :src="scope.row.headImg" alt="头像" @click="resume(scope.row.interviewerId)" style="cursor: pointer;width:25px;height:25px;border-radius:50%;overflow:hidden;vertical-align:middle;"></span>
              <el-button type="text"  @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
           <el-table-column
            prop="workYear"
            label="工作年限">
          </el-table-column>
           <el-table-column
            prop="educationLev"
            label="学历">
            <template scope="scope">
                <div>{{ transition.edc[scope.row.educationLev] }}</div>
            </template>
          </el-table-column>
           <el-table-column
            prop="positionName"
            label="应聘岗位">
          </el-table-column>
           <el-table-column
            label="性别">
             <template scope="scope">
               <div>{{ transition.sex[scope.row.sex] }}</div>
              </template>
          </el-table-column>
           <el-table-column
            prop="graduateSchool"
            label="毕业学校">
          </el-table-column>
          <el-table-column
            prop="postTime"
            label="应聘时间"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            label="导入方式"
            show-overflow-tooltip>
              <template scope="scope">
               <div>{{ transition.importWay[scope.row.importWay] }}</div>
              </template>
          </el-table-column> -->
          <el-table-column
            label="渠道"
            show-overflow-tooltip>
            <template scope="scope">
               <div>{{ scope.row.resumeFromStr }}</div>
              </template>
          </el-table-column>
          <el-table-column
            prop="signTime"
            label="签到时间"
            v-if="config.processStatus != 1"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="interviewTime"
            label="面试时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="submitTime"
            label="提交时间"
            v-if="config.processStatus == 3"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column 
            v-if="config.processStatus == 3"
            fixed="right"
            label="操作">
            <template scope="scope">
              <a href="javascript:;" @click="handleEdit(scope.$index, scope.row)">应聘登记表</a>
            </template>
          </el-table-column>
        </el-table>  
        <el-pagination
          class="margin_t_20"
          @size-change="changePageSize"
          @current-change="changePageNum"
          :current-page="config.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="config.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="config.totalCount">
        </el-pagination>  
      </div> 

    <el-dialog title="应聘登记表" :size="'tiny'" :visible.sync="dialogTableVisible">
      <div class="name">{{ interwiewInfo.name }}</div>
      <ul class="interwiewInfo">
        <li>
          <span>性别:</span> {{ transition.sex[interwiewInfo.sex ]}}
        </li>
        <li>
          <span>民族:</span> {{ interwiewInfo.nation }}
        </li>
        <li>
          <span>出生年月:</span> {{ interwiewInfo.birthday?interwiewInfo.birthday.substr(0,10):'' }}
        </li>
        <li>
          <span>婚姻状况:</span> {{ transition.merryStatus[interwiewInfo.marryStatus] }}
        </li>
        <li>
          <span>手机号:</span> {{ interwiewInfo.phone }}
        </li>
        <li>
          <span>邮箱:</span> {{ interwiewInfo.email }}
        </li>
        <li>
          <span>现住址:</span> {{ interwiewInfo.nowLiveAddress }}
        </li>
        <li>
          <span>本公司有无认识的人:</span> {{ interwiewInfo.haveAcquaintance==0?"无":interwiewInfo.friendRemaik}}
        </li>
        <li>
          <span>期望薪资(税前):</span> {{ interwiewInfo.expectSalary }}
        </li>
      </ul>
    </el-dialog>


  </div>
</template>
<script>

export default {
  name: 'init',
  data(){
    return{
      gjSearchCon: false,
      input2:"",
      form:{
        sex: [],
        resumeFrom: [],
        workYearLowest: '',
        workYearhighest: '',
        educationLev: '',
        postTime: ''
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
        eduOpt: [
          {value: '1', label: '博士'},
          {value: '2', label: '研究生'},
          {value: '3', label: 'MBA'},
          {value: '4', label: '本科'},
          {value: '5', label: '大专'},
          {value: '6', label: '大学'},
          {value: '7', label: '高中'},
          {value: '8', label: '中专'},
          {value: '9', label: '技校'},
          {value: '10', label: '中技'},
          {value: '11', label: '初中'},
          {value: '12', label: '小学'},
          {value: '13', label: '其他'},
          {value: '14', label: '大专以下'},
          {value: '15', label: '硕士'}
         ],
      config: {
        pageSize: 10,
        pageNum: 1,
        processStatus: '1',
        totalCount:0        
      },
      countList: {
        count1: 0,
        count2: 0,
        count3: 0
      },
      character: '',
      hireBeforeList: [
        // {
        //   educationLev: 1,
        //   graduateSchool: "浙江大学",
        //   interviewTime: "2017-09-21 20:17:38",
        //   signTime: "2017-09-22 10:23:24",
        //   sex: 1,
        //   count: 1,
        //   positionName: "产品",
        //   postTime: "2017-09-22",
        //   resumeFrom: 1,
        //   submitTime: "2017-09-18 19:19:56",
        //   importWay: 1,
        //   name: "测试",
        //   workYear: 6,
        //   interviewerCount: 2,
        //   interviewerId: 14
        // },
        // {
        //   educationLev: 1,
        //   graduateSchool: "浙江大学",
        //   interviewTime: "2017-09-21 20:17:38",
        //   signTime: "2017-09-22 10:23:24",
        //   sex: 1,
        //   count: 1,
        //   positionName: "产品",
        //   postTime: "2017-09-22",
        //   resumeFrom: 1,
        //   submitTime: "2017-09-18 19:19:56",
        //   importWay: 1,
        //   name: "测试2",
        //   workYear: 6,
        //   interviewerCount: 2,
        //   interviewerId: 14
        // }
      ],
      transition: {
        sex: [,'男', '女', '未知'],
        edc: [,'博士','研究生','MBA','本科','大专','大学','高中','中专','技校','中技','初中','小学','其他','大专以下','硕士'],
        importWay: [,'手动上传', '其他'],
        resumeFrom: ['前程无忧','智联招聘','中华英才网','58同城', '大街网', '拉勾','boss直聘','猎聘', '微招聘', '手动上传', '邮箱导入', '员工推荐', '赶集网','人才捕手','企业内推','其他','招聘官网','小程序','微官网','微活动'],
        merryStatus: [,'未婚', '已婚', '离异', '保密']
      },
      multipleSelection: [],
      interwiewInfo: {
        // "birthday": "1990-01-01 00:00:00", //生日
        // "educationLev": null, //最高学历，1博士、2研究生、3MBA、4本科、5大专、6大学、7高中、8中专、9技校、10中技、11初中、12小学（双学位归并到本科，大学是指原文只提到大学，没有其他相关信息的情况）
        // "email": null, //电子邮箱
        // "expectedMonthSalary": null, //期望月薪 1-10:分别表示 1-10K，以此类推
        // "friendRemaik": null, //对熟人(朋友)的描述
        // "haveAcquaintance": null, //公司有没有认识的熟人 0:没有 1:有
        // "marryStatus": null, //婚姻状况，1：未婚 2：已婚 3：离异4：保密
        // "name": "测试", //面试人姓名
        // "nowLiveAddress": null, //现居住地
        // "phone": null, //手机号码
        // "sex": 1, //性别，1：男 2：女 3：未知
      },
        formLabelWidth: '120px',
        dialogTableVisible: false
    }
  },
  methods: {
    changetalentStatus(type){
      this.config.processStatus = type;
      this.search();
    },
    getHireBeforeCount(){
      let method = 'interviewer/getHireBeforeCount',
        self = this,
        param = JSON.stringify({
        sex: this.form.sex.length == 2 ? '-1' : this.form.sex[0],
        resumeFrom: this.form.resumeFrom.join(','),
        workYearLowest: this.form.workYearLowest,
        workYearhighest: this.form.workYearhighest,
        educationLev: this.form.educationLev,
        postTime: this.form.postTime,
        character: this.character
      }),
      successd = function(res){
        self.countList = res.data.data.countList;
      }
      this.$http(method, param, successd);
    },
    breakAppointment() {
      let str = '';
      var self = this;
      for(var i = 0; i < this.multipleSelection.length; i++){
        str += this.multipleSelection[i].interviewerId;
        str = this.multipleSelection.length-1 > i ? str + ',' : str;
      }
      let method = 'interviewer/breakAppointment',
      param = JSON.stringify({
        interviewerIdList: str
      }),
      successd = function(res){
          self.getHireBeforeCount();
          self.search();
      }
      this.$http(method, param, successd);
    },
    workYaerChange(type) {
      if(type == 'min'){
        if(this.form.workYearLowest > this.form.workYearhighest){
          this.form.workYearhighest = this.form.workYearLowest
        }
      }else{
         if(this.form.workYearLowest > this.form.workYearhighest){
          this.form.workYearLowest  = this.form.workYearhighest
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.dialogTableVisible = true;
      let method = 'interviewerRegisterForm/getInterviewerInfoById',
      self = this,
      param = JSON.stringify({
        interviewerId: row.interviewerId
      }),
      successd = function(res){
        self.interwiewInfo = res.data.data.registrationForm;
      }
      this.$http(method, param, successd)
    },
    changePageSize(pageSize){
      var self = this;
      self.config.pageSize=pageSize;
      self.config.pageNum=1;
       this.search();
    },
    changePageNum(pageNum){
        var self = this;
        self.config.pageNum=pageNum;
        this.search();
    },
    resetAdvancedSearch(){
      this.form = {
        sex: [],
        resumeFrom: [],
        workYearLowest: '',
        workYearhighest: '',
        educationLev: '',
        postTime: ''
      }
    },
    search(){
      this.getHireBeforeCount();
      let method = 'interviewer/getHireBeforeList',
      self = this,
      param = JSON.stringify({
        pageSize: this.config.pageSize,
        pageNum: this.config.pageNum,
        sex: this.form.sex.length == 2 ? '-1' : this.form.sex[0],
        resumeFrom: this.form.resumeFrom.join(','),
        workYearLowest: this.form.workYearLowest,
        workYearhighest: this.form.workYearhighest,
        educationLev: this.form.educationLev,
        postTime: this.form.postTime,
        character: this.character,
        processStatus: this.config.processStatus
      }),
      successd = function(res){
        self.hireBeforeList = self.$tableNull(res.data.data.hireBeforeList);
        self.config.totalCount = res.data.data.count;        
      }
      this.$http(method, param, successd);
    },
    evaluate(){
      var interviewerId=this.multipleSelection[0].interviewerId;
      var interviewerCount=this.multipleSelection[0].interviewerCount;
      var evaluateTempletId=this.multipleSelection[0].evaluateTempletId;
      this.$router.push({name:'evaluate',params:{interviewerCount:interviewerCount,interviewerId:interviewerId,evaluateTempletId:evaluateTempletId}})
    },
    resume(id){
      this.$router.push({name:'resume',query:{id:id,btnShow:0}})
    },
  },
  mounted(){
    // this.getHireBeforeCount();
    this.search();
  }          
}
</script>
<style scoped>
.el-dialog.el-dialog--small{
  width: 400px;
}
.name{
  margin: 30px auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #eef1f6;
  text-align: center;
  line-height: 70px;
  font-size: 17px;
  border-bottom: 1px solid #E0E6ED;
}
.interwiewInfo{
  padding: 10px 0 20px 20px;
}
.interwiewInfo li {
  line-height: 24px;
  font-size: 14px;
  color: #1f2d3d;
}
.interwiewInfo li span{
  width: 135px;
  display: inline-block;
}
header{
  height: 120px;
}
header, #content{
    margin-top: 20px;
    background-color: #fff;
}
.talentpool_head_ul{cursor: pointer;}
.talentpool_head_ul.active{color: #5aa2e7;}
.talentpool_head_ul li{width: 100%;text-align: center;height: 30px;line-height: 30px;}
#content button i{
  vertical-align: text-bottom;
}
#content{
  padding: 20px 20px;
}
.left_btn{
  /* float: left; */
  margin-bottom: 20px;
}
.el-form{
  padding: 10px 10px 15px;
  border: 1px solid #BFCBD9;
  margin-bottom: 20px;
}
.el-input{
  display: inline-block;
  width: 300px;
}
.el-input__icon+.el-input__inner {
    padding-left: 35px;
}
.el-input__icon{
  left: 0;
}
#app .el-pagination {
    padding: 0;
    text-align: right;
}
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #48576a;
}
.margin_t_20 {
    margin-top: 20px;
}
.gj_search{
  float: right;
}
.search_usercare{
  float: right;
}
</style>


