<template>
  <div class="tinyActivity">
    <el-button type="primary" @click="goaddActivity">创建微官网</el-button>
    <dl class="activity_list" v-for="item in allWebsite" :key="item.id">
      <dt>
        <img :src="item.weBannerUrl">
      </dt>
      <dd>
        <div>
          <span class="tag_title">{{ item.companyWebName }}</span>
          <span class="poster_title">创建时间:{{item.createTime}}</span>
        </div>
        <div class="poster_btn">
          <el-button type="text" @click="copyLink(item.webQrcodeLink)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe696;</i>复制链接</el-button>
          <el-button type="text" @click="previewPic(item.webQrcodeName)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe62e;</i>预览</el-button>
          <el-button type="text" @click="delWebsite(item.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe749;</i>删除</el-button>
          <el-button type="text" @click="edit(item.id)"><i class="iconfont" style="font-size:14px;margin-right:6px;">&#xe6ce;</i>编辑</el-button>
        </div>
      </dd>
    </dl>

    <el-dialog
      title="扫一扫预览"
      v-model="dialogVisible"
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
      allWebsite: [],
      qrcodeUrl: '',
      activitylink: '',
      dialogVisible: false
    }
  },
  mounted(){
    this.getAllWebsites();
  },
  created(){
    this.getAllWebsites();
  },
  methods:{
    goaddActivity(){
      this.$router.push({path:'/ATS/MicroWebsite',query:{id:0}});
    },
    getAllWebsites(){
      var self=this;
      var method="spServerVersion/getCompanyWebSiteList",
          param=JSON.stringify({}),
          successd=function(res){
            console.log(res);
            self.allWebsite=res.data.data;
          };
      self.$http(method,param,successd);
    },
    delWebsite(id){
      var self=this;
      var method="companyWeb/deleteCompanyWeb",
          param=JSON.stringify({
            id:id
          }),
          successd=function(res){
            self.getAllWebsites();
          };
      self.$confirm('此操作将永久删除该官网, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function(){
        self.$http(method,param,successd);
      })
    },
    //编辑
    edit(id){
      this.$router.push({path:'/ATS/MicroWebsite',query:{id:id}});
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
.activity_list dt img{width: 80px;height: 100px;display: inline-block;margin:0px auto 0;background-color: #ddd;}
.activity_list dd{margin-left:135px;padding-top:20px;position: relative;height: 120px;}
.activity_list dd .tag_title{font-size:22px;width:auto;height: 50px; display: inline-block; color: #333333;border-radius: 4px;line-height: 50px;text-align: center;}
.poster_title{margin-top: 10px;display: block;}
.poster_btn{position: absolute;top:10px;width: 400px;right: 20px;text-align: right;}
#activitylink{opacity: 0;}
</style>
<style>
.poster_btn .el-button+.el-button{margin-left:16px;}
</style>
