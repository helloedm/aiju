<template>
<div class="MicroWebsite">
  <div id="MicroWebsite">
    <!--公司介绍，发展历程，办公环境，员工故事-->
    <div class="nav-tips" id="menu">
      <el-col :span="24" class="company-process">
        <div class="grid-content bg-purple" @scroll="scrollHandler">
          <div style="height: 585px;">
            <el-steps direction="vertical" :space="100" :active="active">
                <el-step title="公司管理" @click.native="goAnchor('#louti1',1)"></el-step>
                <el-step title="产品介绍" @click.native="goAnchor('#louti2',2)"></el-step>
                <el-step title="发展历程" @click.native="goAnchor('#louti3',3)"></el-step>
                <el-step title="办公环境" @click.native="goAnchor('#louti4',4)"></el-step>
                <el-step title="员工故事" @click.native="goAnchor('#louti5',5)"></el-step>
                <el-step title="在招职位" @click.native="goAnchor('#louti6',6)"></el-step>
              <!-- <a href="javascript:void(0)" @click="goAnchor('#louti6',5)" :class="{'step-a-active':active==5}">
              </a> -->
            </el-steps>
          </div>
        </div>
      </el-col>
    </div>

    <el-row :gutter="20">
      <el-col :span="12" class="company-detail" ref="companyIndex" id="company-detail">
        <div class="grid-content bg-purple">
          <!--企业主页-->
          <a id="louti1">
            <div class="company-index">
              <span style="position:absolute;top:30px;left:10px;color:red;">*</span>
              <el-form ref="form" :model="form" label-width="86px">
                <el-form-item label="微官网名称: ">
                  <el-input style="display: inline-block; width: 200px;" :maxlength="20"  placeholder="请输入微官网名称" 
                  v-model="CompanyWebsite.companyWebName" @keyup.native="testcompanyWebName(CompanyWebsite.companyWebName)"></el-input>
                </el-form-item>
                <h2 class="title">公司介绍</h2>
                <div class="tip">上传banner图片</div>
                <div class="bannerTips">建议上传尺寸980*470，大小不超过2m，支持JPG/png等格式</div>
                <el-form-item style="margin-bottom: 18px">
                  <el-upload
                    class="avatar-uploader1"
                    :class="{'border_color_fff':CompanyWebsite.weBannerId}"
                    :action="upLogoUrl"
                    :data="params"
                    :show-file-list="false"
                    :on-preview="bannerPreview"
                    :on-remove="bannerHandleRemove"
                    :before-upload="beforeAvatarUpload"
                    :on-success="banner_success">
                    <img v-if="CompanyWebsite.weBannerUrl" :src="CompanyWebsite.weBannerUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <div class="tip">上传企业logo</div>
                <div class="logoTips">建议上传尺寸418*418，大小不超过2m，支持JPG/png等格式</div>

                <el-form-item class="logo-item">
                  <el-upload
                    class="avatar-uploader"
                    :class="{'border_color_fff':CompanyWebsite.logoId}"
                    :action="upLogoUrl"
                    :data="params"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="CompanyWebsite.logoUrl" :src="CompanyWebsite.logoUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>

                <el-form-item class="intro">
                  <el-input v-model="CompanyWebsite.name" placeholder="这里是公司简称" style="width: 324px;"
                            :maxlength="20"></el-input>
                </el-form-item>

                <el-form-item class="slogan">
                  <el-input v-model="CompanyWebsite.slogan" placeholder="这里是公司slogan" style="width:324px"
                            :maxlength="20"></el-input>
                </el-form-item>
                <div class="tip">公司介绍</div>
                 <el-form-item>
                      <!-- <el-input style="min-height: 100px;" type="textarea" @change="companyIntroductionChange()" v-model="companyIntroduction" placeholder="请填写公司描述 (最多1000字)" -->
                      <el-input style="min-height: 100px;" type="textarea"  v-model="companyIntroduction" placeholder="请填写公司描述 (最多1000字)"
                                :maxlength="1000"></el-input>
                      <div style="float: right; color: #333;font-size:12px;margin-top: 3px;">
                        还可输入 <span style="color: red; margin-right: 6px;">{{ descriptionSurplus }}</span>字
                    </div>
                    </el-form-item>

              </el-form>
            </div>
          </a>
          <a id="louti2">
            <div class="company-index">
              <el-form ref="form" :model="form" label-width="80px">
                <h2 class="title">产品介绍</h2>
                <div class="logoTips">建议上传尺寸672*312，大小不超过2m，支持JPG/png等格式</div>
                <div :gutter="20" v-for="(item,index) in productIntroductionList" class="compro  productIntroductionList" style="text-align: center;">
                    <div class="grid-content bg-purple" style="margin: 10px;">
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item>
                          <el-upload
                            @click.native="add(index)"
                            class="event-image"
                            :class="{'border_color_fff':item.productImageId}"
                            :action="upLogoUrl"
                            :data="params"
                            :show-file-list="false"
                            :on-preview="eventImagePreview"
                            :on-remove="eventImageHandleRemove"
                            :before-upload="beforeAvatarUpload"
                            :on-success="productIntroductionImgSsuccess">
                            <img v-if="item.productImageUrl"
                                :src="item.productImageUrl"
                                class="productImageUrl">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip"></div>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="grid-content bg-purple">
                      <el-form ref="form" :model="form" label-width="80px" class="date-form">
                        <el-form-item style="margin-bottom: 10px">
                          <el-input v-model="item.productName" placeholder="请输入产品名称" style="width: 294px"
                                    :maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 294px;display: inline-block;" >
                          <el-input type="textarea" v-model="item.productDescription" placeholder="请简单描述下您的产品"
                                :maxlength="800"></el-input>
                        </el-form-item>
                      </el-form>
                       <div class="add-increase" style="padding-left: 238px; padding-top: 20px;">
                        <span @click="addRecord('productIntroductionList')" v-if="(productIntroductionList.length-1)==index">添加</span>
                        <span v-if="productIntroductionList.length>1" @click="increasesRecord(index,'productIntroductionList')">删除</span>
                      </div>
                    </div>
                </div>
              </el-form>
            </div>
          </a>
          <!--发展历程  公司大事件-->
          <a id="louti3">
            <div class="company-event">
              <h2 class="title">发展历程</h2>
              <div class="tips2">建议上传尺寸336*156，大小不超过2m，支持JPG/png等格式</div>
              <el-row :gutter="20" v-for="(item,index) in CompanyMemorabilia" class="compro">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="80px">
                      <el-form-item>
                        <el-upload
                          @click.native="add(index)"
                          class="event-image"
                          :class="{'border_color_fff':item.imageId}"
                          :action="upLogoUrl"
                          :data="params"
                          :show-file-list="false"
                          :on-preview="eventImagePreview"
                          :on-remove="eventImageHandleRemove"
                          :before-upload="beforeAvatarUpload"
                          :on-success="eventImage_success">
                          <img v-if="item.imageUrl"
                               :src="item.imageUrl"
                               class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          <div slot="tip" class="el-upload__tip"></div>
                        </el-upload>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="16" style="padding-left: 0;padding-right: 0">
                  <div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="80px" class="date-form">
                      <el-form-item style="margin-bottom: 10px">
                        <el-input v-model="item.date" placeholder="请填写时间" style="width: 294px"
                                  :maxlength="10"></el-input>
                      </el-form-item>
                      <el-form-item style="width: 294px">
                        <el-input type="textarea" v-model="item.description" placeholder="请填写大事记内容 (最多30字)"
                                  :maxlength="30"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <div class="add-increase">
                  <span @click="addRecord" v-if="(CompanyMemorabilia.length-1)==index">添加</span>
                  <span v-if="CompanyMemorabilia.length>1" @click="increasesRecord(index)">删除</span>
                </div>
              </el-row>
            </div>
          </a>
          <!--办公环境-->
          <a id="louti4">
            <div class="company-environment">
              <h2 class="title">办公环境<span class="tips">最多上传4张</span></h2>
              <div class="envTips">建议上传尺寸672*312，大小不超过2m，支持JPG/png等格式</div>
              <el-form ref="form" :model="form" label-width="80px" v-for="(item,index) in WorkEnvironment"
                       style="margin-bottom: 30px">
                <el-form-item>
                  <el-upload
                    class="environment-image"
                    :action="upLogoUrl"
                    :class="{'border_color_fff':item.imageId}"
                    :data="params"
                    @click.native="add(index)"
                    :show-file-list="false"
                    :on-preview="environmentPreview"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="environmentHandleRemove"
                    :on-success="environment_success">
                    <img
                      v-if="item.imageUrl"
                      :src="item.imageUrl"
                      class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>
                <el-form-item class="envDes">
                  <el-input v-model="item.description" style="width: 324px;" placeholder="请填写图片描述（最多20字）"
                            :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item class="saint">
                  <div class="sain" style="width: 324px">
                                 <span @click="environmentAdd(index)"
                                       v-if="(WorkEnvironment.length-1)==index && index !==3">添加</span>
                    <span v-if="WorkEnvironment.length>1" @click="IncreaseEnvironment(index)">删除</span>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </a>
          <!--员工故事-->
          <a id="louti5">
            <div class="company-team" >
              <h2 class="title">员工故事</h2>
              <!--<div class="teamTips">建议上传尺寸672*312，大小不超过2m，支持JPG/png等格式</div>-->
              <div class="team-form">
                <el-form ref="teamForm" :model="form" label-width="80px" class="border paddding-buttom-20 lh_att_form"
                        v-for="(item,index) in WorkTeam">
                  <div class="lh_attendance">
                    <el-form-item label="团队" label-width="80px" class="teamIndex">
                      <span class="index">{{index+1}}</span>
                      <span class="el-icon-close close" @click="deleteTeam(index)" v-if="WorkTeam.length>1"></span>
                    </el-form-item>
                    <div style="padding-left: 39px;margin-top: 17px;">
                      <el-form-item required>
                        <el-input v-model="item.name" style="width: 410px;"
                                  placeholder="请填写团队名称"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-upload
                          class="team-image"
                          :action="upLogoUrl"
                          :class="{'border_color_fff':item.imageId}"
                          :data="params"
                          @click.native="add(index)"
                          :show-file-list="false"
                          :on-preview="teamPreview"
                          :on-remove="teamHandleRemove"
                          :on-success="team_success">
                          <img v-if="item.imageId"
                              :src="item.imageUrl"
                              class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!--<div class="team-btn">-->
                        <!--<i class="iconfont" style="color: #BFCBD9;cursor: pointer;" v-if="index<3"-->
                        <!--@click="addTeam(index,'#louti4')">&#xe6e0;</i>-->
                        <!--<i class="iconfont" style="color: #BFCBD9;cursor: pointer;" v-if="index>0" @click="deleteTeam(index)">&#xe712;</i>-->
                        <!--</div>-->
                      </el-form-item>
                      <el-form-item class="team-text">
                        <el-input v-model="item.description" type="textarea" style="width: 325px;margin-bottom: 10px;"
                                  placeholder="请填写团队简介"></el-input>
                      </el-form-item>
                    </div>
                    <div style="padding-left: 39px">
                      <div class="addRemeber">添加团队成员</div>
                      <div v-if="index<1" class="addRemeberTips">建议上传尺寸400*400，大小不超过2m，支持JPG/png等格式</div>
                      <el-row :gutter="24" v-for="(list,ind) in item.memberList"
                              class="memberList">
                        <el-col :span="4">
                          <div class="grid-content bg-purple">
                            <el-form-item>
                              <el-upload
                                class="member-image"
                                :action="upLogoUrl"
                                :class="{'border_color_fff':list.photoId}"
                                :data="params"
                                :show-file-list="false"
                                @click.native="addReme(index,ind)"
                                :on-success="memberImage_success">
                                <img v-if="list.photoId" :src="list.photoUrl" alt="" width="100%" height="100%">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              </el-upload>
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span="20" style="padding: 0">
                          <div class="grid-content bg-purple">
                            <el-form-item>
                              <el-input v-model="list.name" placeholder="请填写姓名" style="width: 125px"></el-input>
                              <el-input v-model="list.positionName" placeholder="请填写员工职位" style="width: 156px"></el-input>
                            </el-form-item>
                            <el-form-item class="member-text">
                              <el-input v-model="list.description" type="textarea" placeholder="请填写员工简介（限制100字）"
                                        style="width:247px;margin-top: 7px" :maxlength="100"></el-input>
                            </el-form-item>
                          </div>
                        </el-col>
                        <div class="add-text">
                          <span @click="addTeamRemember(index)" v-if="(item.memberList.length-1)==ind">添加</span>
                          <span @click="increaseTeamRemember(index,ind)" v-if="item.memberList.length>1" >删除</span>
                        </div>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </div>
                <div class="team-btn-add">
                  <el-button class="team-btn-add-1" @click="addTeam">添加团队</el-button>
                </div>
            </div>
          </a>
          <a id="louti6">
            <div class="company-team" >
              <h2 class="title">在招职位</h2>
              <el-form style="padding: 20px;">
                <el-form-item label="添加职位" style="height:auto;">
                  <el-tag type="primary" class="recommend_tag" v-for="(choose, index) in selectPositionList" :key="index">{{choose.name}}</el-tag>
                  <el-button type="warning" size="small" @click="dialogVisible=true" style="marrgin-top:20px;"> 编辑 </el-button>
                </el-form-item>
              </el-form>
            </div>
          </a>
        </div>
      </el-col>
      <el-col :span="8" class="company-preview">
        <div class="grid-content bg-purple">
          <h2 class="m-title">案例预览</h2>
          <div class="phone">
            <div class="phone_show">
              <img src="../../images/phone_header.png" alt="" class="imgHeader">
              <!--模板-->
              <div v-show="tabNowIndex===0" class="g-container">
                <div class="company-profile">
                  <div class="g-card profile-header">
                    <!--banner-->
                    <div class="header-section banner">
                      <img :style="bgStyle" class="banner-image" alt="">
                    </div>
                    <!---->
                    <div class="header-section header-main">
                      <div class="header-icon">
                        <img :src="preCompanyWebsite.logoUrl" alt="" class="icon-image">
                      </div>
                      <div class="header-info">
                        <div class="template-company">
                          <h3 class="info-title">{{preCompanyWebsite.name}}</h3>
                          <div class="description">{{preCompanyWebsite.slogan}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--发展历程-->
                <div class="cards">
                  <div class="card-type-0">
                    <div class="g-card">
                      <div class="template-card">
                        <div class="template-complex">
                          <div class="gm-card-offset">
                            <div class="gm-card-header" v-show="companyIntroduction">
                              <h3 class="gm-card-title" >
                                公司介绍
                            </h3>
                            </div>
                            <p class="companyIntroductionTextMini">{{ companyIntroduction }}</p>
                            <!-- <p v-show="companyIntroduction==null" ref="companyIntroductionText" class="companyIntroductionText">{{ companyIntroduction }}</p> -->
                            <el-button v-show="companyIntroduction&& companyIntroduction.length>60" type="text" class="el-icon-arrow-down"></el-button>
                            <div v-show="productIntroductionList[0] && productIntroductionList.length > 0">
                              <div class="gm-card-header">
                              <h3 class="gm-card-title">
                                  产品介绍
                              </h3>
                              </div>
                               <div class="media" style="height: 110px; padding-bottom: 10px;">
                                    <img :src="productIntroductionList[0].productImageUrl" alt="" width="100%" height="100%">
                                  </div>
                            </div>

                            <!--slide-->
                            <!-- <div class="slides" style="height: 150px;"  v-show="productIntroductionList.length > 0"> -->
                              <!-- <swiper :options="swiperOption" ref="mySwiper">
                                <swiper-slide v-for="(item,index) in productIntroductionList"> -->
                                  <!-- <div class="media" style="height: 110px">
                                    <img :src="item.productImageUrl" alt="" width="100%" height="100%">
                                  </div> -->
                                <!-- <div class="swiper-pagination" slot="pagination"></div>
                              </swiper> -->
                            <!-- </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-type-1">
                    <div class="g-card">
                      <div class="template-card">
                        <div class="template-complex">
                          <div class="gm-card-offset">
                            <div class="gm-card-header">
                              <h3 class="gm-card-title">
                                发展历程
                            </h3>
                            </div>
                            <!--slide-->
                            <div class="vertical-list">
                              <div class="gamma-type-0">
                                <div style="overflow: hidden; display: block; position: relative;">
                                  <div class="slide">
                                    <div class="list-item" v-for="item in preCompanyMemorabilia">
                                      <div class="inner">
                                        <div class="g-flex">
                                          <div class="gamma-left">
                                            <img class="link-image" :src="item.imageUrl">
                                          </div>
                                          <div class="g-column gamma-right">
                                            <div class="gamma-right-height">
                                              <span>{{item.date}}</span>
                                              <div class="gamma-description">
                                                {{item.description}}
                                              </div>
                                              <div class="gamma-text-cover"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-type-3">
                    <div class="g-card">
                      <div class="template-card">
                        <div class="template-complex">
                          <div class="gm-card-offset">
                            <div class="gm-card-header">
                              <h3 class="gm-card-title">
                                办公环境
                            </h3>
                            </div>
                            <!--slide-->
                            <div class="slides" style="height: 150px;">
                              <swiper :options="swiperOption" ref="mySwiper">
                                <!-- slides -->
                                <swiper-slide v-for="(item,index) in preWorkEnvironment">
                                  <div class="media" style="height: 110px">
                                    <img :src="item.imageUrl" alt="" width="100%" height="100%">
                                  </div>
                                  <div class="title g-oneline-text">
                                    {{item.description}}
                                  </div>
                                </swiper-slide>
                                <!-- Optional controls -->
                                <div class="swiper-pagination" slot="pagination"></div>
                                <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                                <!--<div class="swiper-button-next" slot="button-next"></div>-->
                              </swiper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-type-2">
                    <div class="g-card">
                      <div class="template-card">
                        <div class="template-complex">
                          <div class="gm-card-offset">
                            <div class="gm-card-header">
                              <h3 class="gm-card-title">
                                员工故事
                            </h3>
                            </div>
                            <!--slide-->
                            <div class="slides" style="height: 150px;">
                              <swiper :options="swiperOption2" ref="mySwiper">
                                <!-- slides -->
                                <swiper-slide v-for="(item,index) in preWorkTeam">
                                  <div class="media" style="height: 110px">
                                    <img :src="item.imageUrl" alt="" width="100%" height="100%">
                                  </div>
                                  <div class="title g-oneline-text">
                                    {{item.name}}
                                  </div>
                                </swiper-slide>
                                <!-- Optional controls -->
                                <div class="swiper-pagination" slot="pagination"></div>
                                <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                                <!--<div class="swiper-button-next" slot="button-next"></div>-->
                              </swiper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="tabNowIndex===1" class="positionOnline">
                <img src="../../images/banner_online.png" alt="" width="100%" height="100%">
                <div class="no_result" v-show="!list.length">
                  <div class="img"></div>
                  <div class="text">暂无在招职位</div>
                </div>
                <dl class="position_detail" v-for="item in list">
                  <dt>
                    <span class="position_name">{{item.positionName}}</span>
                  </dt>
                  <dd class="position_detail_money">
                    <span>{{getCity(item.workCity)}}</span>
                    <span>{{item.positionType == 1 ? '全职' : item.positionType == 2 ? '兼职' : '实习'}}</span>
                    <span>{{item.positionSalaryLowest}}K-{{item.positionSalaryHighest}}K</span>
                    <!-- <div class="position_list_right">{{item.views}}人看过</div> -->
                  </dd>
                  <dd class="position_detail_date">
                    <span>发布时间 : &nbsp;{{item.createTime}}</span> &nbsp;
                    <em>浏览次数 : {{item.views}}次</em>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="about_online">
              <div v-for="(item,index) in tabsParam" :class="{'activeColor':index==tabNowIndex}" @click="toggleTabs(index)">{{item}}</div>
          </div>
          </div>
        </div>
        <div style="text-align: center">
          <el-button  @click="preqrCode">预览</el-button>
          <el-button type="primary" @click="copyLink">复制链接</el-button>
        </div>
        <el-form :inline="true" class="share">
          <el-form-item>
            <el-input v-model="qrCodeUrl" id="mCopyLinkInput"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="submit_btn">
      <el-button type="primary"  style="margin-top: 20px" @click="MicroWebsiteSave('Manual')">保存</el-button>
    </div>

    <el-dialog
      title="预览"
      :visible.sync="qrCode"
      width="30%"
      class="qrCode">
      <div class="qrCodeImage">
        <img :src="qrCodeImg" alt="" class="qrCodeImg">
        <div class="des">手机扫码预览</div>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-transfer
        v-model="value3"
        filterable
        :titles="['未选择', '已选择']"
        :data="positionList">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="choose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
<script>
  import Util from '../../script/util.js';
  import md5 from 'js-md5';
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import { setInterval, clearInterval } from 'timers';

  export default {
    data(){
      return {
        save_isclick:false,
        firstID: '',//要编辑的项目的ID
        firstGet: false,
        websitePositionIds: '',
        timer: '',
        box: '',
        positionList: [],
        selectPositionList: [],
        active: 1,
        dialogVisible: false,
        value3: [],
        //预览
        qrCode: false,
        //预览标识
        isShow: false,
        //增加减少
        indexActive: 4,
        //公司主页
        params: {
          param: JSON.stringify({businessId: 14, fId: -1}),
          sign: md5('method' + "fileUpload/insertFileRecord" + "param" + JSON.stringify({
              businessId: 14,
              fId: -1
            }) + "ecbao")
        },
        dialogImageUrl: '',
        imageUrl: '',
        CompanyWebsite: {
          companyWebName: '微官网',
          weBannerId: '',
          logoId: '',
          slogan: '',
          name: '',
          weBannerUrl: '',
          logoUrl: '',
        },
        upLogoUrl: Util.uploadURLForCommon,
        imageUrl2: '',
        //发展历程
        imageUrl3: '',
        imageUrl_0: '',
        imageUrl_1: '',
        imageUrl_2: '',
        imageUrl_3: '',
        imageId: '',
        CompanyMemorabilia: [{imageId: '', date: '', description: '', imageUrl: ''}],
        productIntroductionList:[
            {
                productName:"",
                productDescription:"",
                productImageId:null,
                productImageUrl:null,
            }
        ],
        companyIntroduction: '',
        //办公环境
        WorkEnvironment: [{imageId: '', description: '', imageUrl: ''}],
        environImageId: '',
        //我们的团队
        teamImage: [],
        teamIndex: 0,
        WorkTeam: [{
          name: '',
          description: '',
          imageId: '',
          imageUrl: '',
          memberList: [{
            name: '',
            positionName: '',
            description: '',
            photoId: '',
            photoUrl: ''
          }]
        }],
        teamId: '',
        teamImage_0: '',
        teamImage_1: '',
        teamImage_2: '',
        teamImage_3: '',
        //添加团队成员
        ind: '',
        addTeamRememberId: '',
        form: {
          intro: '',
          slogan: '',
          content: ''
        },
        //预览
        preWorkTeam: [{
          name: '',
          description: '爱聚科技团队均来自与阿里巴巴、百度、蘑菇街等知名互联网企业，这里有最优秀的同事，轻松的工作氛围、充满童真的办公环境，期待优秀而年轻的你的加入。',
          imageUrl: "https://aijuhr.com/images/preImages/teamImage.jpg",
          memberList: [{
            name: '',
            positionName: '',
            description: '',
            photoUrl: ''
          }]
        }],
        preWorkEnvironment: [
          {
            imageUrl: "https://aijuhr.com/images/preImages/env_1.png",
            description: ''
          },
          {
            imageUrl: "https://aijuhr.com/images/preImages/env_2.png",
            description: ''
          },
          {
            imageUrl: "https://aijuhr.com/images/preImages/env_3.png",
            description: ''
          },
          {
            imageUrl: "https://aijuhr.com/images/preImages/env_4.png",
            description: ''
          }
        ],
        preCompanyWebsite: {
          companyWebName: '微官网',
          name: "爱聚科技",
          slogan: "小微变革 因我而美",
          logoUrl: "https://aijuhr.com/images/preImages/logo.png",
          weBannerUrl: 'https://aijuhr.com/images/preImages/preBanner.png'
        },
        preCompanyMemorabilia: [
          {
            date: "2012.1.10",
            description: "  爱聚科技正式成立",
            imageUrl: " https://aijuhr.com/images/preImages/company_1.png"
          },
          {
            date: "2014",
            description: " 多渠道版电商宝，蘑菇街、微店、 贝贝网等平台首个财务订单软件软件",
            imageUrl: " https://aijuhr.com/images/preImages/company_2.png"
          },
          {
            date: "2016",
            description: "聚焦全渠道新零售经营管理， 产品升级：电商宝财务ERP版、电商宝 SCRM、爱聚HR（超级工资条）、 爱聚收银记账等",
            imageUrl: " https://aijuhr.com/images/preImages/company_3.png"
          },
          {
            date: "2017 ",
            description: "用户达60多万,合作平台达30多家，通过ERP+财务+SCRM+HR+爱聚门店，为企业提供新零售全渠道解决方案",
            imageUrl: " https://aijuhr.com/images/preImages/company_4.png"
          }
        ],
        qrCodeImg: '',
        qrCodeUrl: '',
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          direction: 'horizontal',
          grabCursor: false,
          setWrapperSize: true,
          autoHeight: false,
          pagination: '.swiper-pagination',
          paginationClickable: false,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          mousewheelControl: false,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          loop: true,
        },
        swiperOption2: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 2000,
          direction: 'horizontal',
          grabCursor: false,
          setWrapperSize: true,
          autoHeight: false,
          pagination: '.swiper-pagination',
          paginationClickable: false,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          mousewheelControl: false,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          loop: true,
        },
        // active:true,
        tabsParam:['关于我们','在招职位'],
        tabNowIndex:0,
        list:[]
      }
    },
    watch:{
      CompanyWebsite:{   //数据监听同步变化
         handler(val, oldVal){
           for(var i in val){
             if(this.CompanyWebsite[i]!=""){
              //  console.log(i);
               this.preCompanyWebsite[i]=this.CompanyWebsite[i];
             }
           }
         },
         deep:true
      },
      'CompanyWebsite.companyWebName':function(val,oldval){  
          this.preCompanyWebsite.companyWebName=val;
      },
      'CompanyWebsite.name':function(val,oldval){  
          this.preCompanyWebsite.name=val;
      },
      'CompanyWebsite.slogan':function(val,oldval){  
          this.preCompanyWebsite.slogan=val;
      },
      WorkTeam:{
         handler(val, oldVal){
           for(var i in val){
             if(this.WorkTeam[i]!=""){
               this.preWorkTeam[i]=this.WorkTeam[i];
             }
           }
         },
         deep:true
      },
      WorkEnvironment:{
         handler(val, oldVal){
           for(var i in val){
             if(this.WorkEnvironment[i]!=""){
               this.preWorkEnvironment[i]=this.WorkEnvironment[i];
             }
           }
         },
         deep:true
      },
      CompanyMemorabilia:{
         handler(val, oldVal){
           for(var i in val){
             if(this.CompanyMemorabilia[i]!=""){
               this.preCompanyMemorabilia[i]=this.CompanyMemorabilia[i];
             }
           }
         },
         deep:true
      },
    },
    methods: {
      testcompanyWebName(data){
        // console.log(data.length);
        if(data.length>=20){
          this.$message({
            type: 'warning',
            message: '微官网名称不得超过20个字符！'
          });
        }
      },
      goProductDescription(item){
        console.log(item)
      },
      companyIntroductionChange(){
        console.log(this.$refs.companyIntroductionText.offsetHeight)
      },
      toggleTabs(index){
        this.tabNowIndex = index;
      },
      goAnchor(selector, index) {
        this.active = index
        let anchor = this.$el.querySelectorAll(selector)
        document.getElementById('company-detail').scrollTop = anchor[0].offsetTop;
      },
      scrollHandler(e){
        console.log(e)
      },
      //公司主页
      bannerPreview(){
      },
      bannerHandleRemove(){
      },
      //上传banner
      banner_success(res, file){
        console.log(res)
        this.CompanyWebsite.weBannerUrl = file.url
        this.CompanyWebsite.weBannerId = res.data.ids
      },
      //上传公司头像
      handleAvatarSuccess(res, file){
        console.log(res, file)
        this.CompanyWebsite.logoUrl = file.url
        this.CompanyWebsite.logoId = res.data.ids
      },
      beforeAvatarUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //发展历程 大事件
      eventImagePreview(){
      },
      eventImageHandleRemove(){
      },
      eventImage_success(res, file, fileList){
        this.CompanyMemorabilia[this.index].imageId = res.data.ids
        this.CompanyMemorabilia[this.index].imageUrl = file.url
      },
      productIntroductionImgSsuccess(res, file, fileList){
        this.productIntroductionList[this.index].productImageId = res.data.ids
        this.productIntroductionList[this.index].productImageUrl = file.url
        console.log(this.productIntroductionList)
      },
      addRecord(type){
        if(type === 'productIntroductionList'){
          this.productIntroductionList.push({
                productName:"",
                productDescription:"",
                productImageId:null,
                productImageUrl:null
            })
        }else{
          this.CompanyMemorabilia.push({imageId: '', date: '', description: '', imageUrl: ''})
        }
        console.log(this.productIntroductionList)
      },
      increasesRecord(index, type){
        this.$confirm('您确认删除该数据吗？删除后不可恢复!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(type === 'productIntroductionList'){
            this.productIntroductionList.splice(index, 1)
          }else{
            this.CompanyMemorabilia.splice(index, 1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      add(index){
        this.index = index
        console.log(this.index)
        console.log(this)
      },
      addReme(index, ind){
        this.index = index
        this.ind = ind
      },
      //办公环境
      environmentPreview(){
      },
      environmentHandleRemove(){
      },
      environment_success(res, file){
        console.log(res, file)

        this.WorkEnvironment[this.index].imageId = res.data.ids
        this.WorkEnvironment[this.index].imageUrl = file.url
      },
      environmentAdd(index){
        this.WorkEnvironment.push({imageId: '', description: '', imageUrl: ''})
      },
      IncreaseEnvironment(index){
        this.$confirm('您确认删除该数据吗？删除后不可恢复!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.WorkEnvironment.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //我们的团队 添加团队成员
      teamPreview(){
      },
      teamHandleRemove(){
      },
      team_success(res, file){
        console.log(res, file)
        console.log(this.index)
        this.WorkTeam[this.index].imageId = res.data.ids
        this.WorkTeam[this.index].imageUrl = file.url
      },
      addTeam(index){
        this.WorkTeam.push({
          name: '',
          description: '',
          imageId: '',
          imageUrl: '',
          memberList: [{
            name: '',
            positionName: '',
            description: '',
            photoId: '',
            photoUrl: ''
          }]
        })
      },
      deleteTeam(index){
        this.$confirm('您确认删除该数据吗？删除后不可恢复!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.WorkTeam.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //添加 删除团队成员
      memberImage_success(res, file){
        this.WorkTeam[this.index].memberList[this.ind].photoId = res.data.ids
        this.WorkTeam[this.index].memberList[this.ind].photoUrl = file.url
      },
      addTeamRemember(index){
        this.WorkTeam[index].memberList.push({name: '', positionName: '', description: '', photoId: '', photoUrl: ''})
      },
      increaseTeamRemember(index, ind){
        this.$confirm('您确认删除该数据吗？删除后不可恢复!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.WorkTeam[index].memberList.splice(ind, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //MicroWebsiteSave 保存
      MicroWebsiteSave(data){
        var _this = this;
        if(data==='Manual'){        
          var companyWebName=_this.CompanyWebsite.companyWebName;
          if(companyWebName.match(/^[ ]+$/)){
              _this.$message({
                message: "微官网名称不能由纯空格组成！",
                type: 'warning'
              });
              return false;
          }else if(companyWebName.length>20){
              _this.$message({
                message: "微官网名称不能超过20个字符！",
                type: 'warning'
              });
              return false;
          }          
        }
        var method = "companyWeb/savaCompanyDetail";
        _this.CompanyWebsite.productIntroductionList = _this.productIntroductionList;
        _this.CompanyWebsite.companyIntroduction = _this.companyIntroduction;
        var id;
        if(this.firstID!=""){   // 初始id默认为空，第一次应使用url带来的id,随后使用firstID
          id = this.firstID;
        }else{
          id= this.$route.query.id;
        }
        var param = JSON.stringify({
          id: id,
          CompanyWebsite: _this.CompanyWebsite,
          CompanyMemorabilia: _this.CompanyMemorabilia,
          WorkEnvironment: _this.WorkEnvironment,
          WorkTeam: _this.WorkTeam,
          positionId: _this.websitePositionIds
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            if(data==='Manual'){ //手动保存才会有提示消息
                _this.$message({
                  message: res.data.message,
                  type: 'success'
                });
                _this.save_isclick = true;
                _this.$router.push('/ATS/creatMiniWeb');
            }
            _this.qrCodeUrl = res.data.data.webQrcodeLink;
            _this.qrCodeImg = res.data.data.webQrcodeName;
            if(res.data.data.id!=null){  //当获取的ID不是null 使用第一次获取的ID（新增微官网）
                _this.firstID = res.data.data.id;
            }
          }else{
            if(data==='Manual'){
                _this.$message({
                  message: res.data.message,
                  type: 'info'
                });
              }
          }
        }
        if( data === "Manual" ){ //如果手动保存的话
          if(_this.CompanyWebsite.companyWebName == undefined || _this.CompanyWebsite.companyWebName == ''){
            _this.$message({
              message: "微官网名称不得为空！",
              type: 'warning'
            });
          }else{
            _this.$http(method, param, successd);
          }
        }else{ //自动保存的时候
           _this.$http(method, param, successd);
        }
      },
      //查询微官网
      getCompanyDetail(){
        var _this = this;
        var method = "companyWeb/getCompanyDetail";
        var param = JSON.stringify({
          id: this.$route.query.id
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data);
            if (res.data.data.CompanyWebsiteIsEmtpy == 1) { //首页数据不为空
              _this.CompanyWebsite = res.data.data.CompanyWebsite
              _this.preCompanyWebsite = res.data.data.CompanyWebsite
              if(res.data.data.CompanyWebsite.productIntroductionList.length && res.data.data.CompanyWebsite.productIntroductionList.length!=0){
                  _this.productIntroductionList = res.data.data.CompanyWebsite.productIntroductionList
              }
              _this.companyIntroduction = res.data.data.CompanyWebsite.companyIntroduction
            }else{
               _this.CompanyWebsite =  _this.preCompanyWebsite //首页数据为空
            }
            if (res.data.data.WorkTeamIsEmpty == 1) {
              _this.WorkTeam = res.data.data.WorkTeam
              _this.preWorkTeam = res.data.data.WorkTeam
            }else{
              // _this.WorkTeam = _this.preWorkTeam
            }
            if (res.data.data.WorkEnvironmentIsEmtpy == 1) {
              _this.WorkEnvironment = res.data.data.WorkEnvironment
              _this.preWorkEnvironment = res.data.data.WorkEnvironment
            }else{
              // _this.WorkEnvironment = _this.preWorkEnvironment
            }
            if (res.data.data.CompanyMemorabiliaIsEmpty == 1) {
              _this.CompanyMemorabilia = res.data.data.CompanyMemorabilia
              _this.preCompanyMemorabilia = res.data.data.CompanyMemorabilia
            }else{
              // _this.CompanyMemorabilia = _this.preCompanyMemorabilia
            }
          }
        }
        _this.$http(method, param, successd);
      },
      init(){
        this.CompanyWebsite =  this.preCompanyWebsite
        this.WorkTeam = this.preWorkTeam
        this.WorkEnvironment = this.preWorkEnvironment
        this.CompanyMemorabilia = this.preCompanyMemorabilia
      },
      //复制链接
      copyLink() {
        var self = this;
        document.getElementById("mCopyLinkInput").children[0].select();
        document.execCommand("Copy");
        self.$message({
          message: "复制成功",
          type: 'success'
        })
      },
      preqrCode(){
        this.qrCode = true
      },
      getWeWebsitePosition(){
        var method = "companyWeb/getWeWebsitePositionByCategoryId";
        var id = this.$route.query.id
        var param = JSON.stringify({
          id: id
        });
        var arr = [];
        var successd = (res)=> {
          if (res.data.code == 0) {
             this.list = res.data.data;
             res.data.data.forEach(function(item){
              arr.push(item.id);
            })
            this.value3 = arr;
            if(!this.firstGet){
              this.saveWeWebsitePosition()
              this.firstGet = true
            }
          }
          var self=this;
          self.selectPositionList = [];
          self.positionList.forEach(function(item1){
          self.value3.forEach(function(item2){
            if(item2==item1.key){
              self.selectPositionList.push(item1);
            }
          })
          });
        }
        this.$http(method, param, successd);
      },
      saveWeWebsitePosition(){
        // console.log("save");
        var method = "companyWeb/saveWeWebsitePosition";
        var id =this.$route.query.id;
        var param = JSON.stringify({
          positionIds: this.value3.toString(),
          id:id
        });
        var successd = (res)=> {
          this.websitePositionIds = res.data.data.websitePositionIds.join();
          this.getWeWebsitePosition()
        }
        this.$http(method, param, successd);
      },
      getPositionListByCondition(){
        var method = "recruitPosition/getPositionListByCondition";
        var param = JSON.stringify({
          pageNum: 1,
          pageSize: 2000
        });
        var successd = (res)=> {
          if (res.data.code == 0) {
             res.data.data.positionList.forEach(function(item){
              item.key=item.id;
              item.label=item.positionName;
              item.name=item.positionName;
            })
            this.positionList = res.data.data.positionList;
            this.getWeWebsitePosition();
          }
        }
        this.$http(method, param, successd);
      },
      getCity(item){
        if(item){
          return item.split(',')[1]
        }
      },
      filter(item){
        if(item){
          return item.slice(0, 10)
        }
      },
      choose(){
        var self=this;
        self.selectPositionList = [];
        self.positionList.forEach(function(item1){
          self.value3.forEach(function(item2){
            if(item2==item1.key){
              self.selectPositionList.push(item1);
              console.log(self.selectPositionList);
            }
          })
        });
        this.saveWeWebsitePosition()
        self.dialogVisible=false;
      },
      saveInterval(){
        this.timer = setInterval(()=>{
          if(this.CompanyWebsite.companyWebName){
            this.MicroWebsiteSave('auto')
          }
        },20000)
      },
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.preCompanyWebsite.weBannerUrl})`
      },
      descriptionSurplus(){
        if(this.companyIntroduction){
          return 1000 - this.companyIntroduction.length
        }else{
          return 1000
        }
      }
    },
    created(){
        this.MicroWebsiteSave();
        this.getPositionListByCondition();
        if(this.$route.query.id != '0'){
          this.getCompanyDetail();   //读取数据
        } else {
          // this.init();            //写入默认数据
        }
    },
    beforeRouteLeave (to, from , next) {
      var _this=this;
      if (_this.save_isclick) {
        next(true);
      } else {  
        this.$confirm('请确认您编辑的内容已保存', '提示', {
            confirmButtonText: '保存确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var companyWebName=_this.CompanyWebsite.companyWebName;
            if(companyWebName.match(/^[ ]+$/)){
                _this.$message({
                  message: "微官网名称不能由纯空格组成！",
                  type: 'warning'
                });
                return false;
            }else if(companyWebName.length>20){
                _this.$message({
                  message: "微官网名称不能超过20个字符！",
                  type: 'warning'
                });
                return false;
            }
            clearInterval(this.timer)
            this.timer = null;
            this.MicroWebsiteSave();
            next()
          }).catch(() => {
            next(false)
          });         
      }
  },
  beforeDestroy(){
    // this.timer = null;
    clearInterval(this.timer);
  },
  mounted(){
      this.saveInterval()
      this.box = this.$refs.companyIndex
      // console.log(this.$refs.companyIndex.$el.scrollTop);
      var loitiArr = document.querySelectorAll('#company-detail>div>a');
      loitiArr = Array.prototype.slice.call(loitiArr);
      var contentScrollTopNow = 0;
      this.box.$el.addEventListener('scroll', () => {
        var contentheight=document.getElementById('company-detail').scrollHeight;
        // console.log(contentheight);
        var contentScrollTopNow = contentScrollTop || 0;
        var contentScrollTop= this.$refs.companyIndex.$el.scrollTop;
        // console.log(contentScrollTop); //容器滚动的距离
        for(let i = 0; i < loitiArr.length; i++){
          var index = 1;
          if(loitiArr[i].offsetTop <= contentScrollTop){
            // console.log(loitiArr[i].offsetTop);
            if(contentScrollTop == loitiArr[i].offsetTop && loitiArr[i].offsetTop == 0){ //当滚动高度
              this.active = 0
            }
            if( i+1 > index){
              if(contentScrollTopNow>contentScrollTop){
                this.active = i -1
                index = i;
              }else{
                this.active = i
              }
            }
            if(contentheight==contentScrollTop+615){ //滑动到了底部
              this.active = 5
            }
          }
        }
      }, false)
    },
    components: {
      swiper,
      swiperSlide
    },
    filters: {
      data: function (input) {
        var d = new Date(input);
        if (!d) {
          return
        }
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
//        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        return year + '.' + month + '.' + day;
      }
    }
  }

</script>
<style scoped>
::-webkit-scrollbar{
  display:none;
}
.el-icon-arrow-down{
  text-align: center;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  cursor: pointer;
}

</style>

<style>
#MicroWebsite .el-step__title.is-process {
  color:#5aa2e7;
}
#MicroWebsite .el-step__head.is-process,#MicroWebsite .el-step__line.is-process{
  color:#5aa2e7;
  border-color:#5aa2e7;
}
#MicroWebsite .el-step__title.is-finish {
  color:#333;
}
#MicroWebsite .el-step__head.is-finish,#MicroWebsite .el-step__line.is-finish{
  color:#c0c4cc;
  border-color:#c0c4cc;
}
.companyIntroductionTextMini{
  font-size: 12px;
  margin-bottom: 0px;
  overflow: hidden;
  max-height: 66px;
}
#louti1 .el-textarea__inner{
  min-height: 100px;
  height:100px;
}
  .step-a-active .el-step .el-step__head.is-wait.is-text {
    color: #fff;
    background-color: #5AA2E7;
    border-color: #5AA2E7;
  }

  #MicroWebsite {
    padding: 0 0 0 154px;
    min-height: 570px;
    position: relative
  }

  #MicroWebsite .nav-tips {
    position: absolute;
    width: 154px;
    height: 100%;
    left: 0;
    top: 30px;
  }

  #MicroWebsite .qrCode .el-dialog {
    width: 440px !important;
    top: 50% !important;
    height: 300px !important;
    margin-top: -141px !important;
  }
  #MicroWebsite .qrCode .el-dialog .el-dialog__header .el-dialog__title{
   color: #475669;
  }
  #MicroWebsite .qrCode .el-dialog .el-dialog__body {
    margin-top: 20px;
  }

  #MicroWebsite .qrCode .el-dialog .el-dialog__body .qrCodeImage {
    width: 120px;
    height: 118px;
    margin: 0 auto;
  }

  #MicroWebsite .qrCode .el-dialog .el-dialog__body .qrCodeImage .qrCodeImg {
    display: block;
    width: 100%;
    height: 100%;
    margin-bottom: 24px;
  }

  #MicroWebsite .qrCode .el-dialog .el-dialog__body .qrCodeImage .des {
    text-align: center;
    color: #1f2d3d;
    font-size: 14px;
  }

  /*公司首页*/
  #MicroWebsite .company-detail {
    width: 566px;
    background: #fff;
    /* border-bottom: 1px solid #E5E9F2; */
    height: 615px;
    overflow: auto;
    overflow-x: hidden;
    padding: 0 !important;
    transition: 0.4s;
    border-left:1px solid #ddd;
  }

  #MicroWebsite .company-detail .company-index {
    position: relative;
    padding: 20px 20px 20px 20px;
  }

  #MicroWebsite .company-detail .company-index .el-form .intro,  #MicroWebsite .company-detail .company-index .el-form .slogan{text-align: center}
  #MicroWebsite .company-detail .company-index .title {
    margin-bottom: 19px;
    font-size: 16px;
    color: #1F2D3D
  }
  .event-image{
    /* display: inline-block; */
  }

  #MicroWebsite .company-detail .company-index .tip {
    margin-bottom: 6px;
    color: #1F2D3D;
    font-size: 14px
  }

  #MicroWebsite .logoTips {
    font-size: 12px;
    color: rgb(131, 145, 165);
    margin-bottom: 20px;
  }

  #MicroWebsite .company-detail .company-index .bannerTips {
    font-size: 12px;
    color: rgb(131, 145, 165);
    margin-bottom: 20px;
  }
  .el-tag{
    margin-right: 10px;
  }
  #MicroWebsite .company-detail .company-index .avatar-uploader1{text-align: center}
  #MicroWebsite .company-detail .company-index .avatar-uploader1 .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 324px;
  }
  .productImageUrl{
      width: 300px;
      height: 180px;
      border-radius: 3px;
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader1.border_color_fff .el-upload {
    border-color: #fff;
  }
   #MicroWebsite .company-detail .company-index .border_color_fff .el-upload.el-upload--text{
    border-color: #fff;
  }

  #MicroWebsite .company-detail .company-index .el-form-item__content, #MicroWebsite .company-detail .company-event .el-form-item__content, #MicroWebsite .company-detail .company-environment .el-form-item__content {
    margin-left: 0 !important;
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader1 .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 324px;
    height: 117px;
    line-height: 117px;
    text-align: center;
    background: #FBFDFF;
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader1 .avatar {
    width: 100%;
    height: 178px;
    display: block;
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader1 .el-upload__tip {
    margin-top: -4px;
  }

  /*公司头像*/
  #MicroWebsite .company-detail .company-index .avatar-uploader {
    text-align: center
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50%
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader.border_color_fff .el-upload {
    border-color: #fff;
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 117px;
    height: 117px;
    line-height: 117px;
    text-align: center;
    background: #FBFDFF;
  }

  #MicroWebsite .company-detail .company-index .avatar-uploader .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

  /*公司大事件 发展历程*/
  #MicroWebsite .company-detail .company-event {
    padding: 18px 0 40px 20px;
    border-top: 1px solid #E5E9F2
  }

  #MicroWebsite .company-detail .company-event .title, #MicroWebsite .company-detail .company-environment .title {
    font-size: 16px;
    color: #1F2D3D;
    margin-bottom: 6px;
  }

  #MicroWebsite .company-detail .company-team .title {
    font-size: 16px;
    color: #1F2D3D;
    margin-bottom: 6px;
    padding: 19px 0 0 10px;
  }

  #MicroWebsite .company-detail .company-team .teamTips {
    padding-left: 20px;
  }

  #MicroWebsite .company-detail .company-event .title .tips, #MicroWebsite .company-detail .company-environment .tips, #MicroWebsite .company-detail .company-team .tips {
    font-size: 12px;
    color: #e9a254;
  }

  #MicroWebsite .company-detail .company-event .title .tips, #MicroWebsite .company-detail .company-environment .tips, #MicroWebsite .company-detail .company-team .tips2 {
    color: #e9a254;
    margin-left: 10px;
  }

  #MicroWebsite .company-detail .company-event .tips2 {
    font-size: 12px;
    color: #8391a5;
    margin-bottom: 20px;
  }

  #MicroWebsite .company-detail .company-event .compro {
    margin-top: 20px;
    margin-right: 0 !important;
  }

  #MicroWebsite .company-detail .company-event .event-image .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #MicroWebsite .el-dialog--tiny{
    width: 500px;
  }

  #MicroWebsite .company-detail .company-event .event-image.border_color_fff .el-upload {
    border-color: #fff;
  }

  #MicroWebsite .company-detail .company-event .event-image {
    height: 117px
  }

  #MicroWebsite .company-detail .company-event .event-image .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 100%;
    height: 117px;
    line-height: 117px;
    text-align: center;
    background: #FBFDFF;
  }

  #MicroWebsite .company-detail .productIntroductionList .event-image .avatar-uploader-icon{
    width: 300px;
    height: 180px;
    line-height: 180px;
    font-size: 20px;
    color: #8c939d;
    text-align: center;
    background: #FBFDFF;
  }
  #MicroWebsite .company-detail .productIntroductionList .event-image .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
}

  #MicroWebsite .company-detail .company-event .event-image .avatar {
    width: 100%;
    height: 117px;
    display: block;
  }

  #MicroWebsite .company-detail .company-event .date-form .el-form-item .el-form-item__content .el-textarea__inner {
    height: 70px;
    resize: none;
  }

  #MicroWebsite .company-detail .company-event .add-increase {
    padding-top: 5px;
    padding-left: 408px;
  }

  #MicroWebsite .company-detail .company-event .add-increase span{
    display: inline-block;
    font-size: 10px;
    color: #5AA2E7;
    cursor: pointer;
  }
  /*办公环境*/
  #MicroWebsite .company-detail .company-environment {
    padding: 18px 0 12px 20px;
    border-top: 1px solid #E5E9F2;
    border-bottom: 1px solid #E5E9F2;
  }

  #MicroWebsite .company-detail .company-environment .environment-image {
    position: relative;
    text-align: center;
  }
  #MicroWebsite .company-detail .company-environment .envDes {
    text-align: center;
  }
  #MicroWebsite .company-detail .company-environment .saint  .sain{
      margin: 0 auto;
    text-align: right;
    font-size: 12px;
    color: #5AA2E7;
    cursor: pointer;
  }
  #MicroWebsite .company-detail .company-environment .environment-image .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 324px;
        height: 150px;
    line-height: 150px;
  }

  #MicroWebsite .company-detail .company-environment .envTips {
    font-size: 12px;
    color: #8391a5;
    margin-bottom: 20px;
  }

  #MicroWebsite .company-detail .company-environment .environment-image .el-upload__tip {
    margin-top: -10px;
  }

  #MicroWebsite .company-detail .company-environment .environment-image.border_color_fff .el-upload, {
    border-color: #fff;
  }
productIntroductionList
  #MicroWebsite .company-detail .company-environment .environment-image .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 100%;
    height: 178px;
    line-height: 178px;
    text-align: center;
    background: #FBFDFF;
  }

  #MicroWebsite .company-detail .company-environment .environment-image .avatar {
    width: 100%;
    height: 178px;
    display: block;
  }

  #MicroWebsite .company-detail .company-environment .add-btn {
    display: block;
    position: absolute;
    width: 163px;
    height: 117px;
    right: 0;
    top: 50%;
    margin-top: -54px;
    line-height: 117px;
    margin-right: -62px;
  }

  #MicroWebsite .company-detail .company-environment .el-form .el-form-item {
    margin-bottom: -5px;
  }

  #MicroWebsite .company-detail .company-team {
    padding-left: 10px;
    padding-right: 10px;
  }

  #MicroWebsite .company-detail .company-team .team-form {
    /*padding: 18px 0 20px 20px;*/
    border-top: 1px solid #E5E9F2;
  }

  #MicroWebsite .company-detail .company-team .team-form .teamTips {
    font-size: 12px;
    color: #8391a5;
    margin-bottom: 20px;
  }

  #MicroWebsite .company-detail .company-team .team-form .el-form-item__content {
    margin-left: 0 !important;
  }

  #MicroWebsite .company-detail .company-team .team-form .el-form-item {
    margin-bottom: -3px;
  }

  #MicroWebsite .company-detail .company-team .team-form .el-form-item__content .el-input {
    margin-bottom: 10px !important;
  }

  #MicroWebsite .company-detail .company-team .team-form .team-image .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 410px
  }

  #MicroWebsite .company-detail .company-team .team-form .team-btn {
    display: block;
    position: absolute;
    width: 163px;
    height: 117px;
    right: 0;
    top: 50%;
    margin-top: -54px;
    line-height: 117px;
    margin-right: -62px;
  }
  #MicroWebsite .company-detail .company-team .team-form .team-image.border_color_fff .el-upload {
    border-color: #fff
  }

  #MicroWebsite .company-detail .company-team .team-form .team-image .el-upload__tip {
    margin-top: -8px;
  }

  #MicroWebsite .company-detail .company-team .team-form .team-image .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 100%;
    height: 117px;
    line-height: 117px;
    background: #FBFDFF;
    text-align: center;
  }

  #MicroWebsite .company-detail .company-team .team-form .team-image .avatar {
    width: 100%;
    height: 178px;
    display: block;
  }

  #MicroWebsite .company-detail .company-team .team-form .member-image .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    font-size: 20px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  #MicroWebsite .company-detail .company-team .team-form .member-image.border_color_fff .el-upload {
    border-color: #fff;
  }

  #MicroWebsite .company-detail .company-team .team-form .member-image .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #FBFDFF;
  }

  #MicroWebsite .company-detail .company-team .team-form .member-image .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }

  #MicroWebsite .company-detail .company-team .team-form .addRemeber {
    margin: 10px 0 6px 0;
    color: #1F2D3D;
  }

  #MicroWebsite .company-detail .company-team .team-form .addRemeberTips {
    font-size: 12px;
    color: rgb(131, 145, 165);
    margin-bottom: 20px;
  }
  #MicroWebsite .company-preview {
    background: #fff;
    min-height: 570px;
  }
  #MicroWebsite .company-preview .share{
    opacity: 0;
    position: absolute;
  }
  #MicroWebsite .company-preview .phone {
    position: relative;
    width: 220px;
    height: 450px;
    margin: 20px auto;
    background: url(../../images/phone.png) no-repeat center center;
    padding-top: 1px;
  }

  #MicroWebsite .company-preview .m-title {
    margin: 10px 0 0 10px;
  }

  #MicroWebsite .company-preview .phone .phone_show {
    width: 200px;
    height: 350px;
    margin: 50px auto;
    overflow: auto;
    background-color: #F1F7FF;
  }
   #MicroWebsite .company-preview .phone .phone_show .no_result{
      padding :30px;
      height :200px;
   }
  #MicroWebsite .company-preview .phone .phone_show .no_result .text{
  color :#999;
        font-size :13px;
        text-align :center;
        padding-top :10px;
  }
  #MicroWebsite .company-preview .phone .phone_show .no_result .img{
      margin :0 auto;
        width :64px;
        height :63px;
        background: url(../../images/no-result.png)no-repeat center;
        background-size :cover;
  }

  #MicroWebsite .company-preview .phone .phone_show .imgHeader{
    display: block;
    width: 100%;
  }

  #MicroWebsite .company-detail .company-team .lh_att_form {
    border: 1px solid #EEF1F6;
    margin-bottom: 53px;
  }

  #MicroWebsite .company-detail .company-team .lh_att_form .team-text .el-form-item__content .el-textarea__inner {
    width: 410px;
    resize: none;
  }
  #MicroWebsite .company-detail .company-team .lh_att_form .memberList{margin-right: 0;margin-bottom: 20px;}

  #MicroWebsite .company-detail .company-team .lh_att_form .memberList .add-text{
    display: inline-block;
    padding-left: 363px;
  }

  #MicroWebsite .company-detail .company-team .lh_att_form .memberList .add-text span{
    display: inline-block;
    font-size: 12px;
    color: #5AA2E7;
    margin-top: 10px;
    cursor: pointer;
  }

  #MicroWebsite .company-detail .company-team .lh_att_form .memberList .member-text .el-form-item__content .el-textarea__inner {
    width: 338px;
    resize: none;
  }


</style>
<style scoped lang="less">
  @import "../../style/swiper.css";

  html, body {
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  #MicroWebsite .company-detail .company-index .logo-item {
    margin-bottom: 10px !important;
  }

  .g-container {
    position: relative;
    z-index: 2;
    background-color: #f1f5f8;
    border: 0;
    outline: 0;
    padding-bottom: 5px;
  }
  .positionOnline{
    padding-bottom: 50px;
  }
  .g-oneline-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 94%;
  }
   .about_online {
    position: absolute;
    bottom: 48px;
    left: 9px;
    right: 20px;
    width: 94%;
    display: -ms-flexbox;
    display: flex;
    height: 36px;
    font-size: 13px;
    line-height: 36px;
    background: #fff;
    z-index: 1000;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .about_online div {
    text-align: center;
    flex: 1;
    border-right: 1px solid #e5e5e5;
  }
  .about_online div:nth-child(2){
    border:none;
  }
  .activeColor {
    color: #5AA2E7;
  }

  .g-column {
    flex: 1
  }

  .header-section {
    position: relative
  }

  .g-container .company-profile {
    position: relative;
    border-radius: 1px;
    /*border-bottom: 1px solid white;*/
  }

  .g-container .company-profile .g-card {
    margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e8f0f8;
    border-width: 1px 0;
  }

  .g-container .company-profile .profile-header {
    border-top-width: 0;
    margin-top: 0;
  }

  .g-container .company-profile .g-card .banner {
    overflow: hidden;
    background-color: #f1f5f8;
  }

  .g-container .company-profile .g-card .banner .banner-image {
    display: block;
    position: relative;
    height: 0;
    width: 100%;
    background-size: cover;
    padding-bottom: 48%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .g-container .company-profile .g-card .header-main {
    padding-top: 36px;
    padding-bottom: 20px;
  }

  .g-container .company-profile .g-card .header-main .header-icon {
    overflow: hidden;
    position: absolute;
    width: 60px;
    height: 60px;
    top: -44px;
    left: 50%;
    margin-left: -30px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 hsla(0, 1%, 84%, .5);
    z-index: 1;
    border-radius: 50%;
  }

  .g-container .company-profile .g-card .header-main .header-icon .icon-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 0;
    z-index: 1;
  }

  .g-container .company-profile .g-card .header-main .header-info {
    font-style: normal;
    text-align: center;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company {
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .info-title {
    font-size: 14px;
    font-weight: 300;
    color: #000;
    margin-left: auto;
    margin-right: auto;
    line-height: 1;
    margin-bottom: 10px;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .description {
    font-weight: 300;
    padding-left: 0.14rem;
    padding-right: 0.141429rem;
    white-space: pre-line;
    font-size: 12px;
    color: #abb4c3;
  }

  .g-container .cards .g-card {
    margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e8f0f8;
    border-width: 1px 0;
  }

  .g-container .cards .g-card .gm-card {
    padding-bottom: 0.282857rem;
  }

  .g-container .cards .gm-card-offset {
    margin-left: 0.562857rem;
    margin-right: 0.562857rem;
  }

  #MicroWebsite .company-preview .phone .phone_show .g-container .cards .gm-card-offset .slides .el-carousel .el-carousel__container .el-carousel__indicators .el-carousel__indicator .el-carousel__button {
    width: 10px !important;
  }

  .g-container .cards .gm-card-offset .gm-card-header {
    font-size: 14px;
    overflow: hidden;
    padding: 20px 0;
    line-height: 1;
  }

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title {
    font-size: 12px;
    margin: 0;
    font-weight: 700;
    color: #5AA2E7;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide {
    z-index: 1;
    background-color: #fff;
    position: relative;
    width: 100%;
    transition: all .5s ease;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item {
    margin-bottom: 0.6rem;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-left {
    overflow: hidden;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-left .link-image {
    position: relative;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 0;
    width: 73px;
    height: 60px;
    border-radius: 2px;
    background: #ccc;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right {
    overflow: hidden;
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    padding-left: 14px;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height {
    max-height: 57px;
    overflow: hidden;
    position: relative;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height span {
    margin-bottom: 10px;
    display: inline-block;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height .gamma-description {
    color: #262626;
    line-height: 14px;
    z-index: 0;
    font-size: 10px;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-title {
    text-decoration: none;
    color: #66a4f9;
    margin-bottom: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .swiper-container {
    height: 150px;
    position: relative
  }

  .g-container .swiper-container .swiper-wrapper .swiper-slide .media {
    height: 150px
  }

  .g-container .swiper-container .swiper-wrapper .swiper-slide .title {
    font-size: 12px;
    color: #abb4c3;
    font-weight: 400;
  }

  .g-container .swiper-container .swiper-wrapper .swiper-slide .media .response-img {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
    .position_detail {
      padding: 5px 15px;
      font-size: 14px;
      background-color: #fff;
      margin-top: 5px;
      clear: both;
      &::before {
        border-top: none;
      }
      dt {
        line-height: 20px;
        height: 20px;
        margin-bottom: 2px;
        font-size: 12px;
        color: #222;
        img {
          display: inline-block;
          vertical-align: middle;
          line-height: 24px;
        }
        .position_name {
          display: inline-block;
          vertical-align: middle;
        }
        .position_detail_right {
          float: right;
          font-size: 13px;
          font-weight: 500;
          color: #FDA732;
        }

      }
      .position_detail_money {
        margin-bottom: 6px;
        color: #666;
        span {
          margin-right: 2px;
          background-color: #f5f5f5;
          padding: 0px 5px;
          border-radius: 2px;
          color: #999999;
          font-size: 12px;
        }
      }
      .position_detail_date {
        color: #999;
        font-size: 12px;
        margin-bottom: 0;
        em {
          font-style: normal;
        }
      }
    }

  #MicroWebsite .company-detail .company-team .lh_attendance .teamIndex{
    background: #eef1f6;
  }
  #MicroWebsite .company-detail .company-team .lh_attendance .teamIndex .index{
    display: inline-block;
    vertical-align: middle;
  }

  #MicroWebsite .company-detail .company-team .team-btn-add {
   /* position: relative; */
   text-align: center;
  }
  /* #MicroWebsite .company-detail .company-team .team-btn-add .team-btn-add-1 {
    position: absolute;
    top: 9px;
    left: 50%;
    margin-left: -44px;
  } */
  .close {
    cursor: pointer;
    float: right;
    display: block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #bfcbd9;
    margin-right: 13px;
  }
  .close:hover {
    color: #5aa2e7;
  }

</style>

}

<style scoped>
.MicroWebsite{max-width:1066px;margin:0 auto;background-color: #fff;padding-left:20px;height: 615px;}
.submit_btn{position:absolute;bottom: -58px;}
.selectPositionList{
  margin-top: 10px;
   font-size: 12px;
}
.selectPositionList li{
  border-bottom: 1px solid #E5E5E5;
  padding: 10px 0;
}
.selectPositionList li:nth-child(1){
  border-top: 1px solid #E5E5E5;
}
.selectPositionList .title, .selectPositionList .details{
  margin-bottom: 10px;
}
.selectPositionList .prior{
  background-color: #FF566B;
  width: 20px;
  height: 10px;
  color: #fff;
  text-align: center;
  line-height: 10px;
  font-size: 10px;
  border-radius: 3px;
  padding: 1px 2px;
}
.selectPositionList .text{
  color: #222222;
}
.secondary{
  background-color: #E5E5E5;
  color: #999999;
  width: 20px;
  height: 13px;
  padding: 1px 2px;
  border-radius: 3px;
  text-align: center;
  line-height: 13px;
}
</style>
