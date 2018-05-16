<template>
  <div class="add_activity" id="add_activity">
    <el-breadcrumb separator=">" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ name: 'tinyActivity' }">微活动</el-breadcrumb-item>
      <el-breadcrumb-item>创建微活动</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-show="form.type == 1">
      <div class="activity_con">
        <!-- <ul class="list_img_show">
          <li @click="addcanvasImg($event)">
            <img :src="imageUrl" alt="">
          </li>
        </ul> -->
        <div class="activity_con_right clearfix">
           <el-steps direction="vertical" :space="100">
              <a href="javascript:void(0)" @click="goAnchor('.index',0)" :class="{'step-a-active':active==0}">
                <el-step title="首页"></el-step>
              </a>
              <a href="javascript:void(0)" @click="goAnchor('.second',1)" :class="{'step-a-active':active==1}">
                <el-step title="公司介绍"></el-step>
              </a>
              <a href="javascript:void(0)" @click="goAnchor('.thirdly',2)" :class="{'step-a-active':active==2}">
                <el-step title="在招职位"></el-step>
              </a>
              <a href="javascript:void(0)" @click="goAnchor('.fourthly',3)" :class="{'step-a-active':active==3}">
                <el-step title="联系方式"></el-step>
              </a>
            </el-steps>
          <div class="canvas_box">
              <!-- <img :src="showImg" alt="" class="h5_show_img1"> -->
              <!-- <img :src="logoUrl" alt="" class="h5_show_img2">
              <img :src="recruitingPositionsQrcodeUrl" alt="" class="h5_show_img3">
              <p class="h5_show_phone">{{form.phone}}</p> -->
              <ul class="h5_show_img1">
                <li v-show="active== 0">
                  <div class="theme">{{ h5.theme }}</div>
                </li>
                <li v-show="active== 1">
                  <div class="companyDescription contentBodyY">
                    <div v-html="h5.companyDescription"></div>
                    <img :src="h5.companyImageUrl" alt="公司图片">
                  </div>
                </li>
                <li v-show="active== 2">
                  <ul class="positionList contentBodyY">
                    <li v-if="value3.indexOf(item.id) != -1" v-for="item in data" :key="item.id">
                        <div class="positionName">{{item.label}}</div>
                        <div class="positionIntroduce">{{ item.workCity  | workCityFilter }} / {{ item.positionType | positionTypeFilter}} / {{item.positionSalaryLowest }}k - {{item.positionSalaryHighest}}k</div>
                        <img  class="details" src="../../images/recruit/details.png" alt="详情">
                    </li>
                  </ul>
                </li>
                <li v-show="active== 3">
                  <div class="companyDetail">
                    <p>等你加我啊!</p>
                    <p>下面是我的联系方式</p>
                    <ul>
                        <li>
                            <img src="../../images/recruit/2.png" alt="">
                            <p>{{ h5.companyAddress }}</p>
                        </li>
                        <li>
                            <img src="../../images/recruit/3.png" alt="">
                            <p>{{ h5.activityPhone }}</p>
                        </li>
                        <li>
                            <img src="../../images/recruit/4.png" alt="">
                            <p> {{ h5.activityEmail }}</p>
                        </li>
                    </ul>
                  </div>
                </li>
              </ul>
          </div>
          <div id="h5Right" class="canvas_box_right h5_content">
            <el-form label-width="90px" style="width:100%" :model="form">
              <el-form-item label="活动类型">
                <el-radio class="radio" v-model="form.type" label="1">场景</el-radio>
                <el-radio class="radio" v-model="form.type" label="2">海报</el-radio>
              </el-form-item>
            </el-form>
            <el-form label-width="90px" style="width:100%" ref="ruleForm" :model="h5" :rules="rules">
              <ul>
                <li class="index">
                  <div class="headline">首页</div>
                  <el-form-item label="活动主题" prop="theme">
                    <el-input v-model="h5.theme"></el-input>
                  </el-form-item>
                  <el-form-item label="分享描述" prop="titleDescription">
                    <el-input v-model="h5.titleDescription"></el-input>
                  </el-form-item>
                  <el-form-item label="页面标题" prop="pageTitle">
                    <el-input v-model="h5.pageTitle"></el-input>
                  </el-form-item>
                </li>
                <li class="second">
                  <div class="headline">公司介绍</div>
                   <el-form-item label="公司简介" prop="companyDescription" style="height: auto; max-height: 350px;">
                      <el-input type="textarea" v-model="h5.companyDescription"></el-input>
                        <!-- <quill-editor
                        class="quilleditor"
                        :options="editorOption"
                        v-model="h5.companyDescription"
                        ref="myTextEditor">
                        </quill-editor> -->
                    </el-form-item>
                    <el-form-item prop="companyImageUrl" label="公司图片" class="addactivity_upload">
                      <el-input style="display: none;" type="textarea" v-model="h5.companyImageUrl"></el-input>
                      <p style="color:#99A9BF;">2M,支持bmp/png/jpeg/jpg/gif格式</p>
                      <el-upload
                        class="avatar-uploader"
                        :action="util.uploadURLForCommon"
                        :data="companyParams"
                        :show-file-list="false"
                        :on-success="companyHandleAvatarSuccess">
                        <img v-if="h5.companyImageUrl" :src="h5.companyImageUrl" id="companyImg">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                </li>
                <li class="thirdly">
                  <div class="headline">添加职位</div>
                    <el-form-item style="height:auto;">
                      <el-tag type="primary" class="recommend_tag" v-for="choose in positionList" :key="choose.positionName">{{choose.positionName}}</el-tag>
                      <el-button type="warning" size="small" @click="dialogVisible=true" style="marrgin-top:20px;"> 编辑 </el-button>
                    </el-form-item>
                </li>
                <li class="fourthly">
                  <div class="headline">联系我们</div>
                  <el-form-item label="公司地址" prop="companyAddress">
                    <el-input v-model="h5.companyAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="activityPhone"
                   :rules="filter_rules({required:true,type:'mobile'})">
                    <el-input v-model="h5.activityPhone"></el-input>
                  </el-form-item>
                   <el-form-item label="联系邮箱" prop="activityEmail">
                    <el-input v-model="h5.activityEmail"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="createWeActivity">保存</el-button>
                  </el-form-item>
                </li>
              </ul>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div v-show="form.type == 2">
      <div class="activity_con">
        <!-- <ul class="list_img_show" style="height: 520px;">
          <li @click="addcanvasImg($event)">
            <img :src="imageUrl" alt="">
          </li>
        </ul> -->
        <div class="activity_con_right clearfix">
          <div class="canvas_box">
            <div class="h5_show" style="margin-top:28px;">
              <img :src="showImg" alt="" class="h5_show_img1">
              <!-- <img :src="logoUrl" alt="" class="h5_show_img2">
              <img :src="recruitingPositionsQrcodeUrl" alt="" class="h5_show_img3">
              <p class="h5_show_phone">{{form.phone}}</p> -->
            </div>
          </div>
          <div class="canvas_box_right">
            <el-form label-width="90px" :model="form">
              <el-form-item label="活动类型">
                <el-radio class="radio" v-model="form.type" label="1">场景</el-radio>
                <el-radio class="radio" v-model="form.type" label="2">海报</el-radio>
              </el-form-item>
              <div class="borderWrap">
              <div class="headline">首页</div>
                <el-form-item label="海报名称">
                  <el-input v-model="form.name" :maxlength="13"></el-input>
                </el-form-item>
                <el-form-item label="企业logo" class="addactivity_upload">
                  <p style="color:#99A9BF;">jpeg/jpg/png格式,建议尺寸200像素*100像素</p>
                  <el-upload
                    class="avatar-uploader"
                    :action="util.uploadURLForCommon"
                    :data="params"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="logoUrl" :src="logoUrl" id="logo_img">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </div>
              <div class="headline">添加职位</div>
              <el-form-item style="height:auto;">
                <el-tag type="primary" class="recommend_tag" v-for="choose in positionList" :key="choose.positionName">{{choose.positionName}}</el-tag>
                <el-button type="warning" size="small" @click="dialogVisible=true" style="marrgin-top:20px;"> 编辑 </el-button>
              </el-form-item>
              <el-form-item style="padding-bottom: 20px;">
                <el-button type="primary" style="margin: 30px 0 30px" @click="createWeActivity()">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
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

  </div>
