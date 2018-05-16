<template>
  <div id="internalRecommend">
    <el-breadcrumb separator=">" style="margin:0 0 20px 20px;">
      <el-breadcrumb-item :to="{ name: 'recommendPost' }">职位推广</el-breadcrumb-item>
      <el-breadcrumb-item>企业内推</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="right">
        <h2>案例预览</h2>
        <div class="phone">
          <div class="phone_header clearfix">
            <!-- <img src="../../images/phone_header.png" alt="" width='100%'> -->
            <p>企业内推</p>
          </div>
          <div class="phone_show">
            <img :src="imageUrlShow" alt="" width="100%" height="150px">
            <dl class="phone_list" v-for="list in phoneList" :key="list.positionId">
              <dt>
                <span class="color_f96868" v-if="list.isUrgent==1">[急招]</span>
                <span>{{list.positionName}}</span>
                <span class="f_r" style="font-weight:400;font-size:12px;" v-if="list.rewardAmount" title="悬赏金额">
                  <i class="iconfont" style="font-size:13px;color:#F2A654;">&#xe624;</i>
                  {{list.rewardAmount}}
                </span>
              </dt>
              <dd class="phone_list1">
                <span class="">{{list.workCitySpilt}}/{{list.positionType==1?'全职':list.positionType==2?'兼职':'实习'}}</span>
                <span class="">{{list.positionSalaryLowest}}K-{{list.positionSalaryHighest}}K</span>
                <span class="f_r " style="margin:0;color:#46BE8A;">0人看过</span>
              </dd>
              <dd class="phone_list2">发布时间:{{list.posiPublishTime}}</dd>
            </dl>
          </div>
        </div>
        <p style="text-align:center;">
          <el-button @click="dialogVisible2=true;">预览</el-button>
          <el-button type="primary" @click="copyLink">复制链接</el-button>
        </p>
      </div>
      <div class="left">
        <h2>上传活动图片<em> 建议上传图片尺寸750px*350px 最大2M,支持jpg/gif/png格式 </em></h2>
        <!-- <el-upload
          class="avatar-uploader"
          :class="{'border_color_fff':imageUrl}"
          :action="util.uploadURLForCommon"
          :data="params"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <div class="avatar-uploader" @click="showImgUpload=!showImgUpload" :class="{'border_color_fff':imageUrl}">
          <div class="el-upload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
        <dl class="position">
          <dt>添加职位</dt>
          <dd>
            <el-tag type="primary" class="recommend_tag" v-for="choose in positionList" :key="choose.name">{{choose.name}}
              <!-- <i class="iconfont tag_icon">&#xe692;</i> -->
              </el-tag>
            <el-button type="warning" size="mini" @click="dialogVisible=true" style="margin-top:20px;"> 添加 </el-button>
          </dd>
        </dl>
      </div>
      <!-- <div class="show">
        <img src="https://aijuhr.com/upload/qrcode/185343f1e3c7a1dcf14042a95e4f011f757f0d.png" alt="">
        <p>微信扫码预览</p>
        <input type="hidden" value="">
        <el-button type="primary">复制链接</el-button>
      </div> -->
      <el-button type="primary" style="position:absolute;bottom:55px;margin-left:20px;" @click="createRecommend">保存</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-transfer
        v-model="value3"
        filterable
        :titles="['未选择', '已选择']"
        :data="data">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="choose">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="微信扫一扫预览"
      :visible.sync="dialogVisible2"
      style="text-align:center;"
      size="tiny">
      <img :src="qrcodeUrl" alt="">
    </el-dialog>

    <el-input type="text" v-model="visitUrl" id="activitylink"></el-input>
    <img-upload :height="420" v-model="showImgUpload" @remove="remove" :width="750" @back="backUrl"></img-upload>
  </div>
