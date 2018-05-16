<template>
    <div id='payRecord'>
        <el-tabs v-model="activeName">
            <el-tab-pane label="发放工资条" name="0">
                <el-steps :space="200" :active="payWagesStep" class="wages_step" align-center style="width:600px;margin:50px auto;">
                    <el-step title="上传" description=""></el-step>
                    <el-step title="预览" description=""></el-step>
                    <el-step title="发放" description="" style="width: auto;"></el-step>
                </el-steps>

                <div class="wages_one" v-show="payWagesStep==1">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-upload :action="uploadUrl" :data="uploadData" :on-success="payUploadSuccess" :show-file-list="false">
                            <el-button type="primary">上传工资单</el-button>
                        </el-upload>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="center" style="margin-top: 20px">
                        <div class="hrm_module">
                            <div class="hrm_module_nav">注意事项</div>
                            <div class="hrm_module_con">
                                <p>我们为你提供了工资单模板，请下载使用我们提供的<a href="https://aijuhr.com/upload/salary.xls">工资单模板</a>来录入工资数据，然后进行上传；</p>
                                <p>工资单模板不允许修改，如果列值不需要，系统会默认为0；</p>
                                <p>工资单模版中务必包含：手机和邮箱（用于发送提醒），并且要确保这些列的数据的正确无误；</p>
                            </div>
                        </div>
                    </el-row>
                </div>
                <div class="wages_two" v-show="payWagesStep == 2">
                    <div class="hrm_module">
                        <div class="hrm_module_nav">预览工资单</div>
                        <div class="hrm_module_con">
                            <el-table  border :data="payUploadListData"   align="center">
                                <el-table-column v-bind:prop="key" v-bind:label="val" class="notice_td" v-for="(val, key) in payUploadTitleData" v-bind:min-width = 'tableWidth(key)'></el-table-column>

                            </el-table>
                        </div>
                        <el-button type="primary" class="wages_btn_m20 f_r" @click="payWagesStep = 3">下一步</el-button>
                        <el-button type="" class="wages_btn_m20 f_r" @click="payWagesStep = 1">上一步</el-button>
                    </div>
                </div>
                <div class="wages_three" v-show="payWagesStep == 3">
                    <div class="clearfix">
                        <div class="hrm_module" style="width: 49%;float: left;">
                            <div class="hrm_module_nav">设置工资条展示信息</div>
                            <div class="hrm_module_con" style="height: 380px;overflow: auto;">
                                <table>
                                    <tr>
                                        <th style="text-align: left;">列名称</th>
                                        <th style="text-align: right;">是否展示</th>
                                    </tr>
                                    <tr v-for="(val, key) in payUploadTitleData">
                                        <td style="text-align: left;">{{val}}</td>
                                        <td style="text-align: right;">
                                            <el-checkbox :checked="true" @change="payWagesCheckbox(val, key)" v-bind:disabled='key == "needPayment" ? true: false'></el-checkbox>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="hrm_module" style="width: 49%;float: right;">
                            <div class="hrm_module_nav">工资条详情展示</div>
                            <div class="hrm_module_con" style="height: 380px;overflow: auto;">
                                <table>
                                    <tr>
                                        <th style="text-align: left;">名称</th>
                                        <th style="text-align: right;">金额</th>
                                    </tr>
                                    <tr v-for="(val, key) in payUploadTitleData">
                                        <template v-if="payUploadTitleShow[key]">
                                            <td style="text-align: left;">{{val}}</td>
                                            <td style="text-align: right;">{{payUploadListData[0][key]}}</td>
                                        </template>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_module">
                        <div class="hrm_module_nav">设置邮件信息</div>
                        <div class="hrm_module_con">
                            <el-form ref="emailData" :model="emailData" label-width="100px" :rules="emailRules">
                                <el-form-item label="发薪月份" prop="salaryTime">
                                    <el-select v-model="emailData.salaryTime" placeholder="请选择发薪月份" style="width: 200px;" @change="changeSalaryTime">
                                        <el-option v-for="item in monthArray" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="发薪类型" prop="emailType">
                                    <el-input v-model="emailData.emailType" style="width: 200px;" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="邮件标题" prop="mailTitle">
                                    <el-input v-model="emailData.mailTitle" placeholder="请输入邮件标题" style="width: 300px;"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="payWagesStep = 2">上一步</el-button>
                                    <el-button type="primary" @click="payWagesSubmit('emailData')">确认发送</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>


                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Util from '../../script/util.js'


    export default {
        data() {
            return {
                activeName: '0',
                payWagesStep: 1, // 步骤
                uploadUrl: Util.uploadURLForPay, // 上传地址
                uploadData: {},
                payUploadListData: [],// 上传数据
                payUploadTitleData: {}, // 表格表头对象
                payUploadTitleArr: [], // 表格表头对象
                payUploadTitleShow: {}, // 表格表头对象

                payUploadName: '',
                payUploadPid: '',


                monthArray: ['2018年01月', '2018年02月', '2018年03月', '2018年04月', '2018年05月', '2018年06月', '2018年07月', '2018年08月'],// 月份数据
                emailData: {
                    salaryTime: '',
                    emailType: '薪资',
                    mailTitle: '',
                },
                emailRules: {
                    salaryTime: [
                        { required: true, message: '请选择发薪月份', trigger: 'blur' },
                    ],
                    mailTitle: [
                        { required: true, message: '请输入邮件标题', trigger: 'blur' },
                    ]
                },
            }
        },
        mounted: function () {
            this.uploadAssign('spwSalaryPay/leadSpwSalaryPays')
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
            uploadAssign: function (method) {
                var param = JSON.stringify({
                    companyId: 61,
                    pid: '',
                })
                this.uploadData = {
                    param: param,
                    sign: this.$md5(method, param)
                }
                console.log( this.uploadData)
            },
            // 上传工资单
            payUploadSuccess: function (res, file, fileList) {
                if (res.code == 0) {
                    this.payUploadListData = res.data.spwSalaryPays;
                    this.payUploadTitleData = res.data.topList;
                    this.payUploadName = res.data.fileName;
                    for (var i in res.data.topList) {
                        this.payUploadTitleArr.push(i)
                        this.payUploadTitleShow[i] = true;
                    }
                    this.payWagesStep = 2;
                    // 取到发放薪资pid
                    var self = this;
                    var method = 'spwSalaryPay/inserts',
                        param = JSON.stringify({
                            companyId: 139353,
                            userId: 62607,
                            fileName: self.payUploadName,
                            spwSalaryPays: self.payUploadListData,
                            pid: ''
                        }),
                        succeed = function (res) {
                            self.payUploadPid = res.data.data;
                        };
                    this.$http(method, param, succeed);
                } else {
                    this.$message({
                        message: '操作失败，原因：' + res.message,
                        type: 'error'
                    });
                }
            },

            // 设置工资条展示信息
            payWagesCheckbox: function (val, key) {
                if (this.payUploadTitleArr.indexOf(key) == -1) {
                    this.payUploadTitleShow = Object.assign({}, this.payUploadTitleShow, this.payUploadTitleShow[key] = true)
                    // this.$set(this.payUploadTitleShow, key, true)
                    this.payUploadTitleArr.push(key);
                } else {
                    this.payUploadTitleShow = Object.assign({}, this.payUploadTitleShow, this.payUploadTitleShow[key] = false)

                    // this.$set(this.payUploadTitleShow, key, false)
                    this.payUploadTitleArr.splice(this.payUploadTitleArr.indexOf(key), 1)
                }
                console.log(this.payUploadTitleShowz)
            },
            changeSalaryTime: function (v) {
                this.emailData.mailTitle = v + '薪资发放'
            },
            // 确认发放工资
            payWagesSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'spwSalaryPay/sendMessageOfSalary',
                            param = JSON.stringify({
                                "companyId": 139353,
                                "pid": self.payUploadPid,
                                "showFields": self.payUploadTitleArr.join(','),
                                "salaryTime": self.emailData.salaryTime,
                                "mailTitle": self.emailData.mailTitle
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '发放工资条成功成功!',
                                    type: 'success'
                                });
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            }
        }

    }

</script>

<style scoped>
    .hrm_module p {
        line-height: 36px;
    }
    
    .wages_btn_m20 {
        margin: 20px 0 0 20px;
    }
    
    .wages_step {
        margin: 50px 0;
    }
    
    .hrm_module_con table {
        text-align: center;
        border: 1px solid #dfe6ec;
        width: 100%;
    }
    
    .hrm_module_con table th {
        border-bottom: 1px solid #dfe6ec;
        background: #eef1f6;
        line-height: 40px;
        padding: 0 12px;
    }
    
    .hrm_module_con table td {
        line-height: 40px;
        padding: 0 12px;
    }
    
    .hrm_module_con .el-checkbox {
        height: 30px;
    }
</style>