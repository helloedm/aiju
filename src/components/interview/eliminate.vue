<template>
<div id="enterprise">
  <dl class="hrm_module">
    <dt class="hrm_module_btn clearfix">
      <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':gjSearchCon}"></i></el-button>
      <el-input
      placeholder="输入工作年限、应聘职位、学历等搜索"
      icon="search"
      v-model="keyWord"
      class="search_newResume"
      :on-icon-click="handleIconClick"
      @keyup.enter.native="handleIconClick"
      @blur="handleIconClick">
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
          <!-- <el-form-item label="性别" class="float_left">
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
              <el-option label="今天" value="0"></el-option>
              <el-option label="一周内" value="1"></el-option>
              <el-option label="两周内" value="2"></el-option>
              <el-option label="一月内" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="clearfix">
          <el-form-item label="应聘阶段">
          <el-checkbox-group v-model="form.processStr">
            <el-checkbox label="1">新简历</el-checkbox>
            <el-checkbox label="2">备选</el-checkbox>
            <el-checkbox label="3">面试</el-checkbox>
            <el-checkbox label="4">录用</el-checkbox>
            <el-checkbox label="5">已入职</el-checkbox>
            <el-checkbox label="6">淘汰</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="queryAllRepo()">搜索</el-button>
          <el-button @click="chongzhi">重置</el-button>
        </el-form-item>
      </el-form>
    </dd>
    <dd class="hrm_module_con">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        prop="name"
        label="姓名"
        class-name="text-align-left">
        <template scope="scope">
          <span><img :src="scope.row.headImg" alt="头像" @click="resume(scope.row.id)" style="cursor: pointer;width:25px;height:25px;border-radius:50%;overflow:hidden;vertical-align:middle;"></span>
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

    </dd>
  </dl>
  </div>
</template>

<script>
export default {
  name:'newResume',
  data(){
    return{
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
        workYearLow:'',
        workYearHigh:'',
        educationLev:'',
        interviewTimeType:'',
        talentRepoNo:'',
        processStr:[],
      },
      input2:'',


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
        {value: '1',label: '新简历'},
        {value: '2',label: '备选'},
        {value: '3',label: '面试'},
        {value: '4',label: '录用'},
        {value: '5',label: '已入职'},
        {value: '6',label: '淘汰'},
      ],
      offerRecordsCount0:1,
      offerRecordsCount1:2,
      offerRecordsCount2:3,
      offerRecordsCount3:4,
      offerRecordsCount4:5,
      talentStatus:1,
      count:{
        eliminateCount:0,
        unEnterCount:0,
        allCount:0,
        talentCount:0
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
    this.queryAllRepo();
  },
  methods:{
    handleSizeChange(val){
      this.page.pageSize=val;
      this.queryAllRepo();
    },
    handleCurrentChange(val){
      this.page.pageNum=val;
      this.queryAllRepo();
    },
    handleIconClick(){
      this.queryAllRepo();
    },
    changetalentStatus(type){
      this.talentStatus=type;
      this.queryAllRepo();
    },
    queryAllRepo(){
      var self=this;
      var parameter=JSON.parse(JSON.stringify(self.form));
      parameter.resumeStatus=parameter.resumeStatus.join();
      parameter.resumeFrom=parameter.resumeFrom.join();
      parameter.processStr=parameter.processStr.join();
      parameter.interviewDate =self.$date(parameter.interviewDate);
      parameter.talentRepoNo=self.talentStatus;
      var method="queryResume/queryAllRepo",
          param=JSON.stringify({
            pageNum:self.page.pageNum,
            pageSize:self.page.pageSize,
            keyWord:self.keyWord,
            parameter:parameter
          }),
          successd=function(res){
            self.tableData=self.$tableNull(res.data.data.resultList);
            self.page=res.data.data.page;
            self.count=res.data.data.count;
          };
      self.$http(method,param,successd);
    },
    chongzhi(){
      this.form={
        sex:'',
        resumeStatus:[],
        resumeFrom:[],
        workYearLow:'',
        workYearHigh:'',
        educationLev:'',
        interviewTimeType:'',
        talentRepoNo:'',
        processStr:[],
      };
    },
    resume(id){
      this.$router.push({name:'resume',query:{id:id,btnShow:4}})
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
    }
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
</style>