</template>
<script>
import util from 'script/util.js';
import md5 from 'js-md5';
import imgUpload from '../imgUpload';
export default {
  name:'recommend',
  data(){
    return{
      id:null,
      activeName:'1',
      imageUrl:'',
      imageUrlShow:"https://aijuhr.com/images/yidong/moren.png",
      value3:[],
      data:[],
      dialogVisible:false,
      //附件
      util:util,
      params:{
        param:JSON.stringify({businessId:19,fId:-1}),
        sign:md5('method'+"fileUpload/insertFileRecord"+"param"+JSON.stringify({businessId:19,fId:-1})+"ecbao")
      },

      positionList:[],
      pageSize:100,
      pageNum:1,
      phoneList:[{categoryId:3,
        categoryName:"设计类",
        classifyName:null,
        isUrgent:1,
        posiPublishTime:"2017.11.24",
        positionId:56,
        positionName:"Ui设计师",
        positionSalaryHighest:"10",
        positionSalaryLowest:"7",
        positionType:1,
        rewardAmount:"10.00",
        views:4,
        workCity:"山西,晋城市",
        workCitySpilt:"晋城市"
        }],
      visitUrl:'',
      qrcodeUrl:'',
      dialogVisible2:false,
      showImgUpload:false,
    }
  },
  mounted(){
    this.getRecommendPosiList();
    this.getPositionRecommend();
  },
  methods:{
    handleClick(){

    },
    handleAvatarSuccess(response,file,fileList){
      var self = this;
      if (response.code == 0) {
        self.imageUrl=response.data.fileInfoList[0].url;
      } else {
        self.$message.error(response.message);
      }
    },
    beforeAvatarUpload(){},
    getPosistionList(){
      var self=this;
      var method="positionRecommend/getPosistionList",
          param=JSON.stringify({recomType:'1'}),
          successd=function(res){
            let arr=[];
            res.data.data.forEach(function(item){
              item.key=item.id;
              item.label=item.name;
              self.value3.forEach(function(item2){
                if(item.id == item2){
                  arr.push(item2);
                }
              })
            })
            self.value3=arr;
            self.data=res.data.data;
          };
      self.$http(method,param,successd);
    },
    choose(){
      var self=this;
      self.positionList=[];
      self.data.forEach(function(item1){
        self.value3.forEach(function(item2){
          if(item2==item1.key){
            self.positionList.push({name:item1.name});
          }
        })
      });
      self.dialogVisible=false;
    },

    createRecommend(){
      var self=this;
        var method="positionRecommend/createOrUpdateRecommend",
        param=JSON.stringify({
          recomType:'1',
          picUrl:self.imageUrl,
          positionIds:self.value3.length==0?'':self.value3.join()
        }),
        successd=function(res){
          self.$message({
            type:'success',
            message:'保存成功'
          })
          self.qrcodeUrl=res.data.data.qrcodeUrl;
          self.getRecommendPosiList();
      }

      self.$http(method,param,successd);
    },

    getPositionRecommend(){
      var self=this;
      self.value3=[];
      var method="positionRecommend/getPositionRecommend",
          param=JSON.stringify({recomType:1}),
          successd=function(res){
            if(res.data.data.id){
              self.id=res.data.data.id;
              self.positionList=res.data.data.positionList;
              self.visitUrl=res.data.data.visitUrl;
              self.qrcodeUrl=res.data.data.qrcodeUrl;
              self.positionList.forEach(function(item){
                self.value3.push(item.id);
              })
            }
              self.getPosistionList();
          };
      self.$http(method,param,successd);
    },

    getRecommendPosiList(){
      var self=this;
      var method="positionRecommend/getRecommendPosiList",
          param=JSON.stringify({
            pageSize:self.pageSize,
            pageNum:self.pageNum,
            type:'2',
            companyId:localStorage.companyId,
            recomType:'1'
          }),
          successd=function(res){
            if(res.data.data.positionList.length>0){
              self.phoneList=res.data.data.positionList;
            }
            if(res.data.data.picUrl){
              self.imageUrl=res.data.data.picUrl;
              self.imageUrlShow=res.data.data.picUrl;
            }
          };
      self.$http(method,param,successd);
    },

    //复制链接
    copyLink(){
      var activitylink=document.querySelector('#activitylink input');
      activitylink.value=this.visitUrl;
      activitylink.select();
      document.execCommand('Copy');
      this.$message({
        message:'复制成功',
        type:'success'
      })
    },
    showImgUploadclick(){
      this.showImgUpload=!this.showImgUpload;
      console.log(this.showImgUpload);
    },
    remove(model){
      this.showImgUpload=model;
    },
    backUrl(url){
      this.imageUrl=url;
    }
  },
  components:{
    imgUpload
  }
}
</script>
<style scoped>
.left{margin-right: 360px;background-color: #fff;padding: 20px;height: 645px;border-right: 1px solid #ddd;}
.left h2{font-weight: 400;font-size: 14px;margin-bottom:20px;}
.left h2 em{font-size: 12px;margin-left: 20px;color: #99A9BF;}
.right{width: 320px;float: right;background-color: #fff;padding:20px;min-height: 600px;}
.phone{width:320px;height: 540px;margin:10px auto 0;padding-top: 40px;position:relative;background: url(https://aijuhr.com/images/yidong/titlebar.png) no-repeat 0px 0px;}
.phone_header{width: 200px;height: 35px;position:absolute;top:85px;left:50px;}
.phone_header p{position:absolute;top:-55px;color: #fff;left: 78px;font-size: 14px;}
.phone_show{width:319px;height: 500px;margin:20px 0 0 0px;overflow-y: auto;background-color: #F1F7FF;overflow-x: hidden;border: 1px solid #ddd;border-top: none;}
.phone_show::-webkit-scrollbar{width: 3px;background-color: #F5F5F5;height: 3px;}
.phone_show::-webkit-scrollbar-track  {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);border-radius: 10px;background-color: #F5F5F5;  } 
.phone_show::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);  background-color: #ddd;  }  
.phone_list{height:70px;border-bottom: 1px solid #E5E5E5;background-color: #fff;padding: 10px 12px;}
.phone_list dt{font-size: 14px;font-weight: 600;margin-top: 0px;line-height: 16px;}
.phone_list1{font-size: 12px;margin-top: 8px;}
.phone_list2{font-size: 12px;color: #999;margin-top: 8px;}
.position dt{margin-bottom:20px;margin-top:40px;}
.recommend_tag{position: relative;margin-right: 10px;}
.recommend_tag .tag_icon{position: absolute;top:-10px;right: -10px;font-size: 16px;color: #999;cursor: pointer;}
.show{width: 138px;height: 222px;background-color: #eee;padding-top:1px;text-align: center;position: fixed;top:80px;right: 0;}
.show img{width:105px;height:105px;margin: 20px auto 0;display: block;}
.show p{text-align: center;margin-bottom: 20px;}
#activitylink{opacity: 0;}
.content{max-width: 1086px;margin:0 auto;}
</style>
<style>
  #internalRecommend .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #internalRecommend .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  #internalRecommend .border_color_fff .el-upload:hover {
    border-color:#fff;
  }
  #internalRecommend .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 470px;
    height: 250px;
    line-height: 250px;
    text-align: center;
  }
  #internalRecommend .avatar {
    width: 470px;
    height: 250px;
    display: block;
  }
  #internalRecommend .el-dialog.el-dialog--tiny{width:500px;}
  #internalRecommend .border_color_fff .el-upload{border-color:#fff;}
</style>
