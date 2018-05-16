<template>
    <div id='payRecord'>
        <el-tabs v-model="activeName">
            <el-tab-pane label="调整薪资" name="one">
                <div class="wages_three_item hrm_box">
                    <div class="wages_three_item_nav">调整薪资</div>
                    <div class="wages_three_item_con">
                        <el-form ref="form" :model="form" label-width="150px" :rules="rules">
                            <el-form-item label="当前基本薪资">
                                <el-input v-model="form.payAdjustCur" :disabled="true" style="width: 200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="调整后基本薪资" prop="payAdjustAfter">
                                <el-input v-model="form.payAdjustAfter" style="width: 200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="调整幅度" prop="payAdjustRange">
                                <el-input v-model="form.payAdjustRange" icon="search" style="width: 200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="生效时间" prop="payAdjustTime">
                                <el-date-picker type="date" placeholder="选择日期" style="width: 200px;" v-model="form.payAdjustTime">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="调薪理由">
                                <el-input type="textarea" style="" :rows="3"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="">提交</el-button>
                                <el-button @click="">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="wages_three_item hrm_box">
                    <div class="wages_three_item_nav">调薪记录</div>
                    <div class="wages_three_item_con">
    
                        <el-steps :space="100" direction="vertical">
                            <el-step v-for="item in payAdjustRecord" v-bind:title="item.forceTime" v-bind:description="item.text"></el-step>
                        </el-steps>
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
            activeName: 'one',
            payAdjustRecord: [], // 调薪记录
            form: {
                payAdjustCur: '', // 当前薪资
                payAdjustAfter: '', // 调整后薪资
                payAdjustRange: '', // 调整幅度
                payAdjustTime: '',
            },
            rules: {
                payAdjustAfter: [
                    { required: true, message: '请输入调整后薪资', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                ],
                payAdjustRange: [
                    { required: true, message: '请输入调整幅度', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                ],
                payAdjustTime: [
                    { required: true, message: '请输入生效时间', trigger: 'blur' },
                ]
            },
        }
    },
    mounted: function () {
        this.ajax()
    },
    methods: {
        ajax: function (url) {
            var self = this;
            this.$ajax.post(Util.url,
                'method=spwSalaryChange/getAdjustSalaryLog'
                + '&param=' + JSON.stringify({
                    "setUserId": 14539,
                    "companyId": 139353,
                })
            ).then(function (res) {
                self.payAdjustRecord = res.data.data.result;
                var len = self.payAdjustRecord.length
                for (var i = 1; i < len; i++) {
                    self.payAdjustRecord[i].text =
                        "由"
                        + self.payAdjustRecord[i].beforeBasicPay +
                        "元调整为"
                        + self.payAdjustRecord[i].afterBasicPay +
                        "元；";
                    if (self.payAdjustRecord[i].adjustReason != undefined) {
                        self.payAdjustRecord[i].text += "调薪理由：" + self.payAdjustRecord[i].adjustReason + ""
                    }
                }
                self.form.payAdjustCur = self.payAdjustRecord[len - 1].afterBasicPay;
                self.payAdjustRecord[0].text = "初始薪资" + self.payAdjustRecord[0].afterBasicPay + ""
            }).catch(function (err) {
                console.log(err);
            });
        },
    }
}
</script>

<style scoped>
.wages_three_item {
    border-radius: 2px;
    margin-bottom: 20px;
    width: 49%;
    float: left;
}

.wages_three_item+.wages_three_item {
    margin-left: 10px;
    ;
}

.wages_three_item_nav {
    background: #ecf0f3;
    line-height: 36px;
    height: 36px;
    padding-left: 20px;
}

.wages_three_item_con {
    padding: 20px;
}
</style>