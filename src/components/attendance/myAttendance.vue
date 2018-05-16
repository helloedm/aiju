<template>
    <div id="myAddendance">
        <header>
            <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
            </el-date-picker>
            <el-button type="primary" class="myAttendance_search" @click='getList'>搜索</el-button>
        </header>
        <div class="myAttendance_item clearfix">
            <div class="myAttendance_item_dl" style="border-top:4px solid #5AA2E7;">
                <div class="myAttendance_item_dt">{{myAttendanceList2.resultType}} <right>{{myAttendanceList2.count}}</right></div>
                <ul class="myAttendance_item_ul">
                    <li class="myAttendance_item_dd" v-for="item in myAttendanceList2.detailList">
                        <span class="font_size_14">{{item.signDate+ ' ' + item.signTime}}</span><span>{{item.signResult}}</span>
                        <right v-if="item.appealStatus==-2" class="color_5aa2e7" @click='appealShowFun(item.recordId,2,item.recordType)'>申诉</right>
                        <right v-if="item.appealStatus==0" class="color_99a9bf">待处理</right>
                        <right v-if="item.appealStatus==1" class="color_99a9bf">处理中</right>
                        <right v-if="item.appealStatus==2" class="color_99a9bf">申诉成功</right>
                        <right v-if="item.appealStatus==3" class="color_f96868">申诉拒绝</right>
                        <!--<right v-if="item.appealStatus==4" class="color_f96868">待申诉</right>-->
                    </li>
                    <li class="myAttendance_nomodel" v-if="myAttendanceList2.detailList.length==0">棒棒哒！您还没迟到过，继续努力哦~</li>
                </ul>
            </div>
            <div class="myAttendance_item_dl" style="border-top:4px solid #F96868;">
                <div class="myAttendance_item_dt">{{myAttendanceList3.resultType}} <right>{{myAttendanceList3.count}}</right></div>
                <ul class="myAttendance_item_ul">
                <li class="myAttendance_item_dd" v-for="item in myAttendanceList3.detailList">
                    <span class="font_size_14">{{item.signDate+ ' ' + item.signTime}}</span><span>{{item.signResult}}</span>
                    <right v-if="item.appealStatus==-2" class="color_5aa2e7" @click='appealShowFun(item.recordId,3,item.recordType)'>申诉</right>
                    <right v-if="item.appealStatus==0" class="color_99a9bf">待处理</right>
                    <right v-if="item.appealStatus==1" class="color_99a9bf">处理中</right>
                    <right v-if="item.appealStatus==2" class="color_99a9bf">申诉成功</right>
                    <right v-if="item.appealStatus==3" class="color_f96868">申诉拒绝</right>
                    <!--<right v-if="item.appealStatus==4" class="color_f96868">待申诉</right>-->
                </li>
                <li class="myAttendance_nomodel" v-if="myAttendanceList3.detailList.length==0">真棒！就要这样</li>
                </ul>
            </div>
            <div class="myAttendance_item_dl" style="border-top:4px solid #46BE8A;">
                <div class="myAttendance_item_dt">{{myAttendanceList0.resultType}} <right>{{myAttendanceList0.count}}</right></div>
                <ul class="myAttendance_item_ul">
                <li class="myAttendance_item_dd" v-for="item in myAttendanceList0.detailList">
                    <span class="font_size_14">{{item.signDate+ ' ' + item.ruleTime}}</span><span>{{item.signResult}}</span>
                    <right v-if="item.appealStatus==-2" class="color_5aa2e7" @click='appealShowFun(item.recordId,0,item.recordType)'>申诉</right>
                    <right v-if="item.appealStatus==0" class="color_99a9bf">待处理</right>
                    <right v-if="item.appealStatus==1" class="color_99a9bf">处理中</right>
                    <right v-if="item.appealStatus==2" class="color_99a9bf">申诉成功</right>
                    <right v-if="item.appealStatus==3" class="color_f96868">申诉拒绝</right>
                    <!--<right v-if="item.appealStatus==4" class="color_f96868">待申诉</right>-->
                </li>
                <li class="myAttendance_nomodel" v-if="myAttendanceList0.detailList.length ==0">上班就要签到刷个存在感哦！</li>
                </ul>
            </div>
            <div class="myAttendance_item_dl" style="border-top:4px solid #F2A654;">
                <div class="myAttendance_item_dt">{{myAttendanceList1.resultType}} <right>{{myAttendanceList1.count}}</right></div>
                <ul class="myAttendance_item_ul">
                <li class="myAttendance_item_dd" v-for="item in myAttendanceList1.detailList">
                    <span class="font_size_14">{{item.signDate+ ' ' + item.ruleTime}}</span><span>{{item.signResult}}</span>
                    <right v-if="item.appealStatus==-2" class="color_5aa2e7" @click='appealShowFun(item.recordId,1,item.recordType)'>申诉</right>
                    <right v-if="item.appealStatus==0" class="color_99a9bf">待处理</right>
                    <right v-if="item.appealStatus==1" class="color_99a9bf">处理中</right>
                    <right v-if="item.appealStatus==2" class="color_99a9bf">申诉成功</right>
                    <right v-if="item.appealStatus==3" class="color_f96868">申诉拒绝</right>
                    <!--<right v-if="item.appealStatus==4" class="color_f96868">待申诉</right>-->
                </li>
                <li class="myAttendance_nomodel" v-if="myAttendanceList1.detailList.length ==0">下班就要签退 good job！</li>
                </ul>
            </div>
            <div class="myAttendance_item_dl" style="border-top:4px solid #57C7D4;">
                <div class="myAttendance_item_dt">{{myAttendanceList4.resultType}} <right>{{myAttendanceList4.count}}</right></div>
                <ul class="myAttendance_item_ul">
                <li class="myAttendance_item_dd myAttendance_item_waiqin" v-for="item in myAttendanceList4.detailList">
                    <span class="font_size_14">{{item.signTime}}</span>
                    <right>外勤签到</right>
                    <p>地址 : {{item.signResult}}</p>
                </li>
                <li class="myAttendance_nomodel" v-if="myAttendanceList4.detailList.length==0">您这段时间还没有外勤哦！</li>
                </ul>
            </div>
            <div class="myAttendance_item_dl" style="border-top:4px solid #926DDE;">
                <div class="myAttendance_item_dt">{{myAttendanceList5.resultType}} <right>{{myAttendanceList5.count}}</right></div>
                <ul class="myAttendance_item_ul">
                <li class="myAttendance_item_dd myAttendance_item_waiqin" v-for="item in myAttendanceList5.detailList">
                    <span class="font_size_14">{{item.signDate}}</span><span>至</span>
                    <right>{{item.position}}</right>
                    <p class="font_size_14">{{item.ruleTime}}</p>
                </li>
                <li class="myAttendance_nomodel" v-if="myAttendanceList5.detailList.length==0">您这段时间还没有请假哦！</li>
                </ul>
            </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="appealShow"
        class="dialog_w540"
        size="">
            <el-form :model="form">
                <el-form-item label="申诉类型" :label-width="formLabelWidth">
                    <el-radio class="radio" v-model="form.radio" label="1">请假</el-radio>
                    <el-radio class="radio" v-model="form.radio" label="2">外出</el-radio>
                    <el-radio class="radio" v-model="form.radio" label="3">出差</el-radio>
                    <el-radio class="radio" v-model="form.radio" label="4">其他</el-radio>
                </el-form-item>
                <el-form-item label="请假类型" :label-width="formLabelWidth" v-if="form.radio==1">
                    <el-select v-model="form.subType" placeholder="请选择请假类型">
                        <el-option label="事假" value="1"></el-option>
                        <el-option label="病假" value="2"></el-option>
                        <el-option label="调休" value="3"></el-option>
                        <el-option label="年休假" value="4"></el-option>
                        <el-option label="婚假" value="5"></el-option>
                        <el-option label="生育假" value="6"></el-option>
                        <el-option label="加班" value="7"></el-option>
                        <el-option label="其他" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择时间" :label-width="formLabelWidth">
                    <el-date-picker
                    v-model="form.date"
                    type="datetimerange"
                    align="right"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出差城市" :label-width="formLabelWidth" v-if="form.radio==3">
                    <el-input v-model="form.city" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="申诉理由" :label-width="formLabelWidth">
                    <el-input v-model="form.content" auto-complete="off" type="textarea" maxlength="140"></el-input>
                </el-form-item>
                <el-form-item label="添加附件" :label-width="formLabelWidth">
                    <file-upload :param="param" @fileId="fileId" @deleFileId="deleFileId" :empty="empty"></file-upload>
                </el-form-item>
                <el-form-item label="审批人" :label-width="formLabelWidth">
                    <tree-component @treeOrderAssign="treeOrderAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='2'></tree-component>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="appealShow = false">取 消</el-button>
                <el-button type="primary" @click="appealSend()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import fileUpload from '../fileUpload.vue';
    import treeComponent from '../tree.vue';

    export default{
        data(){
            return{
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
            value7:'',
            myAttendanceList0:{
                detailList:[]
            },//申诉状态 0 待处理，1申诉中，2已同意，3已拒绝 
            myAttendanceList1:{
                detailList:[]
            },//申诉状态 0 待处理，1申诉中，2已同意，3已拒绝 
            myAttendanceList2:{
                detailList:[]
            },//申诉状态 0 待处理，1申诉中，2已同意，3已拒绝 
            myAttendanceList3:{
                detailList:[]
            },//申诉状态 0 待处理，1申诉中，2已同意，3已拒绝 
            myAttendanceList4:{
                detailList:[]
            },//申诉状态 0 待处理，1申诉中，2已同意，3已拒绝 
            myAttendanceList5:{
                detailList:[]
            },//申诉状态 0 待处理，1申诉中，2已同意，3已拒绝 
            appealShow:false,
            form:{
                city:'',
                radio:'1',
                subType:'1',
                date:[],
                content:'',
                sendToPerson:'',

            },
            formLabelWidth:'100px',
            param:{
                businessId:9,
                fId:-1
            },
            fileIds:[],
            empty:'',
            treeBtnName: '请选择员工',
            temporarySendToPerson:[],
            temporarySendToPersonName:[],
            appealShowId:372,
            appealShowType:0,
            recordType:'',
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                var self = this;
                var method = "mySignRecord/getMySignRecord",
                    param=JSON.stringify({
                        userId:'9094718',
                        companyId:'9169549',
                        startDate:self.$date(self.value7[0]),
                        endDate:self.$date(self.value7[1])
                    }),
                    successd=function(res){
                        self.myAttendanceList0=res.data.data.signResultDetail[0];
                        self.myAttendanceList1=res.data.data.signResultDetail[1];
                        self.myAttendanceList2=res.data.data.signResultDetail[2];
                        self.myAttendanceList3=res.data.data.signResultDetail[3];
                        self.myAttendanceList4=res.data.data.signResultDetail[4];
                        self.myAttendanceList5=res.data.data.signResultDetail[5];
                    };
                self.$http(method,param,successd);
            },
            fileId(id){
                this.fileIds.push(id);
                console.log(id);
            },
            deleFileId(id){
                var self = this;
                for(var i=0;i<self.fileIds.length;i++){
                    if(self.fileIds[i] == id){
                        self.fileIds.splice(i,1);
                    }
                }
            },
            // 树组件赋值
            treeOrderAssign(v) {
                var _this = this;
                if (v.checked) {
                    _this.temporarySendToPerson.push(v.id);
                    _this.temporarySendToPersonName.push(v.name);
                } else {
                    for(var i=0;i<_this.temporarySendToPerson.length;i++){
                        if(_this.temporarySendToPerson[i] ==v.id){
                            _this.temporarySendToPerson.splice(i,1);
                            _this.temporarySendToPersonName.splice(i,1);
                        }
                    }
                }
                _this.form.sendToPerson = _this.temporarySendToPerson.join(',');
                _this.btnName = _this.temporarySendToPersonName.join();
            },
            appealSend(id,type){
                var self =this;
                var method="flowInfo/addFlowInfo";
                var param=JSON.stringify({
                    flowInfo:{
                        flowType:4,
                        content:self.form.content,
                        sendToPerson:self.form.sendToPerson,
                        file:self.fileIds.join()
                    },
                    multiple:[{
                        recordId:self.appealShowId,
                        theme:self.appealShowType,
                        signAppealType:self.form.radio,
                        subType:self.form.subType,
                        startTime:self.$date(self.form.date[0],'time'),
                        endTime:self.$date(self.form.date[1],'time'),
                        city:self.form.city,
                        recordType:self.recordType
                    }],
                    from:"PC"
                });
                var successd=function(){
                    self.getList();
                    self.appealShow=false;
                    self.$message({
                        message:'操作成功',
                        type:'success'
                    })
                };
                self.$http(method,param,successd);
            },
            appealShowFun(id,type,recordType){
                this.appealShow=true;
                this.appealShowId=id;
                this.appealShowType=type;
                this.recordType=recordType;
            }
        },
        components: {
            fileUpload,
            treeComponent
        }
    }
