<template>
	<div class="hrm_module">
		<header class=" hrm_module_btn">
			<!--<h3>考勤规则设置</h3>-->
			<el-button type="primary" @click="attendanceSetFun">新建规则</el-button>
		</header>
		<div class="hrm_border content ">
			<div class="hrm_module_con">
				<el-table :data="tableData" border   @row-click="edit" v-loading.body="loading">
					<el-table-column prop="name" label="规则名称" width="150">
					</el-table-column>
					<el-table-column prop="ruleForDepOrEmp" label="考勤人员">
					</el-table-column>
					<el-table-column prop="ruleTypeStr" label="考勤制度" width="150">
					</el-table-column>
					<el-table-column prop="companyAddress" label="考勤地点">
					</el-table-column>
					<el-table-column label="考勤时间">
						<template scope='scope'>
							<div v-for="signRuleTime in scope.row.signRuleTimeList" style="text-align: left;">
								<span class="line_height_16">{{signRuleTime.workDay}}</span>
								<br>
								<span class="color_475669 line_height_16">{{signRuleTime.signInTime +" - "+signRuleTime.signOutTime}}</span>
								<span class="color_475669 line_height_16" v-show="signRuleTime.signInTime2 && signRuleTime.signOutTime2">{{signRuleTime.signInTime2 +" - "+signRuleTime.signOutTime2}}</span>
								<span class="color_475669 line_height_16" v-show="signRuleTime.signInTime3 && signRuleTime.signOutTime3">{{signRuleTime.signInTime3 +" - "+signRuleTime.signOutTime3}}</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<!--分页-->
				<!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>-->
			</div>
			<!--弹窗-->
			<el-dialog title="设置考勤规则" :visible.sync="attendanceSet" size="small" class="el-dialog--1000" :close-on-click-modal="false">
				<el-form ref="attendanceRule" :model="attendanceRule" label-width="100px" :rules="rules2">
					<el-form-item label="规则名称:" prop="name">
						<el-input placeholder="请输入规则名称" class="" v-model="attendanceRule.name"></el-input>
					</el-form-item>
					<el-form-item label="考勤人员:">
						<tree-component @treeAssign="treeAssignVal" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='0' class="dept" :tree-select-data="treeSelectData" ref="tree" :treePosition="treePosition"></tree-component>
					</el-form-item>
					<el-form-item label="考勤制度:">
						<el-radio-group v-model="attendanceRule.ruleType">
							<el-radio label="0">常规考勤制度</el-radio>
							<el-radio label="1">灵活考勤制度</el-radio>
						</el-radio-group>
						<el-form label-width="100px" class="border paddding-buttom-20" v-if="attendanceRule.ruleType=='0'">
							<el-form-item label="工作日：">
								<el-checkbox-group v-model="workDay">
									<el-checkbox label="1" name='workDay'>周一</el-checkbox>
									<el-checkbox label="2" name='workDay'>周二</el-checkbox>
									<el-checkbox label="3" name='workDay'>周三</el-checkbox>
									<el-checkbox label="4" name='workDay'>周四</el-checkbox>
									<el-checkbox label="5" name='workDay'>周五</el-checkbox>
									<el-checkbox label="6" name='workDay'>周六</el-checkbox>
									<el-checkbox label="7" name='workDay'>周日</el-checkbox>
								</el-checkbox-group>
								<el-checkbox label="1" name='statutory' style="margin-left: 100px;" v-model="attendanceRule.isLegalHolidays">遵循法定节假日</el-checkbox>
								<el-tooltip placement="bottom-start" effect="light">
									<div slot="content">2017年放假时间安排
										<br/>元旦放假：2016年12月31日 - 2017年1月2日 共3天
										<br/> 春节放假：1月27日至2月2日 共7天 调休：1月22日（星期日）、2月4日（星期六）上班
										<br/> 清明节放假：4月2日 - 4日 共3天 调休：4月1日（星期六）上班
										<br/> 劳动节放假：4月29日 - 5月1日 共3天
										<br/> 端午节放假：5月28日 - 30日 共3天 调休：5月27日（星期六）上班
										<br/> 中秋节、国庆节放假：10月1日 - 10月8日 共8天 调休：9月30日（星期六）上班</div>
									<i class="el-icon-information color_ccc"></i>
								</el-tooltip>
								<em class=""></em>
								
							</el-form-item>
							<el-form-item label="考勤时段:">
								<div>
									<el-form label-width="80px">
										<el-form-item label='时间选择' v-for="(time, index) in signTime" v-bind:class="{timeSclect:index>0}">
											<el-time-select placeholder="起始时间" v-model="time.startTime" :picker-options="{
										      start: '00:30',
										      step: '00:15',
										      end: '24:00'
										    }">
											</el-time-select>
											<el-time-select placeholder="结束时间" v-model="time.endTime" :picker-options="{
										      start: '00:15',
										      step: '00:15',
										      end: '24:00',
											minTime: time.startTime
										    }">
											</el-time-select>
											<span class="el-icon-plus icon_grey margin-l-15" v-show='index == (signTime.length-1) && index !=2' @click="addTimeSeclect(signTime)"></span>
											<span class="el-icon-minus icon_grey margin-l-15" v-show='index == (signTime.length-1) && index !=0' @click="deleTimeSeclect(signTime)"></span>
										</el-form-item>
										<el-form-item label="休息时间" class="timeSclect" v-if="signTime.length==1">
											<el-time-select placeholder="起始时间" v-model="restTime1" :picker-options="{
										      start: '00:30',
										      step: '00:15',
										      end: '24:00',
											  minTime: signTime[0].startTime,
											  maxTime: signTime[0].endTime
										    }"></el-time-select>
											<el-time-select placeholder="起始时间" v-model="restTime2" :picker-options="{
										      start: '00:30',
										      step: '00:15',
										      end: '24:00',
											  minTime: restTime1,
											  maxTime: signTime[0].endTime
										    }"></el-time-select>
										</el-form-item>
									</el-form>
								</div>
							</el-form-item>
						</el-form>
						<div class="border lh_attendance" v-if="attendanceRule.ruleType=='1'">
							<el-form ref='form_2' label-width="100px" class="border paddding-buttom-20 lh_att_form" v-for="(lh, lhIndex) in flexible">
								<el-form-item label="规则" label-width="80px" class="lh_att_item">{{lhIndex+1}}
									<span class="el-icon-close close" @click="deleFlesible(flexible,lhIndex)"></span>
								</el-form-item>
								<el-form-item label="工作日：">
									<el-checkbox-group v-model="lh.workDay">
										<el-checkbox label="1" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)" :disabled="lh.disable">周一</el-checkbox>
										<el-checkbox label="2" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)">周二</el-checkbox>
										<el-checkbox label="3" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)">周三</el-checkbox>
										<el-checkbox label="4" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)">周四</el-checkbox>
										<el-checkbox label="5" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)">周五</el-checkbox>
										<el-checkbox label="6" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)">周六</el-checkbox>
										<el-checkbox label="7" name='workDay' @change="workDayChecked(flexible,lh.workDay,lhIndex)">周日</el-checkbox>
										<em class=""></em>
									</el-checkbox-group>
									<el-checkbox label="1" name='statutory' style="margin-left: 100px;" v-model="isLegalHolidays">遵循法定节假日</el-checkbox>
									<el-tooltip placement="bottom-start" effect="light">
										<div slot="content">2017年放假时间安排
											<br/>元旦放假：2016年12月31日 - 2017年1月2日 共3天
											<br/> 春节放假：1月27日至2月2日 共7天 调休：1月22日（星期日）、2月4日（星期六）上班
											<br/> 清明节放假：4月2日 - 4日 共3天 调休：4月1日（星期六）上班
											<br/> 劳动节放假：4月29日 - 5月1日 共3天
											<br/> 端午节放假：5月28日 - 30日 共3天 调休：5月27日（星期六）上班
											<br/> 中秋节、国庆节放假：10月1日 - 10月8日 共8天 调休：9月30日（星期六）上班</div>
										<i class="el-icon-information color_ccc"></i>
									</el-tooltip>
								</el-form-item>
								<el-form-item label="考勤时段：">
									<div>
										<el-form :model='attendanceRule' label-width="80px">
											<el-form-item label='时间选择' v-for="(time, index) in lh.time" v-bind:class="{timeSclect:index>0}">
												<el-time-select placeholder="起始时间" v-model="time.startTime" :picker-options="{
										      start: '00:30',
										      step: '00:15',
										      end: '24:00'
										    }">
												</el-time-select>
												<el-time-select placeholder="结束时间" v-model="time.endTime" :picker-options="{
										      start: '00:15',
										      step: '00:15',
										      end: '24:00',
											  minTime:time.startTime
										    }">
												</el-time-select>
												<span class="el-icon-plus icon_grey margin-l-15" v-show='index == (lh.time.length-1) && index !=2' @click="addTimeSeclect(lh.time)"></span>
												<span class="el-icon-minus icon_grey margin-l-15" v-show='index == (lh.time.length-1) && index !=0' @click="deleTimeSeclect(lh.time)"></span>
											</el-form-item>
											<el-form-item label="休息时间" class="timeSclect" v-if="lh.time.length==1">
											<el-time-select placeholder="起始时间" v-model="lh.restTime1" :picker-options="{
										      start: '00:30',
										      step: '00:15',
										      end: '24:00',
											  minTime:lh.time[0].startTime,
											  maxTime:lh.time[0].endTime
										    }"></el-time-select>
											<el-time-select placeholder="起始时间" v-model="lh.restTime2" :picker-options="{
										      start: '00:30',
										      step: '00:15',
										      end: '24:00',
											  minTime: lh.restTime1,
											  maxTime:lh.time[0].endTime
										    }"></el-time-select>
										</el-form-item>
										</el-form>
									</div>
								</el-form-item>
							</el-form>
							<div class="add_lh_att">
								<el-button @click="addLhAtt(flexible)"><i class="el-icon-plus"></i> 添加考勤</el-button>
								<span>最多添加七条考勤</span>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="允许迟到:">
						<el-input v-model="allowLateMin" style="width:60px;margin-right:10px;"></el-input>分钟
					</el-form-item>
					<el-form-item label="考勤地点:">
						<el-button @click='attendanceSetMap = true'>选择</el-button>
						<span v-text="attendanceRule.companyAddress"></span>
						<el-form label-width="100px" class="float-right">
							<el-form-item label="允许偏差范围">
								<el-select v-model="positionOffset" placeholder="请选择允许偏差范围">
									<el-option label="1000m" value="1000"></el-option>
									<el-option label="500m" value="500"></el-option>
									<el-option label="300m" value="300"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
						<el-button v-if="editDeleShow" type="danger" @click = "deleAttendance">删除</el-button>
					    <el-button @click="attendanceSet = false">取 消</el-button>
					    <el-button type="primary" @click="addAttendance('attendanceRule')">确 定</el-button>
					  </span>
			</el-dialog>
			<el-dialog title="选择考勤地点" :visible.sync="attendanceSetMap" size="small" class="">
				<gd-map class="map_con" @mapVal='mapVal'></gd-map>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import gdMap from "./attendanceMap.vue"
