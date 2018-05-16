<template>
  <div class="recommendPost">
    <el-tabs v-model="activeName">
      <el-tab-pane label="职位推广" name="1"></el-tab-pane>
    </el-tabs>
    <ul class="clearfix">
      <li class="interpolate" @click="interpolate">
        <div class="interpolate_div">
          <img src="../../images/recruit/interpolate_icon.png" alt="" class="interpolate_icon">
          <span class="interpolate_title">企业内推</span>
        </div>
        <div class="interpolate_div">
          <img src="../../images/recruit/interpolate_con.png" alt="">
        </div>
        <p class="interpolate_div">调动企业内部资源，让企业内部的每一个员工都参与到人才的发掘寻找当中，推荐奖励实时发放。同时追踪和记录人才推荐路径，将内推完美执行</p>
      </li>
      <li class="interpolate" @click="catcher">
        <div class="interpolate_div">
          <img src="../../images/recruit/catcher_icon.png" alt="" class="interpolate_icon">
          <span class="interpolate_title">人才捕手</span>
        </div>
        <div class="interpolate_div">
          <img src="../../images/recruit/catcher_con.png" alt="">
        </div>
        <p class="interpolate_div">设置悬赏职位，所有人都能推荐候选人。实现全民猎头，无限拓展招聘空间，为企业网罗最优秀的人才。</p>
      </li>
    </ul>
    <div></div>
  </div>
</template>
<script>
export default {
  name:'recommendPost',
  data(){
    return{
      activeName:'1',
    }
  },
  mounted(){

  },
  methods:{
    catcher(){
      this.$router.push({name:'recommendList',query:{recomType:2}});
    },
    interpolate(){
      this.$router.push({name:'recommendList',query:{recomType:1}})
    }
  }
}
</script>
<style scoped>
.interpolate{width: 240px;padding: 20px;background-color: #fff;float: left;margin-left: 80px;height: 240px;cursor: pointer;}
.interpolate:first-child{margin-left: 0;}
.interpolate_icon{width: 50px;height:50px;vertical-align: top;}
.interpolate_title{line-height: 50px;vertical-align:top;margin-left: 10px;font-size: 16px;font-weight: 600;}
.interpolate>div{margin-bottom: 10px;}
.interpolate>p{color:#475669;}
</style>
