<template>
    <div id='payRecord'>
        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="发放记录" name="0">
                    <div class="hrm_module">
                        <div class="hrm_module_con">
                            <el-table  border :data="payrollListData"   align="center" class="hrm_mgb15">
                                <el-table-column prop="salaryName" label="名称" class="notice_td"></el-table-column>
                                <el-table-column prop="userName" label="发送人" class="notice_td"></el-table-column>
                                <el-table-column prop="sendTime" label="发送时间" class="notice_td"></el-table-column>
                                <el-table-column label="编辑" class="notice_td">
                                    <template scope="scope">
                                        <el-button @click="payrollDetail(scope.row.id)" type="text">明细</el-button>
                                        <el-button @click="payrollRecall(scope.row.id)" type="text" v-if="scope.row.isWithdraw == 0">撤销</el-button>
                                        <el-button @click="payrollRecall(scope.row.id)" type="text" v-if="scope.row.isWithdraw == 1"  :disabled="true">已撤</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="payrollListPage.totalCount" @current-change="payrollList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="工资单明细" :visible.sync="payrollDetailShow" size="large">
                <el-table  border :data="payrollDetailListData" align="center" class="hrm_mgb15">
                    <el-table-column v-bind:prop="key" v-bind:label="val" class="notice_td" v-for="(val, key) in payrollDetailTitle" 
                    v-bind:min-width = 'tableWidth(key)'></el-table-column>
                </el-table>
               <el-pagination layout="total, prev, pager, next" :total="payrollDetailListPage.totalCount" @current-change="payrollDetailList"></el-pagination>
                <el-button type="primary" @click="payrollDetailShow = false" class="pay_btn">确 定</el-button>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                activeName: '0',

                payrollListData: [],
                payrollListPage: {},

                payrollDetailShow: false,
                payrollDetailId: '',
                payrollDetailListData: [],
                payrollDetailListPage: {},

                payrollDetailTitle: {},

                
            }
        },
        mounted: function () {
            this.payrollList()
        },
        methods: {
            tableWidth: function (key) {
                if(key == 'email'){
                    return 200;
                }else if(key == 'phone') {
                    return 150;
                }else if(key == 'releaseTime') {
                    return 120;
                }else{
                    return 100;
                }
            },
            // 列表
            payrollList: function (pageNum) {
                var self = this;
                var method = 'spwSalaryPay/getSalaryBatchList',
                    param = JSON.stringify({
                        "companyId": 139353,
                        "userId": 62607,
                        "pageNum": pageNum ? pageNum : 1,
                        "pageSize": 10
                    }),
                    succeed = function (res) {
                        self.payrollListData = self.$tableNull(res.data.data.result);
                        self.payrollListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 明细
            payrollDetail: function (id) {
                this.payrollDetailId = id;
                this.payrollDetailList();
            },
            payrollDetailList: function (pageNum) {
                var self = this;
                var method = 'spwSalaryPay/getSalaryPayList',
                    param = JSON.stringify({
                        "companyId": 139353,
                        "pageNum": pageNum ? pageNum : 1,
                        "pageSize": 10,
                        "pid": this.payrollDetailId,
                    }),
                    succeed = function (res) {
                        self.payrollDetailListData = res.data.data.result;
                        self.payrollDetailListPage = res.data.data.page;
                        self.payrollDetailTitle = res.data.data.topList
                        self.payrollDetailShow = true;
                    };
                this.$http(method, param, succeed);
            },
            // 撤销
            payrollRecall: function (id) {
                
                this.$confirm('确认后，员工将无法查看这条信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'spwSalaryPay/withdrawSalaryById',
                        param = JSON.stringify({
                            "isWithdraw": 1,
                            "id": id
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.payrollList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
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
    
    .pay_btn {
        float: right;
        margin: 20px 0;
    }
</style>