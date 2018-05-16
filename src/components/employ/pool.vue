<template>
    <div id="pool">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="录取库" name="0"></el-tab-pane>
        </el-tabs>
        <!--<el-button type="primary" class="pool_fasongoffer" @click="goofer">发送offer</el-button>-->
        <router-view keep-alive></router-view>
    </div>
</template>

<script>
    export default {
        name:'pool',
        data(){
            return{
                activeName:0,
            }
        },
        mounted(){

        },
        methods:{
            handleClick(index,event){
                // console.log(index,event);
                var self = this;
                switch (index.name) {
                    case "0":
                        self.$router.push('/manage/pool/talentpool');
                        break;
                
                    default:
                        break;
                }
            },
            goofer(){
                this.$router.push('/manage/gooffer');
            }
        },
    }
</script>

<style scoped>
    .pool{position: relative;}
    .pool_fasongoffer{position: absolute;top: 70px;right:50px;}
</style>