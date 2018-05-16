<template>
  <div id="personal">
    <header class="clearfix">
      <!--<div v-if="form.userHeadImg == null" class="touxiang touxiang_name">{{form.name}}</div>-->
      <!--<img :src="form.userHeadImg" alt="头像" class="touxiang" v-if="form.userHeadImg != null">-->
      <div class="right">
        <div class="img_left">
          <div class="img_left_content">
            <div class="avatar" @click="headImg">
               <img :src="form.userHeadImg" alt="头像">
            </div>
            <div class="phoneNum">{{form.phone}}</div>
            <div class="companyName">{{form.companyName}}</div>
          </div>
          <div class="img_bottom" :class="{'bottom_height':form.isAdmin !== '管理员'}">
            <div class="avatar"></div>
            <div v-if="form.isAdmin =='管理员'" >
                     <div class="upgrade">
              <span>{{ versionName }}</span>
              <span class="toUpdate" @click="renewal()">升级</span>
            </div>
            <div class="lastNum">
              <span>剩余HR个数</span>
              <span class="num">{{hrUnUseCount}}/{{hrCount}}个</span>
            </div>
            <div class="toTime">
              <span>到期时间</span>
              <span class="date">{{effectDate}}</span>
            </div>
            </div>
          </div>


          <!--<p class="personal_name"><span style="height:28px">{{form.name}}</span>-->
          <!--<el-button class="revamp" @click="changeHeadImg" icon="edit">修改头像</el-button>-->
          <!--</p>-->
          <!--<p class="personal_post"><i class="iconfont"-->
          <!--:class="{'ff9948':form.userNature ==1}">&#xe608;&nbsp;&nbsp;</i><span>{{form.userNature == 1 ? "管理员" : "普通用户"}}</span><a-->
          <!--href="javascript:void(0);" v-if="form.userNature ==1" @click="renewal">续费</a></p>-->
        </div>
        <div class="content_right">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="公司信息" name="first" v-if="form.isAdmin =='管理员'">
              <!--公司信息-->
              <div class="hrm_module personal_content">
                <!--<ul class="hrm_module_con userinfo_ul">-->
                <!--<li class="userinfo">-->
                <!--<i class="iconfont">&#xe698;</i>-->
                <!--<h3>公司名</h3>-->
                <!--<p>{{userInfo.companyName}}</p>-->
                <!--</li>-->
                <!--<li class="userinfo">-->
                <!--<i class="iconfont">&#xe609;</i>-->
                <!--<h3>用户类型</h3>-->
                <!--<p>{{userInfo.userType}}</p>-->
                <!--</li>-->
                <!--<li class="userinfo">-->
                <!--<i class="iconfont">&#xe64b;</i>-->
                <!--<h3>到期时间</h3>-->
                <!--<p>{{userInfo.expirationDate}}</p>-->
                <!--</li>-->
                <!--<li class="userinfo">-->
                <!--<i class="iconfont">&#xe610;</i>-->
                <!--<h3>收货地址</h3>-->
                <!--<p v-if="userInfo.userAdress != ''">{{userInfo.userAdress}}</p>-->
                <!--<p v-if="userInfo.userAdress == ''" class="addUserAdress" @click="addUserAdress">添加地址</p>-->
                <!--</li>-->
                <!--</ul>-->
                <div class="per_upload">
                  <el-form ref="companyInfo" :model="companyInfo" label-width="100px" :rules="rules">
                    <el-form-item style="margin-bottom: 18px;" label="公司logo"
                                  class="imgUpload" @click.native="changeHeadImg('head')">
                        <el-upload
                          class="personal_upload"
                          :show-file-list="false"
                          :disabled="true"
                          :action="upLogoUrl">
                          <img v-if="companyInfo.companyImg" :src="companyInfo.companyImg" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <div v-if="!companyInfo.companyImg" class="logoTips">建议上传尺寸418*418</div>
                      <!-- @click.native="changeHeadImg2" -->

                    <!-- <el-form-item label="公司全称" class="personal_left" prop="companyName">
                      <el-input v-model="companyInfo.companyName" style="width: 230px"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简称" class="personal_right" prop="companyShortName">
                      <el-input v-model="companyInfo.companyShortName" style="width: 230px" placeholder="请输入公司简称"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" class="personal_left">
                      <el-cascader
                        :options="workCityLists"
                        v-model="companyInfo.companyCity"
                        @change="change"
                        change-on-select
                        placeholder="请选择公司地址"
                        style="width: 230px"
                      ></el-cascader>
                    </el-form-item> -->

                    <!-- <el-form-item label="具体地址" class="personal_right" prop="address">
                      <el-input v-model="companyInfo.address" placeholder="请输入具体地址" style="width: 230px"></el-input>
                    </el-form-item> -->
                    <el-form-item label="所属行业" class="personal_left">
                      <el-select v-model="companyInfo.domain" @change="website_s" style="width: 230px;">
                        <el-option v-for="item in domainList" :label="item.name" :value="item.id"  :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="公司规模" class="personal_right">
                      <el-select v-model="companyInfo.dimensions" style="width: 230px">
                        <el-option v-for="item in options" :label="item.label" :value="item.value"  :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="公司性质" class="personal_left">
                      <el-select v-model="companyInfo.status" style="width: 230px">
                        <el-option v-for="item in s_options" :label="item.label" :value="item.value"  :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>

                 <div class="btn">
                  <el-button type="primary" @click="saveCompanyInfo('companyInfo')">保存</el-button>
                </div>
                </div>

                <div id="companyInfoEdit">
                  <p class="companyInfoEditTitle">公司信息</p><el-button type="text" @click="addCompanyNum">+ 添加一条公司信息</el-button>
                  <ul class="companyInfoList">
                    <li>
                      <div class="InfoListLeft">
                        <div class="img">
                           <i class="iconfont">&#xe68b;</i>
                        </div>
                        <div class="InfoListLeftWrap">
                          <div class="companyName">{{companyInfo.companyName}}</div>
                          <div class="phone" v-show="companyInfo.phone">联系方式：{{companyInfo.phone}}</div>
                          <div class="address" v-show="companyInfo.address">公司地址：{{companyInfo.address}}</div>
                        </div>
                      </div>
                      <div class="rightBtn">
                        <el-button type="text" @click="editCompanyInfo">
                          <i class="el-icon-edit"></i>
                        </el-button>
                         <!-- <el-button type="text">
                          <i class="el-icon-delete"></i>
                        </el-button> -->
                      </div>
                    </li>
                    <li v-for="item in branchCompanyList" :key="item.id" v-show="branchCompanyList.length!=0&&branchCompanyList.length">
                      <div class="InfoListLeft">
                         <div class="img">
                          <i class="iconfont">&#xe68b;</i>
                        </div>
                        <div class="InfoListLeftWrap">
                          <div class="companyName">{{item.companyName}}</div>
                          <div class="phone">联系方式：{{item.branchPhone}}</div>
                          <div class="address">公司地址：{{item.address}}</div>
                        </div>
                      </div>
                      <div class="rightBtn">
                        <el-button type="text" @click="editbBranchCompanyInfo(item)">
                          <i class="el-icon-edit"></i>
                        </el-button>
                         <el-button type="text" @click="delBranchCompany(item)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="我的订单" name="second" v-if="form.isAdmin=='管理员'">
              <!--我的订单-->
              <div class="hrm_module">
                <div class="hrm_module_con">
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    border>
                   <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                    <el-table-column
                      prop="oid"
                      label="订单编号">
                    </el-table-column>
                    <el-table-column
                      prop="title"
                      label="服务名称">
                    </el-table-column>
                    <el-table-column
                      prop="extHrNum"
                      label="HR数量">
                    </el-table-column>
                    <el-table-column
                      prop="serviePlace"
                      label="服务点">
                    </el-table-column>
                    <el-table-column
                      prop="periodStr"
                      label="有效期"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="paidat"
                      label="购买时间">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="金额">
                    </el-table-column>
                    <el-table-column
                      prop="decrease"
                      label="优惠金额">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template scope="scope">
                        <el-button type="text" size="small" v-if="scope.row.status == '1'">已支付</el-button>
                        <el-button type="text" size="small" @click="ContinueToPay(scope.row.oid)"
                                   v-if="scope.row.status == '0'">继续支付
                        </el-button>
                        <el-button type="text" size="small" v-if="scope.row.status == '2'">订单失效</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400"
                  class="personal_page"
                  >
                  </el-pagination> -->
                </div>
              </div>
            <el-pagination
              class="margin_t_20"
              @size-change="changePageSize"
              @current-change="changePageNum"
              :current-page="config.pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="config.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="config.totalCount">
            </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="账号设置" name="third">
              <!--个人中心-->
              <div class="hrm_module">
                <div class="hrm_module_con clearfix" style="overflow:hidden;">
                  <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="昵称" class="personal_left">
                      <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" class="personal_right">
                      <el-input v-model="form.realname" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机" class="personal_left">
                      <el-input v-model="form.phone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="密码" class="personal_right">
                      <el-button @click="dialogFormVisible = true">修改密码</el-button>
                    </el-form-item>
                    <el-form-item label="性别" class="personal_left">
                      <!--<el-input v-model="form.sexName" disabled></el-input>-->
                      <el-radio-group v-model="form.sex" @change="sexChoose">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="公司" class="personal_right">
                      <el-input v-model="form.companyName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="部门" class="personal_left">
                      <el-input v-model="form.deptName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="职位" class="personal_right">
                      <el-input v-model="form.positionName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色" class="personal_left">
                      <el-input v-model="form.hrmRoleId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工号" class="personal_right">
                      <el-input v-model="form.userNo" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" class="personal_left birdthday">
                      <!-- <el-input v-model="form.birdthDay" placeholder="请您输入出生日期" @change="startDate"></el-input> -->
                    <el-date-picker
                      v-model="form.birdthDay"
                      type="date"
                      @change="startDate"
                      class="chooseBirthday"
                      placeholder="请选择出生日期">
                    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="入职日期" class="personal_right">
                      <el-input v-model="form.joinDate" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" class="personal_left">
                      <el-input v-model="form.email" disabled></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="fourth" v-if="form.isAdmin =='管理员'">
              <jurisdiction></jurisdiction>
            </el-tab-pane>
              <my-upload field="img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                :url="upLogoUrl"
                v-model="show2"
                :width="300"
                :height="300"
                :params="params2"
                :headers="headers"
                img-format="png">
            </my-upload>
            <my-upload field="img"
                @crop-success="cropSuccess2"
                @crop-upload-success="cropUploadSuccess2"
                @crop-upload-fail="cropUploadFail"
                :url="upLogoUrl"
                v-model="show"
                :width="300"
                :height="300"
                :params="params2"
                :headers="headers"
                img-format="png">
            </my-upload>
               <my-upload field="img"
                @crop-success="cropSuccess3"
                @crop-upload-success="cropUploadSuccess3"
                @crop-upload-fail="cropUploadFail"
                :url="upLogoUrl2"
                v-model="show3"
                :width="300"
                :height="300"
                :params="params"
                :headers="headers"
                img-format="png">
            </my-upload>
          </el-tabs>
        </div>
      </div>
    </header>
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" v-model="dialogFormVisible" size="tiny">
      <el-form :model="password" :rules="rulesPass" ref="password">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPass">
          <el-input type="password" v-model="password.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="pass" required>
          <el-input type="password" v-model="password.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkPass" required>
          <el-input type="password" v-model="password.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadPassword('password')">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增地址-->
    <el-dialog title="新增地址" :visible.sync="addAdressDialog" size="">
      <el-form :model="addAdress" :rules="rules" label-position="top" ref="addAdress">
        <el-form-item label="收货地址" label-width="120px" required>
          <el-col :span="8">
            <el-form-item prop="province">
              <el-select v-model="addAdress.province" placeholder="请选择" @change="changeProvince">
                <el-option
                  v-for="item in provinceArr"
                  :label="item.name"
                   :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="city">
              <el-select v-model="addAdress.city" placeholder="请选择" @change="changeCity">
                <el-option
                  v-for="item in cityArr"
                  :label="item.name"
                   :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="addAdress.district" placeholder="请选择">
                <el-option
                  v-for="item in districtArr"
                  :label="item.name"
                   :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="具体地址" label-width="120px" prop="specificAddress">
          <el-input v-model="addAdress.specificAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" label-width="120px" prop="consigneeName">
          <el-input v-model="addAdress.consigneeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人联系号码" label-width="120px" prop="consigneePhone">
          <el-input v-model="addAdress.consigneePhone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdressDialog = false">取 消</el-button>
        <el-button type="primary" @click="addAdressSubmit('addAdress')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="公司信息"
      :visible.sync="branchCompanyDialog"
       class="companyInfoDialog"
      >
      <el-form :model="branchCompany" class="branchForm" :rules="rulesBranch">
        <el-form-item label="公司全称" :label-width="formLabelWidth" class="branchFormItem" prop="companyName" >
          <el-input v-model="branchCompany.companyName" auto-complete="off" class="inputW" ></el-input>
        </el-form-item>
        <el-form-item label="公司简称" :label-width="formLabelWidth" class="branchFormItem" prop="companyShortName">
          <el-input v-model="branchCompany.companyShortName" auto-complete="off" class="inputW"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="province" label="所属区域" class="inlineBlock" :label-width="formLabelWidth">
          <el-select v-model="branchAddress.province" placeholder="请选择" @change="branchChangeProvince" class="iWidth">
            <el-option
              v-for="item in provinceArr"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item prop="city" class="inlineBlock">
          <el-select v-model="branchAddress.city" placeholder="请选择" @change="branchChangeCity" class="iWidth">
            <el-option
              v-for="item in cityArr"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="inlineBlock">
          <el-select v-model="branchAddress.district" placeholder="请选择" class="iWidth">
            <el-option
              v-for="item in districtArr"
              :label="item.name"
               :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- 高德地图 -->
        <div class="amap-page-container">
          <el-form-item  class="need" label="公司地址" :label-width="formLabelWidth">
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
          </el-form-item>
            <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events">
              <el-amap-marker :position="marker"></el-amap-marker>
            </el-amap>
        </div>

         <el-form-item label="联系方式" :label-width="formLabelWidth" class="branchFormTel">
          <el-input v-model="branchCompany.branchPhone" auto-complete="off" :maxlength="13"></el-input>
        </el-form-item>

        <!-- <el-form-item label="联系方式" :label-width="formLabelWidth"> -->
           <!-- <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :disabled="true"
              :action="upLogoUrl">
              <img v-if="branchCompany.companyImg" :src="branchCompany.companyImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="!branchCompany.companyImg" class="logoTips">建议上传尺寸120*120</div> -->
          <!-- </el-form-item> -->
          <el-form-item  :label-width="formLabelWidth" label="公司logo" @click.native="changeHeadImg('branch')" class="imgUpload">
            <el-upload
              class="personal_upload"
              :show-file-list="false"
              :disabled="true"
              :action="upLogoUrl">
              <img v-if="branchCompany.companyImg" :src="branchCompany.companyImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="!branchCompany.companyImg" class="logoTips">建议上传尺寸120*120</div>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canclebranchCompanyDialog">取 消</el-button>
        <el-button type="primary" @click="getAddBranchCompany">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="公司信息"
      :visible.sync="companyInfoDialog"
       class="companyInfoDialog"
      >
      <el-form :model="companyInfo" class="branchForm" :rules="rulesBranch">
        <el-form-item label="公司全称" :label-width="formLabelWidth" class="branchFormItem" prop="companyName">
          <el-input v-model="companyInfo.companyName" auto-complete="off" class="inputW" ></el-input>
        </el-form-item>
        <el-form-item label="公司简称" :label-width="formLabelWidth" class="branchFormItem" prop="companyShortName">
          <el-input v-model="companyInfo.companyShortName" auto-complete="off" class="inputW"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="province" label="所属区域" class="inlineBlock" :label-width="formLabelWidth">
          <el-select v-model="addAdress.province" placeholder="请选择" @change="changeProvince" class="iWidth">
            <el-option
              v-for="item in provinceArr"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="city" class="inlineBlock">
          <el-select v-model="addAdress.city" placeholder="请选择" @change="changeCity" class="iWidth">
            <el-option
              v-for="item in cityArr"
              :label="item.name"
              :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item class="inlineBlock">
          <el-select v-model="addAdress.district" placeholder="请选择" class="iWidth">
            <el-option
              v-for="item in districtArr"
              :label="item.name"
               :key="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->

        <!-- 高德地图 -->
        <div class="amap-page-container">
          <el-form-item class="need" label="公司地址" :label-width="formLabelWidth">
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
          </el-form-item>
            <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events">
              <el-amap-marker :position="marker"></el-amap-marker>
            </el-amap>
        </div>

         <el-form-item label="联系方式" :label-width="formLabelWidth" class="branchFormTel" prop="phone">
          <el-input v-model="companyInfo.phone" auto-complete="off" :maxlength="13"></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系方式" :label-width="formLabelWidth"> -->
           <!-- <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :disabled="true"
              :action="upLogoUrl">
              <img v-if="branchCompany.companyImg" :src="branchCompany.companyImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="!branchCompany.companyImg" class="logoTips">建议上传尺寸120*120</div> -->
          <!-- </el-form-item> -->
          <!-- <el-form-item  :label-width="formLabelWidth" label="公司logo" @click.native="changeHeadImg" class="imgUpload">
            <el-upload
              class="personal_upload"
              :show-file-list="false"
              :disabled="true"
              :action="upLogoUrl">
              <img v-if="companyInfo.companyImg" :src="branchCompany.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="!companyInfo.companyImg" class="logoTips">建议上传尺寸120*120</div>
          </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleCompanyDialog">取 消</el-button>
        <el-button type="primary" @click="saveIndexCompanyInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Personaledit from "./personalEdit";
