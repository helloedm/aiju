<template>
	<div id="attendanceTj">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="考勤日统计" name="1">
				<div class="content">
					
					<el-alert
						title=""
						type="warning"
						show-icon
						:closable="false">提醒：1.查询或导出报表最大周期为一日&nbsp;&nbsp;&nbsp;   2.导出后，会生成Excel文件&nbsp;&nbsp;&nbsp;   3.选择部门/人员为您想查看的对象,可以为人也可以为部门
					</el-alert>
					<!--<el-form label-width='80px'>
						<el-form-item label="考勤时间">-->
						<div class="hrm_mgt20">
							<el-date-picker type="date" placeholder="选择开始日期" style="width: 131px;" v-model="startDate"></el-date-picker>
							<el-date-picker type="date" placeholder="选择结束日期" style="width: 131px;" v-model="endDate"></el-date-picker>
							<tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='0' class="dept"></tree-component>
							<el-button type="primary" @click = "getRecordCountByDay">搜索</el-button>
						</div>
	
						<!--</el-form-item>
					</el-form>-->
					
					<div class="hrm_module hrm_mgt20">
						<div class="hrm_module_btn">
							<el-button type="primary" @click ="exportStatement" icon="upload2">导出</el-button>
						</div>
						<div class="hrm_module_con">

						
					<el-table :data="tableData" border class="attendanceTj_table">
						<el-table-column prop="userName" label="姓名" width="85" fixed>
						</el-table-column>
						<el-table-column prop="deptName" label="部门" width="85" fixed>
						</el-table-column>
						<el-table-column prop="userNo" label="工号" width="85">
						</el-table-column>
						<el-table-column prop="signDate" label="日期" min-width="85">
						</el-table-column>
						<el-table-column prop="ruleType" label="考勤制度" width="85">
						</el-table-column>
						<el-table-column label="考勤工作日" min-width="100">
							<template scope="scope">
								<div v-for="workDay in scope.row.workDays">
									{{workDay.workDay}}
								</div>
							</template>
						</el-table-column>
						<el-table-column label="考勤时间" min-width="85">
							<template scope="scope">
								<div v-for="workDay in scope.row.workDays">
									<span>{{workDay.signInTime+"~"+workDay.signOutTime}}</span>
									<span v-show="workDay.signInTime2&&workDay.signOutTime2">{{workDay.signInTime2+"~"+workDay.signOutTime2}}</span>
									<span v-show="workDay.signInTime3&&workDay.signOutTime3">{{workDay.signInTime3+"~"+workDay.signOutTime3}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="签到1">
							<el-table-column label="签到时间" width="85">
								<template scope='scope'>{{scope.row.signResult[0].inTime}}</template>
							</el-table-column>
							<el-table-column label="签到结果" width="85">
								<template scope='scope'>
									<div v-if="scope.row.signResult[0].inResult == '外勤'" @click="outworkDialog(scope.row)" class="cursor_pointer color_5aa2e7">{{scope.row.signResult[0].inResult}}</div>
									<div v-else>{{scope.row.signResult[0].inResult}}</div>
								</template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="签退1">
							<el-table-column label="签退时间" width="85">
								<template scope='scope'>{{scope.row.signResult[0].outTime}}</template>
							</el-table-column>
							<el-table-column label="签退结果" width="85">
								<template scope='scope'>
									<div v-if="scope.row.signResult[0].outResult == '外勤'" @click="outworkDialog(scope.row)" class="cursor_pointer color_5aa2e7">{{scope.row.signResult[0].outResult}}</div>
									<div v-else>{{scope.row.signResult[0].outResult}}</div>
								</template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="签到2">
							<el-table-column label="签到时间" width="85">
								<template scope='scope'>{{scope.row.signResult[1].inTime}}</template>
							</el-table-column>
							<el-table-column label="签到结果" width="85">
								<template scope='scope'>
									<div v-if="scope.row.signResult[1].inResult == '外勤'" @click="outworkDialog(scope.row)" class="cursor_pointer color_5aa2e7">{{scope.row.signResult[1].inResult}}</div>
									<div v-else>{{scope.row.signResult[1].inResult}}</div>
								</template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="签退2">
							<el-table-column label="签退时间" width="85">
								<template scope='scope'>{{scope.row.signResult[1].outTime}}</template>
							</el-table-column>
							<el-table-column label="签退结果" width="85">
								<template scope='scope'>
									<div v-if="scope.row.signResult[1].outResult == '外勤'" @click="outworkDialog(scope.row)" class="cursor_pointer color_5aa2e7">{{scope.row.signResult[1].outResult}}</div>
									<div v-else>{{scope.row.signResult[1].outResult}}</div>
								</template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="签到3">
							<el-table-column label="签到时间" width="85">
								<template scope='scope'>{{scope.row.signResult[2].inTime}}</template>
							</el-table-column>
							<el-table-column label="签到结果" width="85">
								<template scope='scope'>
									<div v-if="scope.row.signResult[2].inResult == '外勤'" @click="outworkDialog(scope.row)" class="cursor_pointer color_5aa2e7">{{scope.row.signResult[2].inResult}}</div>
									<div v-else>{{scope.row.signResult[2].inResult}}</div>
								</template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="签退3">
							<el-table-column label="签退时间" width="85">
								<template scope='scope'>{{scope.row.signResult[2].outTime}}</template>
							</el-table-column>
							<el-table-column label="签退结果" width="85">
								<template scope='scope'>
									<div v-if="scope.row.signResult[2].outResult == '外勤'" @click="outworkDialog(scope.row)" class="cursor_pointer color_5aa2e7">{{scope.row.signResult[2].outResult}}</div>
									<div v-else>{{scope.row.signResult[2].outResult}}</div>
								</template>
							</el-table-column>
						</el-table-column>
					</el-table>
					<!--分页-->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tablePage.pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="tablePage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tablePage.totalCount" v-show="tablePage.totalCount != 0" class="attendanceTj_page">
					</el-pagination>
					</div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="考勤月统计" name="2">
				<div class="content">
					<el-alert
						title=""
						type="warning"
						show-icon
						:closable="false">提醒：1.查询或导出报表最大周期为一个月&nbsp;&nbsp;&nbsp;2.导出后，会生成Excel文件&nbsp;&nbsp;&nbsp;3.选择部门/人员为您想查看的对象,可以为人也可以为部门
					</el-alert>
					<!--<el-form label-width='80px'>-->
						<!--<el-form-item label="活动时间">-->
						<div class="hrm_mgt20">
							<el-date-picker type="month" placeholder="选择日期" style="width: 131px;" v-model="searchMonth" format="yyyy-MM"></el-date-picker>
							<tree-component @treeAssign="treeAssignMonth" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='0' class="dept"></tree-component>
							<el-button type="primary" @click="getMonthly">搜索</el-button>
						</div>
						<!--</el-form-item>-->
					<!--</el-form>-->
					<div class="hrm_module hrm_mgt20">
						<div class="hrm_module_btn">
							<el-button type="primary" icon="upload2" @click="exportOfMonth">导出</el-button>
						</div>
						<div class="hrm_module_con">
							<el-table :data="monthList" border style="width: 100%">
								<el-table-column prop="userName" label="姓名" fixed width="150">
								</el-table-column>
								<el-table-column prop="deptName" label="部门" min-width="150">
								</el-table-column>
								<el-table-column prop="userNo" label="工号"  min-width="150">
								</el-table-column>
								<el-table-column prop="actualDay" label="实际出勤（天）" min-width="150">
								</el-table-column>
								<el-table-column prop="needDay" label="应出勤（天)" min-width="150">
								</el-table-column>
								<el-table-column prop="absentDay" label="旷工（天）"  min-width="150">
								</el-table-column>
								<el-table-column prop="leaveDay" label="请假（天）"  min-width="150">
								</el-table-column>
								<el-table-column prop="overtimeDay" label="加班（天）"  min-width="150">
								</el-table-column>
								<el-table-column prop="lateHour" label="迟到（小时）"  min-width="150">
								</el-table-column>
								<el-table-column prop="earlyHour" label="早退（小时）"  min-width="150">
								</el-table-column>
								<el-table-column prop="workTime" label="工作时长（小时）"  min-width="150">
								</el-table-column>
							</el-table>
							<!--分页-->
							<el-pagination @size-change="monthSizeChange" @current-change="monthCurrentChange" :current-page="monthPage.pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="monthPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="monthPage.totalCount" class="attendanceTj_page">
							</el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		<el-dialog
			:title="outworkTitle"
			class="el-dialog--1000"
			:visible="dialogVisible">
			<div class="outworkTop">
				<img :src="outWork.userHeadImg">
				<div class="outworkTop_right">
					<p>{{outWork.name}}</p>
					<p>{{"今日考勤"+outWork.count+"次,工时共计"+outWork.totalTime}}</p>
				</div>
				<el-table :data="outWork.infoList" border class="margin_t_15">
					<el-table-column prop="ruleTime" label="考勤时间"></el-table-column>
					<el-table-column prop="signTimeString" label="签到/签到时间"></el-table-column>
					<el-table-column prop="signResult" label="考勤结果">
						<template scope="scope">
							<div v-if="scope.row.reviseStatus=='0'" class="cursor_pointer color_5aa2e7" @click="signResultChange(scope.row.id)">{{scope.row.signResult}}</div>
							<div v-else>{{scope.row.signResult}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="position" label="签到/签退地址"></el-table-column>
					<el-table-column prop="remark" label="备注"></el-table-column>
					<el-table-column label="照片" width="335">
						<template scope="scope">
							<div><img :src="file" v-for="file in scope.row.fileUrlList" style="margin-left:5px;"></div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改签到结果" :visible="resultChange">
			<el-radio class="radio" v-model="resultStatus" label="1">正常</el-radio>
  			<el-radio class="radio" v-model="resultStatus" label="4">未签到</el-radio>
  			<el-radio class="radio" v-model="resultStatus" label="2">迟到<el-input v-model="input1" class="width_50" :maxlength="2"></el-input>小时<el-input v-model="input2" class="width_50" :maxlength="2"></el-input>分钟</el-radio>
  			<el-radio class="radio" v-model="resultStatus" label="3">早退<el-input v-model="input3" class="width_50" :maxlength="2"></el-input>小时<el-input v-model="input4" class="width_50" :maxlength="2"></el-input>分钟</el-radio>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resultChange = false">取 消</el-button>
				<el-button type="primary" @click="resultChangeSave">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import Util from '../../script/util.js'
import treeComponent from '../tree.vue';

export default {
	name: 'attendanceTj',
	data() {
		return {
			tableData: [],
			monthList:[],
			filterText: "",
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			fileList: [],
			param: { 'param': "{'companyId':61,'pId':''}" },
			activeName: '1',
			currentPage:1,
			tablePage:{
				pageSize:5,
				pageNum:1,
				totalCount:0,
				totalPageCount:0
			},
			startDate:'',//考勤日统计查询开始时间
			endDate:'',//考勤日统计查询结束时间
			treeBtnName:'选择考勤部门或员工',
			treeData:{},
			treeDataMonth:{},
			monthPage:{
				pageNum:1,
				pageSize:10,
				totalCount:0
			},
			searchMonth:'',
			dialogVisible:false,
			outworkTitle:"提示",
			outworkHead:'',
			outWork:{
				name:'无名',
				count:1,
				totalTime:"",
				userHeadImg:'',
				infoList:[],
			},
			resultChange:false,
			resultStatus:'1',
			input1:'',
			input2:'',
			input3:'',
			input4:'',
			resultChangeId:0,
		}
	},
	mounted:function(){
		this.getRecordCountByDay();
		this.getMonthly();
	},
	components:{
		treeComponent
	},
	methods: {
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		handleRemove(file, fileList) {
			// console.log(file, fileList);
		},
		handlePreview(file) {
			// console.log(file);
		},
		handleClick(tab, event) {
			// console.log(tab, event);
		},
		handleSizeChange(val) {
			this.tablePage.pageSize = val;
			this.getRecordCountByDay();
		},
		handleCurrentChange(val) {
			this.tablePage.pageNum = val;
			this.getRecordCountByDay();
		},
		getRecordCountByDay(){
			var self = this;
			var method = Util.methodStr.attendanceTj.query;
			var dept = "",person="",startDate="",endDate='';
			if(self.treeData.dept){
				dept = self.treeData.dept.join();
			}
			if(self.treeData.person){
				person = self.treeData.person.join();
			}
			if(self.startDate){
				startDate = self.$date(self.startDate);
			}
			if(self.endDate){
				endDate = self.$date(self.endDate);
			}
			var param = JSON.stringify({deptIds:dept,empIds:person,startDate:startDate,endDate:endDate,pageNum:self.tablePage.pageNum,pageSize:self.tablePage.pageSize});
			var successd = function (res) {
				// console.log(res);
				self.tableData = res.data.data.signRecords;
				self.tablePage = res.data.data.page;
				self.endDate = res.data.data.endDate;
				self.startDate = res.data.data.startDate;
			};
			self.$http(method,param,successd);
		},
		treeAssign(val){
			this.treeData = val;
			// console.log(val)
		},
		treeAssignMonth(val){
			this.treeDataMonth = val;
		},
		exportStatement(){//导出
			var self = this;
			var method = Util.methodStr.attendanceTj.exports;
			var dept = "",person="",startDate="",endDate='';
			if(self.treeData.dept){
				dept = self.treeData.dept.join();
			}
			if(self.treeData.person){
				person = self.treeData.person.join();
			}
			if(self.startDate){
				startDate = self.$date(self.startDate);
			}
			if(self.endDate){
				endDate = self.$date(self.endDate);
			}
			var param=JSON.stringify({startDate:startDate,deptIds:dept,empIds:person});
			// self.$http(method,param,successd);
			// window.open(Util.url+"?method="+method+"&param="+param);
			self.$exportOut(method,param);

		},
		monthSizeChange(val){
			this.monthPage.pageSize = val;
			this.getMonthly();
		},
		monthCurrentChange(val){
			this.monthPage.pageNum = val;
			this.getMonthly();
		},
		//获取月统计列表
		getMonthly(){
			var self = this;
			var method = "signRecordCount/signRecordCountByMonth";
			var	dept = "",person="",searchMonth="";
			if(self.treeDataMonth.dept){
				dept = self.treeDataMonth.dept.join();
			}
			if(self.treeDataMonth.person){
				person = self.treeDataMonth.person.join();
			}
			if(self.searchMonth){
				searchMonth = self.$date(self.searchMonth,"month");
			}
			var	param = JSON.stringify({
					pageNum:self.monthPage.pageNum,
					pageSize:self.monthPage.pageSize,
					searchMonth:searchMonth,
					deptIds:dept,
					empIds:person
				}),
				successd = function(res) {
					self.monthList = res.data.data.monthCountList;
					self.monthPage = res.data.data.page;
					self.searchMonth = res.data.data.searchMonth;
				};
			self.$http(method,param,successd);
		},
		exportOfMonth(){//导出
			var self = this;
			var method = "signRecordCount/exportSignRecordsByMonth";
			var dept = "",person="",searchMonth="";
			// console.log(self.treeDataMonth);
			if(self.treeDataMonth.dept){
				dept = self.treeDataMonth.dept.join();
			}
			if(self.treeDataMonth.person){
				person = self.treeDataMonth.person.join();
			}
			if(self.searchMonth){
				searchMonth = self.$date(self.searchMonth,"month");
			}
			var param=JSON.stringify({searchMonth:searchMonth,deptIds:dept,empIds:person});
			self.$exportOut(method,param);
		},
		outworkDialog(row){//外勤弹层
			var self = this;
			var method="outSideSign/signOutsideListInfo",
				param=JSON.stringify({
					empId:row.empId,
					ruleDate:row.signYmd,
					ruleType:row.ruleType
				}),
				successd=function(res){
					console.log(res);
					self.outWork = res.data.data;
					self.outworkTitle = 20+row.signDate;
					self.dialogVisible = true;
				};
			self.$http(method,param,successd);
		},
		handleClose(){

		},
		signResultChange(id){
			var self = this;
			self.resultChange=true;
			self.resultChangeId=id;
		},
		resultChangeSave(){
			var self=this;
			var resultMin=null;
			var hour,min;
			if (self.resultStatus == 2) {
				hour=self.input1;
				min=self.input2;
			} else if(self.resultStatus == 3){
				hour=self.input3;
				min=self.input4;
			}
			var method="outSideSign/updateOutsideSignResult",
				param=JSON.stringify({
					id:self.resultChangeId,
					resultStatus:self.resultStatus,
					// resultMin:resultMin,
					hour:hour,
					min:min
				}),
				successd=function(){
					self.$message({
						message: '操作成功',
						type: 'success'
					})
					self.resultChange=false;
					self.dialogVisible=false;
					self.getRecordCountByDay();
				};
			self.$http(method,param,successd);
		}
	}

}
</script>

<style scoped>
header {display: block;}
header h2 {display: inline-block;text-align: center;line-height: 80px;width: 80px;height: 70px;color: #ccc;border-bottom: 2px solid #FFFFFF;cursor: pointer;}
header h2.active {border-color: #5aa2e7;color: #333;}
.content h5 {color: #999;font: 14px;font-weight: 400;margin-bottom: 20px;}
.content h5 i {margin-right: 20px;color: #f2a654;}
#attendanceTj .dept{display: inline-block;max-width: 470px;margin: 0 20px;overflow: hidden;vertical-align: top;}
.attendanceTj_page{margin-top: 10px;}
/* #attendanceTj .el-alert--warning{background-color: #f2a654;} */
.attendanceTj_table{width:auto;min-width: auto;}
.outworkTop img{float: left;width: 100px;height: 100px;border: none;}
.outworkTop_right{height: 50px;margin-left: 120px;padding-top: 50px;}
.outworkTop_right p{line-height: 25px;font-size: 16px;}
.width_50{width: 50px;}
</style>
