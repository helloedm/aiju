<template>
  <div class="mini-program" >
     <h4 class="title">小程序</h4>
     <div class="content-wrap" ref="contentWrap">
        <div class="process">
            拥有微信小程序只需要以下3步：1、小程序授权；2、小程序提交审核；3、完成
            <span class="tip"> <i class="iconfont  info-circle-o">&#xe65e;</i>如果要更换小程序，请先重新授权且当前没有小程序在审核中</span>
        </div>
        <!-- 授权小程序 -->
        <div class="authorize-wrap"  v-if="step == 1">
            <div class="img-box">      
                <img src="../../images/Key.png" alt="icon">
                <p>小程序授权</p>
            </div>
            <div class="authorize area">
                 <div class="authorize-left left">
                    <div class="authorize-word">将微信小程序授权给爱聚，系统会自动帮你生成微官网小程序，并提交到微信； 你不需要做复杂操作，即可获得微官网的微信小程序。</div>
                    <div class="authorize-cue">注意：你的小程序的主体必须是【企业】。</div>
                 </div>
                 <div class="authorize-right right">
                     <span class="btn" @click="openAuthorize">授权微信小程序</span>
                 </div>
            </div>
             <div class="register area">
                 <div class="register-left left">
                    <div class="register-word">如果你还没有注册微信小程序，点击下方按钮注册；注册成功后，再授权给爱聚即可。</div>
                 </div>
                 <div class="register-right right">
                     <span class="btn" @click="linkTo(1)">注册小程序</span>
                 </div>
            </div>
        </div>
        <!-- 选择模板数据 -->
        <div class="template-list" v-if="step == 2">
             <ul class="ul">
                 <li class="li website" v-for="item in companyWebSiteList" :key="item.id">
                     <h3 class="website-title">{{item.companyWebName}}</h3>
                     <div class="website-area">
                        <div class="header"><img src="../../images/phone-header.jpg" alt=""></div>
                        <div class="company-name">{{item.companyWebName | substrName}}</div>
                        <div class="company-profile">
                           <div class="banner-image" :style="{backgroundImage: 'url('+item.weBannerUrl+')'}"></div>
                           <div class="logo-slogan-wrap">
                                <div class="logo" :style="{backgroundImage: 'url('+item.logoUrl+')'}"></div>
                                <div class="title">{{item.name}}</div>
                                <div class="slogan">{{item.slogan}}</div>
                            </div>
                        </div>
                        <div class="company-intro">
                            <div class="intro-hd">公司介绍</div>
                            <div class="intro-bd">{{item.companyIntroduction}}</div>
                        </div>
                        <div class="tabbar">
                            <ul>
                                <li class="company-item selected">
                                    <img src="../../images/selected_company.png" alt="" width="19" height="">
                                    <p>公司</p>
                                </li>
                                <li class="position-item">
                                    <img src="../../images/position.png" alt="" width="20">
                                    <p>在招职位</p>
                                </li>
                                <li  class="mine-item">
                                    <img src="../../images/mine.png" alt="" width="20">
                                    <p>个人中心</p>
                                </li>
                            </ul>
                        </div>
                        <div class="share-box"></div>
                        <div class="ewm-box">
                            <div class="img-box"><img :src="item.webQrcodeName" alt="二维码"></div>
                            <p class="word">扫码预览</p>
                        </div>
                     </div>
                     <div class="checkbox" @click="setOtherChecked(item)">
                         <el-checkbox v-model="item.checked"></el-checkbox>                      
                     </div>
                 </li>                
             </ul>
             <div class="btn-area">
                 <el-button type="primary" @click="firstSubmit">提交微信审核</el-button>
                </div>
        </div>
        <!-- 查看审核情况 -->
         <div class="examine-wrap" v-if="step == 3">
            <div class="img-box">      
                <img src="../../images/group.png" alt="icon">
                <p>小程序提交审核</p>
            </div>
            <div class="examine">
                <div class="server-mini mini-wrap">
                    <div class="left">服务器小程序版本信息</div>
                    <div class="right">
                        <p><span>最新版本：</span><span>{{serverMini.spVersion}}</span></p>
                        <p><span>版本描述：</span><span>{{serverMini.spDescription}}</span></p>
                    </div>
                </div>
                <div class="user-mini mini-wrap">
                    <div class="left">用户小程序信息</div>
                    <div class="right">
                        <p><span>小程序：</span><span>{{userMini.smallProgramName || '爱聚微招聘'}}</span></p>
                        <p><span>线上版本：</span><span>{{userMini.smallProgramVersion ? userMini.smallProgramVersion : '无' }}</span></p>
                        <p><span>更新时间：</span><span>{{userMini.updateTime || '无'}}</span></p>
                        <p><span>更新状态：</span><span :style="{'color':auditResult.status==0?'#37B576':auditResult.status==1?'#F74E52':'#374456'}">{{auditState}}</span></p>
                        <div class="tips" v-html="auditResult.reason"></div>
                    </div>
                </div>
                <div class="btn-area">
                    <div class="top">
                        <span class="btn" v-show="showAgainBtn" @click="againSubmit">重新提交审核</span>
                        <span class="btn" v-show="showUpdataBtn" @click="updata">更新版本</span>
                    </div>
                    <!-- <div class="bottom" style="display:none;"><span @click="openAuthorize">重新授权</span><span @click="relieveAuthorize">解除授权</span></div> -->
                </div>
            </div>
        </div>
    </div>
    <!--  -->
    <el-dialog class="authorize-dialog"
        title="提示"
        :visible.sync="dialogVisible0"
        width="30%"
        >
        <p>请在新窗口中完成微信小程序授权 请谨慎操作。</p>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible0 = false">已完成授权</el-button>
        <el-button  @click="dialogVisible0 = false">遇到问题，点击重试</el-button>
        </span>
    </el-dialog>
    <!--  -->
    <el-dialog class="write-info-dialog"
        title="提示"
        :visible.sync="dialogVisible1"
        width="30%"
        >
        <p>你尚未填写小程序信息，无法提交审核。</p>
        <p> 请登录微信小程序后台，完善小程序信息（如小程序名称、图标、描述、类 别等信息）后，再来操作。</p>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="linkTo(1)">前往小程序后台</el-button>
        <el-button  @click="dialogVisible1 = false">确定</el-button>
        </span>
    </el-dialog>
