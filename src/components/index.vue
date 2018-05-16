<template>
    <div id='index'>
        <header class="hrm_module">
            <div class="hrm_module_con">
                <h2 class="hint">{{greetings}}</h2>
                <ul class="kuaijie clearfix">
                    <li class="kuaijie_01"><a href="https://aijuhr.com/dist/#/oa/approval"><span class="iconfont">&#xe60f;</span></a><i v-if="incidentNum.pendingNum != 0">{{incidentNum.pendingNum}}</i><p>待处理</p></li>
                    <li class="kuaijie_02"><a href="https://aijuhr.com/dist/#/oa/report"><span class="iconfont">&#xe639;</span></a><i v-if="incidentNum.workReportNum != 0">{{incidentNum.workReportNum}}</i><p>工作汇报</p></li>
                    <li class="kuaijie_03"><a href="https://aijuhr.com/dist/#/oa/report?add1"><span class="iconfont">&#xe63e;</span></a><p>写日报</p></li>
                    <li class="kuaijie_01"><a href="https://aijuhr.com/dist/#/oa/report?add2"><span class="iconfont">&#xe63f;</span></a><p>写周报</p></li>
                    <li class="kuaijie_02"><a href="https://aijuhr.com/dist/#/oa/approval?add1"><span class="iconfont">&#xe664;</span></a><p>请假</p></li>
                    <li class="kuaijie_03"><a href="https://aijuhr.com/dist/#/oa/approval?add2"><span class="iconfont">&#xe62c;</span></a><p>报销</p></li>
                </ul>
            </div>
        </header>
        <div id="calendars" class="hrm_module calendars">
            <div class="hrm_module_con">
                <el-select v-model="month" placeholder="请选择月" class="calendars_month" @change="changeSchedules">
                <el-option label="1月" value="01"></el-option>
                <el-option label="2月" value="02"></el-option>
                <el-option label="3月" value="03"></el-option>
                <el-option label="4月" value="04"></el-option>
                <el-option label="5月" value="05"></el-option>
                <el-option label="6月" value="06"></el-option>
                <el-option label="7月" value="07"></el-option>
                <el-option label="8月" value="08"></el-option>
                <el-option label="9月" value="09"></el-option>
                <el-option label="10月" value="10"></el-option>
                <el-option label="11月" value="11"></el-option>
                <el-option label="12月" value="12"></el-option>
                </el-select>
                <el-select v-model="year" placeholder="请选择年" class="calendars_year" @change="changeSchedules">
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2020" value="2020"></el-option>
                <el-option label="2021" value="2021"></el-option>
                </el-select>
                <table width="100%" class="calendars_table">
                    <tr class="table_header">
                        <th><div>周一</div></th>
                        <th><div>周二</div></th>
                        <th><div>周三</div></th>
                        <th><div>周四</div></th>
                        <th><div>周五</div></th>
                        <th><div>周六</div></th>
                        <th><div>周日</div></th>
                    </tr>
                    <tr class="table_body" v-for="calendarItem in calendar">
                        <td v-for="calendarList in calendarItem"><div @click="openDialog(calendarList.schedule,calendarList.day,calendarList.notMouth)" :class="{notAllowed:calendarList.notMouth == 1}"><h6 :class="{today:calendarList.toDay == 1}">{{calendarList.day}}</h6><textarea readonly>{{calendarList.schedule?calendarList.schedule.content:""}}</textarea></div></td>
                    </tr>
                    <!--<tr class="table_body">
                        <td><div @click="openDialog(calendarList.schedule)"><h6 class="today">01</h6><p>1,w <br>萨瑟<br>de <br>asd <br></p></div></td>
                    </tr>-->
                </table>
            </div>
             <!--弹窗-->
            <el-dialog
            title="日程"
            :visible.sync="dialogVisible"
            v-model="dialogVisible"
            size="tiny">
            <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            :maxlength=200
            v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dealSchedule">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div class="right_index">
            <div class="hrm_module">
                <dl class="myAttendance hrm_module_con">
                    <dt><p>{{todayWeek}} &nbsp;&nbsp;{{today}}</p><h3>我的考勤</h3></dt>
                    <dd><el-tag type="gray">昨日</el-tag><p>{{yesterdayWeek}} &nbsp;&nbsp;{{yesterday}}</p></dd>
                    <dd  v-if="records.length > 0" v-for="record in records">
                        <div v-for="item in record">
                            <span>{{(item.signType == 1?"上班时间":"下班时间") + item.ruleTime}}</span>
                            <el-tag type="danger" class="f00" v-if="item.status != 5" style="margin-left: 10px;">{{item.status == 0?"未打卡":item.status ==2?"迟到":item.status ==1?"未签到":item.status ==3?"早退":'外勤'}}</el-tag>
                            <em v-if="item.signTime">{{(item.signType == 1?"签到时间":"签退时间") + item.signTime}}</em>
                        </div>
                    </dd>
                    <dd class="noAttendance" v-if="records.length == 0">你还未设置考勤,请联系管理员设置</dd>
                </dl>
            </div>
            <div class="hrm_module">
                <dl class="myNotice hrm_module_con">
                    <dt @click="parentNotice"><a class="el-icon-more" href="javascript:void(0);"></a><h3>公告信息</h3></dt>
                    <dd v-for="announcement in announcements" @click="parentNotice" class="cursor_pointer"><span>{{announcement.title}}</span><em>{{announcement.createTime}}</em></dd>
                    <dd class="noAttendance" v-if="announcements.length == 0">暂无公告</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'index',
    data(){
        return{
            year:'2017',
            month:'06',
            day:'',
            today:'',
            todayWeek:'',
            yesterday:'',
            yesterdayWeek:'',
            greetings:'',
            incidentNum:{
                pendingNum:'',//待处理数
                workReportNum:''//工作汇报数
            },
            announcements:[],//公告显示列表
            calendar:[],
            dialogVisible:false,
            textarea:'',
            schedule:{},
            records:[],
        }
    },
    mounted(){
        this.indexList();
        this.getSchedules();
    },
    methods:{
        indexList(){
            var self = this;
            var method2 = "attendanceRule/getSignRecords",//获取用户某一天的考勤
                successd2 = function(res){
                    self.records = res.data.data.records;
                };
            var method = "home/comeHomePage",
                param = JSON.stringify({}),
                successd=function(res){
                    console.log(res);
                    self.today = res.data.data.today;
                    self.todayWeek = res.data.data.todayWeek;
                    self.yesterday = res.data.data.yesterday;
                    self.yesterdayWeek = res.data.data.yesterdayWeek;
                    self.incidentNum = res.data.data.incidentNum;
                    self.announcements = res.data.data.announcements;
                    self.greetings = res.data.data.greetings;
                    var param2 = JSON.stringify({"queryDate":self.yesterday});
                    self.$http(method2,param2,successd2);
                };
            this.$http(method,param,successd);
        },
        getSchedules(chooseDate){
            var self = this;
            var method = "home/getSchedules",
                param = JSON.stringify({'chooseDate':chooseDate}),
                successd = function(res){
                    self.calendar = res.data.data.schedules;
                    self.year = res.data.data.year;
                    self.month = res.data.data.mouth;
                };
            this.$http(method,param,successd);
        },
        dealSchedule(){
            var self = this;
            if (self.day < 10) {
                self.day = "0" +self.day;
            }
            var timing=self.year+"-"+self.month+"-"+self.day;
            var method = "home/dealSchedule",
                param = JSON.stringify({
                    'content':self.textarea,
                    'id':self.schedule?self.schedule.id:'',
                    'timing':timing
                }),
                successd = function(res){
                    self.dialogVisible = false;
                    self.getSchedules();
                };
            self.$http(method,param,successd);
        },
        openDialog(schedule,day,notMouth){
            if(notMouth == 1){

                return false;
            }
            var self = this;
            self.schedule = schedule;
            self.dialogVisible = true;
            self.textarea = schedule?schedule.content:'';
            self.day = day;
        },
        changeSchedules(){
            var chooseDate = this.year + "-"+this.month;
            this.getSchedules(chooseDate);
        },
        parentWl(){
            location.href = "https://aijuhr.com/dist/#/oa/report";
        },
        parentFlow(){
            location.href = "https://aijuhr.com/dist/#/oa/approval";
        },
        parentNotice(){
            location.href = "https://aijuhr.com/dist/#/oa/notice";
        }
    }
}
</script>

