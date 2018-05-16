<template>
	<div id="app" class="clearfix" :class="{'oa_ecbao_cn' : oa_login}" v-loading.fullscreen.lock="fullscreenLoading">
		<!-- <div id="wxMask" v-if="ewm.wxMask">
       <div id="ewmWrap">
         <img src="static/img/ewmTitle.png" alt="title">
         <img id="ewm" :src="ewm.src" alt="二维码">
         <p>绑定微信后，我们为你提供更多服务</p>
       </div>
    </div> -->
    <!-- hrmRoleId:{
      1:管理员,
      2:员工,
      3:财务,
      4:招聘专员,
      5:面试官,
      6:苏宁云商城体验用户,
      7:人事
    } -->
    <div class="app_nav">
			<div class="app_nav_logo"></div>

			<!-- <div class="app_nav_access">
        <span @click="userMenusToggle = 2;$router.push('/ATS/recruitment');remainingDaysGet();appNaveHide=true" :class="{active: userMenusToggle==2}" v-if="Util.ukeyNo||(userData&&(userData.userNature==1||userData.hrmRoleId==1||userData.hrmRoleId==4)&&userData.hrmRoleId!=6&&userData.hrmRoleId!=5&&userData.hrmRoleId!=7)"><i class="iconfont" style="fontsize: 30px;">&#xe677;</i>招聘管理
          <span v-show="remainingDays.expireDays <= 3" id="remainingDays">剩余{{ remainingDays.expireDays }}天</span>
        </span>
				<span @click="userMenusToggle = 0; $router.push('/index');appNaveHide=true" v-bind:class="{active: userMenusToggle ==0}"><i class="iconfont" style="fontsize: 30px;">&#xe684;</i>协同办公</span>
				<span @click="ukeyPopShow" v-bind:class="{active: userMenusToggle==1}" v-if="Util.ukeyNo||(userData.userNature==1||userData.hrmRoleId==3||userData.hrmRoleId==6||userData.hrmRoleId==7)"><i class="iconfont" style="fontsize: 30px;">&#xe79c;</i>公司管理</span>
			</div> -->
      <div class="app_nav_access">
        <span v-for="(item, index) in leftMenuList" v-if="index<3" :key="item.id" @click="userMenusToggleChange(item)" :class="{active: userMenusToggle== item.id}"><i class="iconfont" style="fontsize: 30px;" v-html="item.icon"></i>{{ item.name }}
          <span v-show="item.id == '1' && remainingDays.expireDays <= 3" id="remainingDays">剩余{{ remainingDays.expireDays }}天</span>
        </span>
			</div>
			<div class="app_nav_msg">
				<el-dropdown trigger="hover" @command="logOut">
					<div class="el-dropdown-link">
						<span class="add_nav_msg_header" v-if="userData&&userData.fileInfo == null">{{userData.name != null?userData.name.slice(-2):""}}</span>
						<span class="add_nav_msg_header" v-if="userData&&userData.fileInfo != null"><img :src="userData.fileInfo.url"></span>
						<span class="add_nav_msg_name" v-if="userData">{{userData.name}}</span>
						<span class="add_nav_msg_header" v-else></span>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item style="text-align: center;font-size:12px;" v-if="userData.isAdmin == 1"  @click.native="navPersonal"><img src="./images/company_icon.png" style="display:inline-block;width:14px;height:14px;margin-right:6px;vertical-align: text-bottom;">公司信息</el-dropdown-item>
						<el-dropdown-item  style="text-align: center;font-size:12px;"  @click.native="navPersonal2"><img src="./images/personal_icon.png" style="display:inline-block;width:12px;height:14px;vertical-align: text-bottom;margin-right:6px;">账号设置</el-dropdown-item>

              	<!--<router-link to="/personal">个人中心</router-link>-->
						<el-dropdown-item style="text-align: center;font-size:12px;" command="logOut"><img src="./images/quit_icon.png" style="display:inline-block;width:12px;height:14px;margin-right:6px;vertical-align: text-bottom;">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
      <div class="app_nav_upgrade" @click="upgrade" v-if="userData&&userData.userNature==1">
        版本升级
      </div>
		</div>