import allcity from "../../script/allcity.js";
// import 'babel-polyfill'; // es6 shim
import myUpload from "vue-image-crop-upload/upload-2.vue";
import Util from "../../script/util.js";
import md5 from "js-md5";
import { AMapManager } from "vue-amap";
import jurisdiction from "./jurisdiction"
let amapManager = new AMapManager();
export default {
  name: "personal",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.password.checkPass !== "") {
          this.$refs.password.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.password.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //经度纬度
      longitude: "",
      latitude: "",
      formattedAddress: "",
      vid: "amap-vue-1",
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        moveend: () => {
          let mapCenter = this.amapManager.getMap().getCenter();
          console.log(mapCenter);
          console.log(this.amapManager.getMap());
          this.center = [mapCenter.getLng(), mapCenter.getLat()];
          this.marker = this.center;
        },
        zoomchange: () => {
          this.zoom = this.amapManager.getMap().getCenter();
        }
      },
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.formattedAddress = result.formattedAddress;
                  console.log(self.formattedAddress);
                  // self.$nextTick();
                }
              });
            }
          }
        }
      ],
      amapManager: amapManager,
      marker: [121.59996, 31.197646],
      searchOption: {
        city: "杭州",
        citylimit: false
      },
      branchCompanyDialog: false,
      formLabelWidth: "520px",
      branchCompany: {
        companyId: "",
        branchCompanyId: "",
        companyName: "",
        address: "",
        companyShortName: "",
        domain: "",
        dimensions: "",
        status: "",
        branchPhone: "",
        companyImg: "",
        province: "",
        city: "",
        district: ""
      },
      branchCompanyList: [],
      ids: "",
      imageUrl: "",
      upLogoUrl: Util.uploadURLForCommon,
      upLogoUrl2: Util.imgUploadURL,
      params2: {
        param: JSON.stringify({ businessId: 14, fId: -1 }),
        sign: md5(
          "method" +
            "fileUpload/insertFileRecord" +
            "param" +
            JSON.stringify({
              businessId: 14,
              fId: -1
            }) +
            "ecbao"
        )
      },
      params: {},
      activeName: "first",
      companyInfo: {
        companyCity: [],
        url: "",
        domain: 1,
        dimensions: 1,
        status: 7,
        phone: "",
        address: "",
        companyImg: "",
        companyName: "",
        region: "",
        province: "",
        city: "",
        district: ""
      },
      form: {
        sex: "2",
        birdthDay: "",
        companyName: "",
        userRoles: 2,
        userHeadImg: "http://121.199.182.2/hrm/upload/head.png"
      },
      address: "",
      companyShortName: "",
      config: {
        pageSize: 10,
        pageNum: 1,
        processStatus: "1",
        totalCount: 0
      },

      domainList: [],
      s_options: [
        {
          value: 1,
          label: "天使轮"
        },
        {
          value: 2,
          label: "A轮"
        },
        {
          value: 3,
          label: "B轮"
        },
        {
          value: 4,
          label: "C轮"
        },
        {
          value: 5,
          label: "D轮"
        },
        {
          value: 6,
          label: "上市"
        },
        {
          value: 7,
          label: "未融资"
        }
      ],
      fileList: [
        {
          name: "",
          url: ""
        }
      ],
      workCityLists: [],
      company_addresses: [],
      dialogFormVisible: false,
      password: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      ids: "",
      options: [
        {
          value: 1,
          label: "0-50人"
        },
        {
          value: 2,
          label: "50-100人"
        },
        {
          value: 3,
          label: "100-500人"
        },
        {
          value: 4,
          label: "500-1000人"
        },
        {
          value: 5,
          label: "1000人以上"
        }
      ],
      hrUnUseCount: "",
      versionName: "",
      hrCount: "",
      effectDate: "",
      formLabelWidth: "90px",
      tableData: [],
      userInfo: {},
      provinceArr: allcity.province,
      districtArr: [],
      cityArr: [],
      addAdressDialog: false,
      addAdress: {
        province: "",
        city: "",
        district: "",
        specificAddress: "",
        consigneeName: "",
        consigneePhone: ""
      },
      branchAddress: {
        province: "",
        city: "",
        district: ""
      },
      show2: false,
      show3: false,
      companyId: "",
      rules: {
        province: [
          { type: "number", required: true, message: "请选择省", trigger: "change" }
        ],
        city: [
          { type: "number", required: true, message: "请选择市", trigger: "change" }
        ],
        specificAddress: [
          { required: true, message: "请输入具体地址", trigger: "blur" }
        ],
        consigneeName: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        consigneePhone: [
          { required: true, message: "请输入收货人联系方式", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "change" }
        ],
        companyCity: [
          {
            type: "array",
            required: true,
            message: "请选择公司城市",
            trigger: "change"
          }
        ],
        address: [{ required: true, message: "请输入具体地址", trigger: "change" }],
        companyShortName: [
          { required: true, message: "请输入公司简称", trigger: "change" }
        ],
        domain: [{ required: true, message: "请选择所属行业", trigger: "change" }],
        dimensions: [
          {
            type: "number",
            required: true,
            message: "请选择公司规模",
            trigger: "change"
          }
        ],
        status: [
          {
            type: "number",
            required: true,
            message: "请选择公司规模",
            trigger: "change"
          }
        ]
      },
      rulesPass: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPass: [{ required: true, message: "请输入旧密码", trigger: "blur" }]
      },
      rulesBranch: {
        companyName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        companyShortName: [
          { required: true, message: "请输入公司简称", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }]
      },
      show: false,
      headers: {},
      branchCompanyId: "",
      companyInfoDialog: false,
      headImgType:'',   //changeHeadImg类型
    };
  },
  components: {
    myUpload,
    Personaledit,
    jurisdiction
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.params.companyInfoSign == true) {
      this.activeName = "first";
    } else if(this.$route.params.companyInfoSign2 == true){
      //shezhi
      this.activeName = "third";
    }else{
       this.activeName = "third";
    }
    this.getUserInfo();
    //  this.getBuyUserInfo();
    //            this.getAdress();
    this.getMyOrder();
    // this.demo();
    this.transitionWork();
    this.getAllCompanyDomain();
    this.getHrCount();
    this.getCompanyInfo();
    this.getBranchCompanyInfo();
  },
  methods: {
    startDate() {
      this.chooseSave();
    },
    sexChoose() {
      this.chooseSave();
    },
    handleAvatarSuccess(res, file) {
      if(res.code == 0){
        this.companyInfo.companyImg = res.data.fileInfoList[0].url;
        this.companyInfo.companyImgId	= res.data.fileInfoList[0].id;
      }
    },
    //查询可用的hr 数量，总共hr 数量和有效期
    getHrCount() {
      var _this = this;
      var method = "hrm/HRCount";
      var param = JSON.stringify({});
      var successd = function(res) {
        if (res.data.code == 0) {
          console.log(res.data);
          _this.hrUnUseCount = res.data.data.hrUnUseCount;
          _this.versionName = res.data.data.versionName;
          _this.hrCount = res.data.data.hrCount;
          _this.effectDate = res.data.data.effectDate;
        }
      };
      _this.$http(method, param, successd);
    },
    //修改个人中心生日和性别 1:男 2:女
    chooseSave() {
      var _this = this;
      // if (_this.form.birthday == null) {
      //   // _this.$message({
      //   //   message: "请您输入出生日期",
      //   //   type: "success"
      //   // });
      //   return;
      // }
      var method = "user/updateUserSexAndBirth";
      var param = JSON.stringify({
        sex: _this.form.sex,
        birthday: _this.$date(_this.form.birdthDay)
      });
      var successd = function(res) {
        if (res.data.code == 0) {
          // _this.$message({
          //   message: res.data.data,
          //   type: "success"
          // });
        }
      };
      _this.$http(method, param, successd);
    },
    //处理省市
    transitionWork() {
      let provinces = allcity.province,
        citys = allcity.city;
      for (let j = 0; j < provinces.length; j++) {
        let item = provinces[j];
        item.value = item.name;
        item.label = item.name;
        item.children = citys[item.id];
      }
      for (let k in citys) {
        let city = citys[k];
        for (let i = 0; i < city.length; i++) {
          let item = city[i];
          item.value = item.name;
          item.label = item.name;
        }
      }
      this.workCityLists = provinces;
    },
    //查询公司领域列表
    getAllCompanyDomain() {
      var _this = this;
      var method = "miniRecruit/getAllCompanyDomain";
      var param = JSON.stringify({});
      var successd = function(res) {
        if (res.data.code == 0) {
          _this.domainList = res.data.data;
        }
      };
      _this.$http(method, param, successd);
    },
    //查询公司信息
    website_s(val) {
      this.form.website = val;
    },
    change(item) {
      this.form.companyCity = item;
    },
    changePageSize(pageSize) {
      var self = this;
      self.config.pageSize = pageSize;
      self.config.pageNum = 1;
      this.getMyOrder();
    },
    changePageNum(pageNum) {
      var self = this;
      self.config.pageNum = pageNum;
      this.getMyOrder();
    },
    //修改公司信息
    saveCompanyInfo(formName) {
      console.log('user/updateCompanyInfo')
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this;
          // if (!this.companyInfo.companyImg) {
          //   _this.$message({
          //     message: "请您上传头像图片",
          //     type: "info"
          //   });
          //   return;
          // }
          var method = "user/updateCompanyInfo";
          var param = JSON.stringify({
            companyId: _this.companyId,
            companyName: _this.companyInfo.companyName,
            companyAddress: _this.companyInfo.address,
            companyShortName: _this.companyInfo.companyShortName,
            companyDomain: _this.companyInfo.domain,
            companyDimensions: _this.companyInfo.dimensions,
            companyPhone: _this.companyInfo.phone,
            companyRegion: _this.companyInfo.region,
            companyStatus: _this.companyInfo.status,
            companyImgId:_this.companyInfo.companyImgId,
            companyImg: _this.companyInfo.companyImg
          });
          console.log(param);
          var successd = function(res) {
            if (res.data.code == 0) {
              _this.$message({
                message: res.data.data,
                type: "success"
              });
            }
          };
          _this.$http(method, param, successd);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改公司信息接口
    saveIndexCompanyInfo() {
      var self = this;
      //获取地址对应的名字
      for (var i = 0; i < self.provinceArr.length; i++) {
        if (self.addAdress.province == self.provinceArr[i].id) {
          self.companyInfo.province = self.provinceArr[i]["name"];
        }
      }
      for (var i = 0; i < self.cityArr.length; i++) {
        if (self.addAdress.city == self.cityArr[i].id) {
          self.companyInfo.city = self.cityArr[i]["name"];
        }
      }
      for (var i = 0; i < self.districtArr.length; i++) {
        if (self.addAdress.district == self.districtArr[i].id) {
          self.companyInfo.district = self.districtArr[i]["name"];
        }
      }
      var method = "user/updateCompanyInfo";
      var param = JSON.stringify({
        companyId: self.companyId,
        companyName: self.companyInfo.companyName,
        companyAddress: self.companyInfo.address,
        companyShortName: self.companyInfo.companyShortName,
        companyDomain: self.companyInfo.domain,
        companyDimensions: self.companyInfo.dimensions,
        companyPhone: self.companyInfo.phone,
        companyRegion:
          self.companyInfo.province +
          self.companyInfo.city +
          self.companyInfo.district,
        companyStatus: self.companyInfo.status,
        companyImgId:self.companyInfo.companyImgId,
        companyImg: self.companyInfo.companyImg,
        companyLongitude: self.longitude,
        companyLatitude: self.latitude
      });
      console.log(param);
            if (!self.companyInfo.companyName) {
        self.$message({
          message: "请您输入公司全称",
          type: "info"
        });
        return;
      }
      if (!self.companyInfo.companyShortName) {
        self.$message({
          message: "请您输入公司简称",
          type: "info"
        });
        return;
      }
      // if (
      //   !self.companyInfo.province ||
      //   !self.companyInfo.city ||
      //   !self.companyInfo.district
      // ) {
      //   self.$message({
      //     message: "请您选择区域",
      //     type: "info"
      //   });
      //   return;
      // }
      if (!self.companyInfo.address) {
        self.$message({
          message: "请输入公司地址",
          type: "info"
        });
        return;
      }
      var successd = function(res) {
        if (res.data.code == 0) {
          self.$message({
            message: res.data.data,
            type: "success"
          });
          self.companyInfoDialog = false;
          self.getCompanyInfo();
        }
      };
      self.$http(method, param, successd);
    },
    //查询公司信息接口
    getCompanyInfo() {
      var _this = this;
      var method = "user/getCompanyInfo";
      var param = JSON.stringify({});
      var successd = function(res) {
        if (res.data.code == 0) {
          _this.companyInfo = res.data.data;
          _this.companyInfo.companyName = res.data.data.companyName;
          _this.companyInfo.phone = res.data.data.phone;
          _this.companyInfo.address = res.data.data.address;
          _this.companyInfo.domain = res.data.data.domain;
          _this.companyInfo.address = res.data.data.address;
          _this.companyInfo.dimensions = res.data.data.dimensions;
          _this.companyInfo.status = res.data.data.status;
          _this.companyInfo.companyImg = res.data.data.companyImg;
          _this.companyInfo.region = _this.filter(res.data.data.region);
          // _this.companyInfo.province = res.data.data.region.split(",")[0]
          //   ? res.data.data.region.split(",")[0]
          //   : "";
          // _this.addAdress.province = res.data.data.region.split(",")[0]
          //   ? res.data.data.region.split(",")[0]
          //   : "";

          // _this.companyInfo.city = res.data.data.region.split(",")[1]
          //   ? res.data.data.region.split(",")[1]
          //   : "";
          //  _this.addAdress.city = res.data.data.region.split(",")[1]
          //   ? res.data.data.region.split(",")[1]
          //   : "";
          // _this.companyInfo.district = res.data.data.region.split(",")[2]
          //   ? res.data.data.region.split(",")[2]
          //   : "";
          //  _this.addAdress.district = res.data.data.region.split(",")[2]
          //   ? res.data.data.region.split(",")[2]
          //   : "";
        }
      };
      _this.$http(method, param, successd);
    },
    filter(item) {
      let list = item.split(",").join("");
      return list;
    },
    //删除子公司信息接口
    delBranchCompany(item) {
      var self = this;
      self.branchCompanyId = item.id;
      self
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          var method = "user/delBranchCompany",
            param = JSON.stringify({
              branchCompanyId: self.branchCompanyId
            }),
            successd = function(res) {
              if (res.data.code == 0) {
                console.log(res.data);
                self.$message({
                  type: "success",
                  message: "删除成功!"
                });
                self.getBranchCompanyInfo();
              }
            };
          self.$http(method, param, successd);
        })
        .catch(() => {});
    },
    //查询子公司信息接口
    getBranchCompanyInfo() {
      var self = this;
      self.branchCompany = {};
      var method = "user/getBranchCompanyInfo",
        param = JSON.stringify({}),
        successd = function(res) {
          if (res.data.code == 0) {
            if (res.data.data == "") {
              self.branchCompanyList == "";
              return;
            }
            console.log('chaxunzigongsi',res.data.data)
            self.branchCompanyList = res.data.data;
            console.log('self.branchCompanyList',self.branchCompanyList)
          }
        };
      self.$http(method, param, successd);
    },
    getBranchCompanyInfo2(list) {
      var self = this;
      self.branchCompany = {
        companyId: "",
        branchCompanyId: "",
        companyName: "",
        address: "",
        companyShortName: "",
        domain: "",
        dimensions: "",
        status: "",
        branchPhone: "",
        companyImg: "",
        province: "",
        city: "",
        district: ""
      };
      var method = "user/getBranchCompanyInfo",
        param = JSON.stringify({}),
        successd = function(res) {
          if (res.data.code == 0) {
            self.branchCompanyList = res.data.data;
            self.branchCompanyList.forEach(item => {
              if (list.id == item.id) {
                self.branchCompany = item;
              }
              return self.branchCompany;
            });
          }
        };
      self.$http(method, param, successd);
    },
    //修改子公司信息接口
    getAddBranchCompany() {
      console.log('addBranchCompany')
      var _this = this;
      // if (!this.ids) {
      //   _this.$message({
      //     message:'请您上传头像图片',
      //     type:'info'
      //   })
      //   return;
      // }
      for (var i = 0; i < _this.provinceArr.length; i++) {
        if (_this.branchAddress.province == _this.provinceArr[i].id) {
          _this.branchCompany.province = _this.provinceArr[i]["name"];
        }
      }
      for (var i = 0; i < _this.cityArr.length; i++) {
        if (_this.branchAddress.city == _this.cityArr[i].id) {
          _this.branchCompany.city = _this.cityArr[i]["name"];
        }
      }
      for (var i = 0; i < _this.districtArr.length; i++) {
        if (_this.branchAddress.district == _this.districtArr[i].id) {
          _this.branchCompany.district = _this.districtArr[i]["name"];
        }
      }

      var method = "user/addBranchCompany";
      if (!_this.branchCompanyId) {
        var param = JSON.stringify({
          companyId: _this.companyId,
          companyName: _this.branchCompany.companyName,
          address: _this.branchCompany.address,
          companyShortName: _this.branchCompany.companyShortName,
          domain: _this.companyInfo.domain,
          dimensions: _this.companyInfo.dimensions,
          branchPhone: _this.branchCompany.branchPhone,
          status: _this.companyInfo.status,
          companyImg: _this.branchCompany.companyImg,
          longitude: _this.longitude,
          latitude: _this.latitude,
          region:
            _this.branchCompany.province +
            "," +
            _this.branchCompany.city +
            "," +
            _this.branchCompany.district
        });
      } else {
        var param = JSON.stringify({
          branchCompanyId: _this.branchCompanyId,
          companyId: _this.companyId,
          companyName: _this.branchCompany.companyName,
          address: _this.branchCompany.address,
          companyShortName: _this.branchCompany.companyShortName,
          domain: _this.companyInfo.domain,
          dimensions: _this.companyInfo.dimensions,
          branchPhone: _this.branchCompany.branchPhone,
          status: _this.companyInfo.status,
          companyImg: _this.branchCompany.companyImg,
          longitude: _this.longitude,
          latitude: _this.latitude,
          region:
            _this.branchCompany.province +
            _this.branchCompany.city +
            _this.branchCompany.district
        });
      }

      if (!_this.branchCompany.companyName) {
        _this.$message({
          message: "请您输入公司全称",
          type: "info"
        });
        return;
      }
      if (!_this.branchCompany.companyShortName) {
        _this.$message({
          message: "请您输入公司简称",
          type: "info"
        });
        return;
      }
      // if (
      //   !_this.branchCompany.province ||
      //   !_this.branchCompany.city ||
      //   !_this.branchCompany.district
      // ) {
      //   _this.$message({
      //     message: "请您选择区域",
      //     type: "info"
      //   });
      //   return;
      // }
      if (!_this.branchCompany.address) {
        _this.$message({
          message: "请输入公司地址",
          type: "info"
        });
        return;
      }
      console.log(param);
      var successd = function(res) {
        if (res.data.code == 0) {
          _this.$message({
            message: res.data.data,
            type: "success"
          });
          _this.branchCompanyDialog = false;
          _this.getBranchCompanyInfo();
          _this.getCompanyInfo();
        }
      };
      _this.$http(method, param, successd);
    },
    getArrayCityFilter(data) {
      let arr = data.split('"');
      let arr2 = [];
      arr2.push(arr[1]);
      arr2.push(arr[3]);
      console.log(arr, "13");
      return arr2;
    },
    beforeAvatarUpload() {},
    banner_success() {},
    handleClick(val) {
    },
    demo() {
      var params = new URLSearchParams();
      params.append("param", JSON.stringify({ aaa: "@ASD#$%^" }));
      this.$ajax({
        method: "post",
        url: Util.url + "?method=buy/addDeliveryAddress",
        data: params
      })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(params) {
          console.log(params);
        });
      // this.$ajax.post(Util.url+'?method=buy/addDeliveryAddress',{
      //     param:'1!@#$%^&*12321$%^&'
      // }).then(function(params) {

      // })
    },
    getUserInfo() {
      var self = this;
      var method = "user/getUserByUserId";
      var param = JSON.stringify({});
      var successd = function(res) {
        self.form = res.data.data;
        if (self.form.birdthDay) {
          self.form.birdthDay = self.form.birdthDay.slice(0, 10);
        }
        if (self.form.joinDate) {
          self.form.joinDate = self.form.joinDate.slice(0, 10);
        }
        if (self.form.fileInfo == null) {
          var param = JSON.stringify({
            fileId: "",
            companyId: self.form.companyId,
            userId: self.form.id
          });
          self.params = {
            param: JSON.stringify({
              fileId: "",
              companyId: self.form.companyId,
              userId: self.form.id
            })
          };
        } else {
          var param = JSON.stringify({
            fileId: self.form.fileInfo.id,
            companyId: self.form.companyId,
            userId: self.form.id
          });
        }
        if (!self.form.userHeadImg || self.form.userHeadImg == "") {
          self.form.userHeadImg = "http://121.199.182.2/hrm/upload/head.png";
        }
        self.params = {
          param: param,
          sign: md5(
            "method" +
              "fileUpload/uploadUserHeadImg" +
              "param" +
              param +
              "ecbao"
          )
        };

        self.form.sex = String(res.data.data.sex);
        self.companyId = res.data.data.companyId;
        self.form.isAdmin = res.data.data.isAdmin == 1 ? "管理员" : "";
        self.form.hrmRoleId = self.filterRoles(res.data.data.hrmRoleId);
      };
      self.$http(method, param, successd);
    },

    filterRoles(item) {
      var self = this;
      if (item == 1) {
        self.form.hrmRoleId = "管理员";
      } else if (item == 2) {
        self.form.hrmRoleId = "员工";
      } else if (item == 3) {
        self.form.hrmRoleId = "财务";
      } else if (item == 4) {
        self.form.hrmRoleId = "招聘专员";
      } else if (item == 5) {
        self.form.hrmRoleId = "面试官";
      } else if (item == 6) {
        self.form.hrmRoleId = "苏宁云商城用户";
      } else {
        self.form.hrmRoleId = "人事专员";
      }
      return self.form.hrmRoleId;
    },
    getBuyUserInfo() {
      var self = this;
      var method = "buy/userInfo",
        param = JSON.stringify({}),
        successd = function(res) {
          self.userInfo = res.data.data;
        };
      self.$http(method, param, successd);
    },
    addUserAdress() {
      this.addAdressDialog = true;
    },
    getAdress() {
      // this.$ajsx.jsonp("//aijuhr.com/work/node_modules/angular/allcity.js",{jsonp:"cb"}).then(function (res) {
      //     console.log(res);
      // })
      console.log(allcity);
    },
    changeProvince() {
      this.cityArr = allcity.city[this.addAdress.province];
      // this.addAdress.city = "";
    },
    changeCity() {
      this.districtArr = allcity.district[this.addAdress.city];
      // this.addAdress.district = "";
    },
    branchChangeProvince() {
      this.cityArr = allcity.city[this.branchAddress.province];
      // this.addAdress.city = "";
    },
    branchChangeCity() {
      this.districtArr = allcity.district[this.branchAddress.city];
      // this.addAdress.district = "";
    },
    addAdressSubmit(formName) {
      var self = this;
      //获取地址对应的名字
      for (var i = 0; i < self.provinceArr.length; i++) {
        if (self.addAdress.province == self.provinceArr[i].id) {
          var province = self.provinceArr[i]["name"];
        }
      }
      for (var i = 0; i < self.cityArr.length; i++) {
        if (self.addAdress.city == self.cityArr[i].id) {
          var city = self.cityArr[i]["name"];
        }
      }
      for (var i = 0; i < self.districtArr.length; i++) {
        if (self.addAdress.district == self.districtArr[i].id) {
          var district = self.districtArr[i]["name"];
        }
      }
      self.$refs[formName].validate(valid => {
        if (valid) {
          var method = "buy/addDeliveryAddress";
          var param = JSON.stringify({
            region: province + city + district,
            address: self.addAdress.specificAddress,
            contact: self.addAdress.consigneeName,
            contactPhone: self.addAdress.consigneePhone
          });
          var successd = function(res) {
            self.addAdressDialog = false;
            self.getBuyUserInfo();
          };
          self.$http(method, param, successd);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    uploadPassword(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var method = "user/updateLoginUserPwd";
          var param = JSON.stringify({
            oldPassword: self.password.oldPass,
            newPassword: self.password.pass
          });
          var successd = function(res) {
            self.dialogFormVisible = false;
            self.$message({
              message: res.data.message,
              type: "success"
            });
            top.location.href = "https://aijuhr.com/login";
          };
          self.$http(method, param, successd);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getMyOrder() {
      var self = this;
      var method = "hrm/getDeal";
      var param = JSON.stringify({
        pageSize: self.config.pageSize,
        pageNo: self.config.pageNum
      });
      console.log(param);
      var successd = function(res) {
        self.tableData = res.data.data.list;
        self.config.totalCount = res.data.data.page.totalCount;
      };
      self.$http(method, param, successd);
    },
    ContinueToPay(oid) {
      var search = "https://aijuhr.com/hrm/alipay/continuePay.do?oid=" + oid;
      window.open(search, "_blank");
    },
    renewal() {
      window.open("https://aijuhr.com/price/");
    },
    changeHeadImg(type) {
      this.show = !this.show;
      this.headImgType = type;
    },
    changeHeadImg2() {
      this.show2 = !this.show2;
    },
    cropSuccess(imgDataUrl, field) {
      // this.companyInfo.companyImg = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      if (jsonData.code == 0) {
        this.ids = jsonData.data.ids;
        this.companyInfo.companyImg = jsonData.data.fileInfoList[0].url;
        console.log(this.companyInfo.companyImg);
      }
    },
    cropSuccess2(imgDataUrl, field) {
      // this.branchCompany.companyImg = imgDataUrl;
    },
    cropUploadSuccess2(jsonData, field) {
      console.log(jsonData, field);
      if (jsonData.code == 0) {
        if(this.headImgType == "branch"){
          this.branchCompany.companyImg = jsonData.data.fileInfoList[0].url;
        }else if(this.headImgType == "head"){
          this.companyInfo.companyImg = jsonData.data.fileInfoList[0].url;
          this.companyInfo.companyImgId = jsonData.data.fileInfoList[0].id;
        }

      }
    },
    cropSuccess3(imgDataUrl, field) {
      // this.branchCompany.companyImg = imgDataUrl;
    },
    cropUploadSuccess3(jsonData, field) {
      console.log(jsonData, field);
      location.reload();
    },

    cropUploadFail(status, field) {
      console.log(status);
      console.log("field: " + field);
    },
    addCompanyNum() {
      this.branchCompanyDialog = true;
      this.branchCompanyId = "";
      this.branchCompany = {
        companyId: "",
        branchCompanyId: "",
        companyName: "",
        address: "",
        companyShortName: "",
        domain: "",
        dimensions: "",
        status: "",
        phone: "",
        companyImg: "",
        province: "",
        city: "",
        district: ""
      };
    },
    editCompanyInfo() {
      this.companyInfoDialog = true;
      // this.addBranchCompanyInfo();
    },
    canclebranchCompanyDialog() {
      this.branchCompanyDialog = false;
    },
    cancleCompanyDialog() {
      this.companyInfoDialog = false;
    },
    addBranchCompanyInfo() {},
    editbBranchCompanyInfo(item) {
      this.branchCompanyDialog = true;
      this.branchCompanyId = item.id;
      this.getBranchCompanyInfo2(item);
    },
    getMapC: function() {
      console.log(this.amapManager.getMap());
      console.log(this.center);
      let attendanceMapName = document.querySelector(".search-box input").value;
      if (attendanceMapName == "") {
        attendanceMapName = this.formattedAddress;
      }
      let center = this.center;
      this.longitude = center[0];
      this.latitude = center[1];
      center[2] = attendanceMapName;
      this.branchCompany.address = attendanceMapName;
      this.companyInfo.address = attendanceMapName;
      // center.push(attendanceMapName);
      // this.$emit('mapVal',center);
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        this.marker = [pois[0].lng, pois[0].lat];
        this.center = this.marker;
      }
    },
    headImg() {
      this.show3 = true;
    }
  },
  watch: {
    center(oldValue, newValue) {
      this.getMapC();
    }
  }
};
</script>

</style>
<style scoped lang="less">
.imgUpload {
  // display: inline-block;
  margin-bottom: 0 !important;
}
.per_upload .el-form {
  overflow: hidden;
}
.province.inlineBlock {
  width: 262px;
  margin-left: 33px;
}
.inlineBlock {
  display: inline-block;
}
#companyInfoEdit {
  border-top: 1px solid #eef1f6;
  .companyInfoEditTitle {
    color: #48576a;
    font-size: 16px;
    font-weight: 600;
    margin: 30px 20px 25px;
    display: inline-block;
  }
  .companyInfoList {
    border-top: 1px solid #eef1f6;
    li {
      border-bottom: 1px solid #eef1f6;
      padding: 18px;
      position: relative;
      .InfoListLeft {
        display: flex;
        .img{
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #BAEAEF;
          text-align: center;
          position: relative;
          .iconfont{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -9px;
            margin-top: -10px;
            color: #fff;
          }
          img {
            flex: 1;
            width: 100%;
            height: 100%;
            margin-right: 5px;
          }
        }
        .InfoListLeftWrap {
          margin-left: 13px;
          .companyName{
            color: #1F2D3D;
            font-size: 14px;
            margin-bottom: 12px;
          }
          .phone {
            color:#475669;
            font-size: 14px;
            line-height: 1;
            margin-bottom: 6px;
          }
          .address{
            color:#475669;
            font-size: 14px;
          }
        }
      }
      .rightBtn {
        position: absolute;
        top: 50%;
        right: 20px;
        .el-button--text{
          color: #48576A;
        }
      }
    }
  }
}
</style>
<style lang="less">
.companyInfoDialog {
  .el-dialog--small {
    width: 530px !important;
    .branchForm {
      .amap-page-container {
        .el-form-item {
          .el-form-item__content {
            .el-vue-search-box-container {
              width: 394px;
            }
          }
        }
        .el-vue-amap-container {
          height: 300px;
        }
      }
      .branchFormItem {
        .el-form-item__content {
          .inputW {
            width: 398px;
          }
        }
      }
      .branchFormTel {
        margin-top: 22px;
        .el-form-item__content {
          .el-input {
            .el-input__inner {
              width: 398px;
            }
          }
        }
      }
      .address_item {
        .el-form-item__content {
          .el-input {
            .el-input__inner {
              width: 397px;
            }
          }
        }
      }
      .el-form-item {
        .detailAddress {
          width: 303px;
        }
        .el-form-item__content {
          .iWidth {
            .el-input {
              .el-input__inner {
                width: 129px;
              }
            }
          }
        }
      }
      .imgUpload {
        .el-form-item__content {
          margin-left: 0 !important;
          .personal_upload {
            .el-upload {
              img {
                display: block;
                width: 100px;
                height: 100px;
              }
            }
          }
        }
        .logoTips {
          font-size: 12px;
          color: #99a9bf;
          position: relative;
          top: -58px;
          left: 0px;
          margin: 0 auto;
        }
      }
    }
  }
}
#personal .amap-demo {
  width: 399px;
  height: 222px;
  margin: 0 auto;
}
#personal {
  width: 1080px;
  margin: 0 auto;
}
#app .el-form-item:last-child {
  margin-bottom: 4px;
}
#personal .touxiang {
  width: 125px;
  height: 125px;
  float: left;
  line-height: 125px;
}