</script>

<style scoped>
    .myAttendance_search{margin-left: 20px;}
    .myAttendance_item .myAttendance_item_dl{width: 356px;height: 400px;float: left;margin: 20px 20px 0 0;background-color: #fff; overflow: hidden;}
    .myAttendance_item_ul{height: 350px;overflow: auto;}
    .myAttendance_item_dt{height: 50px;border-bottom: 1px solid #e5e9f2;font-size: 16px;line-height: 50px;padding:0 20px;}
    .myAttendance_nomodel{text-align: center;height: 50px;color: #97a8be;line-height: 50px;font-size: 14px;}
    .myAttendance_item_dd{height: 50px;line-height: 50px;}
    .myAttendance_item_dd span{margin-left: 20px;font-size: 12px;color: #475669;}
    .myAttendance_item_dd span.font_size_14{font-size: 14px;}
    .myAttendance_item_dd span:nth-child(2){color: #1f2d3d;}
    .myAttendance_item_dd right{margin-right: 20px;cursor: pointer;}
    .myAttendance_item_waiqin{height: 75px;}
    .myAttendance_item_waiqin span{height: 75px;line-height: 20px;}
    .myAttendance_item_waiqin p{margin-left: 20px;color: #99a9bf;font-size: 12px;line-height: 12px;margin-top: -10px;}
    .myAttendance_item_waiqin p.font_size_14{font-size: 14px;}
    .myAttendance_item_waiqin right{color: #475669;}
</style>