</template>
<script>
import util from 'script/util.js';
import md5 from 'js-md5';
// import SearchList from './h5.vue'
export default {
  name:'addActivity',
  data(){
    return {
      id:this.$route.query.id,
      imageUrl:'https://aijuhr.com/images/yidong/haibao_03.png',
      form:{
        name:'',
        type:'1',
        phone:'',
        logoId:null,
      },
      util:util,
      params:{
        param:JSON.stringify({businessId:19,fId:-1}),
        sign:md5('method'+"fileUpload/insertFileRecord"+"param"+JSON.stringify({businessId:19,fId:-1})+"ecbao")
      },
      companyParams:{
        param:JSON.stringify({businessId:20,fId:-1}),
        sign:md5('method'+"fileUpload/insertFileRecord"+"param"+JSON.stringify({businessId:20,fId:-1})+"ecbao")
      },
      logoUrl:'',
      showImg:'https://aijuhr.com/images/yidong/haibao_04.png',
      qrcodeUrl:'',
      value3:[],
      data:[],
      dialogVisible:false,
      positionList:[],
      recruitingPositionsQrcodeUrl:'',
      weActivityList:[],
      active: 0,
      h5: {
        theme: '',
        pageTitle: '',
        titleDescription: '',
        companyAddress: '',
        activityEmail: '',
        companyDescription: '',
        companyImageUrl: '',
        companyImageId: '',
        activityPhone: ''
      },
      rules:{
        theme: [
            { required: true, message: '请输入活动主题', trigger: 'blur' },
            { min: 1, max: 50, message: '长度为 1 到 50 个字符', trigger: 'blur' }
          ],
          pageTitle:[
            { required: true, message: '请输入页面标题', trigger: 'blur' },
            { min: 1, max: 12, message: '长度为 1 到 12 个字符', trigger: 'blur' }
          ],
          titleDescription: [
            { required: true, message: '请输入分享描述', trigger: 'change,blur' },
             { min: 1, max: 50, message: '长度为 1 到 50 个字符', trigger: 'blur' }
          ],
          companyDescription: [
            { required: true, message: '请输入公司简介', trigger: 'blur' }
          ],
          companyImageUrl: [
            { required: true, message: '请选择公司图片', trigger: 'change,blur' }
          ],
          companyAddress: [
            { required: true, message: '请输入公司地址', trigger: 'change,blur' }
          ],
          activityPhone: [
            { required: true, message: '请输入联系电话', trigger: 'change,blur' },
          ],
          activityEmail: [
            { required: true, message: '请输入联系邮箱', trigger: 'blur, change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
      },
      editorOption: {
        theme: "bubble",
        placeholder: "请输入公司简介，支持html",
        modules: {
          toolbar: []
        }
      }
    }
  },
  mounted(){
    this.getPosistionList();
    console.log(this.id);
    if(this.id){
      this.getWeActivityInfo();
    }else{
      this.getWeActivityDefaultInfo();
    }
  },
  methods:{
      goAnchor(selector, index) {
      this.active = index
      let anchor = this.$el.querySelectorAll(selector)
      console.log(anchor[0].offsetTop)
      document.getElementById('h5Right').scrollTop = anchor[0].offsetTop - 95;
    },
    addcanvasImg(e){
      console.log(e)
    },
    handleAvatarSuccess(res){
      var self=this;
      self.logoUrl=res.data.fileInfoList[0].url;
      self.form.logoId=res.data.ids;
    },
    companyHandleAvatarSuccess(res){
    var self=this;
      self.h5.companyImageUrl = res.data.fileInfoList[0].url;
      self.h5.companyImageId = res.data.ids;
    },
    createWeActivity(){//保存微活动
      var self=this;
        if(this.form.type == 2){
           if(!/^1[345678][0-9]{9}$/.test(self.form.phone)){
            self.$message({
              message:'请输入正确的手机号',
              type:'error'
            })
            return false;
          }
          var obj = {
            activityType:self.form.type,
            template:'1',
            theme:self.form.name,
            activityPhone:self.form.phone,
            companyLogoId:self.form.logoId,
            positionIds:self.value3.join(),
            weActivityId:self.id,
            activityImgUrl:"https://aijuhr.com/images/yidong/haibao_04.png",
            thumbUrl:"https://aijuhr.com/images/yidong/haibao_03.png",
            recruitingPositionsQrcodeUrl:self.recruitingPositionsQrcodeUrl,
          }
        }else{
          var obj = {};
          obj.template = '1';
          obj.activityType = self.form.type;
          obj.theme = this.h5.theme;
          obj.pageTitle = this.h5.pageTitle;
          obj.activityPhone = this.h5.activityPhone;
          obj.thumbUrl = "https://aijuhr.com/images/yidong/h5.png";
          obj.activityImgUrl = "https://aijuhr.com/images/yidong/h5.png";
          obj.positionIds = self.value3.join();
          obj.weActivityId = self.id;
          obj.titleDescription = this.h5.titleDescription;
          obj.companyAddress = this.h5.companyAddress;
          obj.activityEmail = this.h5.activityEmail;
          obj.companyDescription = this.h5.companyDescription;
          obj.companyImageUrl = this.h5.companyImageUrl;
          obj.companyImageId = this.h5.companyImageId;
        }
      var method="weRecruitActivity/createWeActivity",
          param=JSON.stringify(obj),
          successd=function(res){
            self.$router.push({name:'tinyActivity'});
          };
          if(this.form.type != 2){
          this.$refs['ruleForm'].validate((valid) => {
            if (!valid) {
              return;
            }else{
              self.$http(method,param,successd);
            }
          })
        }else{
          self.$http(method,param,successd);
        }
    },
    getPosistionList(){
      var self=this;
      var method="miniRecruit/getAllRecruitPosition",
          param=JSON.stringify({}),
          successd=function(res){
            res.data.data.forEach(function(item){
              item.key=item.id;
              item.label=item.positionName;
              item.name=item.positionName;
            })
            self.data=res.data.data;
            console.log(self.data);
          };
      self.$http(method,param,successd);
    },
    choose(){
      var self=this;
      self.positionList=[];
      self.data.forEach(function(item1){
        self.value3.forEach(function(item2){
          if(item2==item1.key){
            self.positionList.push(item1);
          }
        })
      });
      self.dialogVisible=false;
    },
    getWeActivityDefaultInfo(){//查询微活动默认信息
      var self=this;
      var method="weRecruitActivity/getWeActivityDefaultInfo",
          param=JSON.stringify({}),
          successd=function(res){
            self.qrcodeUrl=res.data.data.qrcodeUrl;
            self.recruitingPositionsQrcodeUrl=res.data.data.recruitingPositionsQrcodeUrl;
            self.form.logoId=res.data.data.companyLogoId;
            self.logoUrl=res.data.data.logoUrl;
            self.h5.companyImageUrl = res.data.data.companyImageUrl;
            self.h5.pageTitle = res.data.data.pageTitle;
            self.h5.companyDescription=res.data.data.companyDescription;
            self.h5.companyImageId=res.data.data.companyImageId;
            var recruitPositionList=res.data.data.positionList;
            recruitPositionList.forEach(function(item){
              self.positionList.push(item);
              self.value3.push(item.id);
            })
          };
      self.$http(method,param,successd);
    },
    getWeActivityInfo(){//查询微活动具体信息
      var self=this;
      var method="weRecruitActivity/getWeActivityInfo",
          param=JSON.stringify({
            weActivityId:self.id
          }),
          successd=function(res){
            self.positionList=[];
            self.value3=[];
            var recruitActivity=res.data.data.recruitActivity;
            self.form.type=String(recruitActivity.activityType);
            self.logoUrl=recruitActivity.logoUrl;
            self.qrcodeUrl=recruitActivity.qrcodeUrl;
            self.recruitingPositionsQrcodeUrl=recruitActivity.recruitingPositionsQrcodeUrl;
            self.form.logoId=recruitActivity.companyLogoId;
            self.form.phone=recruitActivity.activityPhone;
            self.form.name=recruitActivity.theme;
            var recruitPositionList=res.data.data.recruitingPositionList;
            recruitPositionList.forEach(function(item){
              self.positionList.push(item);
              self.value3.push(item.id);
            })
            console.log(self.positionList)
            console.log('self.positionList')
            if(self.form.type == 1){
              self.h5.theme = recruitActivity.theme;
              self.h5.pageTitle = recruitActivity.pageTitle;
              self.h5.titleDescription = recruitActivity.titleDescription;
              self.h5.companyAddress = recruitActivity.companyAddress;
              self.h5.activityEmail = recruitActivity.activityEmail;
              self.h5.companyDescription = recruitActivity.companyDescription;
              self.h5.companyImageUrl = recruitActivity.companyImageUrl;
              self.h5.companyImageId = recruitActivity.companyImageId;
              self.h5.activityPhone = recruitActivity.activityPhone;
            }
          };
      self.$http(method,param,successd);
    }
  },
   filters: {
    workCityFilter: function (value) {
      return value.split(',')[1] || value.split(',')[0];
    },
    positionTypeFilter: (value)=> {
      var arr = [,'全职', '兼职', '实习']
      return arr[value]
    }
  }
}
</script>
<style scoped>
.canvas_box{margin-left: 50px;}
.canvas_box_right.h5_content{ margin-left: 630px; padding-left: 20px;}
.list_img_show{width: 132px;height: 650px; padding-bottom: 20px; overflow-y: auto;overflow-x:hidden;background-color: #EEF1F6;float: left;}
.list_img_show li{width: 70px;height:88px;background-color: #fff;margin: 10px auto 0;cursor: pointer;position: relative;}
.list_img_show li>img{width: 70px;height: 88px;}
.activity_con_right{/*margin-left: 152px;*/background-color: #fff; max-width: 1200px; margin: 0 auto;}
.canvas_box{float: left;height: 580px;width: 375px;}
.h5_show_img1{position: absolute;width:300px;height: 540px;}
.h5_show_img2{position: absolute;width: 70px;height: 25px;right:10px;top: 10px;}
.h5_show_img3{position: absolute;width: 125px;height: 125px;left:88px;top: 250px;}
.h5_show_phone{position: absolute;width: 100px;height: 25px;left:138px;bottom: 20px;overflow: hidden;}

.canvas_box_right{margin-left: 400px;border-left: 1px solid #EBEEF5;}
.canvas_box_right h2{font-size: 16px;font-weight: 600;padding:20px;}
.recommend_tag{position: relative;margin-right: 10px;}
.el-steps{display: inline-block; float: left;margin: 15px 0px 0 15px;}
.h5_show_img1>li{ width: 375px; height: 567px;}

.headline{margin-left: 20px; color: #1F2D3D; font-size: 16px;font-weight: 600;}
.h5_content li{
  border-top: 1px solid #ddd;
  padding: 20px 0 30px;
}
.quilleditor{border: 1px solid #ddd; border-radius: 5px;}
.borderWrap{padding: 20px 0; border-bottom: 1px solid #ddd; border-top: 1px solid #ddd;margin-bottom: 20px;}
#app .el-form-item:last-child{margin-bottom: 20px;}
.el-form{padding-top: 20px;}
.h5_content .el-form{overflow-y: auto;max-height: 667px;}

ul.h5_show_img1{
  width: 375px;
  height: 667px;
}
.h5_show_img1>li{
  position: relative;
  width: 100%;
  height: 100%
  /* text-align: center; */
}
.h5_show_img1>li:nth-child(1){
  background: url('../../images/recruit/h5.1.png')no-repeat;
}
.h5_show_img1>li:nth-child(2){
  background: url('../../images/recruit/h5.2.png')no-repeat;
}
.h5_show_img1>li:nth-child(3){
  background: url('../../images/recruit/h5.3.png')no-repeat;
}
.h5_show_img1>li:nth-child(4){
  background: url('../../images/recruit/h5.4.png')no-repeat;
}
.contentBodyY{
  overflow-x: hidden;
  overflow-y: auto;
}
.contentBodyY::-webkit-scrollbar{width: 3px;background-color: #F5F5F5;height: 3px;}
.contentBodyY::-webkit-scrollbar-track  {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);border-radius: 10px;background-color: #F5F5F5;  }
.contentBodyY::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);  background-color: #ddd;  }

.theme{
  color: #4BE0AB;
  font-size: 20px;
  text-align: center;
  position: absolute;
  top: 150px;
  left: 50%;
  width: 276px;
  transform: translate(-50%);
  word-break:break-all;
  font-weight: 600;
}
.companyDescription{
  width: 290px;
  height: 479px;
  overflow-y: auto;
  position: absolute;
  top: 82px;
  padding: 10px 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #333333;
  line-height: 20px;
}
.companyDescription img{
  max-width: 290px;
  width: 100%;
  margin-top: 20px;
}
.positionList{
    width: 78%;
    top: 80px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 500px;
    overflow-y: auto;
    padding: 0 10px;
}
.positionList li {
  position: relative;
  font-size: 14px;

}
.positionList li .positionName{
  color: #1F2D3D;
  padding-bottom: 15px;
  padding-top: 15px;
}
.positionIntroduce{
  color: #666;
  padding-bottom: 15px;
  border-bottom: 1px solid #E5E5E5;
}
.positionList li .details{
  width: 60px;
  position: absolute;
  right: 5px;
  top: 15px;
  z-index: 2;
}
.companyDetail{
  width: 55%;
  position: absolute;
  top: 115px;
  right: 8%;
}
.companyDetail ul{
  margin-top: 25px;

}
.companyDetail ul li{
  margin-top: 25px;

}
.companyDetail ul li img{
  width: 30px;
}
.companyDetail ul li p{
  display: inline-block;
  width: 80%;
  vertical-align: middle;
  margin-top: -20px;
}
</style>
<style>
.h5_content li .el-textarea__inner{
  max-height: 350px;
}
.h5_content .ql-editor{height: auto; min-height: 150px; max-height: 300px;}
.add_activity .el-form-item{height:36px;}
#add_activity .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #add_activity .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  #add_activity .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 330px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  #add_activity #logo_img, #companyImg {
    width: 330px;
    height: 178px;
    display: block;
  }
  #add_activity .addactivity_upload{
    height: 230px;
  }
  #add_activity .el-dialog.el-dialog--tiny{
    width:500px;
  }
  .h5_content .el-form-item__content, .borderWrap .el-form-item__content{
    display: table;
    width: 60%;
  }
</style>
