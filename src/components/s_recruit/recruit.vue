<template>
  <div id="s_recruit" v-cloak>
    <!--二维码分享-->
    <div class="digTip">
      <div class="content">
        <div class="img">
          <img :src="wzpcomeImg" alt="">
        </div>
        <div class="des">微信扫码分享或</div>
      </div>
      <el-form :inline="true" :model="formShare" class="share">
        <el-form-item>
          <el-input v-model="formShare.eLink" id="copyLinkInput"></el-input>
        </el-form-item>

        <el-button type="primary" ref="btn" @click="copyLink" class="copy">复制链接</el-button>

      </el-form>
    </div>
    <!--公司logo上传-->
    <div class="s_recruit">
      <!--logo-->
      <div class="s_logo" v-show="s_log">
        <div class="edit">
          <el-button type="primary" icon="edit" class="icon_edit" @click="toggle">编辑</el-button>
          导航栏



        </div>
        <div class="s_img" v-if="s_log_back">
          <img :src="s_log_back" alt="" class="img">

        </div>
      </div>

      <!--上传logo-->
      <div class="sc_logo" v-show="!s_log">

        <el-form ref="sc_logo_form" :model="sc_logo_form" label-width="80px">

          <el-form-item>
            <div @click="toggleShow">
              <el-upload
                class="logo_upload"
                :show-file-list="false"
                :disabled="true"
                :action="upLogoUrl"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="sc">上传logo</div>
                <div slot="tip" class="el-upload__tip">上传公司logo,建议尺寸160X46</div>
              </el-upload>
            </div>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       :url="upLogoUrl"
                       v-model="show"
                       :width="160"
                       :height="46"
                       :params="params"
                       :headers="headers"
                       img-format="png"></my-upload>
          </el-form-item>
          <el-form-item>
            <el-input v-model="sc_logo_form.name" placeholder="请填写您的公司网址(http://)" style="width: 467px"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="sc_logo_save">保存</el-button>
            <el-button @click="toggle_b">取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>

    <!--banner-->
    <div class="s_banner" v-show="s_banner">
      <div class="edit">
        <el-button type="primary" icon="edit" class="icon_edit" @click="s_toggle">编辑</el-button>
       banner广告

      </div>
      <div class="s_banner_img" v-if="img_list_1">
        <img :src="img_list_1" alt="">
        <div class="content-text">
          <div class="title">{{form.title}}</div>
          <div class="des">{{form.subTitle}}</div>
        </div>
      </div>

    </div>

    <!--上传banner-->
    <div class="sc_banner" v-show="!s_banner">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item>
          <el-upload
            class="avatar-uploader1"
            :action="upLogoUrl"
            :data="params"
            :show-file-list="false"
            :on-preview="bannerPreview"
            :on-remove="handleRemove2"
            :on-success="banner_success">
            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传banner照片更能吸引候选人投递！建议上传横向尺寸：上传1920X478像素</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="标题" class="title">
          <el-input v-model="form.title" style="width: 467px"></el-input>
        </el-form-item>

        <el-form-item label="副标题" class="subTitle">
          <el-input v-model="form.subTitle" style="width: 467px"></el-input>
        </el-form-item>

        <el-form-item style="text-align: center" class="btn">
          <el-button type="primary" @click="sc_banner_save">保存</el-button>
          <el-button @click="s_toggle_b">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="com_edit" v-show="s_company_click">
      <div class="edit">
        <el-button type="primary" icon="edit" class="icon_edit" @click="sc_toggle">编辑</el-button>
        公司信息

      </div>
    </div>
    <!--公司简介-->
    <div class="s_company" v-show="!s_company">

      <div class="c_img" v-if="bigLogo"><img :src="bigLogo" alt="">
      </div>

      <div class="text">{{form.company_name}}</div>
      <p class="text1">{{form.company_p}}</p>
      <p class="text2">{{form.company_address}}</p>
      <div class="line"></div>
      <el-row class="s_row">
        <el-col :span="8">
          <div class="grid-content bg-purple"><i
            class="iconfont"></i><span>{{options[people - 1] ? options[people - 1].label : ''}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <i></i><span>{{s_options[kindt - 1] ? s_options[kindt - 1].label : ''}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"><i></i><span>{{form.website}}</span></div>
        </el-col>
      </el-row>
    </div>

    <div class="sc_company" v-show="s_company">
      <div class="sc_top">
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item>
            <el-upload
              class="avatar-uploader"
              :action="upLogoUrl"
              :data="params"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>

          <el-form-item>
            <el-input v-model="form.company_name" style="width: 467px" placeholder="*(必填)  请填写您的公司名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.company_p" style="width: 467px" placeholder="*(必填) 请用一句话描述公司价值观(最多15个字)"
                      :maxlength="15"></el-input>
          </el-form-item>

          <el-form-item class="form_address">
            <el-cascader
              :options="workCityLists"
              v-model="form.company_addresses"
              @change="change"
              placeholder="公司地址"
            ></el-cascader>
          </el-form-item>
          <!--<el-form-item>-->
          <!--<el-input v-model="form.company_address" style="width: 467px" placeholder="*(必填)  请填写公司详细地址"></el-input>-->
          <!--</el-form-item>-->

          <el-row class="s_row">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-select v-model="people">
                    <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-select v-model="kindt">
                    <el-option v-for="item in s_options" :label="item.label" :value="item.value"></el-option>
                  </el-select>

                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-select v-model="form.website" @change="website_s">
                    <el-option v-for="item in domain" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>

              </div>
            </el-col>
          </el-row>

          <el-form-item style="text-align: center;margin-top: 30px;">
            <el-button type="primary" @click="sc_company_save">保存</el-button>
            <el-button @click="sc_toggle_b">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--招聘职位-->
    <div class="s_recruit" v-show="s_recruit">
      <div class="edit">
        <el-button type="primary" icon="edit" class="icon_edit" @click="zp_toggle">编辑</el-button>
        {{form.recruit}}


      </div>
      <el-row :gutter="20" v-show="wzpPositionList.length" class="s_list">
        <!--<div class="title">{{form.recruit}}</div>-->
        <el-col :span="8" v-for="item in wzpPositionList">
          <div class="grid-content bg-purple">
            <div class="content">
              <p class="des">{{item.name}}</p>
              <span class="text">在招职位</span>
              <span class="num">{{item.recruitmentNum}}</span>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>

    <div class="sc_recruit" v-show="!s_recruit">
      <el-form ref="form" :model="form" label-width="80px">

        <div class="title">

          <el-form-item label="请输入模块名称">
            <el-input v-model="form.recruit" style="width: 366px"></el-input>
          </el-form-item>
        </div>

        <div class="bottom">
          <el-form-item label="职位">
            <!-- <el-select v-model="positionSelect" multiple placeholder="请选择" @change="slectMore">
              <el-option
                v-for="item in options_all"
                :key="item.id"
                :label="item.positionName"
                :value="item.id">
              </el-option>
            </el-select> -->

            <el-tag type="primary" class="recommend_tag" v-for="choose in positionSelect" :key="choose.id">{{choose.positionName}}</el-tag>
            <el-button type="warning" size="small" @click="positionDialogVisible=true" style="marrgin-top:20px;"> 编辑 </el-button>

          </el-form-item>
          <el-form-item label="职位搜索" style="margin-left: 40px;">
            <el-switch on-text="" off-text="" v-model="form.isSearch"></el-switch>
          </el-form-item>


        </div>
        <div class="sc_btn">
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="sc_recruit_save">保存</el-button>
            <el-button @click="zp_toggle_b">取消</el-button>
          </el-form-item>
        </div>
      </el-form>


    </div>

    <!--公司介绍-->
    <div class="intro_comp" v-show="intro_comp">
      <div class="edit">
        <el-button type="primary" icon="edit" class="icon_edit" @click="intro_toggle">编辑</el-button>
        {{form.intro}}







      </div>
      <div class="intro_content" v-show="content">
        <div class="title"></div>
        <div class="text" v-html="content" id="text_p">
        </div>
      </div>
    </div>


    <div class="c_intro_comp" v-show="!intro_comp">

      <el-form ref="form" :model="form" label-width="80px">

        <div class="title">
          <el-form-item class="title_content" label="请输入模块名称">
            <el-input v-model="form.intro" style="width: 366px"></el-input>
          </el-form-item>
        </div>

        <div class="editor">
          <el-form-item prop="content">
            <quill-editor
              class="quilleditor"
              v-model="content"
              ref="myTextEditor"
              :options="editorOption"
              :action="upLogoUrl"
              :data="params"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
              @ready="onEditorReady($event)">

            </quill-editor>
          </el-form-item>
          <div class="sc_btn2">
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="c_intro_save">保存</el-button>
              <el-button @click="intro_toggle_b">取消</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>

    </div>

    <el-dialog
      title="提示"
      :visible.sync="positionDialogVisible"
      size="tiny">
      <el-transfer
        v-model="positionSelectKey"
        filterable
        :titles="['未选择', '已选择']"
        :data="positionAll">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="choose()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 文件上传 -->
    <el-upload
    class="upload-demo"
    style="display:none"
    :action="action"
    :data="param"
    :on-success="uploadSuccessd"
    >
        <el-button size="small" type="primary" id="imgInput">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
  import Util from '../../script/util.js';
  import md5 from 'js-md5';
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  import allcity from '../../script/allcity';

  export default {
    data() {
      return {
        //上传logo
        s_log: true,
        s_log_back: '',
        sc_logo_form: {
          name: 'http://'
        },
        show: false,
        headers: {},
        upLogoUrl: Util.uploadURLForCommon,
        ids: 0,
        //上传banner
        s_banner: true,
        img_list: [],
        img_list_1: '',
        imageUrl3: '',
        bannerIds: 0,
        //公司大logo
        bigLogo: '',
        s_company: false,
        imageUrl: '',
        imageUrl2: '',
        wzpcomeImg: '',
        headImgId: 0,
        //公司介绍
        s_company_click: true,
        s_recruit: true,
        options_all: [],
        domain: [],
        intro_comp: true,
        editorOption: {},
        selection: 0,//富文本focus位置
        selectionLength: 0,//富文本focus长度
        options: [{
          value: 1,
          label: '0-50人'
        }, {
          value: 2,
          label: '50-100人'
        }, {
          value: 3,
          label: '100-500人'
        }, {
          value: 4,
          label: '500-1000人'
        }, {
          value: 5,
          label: '1000人以上'
        }],
        people: 1,
        kindt: 7,
        //公司状态 1:天使轮 2:A轮 3:B轮 4:C轮 5:D轮 6:上市 7:未融资
        s_options: [{
          value: 1,
          label: '天使轮'
        }, {
          value: 2,
          label: 'A轮'
        }, {
          value: 3,
          label: 'B轮'
        }, {
          value: 4,
          label: 'C轮'
        }, {
          value: 5,
          label: 'D轮'
        }, {
          value: 6,
          label: '上市'
        }, {
          value: 7,
          label: '未融资'
        }],
        fileList: [{
          name: '',
          url: ''
        }],
        companyId: '',
        formShare: {
          eLink: ''
        },
        form: {
          title: '',
          subTitle: '',
          company_name: '',
          company_p: '',
          company_addresses: [],
          recruit: '招聘职位',
          choose: '',
          isSearch: false,
          intro: '公司介绍',
          website: ''
        },
        s_id: 0,
        //公司介绍
        content_show: false,
        content: '',
        wzpId: 0,
        wzpCompanyid: 0,
        rec_hidden: false,
        //招聘分类
        wzpPositionList: [],
        params: {
          param: JSON.stringify({businessId: 14, fId: -1}),
          sign: md5('method' + "fileUpload/insertFileRecord" + "param" + JSON.stringify({
              businessId: 14,
              fId: -1
            }) + "ecbao")
        },
        dialogVisible2: true,
        positionDialogVisible: false,//职位选择
        positionSelect: [],
        positionSelectKey: [],
        positionAll:[],
        workCityLists: [],
        item: '',

        //文件上传参数
        action:Util.uploadURLForCommon,
        param:{
            param:JSON.stringify({businessId:20,fId:-1}),
            sign:this.$md5('fileUpload/insertFileRecord',JSON.stringify({businessId:20,fId:-1}))
        }
      }
    },
    methods: {
      choose(){
        var self = this;
        self.positionSelect = [];
        self.positionSelectKey.forEach(function(item1){
          self.positionAll.forEach(function(item2){
            if(item1==item2.key){
              self.positionSelect.push(item2);
            }
          })
        });
        self.positionDialogVisible =false;
      },
      toggle() {
        this.s_log = false
      },
      toggleShow(){
        this.show = true
      },
      s_toggle() {
        this.s_banner = false
        this.getBanner_zw_Info()
      },
      sc_toggle() {
        this.s_company_click = false
        this.s_company = true
        this.getCompanyInfo()
        this.getAllCompanyDomain()
      },
      zp_toggle() {
        this.s_recruit = false
        this.getSelect()
        this.getBanner_zw_Info()
      },
      intro_toggle() {
        this.intro_comp = false
        this.getCompanyIntr()
      },
      toggle_b() {
        this.s_log = true
        this.imageUrl = ''
        this.getIndexInfo()
      },
      s_toggle_b() {
        this.s_banner = true
        this.getIndexInfo()
      },
      sc_toggle_b() {
        this.s_company = false
        this.s_company_click = true
        this.getIndexInfo()

      },
      zp_toggle_b() {
        this.s_recruit = true
      },
      intro_toggle_b() {
        this.intro_comp = true
        this.getCompanyIntr()
      },
      website_s(val) {
        this.form.website = val
      },
      //上传logo
      sc_logo_success(res, file) {
//
//        this.s_log_back = file.url
//        this.imageUrl = file.url
      },
      sc_logo_save() {
        var _this = this;

        var method = "wzpCompany/updateLogo";
        var param = JSON.stringify({
          logoId: _this.ids,
          companyUrl: _this.sc_logo_form.name
        })
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            setTimeout(() => {
              _this.s_log = true
            }, 1000)
          }
        }
        _this.$http(method, param, successd);
      },
      cropSuccess(imgDataUrl, field){
        this.s_log_back = imgDataUrl
        this.imageUrl = imgDataUrl

      },
      cropUploadSuccess(jsonData, field){
        if (jsonData.code == 0) {
          this.ids = jsonData.data.ids
        }
      },
      cropUploadFail(status, field){
        console.log(status);
        console.log('field: ' + field);
      },
      //banner上传
      bannerPreview(file, fileList) {
        console.log(file, fileList)
      },
      handleRemove2(file, fileList) {
        console.log(file, fileList)
//        var _this = this;
//        var method = "fileUpload/delFileRecord";
//        var param = JSON.stringify({id: file.response.data.ids});
//        var successd = function (res) {
//          var _this = this
//          for (var i = 0; i < _this.bannerIds.length; i++) {
//            if (_this.bannerIds[i] == id) {
//              _this.bannerIds.splice(i, 1)
//            }
//          }
//        }
//        _this.$http(method, param, successd);
      },
      banner_success(res, file, fileList) {
        console.log(res, file, fileList)
        this.imageUrl3 = file.url
        this.img_list_1 = file.url
        if (res.code == 0) {
          this.bannerIds = res.data.ids
          if (this.params.param.businessId < 5) {
            this.bannerIds.pop();
          }
        }
      },
      sc_banner_save() {
//        if (this.bannerIds == '') {
//          alert('最少上传一张背景图片')
//          return
//        }
        var _this = this;

        var method = "miniRecruit/updateWzpBanner";
        var param = JSON.stringify({

          miniRecruit: {
            bannerIds: _this.bannerIds,
            companyId: _this.companyId,
            creatorId: 0,
            customName1: _this.form.recruit,
            customName2: _this.form.intro,
            id: _this.s_id,
            isSearch: _this.form.isSearch ? 1 : 0,
            positionIds: String(_this.positionSelect),
            subTitle: _this.form.subTitle,
            title: _this.form.title,
            updateTime: null,
            wzpCompanyId: _this.wzpCompanyid
          }
        })
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data)
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            setTimeout(() => {
              _this.s_banner = true
            }, 1000)
          }
        }
        _this.$http(method, param, successd);
      },
      //大logo上传
      handleAvatarSuccess(res, file) {
        console.log(res, file)
        this.headImgId = res.data.ids
        this.bigLogo = file.url
        this.imageUrl2 = file.url
      },
      beforeAvatarUpload(file) {
//        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
//
//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      onEditorBlur(editor) {
//        console.log('editor blur!', editor)
        console.log(editor.getSelection());
      },
      onEditorFocus(editor) {
//        console.log('editor focus!', editor)
        this.selection = editor.getSelection().index;
        this.selectionLength = editor.getSelection().length;
      },
      onEditorReady(editor) {
      },
      onEditorChange({editor, html, text}) {
        // console.log('editor change!', editor, html, text)
//        console.log(editor.getSelection());
        if (editor.getSelection()) {
          this.selection = editor.getSelection().index;
          this.selectionLength = editor.getSelection().length;
          this.content = html
        }
      },
      //查询公司头像信息
      getCompanyInfo() {
        var _this = this;
        var method = "wzpCompany/getWzpCompanyInfo";
        var param = JSON.stringify({});

        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data)
            _this.sc_logo_form.name = res.data.data.companyUrl
            _this.bigLogo = _this.imageUrl2 = res.data.data.companyHeadImg
            _this.people = res.data.data.dimensions
            _this.kindt = res.data.data.status
            _this.form.website = res.data.data.companyDomainId
            _this.form.company_p = res.data.data.companyValues
            _this.form.company_name = res.data.data.name
