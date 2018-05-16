<template>
    <div id="caredetail" class="hrm_module caredetail">
        <div class="hrm_module_con">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/manage/usercare' }">员工关怀</el-breadcrumb-item>
                <el-breadcrumb-item>去关怀</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="caredetail_left">
                <div class="caredetail_left_con">
                    <div class="caredetail_tupian" v-if="careInfo.url"><img :src="careInfo.url" alt=""></div>
                    <div class="w260" v-if="careInfo.receiveStr">
                        <span>{{careInfo.receiveStr}}</span><el-tag type="primary">员工姓名</el-tag>
                    </div>
                    <el-input type="textarea" autosize class="gocare_content" placeholder="请输入祝福内容" resize="none" v-model="careInfo.content"></el-input>
                    <div class="text_algin_right w260" v-if="careInfo.sendStr == 1">
                        <el-tag type="primary">企业名称</el-tag> 
                    </div>
                    <div class="text_algin_right w260" v-if="careInfo.isSendTime">
                        <el-tag type="primary">祝福发送日期</el-tag>
                    </div>
                </div>
            </div>
            <div class="caredetail_right">
                <div><el-tag type="danger">{{careInfo.typeStr}}</el-tag><span class="caredetail_biaoti">{{careInfo.title}}</span></div>
                <div class="caredetail_personal"><span>{{detail.userName}}</span><span>创建时间 : {{detail.createTime}}</span><span>发布时间 : {{detail.sendTime}}</span></div>
                <div class="caredetail_status"><span>关怀状态 : </span>{{detail.status == 1?"等待中":detail.status == 2?"已完成":"已关闭"}}</div>
                <div class="caredetail_exc"><el-button :disabled="detail.status==2||detail.status==3" type="primary" @click="closecare">关闭关怀</el-button></div>
            </div>
            <div class="caredatail_sendNum"><span>发放人员数 : </span>{{sendNum}}<span>人 , 已发 : </span>{{isSendNum}}<span>人 , 未发 : </span>{{unSendNum}}人</div>
            <el-table
            :data="userList"
            style="width: 100%;margin:20px 0;">
                <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="userNo"
                    label="工号">
                </el-table-column>
                <el-table-column
                    prop="deptName"
                    label="部门">
                </el-table-column>
                <el-table-column
                    prop="positionName"
                    label="职位">
                </el-table-column>
                <el-table-column
                    prop="joinDate"
                    label="入职时间">
                </el-table-column>
                <el-table-column
                    prop="birdthDay"
                    label="生日">
                </el-table-column>
                <el-table-column
                    label="发放状态">
                    <template scope="scope">
                        <div>{{scope.row.sendStatus==1?"已接受":"未接受"}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.totalPageCount"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<style scoped>
    .caredetail_left{width: 420px;float: left;height: 420px;margin-top: 20px;border: 1px solid #dfe6ec;background-color: #dfe6ec;}
    .caredetail_right{margin-left: 440px;height: 422px;margin-top: 20px;}
    .caredetail_left_con{width: 285px;height: 100%;margin: 0 auto;border-left: 1px solid #dfe6ec;border-right: 1px solid #dfe6ec;background-color: #fff;}
    .caredetail_biaoti{font-size: 18px;display: inline-block;line-height: 24px;margin-left: 20px;vertical-align: middle;}
    .caredetail_tupian{width: 260px;margin: 0 auto;height: 200px;overflow: hidden;}
    .caredetail_tupian img{width: 260px;}
    .caredetail_personal{margin-top: 30px;}
    .caredetail_personal span{margin-right: 20px;}
    .caredetail_status{margin-top: 30px;font-size: 16px;}
    .caredetail_exc{margin-top: 30px;}
    .caredatail_sendNum{font-size: 16px;margin-top: 20px;}
</style>

<script>
    export default{
        data(){
            return{
                page:{
                    pageNum:1,
                    pageSize:10,
                    totalPageCount:0,
                    totalCount:0
                },
                isSendNum:0,
                sendNum:0,
                unSendNum:0,
                detail:{},
                careInfo:{},
                userList:[],
            }
        },
        mounted(){
            this.getcaredetail();
        },
        methods:{
            getcaredetail(){
                var id= this.$route.params;
                if(id.id == null){
                    this.$router.push({"name":'usercare'});
                    return;
                }
                var self = this;
                var method= "care/getCareDetail",
                    param=JSON.stringify({
                        id:id.id,
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize
                    }),
                    successd = function(res){
                        self.detail = res.data.data.detail;
                        self.careInfo = res.data.data.detail.careInfo;
                        self.page= res.data.data.page;
                        self.userList = res.data.data.userList;
                        self.isSendNum = res.data.data.isSendNum;
                        self.sendNum = res.data.data.sendNum;
                        self.unSendNum = res.data.data.unSendNum;
                    };
                self.$http(method,param,successd);
            },
            handleSizeChange(val){
                this.page.pageSize = val;
                this.getcaredetail();
            },
            handleCurrentChange(val){
                this.page.pageNum = val;
                this.getcaredetail();
            },
            closecare(){
                var id= this.$route.params;
                var self = this;
                var method = "care/updateCompanyCare",
                    param=JSON.stringify({
                        id:id.id
                    }),
                    successd=function(res){
                        self.getcaredetail();
                    };
                self.$http(method,param,successd);
            },
            scopeVal(scope){
                console.log(scope);
            }
        }
    }
</script>