#personal .touxiang_name {
  width: 125px;
  height: 125px;
  float: left;
  line-height: 125px;
  text-align: center;
  background-color: #62a8ea;
  color: #fff;
  font-size: 36px;
  overflow: hidden;
  z-index: 999;
}

#personal .right dt {
  margin-left: 150px;
  height: 145px;
}

/*#personal .el-tabs__nav{margin-left: 25px;}z*/
/*#personal .el-form{margin-top: 40px;}*/
#personal .right .img_left {
  float: left;
  width: 240px;
}
#personal .right .el-table__header{
  width: initial!Importent;
}
#personal .right .img_left .img_left_content {
  height: 236px;
  background: #fff;
  text-align: center;
}

#personal .right .img_left .img_left_content .avatar {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-top: 40px;
  border-radius: 50%;
}

#personal .right .img_left .img_left_content img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

#personal .right .img_left .img_left_content .phoneNum {
  color: #1f2d3d;
  font-size: 14px;
  margin: 20px 0 10px 0;
}

#personal .right .img_left .img_left_content .companyName {
  font-size: 12px;
  color: #99a9bf;
}

#personal .right .img_left .img_bottom {
  width: 240px;
  height: 306px;
  margin-top: 20px;
  background: #fff;
  padding-top: 20px;
}
#personal .right .img_left .bottom_height {
  height: 198px;
}
#personal .right .img_left .img_bottom .upgrade {
  padding: 0 20px;
  margin-top: 29px;
  height: 36px;
  line-height: 36px;
  color: #1f2d3d;
}