import Util from '../../script/util.js'
import treeComponent from '../tree.vue';

export default {
	name: 'attendance',
	data() {
		return {
			tableData: [{
				id:'1',
				name: "研发考勤",
				ruleForDepOrEmp: '研发人员',
				ruleTypeStr: "灵活考勤制度1",
				companyAddress: "杭州公元里7栋",
				signRuleTimeList:[{
					workDay: '',
					signInTime:'',
					signInTime2:'',
					signInTime3:'',
					signOutTime:'',
					signOutTime2:'',
					signOutTime3:''
				}],
				
			}],
			currentPage: 1,
			attendanceSet: false,
			attendanceSetMap: false,
			attendanceRule:{//新增
				name:'',
				ruleForDepId:[],
				ruleForEmpId:[],
				signInTime:'',
				signOutTime:'',
				signInTime2:'',
				signOutTime2:'',
				signInTime3:'',
				signOutTime3:'',
				positionLon:'',
				positionLat:'',
				positionOffset:'',
				companyAddress:'',
				ruleType:'0',
				isLegalHolidays:true//法定节假日
			},
			form:[{ startTime: '09:00', endTime: '12:00' }, { startTime: '13:00', endTime: '18:00' }, { startTime: '19:00', endTime: '20:00' }],
			signTime:[{ startTime: '09:00', endTime: '12:00' }, { startTime: '13:00', endTime: '18:00' }, { startTime: '19:00', endTime: '20:00' }],//设置
			workDay:[],
			flexible: [{
				workDay: ['1','2','3','4','5'],
				time: [{ startTime: '09:00', endTime: '18:00' }],
				restTime1:'',
				restTime2:''
			}, {
				workDay: ['6','7'],
				time: [{ startTime: '09:00', endTime: '18:00' }],
				restTime1:'',
				restTime2:''
			}],
			position: {},
			queryDept: false,
			filterText: '',
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			loading:false,
			treeData: {
				ruleForDepId:[],
				ruleForEmpId:[]
			},
            treeBtnName: '选择考勤部门员工',
			mapValue:'',
			addAttendanceName:'',
			positionOffset:'300',
			editDeleShow:false,
			attendanceStash:{},//暂存编辑时的值
			rules2: {
				name: [
					{ required: true,message:"请输入考勤规则", trigger: 'blur' },
					{ min: 1,max:32,message:"长度在1到32个字符", trigger: 'blur' }
				],
				restTime:{required:true,message:'请选择休息时间',trigger:'blur'}
			},
			treeSelectData: {
                keys: [],
                names: ''
            },
			isLegalHolidays:true,
			treePosition:"right",
			restTime1:'',
			restTime2:'',
			allowLateMin:0,
		}
	},
	mounted:function(){
		this.inboxAjax();
	},
	components: {
		gdMap,
		treeComponent
	},
	methods: {
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			// console.log(`当前页: ${val}`);
		},
		addTimeSeclect: function (time) {
			time.push({ startTime: '09:00', endTime: '12:00' });
		},
		deleTimeSeclect: function (time) {
			time.pop();
		},
		addLhAtt(flexible) {
			if (flexible.length >= 7) {
				return;
			}
			flexible.push({
				workDay: [],
				time: [{ startTime: '09:00', endTime: '18:00' }],
				restTime1:'',
				restTime2:''
			})
		},
		deleFlesible(flesible, lhIndex) {
			flesible.splice(lhIndex, 1);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		inboxAjax() {
            var self = this;
            self.loading = true;
			var method = Util.methodStr.attendance.query;
			var param = JSON.stringify({
				"userId": 64660,
				"companyId": 61
			});
			var success=function(res){
				self.tableData = res.data.data.attendanceRuleList
                self.loading = false;
			}
            this.$http(method,param,success);
        },
		mapVal(val){
			// console.log(val[0]);
			// console.log(val[1]);
			this.mapValue = val;
			this.attendanceRule.positionLon = val[0];
			this.attendanceRule.positionLat = val[1];
			this.attendanceRule.companyAddress = val[2];
			this.attendanceSetMap = false;
		},
		treeAssignVal(arr){//选择考勤部门
			this.treeData={
				ruleForDepId:arr.dept,
				ruleForEmpId:arr.person
			};
		},
		addAttendance(attendanceRule){//新增考勤
			let self = this;
			let reg=/^[0-9]+$/;
			if(!reg.test(self.allowLateMin)){
				self.$message.error("请输入正确的允许迟到时间");
				return;
			}
			if (self.editDeleShow) {//编辑
				var workDay = this.workDay.join();
				var method = Util.methodStr.attendance.update;
				if (self.attendanceRule.ruleType ==1) {//灵活考勤
					var list = self.flexible;
					var timeRules = [];
					for (var i = 0; i < list.length; i++) {
						var workDay = list[i].workDay.join();
						var signInTime = list[i].time[0].startTime;
						var signOutTime = list[i].time[0].endTime;
						var signInTime2 = list[i].time[1]?list[i].time[1].startTime : "";
						var signOutTime2 = list[i].time[1]?list[i].time[1].endTime :"";
						var signInTime3 = list[i].time[2]?list[i].time[2].startTime : "";
						var signOutTime3 = list[i].time[2]?list[i].time[2].endTime :"";
						var restTime = (list[i].restTime1?list[i].restTime1:'')+"-"+(list[i].restTime2?list[i].restTime2:'');
						timeRules.push({
							"workDay":workDay,
							"signInTime":signInTime,
							"signOutTime":signOutTime,
							"signInTime2":signInTime2,
							"signOutTime2":signOutTime2,
							"signInTime3":signInTime3,
							"signOutTime3":signOutTime3,
							"restTime":restTime
						});
					}
					var param = {
						id:this.attendanceRule.id,
						attendanceRule:{
							name:this.attendanceRule.name,
							ruleForDepId:this.treeData.ruleForDepId,
							ruleForEmpId:this.treeData.ruleForEmpId,
							timeRules:timeRules,
							positionLon:this.attendanceRule.positionLon,
							positionLat:this.attendanceRule.positionLat,
							positionOffset:this.positionOffset,
							companyAddress:this.attendanceRule.companyAddress,
							ruleType:1,
							isLegalHolidays:this.isLegalHolidays ? '0':'1',
							allowLateMin:this.allowLateMin
						}
					}
				} else {//常规考勤
					var param = {
						id:this.attendanceRule.id,
						attendanceRule:{
							name:this.attendanceRule.name,
							ruleForDepId:this.treeData.ruleForDepId,
							ruleForEmpId:this.treeData.ruleForEmpId,
							timeRules:[{
								signInTime:this.signTime[0].startTime,
								signOutTime:this.signTime[0].endTime,
								signInTime2:this.signTime[1]?this.signTime[1].startTime:'',
								signOutTime2:this.signTime[1]?this.signTime[1].endTime:'',
								signInTime3:this.signTime[2]?this.signTime[2].startTime:'',
								signOutTime3:this.signTime[2]?this.signTime[2].endTime :'',
								workDay:workDay,
								restTime:(this.restTime1?this.restTime1:'') + "-" + (this.restTime2?this.restTime2:'')
							}],
							positionLon:this.attendanceRule.positionLon,
							positionLat:this.attendanceRule.positionLat,
							positionOffset:this.positionOffset,
							companyAddress:this.attendanceRule.companyAddress,
							ruleType:0,
							isLegalHolidays:this.attendanceRule.isLegalHolidays ? '0':'1',
							allowLateMin:this.allowLateMin
						}
					}
				}
			} else {//新增
				var workDay = this.workDay.join();
				var method = Util.methodStr.attendance.add;
				if (self.attendanceRule.ruleType ==1) {//灵活考勤
					var list = self.flexible;
					var timeRules = [];
					for (var i = 0; i < list.length; i++) {
						if(list[i].workDay == []){
							continue
						}
						var workDay = list[i].workDay.join();
						var signInTime = list[i].time[0].startTime;
						var signOutTime = list[i].time[0].endTime;
						var signInTime2 = list[i].time[1]?list[i].time[1].startTime : "";
						var signOutTime2 = list[i].time[1]?list[i].time[1].endTime :"";
						var signInTime3 = list[i].time[2]?list[i].time[2].startTime : "";
						var signOutTime3 = list[i].time[2]?list[i].time[2].endTime :"";
						var restTime = list[i].restTime1+"-"+list[i].restTime2;
						timeRules.push({
							"workDay":workDay,
							"signInTime":signInTime,
							"signOutTime":signOutTime,
							"signInTime2":signInTime2,
							"signOutTime2":signOutTime2,
							"signInTime3":signInTime3,
							"signOutTime3":signOutTime3,
							"restTime":restTime
						});
					}
					var param = {
						attendanceRule:{
							name:this.attendanceRule.name,
							ruleForDepId:this.treeData.ruleForDepId,
							ruleForEmpId:this.treeData.ruleForEmpId,
							timeRules:timeRules,
							positionLon:this.attendanceRule.positionLon,
							positionLat:this.attendanceRule.positionLat,
							positionOffset:this.positionOffset,
							companyAddress:this.attendanceRule.companyAddress,
							ruleType:1,
							isLegalHolidays:this.isLegalHolidays ? '0':'1',
							allowLateMin:this.allowLateMin
						}
					}
				} else {//常规考勤
					var param = {
						attendanceRule:{
							name:this.attendanceRule.name,
							ruleForDepId:this.treeData.ruleForDepId,
							ruleForEmpId:this.treeData.ruleForEmpId,
							timeRules:[{
								signInTime:this.signTime[0].startTime,
								signOutTime:this.signTime[0].endTime,
								signInTime2:this.signTime[1]?this.signTime[1].startTime:'',
								signOutTime2:this.signTime[1]?this.signTime[1].endTime:'',
								signInTime3:this.signTime[2]?this.signTime[2].startTime:'',
								signOutTime3:this.signTime[2]?this.signTime[2].endTime :'',
								workDay:workDay,
								restTime:this.restTime1+"-"+this.restTime2
							}],
							positionLon:this.attendanceRule.positionLon,
							positionLat:this.attendanceRule.positionLat,
							positionOffset:this.positionOffset,
							companyAddress:this.attendanceRule.companyAddress,
							ruleType:0,
							isLegalHolidays:this.attendanceRule.isLegalHolidays ? '0':'1',
							allowLateMin:this.allowLateMin
						}
					}
				}
			}
			var successd = function(res){
				self.attendanceSet = false;
				self.inboxAjax();
			}
			this.$refs[attendanceRule].validate((valid) => {
				if(valid){
					this.$http(method,JSON.stringify(param),successd)
				}else{
					return false;
				}
			});
		},
		activeRow (scope) {//选中table行
			// console.log(scope);
		},
		edit(row,event){//单击编辑
			let self = this;
			self.attendanceStash = row;
			
			// console.log(row);
			var method = Util.methodStr.attendance.detail;
			var param = JSON.stringify({'id':row.id});
			var successd = function(res){
				self.attendanceSet = true;
				self.editDeleShow = true;
				let result = res.data.data.ruleDetail;
				if (result.ruleType == 0) {//常规考勤
					self.attendanceRule = result;
					self.attendanceRule.ruleType = "0";
					self.workDay = result.signRuleTimeList[0].workDay.split(',');
					self.signTime = [];
					self.signTime.push({'startTime':result.signRuleTimeList[0].signInTime,'endTime':result.signRuleTimeList[0].signOutTime});
					if(result.signRuleTimeList[0].signInTime2 != ""){
						self.signTime.push({'startTime':result.signRuleTimeList[0].signInTime2,'endTime':result.signRuleTimeList[0].signOutTime2});
						if(result.signRuleTimeList[0].signInTime3 != ""){
							self.signTime.push({'startTime':result.signRuleTimeList[0].signInTime3,'endTime':result.signRuleTimeList[0].signOutTime3});
						}
					}
					self.attendanceRule.isLegalHolidays = result.isLegalHolidays==0?true:false;
					self.positionOffset = result.positionOffset;
					self.allowLateMin = result.allowLateMin?result.allowLateMin:0;
					self.treeData.ruleForDepId = result.ruleForDepId;
					self.treeData.ruleForEmpId = result.ruleForEmpId;
					self.restTime1 = result.signRuleTimeList[0].restTimeStart;
					self.restTime2 = result.signRuleTimeList[0].restTimeEnd;
					self.treeSelectData = {
						keys:result.ruleForDepId.concat(result.ruleForEmpId),
						names:row.ruleForDepOrEmp
					}
					self.$nextTick(function(){
						self.$refs.tree.setChecked();
					})
				} else {//灵活考勤
					self.attendanceRule = result;
					self.attendanceRule.ruleType = "1";
					self.flexible = [];
					result.signRuleTimeList.forEach(function(item) {
						var time = [];
						time.push({'startTime':item.signInTime,'endTime':item.signOutTime});
						if(item.signInTime2 != ""){
							time.push({'startTime':item.signInTime2,'endTime':item.signOutTime2});
							if(item.signInTime3 != ""){
								time.push({'startTime':item.signInTime3,'endTime':item.signOutTime3});
							}
						}
						var workDay = item.workDay.split(',');
						self.flexible.push({workDay:workDay,time:time,restTime1:item.restTimeStart,restTime2:item.restTimeEnd})
					})
					self.isLegalHolidays = result.isLegalHolidays == 0 ?true:false;
					self.positionOffset = result.positionOffset;
					self.allowLateMin = result.allowLateMin?result.allowLateMin:0;
					self.treeData.ruleForDepId = result.ruleForDepId;
					self.treeData.ruleForEmpId = result.ruleForEmpId;
					self.treeSelectData = {
						keys:result.ruleForDepId.concat(result.ruleForEmpId),
						names:row.ruleForDepOrEmp
					}
					self.$nextTick(function(){
						self.$refs.tree.setChecked();
					})
				}
			}
			this.$http(method,param,successd);
		},
		deleAttendance(){//删除考勤规则
			let self = this;
			var method = Util.methodStr.attendance.dele;
			var param = JSON.stringify({ruleId:self.attendanceStash.id});
			var successd = function(res){
				if (res.data.code==0) {
					self.$message({
						message:res.data.message,
						type:'success'
					});
					self.attendanceSet = false;
					self.inboxAjax();
				} else {
					self.$message.error(res.data.message);
				}
			}
			self.$http(method,param,successd);
		},
		attendanceSetFun(){
			this.attendanceSet = true;
			this.editDeleShow=false;
			this.attendanceRule={//新增
				name:'',
				ruleForDepId:[],
				ruleForEmpId:[],
				signInTime:'',
				signOutTime:'',
				signInTime2:'',
				signOutTime2:'',
				signInTime3:'',
				signOutTime3:'',
				positionLon:'',
				positionLat:'',
				positionOffset:'',
				companyAddress:'',
				ruleType:'0',
				isLegalHolidays:true//法定节假日
			};
			this.form=[{ startTime: '09:00', endTime: '12:00' }, { startTime: '13:00', endTime: '18:00' }, { startTime: '19:00', endTime: '20:00' }];
			this.signTime=[{ startTime: '09:00', endTime: '18:00' }];
			this.workDay=['1','2','3','4','5'];
			this.treeData = {
				ruleForDepId:[],
				ruleForEmpId:[]
			};
			this.flexible=[{
				workDay: ['1','2','3','4','5'],
				time: [{ startTime: '09:00', endTime: '18:00' }],
				restTime1:'',
				restTime2:''
			}, {
				workDay: ['6','7'],
				time: [{ startTime: '09:00', endTime: '18:00' }],
				restTime1:'',
				restTime2:''
			}];
			this.restTime1='';
			this.restTime2='';
			this.allowLateMin=0;
		},
		/*
		灵活考勤改变周选择时,判断是不是已经选择
		*/
		workDayChecked(flexible,workDay,lhindex){
			var self = this;
			workDay.forEach(function(day,i) {
				flexible.forEach(function(item,j) {
					item.workDay.forEach(function(itemDay) {
						if(day == itemDay&&j!=lhindex){
							self.$message({
								message: '已经被选择,请您检查',
								type: 'warning'
							});
							// console.log(day,j,lhindex);
							workDay.splice(i,1);
						}
					})
				})
			})
		},
	}
}

