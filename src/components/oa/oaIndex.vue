<template>
    <div id='oa'>
        <div class="oa_left">
            <!--<el-row class="oa_left_nav" :gutter="20">
                <el-col :span="6"><router-link class="oa_left_nav_li hrm_module" to="/oa/report" active-class="active">工作汇报</router-link></el-col>
                <el-col :span="6"><router-link class="oa_left_nav_li hrm_module" to="/oa/approval" active-class="active">审批</router-link></el-col>
                <el-col :span="6"><router-link class="oa_left_nav_li hrm_module" to="/oa/assignment" active-class="active">任务</router-link></el-col>
                <el-col :span="6"><router-link class="oa_left_nav_li hrm_module" to="/oa/notice" active-class="active">公告</router-link></el-col>
            </el-row>-->
            <div class="oa_left_con">
                <router-view keep-alive></router-view>
            </div>
        </div>
        <div class="oa_right">
            <div class="oa_right_header"><span></span></div>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'oa',
    data() {
        return{
            activeNav: 4,
        }
    }
}
</script>

<style scoped>
.oa_left{
}
.oa_left_nav_li{
    display: inline-block;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #666;
    text-decoration: none;
    border: 1px solid #eee;
    margin: 0;
}
.oa_left_nav_li.active{
    border-color: #2C3E50
}
</style>