#personal .right .img_left .img_bottom .upgrade .toUpdate {
  display: block;
  float: right;
  width: 60px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  background: #f2a654;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

#personal .right .img_left .img_bottom .lastNum {
  padding: 0 20px;
  color: #5e6977;
  font-size: 14px;
  margin: 20px 0;
}

#personal .right .img_left .img_bottom .lastNum .num,
#personal .right .img_left .img_bottom .toTime .date {
  display: inline-block;
  float: right;
  color: #1f2d3d;
}

#personal .right .img_left .img_bottom .toTime {
  padding: 0 20px;
  color: #5e6977;
}

#personal .right .img_left .img_bottom .avatar {
  display: block;
  width: 160px;
  height: 145px;
  margin: 0 auto;
  background: url(../../images/avatar_p.png) no-repeat center;
  background-size: cover;
}

#personal .right .content_right {
  float: right;
  width: 820px;
}

#personal .right .content_right .personal_content {
  /* height: 490px; */
  height: auto;
}

#personal .right .content_right .personal_content .btn {
  margin: 28px 0 0 100px;
}

#personal .right .content_right .personal_content .btn .el-button--primary {
  width: 60px;
  height: 36px;
}

#personal .right .content_right .personal_content .per_upload {
  padding: 20px;
}

#personal
  .right
  .content_right
  .personal_content
  .per_upload
  .imgUpload
  .el-form-item__label {
  padding-right: 32px;
}

