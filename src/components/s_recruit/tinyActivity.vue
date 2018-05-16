<template>
  <div class="tinyActivity">
    <!-- <canvas width="240" height="540" id="mycanvas"></canvas>
    <img src="./../../images/phone.png" alt="" id="img"> -->
    <el-button type="primary" @click="goaddActivity">创建微活动</el-button>
    <dl class="activity_list" v-for="activity in recruitActivities" :key="activity.id">
      <dt>
        <!-- <img :src="activity.thumbUrl"> -->
        <img :src="activity.thumbUrl">
      </dt>
      <dd>
        <div v-if="activity.activityType==2">
          <span class="tag_title">海报</span>
          <span class="poster_title">{{activity.theme}}</span>
        </div>
        <div v-if="activity.activityType==1">
          <span class="tag_title">场景H5</span>
          <span class="poster_title">{{activity.theme}}</span>
        </div>
        <div class="poster_btn">
          <el-button type="text" @click="edit(activity.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe6ce;</i>编辑</el-button>
          <el-button type="text" @click="previewPic(activity.qrcodeUrl)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe62e;</i>预览</el-button>
          <el-button type="text" @click="delWeActivity(activity.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe749;</i>删除</el-button>
          <el-button type="text" @click="weDownload(activity)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe685;</i>下载</el-button>
          <el-button type="text" @click="copyLink(activity.activityLink)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe696;</i>复制链接</el-button>
        </div>
      </dd>
    </dl>

    <el-dialog
      title="扫一扫预览"
      :visible.sync="dialogVisible"
      style="text-align:center;"
      size="tiny">
      <img :src="qrcodeUrl" alt="">
    </el-dialog>

    <el-input type="text" v-model="activitylink" id="activitylink"></el-input>

  </div>
</template>
<script>
export default {
  name:'tinyActivity',
  data(){
    return{
      imageUrl:'./../../images/phone.png',
      recruitActivities:[],
      qrcodeUrl:null,
      dialogVisible:false,
      activitylink:null
    }
  },
  mounted(){
    this.index();
    this.getWeActivities();
  },
  methods:{
    index(){
      // var cas= document.getElementById("mycanvas");
      // var ctx=cas.getContext('2d');
      // console.log(ctx);
      // var img = document.getElementById("img");
      // ctx.drawImage(img,0,0,240,540);
      // ctx.drawImage(img,140,0,100,100);
      // ctx.drawImage(img,50,100,100,100);
      // ctx.font="20px sans-serif";
      // ctx.fillText("13511111111",100,500);
      // var canvas = document.getElementById("mycanvas");
      // console.log(canvas.toDataURL());
    },
    goaddActivity(){
      this.$router.push({name:'addActivity'});
    },
    getWeActivities(){
      var self=this;
      var method="weRecruitActivity/getWeActivities",
          param=JSON.stringify({}),
          successd=function(res){
            console.log(res);
            self.recruitActivities=res.data.data.recruitActivities;
          };
      self.$http(method,param,successd);
    },

    delWeActivity(id){
      var self=this;
      var method="weRecruitActivity/delWeActivity",
          param=JSON.stringify({
            weActivityId:id
          }),
          successd=function(res){
            self.getWeActivities();
          };
      self.$confirm('此操作将永久删除该活动, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function(){
        self.$http(method,param,successd);
      })
    },

    //下载
    weDownload(activity){
      var method="weRecruitActivity/downloadWeActivity",
          param=JSON.stringify({
            activityType:activity.activityType,
            posterUrl:activity.posterUrl,
            qrcodeUrl:activity.qrcodeUrl
          });
      this.$weDownload(method,param);
    },

    //编辑
    edit(id){
      this.$router.push({name:'addActivity',query:{id:id}});
    },

    //复制链接
    copyLink(url){
      var activitylink=document.querySelector('#activitylink');
      activitylink.value=url;
      activitylink.select();
      console.log(activitylink.value)
      document.execCommand('Copy');
      this.$message({
        message:'复制成功',
        type:'success'
      })
    },

    previewPic(url){
      this.qrcodeUrl=url;
      this.dialogVisible=true;
    }
  }
}
</script>

<style scoped>
.activity_list{background-color: #fff;box-shadow: 0px 1px 5px 1px #eee;margin-top:20px;}
.activity_list dt{height: 130px;width: 120px;text-align: center;padding-top:20px;float: left;}
.activity_list dt img{width: 80px;height: 100px;display: block;margin:0px auto 0;background-color: #ddd;}
.activity_list dd{margin-left:135px;padding-top:20px;position: relative;height: 120px;}
.activity_list dd .tag_title{width:48px;height: 24px;color: #fff;background-color: #9DAAF3;border-radius: 4px;display: block;line-height: 24px;text-align: center;}
.poster_title{margin-top: 20px;display: block;}
.poster_btn{position: absolute;top:10px;width: 400px;right: 20px;text-align: right;}
#activitylink{opacity: 0;}
</style>
<style>
.poster_btn .el-button+.el-button{margin-left:16px;}
</style>
