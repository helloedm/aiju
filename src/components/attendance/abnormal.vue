<template>
    <div id="abnormal" class="abnormal hrm_module">
        <el-input
        placeholder="请输入姓名或工号"
        icon="search"
        v-model="input2"
        class="abnormal_searchName">
        </el-input>
        <el-date-picker
            v-model="value1"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
        </el-date-picker>
        <el-select v-model="value5" placeholder="考勤状态" clearable>
            <el-option label="迟到" value="2"></el-option>
            <el-option label="早退" value="3"></el-option>
            <el-option label="未签到" value="4"></el-option>
            <el-option label="未签退" value="5"></el-option>
        </el-select>
        <el-select v-model="value6" placeholder="处理状态">
            <el-option label="全部" value='null'></el-option>
            <el-option label="未申诉" value="0"></el-option>
            <el-option label="待处理" value="1"></el-option>
            <el-option label="以处理" value="2"></el-option>
        </el-select>
        <el-button type="primary" @click="getAbnormal">搜索</el-button>
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:20px;">
            <el-table-column
            type="index"
            label="序号"
            width="50">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="userNo"
            label="工号">
            </el-table-column>
            <el-table-column
            prop="signDate"
            label="考勤日">
            </el-table-column>
            <el-table-column
            prop="ruleTime"
            label="考勤时间">
            </el-table-column>
            <el-table-column
            prop="position"
            label="考勤地点">
            </el-table-column>
            <el-table-column
            prop="signResult"
            label="考勤方式">
                <template scope="scope">
                    <div>{{scope.row.signStatus==0?"未签到":scope.row.signStatus==1?"未签退":"APP"}}</div>
                </template>
            </el-table-column>
            <el-table-column
            prop="signStatus"
            label="考勤状态">
                <template scope="scope">
                    <div>{{scope.row.signStatus==0?"未签到":scope.row.signStatus==1?"未签退":scope.row.signStatus==2?"迟到":"早退"}}</div>
                </template>
            </el-table-column>
            <el-table-column
            prop="signResult"
            label="处理结果">
                <template scope="scope">
                    <div>{{scope.row.signResult==0?"未处理":scope.row.signResult==1?"处理中":"已处理"}}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:'abnormal',
        data(){
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                input2:'',
                value1:[],
                value6:null,
                value5:'',
                tableData:[]
            }
        },
        mounted(){
            this.getAbnormal();
        },
        methods:{
            getAbnormal(){
                var self = this;
                var method="mySignRecord/getAbnormalRecord",
                    param=JSON.stringify({
                        "startDate":self.$date(self.value1[0]),
                        "endDate":self.$date(self.value1[1]),
                        "signStatus":self.value5==''?null:self.value5,
                        "appealStatus":self.value6=='null'?null:self.value6,
                        "character":self.input2==''?null:self.input2
                    }),
                    successd=function(res){
                        self.tableData = res.data.data.signResultDetail;
                    };
                self.$http(method,param,successd);
            }
        },
    }
</script>
<style scoped>
    .abnormal_searchName{width: 180px;}
</style>