#personal .right .content_right .personal_content .per_upload .logoTips {
  font-size: 12px;
  color: #99a9bf;
  position: relative;
  top: -42px;
  left: 101px;
}
#personal
  .right
  .content_right
  .personal_content
  .per_upload
  .personal_left
  .el-form-item__label {
  padding-right: 32px;
}

#personal .el-upload {
  /* #personal .right .content_right .personal_content .per_upload .personal_upload .el-upload { */
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}
#personal .birdthday .chooseBirthday{
  width:260px;
}
#personal .el-upload.border_color_fff {
  border-color: #fff;
}

#personal .el-upload img {
  display: block;
  width: 100%;
  height: 101%;
}

/*#personal .right .content_right .personal_content .personal_upload .border_color_fff .el-upload {*/
/*border-color: #fff;*/
/*}*/
#personal .avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  background: #fbfdff;
}
#personal .el-dialog .avatar-uploader-icon,
#personal .el-dialog .el-upload {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

#personal
  .right
  .content_right
  .personal_content
  .per_upload
  .personal_upload
  .avatar {
  width: 100%;
  height: 100%;
  display: block;
}

#personal .personal_right {
  width: 330px;
  margin-left: 380px;
  height: 36px;
}

#personal .personal_left {
  float: left;
  height: 36px;
  width: 330px;
}
#personal .el-dialog .imgUpload .el-form-item__content {
  float: left;
}