<!-- 内容 -->
		<div class="app_right" v-bind:class="{smallbarClass: !smallbarShow,'app_right_p':!appNaveHide}">
			<div class="app_right_box">
        <!-- 提示 -->
        <div class="index_tip" v-if="demoDataCon==1&&(userMenusToggle == 1||$route.name!='personal')">
          <p>你的账号中目前填充了一些示例数据供你体验功能使用。</p>
          <p>这些示例数据将在你<span class="color_f96868">创建第一个职位</span>或<span class="color_f96868">上传第一份简历</span>后清除</p>
        </div>
				<router-view keep-alive></router-view>
			</div>
		</div>
<!-- 菜单 -->
		<div class="app_left" v-bind:class="{smallbarClass: !smallbarShow}" v-if="appNaveHide">
			<div class="app_left_smallbar" @click="smallbar"><i class="iconfont">&#xe620;</i></div>

    <div v-for="MainItem in leftMenuList" :key="MainItem.id">
      <div v-if="userMenusToggle == MainItem.id">
        <el-menu   v-for="item in MainItem.children" :key="item.id" :router="true" :default-active="defaultActive" :unique-opened="true" v-bind:class="{smallbarClass: !smallbarShow}" @select="selectMenu" :default-openeds="defaultOpeneds" :collapse="!smallbarShow">
          <el-submenu v-if="item.children" :index="item.link">
            <template v-if="item.children" slot="title"><i class="iconfont" v-html="item.icon"></i><span>{{ item.name }}</span></template>
            <el-menu-item v-for="ite in item.children" :index="ite.link" :key="ite.id" v-if="ite.name != '客服管理'">{{ ite.name }}</el-menu-item>
            <!-- <el-menu-item @click="openMpkf" index="/ATS/abc" v-else>{{ ite.name }}</el-menu-item> -->
            <p class="el-menu-item" style="padding-left: 40px;font-size:15px;" @click="openMpkf" v-else>客服管理</p>
          </el-submenu>
          <el-menu-item v-if="item.children == null&&item.name!='工资单'" :index="item.link"><i class="iconfont" v-html="item.icon"></i><span slot="title">{{ item.name }} </span></el-menu-item>
          <el-menu-item v-if="item.children == null&&item.name=='工资单'" :index="item.link" @click="routerPayStubs"><i class="iconfont" v-html="item.icon"></i><span slot="title">{{ item.name }} </span></el-menu-item>
        </el-menu>
      </div>
    </div>
		</div>
		<el-dialog title="没有U盾提示" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 0" class="ukey_pop">
			<p>如果您未插入爱聚U盾，请先插入U盾。</p>
			<p>如果您未安装爱聚U盾驱动，请点击<a href="https://aijuhr.com/USBinstall/SetUp.exe">安装驱动</a>。</p>
			<p>如果您没有U盾，请联系我们。</p>
			<p>电话：0571-89935939 QQ：800036070</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="ukeyPopNum = 1">遇到问题</el-button>
			</span>
		</el-dialog>
		<el-dialog title="遇到问题" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 1" class="ukey_pop">
			<p>1、查看在设备管理器中是否存在该设备。（我的电脑->属性->硬件->设备管理器）</p>
			<p>2、请将爱聚U盾插入其他电脑进行测试，确认U盾是否正常。</p>
			<p>3、请确认爱聚U盾是否和账号对应。</p>
			<p>4、请确认爱聚U盾是否被液体浸湿，在使用时一定要注意防水及防潮。</p>
			<p>5、如插入爱聚U盾后网站无法识别，请确认电脑是否安装控件。</p>
			<p>6、电脑应该有良好的接地，如果接地不良，当有漏电就有可能使U盾损坏。</p>
			<p>如果您在使用过程中遇到了什么问题，您可以联系我们的售后人员。</p>
			<p>联系电话：0571-89935939 联系QQ：800036070</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="U盾需要激活" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 2">
			<p>您的U盾需要激活</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="ukeyPopNum = 3">激活</el-button>
			</span>
		</el-dialog>
		<el-dialog title="确认激活页面" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 3">
			<el-form label-width="100px" :model="ukeyActiveForm" :rules="ukeyActiveRules" ref="ukeyActiveForm">
				<el-form-item label="u盾序列号" prop="listkey">
					<el-input v-model="ukeyActiveForm.listkey"></el-input>
				</el-form-item>
				<el-form-item label="u盾激活码" prop="cdkey">
					<el-input v-model="ukeyActiveForm.cdkey"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="ukeyActiveSubmit('ukeyActiveForm')">确认</el-button>
			</span>
		</el-dialog>
		<el-dialog title="设置二级密码" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 4">
			<el-form label-width="130px" :model="ukeyPasswordForm" :rules="ukeyPasswordRules" ref="ukeyPasswordForm">
				<el-form-item label="请输入密码" prop="password">
					<el-input type="password" v-model="ukeyPasswordForm.password"></el-input>
				</el-form-item>
				<el-form-item label="请再次输入密码" prop="againPassword">
					<el-input type="password" v-model="ukeyPasswordForm.againPassword"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="ukeyPasswordEdit('ukeyPasswordForm')">确认</el-button>
			</span>
		</el-dialog>
		<el-dialog title="密码验证" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 5">
			<el-form label-width="130px" :model="ukeyValidateForm" :rules="ukeyValidateRules" ref="ukeyValidateForm">
				<el-form-item label="请输入U盾密码(二级密码)" prop="validate">
					<el-input type="password" v-model="ukeyValidateForm.validate"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="ukeyPasswordSubmit('ukeyValidateForm')">确认</el-button>
			</span>
		</el-dialog>

		<!--新增二级密码-->
		<el-dialog title="设置二级密码" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 6">
			<el-form label-width="140px" :model="twoPasswordForm" :rules="twoPasswordRules" ref="twoPasswordForm">
				<el-form-item label="请输入密码" prop="password">
					<el-input type="password" v-model="twoPasswordForm.password"></el-input>
				</el-form-item>
				<el-form-item label="请再次输入密码" prop="againPassword">
					<el-input type="password" v-model="twoPasswordForm.againPassword"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="twoPasswordSubmit('twoPasswordForm')">确认</el-button>
			</span>
		</el-dialog>
		<!--验证二级密码-->
		<el-dialog title="验证二级密码" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 7">
			<el-form label-width="130px" :model="twoValidateForm" :rules="twoValidateRules" ref="twoValidateForm">
				<el-form-item label="请输入密码" prop="password">
					<el-input type="password" v-model="twoValidateForm.password"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="ukeyPop = true; ukeyPopNum = 8;">忘记密码</el-button>
				<el-button type="primary" @click="twoPasswordValidate('twoValidateForm')">确认</el-button>
			</span>
		</el-dialog>
		<!--手机验证-->
		<el-dialog title="验证手机" :visible.sync="ukeyPop" size="tiny" v-if="ukeyPopNum == 8">
			<el-form label-width="130px" :model="twoPhoneForm" :rules="twoPhoneRules" ref="twoPhoneForm">
				<el-form-item label="请输入手机号码" prop="phone">
					<el-input v-model="twoPhoneForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="请输入验证码" prop="validate">
					<el-input v-model="twoPhoneForm.validate" style="margin-bottom: 20px;"></el-input>
					<el-button type="" @click="twoPhoneNote" v-text="payStubsResetBtnName" :disabled="disabled"></el-button>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ukeyPop = false;">取消</el-button>
				<el-button type="primary" @click="twoPhoneValidate('twoPhoneForm')">确认</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import '../static/fonts/iconfont.css';
