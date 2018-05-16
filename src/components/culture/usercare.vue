<template>
    <div id="userCare">
        <div class="hrm_module">
            <div class="hrm_module_con">
                <el-button type="primary" @click="gocare()">去关怀</el-button>
                <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom" :class="{'el-icon-caret-top':gjSearchCon}"></i></el-button>
                <el-input
                placeholder="输入关怀场景,部门按下回车进行搜索"
                icon="search"
                v-model="input2"
                class="search_usercare"
                :on-icon-click="handleIconClick"
                @keyup.enter.native="handleIconClick"
                @blur="handleIconClick">
                </el-input>
                <div class="gj_search_con" v-show="gjSearchCon">
                    <div class="gj_search_con1 margin-t-15">
                        <el-select v-model="sceneJieri" clearable  placeholder="请选择节日" style="width:220px">
                            <el-option :label="item.name" :value="item.id" v-for="item in scene"></el-option>
                        </el-select>
                        <tree-component @treeAssign="treeAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='1' class="care_display_in margin_left_30"></tree-component>
                    </div>
                    <div class="gj_search_con2 margin-t-15">
                        <el-date-picker
                        v-model="value6"
                        type="daterange"
                        placeholder="选择日期范围">
                        </el-date-picker>
                        <el-select v-model="region" placeholder="关怀状态" clearable class="margin_left_30">
                            <el-option label="等待中" value="1"></el-option>
                            <el-option label="已完成" value="2"></el-option>
                            <el-option label="已关闭" value="3"></el-option>
                        </el-select>
                        <el-button type="primary" @click="gaojiSearchCare()" class="margin_left_30">搜索</el-button>
                        <el-button @click="resetgaojiSearchCare" class="margin_left_30">重置</el-button>
                    </div>
                </div>
            </div>
        </div>
        <ul class="hrm_modeule_con usercare_search_list">
            <li class="usercare_con" v-for="item in list" @click="usercareList(item.id)">
                <div class="usercare_con_header"><img :src="item.careInfo.url" alt="" width="200"></div>
                <span class="usercare_con_tab">{{item.status==1?"等待中":item.status==2?"已完成":"已关闭"}}</span>
                <p class="usercare_con_h33">{{item.careInfo.title}}</p>
                <h3 class="usercare_con_h33 usercare_con_fs12">To:{{item.receiveNames}}</h3>
                <div class="usercare_con_h33 usercare_con_fs12"><span class="usercare_con_biaoji">{{item.careInfo.typeStr}}</span><em>发放人数 : <span class="font_size_14">{{item.sendNum}}</span></em></div>
            </li>
            <li v-if="list.length == 0" class="usercare_con_none">暂无数据</li>
        </ul>
    </div>
</template>
<script>
import treeComponent from '../tree.vue';
    export default {
        data(){
            return {
                input2:'',
                value6:'',
                region:'',
                gjSearchCon:false,
                list:[],
                sceneJieri:'',
                treeBtnName:"选择部门",
                scene:[],
            }
        },
        mounted(){
            this.searchCare();
            this.getFestivalList();
        },
        methods:{
            handleIconClick(){
                var param = {
                    keyword:this.input2,
                    searchMode:1
                }
                this.searchCare(param);
            },
            searchCare(param){
                var self = this;
                var method = "care/getCareList";
                if(param){
                    param = JSON.stringify(param);
                }else{
                    param=JSON.stringify({});
                }
                var successd = function(res) {
                    self.list = res.data.data;
                }
                self.$http(method,param,successd);
            },
            getFestivalList(){
                var self = this;
                var method= "careTemplet/getFestivalList",
                    param= JSON.stringify({}),
                    successd = function(res) {
                        self.scene = res.data.data;
                    };
                self.$http(method,param,successd);
            },
            treeAssign(val){
                if (val.dept == undefined) {
                    this.searchDept = val.join();
                }
            },
            usercareList(id){
                console.log(id);
                this.$router.push({name:'caredetail',params:{'id':id}});
            },
            gocare(){
                this.$router.push({name:'gocare'});
            },
            gaojiSearchCare(){
                console.log(this.value6);
                var param = {
                    searchDept:this.searchDept,
                    searchType:this.sceneJieri,
                    starTime:this.value6[0],
                    endTime:this.value6[1],
                    status:this.region,
                    searchMode:2
                }
                this.searchCare(param);
            },
            resetgaojiSearchCare(){
                console.log("123");
                this.searchDept="";
                this.searchType="";
                this.value6=[];
                this.region="";
                this.sceneJieri='';
                this.treeBtnName="选择部门";
            }
        },
        components:{
            treeComponent
        }
    }
</script>
<style scoped>
    .search_usercare.el-input{width: 350px;float: right;}
    .gj_search.el-button{float: right;}
    .gj_search_con{padding: 20px;background-color: #f5f8fa;border: 1px solid #bfcbd9;}
    .gj_search_con1{margin-bottom: 10px;}
    .gj_search_con{margin-top: 20px;}
    .usercare_search_list{margin: -10px -10px 0;}
    .usercare_con{height: 300px;display: inline-block;position: relative;width: 250px;margin: 10px;background-color: #fff;border-bottom: 2px solid #e8ebec;border-right: 1px solid #e8ebec;}
    .usercare_con_header{width: 250px;height: 200px;overflow: hidden;vertical-align: middle;}
    .usercare_con_header img{width: 100%;vertical-align: bottom;line-height: 200px;}
    .usercare_con_tab{width: 47px;height: 20px;opacity: 0.4;background-color:#000;color: #fff;position: absolute;top: 10px;left: 10px;text-align: center;font-size: 12px;line-height: 20px;}
    .usercare_con_h33{height: 33px;line-height: 33px;word-break: keep-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 16px;padding: 0 10px;color: #1f2d3d;}
    .usercare_con_fs12{font-size: 12px;font-weight: 400;color: #475669;}
    .usercare_con_biaoji{width: 50px;height: 20px;border-radius: 3px;background-color: #fce4ec;display: inline-block;line-height: 20px;text-align: center;margin-right: 10px;color: #f96197;}
    .care_display_in{display: inline-block;}
    .margin_left_30{margin-left: 30px;}
    .font_size_14{font-size: 14px;font-weight: 600;}
    .usercare_con_none{height: 50px;line-height: 50px;text-align: center;background: #fff;margin: 0 10px;}
</style>