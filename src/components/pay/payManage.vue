<template>
    <div id='payManage'>
        <div class="manage_con">
            <el-tabs v-model="activeName">
                <el-tab-pane label="本月计薪" name="0">
                    <div class="hrm_module">
                        <div class="hrm_module_con" v-show="payChangeToggle == true">
                            <el-table  border :data="payListData"   align="center" class="hrm_mgb15">
                                <el-table-column prop="userName" label="姓名"></el-table-column>
                                <el-table-column prop="empNo" label="工号"></el-table-column>
                                <el-table-column prop="deptName" label="部门"></el-table-column>
                                <!--<el-table-column prop="email" label="邮箱" width="200"></el-table-column>-->
                                <!--<el-table-column prop="phone" label="手机号码" width="150"></el-table-column>-->
                                <el-table-column prop="userDraw" label="员工类型">
                                    <template scope="scope">
                                        <!--0 全部 1 正式 2 试用 3 兼职 4 实习-->
                                        <el-tag type="gray" class="common_table_tag" v-show="scope.row.userDraw == 0">全部</el-tag>
                                        <el-tag type="gray" class="common_table_tag" v-show="scope.row.userDraw == 1">正式</el-tag>
                                        <el-tag type="gray" class="common_table_tag" v-show="scope.row.userDraw == 2">试用</el-tag>
                                        <el-tag type="gray" class="common_table_tag" v-show="scope.row.userDraw == 3">兼职</el-tag>
                                        <el-tag type="gray" class="common_table_tag" v-show="scope.row.userDraw == 4">实习</el-tag>
                                        <el-tag type="gray" class="common_table_tag" v-show="scope.row.userDraw == 5">劳务派遣</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="joinDate" label="入职时间"></el-table-column>
                                <el-table-column prop="basicPay" label="基本工资">
                                    <template scope="scope">{{scope.row.basicPay == -1 ? '未定薪' : scope.row.basicPay}}</template>
                                </el-table-column>
                                <el-table-column label="编辑">
                                    <template scope="scope">
                                        <el-button type="text" v-if="scope.row.basicPay != -1" @click="payEdit(scope.row.userId, scope.row.basicPay)">调薪</el-button>
                                        <el-button type="text" v-if="scope.row.basicPay == -1" @click="payInitShow = true; checkUserId = scope.row.userId">设置初始薪资</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="payListPage.totalCount" @current-change="payList"></el-pagination>
                        </div>
                        <div class="hrm_module_con clearfix" v-show="payChangeToggle == false">
                            <div class="wages_three_item f_l">
                                <div class="wages_three_item_nav">调整薪资</div>
                                <div class="wages_three_item_con">
                                    <el-form ref="payEditForm" :model="payEditForm" label-width="150px" :rules="payEditRules">
                                        <el-form-item label="当前基本薪资">
                                            <el-input v-model="payEditForm.beforeBasicPay" :disabled="true" style="width: 200px;"></el-input>
                                        </el-form-item>
                                        <el-form-item label="调整后基本薪资" prop="afterBasicPay">
                                            <el-input v-model="payEditForm.afterBasicPay" style="width: 200px;" @change="payInputChange"></el-input>
                                        </el-form-item>
                                        <el-form-item label="调整幅度" prop="adjustRange">
                                            <el-input v-model="payEditForm.adjustRange" :disabled="true" style="width: 200px;"></el-input>
                                        </el-form-item>
                                        <el-form-item label="生效时间" prop="forceTime">
                                            <el-date-picker type="date" placeholder="选择日期" style="width: 200px;" v-model="payEditForm.forceTime">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="调薪理由">
                                            <el-input type="textarea" style="" :rows="3" v-model="payEditForm.adjustReason"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="payEditSubmit('payEditForm')">提交</el-button>
                                            <el-button @click="payChangeToggle = true">取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <div class="wages_three_item f_r">
                                <div class="wages_three_item_nav">调薪记录</div>
                                <div class="wages_three_item_con">
                                    <el-steps :space="100" direction="vertical">
                                        <el-step v-for="item in payRecordList" :title="item.forceTime" :description="
                                item.beforeBasicPay == 0 ?
                                 '初始薪资为'+ item.beforeBasicPay +'元'
                                :'由'+ item.beforeBasicPay +'元调整到'+ item.afterBasicPay +'元，涨幅'+ (item.adjustRange*100).toFixed(2) +'%，涨幅理由：'+ item.adjustReason +''
                                "></el-step>
                                    </el-steps>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="调薪记录" name="1">
                    <div class="hrm_module">
                        <div class="hrm_module_con">
                            <el-table  border :data="payChangeData" align="center" class="hrm_mgb15" width="100%;">
                                <el-table-column prop="userName" label="姓名"></el-table-column>
                                <el-table-column prop="empNo" label="工号"></el-table-column>
                                <el-table-column prop="deptName" label="部门"></el-table-column>
                                <el-table-column prop="joinDate" label="入职时间"></el-table-column>
                                <el-table-column prop="beforeBasicPay" label="调整前薪资"></el-table-column>
                                <el-table-column prop="afterBasicPay" label="调整后薪资"></el-table-column>
                                <el-table-column prop="forceTime" label="生效时间"></el-table-column>
                                <el-table-column label="涨幅程度">
                                    <template scope="scope">{{(scope.row.adjustRange * 100).toFixed(2) + '%'}}</template>
                                </el-table-column>
                                <el-table-column prop="operateUserName" label="操作人"></el-table-column>
                                <el-table-column prop="createTime" label="操作时间" width="200"></el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="payChangePage.totalCount" @current-change="payChangeList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="调薪统计" name="2">
                    <div class="hrm_module">
                        <div class="hrm_module_btn">
                            <div class="hrm_module_item">
                                <!--<label for="" style="margin-right: 10px;float: left;">请选择部门</label>-->
                                <tree-component @treeAssign="drawFormTreeAssign" :tree-btn-name="drawFormBtnName" :tree-support-select="true" :tree-type='1'></tree-component>
                            </div>
                            <div class="hrm_module_item">
                                <!--<label for="" style="margin-right: 10px;">请选择日期</label>-->
                                <el-date-picker v-model="drawForm.date" type="daterange" align="right" placeholder="选择日期范围"></el-date-picker>
                            </div>
                            <el-button type="primary" icon="search" @click="drawPieSubmit">查询</el-button>
                        </div>
                        <div class="hrm_module_con clearfix">
                            <div class="sta_left">
                                <div class="sta_left_item sta_left_a">
                                    <h3>调整人数</h3>
                                    <p>{{peopleCount}}</p>
                                    <span></span>
                                </div>
                                <div class="sta_left_item sta_left_b">
                                    <h3>调薪均幅</h3>
                                    <p>{{salaryAdjustment}}%</p>
                                    <span>调薪均幅 = 调整幅度总和 / 次数</span>
                                </div>
                                <div class="sta_left_item sta_left_c">
                                    <h3>调薪比例</h3>
                                    <p>{{salaryProportion}}%</p>
                                    <span>调薪比例 = 调薪人数 / 总人数</span>
                                </div>
                            </div>
                            <div id="main" style="width: 600px;height: 460px;text-align: center;float: left;padding: 20px;"></div>
                            <div class="sta_icon" v-show="staIconShow"></div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!--设置初始薪资-->
            <el-dialog title="设置初始薪资" :visible.sync="payInitShow" size="tiny">
                <el-form label-width="100px" :model="payInitForm" ref="payInitForm" :rules="payInitRules">
                    <el-form-item label="初始薪资" prop="num">
                        <el-input type="text" v-model="payInitForm.num"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="payInitShow = false">取消</el-button>
                        <el-button type="primary" @click="payInitSubmit('payInitForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>


        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import treeComponent from '../tree.vue';

    export default {
        data() {
            return {

                // common
                activeName: '0',
                payInitShow: false,
                payInitForm: {
                    num: '',
                },
                payInitRules: {
                    num: [
                        { required: true, message: '初始薪资不能为空' },
                        // { type: 'number', message: '薪资必须为数字' }
                    ]
                },
                checkUserId: '',
                payEditForm: {
                    isInit: "",
                    setUserId: "",
                    beforeBasicPay: "",
                    afterBasicPay: "",
                    adjustRange: "",
                    forceTime: "",
                    adjustReason: ""
                },
                payEditRules: {
                    afterBasicPay: [
                        { required: true, message: '调整后薪资不能为空' },
                        // { type: 'number', message: '薪资必须为数字' }
                    ],
                    adjustRange: [{ required: true, message: '调整幅度不能为空' }],
                    forceTime: [{ required: true, message: '生效时间不能为空' }],
                },
                payRecordList: [],

                payListData: [], 
                payListPage: {},
                payChangeData: [],
                payChangePage: {},

                payChangeToggle: true,

                payListDeptId: '',

                
                charts: '',
                opinion: ['0% ~ 5%', '5% ~ 10%', '10% ~ 20%', '20% ~ 30%', '30%以上', '0%以下'],
                opinionData: [
                    { value: 3, name: '0% ~ 5%' },
                    { value: 4, name: '5% ~ 10%' },
                    { value: 6, name: '10% ~ 20%' },
                    { value: 1, name: '20% ~ 30%' },
                    { value: 2, name: '30%以上' },
                    { value: 6, name: '0%以下' },
                ],
                peopleCount: "30",
                salaryAdjustment: "12",
                salaryProportion: "24",
                drawForm: { 
                    dept: '',
                    date: '',
                },
                treeSelectData: {
                    keys: [],
                    names: ""
                },
                drawFormBtnName: '请选择部门',
                staIconShow: true,


            }
        },
        mounted: function () {
            this.payListDept();
            this.$nextTick(function () {
                this.drawPie('main')
            })
        },
        methods: {
            drawPie(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    title: {
                        show: true,
                        text: '调薪统计' 
                    },
                   
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a}<br/>{b}:{c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data: [
                            {
                                name: '0% ~ 5%',
                                backgroundColor: '#3fb1e3',
                            },{
                                name: '5% ~ 10%',
                                backgroundColor: '#6be6c1',
                            },{
                                name: '10% ~ 20%',
                                backgroundColor: '#626c91',
                            },{
                                name: '20% ~ 30%',
                                backgroundColor: '#a0a7e6',
                            },{
                                name: '30%以上',
                                backgroundColor: '#c4ebad',
                            },{
                                name: '0%以下',
                                backgroundColor: '#96dee8',
                            },{
                                name: '空',
                                backgroundColor: '#a4a7ad',
                            }
                        ],
                        
                    },
                    color: ["#3fb1e3","#6be6c1","#626c91","#a0a7e6","#c4ebad","#96dee8","#a4a7ad"],
                    series: [
                        {
                            name: '调薪统计',
                            type: 'pie',
                            radius: ['0%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    // show: true,
                                    // textStyle: {
                                    //     fontSize: '30',
                                    //     fontWeight: 'blod'
                                    // }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.opinionData
                        }
                    ],
                })
            },
            // 树
            drawFormTreeAssign: function (v) {
                this.drawForm.dept = v[0]
            },
            drawPieSubmit: function () {
                this.opinionData[0].value = 2;
                var self = this;
                var method = 'spwSalaryChange/getSalaryInfoCount',
                    param = JSON.stringify({
                        "deptId": this.drawForm.dept,
                        "startDate": this.$date(this.drawForm.date[0]),
                        "endDate": this. $date(this.drawForm.date[1]),
                    }),
                    succeed = function (res) {
                        self.staIconShow = false;

                        self.peopleCount = res.data.data.result.peopleCount;
                        self.salaryAdjustment = res.data.data.result.salaryAdjustment;
                        self.salaryProportion = res.data.data.result.salaryProportion;

                        self.charts.setOption({
                            series:{
                                data: res.data.data.result.salaryIncreases,
                            }
                        })
                    };
                this.$http(method, param, succeed);
            },


            filtrateTable: function (value) {
                var newPayManageList = [];
                for (var i = 0; i < CommonData.payManageList.length; i++) {
                    if (CommonData.payManageList[i].state == value) {
                        newPayManageList.push(CommonData.payManageList[i])
                    }
                }
                this.payManageList = newPayManageList;
            },
            payListDept: function () {
                var self = this;
                var method = 'department/getCommonInfoByDepartmentTree',
                    param = JSON.stringify({
                        "companyId": 139353,
                        "treeType": 0
                    }),
                    succeed = function (res) {
                        self.payListDeptId = res.data.data[0].id
                        self.payList()
                        self.payChangeList();
                    };
                this.$http(method, param, succeed);
            },
            // 列表
            payList: function (pageNum) {
                var self = this;
                var method = 'spwSalaryChange/getCurMonthSalaryInfo',
                    param = JSON.stringify({
                        userId: 62607,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        deptId: self.payListDeptId,
                        isConfirm: 0,
                        userDraw: 0,
                    }),
                    succeed = function (res) {
                        self.payListData = self.$tableNull(res.data.data.result);
                        self.payListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 设置初始薪资
            payInitSubmit: function (formName) {
                var self = this;
                if (self.payInitForm.num == 0) {
                    self.$message({
                        message: '初始薪资不能为0!',
                        type: 'warning'
                    });
                } else {
                    self.$refs[formName].validate((valid) => {
                        if (valid) {
                            var method = 'spwSalaryChange/changeSalary',
                                param = JSON.stringify({
                                    "companyId": 139353,
                                    "userId": 64660,
                                    "isInit": 1,
                                    "setUserId": self.checkUserId,
                                    "basicPay": self.payInitForm.num
                                }),
                                succeed = function (res) {
                                    self.$message({
                                        message: '设置初始薪资成功!',
                                        type: 'success'
                                    });
                                    self.payInitShow = false;
                                    self.payList();
                                    self.$refs[formName].resetFields();
                                };
                            this.$http(method, param, succeed);
                        }
                    });
                }
            },
            // 调薪记录列表
            payChangeList: function (pageNum) {
                var self = this;
                var method = 'spwSalaryChange/getBasicPayLogList',
                    param = JSON.stringify({
                        userId: 62607,
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                        // deptId: self.payListDeptId,
                    }),
                    succeed = function (res) {
                        self.payChangeData = self.$tableNull(res.data.data.result);
                        self.payChangePage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 调薪
            payEdit: function (id, payNum) {


                this.payChangeToggle = false;
                this.payEditForm.setUserId = id;
                this.payEditForm.beforeBasicPay = payNum;

                var self = this;
                var method = 'spwSalaryChange/getAdjustSalaryLog',
                    param = JSON.stringify({
                        "companyId": 139353,
                        "setUserId": self.payEditForm.setUserId
                    }),
                    succeed = function (res) {
                        self.payRecordList = res.data.data.result;
                    };
                this.$http(method, param, succeed);

            },
            payEditSubmit: function (formName) {
                var self = this;
                if (self.payEditForm.afterBasicPay == 0) {
                    self.$message({
                        message: '初始薪资不能为0!',
                        type: 'warning'
                    });
                    return false;
                }
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'spwSalaryChange/changeSalary',
                            param = JSON.stringify({
                                "companyId": 139353,
                                "isInit": 0,
                                "setUserId": self.payEditForm.setUserId,
                                "beforeBasicPay": self.payEditForm.beforeBasicPay,
                                "afterBasicPay": self.payEditForm.afterBasicPay,
                                "adjustRange": this.switchRange(self.payEditForm.adjustRange, false),
                                "forceTime": this.$date(self.payEditForm.forceTime),
                                "adjustReason": self.payEditForm.adjustReason
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '调整薪资成功!',
                                    type: 'success'
                                });
                                self.payChangeToggle = true;
                                self.payList();
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            payInputChange: function () {
                this.payEditForm.adjustRange = (((this.payEditForm.afterBasicPay / this.payEditForm.beforeBasicPay) - 1) * 100).toFixed(2) + " % "
            },
            // 幅度转换百分比
            switchRange: function (data, boo) {
                if (boo) {
                    data = (data * 100) + " % ";
                    return data;
                } else {
                    data = data.replace(/%/g, "") / 100
                    return data;
                }
            }


        },
        components: {
            treeComponent
        }


    }

</script>

<style scoped>
    .manage_con span {
        margin-right: 10px;
    }
    
    .manage_con .manage_select {
        margin-right: 30px;
    }
    
    .wages_three_item {
        width: 49%;
        border: 1px solid #e5e7e9;
    }
    
    .wages_three_item+.wages_three_item {
        margin-left: 10px;
    }
    
    .wages_three_item_nav {
        background: #ecf0f3;
        line-height: 36px;
        height: 36px;
        padding-left: 20px;
        border-bottom: 1px solid #e5e7e9;
    }
    
    .wages_three_item_con {
        padding: 20px;
    }

    .sta_left{
        float: left;
    }
    .sta_left_item{
        height: 100px;
        width: 240px;
        text-align: center;
        color: #fff;
        padding: 20px;
    }
    .sta_left_item+.sta_left_item{
        margin-top: 20px;
    }
    .sta_left_a{
        background: #fbc42b;
    }
    .sta_left_b{
        background: #62a8ea;
    }
    .sta_left_c{
        background: #46be8a;
    }
    .sta_left_item h3{
        text-align: left;
    }
    .sta_left_item p{
        line-height: 60px;
        font-size: 24px;
    }
    .sta_icon{
        background: url(../../images/icon01.png);
        height: 126px;
        width: 159px;
        position: absolute;
        left: 420px;
        top: 100px;
        z-index: 999;
    }
</style>