<template>
    <div id='payRecord'>

        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="我的工资单" name="0">
                    <div class="hrm_module">
                        <div class="hrm_module_con">
                            <el-table  border :data="payStubsListData"   align="center" class="hrm_mgb15">
                                <el-table-column prop="salaryName" label="名称" class="notice_td"></el-table-column>
                                <el-table-column prop="userName" label="发送人" class="notice_td"></el-table-column>
                                <el-table-column prop="sendTime" label="发送时间" class="notice_td"></el-table-column>
                                <el-table-column label="编辑" class="notice_td">
                                    <template scope="scope">
                                        <el-button @click="payStubsDetail(scope.row.id)" type="text">明细</el-button>
                                        <el-button @click="payStubsRecall(scope.row.id)" type="text" v-if="scope.row.isWithdraw == 0">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="payStubsListPage.totalCount" @current-change="payStubsList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        
        <el-dialog title="工资单明细" :visible.sync="payStubsDetailShow" size="large">
                    <el-table  border :data="payStubsTableArr"  >
                        <el-table-column v-bind:prop="key" v-bind:label="val" v-for="(val, key) in payStubsDetailListTitle" v-bind:min-width = 'tableWidth(key)'></el-table-column>
                    </el-table>
                <el-button type="primary" @click="payStubsDetailShow = false" class="pay_btn">确 定</el-button>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                activeName: '0',

                payStubsListData: [],
                payStubsListPage: {},
                payStubsTableArr: [],

                payStubsDetailShow: false,

                payStubsDetailId: '',
                payStubsDetailListData: {},
                payStubsDetailListTitle: {},




            }
        },
        mounted: function () {
            this.payStubsList()
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
            payStubsList: function (pageNum) {
                var self = this;
                var method = 'spwSalaryPay/getMyHistorySalaryPayList',
                    param = JSON.stringify({
                        "companyId": 139353,
                        "empNo": 1,
                        "pageNum": pageNum ? pageNum : 1,
                        "pageSize": "10"
                    }),
                    succeed = function (res) {
                        self.payStubsListData = res.data.data.result;
                        self.payStubsListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 明细
            payStubsDetail: function (id) {
                this.payStubsDetailId = id;
                this.payStubsTableArr = [];
                this.payStubsDetailList();
            },
            payStubsDetailList: function (pageNum) {
                var self = this;
                var method = 'spwSalaryPay/getMySalaryPay',
                    param = JSON.stringify({
                        "companyId": 61,
                        "id": self.payStubsDetailId
                    }),
                    succeed = function (res) {
                        self.payStubsDetailListData = res.data.data.result;
                        self.payStubsDetailListTitle = res.data.data.topList;

                        var obj = {};
                        for (var i in self.payStubsDetailListTitle) {
                            obj[i] = self.payStubsDetailListData[i]
                        }
                        self.payStubsTableArr.push(obj)
                        self.payStubsDetailShow = true;
                    };
                this.$http(method, param, succeed);
            },
            // 删除
            payStubsRecall: function (id) {
                this.$confirm('确认后，将永久删除这条信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'spwSalaryPay/delSalaryInfo',
                        param = JSON.stringify({
                            "isDel": 1,
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.payStubsList();
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