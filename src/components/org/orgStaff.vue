<template>
    <div id='payManage'>
        <div class="manage_con">
            <el-tabs v-model="activeName">
                <el-tab-pane label="员工维护" name="0">
                    <div class="hrm_module">
                        <div class="hrm_module_btn">
                            <el-button type="primary" icon="plus" @click="staffAdd">新增</el-button>
                            <el-button type="primary" icon="upload2" @click="staffImport">导入</el-button>
                            <el-button type="primary" icon="upload2" @click="staffExport">导出</el-button>
                            <el-button type="primary" icon="information" @click="staffChange" :disabled="checkboxNum != 1 || checkboxNum == 0">人事事务</el-button>
                            <el-button type="primary" icon="search" @click="staffLook" :disabled="checkboxNum != 1 || checkboxNum == 0">查看</el-button>
                            <el-button type="primary" icon="delete" @click="staffDel" :disabled="checkboxNum < 1 || checkboxNum == 0">删除</el-button>
                            <el-button type="text" @click="staffSearchShow = ! staffSearchShow" class="f_r">高级搜索</el-button>
                            <el-input placeholder="请输入工号/姓名/手机号/证件号码" v-model="staffSearchData" class="f_r" style="width: 300px;" @keyup.enter.native="staffList()">
                                <el-button slot="append" icon="search" @click="staffList()"></el-button>
                            </el-input>
                            <div class="hrm_module_btn_search" v-show="staffSearchShow">
                                <el-form :model="staffSearchForm" ref="staffSearchForm" label-width="100px" class="clearfix">
                                    <div class="clearfix">
                                    <el-form-item label="员工编制" prop="userDraw" style="float: left;">
                                        <el-checkbox-group v-model="staffSearchForm.userDraw">
                                            <el-checkbox label="1">正式</el-checkbox>
                                            <el-checkbox label="2">试用</el-checkbox>
                                            <el-checkbox label="3">兼职</el-checkbox>
                                            <el-checkbox label="4">实习</el-checkbox>
                                            <el-checkbox label="5">劳务派遣</el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item label="性别" prop="sex" style="float: left;">
                                        <el-radio v-model="staffSearchForm.sex" label="-1">不限</el-radio>
                                        <el-radio v-model="staffSearchForm.sex" label="1">男</el-radio>
                                        <el-radio v-model="staffSearchForm.sex" label="2">女</el-radio>
                                    </el-form-item>
                                    </div>
                                    <div class="clearfix">
                                    <el-form-item label="入职日期" prop="date" style="float: left;">
                                        <el-date-picker v-model="staffSearchForm.date" type="daterange" placeholder="选择日期范围">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="部门" prop="dept" style="float: left;">
                                        <tree-component @treeAssign="staffSearchFormTreeAssign" :tree-btn-name="staffSearchFormBtnName" :tree-support-select="false" :tree-type='1'></tree-component>
                                    </el-form-item>
                                    <el-form-item label="职位" prop="post" style="float: left;">
                                        <el-select v-model="staffSearchForm.post" placeholder="请选择职位">
                                            <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData" :key="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    </div>
                                    <el-form-item>
                                        <el-button type="primary" @click="staffList()">搜索</el-button>
                                        <el-button @click="staffSearchReset()">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div class="hrm_module_con">
                            <el-table border highlight-current-row :data="staffListData" ref="staffTable" align="center" class="hrm_mgb15" @selection-change="staffCheckList"
                                @row-click="staffCheckListRow">
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column type="index" label="序号" width="80"></el-table-column>
                                <el-table-column prop="userNo" label="工号" width="80"></el-table-column>
                                <el-table-column prop="realname" label="姓名"></el-table-column>
                                <el-table-column prop="name" label="昵称"></el-table-column>
                                <el-table-column prop="sexName" label="性别"></el-table-column>
                                <el-table-column prop="certificateNo" label="证件号码"></el-table-column>
                                <!--<el-table-column prop="statusStr" label="人员状态"></el-table-column>-->
                                <el-table-column prop="positionName" label="职位名称"></el-table-column>
                                <el-table-column prop="phone" label="联系方式"></el-table-column>
                                <el-table-column prop="joinDate" label="入职时间">
                                    <template scope="scope">{{scope.row.joinDate | dateFilter}}</template>
                                </el-table-column>
                              <!-- <el-table-column prop="hrmRoleId" label="角色">
                                <template scope="scope">
                                  <span style="margin-left: 10px">{{ scope.row.hrmRoleId | hrmRoleIdFilter }}</span>
                                </template>
                              </el-table-column> -->
                              <el-table-column prop="userDrawName" label="人员类型">
                                    <template scope="scope">
                                        <el-tag type="gray" class="common_table_tag">{{scope.row.userDrawName}}</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="staffListPage.totalCount" @current-change="staffList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <!--<el-tab-pane label="结构分析" name="2">
                </el-tab-pane>-->
            </el-tabs>
        </div>

        <!--导入-->
        <el-dialog title="导入员工" :visible.sync="staffImportShow" size="tiny">
            <el-upload class="upload-demo" :action="staffImportUrl" :on-success="staffImportSubmit" :data="staffImportParam">
                <el-button type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传指定模版文件，如果没有模版文件请点击
                    <el-button type="text" @click="staffTemplate">下载模版</el-button>填充后上传</div>
            </el-upload>

            <span slot="footer" class="dialog-footer">
                    <el-button @click="staffImportShow = false">取消</el-button>
                </span>
        </el-dialog>

        <!--新增员工-->
        <el-dialog title="新增员工" :visible.sync="staffAddShow" size="small" class="el-dialog--1000">
            <el-form :rules="staffRules" :model="staffForm" :ref="staffForm" label-width="120px" class="bigForm clearfix">
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="staffForm.realname" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="staffForm.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="昵称/花名" prop="name">
                    <el-input v-model="staffForm.name" style="width: 200px;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="角色" prop="hrmRoleId">
                    <el-select v-model="staffForm.hrmRoleId" placeholder="请选择角色" style="width: 200px;">
                        <el-option label="员工" value="2"></el-option>
                        <el-option label="财务" value="3"></el-option>
                        <el-option label="招聘专员" value="4"></el-option>
                        <el-option label="面试官" value="5"></el-option>
                        <el-option label="人事专员" value="7"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="政治面貌" prop="formalFace">
                    <el-select v-model="staffForm.formalFace" placeholder="请选择政治面貌" style="width: 200px;">
                        <el-option label="中共党员" value="1"></el-option>
                        <el-option label="中共预备党员" value="2"></el-option>
                        <el-option label="共青团员" value="3"></el-option>
                        <el-option label="其他" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="民族" prop="nation">
                    <el-select v-model="staffForm.nation" placeholder="请选择民族" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in nationListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学历" prop="eduationalLevel">
                    <el-select v-model="staffForm.eduationalLevel" placeholder="请选择学历" style="width: 200px;">
                        <el-option label="高中、中专及以下" value="1"></el-option>
                        <el-option label="大专" value="2"></el-option>
                        <el-option label="本科" value="3"></el-option>
                        <el-option label="硕士" value="4"></el-option>
                        <el-option label="博士" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="婚姻状态" prop="maritalStatus">
                    <el-select v-model="staffForm.maritalStatus" placeholder="请选择婚姻状态" style="width: 200px;">
                        <el-option label="未婚" value="1"></el-option>
                        <el-option label="已婚" value="2"></el-option>
                        <el-option label="离婚" value="3"></el-option>
                        <el-option label="丧偶" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="移动电话" prop="phone">
                    <el-input v-model="staffForm.phone" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="staffForm.email" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="deptId">
                    <tree-component @treeAssign="staffFormTreeAssign" :tree-btn-name="staffFormBtnName" :tree-support-select="true" :tree-type='1'></tree-component>
                </el-form-item>
                <el-form-item label="员工工号" prop="userNo">
                    <el-input v-model="staffForm.userNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificateType">
                    <el-select v-model="staffForm.certificateType" placeholder="请选择证件类型" style="width: 200px;">
                        <el-option label="身份证" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificateNo">
                    <el-input v-model="staffForm.certificateNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="员工类型" prop="userDraw">
                    <el-select v-model="staffForm.userDraw" placeholder="请选择员工类型" style="width: 200px;">
                        <el-option label="正式" value="1"></el-option>
                        <el-option label="试用" value="2"></el-option>
                        <el-option label="兼职" value="3"></el-option>
                        <el-option label="实习" value="4"></el-option>
                        <el-option label="劳务派遣" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="担任职位" prop="positionId">
                    <el-select v-model="staffForm.positionId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职日期" prop="joinDate">
                    <el-date-picker v-model="staffForm.joinDate" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="拟转正日期" prop="regularDate">
                    <el-date-picker v-model="staffForm.regularDate" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出生日期" prop="birdthDay">
                    <el-date-picker v-model="staffForm.birdthDay" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="家庭住址" prop="homeAddress">
                    <el-input v-model="staffForm.homeAddress" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="staffForm.remark" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit(staffForm)">立即创建</el-button>
                    <el-button @click="staffAddShow = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--员工管理-编辑-->
        <el-dialog title="编辑员工" :visible.sync="staffEditShow" size="small" class="el-dialog--1000">
            <el-form ref="staffForm" :rules="staffRules" :model="staffForm" label-width="120px" class="bigForm clearfix">
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="staffForm.realname" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="staffForm.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="昵称/花名" prop="name">
                    <el-input v-model="staffForm.name" style="width: 200px;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="角色" prop="hrmRoleId">
                    <el-select v-model="staffForm.hrmRoleId" placeholder="请选择角色" style="width: 200px;">
                        <el-option label="员工" value="2"></el-option>
                        <el-option label="财务" value="3"></el-option>
                        <el-option label="招聘专员" value="4"></el-option>
                        <el-option label="面试官" value="5"></el-option>
                        <el-option label="人事专员" value="7"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="政治面貌" prop="formalFace">
                    <el-select v-model="staffForm.formalFace" placeholder="请选择政治面貌" style="width: 200px;">
                        <el-option label="中共党员" value="1"></el-option>
                        <el-option label="中共预备党员" value="2"></el-option>
                        <el-option label="共青团员" value="3"></el-option>
                        <el-option label="其他" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="民族" prop="nation">
                    <el-select v-model="staffForm.nation" placeholder="请选择民族" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in nationListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学历" prop="eduationalLevel">
                    <el-select v-model="staffForm.eduationalLevel" placeholder="请选择学历" style="width: 200px;">
                        <el-option label="高中、中专及以下" value="1"></el-option>
                        <el-option label="大专" value="2"></el-option>
                        <el-option label="本科" value="3"></el-option>
                        <el-option label="硕士" value="4"></el-option>
                        <el-option label="博士" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="婚姻状态" prop="maritalStatus">
                    <el-select v-model="staffForm.maritalStatus" placeholder="请选择婚姻状态" style="width: 200px;">
                        <el-option label="未婚" value="1"></el-option>
                        <el-option label="已婚" value="2"></el-option>
                        <el-option label="离婚" value="3"></el-option>
                        <el-option label="丧偶" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="移动电话" prop="phone">
                    <el-input v-model="staffForm.phone" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="staffForm.email" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="deptId">
                    <tree-component @treeAssign="staffFormTreeAssign" :tree-btn-name="staffFormBtnName" :tree-support-select="true" :tree-type='1'
                        :tree-select-data="treeSelectData" ref="treeParent"></tree-component>
                </el-form-item>
                <el-form-item label="员工工号" prop="userNo">
                    <el-input v-model="staffForm.userNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificateType">
                    <el-select v-model="staffForm.certificateType" placeholder="请选择证件类型" style="width: 200px;">
                        <el-option label="身份证" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificateNo">
                    <el-input v-model="staffForm.certificateNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="员工类型" prop="userDraw">
                    <el-select v-model="staffForm.userDraw" placeholder="请选择员工类型" style="width: 200px;">
                        <el-option label="正式" value="1"></el-option>
                        <el-option label="试用" value="2"></el-option>
                        <el-option label="兼职" value="3"></el-option>
                        <el-option label="实习" value="4"></el-option>
                        <el-option label="劳务派遣" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="担任职位" prop="positionId">
                    <el-select v-model="staffForm.positionId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职日期" prop="joinDate">
                    <el-date-picker v-model="staffForm.joinDate" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="拟转正日期" prop="regularDate">
                    <el-date-picker v-model="staffForm.regularDate" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出生日期" prop="birdthDay">
                    <el-date-picker v-model="staffForm.birdthDay" type="date" placeholder="选择日期" style="width: 200px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="家庭住址" prop="homeAddress">
                    <el-input v-model="staffForm.homeAddress" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="staffForm.remark" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit('staffForm',staffForm.id)">立即创建</el-button>
                    <el-button @click="staffEditShow = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="人事事务" :visible.sync="staffChangeShow" size="tiny">
            <el-form :rules="staffChangeRules" :model="staffChangeForm" ref="staffChangeForm" label-width="100px">
                <el-form-item label="人事事务" prop="ChangeType">
                    <el-select v-model="staffChangeForm.ChangeType" placeholder="请选择事务类型" style="width: 200px;">
                        <!--<el-option label="重新入职" value="1"></el-option>-->
                        <el-option label="转正" value="1"></el-option>
                        <!--<el-option label="调动" value="3"></el-option>-->
                        <el-option label="离职" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工姓名" prop="name">
                    <el-input v-model="staffChangeForm.name" :disabled="true" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="当前状态" prop="statusStr">
                    <el-input v-model="staffChangeForm.statusStr" :disabled="true" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="deptName">
                    <el-input v-model="staffChangeForm.deptName" :disabled="true" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="修改时间" prop="abstractDate">
                    <el-date-picker v-model="staffChangeForm.abstractDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="staffChangeForm.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffChangeSubmit('staffChangeForm')">确定</el-button>
                    <el-button @click="staffChangeShow = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--部门管理-查看-->
        <el-dialog title="查看员工" :visible.sync="staffLookShow" size="tiny">
            <div class="hrm_msg">
                <div class="hrm_msg_nav">部门信息<i class="el-icon-edit" @click="staffEdit(checkboxObj)"></i></div>
                <div class="hrm_msg_con">
                    <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>员工名称：{{checkboxObj.name}}</span></div>
                    <div class="hrm_msg_item"><span>员工工号：{{checkboxObj.userNo}}</span></div>
                    <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>入职时间：{{checkboxObj.createDate | dateFilter}}</span></div>
                    <div class="hrm_msg_item"><span>联系方式：{{checkboxObj.phone}}</span></div>
                    <div class="hrm_msg_item"><span>邮箱地址：{{checkboxObj.email}}</span></div>
                </div>
            </div>
            <el-tabs v-model="staffCheckActive" type="card" @tab-click="staffCheckTab">
                <el-tab-pane label="基本情况" name="0">
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">任职情况<i class="el-icon-plus" @click="staffAdd0"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData0">
                                {{list.startDate | dateFilter}}至{{list.endDate | dateFilter}}，担任{{list.positionName}}职位。
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit0(list)"></i><i class="el-icon-delete" @click="staffDel0(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">员工职等<i class="el-icon-plus" @click="staffAdd1"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData1">
                                {{list.startDate | dateFilter}}，评定的级别为{{list.dutyTypeName}}。
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit1(list)"></i><i class="el-icon-delete" @click="staffDel1(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">汇报关系<i class="el-icon-plus" @click="staffAdd2"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData2">
                                {{list.startDate | dateFilter}}至{{list.endDate | dateFilter}}，向{{list.userName}}报告。
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit2(list)"></i><i class="el-icon-delete" @click="staffDel2(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="工作经历" name="1">
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">工作经历<i class="el-icon-plus" @click="staffAdd3"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData3">
                                {{list.startDate | dateFilter}}至{{list.endDate | dateFilter}}，在{{list.companyName}}任职。<br/>                                任职情况: {{list.position}}<br/> 工作职责: {{list.duty}}<br/>
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit3(list)"></i><i class="el-icon-delete" @click="staffDel3(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="技能情况" name="2">
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">教育经历<i class="el-icon-plus" @click="staffAdd4"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData4">
                                {{list.startDate | dateFilter}}至{{list.endDate | dateFilter}}，就读于{{list.school}}{{list.profession}}专业，取得{{list.educationTypeName}}{{list.education}}学历。
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit4(list)"></i><i class="el-icon-delete" @click="staffDel4(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">语言<i class="el-icon-plus" @click="staffAdd5"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData5">
                                语言名称：{{list.language}} 等级：{{list.level}}
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit5(list)"></i><i class="el-icon-delete" @click="staffDel5(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">职业资格<i class="el-icon-plus" @click="staffAdd11"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData11">
                                {{list.gainDate | dateFilter}}获得由{{list.issuedUnit}}颁发的{{list.certificateName}}，证书编号{{list.certificateNo}}，注册单位{{list.registedUnit}}，描述说明{{list.remark}}。
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit11(list)"></i><i class="el-icon-delete" @click="staffDel11(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">专业技术资格<i class="el-icon-plus" @click="staffAdd12"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData12">
                                {{list.gainDate | dateFilter}}获得{{list.qualificationLevel}}级{{list.qualificationName}}专业技术资格，资格编号{{list.qualificationNo}}，注册单位{{list.registerCompany}}。
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit12(list)"></i><i class="el-icon-delete" @click="staffDel12(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">能力素质<i class="el-icon-plus" @click="staffAdd9"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData9">
                                能力素质：{{list.quality}}
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit9(list)"></i><i class="el-icon-delete" @click="staffDel9(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同协议" name="4">
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">合同协议<i class="el-icon-plus" @click="staffAdd8"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData8">
                                {{list.signDate | dateFilter}}签订{{list.contractTypeName}}《{{list.contractNo}}》，签订类型{{list.signTypeName}}。<br/>                                {{list.startDate}}开始至{{list.endDate}}{{list.limitTypeName}}合同。
                                <br/> 计划转正日期{{list.realRegularDate | dateFilter}}，实际转正日期{{list.planRegularDate | dateFilter}}。
                                <br/> 承诺服务期限{{list.planServiceTimes}}，违约金{{list.damageRayment}}。
                                <br/> 补充说明{{list.remark}}
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit8(list)"></i><i class="el-icon-delete" @click="staffDel8(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="社会关系" name="5">
                    <div class="hrm_msg">
                        <div class="hrm_msg_nav">社会关系<i class="el-icon-plus" @click="staffAdd10"></i></div>
                        <div class="hrm_msg_con">
                            <div class="hrm_msg_item" v-for="list in staffListData10">
                                {{list.name}}是本人的{{list.relation}}，联系方式：{{list.phone}}<br/> 家庭地址：{{list.address}}，工作单位：{{list.companyName}}，职务：{{list.dutyName}}
                                <div class="hrm_msg_icon"><i class="el-icon-edit" @click="staffEdit10(list)"></i><i class="el-icon-delete" @click="staffDel10(list.id)"></i></div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="附件列表" name="6">
                    <file-upload :param="staffParam" @fileId="staffFileId"></file-upload>
                    <el-table border :data="staffFileListData">
                        <el-table-column prop="fileName" label="附件名称"></el-table-column>
                        <el-table-column prop="url" label="操作">
                            <template scope="scope">
                                <el-button type="text" @click="staffFileDownload(scope.row.id)">下载</el-button>
                                <el-button type="text" @click="staffFileDel(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination small layout="total, prev, pager, next" :total="staffFileListPage.totalCount" @current-change="staffFileList"></el-pagination>
                </el-tab-pane>
            </el-tabs>
            <div class="hrm_mgt20 clearfix">
                <el-button class="f_r" @click="staffLookShow=fasle">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增任职情况" :visible.sync="staffAddShow0" size="tiny">
            <el-form :rules="staffRules0" :model="staffForm0" :ref="staffForm0" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm0.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm0.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="所属职位" prop="positionId">
                    <el-select v-model="staffForm0.positionId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属职务" prop="dutyId">
                    <el-select v-model="staffForm0.dutyId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in dutyListData"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="序号" prop="jobOrder">
                    <el-input v-model="staffForm0.jobOrder"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit0(staffForm0)">确定</el-button>
                    <el-button @click="staffAddShow0 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑任职情况" :visible.sync="staffEditShow0" size="tiny">
            <el-form :rules="staffRules0" :model="staffForm0" :ref="staffForm0" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm0.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm0.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="所属职位" prop="positionId">
                    <el-select v-model="staffForm0.positionId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属职务" prop="dutyId">
                    <el-select v-model="staffForm0.dutyId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in dutyListData"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="序号" prop="jobOrder">
                    <el-input v-model="staffForm0.jobOrder"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit0(staffForm0, staffForm0.id)">修改</el-button>
                    <el-button @click="staffEditShow0 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增员工职等" :visible.sync="staffAddShow1" size="tiny">
            <el-form :rules="staffRules1" :model="staffForm1" :ref="staffForm1" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm1.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="员工职等" prop="dutyTypeId">
                    <el-select v-model="staffForm1.dutyTypeId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in dutyLevelListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit1(staffForm1)">确定</el-button>
                    <el-button @click="staffAddShow1 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑员工职等" :visible.sync="staffEditShow1" size="tiny">
            <el-form :rules="staffRules1" :model="staffForm1" :ref="staffForm1" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm1.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="员工职等" prop="dutyTypeId">
                    <el-select v-model="staffForm1.dutyTypeId" placeholder="请选择职位" style="width: 200px;">
                        <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in dutyLevelListData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit1(staffForm1, staffForm1.id)">修改</el-button>
                    <el-button @click="staffEditShow1 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增任职情况" :visible.sync="staffAddShow2" size="tiny">
            <el-form :rules="staffRules2" :model="staffForm2" :ref="staffForm2" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm2.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm2.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="汇报对象" prop="toUserId">
                    <tree-component @treeAssign="staffForm2TreeAssign" :tree-btn-name="staffForm2BtnName" :tree-support-select="true" :tree-type='2'></tree-component>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit2(staffForm2)">确定</el-button>
                    <el-button @click="staffAddShow2 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑任职情况" :visible.sync="staffEditShow2" size="tiny">
            <el-form :rules="staffRules2" :model="staffForm2" :ref="staffForm2" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm2.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm2.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="汇报对象" prop="toUserId">
                    <tree-component @treeAssign="staffForm2TreeAssign" :tree-btn-name="staffForm2BtnName" :tree-support-select="true" :tree-type='2'
                        :tree-select-data="treeSelectData" ref="treeParent"></tree-component>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit2(staffForm2, staffForm2.id)">修改</el-button>
                    <el-button @click="staffEditShow2 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增工作经历" :visible.sync="staffAddShow3" size="tiny">
            <el-form :rules="staffRules3" :model="staffForm3" :ref="staffForm3" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm3.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm3.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="公司名称" prop="companyName">
                    <el-input v-model="staffForm3.companyName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="任职情况" prop="position">
                    <el-input v-model="staffForm3.position"></el-input>
                </el-form-item>
                <el-form-item label="工作职责" prop="duty">
                    <el-input v-model="staffForm3.duty"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit3(staffForm3)">确定</el-button>
                    <el-button @click="staffAddShow3 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑工作经历" :visible.sync="staffEditShow3" size="tiny">
            <el-form :rules="staffRules3" :model="staffForm3" :ref="staffForm3" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm3.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm3.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="公司名称" prop="companyName">
                    <el-input v-model="staffForm3.companyName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="任职情况" prop="position">
                    <el-input v-model="staffForm3.position"></el-input>
                </el-form-item>
                <el-form-item label="工作职责" prop="duty">
                    <el-input v-model="staffForm3.duty"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit3(staffForm3, staffForm3.id)">修改</el-button>
                    <el-button @click="staffEditShow3 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增教育经历" :visible.sync="staffAddShow4" size="tiny">
            <el-form :rules="staffRules4" :model="staffForm4" :ref="staffForm4" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm4.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm4.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="学校名称" prop="school">
                    <el-input v-model="staffForm4.school" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="专业名称" prop="profession">
                    <el-input v-model="staffForm4.profession" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="educationLevel">
                    <el-select v-model="staffForm4.educationLevel" placeholder="请选择学历" style="width: 200px;">
                        <el-option label="高中、中专及以下" value="1"></el-option>
                        <el-option label="大专" value="2"></el-option>
                        <el-option label="本科" value="3"></el-option>
                        <el-option label="硕士" value="4"></el-option>
                        <el-option label="博士" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教育类型" prop="educationType">
                    <el-select v-model="staffForm4.educationType" placeholder="请选择教育类型" style="width: 200px;">
                        <el-option label="全日制" value="1"></el-option>
                        <el-option label="在职教育" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit4(staffForm4)">确定</el-button>
                    <el-button @click="staffAddShow4 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑教育经历" :visible.sync="staffEditShow4" size="tiny">
            <el-form :rules="staffRules4" :model="staffForm4" :ref="staffForm4" label-width="100px">
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm4.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm4.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="学校名称" prop="school">
                    <el-input v-model="staffForm4.school" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="专业名称" prop="profession">
                    <el-input v-model="staffForm4.profession" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="学历" prop="educationLevel">
                    <el-select v-model="staffForm4.educationLevel" placeholder="请选择学历" style="width: 200px;">
                        <el-option label="高中、中专及以下" value="1"></el-option>
                        <el-option label="大专" value="2"></el-option>
                        <el-option label="本科" value="3"></el-option>
                        <el-option label="硕士" value="4"></el-option>
                        <el-option label="博士" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教育类型" prop="educationType">
                    <el-select v-model="staffForm4.educationType" placeholder="请选择教育类型" style="width: 200px;">
                        <el-option label="全日制" value="1"></el-option>
                        <el-option label="在职教育" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit4(staffForm4, staffForm4.id)">修改</el-button>
                    <el-button @click="staffEditShow4 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增语言" :visible.sync="staffAddShow5" size="tiny">
            <el-form :rules="staffRules5" :model="staffForm5" :ref="staffForm5" label-width="100px">
                <el-form-item label="语言名称" prop="language">
                    <el-input v-model="staffForm5.language" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="语言等级" prop="level">
                    <el-input v-model="staffForm5.level" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit5(staffForm5)">确定</el-button>
                    <el-button @click="staffAddShow5 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑语言" :visible.sync="staffEditShow5" size="tiny">
            <el-form :rules="staffRules5" :model="staffForm5" :ref="staffForm5" label-width="100px">
                <el-form-item label="语言名称" prop="language">
                    <el-input v-model="staffForm5.language" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="语言等级" prop="level">
                    <el-input v-model="staffForm5.level" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit5(staffForm5, staffForm5.id)">修改</el-button>
                    <el-button @click="staffEditShow5 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增能力素质" :visible.sync="staffAddShow9" size="tiny">
            <el-form :rules="staffRules9" :model="staffForm9" :ref="staffForm9" label-width="100px">
                <el-form-item label="能力素质" prop="quality">
                    <el-input v-model="staffForm9.quality"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit9(staffForm9)">确定</el-button>
                    <el-button @click="staffAddShow9 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑能力素质" :visible.sync="staffEditShow9" size="tiny">
            <el-form :rules="staffRules9" :model="staffForm9" :ref="staffForm9" label-width="100px">
                <el-form-item label="能力素质" prop="quality">
                    <el-input v-model="staffForm9.quality"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit9(staffForm9, staffForm9.id)">修改</el-button>
                    <el-button @click="staffEditShow9 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增合同协议" :visible.sync="staffAddShow8" size="small" class="el-dialog--1000">
            <el-form ref="staffForm8" :rules="staffRules8" :model="staffForm8" label-width="140px" class="bigForm clearfix">
                <el-form-item label="签订日期" prop="signDate">
                    <el-date-picker v-model="staffForm8.signDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同类型" prop="contractType">
                    <el-select v-model="staffForm8.contractType" placeholder="请选择合同类型貌" style="width: 200px;">
                        <el-option label="劳动合同" value="1"></el-option>
                        <el-option label="实习协议" value="2"></el-option>
                        <el-option label="保密协议" value="3"></el-option>
                        <el-option label="培训协议" value="4"></el-option>
                        <el-option label="兼职协议" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同编号" prop="contractNo">
                    <el-input v-model="staffForm8.contractNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="是否生效" prop="isEffect">
                    <el-select v-model="staffForm8.isEffect" placeholder="请选择是否生效" style="width: 200px;">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签订类型" prop="signType">
                    <el-select v-model="staffForm8.signType" placeholder="请选择签订类型" style="width: 200px;">
                        <el-option label="初签" value="1"></el-option>
                        <el-option label="续签" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm8.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm8.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="期限类型" prop="limitType">
                    <el-select v-model="staffForm8.limitType" placeholder="请选择期限类型" style="width: 200px;">
                        <el-option label="有固定期限" value="1"></el-option>
                        <el-option label="无固定期限" value="2"></el-option>
                        <el-option label="已完成任务为期限" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拟转正日期" prop="realRegularDate">
                    <el-date-picker v-model="staffForm8.realRegularDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="实际转正日期" prop="planRegularDate">
                    <el-date-picker v-model="staffForm8.planRegularDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="承诺服务期限（月）" prop="planServiceTimes">
                    <el-input v-model="staffForm8.planServiceTimes" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="违约金" prop="damageRayment">
                    <el-input v-model="staffForm8.damageRayment" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="补充说明" prop="remark" style="width: 100%;">
                    <el-input v-model="staffForm8.remark" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit8('staffForm8')">立即创建</el-button>
                    <el-button @click="staffAddShow8 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="修改合同协议" :visible.sync="staffEditShow8" size="small" class="el-dialog--1000">
            <el-form ref="staffForm8" :rules="staffRules8" :model="staffForm8" label-width="140px" class="bigForm clearfix">
                <el-form-item label="签订日期" prop="signDate">
                    <el-date-picker v-model="staffForm8.signDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同类型" prop="contractType">
                    <el-select v-model="staffForm8.contractType" placeholder="请选择合同类型貌" style="width: 200px;">
                        <el-option label="劳动合同" value="1"></el-option>
                        <el-option label="实习协议" value="2"></el-option>
                        <el-option label="保密协议" value="3"></el-option>
                        <el-option label="培训协议" value="4"></el-option>
                        <el-option label="兼职协议" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同编号" prop="contractNo">
                    <el-input v-model="staffForm8.contractNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="是否生效" prop="isEffect">
                    <el-select v-model="staffForm8.isEffect" placeholder="请选择是否生效" style="width: 200px;">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签订类型" prop="signType">
                    <el-select v-model="staffForm8.signType" placeholder="请选择签订类型" style="width: 200px;">
                        <el-option label="初签" value="1"></el-option>
                        <el-option label="续签" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="staffForm8.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="staffForm8.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="期限类型" prop="limitType">
                    <el-select v-model="staffForm8.limitType" placeholder="请选择期限类型" style="width: 200px;">
                        <el-option label="有固定期限" value="1"></el-option>
                        <el-option label="无固定期限" value="2"></el-option>
                        <el-option label="已完成任务为期限" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拟转正日期" prop="realRegularDate">
                    <el-date-picker v-model="staffForm8.realRegularDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="实际转正日期" prop="planRegularDate">
                    <el-date-picker v-model="staffForm8.planRegularDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="承诺服务期限（月）" prop="planServiceTimes">
                    <el-input v-model="staffForm8.planServiceTimes" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="违约金" prop="damageRayment">
                    <el-input v-model="staffForm8.damageRayment" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="补充说明" prop="remark" style="width: 100%;">
                    <el-input v-model="staffForm8.remark" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit8('staffForm8', staffForm8.id)">修改</el-button>
                    <el-button @click="staffEditShow8 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增社会关系" :visible.sync="staffAddShow10" size="tiny">
            <el-form :rules="staffRules10" :model="staffForm10" :ref="staffForm10" label-width="100px">
                <el-form-item label="关系人姓名" prop="name">
                    <el-input v-model="staffForm10.name" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="与本人关系" prop="relation">
                    <el-input v-model="staffForm10.relation" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="staffForm10.phone" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="staffForm10.address"></el-input>
                </el-form-item>
                <el-form-item label="工作单位" prop="companyName">
                    <el-input v-model="staffForm10.companyName"></el-input>
                </el-form-item>
                <el-form-item label="职务名称" prop="dutyName">
                    <el-input v-model="staffForm10.dutyName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit10(staffForm10)">确定</el-button>
                    <el-button @click="staffAddShow10 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑社会关系" :visible.sync="staffEditShow10" size="tiny">
            <el-form :rules="staffRules10" :model="staffForm10" :ref="staffForm10" label-width="100px">
                <el-form-item label="关系人姓名" prop="name">
                    <el-input v-model="staffForm10.name" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="与本人关系" prop="relation">
                    <el-input v-model="staffForm10.relation" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="staffForm10.phone" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="staffForm10.address"></el-input>
                </el-form-item>
                <el-form-item label="工作单位" prop="companyName">
                    <el-input v-model="staffForm10.companyName"></el-input>
                </el-form-item>
                <el-form-item label="职务名称" prop="dutyName">
                    <el-input v-model="staffForm10.dutyName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit10(staffForm10,staffForm10.id)">修改</el-button>
                    <el-button @click="staffEditShow10 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="新增职业资格" :visible.sync="staffAddShow11" size="tiny">
            <el-form :rules="staffRules11" :model="staffForm11" :ref="staffForm11" label-width="110px">
                <el-form-item label="获得日期" prop="gainDate">
                    <el-date-picker v-model="staffForm11.gainDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="注册单位" prop="registedUnit">
                    <el-input v-model="staffForm11.registedUnit" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="颁发单位" prop="issuedUnit">
                    <el-input v-model="staffForm11.issuedUnit" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="证书名称" prop="certificateName">
                    <el-input v-model="staffForm11.certificateName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="证书编号" prop="certificateNo">
                    <el-input v-model="staffForm11.certificateNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="描述说明" prop="remark">
                    <el-input v-model="staffForm11.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit11(staffForm11)">确定</el-button>
                    <el-button @click="staffAddShow11 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑职业资格" :visible.sync="staffEditShow11" size="tiny">
            <el-form :rules="staffRules11" :model="staffForm11" :ref="staffForm11" label-width="110px">
                <el-form-item label="获得日期" prop="gainDate">
                    <el-date-picker v-model="staffForm11.gainDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="注册单位" prop="registedUnit">
                    <el-input v-model="staffForm11.registedUnit" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="颁发单位" prop="issuedUnit">
                    <el-input v-model="staffForm11.issuedUnit" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="证书名称" prop="certificateName">
                    <el-input v-model="staffForm11.certificateName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="证书编号" prop="certificateNo">
                    <el-input v-model="staffForm11.certificateNo" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="描述说明" prop="remark">
                    <el-input v-model="staffForm11.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit11(staffForm11, staffForm11.id)">修改</el-button>
                    <el-button @click="staffEditShow11 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="新增职业资格" :visible.sync="staffAddShow12" size="tiny">
            <el-form :rules="staffRules12" :model="staffForm12" :ref="staffForm12" label-width="120px">
                <el-form-item label="获得日期" prop="gainDate">
                    <el-date-picker v-model="staffForm12.gainDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="资格名称" prop="qualificationName">
                    <el-input v-model="staffForm12.qualificationName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="资格等级" prop="qualificationLevel">
                    <el-input v-model="staffForm12.qualificationLevel" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="资格编号" prop="qualificationNo">
                    <el-input v-model="staffForm12.qualificationNo" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="注册单位" prop="registerCompany">
                    <el-input v-model="staffForm12.registerCompany" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffAddSubmit12(staffForm12)">确定</el-button>
                    <el-button @click="staffAddShow12 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑职业资格" :visible.sync="staffEditShow12" size="tiny">
            <el-form :rules="staffRules12" :model="staffForm12" :ref="staffForm12" label-width="120px">
                <el-form-item label="获得日期" prop="gainDate">
                    <el-date-picker v-model="staffForm12.gainDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="资格名称" prop="qualificationName">
                    <el-input v-model="staffForm12.qualificationName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="资格等级" prop="qualificationLevel">
                    <el-input v-model="staffForm12.qualificationLevel" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="资格编号" prop="qualificationNo">
                    <el-input v-model="staffForm12.qualificationNo" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="注册单位" prop="registerCompany">
                    <el-input v-model="staffForm12.registerCompany" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="staffEditSubmit12(staffForm12, staffForm12.id)">修改</el-button>
                    <el-button @click="staffEditShow12 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="allowRoleShow"
        size="tiny">
            <p>您添加的该权限用户已达上限，请联系客服人员</p>
            <p>手机号：17606541988</p>
            <p>qq：781879306</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allowRoleShow = false">取 消</el-button>
                <el-button type="primary" @click="allowRoleShow = false">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>

<script>
    import treeComponent from '../tree.vue';
    import fileUpload from '../fileUpload.vue';

    import Util from '../../script/util.js'

    export default {
        name: 'orgStaff',
        data() {
            return {

                //员工在hrm角色(招聘)
                hrmRoleArr:[
                    {id:1,value:'管理员'},
                    {id:2,value:'员工'},
                    {id:3,value:'财务'},
                    {id:4,value:'招聘专员'},
                    {id:5,value:'面试官'},
                    {id:6,value:'苏宁微商城'}
                ],

                treeSelectData: {
                    keys: [],
                    names: ""
                },
                staffFormBtnName: '请选择部门',
                staffForm2BtnName: '请选择人员',


                staffListData: [],
                staffListPage: {},

                staffAddShow: false,
                staffEditShow: false,

                staffForm: {
                    deptId: "", //所属部门
                    realname:'',//真实名字
                    name: "", //名字(花名)
                    hrmRoleId: '2', //员工角色ID
                    certificateType: "1", //证件类型
                    certificateNo: "", //证件号码
                    phone: "", //手机
                    email: "", //邮箱
                    userDraw: "1", //员工类型
                    positionId: "", //职位
                    joinDate: "", //入职日期
                    regularDate: "", //待转正日期
                    userNo: "", //员工工号
                    homeAddress: "", //家庭住址
                    remark: "", //备注
                    birdthDay: "", //生日
                    sex: "1", //性别
                    formalFace: "1", //政治面貌
                    nation: 209, //民族
                    eduationalLevel: "1", //学历状态
                    maritalStatus: "1" //婚姻状态
                },
                staffRules: {
                    deptId: [{ required: true, message: '请选择所属部门' }], //所属部门
                    realname: [{ required: true, message: '请输入名字' }], //名字
                    certificateType: [], //证件类型
                    hrmRoleId:[],
                    certificateNo: [{ pattern: /^.{18}$/, message: '只能输入18位身份证号', trigger: 'blur' }], //证件号码
                    phone: [{ required: true, message: '请输入手机' }], //手机
                    email: [{ required: true, message: '请输入邮箱' }], //邮箱
                    userDraw: [], //员工类型
                    positionId: [{ required: true, message: '请输入担任职位' }], //职位
                    joinDate: [{ required: true, message: '请选择入职日期' }], //入职日期
                    regularDate: [], //待转正日期
                    userNo: [], //员工工号
                    homeAddress: [], //家庭住址
                    remark: [], //备注
                    birdthDay: [], //生日
                    sex: [], //性别
                    formalFace: [], //政治面貌
                    nation: [], //民族
                    eduationalLevel: [], //学历状态
                    maritalStatus: [] //婚姻状态
                },


                postListData: [],
                dutyListData: [],
                dutyLevelListData: [],

                staffChangeShow: false,

                staffChangeForm: {
                    ChangeType: "",
                    deptId: "",
                    deptName: "",
                    abstractDate: "",
                    remark: "",
                    status: "",
                    statusStr: "",
                    name: ""
                },
                staffChangeRules: {
                    ChangeType: [{ required: true, message: '请选择事务类型' }],
                    abstractDate: [{ required: true, message: '请选择修改时间' }],
                },

                staffImportShow: false,
                staffImportParam: {},
                staffImportUrl: Util.staffImportUrl,

                // common
                activeName: '0',

                checkboxObj: {},
                checkboxArr: [],
                checkboxNum: '',

                // 查看接口合集
                staffLookShow: false,
                staffCheckActive: '0',

                // 任职情况
                staffForm0: {
                    startDate: '',
                    endDate: '',
                    positionId: '',
                    dutyId: '',
                    jobOrder: '',
                },
                staffRules0: {
                    startDate: [{ required: true, message: '请选择开始时间' }],
                    endDate: [{ required: true, message: '请选择结束时间' }],
                    positionId: [{ required: true, message: '请输入部门名称' }],
                    dutyId: '',
                    jobOrder: [{ pattern: /^\d{1,6}$/, message: '只能输入1-6位数字' }],
                },
                staffListData0: [],
                staffAddShow0: false,
                staffEditShow0: false,

                // 员工职等
                staffForm1: {
                    startDate: '',
                    dutyTypeId: '',
                },
                staffRules1: {
                    startDate: [{ required: true, message: '请输入开始时间' }],
                    dutyTypeId: [{ required: true, message: '请输入等级' }],
                },
                staffListData1: [],
                staffAddShow1: false,
                staffEditShow1: false,

                // 汇报对象
                staffForm2: {
                    startDate: '',
                    endDate: '',
                    toUserId: '',
                },
                staffRules2: {
                    startDate: [{ required: true, message: '请选择开始时间' }],
                    endDate: [{ required: true, message: '请选择结束时间' }],
                    toUserId: [{ required: true, message: '请输入汇报对象' }],
                },
                staffListData2: [],
                staffAddShow2: false,
                staffEditShow2: false,

                // 工作经历
                staffForm3: {
                    startDate: '',
                    endDate: '',
                    companyName: '',
                    position: '',
                    duty: '',
                },
                staffRules3: {
                    startDate: [{ required: true, message: '请选择开始时间' }],
                    endDate: [{ required: true, message: '请选择结束时间' }],
                    companyName: [{ required: true, message: '请输入公司名称' }, { max: 64, message: '长度最多64个字符' }],
                    position: [{ max: 64, message: '长度最多64个字符' }],
                    duty: [{ max: 64, message: '长度最多64个字符' }],
                },
                staffListData3: [],
                staffAddShow3: false,
                staffEditShow3: false,


                // 教育经历
                staffForm4: {
                    startDate: '',
                    endDate: '',
                    school: '',
                    profession: '',
                    educationLevel: "1",
                    educationType: "1",
                },
                staffRules4: {
                    startDate: [{ required: true, message: '请选择开始日期' }],
                    endDate: [{ required: true, message: '请选择结束日期' }],
                    school: [{ required: true, message: '请输入学校名称' }, { max: 64, message: '长度最多64个字符' }],
                    profession: [{ required: true, message: '请输入专业名称' }, { max: 64, message: '长度最多64个字符' }],
                    educationLevel: [{ required: true, message: '请输入学历' }],
                    educationType: [{ required: true, message: '请输入教育类型' }],
                },
                staffListData4: [],
                staffAddShow4: false,
                staffEditShow4: false,

                staffForm5: {
                    language: '',
                    level: '',
                },
                staffRules5: {
                    language: [{ required: true, message: '请输入语言' }, { max: 64, message: '长度最多64个字符' }],
                    level: [{ required: true, message: '请输入等级' }, { max: 64, message: '长度最多64个字符' }],
                },
                staffListData5: [],
                staffAddShow5: false,
                staffEditShow5: false,

                staffForm9: {
                    quality: '',
                },
                staffRules9: {
                    quality: [{ required: true, message: '请输入能力素质' }, { max: 64, message: '长度最多64个字符' }],
                },
                staffListData9: [],
                staffAddShow9: false,
                staffEditShow9: false,

                staffForm8: {
                    signDate: '',
                    contractNo: '',
                    signType: '1',
                    endDate: '',
                    startDate: '',
                    planRegularDate: '',
                    planServiceTimes: '',
                    realRegularDate: '',
                    damageRayment: '',
                    remark: '',
                    limitType: '1',
                    isEffect: '1',
                    contractType: '1'
                },
                staffRules8: {
                    signDate: [{ required: true, message: '请输入签订日期' }],
                    contractNo: [{ required: true, message: '请输入合同编号' }, { max: 64, message: '长度最多64个字符' }],
                    signType: '',
                    endDate: [{ required: true, message: '请选择结束时间' }],
                    startDate: [{ required: true, message: '请选择开始时间' }],
                    planRegularDate: '',
                    planServiceTimes: '',
                    realRegularDate: '',
                    damageRayment: [{ pattern: /^\d{0,10}$/, message: '只能输入0-10位数字' }],
                    remark: [{ max: 64, message: '长度最多64个字符' }],
                    limitType: '',
                    isEffect: '',
                    contractType: ''
                },
                staffListData8: [],
                staffAddShow8: false,
                staffEditShow8: false,

                staffForm10: {
                    name: "",
                    relation: "",
                    phone: "",
                    address: "",
                    companyName: "",
                    dutyName: ""
                },
                staffRules10: {
                    name: [{ required: true, message: '请输入姓名' }, { max: 64, message: '长度最多64个字符' }],
                    relation: [{ required: true, message: '请输入与本人关系' }, { max: 64, message: '长度最多64个字符' }],
                    phone: [{ required: true, message: '请输入电话' }, { pattern: /^\d{0,11}$/, message: '只能输入0-11位数字' }],
                    address: [{ required: true, message: '请输入联系地址' }, { max: 64, message: '长度最多64个字符' }],
                    companyName: "",
                    dutyName: ""
                },
                staffListData10: [],
                staffAddShow10: false,
                staffEditShow10: false,

                staffForm11: {
                    gainDate: "",
                    registedUnit: "",
                    issuedUnit: "",
                    certificateName: "",
                    certificateNo: "",
                    remark: "",
                },
                staffRules11: {
                    gainDate: [{ required: true, message: '请选择获得日期' }],
                    registedUnit: [{ required: true, message: '请输入注册单位' }, { max: 64, message: '长度最多64个字符' }],
                    issuedUnit: [{ required: true, message: '请输入颁发单位' }, { max: 64, message: '长度最多64个字符' }],
                    certificateName: [{ required: true, message: '请输入证书名称' }, { max: 64, message: '长度最多64个字符' }],
                    certificateNo: [{ required: true, message: '请输入证书编号' }, { max: 64, message: '长度最多64个字符' }],
                    remark: [],
                },
                staffListData11: [],
                staffAddShow11: false,
                staffEditShow11: false,

                staffForm12: {
                    qualificationName: "",
                    qualificationLevel: "",
                    qualificationNo: "",
                    gainDate: "",
                    registerCompany: "",
                },
                staffRules12: {
                    qualificationName: [{ required: true, message: '请输入资格名称' }, { max: 64, message: '长度最多64个字符' }],
                    qualificationLevel: [],
                    qualificationNo: [{ required: true, message: '请输入资格编号' }, { max: 64, message: '长度最多64个字符' }],
                    gainDate: [{ required: true, message: '请选择获得日期' }],
                    registerCompany: [{ required: true, message: '请输入注册单位' }, { max: 64, message: '长度最多64个字符' }],
                },
                staffListData12: [],
                staffAddShow12: false,
                staffEditShow12: false,
                nationListData: [],

                staffFileListData: [],
                staffFileListPage: {},
                staffParam: {
                    businessId: 4,
                    fId: ''
                },

                // 搜索
                staffSearchData: '',

                staffSearchForm: {
                    userDraw: [],
                    sex: '-1',
                    date: [],
                    dept: [],
                    post: '',
                },
                staffSearchFormBtnName: '请选择部门',
                staffSearchShow: false,
                NoAddUser:true,
                allowRoleShow:false,
            }
        },
        mounted: function () {
            this.staffList();
            this.postList();
            this.uploadAssign('user/leadTemlate');
            this.userAjax();
        },
        filters: {
            dateFilter: function (value) {
                if (typeof value == "string") {
                    value = value.slice(0, 10)
                }
                return value;
            },
          hrmRoleIdFilter: function (value) {
            if (value == "1") {
              value = "管理员"
            }else if(value == "2"){
                value = "员工"
            }else if(value == "3"){
                value = "财务"
            }else if(value == "4"){
                value = "招聘专员"
            }else if(value == "5"){
              value = "面试官"
            }else {
              value = "人事专员 "
            }
            return value;
          }
        },
        methods: {

            // 搜索
            staffSearchList(pageNum) {
                var self = this;
                var method = 'user/getUsers',
                    param = JSON.stringify({
                        character: this.staffSearchData,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                    }),
                    succeed = function (res) {
                    console.log(res.data.data)
                        self.staffListData = res.data.data.users;
                        self.staffListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            staffSearchFormTreeAssign(v){
                this.staffSearchForm.dept = v;
            },
            // 搜索重置
            staffSearchReset () {
                this.staffSearchForm = {
                    userDraw: [],
                    sex: '-1',
                    date: [],
                    dept: [],
                    post: '',
                }
            },

            // 附件
            staffFileId(id) {
                this.staffFileList();
            },
            staffFileList(pageNum) {
                var self = this;
                var method = 'fileUpload/getFileInfoList',
                    param = JSON.stringify({
                        businessId: 4,
                        fId: self.staffParam.fId,
                        isTemplate: 2,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                    }),
                    succeed = function (res) {
                        self.staffFileListData = res.data.data.fileInfoList;
                        self.staffFileListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            staffFileDel(id) {
                var self = this;
                var method = 'fileUpload/delFileRecord',
                    param = JSON.stringify({
                        id: id,
                    }),
                    succeed = function (res) {
                        self.$message({
                            message: '删除数据成功!',
                            type: 'success'
                        });
                        self.staffFileList()
                    };
                this.$http(method, param, succeed);
            },
            staffFileDownload(id) {
                var param = JSON.stringify({
                    isTemplate: '0',
                    id: id,
                });
                this.$download(param)
            },
            // 树
            staffFormTreeAssign: function (v) {
                this.staffForm.deptId = v[0]
            },
            staffForm2TreeAssign: function (v) {
                console.log(v)
                this.staffForm2.toUserId = v[0]
            },


            // 职位管理表格行点击事件
            staffCheckListRow: function (row, event, column) {
                this.staffToggleSelection([row]);
            },
            staffToggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.staffTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.staffTable.clearSelection();
                }
            },
            // 表格多选框change事件
            staffCheckList: function (selection, row) {
                console.log(selection.length)
                this.checkboxNum = selection.length;
                if (selection.length > 0) {
                    this.checkboxObj = selection[0];
                    this.checkboxArr = selection;
                    this.staffParam.fId = selection[0].id;
                }
            },

            uploadAssign: function (method) {
                var param = JSON.stringify({
                    companyId: 61,
                    type: 1
                })
                this.staffImportParam = {
                    param: param,
                    sign: this.$md5(method, param)
                }
            },
            staffImport: function () {
                var self = this;
                try {
					if (top.location.host == "aijuhr.com") {
                        if (self.staffListPage.totalCount>=30 && !self.userData.hasUsbkey) {
                            self.$alert("您的免费版本人数已经达到上限，请联系客服进行购买专业版本！客服电话： 15868429129客服邮箱： biz@iyenei.com","提示",{
                                confirmButtonText: '确定',
                                callback: action => {
                                    console.log(action);
                                    if(action  == "confirm"){
                                        location.href = "https://aijuhr.com/price/";
                                    }else{

                                    }
                                }
                            });
                            return false;
                        };
					}
				} catch (error) {

				}
                this.staffImportShow = true;
            },
            staffImportSubmit: function (res) {
                console.log(res)
                this.staffList();
                if (res.code == 0) {
                    this.staffImportShow = false;
                    this.$message({
                        message: '导入员工数据成功!',
                        type: 'success'
                    });
                } else {
                    this.staffImportShow = false;
                    this.$message({
                        message: '操作失败，原因：' + res.message,
                        type: 'error'
                    });
                }
            },

            // 获取职位
            postList: function () {
                var self = this;
                var method = 'positionManage/getPositionInfoListByParams',
                    param = JSON.stringify({
                        "userId": 62607,
                        "companyId": 139353,
                        "pageNum": 1,
                        "pageSize": 1000
                    }),
                    succeed = function (res) {
                        self.postListData = res.data.data.result
                    };

                this.$http(method, param, succeed);
            },
            // 获取职务
            dutyList: function () {
                var self = this;
                var method = 'dutyManage/getDutyListByParams',
                    param = JSON.stringify({
                        "userId": 62607,
                        "companyId": 139353,
                        "pageNum": 1,
                        "pageSize": 1000
                    }),
                    succeed = function (res) {
                        self.dutyListData = res.data.data.result
                    };

                this.$http(method, param, succeed);
            },
            // 获取职务
            dutyLevelList: function () {
                var self = this;
                var method = 'dutyManage/getDutyLevelListByParams',
                    param = JSON.stringify({
                        "type": 2,
                    }),
                    succeed = function (res) {
                        self.dutyLevelListData = res.data.data.result
                    };
                this.$http(method, param, succeed);
            },
            // 获取民族
            nationList: function () {
                var self = this;
                var method = 'basicEnum/getBasicEnumListByParams',
                    param = JSON.stringify({
                        "type": 4,
                    }),
                    succeed = function (res) {
                        self.nationListData = res.data.data
                    };
                this.$http(method, param, succeed);
            },

            // 列表
            staffList: function (pageNum) {
                var self = this;
                var method = 'user/getUsers',
                    param = JSON.stringify({
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,

                        // 搜索参数
                        character: self.staffSearchData,
                        userDraw: self.staffSearchForm.userDraw.join(','),
                        sex: self.staffSearchForm.sex,
                        joinStartDate: this.$date(self.staffSearchForm.date[0]),
                        joinEndDate: this.$date(self.staffSearchForm.date[1]),
                        searchDeptIds: self.staffSearchForm.dept.join(','),
                        positionId: self.staffSearchForm.post,

                    }),
                    succeed = function (res) {
                        self.staffListData = res.data.data.users;
                        self.staffListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 新增
            staffAdd: function () {
                var self = this;
                try {
					if (top.location.host == "aijuhr.com") {
                        if (self.staffListPage.totalCount>=30 && !self.userData.hasUsbkey) {
                            self.$alert("您的免费版本人数已经达到上限，请联系客服进行购买专业版本！客服电话： 15868429129客服邮箱： biz@iyenei.com","提示",{
                                confirmButtonText: '确定',
                                callback: action => {
                                    console.log(action);
                                    if(action  == "confirm"){
                                        location.href = "https://aijuhr.com/price/";
                                    }else{

                                    }
                                }
                            });
                            return false;
                        };
					}
				} catch (error) {

				}

                this.staffAddShow = true;
                this.nationList();

                this.staffForm = {
                    deptId: "", //所属部门
                    name: "", //名字
                    realname: "", //真实名字
                    hrmRoleId:'2',
                    certificateType: "1", //证件类型
                    certificateNo: "", //证件号码
                    phone: "", //手机
                    email: "", //邮箱
                    userDraw: "1", //员工类型
                    positionId: "", //职位
                    joinDate: "", //入职日期
                    regularDate: "", //待转正日期
                    userNo: "", //员工工号
                    homeAddress: "", //家庭住址
                    remark: "", //备注
                    birdthDay: "", //生日
                    sex: "1", //性别
                    formalFace: "1", //政治面貌
                    nation: 209, //民族
                    eduationalLevel: "1", //学历状态
                    maritalStatus: "1" //婚姻状态
                };

            },
            staffAddSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'user/addUser',
                            param = JSON.stringify({
                                "user": {
                                    "deptId": self.staffForm.deptId,
                                    "name": self.staffForm.name,
                                    "realname": self.staffForm.realname,
                                    'hrmRoleId':self.staffForm.hrmRoleId,
                                    "certificateType": self.staffForm.certificateType,
                                    "certificateNo": self.staffForm.certificateNo,
                                    "phone": self.staffForm.phone,
                                    "email": self.staffForm.email,
                                    "userDraw": self.staffForm.userDraw,
                                    "positionId": self.staffForm.positionId,
                                    "joinDate": this.$date(self.staffForm.joinDate),
                                    "regularDate": this.$date(self.staffForm.regularDate),
                                    "userNo": self.staffForm.userNo,
                                    "homeAddress": self.staffForm.homeAddress,
                                    "remark": self.staffForm.remark,
                                    "birdthDay": this.$date(self.staffForm.birdthDay),
                                    "sex": self.staffForm.sex,
                                    "formalFace": self.staffForm.formalFace,
                                    "nation": self.staffForm.nation,
                                    "eduationalLevel": self.staffForm.eduationalLevel,
                                    "maritalStatus": self.staffForm.maritalStatus
                                },
                                "companyId": 139353,
                                'type':'1'

                            }),
                            succeed = function (res) {
                                console.log(res);
                                console.log(res.data.data.is_allow_roleId == false||res.data.data.is_allow_roleId == 'false');
                                if (res.data.data.is_allow_roleId == false||res.data.data.is_allow_roleId == 'false') {
                                    self.allowRoleShow=true;
                                    return;
                                }
                                self.$message({
                                    message: '添加员工成功!',
                                    type: 'success'
                                });
                                self.staffList();
                                self.staffAddShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 编辑
            staffEdit: function (obj) {
                this.nationList();
                this.staffEditShow = true;
                this.staffForm = {
                    id: obj.id,
                    name: obj.name, //名字
                    realname: obj.realname, //真实名字
                    hrmRoleId:obj.hrmRoleId?obj.hrmRoleId.toString():'1',
                    deptId: obj.deptId, //名字
                    certificateType: obj.certificateType.toString(), //证件类型
                    certificateNo: obj.certificateNo, //证件号码
                    phone: obj.phone, //手机
                    email: obj.email, //邮箱
                    userDraw: obj.userDraw.toString(), //员工类型
                    positionId: obj.positionId, //职位
                    joinDate: obj.joinDate, //入职日期
                    regularDate: obj.regularDate, //待转正日期
                    userNo: obj.userNo, //员工工号
                    homeAddress: obj.homeAddress, //家庭住址
                    remark: obj.remark, //备注
                    birdthDay: obj.birdthDay, //生日
                    sex: obj.sex.toString(), //性别
                    formalFace: obj.formalFace.toString(), //政治面貌
                    nation: obj.nation, //民族
                    eduationalLevel: obj.eduationalLevel.toString(), //学历状态
                    maritalStatus: obj.maritalStatus.toString() //婚姻状态
                }

                this.treeSelectData.keys.push(obj.deptId);
                this.treeSelectData.names = obj.deptName;

                console.log(this.$refs, this.treeSelectData)
                // 延迟回调更新部门
                this.$nextTick(function () {
                    this.$refs.treeParent.setChecked();
                });
            },
            staffEditSubmit: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'user/updateUser',
                            param = JSON.stringify({
                                "user": {
                                    "id": id,
                                    "deptId": self.staffForm.deptId,
                                    "realname": self.staffForm.realname,
                                    "name": self.staffForm.name,
                                    'hrmRoleId':self.staffForm.hrmRoleId,
                                    "certificateType": self.staffForm.certificateType,
                                    "certificateNo": self.staffForm.certificateNo,
                                    "phone": self.staffForm.phone,
                                    "email": self.staffForm.email,
                                    "userDraw": self.staffForm.userDraw,
                                    "positionId": self.staffForm.positionId,
                                    "joinDate": this.$date(self.staffForm.joinDate),
                                    "regularDate": this.$date(self.staffForm.regularDate),
                                    "userNo": self.staffForm.userNo,
                                    "homeAddress": self.staffForm.homeAddress,
                                    "remark": self.staffForm.remark,
                                    "birdthDay": this.$date(self.staffForm.birdthDay),
                                    "sex": self.staffForm.sex,
                                    "formalFace": self.staffForm.formalFace,
                                    "nation": self.staffForm.nation,
                                    "eduationalLevel": self.staffForm.eduationalLevel,
                                    "maritalStatus": self.staffForm.maritalStatus
                                },
                                "companyId": 139353,
                                'type':'1',
                            }),
                            succeed = function (res) {
                                if (res.data.data.is_allow_roleId == false||res.data.data.is_allow_roleId == 'false') {
                                    self.allowRoleShow=true;
                                    return;
                                }
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList();
                                self.staffEditShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 删除
            staffDel: function () {
                if (this.checkboxArr.length == 0) {
                    this.$message({
                        message: '请选择数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var arr = [];
                    var self = this;
                    for (var i = 0; i < self.checkboxArr.length; i++) {
                        arr.push(self.checkboxArr[i].id)
                    }
                    var method = 'user/deleteByIds',
                        param = JSON.stringify({
                            id: arr.join(','),
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 人事事务
            staffChange: function () {
                if (this.checkboxArr.length != 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }

                var obj = this.checkboxObj;
                this.staffChangeForm.deptId = obj.deptId;
                this.staffChangeForm.deptName = obj.deptName;
                this.staffChangeForm.abstractDate = obj.abstractDate;
                // this.staffChangeForm.remark = obj.remark;
                this.staffChangeForm.status = obj.status;
                this.staffChangeForm.statusStr = obj.statusStr;
                this.staffChangeForm.name = obj.name;

                this.staffChangeShow = true;
            },
            staffChangeSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'user/updateAffairs',
                            param = JSON.stringify({
                                "personnelAffairs": {
                                    "type": self.staffChangeForm.ChangeType,
                                    "deptId": self.staffChangeForm.deptId,
                                    "abstractDate": this.$date(self.staffChangeForm.abstractDate),
                                    "remark": self.staffChangeForm.remark,
                                    "status": self.staffChangeForm.status
                                },
                                "empId": self.checkboxObj.id
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '人事事务操作成功!',
                                    type: 'success'
                                });
                                self.staffList();
                                self.staffChangeShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },


            // 查看
            staffLook: function () {
                if (this.checkboxArr.length != 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.staffLookShow = true;
                this.dutyList();
                this.staffList0();
                this.staffList1();
                this.staffList2();
                this.dutyLevelList();
                this.staffCheckActive = '0';
            },

            // 查看tab切换
            staffCheckTab: function (tab) {
                switch (tab.index) {
                    case '0':
                        this.staffList0();
                        this.staffList1();
                        this.staffList2();
                        break;
                    case '1':
                        this.staffList3();
                        break;
                    case '2':
                        this.staffList4();
                        this.staffList5();
                        this.staffList11();
                        this.staffList12();
                        this.staffList9();
                        break;
                    case '3':
                        this.staffList8();
                        break;
                    case '4':
                        this.staffList10();
                    case '5':
                        this.staffFileList();
                        break;
                }
            },

            // 0
            staffList0: function () {
                var self = this;
                var method = 'jobStatusLog/getJobStatusLogs',
                    param = JSON.stringify({
                        empId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData0 = res.data.data.jobStatusLogs;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd0: function () {
                this.staffAddShow0 = true;
                this.staffForm0 = {
                    startDate: "",
                    endDate: "",
                    positionId: "",
                    dutyId: "",
                    jobOrder: "",
                    id: "",
                }
            },
            staffAddSubmit0: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'jobStatusLog/addJobStatusLog',
                            param = JSON.stringify({
                                "jobStatusLog": {
                                    "startDate": this.$date(self.staffForm0.startDate),
                                    "endDate": this.$date(self.staffForm0.endDate),
                                    "positionId": self.staffForm0.positionId,
                                    "dutyId": self.staffForm0.dutyId.toString(),
                                    "jobOrder": self.staffForm0.jobOrder
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList0();
                                self.staffAddShow0 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit0: function (obj) {
                this.staffEditShow0 = true;

                this.staffForm0 = {
                    startDate: obj.startDate,
                    endDate: obj.endDate,
                    positionId: obj.positionId,
                    dutyId: obj.dutyId,
                    jobOrder: obj.jobOrder,
                    id: obj.id
                }
            },
            staffEditSubmit0: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'jobStatusLog/updateJobStatusLog',
                            param = JSON.stringify({
                                "jobStatusLog": {
                                    "id": id,
                                    "startDate": this.$date(self.staffForm0.startDate),
                                    "endDate": this.$date(self.staffForm0.endDate),
                                    "positionId": self.staffForm0.positionId,
                                    "dutyId": self.staffForm0.dutyId,
                                    "jobOrder": self.staffForm0.jobOrder
                                },
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList0();

                                self.staffEditShow0 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel0: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'jobStatusLog/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList0();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 1
            staffList1: function () {
                var self = this;
                var method = 'userDutyLevelLog/getUserDutyLevelLogs',
                    param = JSON.stringify({
                        empId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData1 = res.data.data.userDutyLevelLogs;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd1: function () {
                this.staffAddShow1 = true;

                this.staffForm1 = {
                    startDate: "",
                    dutyTypeId: "",
                    id: ""
                }
            },
            staffAddSubmit1: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'userDutyLevelLog/addUserDutyLevelLog',
                            param = JSON.stringify({
                                "userDutyLevelLog": {
                                    "startDate": this.$date(self.staffForm1.startDate),
                                    "dutyTypeId": self.staffForm1.dutyTypeId
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList1();
                                self.staffAddShow1 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit1: function (obj) {
                this.staffEditShow1 = true;

                this.staffForm1 = {
                    startDate: obj.startDate,
                    dutyTypeId: obj.dutyTypeId,
                    id: obj.id
                }
            },
            staffEditSubmit1: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'userDutyLevelLog/updateUserDutyLevelLog',
                            param = JSON.stringify({
                                "userDutyLevelLog": {
                                    "id": id,
                                    "startDate": this.$date(self.staffForm1.startDate),
                                    "dutyTypeId": self.staffForm1.dutyTypeId
                                },
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList1();

                                self.staffEditShow1 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel1: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'userDutyLevelLog/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList1();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 2
            staffTreeArr2: function (v) {
                this.staffForm2.toUserId = v[0];
            },
            staffList2: function () {
                var self = this;
                var method = 'reportRelation/getReportRelations',
                    param = JSON.stringify({
                        empId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData2 = res.data.data.reportRelations;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd2: function () {
                this.staffAddShow2 = true;

                this.staffForm2 = {
                    startDate: "",
                    endDate: "",
                    toUserId: ""
                }
            },
            staffAddSubmit2: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'reportRelation/addReportRelation',
                            param = JSON.stringify({
                                "reportRelation": {
                                    "startDate": self.staffForm2.startDate,
                                    "endDate": self.staffForm2.endDate,
                                    "toUserId": self.staffForm2.toUserId
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList2();
                                self.staffAddShow2 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit2: function (obj) {
                this.staffEditShow2 = true;

                this.staffForm2 = {
                    id: obj.id,
                    startDate: obj.startDate,
                    endDate: obj.endDate,
                    toUserId: obj.toUserId
                }

                this.treeSelectData.keys.push(obj.toUserId);
                this.treeSelectData.names = obj.userName;

                // 延迟回调更新部门
                this.$nextTick(function () {
                    this.$refs.treeParent.setChecked();
                });
            },
            staffEditSubmit2: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'reportRelation/updateReportRelation',
                            param = JSON.stringify({
                                "reportRelation": {
                                    "id": id,
                                    "startDate": self.staffForm2.startDate,
                                    "endDate": self.staffForm2.endDate,
                                    "toUserId": self.staffForm2.toUserId
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList2();

                                self.staffEditShow2 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel2: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'reportRelation/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList2();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 3
            staffList3: function () {
                var self = this;
                var method = 'workCompanyLog/getWorkCompanyLogs',
                    param = JSON.stringify({
                        empId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData3 = res.data.data.workCompanyLogs;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd3: function () {
                this.staffAddShow3 = true;

                this.staffForm3 = {
                    id: "",
                    startDate: "",
                    endDate: "",
                    companyName: "",
                    position: "",
                    duty: ""
                }
            },
            staffAddSubmit3: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'workCompanyLog/addWorkCompanyLog',
                            param = JSON.stringify({
                                "workCompanyLog": {
                                    "startDate": self.staffForm3.startDate,
                                    "endDate": self.staffForm3.endDate,
                                    "companyName": self.staffForm3.companyName,
                                    "position": self.staffForm3.position,
                                    "duty": self.staffForm3.duty
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList3();
                                self.staffAddShow3 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit3: function (obj) {
                this.staffEditShow3 = true;

                this.staffForm3 = {
                    id: obj.id,
                    startDate: obj.startDate,
                    endDate: obj.endDate,
                    companyName: obj.companyName,
                    position: obj.position,
                    duty: obj.duty
                }
            },
            staffEditSubmit3: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'workCompanyLog/updateWorkCompanyLog',
                            param = JSON.stringify({
                                "workCompanyLog": {
                                    "id": id,
                                    "startDate": self.staffForm3.startDate,
                                    "endDate": self.staffForm3.endDate,
                                    "companyName": self.staffForm3.companyName,
                                    "position": self.staffForm3.position,
                                    "duty": self.staffForm3.duty
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList3();

                                self.staffEditShow3 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel3: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'workCompanyLog/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList3();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 4
            staffList4: function () {
                var self = this;
                var method = 'educationLog/getEducationLogs',
                    param = JSON.stringify({
                        empId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData4 = res.data.data;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd4: function () {
                this.staffAddShow4 = true;

                this.staffForm4 = {
                    startDate: '',
                    endDate: '',
                    school: '',
                    profession: '',
                    educationLevel: '1',
                    educationType: '1',
                };

            },
            staffAddSubmit4: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'educationLog/addEducationLog',
                            param = JSON.stringify({
                                "educationLog": {
                                    "startDate": self.staffForm4.startDate,
                                    "endDate": self.staffForm4.endDate,
                                    "school": self.staffForm4.school,
                                    "profession": self.staffForm4.profession,
                                    "educationLevel": self.staffForm4.educationLevel,
                                    "educationType": self.staffForm4.educationType
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList4();
                                self.staffAddShow4 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit4: function (obj) {
                this.staffEditShow4 = true;
                console.log(typeof obj.educationLevel)

                this.staffForm4 = {
                    id: obj.id,
                    startDate: obj.startDate,
                    endDate: obj.endDate,
                    school: obj.school,
                    profession: obj.profession,
                    educationLevel: obj.educationLevel.toString(),
                    educationType: obj.educationType.toString(),
                };
            },
            staffEditSubmit4: function (formName, id) {
                console.log(typeof this.staffForm4.educationLevel)

                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'educationLog/updateEducationLog',
                            param = JSON.stringify({
                                "educationLog": {
                                    "id": id,
                                    "startDate": self.staffForm4.startDate,
                                    "endDate": self.staffForm4.endDate,
                                    "school": self.staffForm4.school,
                                    "profession": self.staffForm4.profession,
                                    "educationLevel": self.staffForm4.educationLevel,
                                    "educationType": self.staffForm4.educationType
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList4();

                                self.staffEditShow4 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel4: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'educationLog/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList4();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 5
            staffList5: function () {
                var self = this;
                var method = 'languageAbilityLog/getLanguageAbilityLogs',
                    param = JSON.stringify({
                        empId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData5 = res.data.data.languageAbilityLogs;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd5: function () {
                this.staffAddShow5 = true;

                this.staffForm5 = {
                    language: '',
                    level: '',
                }
            },
            staffAddSubmit5: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'languageAbilityLog/addLanguageAbilityLog',
                            param = JSON.stringify({
                                "languageAbilityLog": {
                                    "language": self.staffForm5.language,
                                    "level": self.staffForm5.level
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList5();
                                self.staffAddShow5 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit5: function (obj) {
                this.staffEditShow5 = true;

                this.staffForm5 = {
                    id: obj.id,
                    language: obj.language,
                    level: obj.level,
                }
            },
            staffEditSubmit5: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'languageAbilityLog/updateLanguageAbilityLog',
                            param = JSON.stringify({
                                "languageAbilityLog": {
                                    "id": id,
                                    "language": self.staffForm5.language,
                                    "level": self.staffForm5.level
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList5();

                                self.staffEditShow5 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel5: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'languageAbilityLog/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList5();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 8
            staffList8: function () {
                var self = this;
                var method = 'contractAgreement/getContractAgreements',
                    param = JSON.stringify({
                        "empId": self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData8 = res.data.data.contractAgreements;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd8: function () {
                this.staffAddShow8 = true;

                this.staffForm8 = {
                    signDate: '',
                    contractNo: '',
                    signType: '1',
                    endDate: '',
                    startDate: '',
                    planRegularDate: '',
                    planServiceTimes: '',
                    realRegularDate: '',
                    damageRayment: '',
                    remark: '',
                    limitType: '1',
                    isEffect: '1',
                    contractType: '1'
                }
                console.log(this.staffForm8)
            },
            staffAddSubmit8: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'contractAgreement/addContractAgreement',
                            param = JSON.stringify({
                                "contractAgreement": {
                                    "signDate": self.staffForm8.signDate,
                                    "contractNo": self.staffForm8.contractNo,
                                    "signType": self.staffForm8.signType,
                                    "endDate": self.staffForm8.endDate,
                                    "startDate": self.staffForm8.startDate,
                                    "planRegularDate": self.staffForm8.planRegularDate,
                                    "planServiceTimes": self.staffForm8.planServiceTimes,
                                    "realRegularDate": self.staffForm8.realRegularDate,
                                    "damageRayment": self.staffForm8.damageRayment,
                                    "remark": self.staffForm8.remark,
                                    "limitType": self.staffForm8.limitType,
                                    "isEffect": self.staffForm8.isEffect,
                                    "contractType": self.staffForm8.contractType
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList8();
                                self.staffAddShow8 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit8: function (obj) {
                this.staffEditShow8 = true;

                this.staffForm8 = {
                    id: obj.id,
                    signDate: obj.signDate,
                    contractNo: obj.contractNo,
                    signType: obj.signType.toString(),
                    endDate: obj.endDate,
                    startDate: obj.startDate,
                    planRegularDate: obj.planRegularDate,
                    planServiceTimes: obj.planServiceTimes,
                    realRegularDate: obj.realRegularDate,
                    damageRayment: obj.damageRayment,
                    remark: obj.remark,
                    limitType: obj.limitType.toString(),
                    isEffect: obj.isEffect.toString(),
                    contractType: obj.contractType.toString()
                }
            },
            staffEditSubmit8: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'contractAgreement/updateContractAgreement',
                            param = JSON.stringify({
                                "contractAgreement": {
                                    "id": id,
                                    "signDate": self.staffForm8.signDate,
                                    "contractNo": self.staffForm8.contractNo,
                                    "signType": self.staffForm8.signType,
                                    "endDate": self.staffForm8.endDate,
                                    "startDate": self.staffForm8.startDate,
                                    "planRegularDate": self.staffForm8.planRegularDate,
                                    "planServiceTimes": self.staffForm8.planServiceTimes,
                                    "realRegularDate": self.staffForm8.realRegularDate,
                                    "damageRayment": self.staffForm8.damageRayment,
                                    "remark": self.staffForm8.remark,
                                    "limitType": self.staffForm8.limitType,
                                    "isEffect": self.staffForm8.isEffect,
                                    "contractType": self.staffForm8.contractType
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList8();

                                self.staffEditShow8 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel8: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'contractAgreement/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList8();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 9
            staffList9: function () {
                var self = this;
                var method = 'dutyManage/getAbilityRequireListByParams',
                    param = JSON.stringify({
                        "companyId": 9169505,
                        "type": 2,
                        "pId": self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData9 = res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd9: function () {
                this.staffAddShow9 = true;

                this.staffForm9 = {
                    quality: '',
                }
            },
            staffAddSubmit9: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/addAbilityRequire',
                            param = JSON.stringify({
                                "abilityRequire": {
                                    "quality": self.staffForm9.quality,
                                    "type": 2,
                                    "pId": self.checkboxObj.id,
                                    "companyId": 9169505
                                },
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList9();
                                self.staffAddShow9 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit9: function (obj) {
                this.staffEditShow9 = true;

                this.staffForm9 = {
                    id: obj.id,
                    quality: obj.quality,
                }
            },
            staffEditSubmit9: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/updateAbilityRequire',
                            param = JSON.stringify({
                                "abilityRequire": {
                                    "id": id,
                                    "quality": self.staffForm9.quality,
                                    "type": 2,
                                    "pId": self.checkboxObj.pId,
                                    "companyId": 9169505
                                },
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList9();

                                self.staffEditShow9 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel9: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'dutyManage/delAbilityRequire',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList9();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 10
            staffList10: function () {
                var self = this;
                var method = 'societyRelations/getSocietyRelations',
                    param = JSON.stringify({
                        "empId": self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData10 = res.data.data.societyRelationss;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd10: function () {
                this.staffAddShow10 = true;

                this.staffForm10 = {
                    name: "",
                    relation: "",
                    phone: "",
                    address: "",
                    companyName: "",
                    dutyName: ""
                }
            },
            staffAddSubmit10: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'societyRelations/addSocietyRelations',
                            param = JSON.stringify({
                                "societyRelations": {
                                    "name": self.staffForm10.name,
                                    "relation": self.staffForm10.relation,
                                    "phone": self.staffForm10.phone,
                                    "address": self.staffForm10.address,
                                    "companyName": self.staffForm10.companyName,
                                    "dutyName": self.staffForm10.dutyName
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList10();
                                self.staffAddShow10 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit10: function (obj) {
                this.staffEditShow10 = true;

                this.staffForm10 = {
                    id: obj.id,
                    name: obj.name,
                    relation: obj.relation,
                    phone: obj.phone,
                    address: obj.address,
                    companyName: obj.companyName,
                    dutyName: obj.dutyName
                }
            },
            staffEditSubmit10: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'societyRelations/updateSocietyRelations',
                            param = JSON.stringify({
                                "societyRelations": {
                                    "id": id,
                                    "name": self.staffForm10.name,
                                    "relation": self.staffForm10.relation,
                                    "phone": self.staffForm10.phone,
                                    "address": self.staffForm10.address,
                                    "companyName": self.staffForm10.companyName,
                                    "dutyName": self.staffForm10.dutyName
                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList10();

                                self.staffEditShow10 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel10: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'societyRelations/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList10();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 11
            staffList11: function () {
                var self = this;
                var method = 'professionJobQualification/getProfessionJobQualifications',
                    param = JSON.stringify({
                        "empId": self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData11 = res.data.data.professionJobQualifications;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd11: function () {
                this.staffAddShow11 = true;

                this.staffForm11 = {
                    gainDate: "",
                    registedUnit: "",
                    issuedUnit: "",
                    certificateName: "",
                    certificateNo: "",
                    remark: "",
                }
            },
            staffAddSubmit11: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'professionJobQualification/addProfessionJobQualification',
                            param = JSON.stringify({
                                "professionJobQualification": {
                                    "gainDate": this.$date(self.staffForm11.gainDate),
                                    "registedUnit": self.staffForm11.registedUnit,
                                    "issuedUnit": self.staffForm11.issuedUnit,
                                    "certificateName": self.staffForm11.certificateName,
                                    "certificateNo": self.staffForm11.certificateNo,
                                    "remark": self.staffForm11.remark,

                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList11();
                                self.staffAddShow11 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit11: function (obj) {
                this.staffEditShow11 = true;

                this.staffForm11 = {
                    id: obj.id,
                    gainDate: obj.gainDate,
                    registedUnit: obj.registedUnit,
                    issuedUnit: obj.issuedUnit,
                    certificateName: obj.certificateName,
                    certificateNo: obj.certificateNo,
                    remark: obj.remark,
                }
            },
            staffEditSubmit11: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'professionJobQualification/updateProfessionJobQualification',
                            param = JSON.stringify({
                                "professionJobQualification": {
                                    id: id,
                                    "gainDate": this.$date(self.staffForm11.gainDate),
                                    "registedUnit": self.staffForm11.registedUnit,
                                    "issuedUnit": self.staffForm11.issuedUnit,
                                    "certificateName": self.staffForm11.certificateName,
                                    "certificateNo": self.staffForm11.certificateNo,
                                    "remark": self.staffForm11.remark,

                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList11();

                                self.staffEditShow11 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel11: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'professionJobQualification/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList11();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },

            // 12
            staffList12: function () {
                var self = this;
                var method = 'professionSkillQualification/getProfessionSkillQualifications',
                    param = JSON.stringify({
                        "empId": self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData12 = res.data.data.professionSkillQualifications;
                    };
                this.$http(method, param, succeed);
            },
            staffAdd12: function () {
                this.staffAddShow12 = true;

                this.staffForm12 = {
                    qualificationName: "",
                    qualificationLevel: "",
                    qualificationNo: "",
                    gainDate: "",
                    registerCompany: "",
                }
            },
            staffAddSubmit12: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'professionSkillQualification/addProfessionSkillQualification',
                            param = JSON.stringify({
                                "professionSkillQualification": {
                                    "qualificationName": self.staffForm12.qualificationName,
                                    "qualificationLevel": self.staffForm12.qualificationLevel,
                                    "qualificationNo": self.staffForm12.qualificationNo,
                                    "gainDate": this.$date(self.staffForm12.gainDate),
                                    "registerCompany": self.staffForm12.registerCompany,

                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.staffList12();
                                self.staffAddShow12 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffEdit12: function (obj) {
                this.staffEditShow12 = true;

                this.staffForm12 = {
                    id: obj.id,
                    qualificationName: obj.qualificationName,
                    qualificationLevel: obj.qualificationLevel,
                    qualificationNo: obj.qualificationNo,
                    gainDate: obj.gainDate,
                    registerCompany: obj.registerCompany,
                }
            },
            staffEditSubmit12: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'professionSkillQualification/updateProfessionSkillQualification',
                            param = JSON.stringify({
                                "professionSkillQualification": {
                                    "id": id,
                                    "qualificationName": self.staffForm12.qualificationName,
                                    "qualificationLevel": self.staffForm12.qualificationLevel,
                                    "qualificationNo": self.staffForm12.qualificationNo,
                                    "gainDate": this.$date(self.staffForm12.gainDate),
                                    "registerCompany": self.staffForm12.registerCompany,

                                },
                                "empId": self.checkboxObj.id,
                                "companyId": 9169505
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.staffList12();

                                self.staffEditShow12 = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            staffDel12: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'professionSkillQualification/deleteById',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.staffList12();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            staffExport: function () {
                var method = "user/ExportExceByUsers",
                    param = JSON.stringify({
                        type: '1',
                    });
                this.$exportOut(method, param)
            },
            staffTemplate: function () {
                var method = "user/exportTemplate",
                    param = JSON.stringify({
                        companyId: "61",
                        type: "1",
                    });
                this.$exportOut(method, param)
            },
            userAjax: function () {
				var self = this;
				var method = 'user/getUser',
					param = JSON.stringify({
					}),
					succeed = function (res) {
						self.userData = res.data.data;
					};
				this.$http(method, param, succeed);
			},



        },
        components: {
            treeComponent, fileUpload

        }


    }

</script>

<style scoped>
    .bigForm .el-form-item {
        width: 50%;
        float: left;
        height: 36px;
    }
    .hrm_module_btn_search{
        background: #f5f8fa;
        border: 1px solid #bfcbd9;
        padding: 20px;
        margin-top: 20px;
    }
</style>