import Style from "style/main.css"; // 公共样式文件
import Util from "script/util.js"; //公共方法
import Axios from "axios";
import { load, login_onclick } from "script/ukey.js"; //公共方法

export default {
  name: "app",
  data() {
    return {
      leftMenuList: [],
      Util: Util,
      userData: {
        hrmRoleId: ""
      },
      ukeyPop: false,
      ukeyPopNum: 0,

      ukeyActiveForm: {
        listkey: "",
        cdkey: ""
      },
      ukeyActiveRules: {
        listkey: [{ required: true, message: "请输入序列号" }],
        cdkey: [{ required: true, message: "请输入激活码" }]
      },

      ukeyPasswordForm: {
        password: "",
        againPassword: ""
      },
      ukeyPasswordRules: {
        password: [
          { required: true, message: "请输入密码" },
          { pattern: /^\d{6}$/, message: "只能输入6位数字" }
        ],
        againPassword: [
          { required: true, message: "请再次输入密码" },
          { pattern: /^\d{6}$/, message: "只能输入6位数字" }
        ]
      },

      ukeyValidateForm: {
        validate: ""
      },
      ukeyValidateRules: {
        validate: [{ required: true, message: "请输入密码" }]
      },

      ukeyId: "",

      // 权限控制
      userMenus: {
        org: false,
        pay: false,
        jur: false,
        att: false,
        care: false,
        zhaopin: false,
        interview: false
      },
      userMenusToggle: 2,

      twoPasswordStateData: false,

      twoPasswordForm: {
        password: "",
        againPassword: ""
      },
      twoPasswordRules: {
        password: [
          { required: true, message: "请输入密码" },
          { pattern: /^\d{4}$/, message: "只能输入4位数字" }
        ],
        againPassword: [
          { required: true, message: "请再次输入密码" },
          { pattern: /^\d{4}$/, message: "只能输入4位数字" }
        ]
      },
      twoValidateForm: {
        password: ""
      },
      twoValidateRules: {
        password: [{ required: true, message: "请输入密码" }]
      },
      twoPhoneForm: {
        phone: "",
        validate: ""
      },
      twoPhoneRules: {
        phone: [
          { required: true, message: "请输入手机号" },
          { pattern: /^\d{0,11}$/, message: "只能输入最多11位数字" }
        ],
        validate: [{ required: true, message: "请输入验证码" }]
      },
      payStubsResetBtnName: "获取验证码",
      disabled: false,
      oa_login: false,
      fullscreenLoading: false,

      defaultActive: "",
      defaultOpeneds: [],
      smallbarShow: true,
      selectedName: "index",
      remainingDays: {
        expireDays: 999,
        status: 1
      }, //试用剩余天数
      appNaveHide: true,
      demoDataCon:2,//1:初始化成功 2:示例数据已被删除.
    };
  },
  created () {
    this.getLeftMenu();
  },
  mounted: function() {
    this.userAjax();
    this.oaLoginShow();
    this.initDemoData();
    load();
    this.$nextTick(function() {
      // this.defaultActive = window.location.hash.substring(1);
      if (window.location.hash.substring(2, 8) == "manage") {
        this.userMenusToggle = 3;
      } else if (window.location.hash.substring(2, 5) == "ATS") {
        this.userMenusToggle = 1;
      }else{
        this.userMenusToggle = 2;
      }
    });
  },
  methods: {
    userMenusToggleChange(item){
      if(item.id == 1){
        this.userMenusToggle = item.id;
        this.$router.push('/ATS/recruitment');
        this.remainingDaysGet();
        this.appNaveHide=true
      }else if(item.id == 2){
        this.userMenusToggle = item.id;
          this.$router.push('/index');
          this.appNaveHide=true
      }else if(item.id == 3){
          this.ukeyPopShow()
      }
    },
    getLeftMenu(){
        var method = "account/qryMenuList",
        param=JSON.stringify({}),
        succeed = (res)=> {
            console.log(res)
            this.leftMenuList = res.data.data;
        };
        this.$webHttp(method, param, succeed, null);
    },
    selectMenu: function(index, indexpath) {
      console.log(index, indexpath);
      // if(!this.smallbarShow){
      // 	this.defaultOpeneds = [];
      // }
    },
    smallbar: function() {
      this.smallbarShow = !this.smallbarShow;
      // if(!this.smallbarShow){
      // 	this.defaultOpeneds = [];
      // }
    },
    userAjax: function() {
      var self = this;
      var method = "user/getUser",
        param = JSON.stringify({}),
        succeed = function(res) {
          if (res.data.data) {
              console.log(res.data.data)
            self.userData = res.data.data;
          }
          localStorage.php_token = res.data.data.php_token;
          localStorage.companyId = self.userData.companyId;
          self.userNavAjax();
          self.twoPasswordState();
          self.remainingDaysGet();
          if(self.Util.ukeyNo||(self.userData&&(self.userData.userNature==1||self.userData.hrmRoleId==1||self.userData.hrmRoleId==4)&&self.userData.hrmRoleId!=6&&self.userData.hrmRoleId!=5&&self.userData.hrmRoleId!=7)){
            self.$router.push('/ATS/recruitment')
            self.userMenusToggle  = '1';
          }else{
            self.$router.push('/index')
            self.userMenusToggle  = '2';
          }
          astart_setLog(res.data.data.companyId, res.data.data.id); //scrm统计埋点
        };
      this.$http(method, param, succeed);
    },
    remainingDaysGet: function() {
      var self = this;
      var method = "login/checkHaveEmailAndUseDate",
        param = JSON.stringify({}),
        succeed = function(res) {
          self.remainingDays.expireDays = Number(res.data.data.expireDays) < 0? 0 : Number(res.data.data.expireDays);
          self.remainingDays.status = res.data.data.status;
          if (
            self.userMenusToggle == 1 &&
            self.remainingDays.expireDays <= 0 &&
            self.remainingDays.status == 0
          ) {
            self.remainingAlert();
          }
        };
      this.$http(method, param, succeed);
    },
    remainingAlert() {
      var self = this;
      this.$alert(
        "欢迎您使用爱聚招聘！该功能的试用时间已到期，如想体验更多更全的功能，您可以联系我们: 17606541988",
        "到期提醒",
        {
          confirmButtonText: "确定",
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
            self.userMenusToggle = 2;
            self.$router.push("/index");
          }
        }
      );
    },
    userNavAjax: function() {
      var self = this;
      var method = "permissionManage/getUserMenusByAjuc",
        param = JSON.stringify({
          companyId: self.userData.companyId,
          loginUserId: self.userData.id
        }),
        succeed = function(res) {
          var arr = res.data.data.userMenus;
          if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].name == "组织人事") {
                self.userMenus.org = true;
              }
              if (arr[i].name == "权限管理") {
                self.userMenus.jur = true;
              }
              if (arr[i].name == "薪资管理") {
                self.userMenus.pay = true;
              }
              if (arr[i].name == "考勤管理") {
                self.userMenus.att = true;
              }
              if (arr[i].name == "公司文化") {
                self.userMenus.care = true;
              }
              if (arr[i].name == "招聘管理") {
                self.userMenus.zhaopin = true;
              }
              if (arr[i].name == "面试管理") {
                self.userMenus.interview = true;
              }
            }
          }
        };
      // this.$http(method, param, succeed);
    },
    // u盾状态判断
    ukeyPopShow: function() {
      if (this.userData && this.userData.moreThan30) {
        if (Util.ukeyNo) {
          this.userMenusToggle = 3;
          this.$router.push("/manage/index");
        } else {
          this.ukeyMethods();
        }
      } else {
        this.userMenusToggle = 3;
        this.appNaveHide = true;
        this.$router.push("/manage/index");
      }
    },
    oaLoginShow: function() {
      var self = this;
      // try {
      //   if (top.location.host == "oa.ecbao.cn") {
      //     self.oa_login = true;
      //   } else {
      //     self.oa_login = false;
      //   }
      // } catch (error) {
      //   self.oa_login = true;
      // }
      if (location.href == "https://aijuhr.com/dist/#/?company") {
        self.userMenusToggle = 3;
      }
    },
    ukeyMethods: function() {
      var self = this;
      login_onclick(function(bConnect, ukeyid) {
        // 是否正常连接
        if (bConnect == 1 && ukeyid) {
          console.log(ukeyid);
          self.ukeyId = ukeyid;
          var method = "usbCheck/userCheckActivation",
            param = JSON.stringify({
              serialNumber: self.ukeyActiveForm.listkey,
              activationCode: self.ukeyActiveForm.cdkey,
              userStatus: 0,
              lockId: self.ukeyId
            }),
            succeed = function(res) {
              switch (res.data.data.code) {
                case "0":
                  self.ukeyPopNum = 5;
                  self.ukeyPop = true;
                  break;
                case "1":
                  self.ukeyPopNum = 2;
                  self.ukeyPop = true;
                  break;
                case "2":
                  self.ukeyPopNum = 4;
                  self.ukeyPop = true;
                  break;
                default:
              }
            };
          self.$http(method, param, succeed);
        } else {
          self.ukeyPopNum = 0;
          self.ukeyPop = true;
        }
      });
    },
    // u盾激活
    ukeyActiveSubmit: function formName(formName) {
      var self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "usbCheck/userActivationUSBKey",
            param = JSON.stringify({
              serialNumber: self.ukeyActiveForm.listkey,
              activationCode: self.ukeyActiveForm.cdkey,
              userStatus: 0,
              lockId: self.ukeyId
            }),
            succeed = function(res) {
              self.$message({
                message: "u盾激活成功!",
                type: "success"
              });
              switch (res.data.data.code) {
                case "0":
                  self.ukeyPopNum = 5;
                  self.ukeyPop = true;
                  break;
                case "1":
                  self.ukeyPopNum = 2;
                  self.ukeyPop = true;
                  break;
                case "2":
                  self.ukeyPopNum = 4;
                  self.ukeyPop = true;
                  break;
                default:
              }
              self.$refs[formName].resetFields();
            };
          this.$http(method, param, succeed);
        }
      });
    },
    // u盾密码设置
    ukeyPasswordEdit: function(formName) {
      var self = this;
      if (
        self.ukeyPasswordForm.password != self.ukeyPasswordForm.againPassword
      ) {
        self.$message({
          message: "二次密码不一致",
          type: "warning"
        });
        return false;
      }

      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "usbCheck/userActivationSecondPassword",
            param = JSON.stringify({
              secondPassword: self.ukeyPasswordForm.password,
              serialNumber: self.ukeyActiveForm.listkey,
              activationCode: self.ukeyActiveForm.cdkey,
              userStatus: 0,
              lockId: self.ukeyId
            }),
            succeed = function(res) {
              self.$message({
                message: "u盾密码设置成功!",
                type: "success"
              });
              self.ukeyPopNum = 5;
              self.ukeyPop = true;
              self.$refs[formName].resetFields();
            };
          this.$http(method, param, succeed);
        }
      });
    },
    // u盾密码验证
    ukeyPasswordSubmit: function(formName) {
      var self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "usbCheck/userCheckSecondPassword",
            param = JSON.stringify({
              secondPassword: self.ukeyValidateForm.validate,
              serialNumber: self.ukeyActiveForm.listkey,
              activationCode: self.ukeyActiveForm.cdkey,
              userStatus: 0,
              lockId: self.ukeyId
            }),
            succeed = function(res) {
              self.$message({
                message: "u盾密码验证成功!",
                type: "success"
              });
              self.ukeyPop = false;
              self.$refs[formName].resetFields();
              self.$router.push("/manage/index");
              self.userMenusToggle = 3;
            };
          this.$http(method, param, succeed);
        }
      });
    },

    // 二级密码状态判断
    twoPasswordState: function() {
      var self = this;
      var method = "spwSalaryPay/toSetOrInputPwd",
        param = JSON.stringify({
          loginUserId: self.userData.id
        }),
        succeed = function(res) {
          self.twoPasswordStateData =
            res.data.data.isHaveSecondPwd == 1 ? false : true;
        };
      this.$http(method, param, succeed);
    },

    routerPayStubs: function() {
      if (this.twoPasswordStateData) {
        // this.$router.push('/pay/payStubs');
        // 设置二级密码
        this.ukeyPopNum = 6;
        this.ukeyPop = true;
      } else {
        // 验证二级密码
        this.ukeyPopNum = 7;
        this.ukeyPop = true;
      }
    },

    // 设置二级密码
    twoPasswordSubmit: function(formName) {
      var self = this;
      if (self.twoPasswordForm.password != self.twoPasswordForm.againPassword) {
        self.$message({
          message: "二次密码不一致",
          type: "warning"
        });
        return false;
      }
      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "spwSalaryPay/updateSecondaryPwd",
            param = JSON.stringify({
              id: self.userData.id,
              secondaryPwd: self.twoPasswordForm.password
            }),
            succeed = function(res) {
              self.$message({
                message: "二级密码设置成功!",
                type: "success"
              });
              self.$refs[formName].resetFields();
              self.ukeyPopNum = 7;
              self.ukeyPop = true;
              self.twoPasswordStateData = false;
            };
          this.$http(method, param, succeed);
        }
      });
    },

    // 验证二级密码
    twoPasswordValidate: function(formName) {
      var self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "spwSalaryPay/checkSecondPwd",
            param = JSON.stringify({
              id: self.userData.id,
              secondaryPwd: self.twoValidateForm.password
            }),
            succeed = function(res) {
              self.$message({
                message: "二级密码验证成功!",
                type: "success"
              });
              self.$refs[formName].resetFields();
              self.ukeyPop = false;
              // self.ukeyPopNum = 0;
              self.$router.push("/pay/payStubs");
            };
          this.$http(method, param, succeed);
        }
      });
    },

    // 手机验证
    twoPhoneNote: function() {
      var self = this;
      if (self.twoPhoneForm.phone.length != 11) {
        self.$message({
          message: "请输入正确的手机号",
          type: "warning"
        });
      } else {
        var method = "spwSalaryPay/sendSMSOfCheckCode",
          param = JSON.stringify({
            setPhone: self.twoPhoneForm.phone
          }),
          succeed = function(res) {
            self.timer(60);
          };
        this.$http(method, param, succeed);
      }
    },
    timer: function(time) {
      var self = this;
      time--;
      if (time > 0) {
        console.log(time);
        self.disabled = true;
        setTimeout(function() {
          self.timer(time);
        }, 1000);
      } else {
        self.disabled = false;
      }
      self.payStubsResetBtnName = time > 0 ? time + "s 后重新获取" : "获取验证码";
    },
    twoPhoneValidate: function(formName) {
      var self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "spwSalaryPay/validateCheckCode",
            param = JSON.stringify({
              phone: self.twoPhoneForm.validate,
              checkCode: self.twoPhoneForm.validate
            }),
            succeed = function(res) {
              self.$refs[formName].resetFields();
              self.ukeyPopNum = 6;
              self.ukeyPop = true;
            };
          this.$http(method, param, succeed);
        }
      });
    },
    logOut(command) {
      if (command != "logOut") {
        return;
      }
      var self = this;
      var url = "https://aijuhr.com/hrm/login.do";
      var method = "user/getUser";
      var param = JSON.stringify({
        flag: 1
      });
      var sucessd = function(res) {
        top.location.href = "https://aijuhr.com/login";
      };
      self.$sendHttp(url, method, param, sucessd);
    },
    navPersonal(){
      this.$router.push({
          name:'personal',
          params:{
            companyInfoSign:true
          }
        })
    },
     navPersonal2(){
      this.$router.push({
          name:'personal',
          params:{
            companyInfoSign2:true
          }
        })
    },
    upgrade(){
      window.open('https://aijuhr.com/price')
    },
    //初始化数据
    initDemoData(){
      let self=this;
      // let loadingInstance=self.$loading({fullscreen: true,text:'系统正在初始化示例数据,请稍候...'});
      let method="demoData/initDemoData",
          param=JSON.stringify({}),
          succeed=function(res){
            // loadingInstance.close();
            self.demoDataCon=res.data.data;
          },
          c=function(){
            // loadingInstance.close();
          };
      self.$http(method,param,succeed,c);
    },
    openMpkf(){
      window.open('https://mpkf.weixin.qq.com')
    },   
  },
  watch: {
    $route(to, form) {
      this.defaultActive = to.path;
      if(to.name=='personal'){
        this.appNaveHide = false;
      }else{
        this.appNaveHide = true;
      }
    }
  },
  //  components: {
  //     LeftMenu
  // }
};
</script>

<style>
#wxMask {
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
#ewmWrap {
  border-radius: 5px;
  width: 500px;
  height: 430px;
  background: #fff;
  margin: 50px auto;
  text-align: center;
}
#ewmWrap img {
  margin-top: 3px;
  width: 488px;
  /* border: 1px dotted gray; */
}
img#ewm {
  width: 170px;
  margin-top: 17px;
}
#ewmWrap p {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(31, 45, 61, 1);
  margin-top: 20px;
}
#remainingDays {
  position: absolute;
  width: 50px;
  height: 16px;
  background: #f96197;
  text-align: center;
  line-height: 16px;
  color: #fff;
  font-size: 10px;
  top: 0px;
  left: 100px;
  padding: 0;
  border-radius: 2px;
}
.app_nav_access span:nth-child(1) {
  position: relative;
}
.app_nav_hide{
  display: none;
}
.app_right_p{
  padding: 70px 20px 0px 0px!important;
}
#upgrade{
  position: absolute;
  right: 150px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
#upgrade img{
  vertical-align: text-bottom;
  margin-right: 5px;
}
.el-loading-mask.is-fullscreen{
  display: none;
}
</style>

