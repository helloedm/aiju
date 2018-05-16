<template>
  <div id="channel">
    <div class="title">渠道设置</div>
    <notice style="display: block;" iconClass="icon-tixing" color="#99A9BF" bgColor="rgba(0,0,0,0)" text="绑定渠道后，可以对您多渠道简历进行一站式便捷管理"/>
    <!-- <el-alert
        type="info"
        :closable="false"
        description="绑定渠道后，可以对您多渠道简历进行一站式便捷管理"
        show-icon>
    </el-alert> -->
    <ul id="channelList">
        <li>
            <div class="logoWrap">
                <img src="../../images/recruit/lagouLogo.jpg" alt="">
            </div>
            <el-button type="primary" @click="lagouDialog = true;platformType = 1" v-html="platformTypeList.indexOf(1)=='-1'?'关联渠道': '已关联'"></el-button>
        </li>
        <li>
            <div class="logoWrap">
                <img src="../../images/recruit/qcwyLogo.jpg" alt="">
            </div>
            <el-button type="primary" @click="qcwyDialog = true; platformType =2" v-html="platformTypeList.indexOf(2)=='-1'?'关联渠道': '已关联'"></el-button>
        </li>
        <li>
            <div class="logoWrap">
                <img src="../../images/recruit/wbLogo.jpg" alt="">
            </div>
            <el-button type="primary" @click="wbDialog = true; platformType =4;yzm.randomKey=null" v-html="platformTypeList.indexOf(4)=='-1'?'关联渠道': '已关联'"></el-button>
        </li>
        <li>
            <div class="logoWrap">
                <img src="../../images/recruit/bossLogo.jpg" alt="">
            </div>
            <el-button type="primary" @click="bossDialog = true; platformType =5;yzm.randomKey=null" v-html="platformTypeList.indexOf(5)=='-1'?'关联渠道': '已关联'"></el-button>
        </li>
    </ul>

    <el-dialog
        :title="lagouTitle"
        :visible.sync="lagouDialog"
        width="600px"
        size="tiny">
         <div class="login_lago">
            <el-row>
                <el-col :span="6">
                    <div class="logo">
                        <img src="../../images/recruit/lagouLogo.jpg" alt="">
                    </div>
                </el-col>
                <el-col :span="18">
                    <el-form style="margin-top: 20px;" :model="lagouForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="lagouForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item  label="密码" label-width="80px" prop="name">
                            <el-input type="password" v-model="lagouForm.passWord"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <!-- 会员名 ctmname -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="lagouDialog = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        :title="qcwyTitle"
        :visible.sync="qcwyDialog"
        width="600px"
        size="tiny">
         <div class="login_lago">
            <el-row>
                <el-col :span="6">
                    <div class="logo">
                        <img  src="../../images/recruit/qcwyLogo.jpg" alt="">
                    </div>
                </el-col>
                <el-col :span="18">
                    <el-form style="margin-top: 20px;" :model="qcwyForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="会员名" prop="ctmname">
                            <el-input v-model="qcwyForm.ctmname"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="qcwyForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" label-width="80px" prop="name">
                            <el-input type="password" v-model="qcwyForm.passWord"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="qcwyDialog = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
    </el-dialog>

<!-- 58 -->
     <el-dialog
        :title="wbTitle"
        :visible.sync="wbDialog"
        width="600px"
        size="tiny">
         <div class="login_lago">
            <el-row>
                <el-col :span="6">
                    <div class="logo">
                        <img  src="../../images/recruit/wbLogo.jpg" alt="">
                    </div>
                </el-col>
                <el-col :span="18">
                    <el-form style="margin-top: 20px;" :model="lagouForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="wbForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item  label="密码" label-width="80px" prop="name">
                            <el-input type="password" v-model="wbForm.passWord"></el-input>
                        </el-form-item>
                        <el-form-item  label="验证码" label-width="80px" prop="name" v-if="yzm.randomKey">
                            <el-input v-model="wbForm.vcode" style="width:100px;" class="vcode_input"></el-input>
                            <img :src="yzm.vcode" alt="" class="vcode">
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="wbDialog = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
    </el-dialog>

    <!-- boss -->
    <el-dialog
        :title="bossTitle"
        :visible.sync="bossDialog"
        width="600px"
        size="tiny">
         <div class="login_lago">
            <el-row>
                <el-col :span="6">
                    <div class="logo bossLogo">
                        <img  src="../../images/recruit/bossLogo.jpg" alt="">
                    </div>
                </el-col>
                <el-col :span="18">
                    <el-form style="margin-top: 20px;" :model="lagouForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="bossForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item  label="密码" label-width="80px" prop="name">
                            <el-input type="password" v-model="bossForm.passWord"></el-input>
                        </el-form-item>
                        <el-form-item  label="验证码" label-width="80px" prop="name" v-if="yzm.randomKey">
                            <el-input v-model="bossForm.vcode" style="width:100px;" class="vcode_input"></el-input>
                            <img :src="yzm.vcode" alt="" class="vcode">
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="bossDialog = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>

import allcity from '../../script/allcity';
import Notice from 'base/notice'

