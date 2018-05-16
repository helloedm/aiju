<template>
  <div id="recommend_list">
    <div class="btn">
      <el-button type="primary" icon="plus" v-if="recomType==2" @click="add(2)">创建捕手</el-button>
      <el-button type="primary" icon="plus" v-if="recomType==1" @click="add(1)">创建内推</el-button>
    </div>
    <ul class="list">
      <li v-for="activity in activityList" :key="activity.id">
        <img :src="activity.picUrl" alt="">
        <div class="item_con">
          <h2>{{activity.name}}</h2>
          <dl class="item_con_right">
            <dt>
              <el-button type="text" @click="activityCount(activity.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe6d7;</i>活动统计</el-button>
              <el-button type="text" @click="edit(activity.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe6ce;</i>编辑</el-button>
              <el-button type="text" @click="previewPic(activity.qrcodeUrl)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe62e;</i>预览</el-button>
              <el-button type="text" @click="deleActivity(activity.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe749;</i>删除</el-button>
              <el-button type="text" @click="weDownload(activity.qrcodeUrl)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe685;</i>下载</el-button>
              <el-button type="text" @click="copyLink(activity.visitUrl)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe696;</i>复制链接</el-button>
            </dt>
            <dd>创建时间: {{activity.createTime}}</dd>
            <dd class="close_activity">关闭活动后,活动将结束<el-switch  v-model="activity.isCloseValue"  on-text=""  off-text="" on-color="#13ce66"  off-color="#DCDFE6" class="chose_icon" @change="closeOpenActivity(activity)"></el-switch></dd>
          </dl>
        </div>
      </li>
    </ul>

    <el-dialog
      title="扫一扫预览"
      :visible.sync="dialogVisible"
      style="text-align:center;"
      size="tiny">
      <img :src="qrcodeUrl" alt="">
    </el-dialog>

    <!-- 复制链接input -->
    <el-input type="text" v-model="activitylink" id="activitylink"></el-input>

  </div>
</template>
<script>
export default {
  name:'recommendList',
  data(){
    return{
      value1:true,
      recomType:this.$route.query.recomType || 1,
      activityList:[],
      qrcodeUrl:'',
      dialogVisible:false,
      activitylink:null
    }
  },
  mounted(){
    this.getActivityList();
  },
  methods:{
    getActivityList(){
      var self=this;
      var method="positionRecommend/getActivityList",
          param=JSON.stringify({recomType:self.recomType}),
          successd=function(res){
            res.data.data.forEach(function(item) {
              item.isCloseValue=item.isClose==0;
            });
            self.activityList=res.data.data;
          };
      self.$http(method,param,successd);
    },
    closeOpenActivity(item){
      var self=this;
      var method="positionRecommend/closeOpenActivity",
          param=JSON.stringify({activityId:item.id,isClose:item.isCloseValue?'0':'1'}),
          successd=function(res){};
      self.$http(method,param,successd);
    },
    deleActivity(id){
      var self=this;
      var method="positionRecommend/deleteActivity",
          param=JSON.stringify({
            activityId:id
          }),
          successd=function(res){
            self.getActivityList();
          };
      self.$confirm('确定要删除此条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        //确定
        self.$http(method,param,successd);
      }).catch(()=>{
        //取消
      })
    },
    previewPic(url){
      this.qrcodeUrl=url;
      this.dialogVisible=true;
    },
    //复制链接
    copyLink(url){
      var activitylink=document.querySelector('#activitylink input');
      activitylink.value=url;
      activitylink.select();
      console.log(activitylink.value)
      document.execCommand('Copy');
      this.$message({
        message:'复制成功',
        type:'success'
      })
    },
    edit(id){
      this.$router.push({name:'recommendSet',query:{recomType:this.recomType,id:id}});
    },
    add(recomType){
      this.$router.push({name:'recommendSet',query:{recomType:recomType,id:0}});
    },
    activityCount(id){
      this.$router.push({name:'activityCount',query:{recomType:this.recomType,id:id}});
    },
    weDownload(url){
      this.$newDownload(url);
    }
  }
}
</script>
<style scoped>
.list li{border-bottom: 1px solid #ddd;background-color: #fff;box-shadow: 0 0 2px 0px #ddd;margin-top:20px;padding:15px 20px;}
.list li img{display:inline-block;width: 80px;height: 80px;float: left;}
.item_con{margin-left:100px;}
.item_con h2{height: 50px;font-size: 16px;color: #1F2D3D;}
.item_con_right{position: relative;height: 35px;line-height: 35px;}
.item_con_right dt{width: 430px;position:absolute;right: 10px;top:0px;}
.item_con_right dd{display: inline-block;color:#475669;}
.item_con_right .close_activity{margin-left: 27px;}
.chose_icon{margin-left:10px;}
#activitylink{opacity: 0;}
</style>