</script>

<style scoped>
.prompt_ul{height: 34px;line-height: 34px;}
.border{border: 1px solid #DDDDDD;}
header{line-height: 36px;}
header h3{font-size: 16px;font-weight: 400;}
/*.content{min-height: 500px;}*/
.prompt>ul{line-height: 36px;height: 36px;}
.prompt_ul>li{display: inline-block;vertical-align: middle;margin-left: 10px;text-align: center;width: 85px;height: 22px;line-height: 22px;}
.add_dept{cursor: pointer;}
.el-pagination{text-align: right;margin-top:20px;}  
.paddding-buttom-20{padding-bottom: 20px;}
.float-right{display: inline-block;width: 325px;float: right;}
.color_ccc{color: #ccc;}
.el-button--primary{background-color: #5aa2e7;border-color: #5aa2e7;}
.el-button--primary:hover{background-color: #5aa2e7;border-color: #5aa2e7;}
.map_warp {height: 600px;}
.map_con {height: 500px;margin-bottom: 100px;}
.timeSclect {margin-top: 20px;}
.icon_grey {background-color: #8391a5;color: #FFFFFF;border-radius: 50%;width: 20px;height: 20px;line-height: 20px;text-align: center;font-size: 10px;cursor: pointer;vertical-align: top;margin-top: 8px;}
.lh_attendance {padding: 0 55px;}
.lh_att_form {margin-top: 15px;}
.close {cursor: pointer;float: right;display: block;width: 36px;height: 36px;line-height: 36px;text-align: center;color: #bfcbd9;}
.close:hover{color: #5aa2e7;}
.lh_att_item {background-color: #f2f2f2;}
.add_lh_att button {color: #5aa2e7;}
.add_lh_att span {color: #999;}
.add_lh_att {text-align: center;margin: 15px 0;}
.margin-t-15 {margin-top: 15px;}
.margin-l-15 {margin-left: 15px;}
.color_475669{color:#475669;}
.line_height_16{line-height: 16px;display: inline-block;}
</style>