//            _this.form.company_address = res.data.data.address
          }
        }
        _this.$http(method, param, successd);
      },
      //更新公司头像信息
      sc_company_save() {
        if (!this.form.company_name) {
          alert('请您输入公司姓名')
          return
        } else if (!this.form.company_p) {
          alert('请您输入公司价值观')
          return
        } else if (!this.item) {
          alert('请您选择公司地址')
          return
        }
        var _this = this;
        var method = "wzpCompany/updateHeadImgInfo";

        var param = JSON.stringify({
          wzpCompany: {
            id: _this.wzpCompanyid,
            headImgId: _this.headImgId,
            name: _this.form.company_name,
            companyValues: _this.form.company_p,
            address: _this.item,
            companyDomainId: _this.form.website,
            dimensions: _this.people,
            status: _this.kindt
          }
        })
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.form.website = res.data.data
            _this.getIndexInfo()
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            setTimeout(() => {
              _this.s_company = false
              _this.s_company_click = true
            }, 1000)
          }
        }
        _this.$http(method, param, successd);
      },
      //查询banner模块信息和招聘模块的信息
      getBanner_zw_Info() {
        var _this = this;
        var method = "miniRecruit/getMiniRecruitInfo";
        var param = JSON.stringify({
          id: _this.wzpId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.img_list_1 = res.data.data.fileInfoList ? res.data.data.fileInfoList[0].url : '';
            _this.imageUrl3 = res.data.data.fileInfoList ? res.data.data.fileInfoList[0].url : '';
            _this.form.title = res.data.data.miniRecruit.title
            _this.form.subTitle = res.data.data.miniRecruit.subTitle
            _this.form.recruit = res.data.data.miniRecruit.customName1
            _this.form.isSearch = res.data.data.miniRecruit.isSearch === 1 ? true : false
            _this.positionSelect = res.data.data.positionList
            _this.positionSelectKey = _this.fileterSelect(res.data.data.positionList)
          }
        }
        _this.$http(method, param, successd);
      },
      //过滤
      fileterSelect(item) {
        let arr = []
        for (var i = 0; i < item.length; i++) {
          arr[i] = item[i].id
        }
        return arr
      },
      //查询招聘模块下拉信息
      getSelect() {
        var _this = this;
        var method = "miniRecruit/getAllRecruitPosition";
        var param = JSON.stringify({
          companyId: _this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.options_all = res.data.data
            _this.optionsTransfer(res.data.data)
          }
        }
        _this.$http(method, param, successd);
      },
      optionsTransfer(obj){
          obj.forEach(function(item){
          item.key=item.id;
          item.label=item.positionName;
          item.name=item.positionName;
        })
        this.positionAll = obj;
      },
      //招聘职位
      slectMore(val) {
        this.positionSelect = val
      },
      getkey(val){
        var arr = [];
          val.forEach(function(item){
              arr.push(item.key)
          })
          return String(arr)
      },
      //更新微招聘招聘职位信息
      sc_recruit_save() {
        var _this = this;
        var method = "miniRecruit/updateWzpPositionVacant";
        var param = JSON.stringify({
          miniRecruit: {
            bannerIds: _this.bannerIds,
            companyId: _this.companyId,
            createTime: "",
            creatorId: 0,
            customName1: _this.form.recruit,
            customName2: _this.form.intro,
            id: _this.s_id,
            isSearch: _this.form.isSearch ? 1 : 0,
            posiPublishTime: "",
            positionIds: _this.getkey(_this.positionSelect),
            subTitle: _this.form.subTitle,
            title: _this.form.title,
            updateTime: null,
            wzpCompanyId: _this.wzpCompanyid
          }
        })
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data)
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            _this.getIndexInfo()
            _this.rec_hidden = true
            _this.s_recruit = true
          }
        }
        _this.$http(method, param, successd);
      },
      //查询公司领域列表
      getAllCompanyDomain() {
        var _this = this;
        var method = "miniRecruit/getAllCompanyDomain";
        var param = JSON.stringify({});
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data)
            _this.domain = res.data.data
          }
        };
        _this.$http(method, param, successd);
      },
      //查询公司介绍
      getCompanyIntr() {
        var _this = this;
        var method = "wzpCompany/getWzpCompanyDescription";
        var param = JSON.stringify({
          wzpCompanyId: _this.wzpCompanyid
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.form.intro = res.data.data.customName2;
            _this.content = res.data.data.description
          }
        };
        _this.$http(method, param, successd);
      },
      //更新公司介绍模块
      c_intro_save() {

        var _this = this;
        var method = "wzpCompany/updateWzpCompanyDescription";
//        var method = "updateCompany/updateWzpCompanyDescription";
        var param = JSON.stringify({
          customName2: _this.form.intro,
          description: _this.content
        })
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            setTimeout(() => {
              _this.intro_comp = true
              _this.content_show = true
            }, 1000)
          }
        }
        _this.$http(method, param, successd);
      },
      //微招聘首页信息
      getIndexInfo() {
        var _this = this;
        var method = "miniRecruit/getWzpIndexInfo";
        var param = JSON.stringify({});
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data)
            //微招聘公司id
            _this.wzpCompanyid = res.data.data.wzpCompany.id
            _this.headImgId = res.data.data.wzpCompany.headImgId
            //微招聘id
            _this.wzpId = res.data.data.miniRecruit.id
            _this.s_log_back = res.data.data.wzpCompany.logoUrl
            _this.ids = res.data.data.wzpCompany.logoId
            _this.imageUrl = _this.s_log_back
            _this.sc_logo_form.name = res.data.data.wzpCompany.companyUrl
            _this.content = res.data.data.wzpCompany.description
            _this.bigLogo = res.data.data.wzpCompany.companyHeadImg
            _this.wzpPositionList = res.data.data.recruitmentCountList.result

            _this.form.subTitle = res.data.data.miniRecruit.subTitle
            _this.form.title = res.data.data.miniRecruit.title
            _this.companyId = res.data.data.miniRecruit.companyId
            _this.form.title = res.data.data.miniRecruit.title
            _this.s_id = res.data.data.miniRecruit.id
            _this.bannerIds = res.data.data.miniRecruit.bannerIds

            _this.form.recruit = res.data.data.miniRecruit.customName1
            _this.form.intro = res.data.data.miniRecruit.customName2

            _this.form.company_p = res.data.data.wzpCompany.companyValues
            _this.form.company_address = res.data.data.wzpCompany.address
            _this.form.company_name = res.data.data.wzpCompany.name

            _this.sc_logo_form.name = res.data.data.wzpCompany.companyUrl
            _this.bigLogo = res.data.data.wzpCompany.companyHeadImg
            _this.people = res.data.data.wzpCompany.dimensions
            _this.kindt = res.data.data.wzpCompany.status
            _this.form.website = res.data.data.wzpCompany.domain
            _this.img_list_1 = res.data.data.fileInfoList ? res.data.data.fileInfoList[0].url : _this.imageUrl3

          }
        }
        _this.$http(method, param, successd);
      },
      wzpCome() {
        var _this = this;
        var method = "recruitPosition/createMicroRecruit";
        var param = JSON.stringify({});
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.dialogVisible2 = true;
            _this.wzpcomeImg = res.data.data[0];
            _this.formShare.eLink = res.data.data[1];
          }
        }
        _this.$http(method, param, successd);
      },
      copyLink() {
        var self = this;
        document.getElementById("copyLinkInput").select();
        document.execCommand("Copy");
        self.$message({
          message: "复制成功",
          type: 'success'
        })
      },
      //处理省市
      transitionCityLists() {
        let provinces = allcity.province,
          citys = allcity.city;
        for (let j = 0; j < provinces.length; j++) {
          let item = provinces[j]
          item.value = item.name
          item.label = item.name
          item.children = citys[item.id]
        }
        for (let k in citys) {
          let city = citys[k]
          for (let i = 0; i < city.length; i++) {
            let item = city[i]
            item.value = item.name
            item.label = item.name
          }
        }
        this.workCityLists = provinces;

      },

      change(item) {
        this.item = String(item[1])
      },
      imgHandler(status){
        console.log(status);
        if(status){
          document.getElementById('imgInput').click();
        }
      },
      uploadSuccessd(res,file,fileList){
          var self=this;
          if(res.code==0){
              let url=res.data.fileInfoList[0].url;
              console.log(self.selection);
              this.$refs.myTextEditor.quill.insertEmbed(self.selection,'image',url)
          }else{
              this.$message.error(res.message);
          }
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.img_list_1})`
      },
    },
    created() {
      this.getIndexInfo()
      this.wzpCome()
      this.transitionCityLists()
    },
    mounted(){
      this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
    },
    components: {
      myUpload
    }
  }
</script>
<style scoped>

  #s_recruit {
    position: relative;
  }
  #s_recruit .com_edit .edit {
    width: 98%;
    height: 50px;
    line-height: 50px;
    color: rgb(153, 169, 191);
    padding: 7px 0px 7px 21px;
    background: #fff;
    text-align: left;
    margin-top: 20px;
  }

  #s_recruit .com_edit .edit .icon_edit {
    margin-right: 20px;
  }

  #s_recruit .digTip {
    position: fixed;
    right: 0;
    top: 50px;
    width: 144px;
    height: 222px;
    z-index: 1000;
    background: #eee;
  }

  #s_recruit .digTip .content {
    box-sizing: border-box;
    text-align: center;
    position: relative;
  }

  #s_recruit .digTip .content img {
    display: inline-block;
    width: 105px;
    height: 105px;
    margin-top: 20px;
  }

  #s_recruit .digTip .share .el-button {
    position: absolute;
    bottom: 19px;
    left: 50%;
    margin-left: -45px;
  }


  #s_recruit .digTip .share .el-form-item__content .el-input {
    opacity: 0;

  }

  #s_recruit .tips2 .el-dialog--small {
    width: 428px;
    height: 404px;
    box-sizing: border-box;
    top: 50% !important;
    margin-top: -212px;
  }

  #s_recruit .tips2 .el-dialog--small .el-dialog__body {
    height: 424px;
  }

  #s_recruit .tips2 .el-dialog--small .content {
    text-align: center;
  }

  #s_recruit .tips2 .el-dialog--small .content .img {
    display: inline-block;
    width: 210px;
    height: 210px;
  }

  #s_recruit .tips2 .el-dialog--small .content .img img {
    width: 100%;
    height: 100%;
  }

  #s_recruit .tips2 .el-dialog--small .content .title {
    margin: 51px 0 22px 0;
    font-size: 20px;
    color: #1F2D3D;
    font-weight: 800;
  }

  #s_recruit .tips2 .el-dialog--small .content .des {
    text-align: left;
    margin-top: 26px;
    margin-bottom: 15px;
    color: #475669;
    font-size: 14px;
  }

  #s_recruit .tips2 .el-dialog--small .share .el-form-item {
    margin-bottom: 0;
    margin-right: 0;
  }

  #s_recruit .tips2 .el-dialog--small .share .el-form-item .el-form-item__content .el-input {
    width: 284px;
  }

  #s_recruit .tips2 .el-dialog--small .share .el-form-item .el-form-item__content .el-input .el-input__inner {
    border: 1px solid #5AA2E7;
  }

  #s_recruit .tips2 .el-dialog--small .share .el-form-item .el-form-item__content .el-button:hover {
    background: #46BE8A;
  }

  #s_recruit .s_logo {
    width: 100%;
    height: 64px;
    background: #FFFFFF;
    display: flex;
    margin-bottom: 20px;
    position: relative;
  }

  #s_recruit .s_logo .edit {
    position: absolute;
    width: 99%;
    height: 50px;
    line-height: 50px;
    padding: 7px 0 7px 21px;
    color: #99A9BF;
  }

  #s_recruit .s_logo .edit .icon_edit {
    margin-right: 19px;
  }

  #s_recruit .s_logo .s_img {
    width: 160px;
    height: 43px;
    margin: auto;
    position: relative;
  }

  #s_recruit .s_logo .s_img .s_icon {
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 20px;
    right: -38px;
    top: 0;
    font-size: 13px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }

  #s_recruit .s_logo .s_img .img {
    width: 100%;
    height: 100%;
  }

  #s_recruit .sc_logo {
    height: 100%;
    background: #FFFFFF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  #s_recruit .sc_logo .logo_upload .el-icon-plus {
    width: 160px;
    height: 46px;
    line-height: 46px;
    border: 1px dashed #E5E9F2;
    margin: 0 auto;
    color: #8C939D;
    font-size: 25px;
  }

  #s_recruit .sc_logo .logo_upload .sc {
    display: inline-block;
    font-size: 14px;
    color: #475669;
    margin-right: 16px;
    float: left;
    margin-top: 9px;
  }

  #s_recruit .sc_logo .logo_upload .avatar {
    display: inline-block;
    width: 160px;
    height: 46px;
  }

  #s_recruit .sc_banner {
    padding-top: 18px;
    background: #FFFFFF;
    height: 100%;
    padding-bottom: 24px;
    text-align: center;
    margin-top: 18px;
  }

  #s_recruit .sc_banner .el-form .title {
    width: 50%;
    display: inline-block;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 25px;
  }

  #s_recruit .sc_banner .el-form .subTitle {
    width: 50%;
    margin: 0 auto;
  }

  #s_recruit .sc_banner .el-form .btn {
    margin-top: 43px;
  }

  #s_recruit .s_banner {
    width: 100%;
    color: #FFFFFF;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  #s_recruit .s_banner .edit {
    position: relative;
    width: 99%;
    height: 50px;
    line-height: 50px;
    color: rgb(153, 169, 191);
    padding: 7px 0px 7px 21px;
    background: #fff;
    text-align: left;
  }

  #s_recruit .s_banner .s_banner_img {
    position: relative;
    display: block;
    height: 270px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  #s_recruit .s_banner .s_banner_img .content-text{
    position: absolute;
    width: 100%;
    height: 200px;
    top: 50%;
    margin-top: -100px;
  }



  #s_recruit .s_banner .edit .icon_edit {
    margin-right: 20px;
  }

  #s_recruit .s_banner img {
    width: 100%;
    height: 100%;
  }

  #s_recruit .s_banner .s_banner_img .content-text .title {
    display: inline-block;
    width: 100%;
    font-size: 60px;
    text-align: center;
    margin-top: 20px;
    position: relative;
  }

  #s_recruit .s_banner  .s_banner_img .content-text .title .s_icon {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    right: -28px;
    top: 50%;
    margin-top: -10px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
  }

  #s_recruit .sc_banner .avatar-uploader1 .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  #s_recruit .sc_banner .avatar-uploader1 .avatar {
    height: 270px;
    display: block;
    width: 100%;
  }

  #s_recruit .s_banner .des {
    font-size: 20px;
    margin-top: 44px;
  }

  #s_recruit .s_company {
    width: 100%;
    text-align: center;
    background: #FFFFFF;
    padding-top: 60px;
    position: relative;
    margin-bottom: 20px;
  }

  #s_recruit .s_company .edit {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    line-height: 50px;
    color: rgb(153, 169, 191);
    padding: 7px 0px 7px 21px;
    background: #fff;
    text-align: left;
  }

  #s_recruit .s_company .edit .icon_edit {
    margin-right: 20px;
  }

  #s_recruit .s_company .c_img {
    width: 180px;
    height: 180px;
    display: inline-block;
    text-align: center;
    position: relative;
  }

  #s_recruit .s_company .c_img img {
    width: 100%;
    height: 100%;
  }

  #s_recruit .s_company .c_img .s_icon {
    position: absolute;
    display: inline-block;
    right: -41px;
    top: 0;
    width: 20px;
    height: 20px;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
  }

  #s_recruit .s_company .text {
    margin-top: 22px;
    font-size: 16px;
    color: #1F2D3D;
  }

  #s_recruit .s_company .text1, #s_recruit .s_company .text2 {
    color: #475669;
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 36px;
  }

  #s_recruit .s_company .line {
    width: 100%;
    height: 1px;
    background: #E0E6ED;
  }

  #s_recruit .s_company .s_row {
    width: 100%;
    height: 61px;
    line-height: 61px;
    color: #475669;
    font-size: 14px;
  }

  #s_recruit .sc_company {
    margin-top: 20px;
    background: #FFFFFF;
    height: 100%;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  #s_recruit .sc_company .s_row {
    width: 1100px;
    margin: 0 auto;
    padding: 0 88px;
  }

  #s_recruit .s_recruit {
    width: 100%;
    background: #fff;
    position: relative;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  #s_recruit .s_recruit .edit {
    width: 95%;
    height: 50px;
    line-height: 50px;
    color: rgb(153, 169, 191);
    padding: 7px 0px 7px 21px;
    background: #fff;
    text-align: left;
  }

  #s_recruit .s_recruit .edit .icon_edit {
    margin-right: 20px;
  }
  #s_recruit .s_recruit .title {
    font-size: 14px;
    color: #1F2D3D;
    height: 50px;
    line-height: 50px;
    background: #FFFFFF;
    text-align: center;
  }

  #s_recruit .s_recruit .title .s_icon {
    display: inline-block;
    font-size: 13px;
    margin-left: 30px;
  }

  #s_recruit .sc_recruit {
    margin-top: 20px;
    height: 100%;
    position: relative;
    background: #fff;
    margin-bottom: 20px;
  }

  #s_recruit .sc_recruit .title {
    background: #FFFFFF;
    height: 50px;
    line-height: 50px;
    font-size: 13px;
    padding-left: 20px;
  }

  #s_recruit .sc_recruit .bottom {
    width: 100%;
    display: flex;
    height: 160px;
    background: #FFFFFF;
    padding-top: 17px;
  }

  #s_recruit .sc_recruit .bottom .el-form-item .el-form-item__content .el-select {
    z-index: 10 !important;
  }

  #s_recruit .sc_recruit .sc_btn {
    width: 100%;
    position: absolute;
    bottom: 38px;
  }

  #s_recruit .sc_recruit .title .title_content {
    margin-left: 0;
  }
  #s_recruit .s_recruit .s_list {
    padding: 0 20px 19px 20px;
    position: relative;
    background: #fff;
    margin-left: 0 !important;
  }
  #s_recruit .s_recruit .s_list .grid-content {
    background: #FFFFFF;
    height: 158px;
    display: flex;
  }

  #s_recruit .s_recruit .s_list .el-col-8 .grid-content {
    margin-top: 15px;
    border: 1px solid #E0E6ED;
    cursor: pointer;
  }

  #s_recruit .s_recruit .s_list .grid-content .content {
    width: 130px;
    height: 80px;
    line-height: 36px;
    margin: auto;
    text-align: center;
  }

  #s_recruit .s_recruit .s_list .grid-content .content .des {
    font-size: 18px;
    color: #1F2D3D;
  }

  #s_recruit .s_recruit .s_list .grid-content .content .text {
    font-size: 14px;
    color: #475669;
    display: inline-block;
    vertical-align: super;
  }

  #s_recruit .s_recruit .s_list .grid-content .content .num {
    font-size: 40px;
    color: #5AA2E7;
    display: inline-block;
    margin-top: 8px;
    margin-left: 6px;
  }

  #s_recruit .intro_comp {
    position: relative;
  }

  #s_recruit .intro_comp .edit {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    line-height: 50px;
    color: rgb(153, 169, 191);
    padding: 7px 0px 7px 21px;
    background: #fff;
    text-align: left;
  }

  #s_recruit .intro_comp .edit .icon_edit {
    margin-right: 20px;
  }

  #s_recruit .c_intro_comp {
    margin-top: 20px;
    background: #fff;
  }

  #s_recruit .c_intro_comp .editor .quilleditor {
    margin-left: -80px;
  }

  #s_recruit .c_intro_comp .editor .quilleditor .ql-editor {
    font-size: 14px;
  }

  #s_recruit .c_intro_comp .editor .el-form-item__content .quill-editor .ql-toolbar {
    display: none !important;
  }

  #s_recruit .c_intro_comp .editor .quilleditor .ql-editor p img {
    background-size: cover;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
  }

  #s_recruit .c_intro_comp .editor .el-form-item__content .ql-container.ql-snow {
    width: 100%;
    min-height: 500px;
    padding: 20px 0 0 0;
    border: none;
  }

  #s_recruit .c_intro_comp .title {
    background: #FFFFFF;
    height: 50px;
    line-height: 50px;
    margin-bottom: 13px;
    margin-left: 17px;
  }

  #s_recruit .c_intro_comp .title .title_content .el-form-item__label {
    width: 200px;
  }

  #s_recruit .c_intro_comp .editor {
    background: #FFFFFF;
    position: relative;
  }

  #s_recruit .c_intro_comp .editor .sc_btn2 {
    display: inline-block;
    width: 100%;
    text-align: center;
    bottom: 30px;
    margin-bottom: 20px;
  }

  #s_recruit .intro_comp .title {
    font-size: 14px;
    color: #1F2D3D;
    height: 50px;
    line-height: 50px;
    background: #FFFFFF;
    text-align: center;
  }

  #s_recruit .intro_comp .title .s_icon {
    display: inline-block;
    font-size: 13px;
    margin-left: 30px;
  }

  #s_recruit .intro_comp .intro_content {
    background: #FFFFFF;
    /*padding: 20px;*/
  }
  #s_recruit .intro_comp .intro_content .text {
    line-height: 2 !important;
    padding: 20px;
  }

  #s_recruit .intro_comp .intro_content .text p img {
    width: 100% !important;
  }

  #s_recruit .intro_comp .intro_img {
    width: 100%;
    height: 100%;
  }

  #s_recruit .sc_company .sc_top .avatar-uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  #s_recruit .sc_company .sc_top .avatar-uploader .avatar-uploader-icon:hover {
    border-color: #20a0ff;
  }

  #s_recruit .sc_company .sc_top .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  #s_recruit .sc_company .sc_top .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  #text_p[data-v-5bcfb048] img {
    display: block;
    width: 100%;
  }
</style>
<style>
  #s_recruit .intro_content img {
    max-width: 100%;
    display: block;
  }
  #s_recruit .el-dialog--tiny{
    width: 500px;
  }

  #s_recruit .sc_banner .avatar-uploader1 .el-upload {
    width: 100%
  }
</style>