export default {
  name: 'publishList',
  data(){
    return{
        platformTypeList: [],
        platformType: '', //1.拉钩 2. 51 3.智联 4 58 5 boss
        lagouDialog: false,
        qcwyDialog: false,
        wbDialog: false,
        bossDialog: false,
        lagouTitle: '登录拉勾账号',
        qcwyTitle: '登陆前程无忧账号',
        wbTitle: '登陆58同城账号',
        bossTitle: '登陆BOSS直聘账号',
        lagouForm:{
            userName: '',
            passWord: ''
        },
        qcwyForm:{
            ctmname: '',
            userName: '',
            passWord: ''
        },
        wbForm:{
            userName: '',
            passWord: '',
            vcode:null
        },
        bossForm:{
           userName: '',
           passWord: '',
           vcode:null
        },
        yzm:{
            randomKey:null,
            vcode:'http://192.168.5.141:8080/hrm/e8a146358e7a48e3b2cb4b63e8cfbb9c.png'
        }
    }
  },
  methods: {
     qryPlatformList(){//获取绑定平台列表
      let method = 'platform/qryPlatformList',
        param = {},
        callBack = res=>{
          console.log(res.data.data)
          if(res.data.data){
            var arr = [];
            res.data.data.forEach(item => {
              arr.push(item.platformType)
            });
            this.platformTypeList = arr;
            console.log(arr)
            console.log('arr')
          }
          this.platformList = res.data.data;
        }
        this.$webHttp(method, param, callBack);
    },
      bindingPlatformAccount(){
          let method = 'platform/bindingPlatformAccount',
          lagoParams = {
              account: this.lagouForm.userName,
              password: this.lagouForm.passWord,
              platformType: this.platformType
          },
           qcwyParams = {
              ctmname: this.qcwyForm.ctmname,
              account: this.qcwyForm.userName,
              password: this.qcwyForm.passWord,
              platformType: this.platformType,
          },
          wbParams = {
              account: this.wbForm.userName,
              password: this.wbForm.passWord,
              vcode: this.wbForm.vcode,
              randomKey:this.yzm.randomKey,
              platformType: this.platformType,
          },
          bossParams = {
              account: this.bossForm.userName,
              password: this.bossForm.passWord,
              vcode: this.bossForm.vcode,
              randomKey:this.yzm.randomKey,
              platformType: this.platformType
          },
          callBack = res=>{
              if(res.data.data==null){
                this.lagouDialog = false;
                this.qcwyDialog = false;
                this.wbDialog = false;
                this.bossDialog = false;
                this.$message({
                    message: res.data.message + ',请勿重复操作',
                    type: 'success'
                });
              }else if(res.data.data.code==1001){
                  this.yzm.vcode=res.data.data.vcode;
                  this.yzm.randomKey=res.data.data.randomKey;
                  this.$message({
                    message: res.data.message,
                    type: 'warning'
                });
              }else{
                  this.$message({
                    message: '请稍后再操作',
                    type: 'warning'
                });
              }
          }
          if(this.platformType == 1){
            if(this.lagouForm.userName != "" && this.lagouForm.passWord != ""){
                this.$webHttp(method, lagoParams, callBack);
            }else{
                this.$message({
                    message: '请输入用户名和密码',
                    type: 'warning'
                });
            }
          }else if(this.platformType == 2){
              if(this.qcwyForm.userName != "" && this.qcwyForm.passWord != "" && this.qcwyForm.ctmname != ""){
                this.$webHttp(method, qcwyParams, callBack);
                }else{
                    this.$message({
                        message: '请输入用户名和密码',
                        type: 'warning'
                    });
                }
          }else if(this.platformType == 4){
              if(this.wbForm.userName != "" && this.wbForm.passWord != ""){
                this.$webHttp(method, wbParams, callBack);
                }else{
                    this.$message({
                        message: '请输入用户名和密码',
                        type: 'warning'
                    });
                }
          }
          else if(this.platformType == 5){
              if(this.bossForm.userName != "" && this.bossForm.passWord != ""){
                this.$webHttp(method, bossParams, callBack);
                }else{
                    this.$message({
                        message: '请输入用户名和密码',
                        type: 'warning'
                    });
                }
          }
      },
      submit(){
        this.bindingPlatformAccount()
      },
      edit(){
          this.$router.push({path:'post', query: {id: this.id}});
      },
  },
  components: {
      Notice
  },
  created () {
    this.qryPlatformList()
  }
}
</script>
<style>
#channel .el-dialog--tiny{
    width: 500px;
}
</style>

<style scoped>
i{
  vertical-align: middle;
}
.title{
    margin-bottom: 15px;
}
#channelList{
    padding: 20px 0;
}
#channelList li{
    width: 130px;
    text-align: center;
    margin-right: 20px;
    display: inline-block;
}
#channelList li .logoWrap{
    background: #fff;
    width: 127px;
    height: 127px;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    /* box-shadow: 0 6px 40px 0 rgba(106,115,152,.15); */
}
#channelList li .logoWrap img{
    width: 80%;
}
.logo{
    width: 127px;
    height: 127px;
    border-radius: 50%;
    border: 1px solid #ccc;
    text-align: center;
}
.logo img{
    width: 100px;
    margin-top: 15px;
    border-radius: 50%;
}
.vcode{height:36px;    vertical-align:top;}
</style>