#personal .personal_left .birdthday {
  float: left;
  height: 36px;
  width: 230px;
}

#personal .personal_name {
  font-size: 24px;
  position: relative;
}

#personal .personal_name .revamp {
  position: absolute;
  right: 0;
}

.personal_post {
  font-size: 14px;
  margin-top: 20px;
  color: #bfcbd9;
}

.personal_post a {
  margin-left: 20px;
}

#personal .el-table__body-wrapper {
  overflow: inherit;
}

#personal .personal_page {
  margin-top: 20px;
}

#personal .userinfo_ul {
  margin-left: 125px;
  overflow: hidden;
}

#personal .userinfo {
  width: 280px;
  float: left;
  margin: 25px 0;
}

.userinfo i.iconfont {
  width: 40px;
  height: 40px;
  float: left;
  font-size: 36px;
  color: #bfcbd9;
}

.userinfo h3 {
  color: #bfcbd9;
  font-size: 14px;
  margin-left: 55px;
  height: 20px;
  vertical-align: top;
  font-weight: 400;
}

.userinfo p {
  color: #333;
  font-size: 14px;
  margin-left: 55px;
  height: 20px;
  vertical-align: bottom;
}

.ff9948 {
  color: #ff9948;
}

.userinfo .addUserAdress {
  color: #5aa2e7;
  cursor: pointer;
}

#personal .el-table .cell {
  padding: 0 10px !important;
}
#personal .el-vue-amap-container,
#personal .el-vue-amap-container .el-vue-amap {
  height: 301px !important;
}
#personal .need:before{
  content: '*'!important;
  color: #ff4949;
  margin-right: 0px;
  margin-top: 0px;
  position: absolute;
  top: 10px;
  left: 12px;
}
#personal .need{
  position: relative;
}
</style>