<style scoped>
i{
    font-style: inherit;
}
#index{
    position: relative;
}  
#calendars{
    margin-right: 330px;
    margin-top: 20px;
}
.border{
    -webkit-box-shadow: 0px 1px 1px 1px #dddddd;
    -moz-box-shadow: 0px 1px 1px 1px #dddddd;
    box-shadow: 0px 1px 1px 1px #dddddd;
    padding: 10px;
}
.hint{font-size: 16px;font-weight: 500; line-height: 50px;}
header{margin-right:330px; color: #666;}
/*.kuaijie {margin-top: 20px;}*/
.kuaijie li{float: left;position: relative;width: 95px;margin-right: 10px;cursor: pointer;}
.kuaijie li span{display: block;width: 60px;height: 60px;margin-top: 20px;color: #fff;background-color: #46be8a;font-size: 44px;line-height: 60px;text-align: center;border-radius: 4px;}
.kuaijie li span:hover{background-color: #5cd29d;}
.kuaijie li p{width: 60px;text-align: center;margin-top: 10px}
.kuaijie li i{position: absolute;top: 10px;right: 26px;width: 20px;height: 20px;border-radius: 50%;background-color: #f00;color: #fff;line-height: 20px;text-align: center;font-style: inherit}
.kuaijie .kuaijie_02 span{background-color: #f2a654;}
.kuaijie .kuaijie_02 span:hover{background-color: #f4b066;}
.kuaijie .kuaijie_03 span{background-color: #5aa2e7;font-size: 46px;}
.kuaijie .kuaijie_03 span:hover{background-color:#89bceb;}
.kuaijie .kuaijie_04 span{background-position: -180px 0;}
/*.kuaijie .kuaijie_05 span{background-color: #FF9948;}*/
/*.kuaijie .kuaijie_05 span:hover{background-color: #ffa35a;}*/
/*.kuaijie .kuaijie_06 span{background-color: #8B70CF;font-size:42px;}*/
/*.kuaijie .kuaijie_06 span:hover{background-color: #9174df;}*/
/*.calendars{padding: 10px;}*/
.calendars_year{width: 100px;float: right;margin-right: 10px;}
.calendars_month{width: 100px;float: right;}
.calendars_table{width: 100%;clear: both;margin-top: 60px;}
.table_header{border-bottom: 1px solid #dfe6ec;height: 30px;}
.table_header th{text-align: center;color: #97a8be;font-weight:400;}
.table_body{border-left: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;}
.table_body td{border-right: 1px solid #dfe6ec;height: 100px;overflow: hidden;width: 14%;}
.table_body td div{max-width: 175px;overflow: hidden;height: 100px;padding: 5px;cursor:pointer;}
.table_body td div.notAllowed{cursor:not-allowed;}
.table_body td div:hover{background-color: #eff2f7;}
.table_body td textarea{color: #333;border: none;width: 100%;resize: none;background-color: rgba(255, 255, 255, 0);height: 80px;overflow: hidden;cursor: pointer;}
.table_body td .notAllowed textarea{cursor: not-allowed;}
.table_body td textarea:focus{color: #999;border: none;width: 100%;resize: none;background-color: rgba(255, 255, 255, 0);outline: none}
.table_body td h6.today{background-color: #5aa2e7;color: #fff;text-align: center;width: 30px;height: 30px;border-radius: 50%;line-height: 30px;font-size: 14px;font-weight: 400;}
.table_body td h6{text-align: center;width: 30px;height: 30px;border-radius: 50%;line-height: 30px;font-size: 14px;font-weight: 400;color: #333;}
.right_index{width: 310px;position: absolute;top: 0;right:0px;}
.myAttendance,.myNotice{padding: 0;padding-bottom: 20px;}
.myAttendance dt,.myNotice dt{height: 50px;border-bottom: 1px solid #ddd;font-size: 16px;line-height: 50px;padding: 0 20px;}
.myAttendance dt h3,.myNotice dt h3{font-weight: 500;}
.myAttendance dt p,.myNotice dt a{font-weight: 500;float: right;line-height: 50px;color: #2c3e50;}
.myNotice dt a{color: #bfcbd9;}
.myAttendance dd{padding: 0 20px;margin-top: 18px;}
.myAttendance dd i{background-color: #bfcbd9;display: inline-block;padding: 0 5px;border-radius: 4px;color: #fff;}
.myAttendance dd i.f00{background-color: #f9e7eb;margin-left: 10px;color: #f62d51;}
.myAttendance dd p{display:inline-block;color: #bfcbd9;margin-left: 10px;}
.myAttendance dd em,.myNotice dd em{float: right;}
.myAttendance dd div{margin-top: 10px;}
.myAttendance .noAttendance,.myNotice .noAttendance{color: #bfcbd9;text-align: center;}
.myNotice{height: 168px;}
.myNotice dd{padding: 0 20px;margin-top: 18px;}
.myNotice dd span{width: 200px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;display: inline-block;}
.el-tag{height: auto;line-height: 14px;}
</style>