<!--  -->
<el-dialog class="relieve-dialog"
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        >
        <p>解除小程序授权后，如果有已经在运行的小程序将无法再继续使用， 请谨慎操作。</p>
        <span slot="footer" class="dialog-footer">
         <el-checkbox v-model="checked">已确认风险，确认解除授权</el-checkbox>
        <el-button type="danger " @click="dialogVisible2 = false">解除授权</el-button>
        <el-button  @click="dialogVisible2 = false">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import Util from '../../script/util.js'
import { setTimeout } from 'timers';

export default {
  data(){
      return{
          num:0,
          wh:'',
          step:1,     //初始为1，
          getSmallNum:0,
          auditid:0,        //审核编号
          dialogVisible0:false,
          dialogVisible1:false,
          dialogVisible2:false,
          showAgainBtn:false,
          showUpdataBtn:false,
          checked:true,
          serverMini:{},    //服务器小程序信息
          userMini:{},      //用户线上小程序信息
          auditMini:{},     //正在审核的小程序信息
          auditResult:{},
          pageList:[],
          categoryList:[],
          auditType:'',
          companyWebSiteList:[],   //微官网列表
          checkedWebsiteId:0,       //选中的微官网id
      }
  },
  computed:{
      auditState(){
          var submitingVersion = this.auditMini.submitingVersion || '';    
          var val = this.auditResult.status;
          var spVersion = this.serverMini.spVersion;
          switch(val){
              case 0:
                if(submitingVersion){
                    return '更新版本(' + submitingVersion +')  微信审核成功'
                }else{
                    return '更新版本(' + spVersion +')  微信审核成功'
                }
                
            case 1:
                if(submitingVersion){
                    return '更新版本(' + submitingVersion +')  微信审核失败'
                }else{
                    return '更新版本(' + spVersion +')  微信审核失败'
                }
            case 2:
                if(submitingVersion){
                    return '更新版本(' + submitingVersion +')  正在等待微信审核...'
                }else{
                    return '更新版本(' + spVersion +')  正在等待微信审核...'
                }
            default:
                return '无'
        }
      }
  },
  mounted:function(){
    this.getAuditResult()
    this.getCompanyWebSiteList()
    this.$nextTick(function(){
        this.wh = window.innerHeight - 190;
        this.$refs.contentWrap.style.height = this.wh + 'px';
    })  
  },
  methods:{
    openAuthorize(){
      var self=this;
       this.$router.push({
           path:'/xcx',
           params:{},
           query:{

           },
        });
    },
    /**
     * 查询微官网列表
    */
    getCompanyWebSiteList(){
          var _this = this
          var method="spServerVersion/getCompanyWebSiteList"
          var param=JSON.stringify({}),
          successd=function(res){
              if(res.data.data && res.data.data.length == 0 &&  _this.step == 2){
                    _this.$message({
                        message:'请先创建微官网',
                        type:'warning'
                    })
              }else{
                  _this.companyWebSiteList = res.data.data || [];
              }             
          };
      this.$http(method,param,successd);
    },
    /**
     * 将其他微官网checked设置为false
    */
    setOtherChecked(item){
        this.num++;
        if(this.num%2 == 1){        //点击选框会触发两次，这里过滤一下
            if(!item.checked){    
                this.companyWebSiteList.forEach((ite,idx)=>{
                    if(ite.id !== item.id){
                        this.$set(this.companyWebSiteList[idx],'checked',false)
                    }           
                })
                this.checkedWebsiteId = item.id
            }else{
                item.checked = false;
                this.checkedWebsiteId = 0
            }
        }
        console.log(this.companyWebSiteList)     
    },
    /**
     * 设置小程序服务器域名
     */
    modifyDomain(){
          var method="smallProgramAudit/modifyDomain"
          var param={},
          successd=function(res){
             if(res.data.code == 0 && res.data.data.errcode == 0){
                 localStorage.hasModifyDomain = true
             }
            console.log(res)
          };
      this.$webHttp(method,param,successd);
    },
    /**
     * 获取小程序类目列表信息
     */
    getPageList(){
          var _this = this
          var method="smallProgramAudit/getPageList"
          var param={},
          successd=function(res){    
             if(res.data.code == 0){
                 var _data = res.data.data
                 if(_data.pageListJson.errcode == 0){
                     _this.pageList = _data.pageListJson.page_list || [];
                 }
                 if(_data.categoryListJson.errcode == 0){
                     _this.categoryList = _data.categoryListJson.category_list || [];
                 }  

                _this.submitAudit()
                 
             }
          };
      this.$webHttp(method,param,successd);
    },
   
    /**
     * 查询小程序名称和版本信息等
     */
    getSmallProgramInfo(){
         var _this = this;
          var method="smallProgramAudit/getSmallProgramInfo"
          var param={},
          successd=function(res){
            if(res.data.code == 0){
                //已授权
                var _data = res.data.data;
                _this.getSmallNum++
                if(_this.getSmallNum == 1 && !localStorage.hasModifyDomain){
                    _this.modifyDomain()
                }          
                _this.userMini = {smallProgramName:_data.smallProgramName, smallProgramVersion:_data.smallProgramVersion, updateTime:_this.$date(_data.updateTime,'time')}
                _this.auditMini = {submitingVersion:_data.submitingVersion, templateId:_data.templateId}
                _this.serverMini = _data.serverVersionInfo
                setTimeout(function(){
                     _this.compareVersion()
                },1000)
               
            }else if(res.data.code == 20003){
               //未授权
                _this.step = 1
            }
          };
      this.$webHttp(method,param,successd);
    },
     /**
     * 小程序提交审核
     */
    submitAudit(){
        var _this = this
           if(_this.auditType == 'again'){
               var method="smallProgramAudit/reSubmitAudit"
           }else{
             var method="smallProgramAudit/submitAudit"
           }       
          var param={
               "item_list": [
                    {
                        "address":_this.pageList[0],
                        "tag":"公司",
                        "first_class": _this.categoryList[0].first_class,
                        "second_class": _this.categoryList[0].second_class,
                        "first_id":_this.categoryList[0].first_id,
                        "second_id":_this.categoryList[0].second_id,
                        "title": "首页"
                    }
                 ],
               "weWebsiteId":_this.checkedWebsiteId,
          },
          successd=function(res){
             if(res.data.code == 0){
                 if(res.data.data.errcode == 0){
                    _this.auditid = res.data.data.auditid
                    _this.getSmallProgramInfo()
                    _this.step = 3
                    _this.showAgainBtn = false
                    _this.showUpdataBtn = false
                 }else if(res.data.data.errcode == 86002){
                     //小程序还未设置昵称、头像、简介
                    _this.dialogVisible1 = true
                 }else if(res.data.data.errcode == 85009){
                    _this.$message({
                        message:'您上次提交的还在审核中，等有结果之后才能更换小程序数据模板',
                        type:'warning'
                    })
                    _this.step = 3
                 }              
             }
          };
      this.$webHttp(method,param,successd);
    },
    
    /**
     * 查询小程序最新审核状态
     */
    getAuditResult(){
        var _this = this;
          var method="smallProgramAudit/getAuditResult"
          var param={},
          successd=function(res){           
             if(res.data.code == 0){
                  _this.getSmallProgramInfo()
                 var _data = res.data.data;
                 //其中0为审核成功，1为审核失败，2为审核中
                 if(_data.auditResultJson.status == 1){
                     _this.showAgainBtn = true
                 }
                _this.auditResult = _data.auditResultJson
                console.log(_data.releaseResult)
                _this.step = 3;
             }else if(res.data.code == 2020){
                 //小程序尚未授权
                 _this.step = 1
             }else if(res.data.code == 2021){
                 //没选择数据模板
                 _this.step = 2
                 _this.getSmallProgramInfo()
             }
          };
      this.$webHttp(method,param,successd);
    },
    /**
     * 为授权的小程序帐号上传小程序代码
     */
    submitExtJson(){
        var self = this
          var method="smallProgramAudit/submitExtJson"
          var templateId = 0
          var userVersion = '1.0.0'
          if(self.auditType == "again"){
              templateId = self.auditMini.templateId || self.serverMini.templateId
              userVersion = self.auditMini.submitingVersion || self.serverMini.spVersion
          }else{
              templateId = self.serverMini.templateId
              userVersion = self.serverMini.spVersion || '1.0.0'
          }
          var params={
              param:{
                   "template_id":templateId,
                    "ext_json":JSON.stringify({}),    //*ext_json需为string类型，请参考下面的格式*
                    "user_version":userVersion,
                    "user_desc":"test",
              },         
              "weWebsiteId":self.checkedWebsiteId,
          },
          successd=function(res){
             if(res.data.code == 0){
                 if(res.data.data.errcode == 0){
                    if(self.auditType == "first"){
                         self.auditResult = {status:2};
                    }else{
                        self.auditResult.status = 2
                        self.auditResult.reason = ''
                    }
                    self.getPageList()
                 }else{
                    self.$message({
                        message:res.data.data.errmsg,
                        type:'warning'
                    })
                }                 
             }
          };
      this.$webHttp(method,params,successd);
    },
    /**
     * 比较版本是否是最新版本
     */
    compareVersion(){
       if(this.serverMini && this.serverMini.spVersion && this.auditMini && this.auditMini.submitingVersion && this.serverMini.spVersion != this.auditMini.submitingVersion){
           this.showUpdataBtn = true
       }
    },
    //链接跳转
    linkTo(id){   
        switch(id){
            case 1:
            window.open('https://mp.weixin.qq.com')
            break;
        }
    },
     relieveAuthorize(){
        this.dialogVisible2 = true
    },
    /** 
     * 第一次提交审核
    */
    firstSubmit(){
        if(this.checkedWebsiteId == 0){
             this.$message({
                message:'请先选择数据模板',
                type:'warning'
            })
            return;
        }
        this.submitExtJson()       
    },
     /** 
     * 重新提交审核
    */
    againSubmit(){
        this.auditType = 'again'
        this.submitExtJson()
    },
    /** 
     * 更新版本
    */
    updata(){
        this.auditType = 'updata'
         this.submitExtJson()
        
    },
  },
  filters:{
      substrName(val){
        if(val && val.length>10){
            return val.substr(0,10)+'...'
        }else{
            return val
        }
      },
  },
  watch:{
      step(val,oldVal){
          if(val !== 2){
              this.$nextTick(function(){
                this.$refs.contentWrap.style.height = this.wh + 'px';
            })        
          }else{
              this.$refs.contentWrap.style.height = 'auto';
          }
      },
  },

}
</script>

<style lang="less">
.write-info-dialog{
     .el-dialog.el-dialog--small{
         width:500px;
        
     }
 }
 .relieve-dialog  {
    .el-dialog.el-dialog--small{
        width:450px;
        .el-dialog__footer .el-checkbox{
            float: left;
            margin-top:8px;
        }
     }
 }
  .authorize-dialog  {
    .el-dialog.el-dialog--small{
        width:400px;
        .el-dialog__footer{
            text-align: center;
        }
     }
 }
 .checkbox .el-checkbox__inner{
        width:24px;
        height: 24px;
        border-radius: 50%;
        &::after{
          top:4px;
          left:8px;
        }
    }
</style>


<style lang="less" scoped>
@import '../../style/less/miniIndex.less';
  

</style>

