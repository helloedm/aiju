<template>
    <div id='payManage'>
        <div class="manage_nav">

        </div>
        <div class="manage_con">
            <el-tabs v-model="activeName">
                <el-tab-pane label="部门维护" name="1">
                    <div class="hrm_module">
                        <div class="hrm_module_btn">
                            <el-button type="primary" icon="plus" @click="deptAdd">新增</el-button>
                            <!--<el-button type="primary" icon="search" @click="popShowClick(0)">查看</el-button>
                            <el-button type="primary" icon="delete" @click="deptDel">删除</el-button>-->
                            <el-button type="primary" @click="deptImport"><i class="iconfont hrm_btn_icon">&#xe649;</i>导入</el-button>
                            <el-button type="primary" @click="deptExport"><i class="iconfont hrm_btn_icon">&#xe648;</i>导出</el-button>
                            <el-button type="primary" icon="search" @click="popShowClick(0)" :disabled="deptCheckboxNum != 1 || deptCheckboxNum == 0">查看</el-button>
                            <el-button type="primary" icon="delete" @click="deptDel" :disabled="deptCheckboxNum < 1 || deptCheckboxNum == 0">删除</el-button>
                        </div>
                        <div class="hrm_module_con">
                            <el-table border highlight-current-row :data="orgDeptList"  ref="deptTable"   align="center" class="hrm_mgb15" @selection-change="checkList" @row-click="checkListRow">
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column type="index" width="100" label="序号"></el-table-column>
                                <el-table-column prop="name" label="部门名称"></el-table-column>
                                <el-table-column prop="shortName" label="部门简称"></el-table-column>
                                <el-table-column prop="parentDeptName" label="上级部门"></el-table-column>
                                <el-table-column prop="remark" label="描述说明"></el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="orgDeptPage.totalCount" @current-change="deptList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="部门架构" name="2">
                    <div class="dept_tree">
                        <div v-for="item in deptFrameworkData" class="dept_tree_div ">
                            <div class="dept_tree_text"><span class="dept_tree_span" v-bind:class="{lineBottom: item.children.length > 0}">{{item.name}}</span></div>
                            <div class="dept_tree_line" v-show="item.children.length > 1"></div>
                            <div v-for="(item2, index) in item.children" class="dept_tree_div" v-bind:class="{lineHTopFirst: index == 0 && item.children.length != 1,lineHTopLast: index == item.children.length - 1 && item.children.length != 1,lineHTop: index != item.children.length - 1 && index != 0}"
                                ref="item2">
                                <div class="dept_tree_text"><span class="dept_tree_span lineTop" v-bind:class="{lineBottom: item2.children.length > 0}">{{item2.name}}</span></div>
                                <div class="dept_tree_line" v-show="item2.children.length > 1"></div>
                                <div v-for="(item3, index) in item2.children" class="dept_tree_div " ref="item3" v-bind:class="{lineHTopFirst: index == 0 && item2.children.length != 1,lineHTopLast: index == item2.children.length - 1 && item2.children.length != 1,lineHTop: index != item2.children.length - 1 && index != 0}">
                                    <div class="dept_tree_text"><span class="dept_tree_span lineTop" v-bind:class="{lineBottom: item3.children.length > 0}">{{item3.name}}</span></div>
                                    <div class="dept_tree_line" v-show="item3.children.length > 1"></div>
                                    <div v-for="(item4, index) in item3.children" class="dept_tree_div" ref="item4" v-bind:class="{lineHTopFirst: index == 0 && item3.children.length != 1,lineHTopLast: index == item3.children.length - 1 && item3.children.length != 1,lineHTop: index != item3.children.length - 1 && index != 0}">
                                        <div class="dept_tree_text"><span class="dept_tree_span lineTop" v-bind:class="{lineBottom: item4.children.length > 0}">{{item4.name}}</span></div>
                                        <div class="dept_tree_line" v-show="item4.children.length > 1"></div>
                                        <div v-for="(item5, index) in item4.children" class="dept_tree_div " ref="item5" v-bind:class="{lineHTopFirst: index == 0 && item4.children.length != 1,lineHTopLast: index == item4.children.length - 1 && item4.children.length != 1,lineHTop: index != item4.children.length - 1 && index != 0}">
                                            <div class="dept_tree_text"><span class="dept_tree_span lineTop" v-bind:class="{lineBottom: item5.children.length > 0}">{{item5.name}}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="快速维护" name="3">
                    <div class="hrm_module">
                        <div class="hrm_module_btn">
                            <el-button type="primary" icon="plus" @click="quickAdd">新增</el-button>
                            
                            <el-button type="primary" @click="quickImport"><i class="iconfont hrm_btn_icon">&#xe649;</i>导入</el-button>
                            <el-button type="primary" @click="quickExport"><i class="iconfont hrm_btn_icon">&#xe648;</i>导出</el-button>

                             <el-button type="primary" icon="edit" @click="quickEdit" :disabled="quickCheckboxNum != 1 || quickCheckboxNum == 0">编辑</el-button>
                            <el-button type="primary" icon="delete" @click="quickDel" :disabled="quickCheckboxNum < 1 || quickCheckboxNum == 0">删除</el-button>
                        </div>
                        <div class="hrm_module_con">
                            <el-table border highlight-current-row :data="quickListData" ref="quickTable"   align="center" class="hrm_mgb15" @selection-change="quickCheckList" @row-click="quickCheckListRow">
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column prop="userNo" label="工号"></el-table-column>
                                <el-table-column prop="realname" label="姓名"></el-table-column>
                                <el-table-column prop="deptName" label="部门"></el-table-column>
                                <el-table-column prop="phone" label="电话"></el-table-column>
                                <el-table-column prop="positionName" label="职位"></el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="quickListPage.totalCount" @current-change="quickList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <!--部门管理-导入-->
            <el-dialog title="提示" :visible.sync="deptImportShow" size="tiny">
                <el-upload class="upload-demo" :action="deptImportUrl" :on-success="deptImportSubmit" :data="deptImportParam">
                    <el-button type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传指定模版文件，如果没有模版文件请点击
                        <el-button type="text" @click="deptTemplate">下载模版</el-button>填充后上传</div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deptImportShow = false">取消</el-button>
                </span>
            </el-dialog>

            <!--快速维护-导入-->
            <el-dialog title="提示" :visible.sync="quickImportShow" size="tiny">
                <el-upload class="upload-demo" :action="quickImportUrl" :on-success="quickImportSubmit" :data="quickImportParam">
                    <el-button type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传指定模版文件，如果没有模版文件请点击
                        <el-button type="text" @click="quickTemplate">下载模版</el-button>填充后上传</div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="quickImportShow = false">取消</el-button>
                </span>
            </el-dialog>

            <!--部门管理-查看-->
            <el-dialog title="查看部门" :visible.sync="popShow" size="tiny" v-if="popNum==0">
                <div class="hrm_msg">
                    <div class="hrm_msg_nav">部门信息<i class="el-icon-edit" @click="deptEdit(checkboxObj)"></i></div>
                    <div class="hrm_msg_con">
                        <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>部门名称：{{checkboxObj.name}}</span></div>
                        <div class="hrm_msg_item"><span>部门简称：{{checkboxObj.shortName}}</span></div>
                        <!--<div class="hrm_msg_item" style="width: 50%;float: left;"><span>部门序号：{{checkboxObj.deptNo}}</span></div>-->
                        <div class="hrm_msg_item"><span>上级部门：{{checkboxObj.parentDeptName}}</span></div>
                        <div class="hrm_msg_item"><span>描述说明：{{checkboxObj.remark}}</span></div>
                    </div>
                </div>
                <el-tabs v-model="deptCheckActive" type="card" @tab-click="deptCheckTab">
                    <el-tab-pane label="员工列表" name="0">
                        <el-table border :data="staffListData"  >
                            <el-table-column prop="deptName" label="所属部门"></el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <!--<el-table-column prop="certificateNo" label="证件号码" width="200"></el-table-column>-->
                            <el-table-column prop="statusStr" label="状态"></el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :page-size="5" :total="staffListPage.totalCount" @current-change="staffList"></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="职位列表" name="1">
                        <el-table border :data="positionListData"  >
                            <el-table-column prop="deptName" label="所属部门"></el-table-column>
                            <el-table-column prop="name" label="职位名称"></el-table-column>
                            <el-table-column prop="dutyName" label="所属职务"></el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :page-size="5" :total="positionListPage.totalCount" @current-change="positionList"></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="附件列表" name="2">
                        <file-upload :param="deptParam" @fileId="fileId"></file-upload>
                        <el-table border :data="fileListData"  >
                            <el-table-column prop="fileName" label="附件名称"></el-table-column>
                            <el-table-column prop="url" label="操作">
                                <template scope="scope">
                                     <el-button type="text" @click="fileDownload(scope.row.id)">下载</el-button>
                                    <el-button type="text" @click="fileDel(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :page-size="5" :total="fileListPage.totalCount" @current-change="fileList"></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="其他信息" name="3">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav">人员编制<i class="el-icon-plus" @click="personnalAddShow = true"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item" v-for="list in personnelListData">{{list.startDate | dateFilter}}至{{list.endDate | dateFilter}}，人员编制为{{list.personnalForce}}。
                                    <div class="hrm_msg_icon"><i class="el-icon-edit" @click="personnelEdit(list)"></i><i class="el-icon-delete" @click="personnelDel(list.id)"></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav">负责人<i class="el-icon-plus" @click="leaderAddShow = true"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item" v-for="list in leaderListData">{{list.startDate | dateFilter}}至{{list.endDate | dateFilter}}，负责人为{{list.userName}}。
                                    <div class="hrm_msg_icon"><i class="el-icon-edit" @click="leaderEdit(list)"></i><i class="el-icon-delete" @click="leaderDel(list.id)"></i></div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="hrm_mgt20 clearfix">
                                                            <el-button class="f_r" @click="popShow=fasle">关闭</el-button>

                </div>
            </el-dialog>

            <!--部门管理-新增-->
            <el-dialog title="新增部门" :visible.sync="deptAddShow" size="tiny">
                <el-form label-width="120px" :model="deptForm" :rules="deptRules" ref="deptForm">
                    <el-form-item label="部门名称" prop="name">
                        <el-input v-model="deptForm.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="部门简称" prop="shortName">
                        <el-input v-model="deptForm.shortName" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="上级部门" prop="parentDeptId">
                        <tree-component @treeAssign="deptFormTreeAssign" :tree-btn-name="deptFormBtnName" :tree-support-select="true" :tree-type='1'></tree-component>
                    </el-form-item>
                    <el-form-item label="描述说明" prop="remark">
                        <el-input v-model="deptForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="deptAddShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyAddSubmit('deptForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--部门管理-编辑-->
            <el-dialog title="编辑部门" :visible.sync="deptEditShow" size="tiny">
                <el-form label-width="100px" :model="deptForm" :rules="deptRules" ref="deptForm">
                    <el-form-item label="部门名称" prop="name">
                        <el-input v-model="deptForm.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="部门简称" prop="shortName">
                        <el-input v-model="deptForm.shortName" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="上级部门" prop="parentDeptId">
                        <tree-component @treeAssign="deptFormTreeAssign" :tree-btn-name="deptFormBtnName" :tree-support-select="true" :tree-type='1'
                            :tree-select-data="treeSelectData" ref="treeParent"></tree-component>
                    </el-form-item>
                    <el-form-item label="描述说明" prop="remark">
                        <el-input v-model="deptForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="deptEditShow = false">取消</el-button>
                        <el-button type="primary" @click="deptEditSubmit('deptForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--部门管理-人员编制-新增-->
            <el-dialog title="新增人员编制" :visible.sync="personnalAddShow" size="tiny">
                <el-form label-width="100px" :model="personnalForm" :rules="personnalFormRules" ref="personnalForm">
                    <el-form-item label="开始日期" prop="startDate">
                        <el-date-picker v-model="personnalForm.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" prop="endDate">
                        <el-date-picker v-model="personnalForm.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="人员编制" prop="personnalForce">
                        <el-input v-model="personnalForm.personnalForce"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="personnalAddShow = false">取消</el-button>
                        <el-button type="primary" @click="personnelAdd('personnalForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--部门管理-人员编制-编辑-->
            <el-dialog title="编辑人员编制" :visible.sync="personnalEditShow" size="tiny">
                <el-form label-width="100px" :model="personnalForm" :rules="personnalFormRules" ref="personnalForm">
                    <el-form-item label="开始日期" prop="startDate">
                        <el-date-picker v-model="personnalForm.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" prop="endDate">
                        <el-date-picker v-model="personnalForm.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="人员编制" prop="personnalForce">
                        <el-input v-model="personnalForm.personnalForce"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="personnalEditShow = false">取消</el-button>
                        <el-button type="primary" @click="personnelEditSubmit('personnalForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--部门管理-负责人-新增-->
            <el-dialog title="新增负责人" :visible.sync="leaderAddShow" size="tiny">
                <el-form label-width="100px" :model="leaderForm" :rules="leaderFormRules" :ref="leaderForm">
                    <el-form-item label="开始日期" prop="startDate">
                        <el-date-picker v-model="leaderForm.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" prop="endDate">
                        <el-date-picker v-model="leaderForm.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="负责人" prop="depManagerUserId">
                        <tree-component @treeAssign="leaderFormTreeAssign" :tree-btn-name="leaderFormBtnName" :tree-support-select="true" :tree-type='2'></tree-component>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="leaderAddShow = false">取消</el-button>
                        <el-button type="primary" @click="leaderAdd(leaderForm)">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--部门管理-负责人-编辑-->
            <el-dialog title="编辑负责人" :visible.sync="leaderEditShow" size="tiny">
                <el-form label-width="100px" :model="leaderForm" :rules="leaderFormRules" :ref="leaderForm">
                    <el-form-item label="开始日期" prop="startDate">
                        <el-date-picker v-model="leaderForm.startDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" prop="endDate">
                        <el-date-picker v-model="leaderForm.endDate" type="date" placeholder="选择日期" style="width: 200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="负责人" prop="depManagerUserId">
                        <tree-component @treeAssign="leaderFormTreeAssign" :tree-btn-name="leaderFormBtnName" :tree-support-select="true" :tree-type='2'
                            :tree-select-data="treeSelectData" ref="treeParent"></tree-component>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="leaderEditShow = false">取消</el-button>
                        <el-button type="primary" @click="leaderEditSubmit(leaderForm)">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--快速维护-新增-->
            <el-dialog title="新增员工" :visible.sync="quickAddShow" size="tiny">
                <el-form label-width="100px" :model="quickForm" :rules="quickRules" ref="quickForm">
                    <el-form-item label="所属部门" prop="deptId">
                        <tree-component @treeAssign="quickFormTreeAssign" :tree-btn-name="quickFormBtnName" :tree-support-select="true" :tree-type='1'></tree-component>
                    </el-form-item>
                    <el-form-item label="员工姓名" prop="realname">
                        <el-input v-model="quickForm.realname" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="员工工号" prop="userNo">
                        <el-input v-model="quickForm.userNo" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="quickForm.phone" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="员工邮箱" prop="email">
                        <el-input v-model="quickForm.email" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="所属职位" prop="positionId">
                        <el-select v-model="quickForm.positionId" placeholder="请选择职位" style="width: 200px;">
                            <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="角色" prop="hrmRoleId">
                        <el-select v-model="quickForm.hrmRoleId" placeholder="请选择角色" style="width: 200px;">
                            <el-option label="员工" value="2"></el-option>
                            <el-option label="财务" value="3"></el-option>
                            <el-option label="招聘专员" value="4"></el-option>
                            <el-option label="面试官" value="5"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button @click="quickAddShow = false">取消</el-button>
                        <el-button type="primary" @click="quickAddSubmit('quickForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--快速维护-编辑-->
            <el-dialog title="编辑员工" :visible.sync="quickEditShow" size="tiny">
                <el-form label-width="100px" :model="quickForm" :rules="quickRules" ref="quickForm">
                    <el-form-item label="所属部门" prop="deptId">
                        <tree-component @treeAssign="quickFormTreeAssign" :tree-btn-name="quickFormBtnName" :tree-support-select="true" :tree-type='1'
                            :tree-select-data="treeSelectData" ref="treeParent"></tree-component>
                    </el-form-item>
                    <el-form-item label="员工姓名" prop="realname">
                        <el-input v-model="quickForm.realname" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="员工工号" prop="userNo">
                        <el-input v-model="quickForm.userNo" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="quickForm.phone" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="员工邮箱" prop="email">
                        <el-input v-model="quickForm.email" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="所属职位" prop="positionId">
                        <el-select v-model="quickForm.positionId" placeholder="请选择职位" style="width: 200px;">
                            <el-option v-bind:label="item.name" v-bind:value="item.id" v-for="item in postListData"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="角色" prop="hrmRoleId">
                        <el-select v-model="quickForm.hrmRoleId" placeholder="请选择角色" style="width: 200px;">
                            <el-option label="员工" value="2"></el-option>
                            <el-option label="财务" value="3"></el-option>
                            <el-option label="招聘专员" value="4"></el-option>
                            <el-option label="面试官" value="5"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button @click="quickEditShow = false">取消</el-button>
                        <el-button type="primary" @click="quickEditSubmit('quickForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import treeComponent from '../tree.vue';
    import fileUpload from '../fileUpload.vue';
    import Util from '../../script/util.js'


    export default {
        data() {
            return {

                treeSelectData: {
                    keys: [],
                    names: ""
                },
                deptFormBtnName: '请选择部门',
                leaderFormBtnName: '请选择人员',
                quickFormBtnName: '请选择部门',

                orgDeptList: [], //部门维护list
                orgDeptPage: {}, //部门维护page
                deptForm: {
                    name: '',
                    shortName: '',
                    parentDeptId: [],
                    remark: '',
                    deptNo: '',
                },
                deptRules: {
                    name: [
                        { required: true, message: '请输入部门名称' },
                        { max: 64, message: '长度最多64个字符' },
                    ],
                    shortName: [
                        { max: 64, message: '长度最多64个字符' },
                    ],
                    parentDeptId: [{ required: true, message: '请选择上级部门' }],
                    remark: [
                        { max: 64, message: '长度最多64个字符' },
                    ],
                    deptNo: [
                        { max: 64, message: '长度最多64个字符' },
                    ],
                },
                activeName: '1', //切换tab

                popShow: false, //是否显示弹框
                popNum: 0, //弹框序号
                checkboxObj: {}, //checkbox指定项数据
                checkboxArr: [], //checkbox数组
                fileListData: [], // 附件列表


                // 部门维护
                deptAddShow: false,
                deptEditShow: false,

                deptCheckActive: '0',
                staffListData: [], // 员工列表
                staffListPage: {},
                positionListData: [], // 职位列表
                positionListPage: {},

                personnelListData: [],
                personnalAddShow: false,
                personnalEditShow: false,
                personnalForm: {
                    startDate: '',
                    endDate: '',
                    personnalForce: '',
                },
                personnalFormRules: {
                    startDate: [{ required: true, message: '请选择开始日期' }],
                    endDate: [{ required: true, message: '请选择结束日期' }],
                    personnalForce: [{ required: true, message: '请输入人员编制' }],
                },

                leaderListData: [],
                leaderAddShow: false,
                leaderEditShow: false,
                leaderForm: {
                    startDate: '',
                    endDate: '',
                    depManagerUserId: '',
                },
                leaderFormRules: {
                    startDate: [{ required: true, message: '请选择开始日期' }],
                    endDate: [{ required: true, message: '请选择结束日期' }],
                    depManagerUserId: [{ required: true, message: '请选择负责人' }],
                },

                deptFrameworkData: [],

                // 快速维护
                quickCheckObj: {},
                quickCheckArr: [],

                quickListData: [],
                quickListPage: {},
                quickAddShow: false,
                quickEditShow: false,
                quickForm: {
                    realname: '',
                    phone: '',
                    deptId: '',
                    positionId: '',
                    userNo: '',
                    email:'',
                    hrmRoleId:'2',
                },
                quickRules: {
                    realname: [{ required: true, message: '请输入员工姓名' }],
                    phone: [{ required: true, message: '请输入手机号码' }],
                    deptId: [{ required: true, message: '请选择所属部门' }],
                    positionId: [{ required: true, message: '请选择所属职位' }],
                    userNo: [],
                    email:[{required: true, message: '请输入员工邮箱' }],
                    hrmRoleId:[{ required: true, message: '请选择所属角色' }]
                },

                postListData: [],

                deptImportShow: false,
                deptImportParam: {},
                deptImportUrl: Util.deptImportUrl,

                quickImportShow: false,
                quickImportParam: {},
                quickImportUrl: Util.quickImportUrl,

                // 附件
                fileListPage: {},
                deptParam: {
                    businessId: 1,
                    fId: ''
                },

                deptCheckboxNum: '',
                quickCheckboxNum: '',
                

            }
        },
        mounted: function () {
            this.deptList();
            this.deptFramework();
            this.quickList();
            this.postList();

            this.deptUploadAssign('department/importDepartment')
            this.quickUploadAssign('user/leadTemlate')
            this.userAjax();
        },
        filters: {
            dateFilter: function (value) {
                if(typeof value == "string"){
                    value = value.slice(0,10)
                }
                return value;
            }
        },
        methods: {
            // 附件
            fileId(id){
                this.fileList();
            },
            fileList(pageNum){
                // console.log()
                var self = this;
                var method = 'fileUpload/getFileInfoList',
                    param = JSON.stringify({
                        businessId: 1,
                        fId: self.deptParam.fId,
                        isTemplate: 2,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                    }),
                    succeed = function (res) {
                        self.fileListData = res.data.data.fileInfoList;
                        self.fileListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            fileDel(id){
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
                        self.fileList()
                    };
                this.$http(method, param, succeed);
            },
            fileDownload(id){
                var param = JSON.stringify({
                        isTemplate: '0',
                        id: id,
                    });
                this.$download(param)
            },

            // 员工管理表格行点击事件
            checkListRow: function (row, event, column) {
                this.toggleSelection([row]);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.deptTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.deptTable.clearSelection();
                }
            },
            // 表格多选框change事件
            checkList: function (selection, row) {
                this.deptCheckboxNum = selection.length;
                if (selection.length > 0) {
                    this.checkboxObj = selection[0];
                    this.checkboxArr = selection;
                    this.deptParam.fId = selection[0].id;
                }
            },

            // 树
            deptFormTreeAssign: function (v) {
                this.deptForm.parentDeptId = v[0]
            },
            leaderFormTreeAssign: function (v) {
                this.leaderForm.depManagerUserId = v[0]
            },
            quickFormTreeAssign: function (v) {
                this.quickForm.deptId = v[0]
            },

            deptFramework: function () {
                var self = this;
                var method = 'department/getDepartmentFramework',
                    param = JSON.stringify({
                        companyId: 139353,
                    }),
                    succeed = function (res) {
                        self.deptFrameworkData = res.data.data;
                    };
                this.$http(method, param, succeed);
            },
            deptList: function (pageNum) {
                var self = this;
                var method = 'department/getDepartmentList',
                    param = JSON.stringify({
                        companyId: 139353,
                        pageNum: pageNum ? pageNum : '1',
                        pageSize: 10
                    }),
                    succeed = function (res) {
                        self.orgDeptList =res.data.data.result;
                        self.orgDeptPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },

            // 新建
            deptAdd: function () {
                this.deptForm = {
                    name: '',
                    shortName: '',
                    parentDeptId: [],
                    remark: '',
                    deptNo: '',
                };
                this.deptAddShow = true;
            },
            dutyAddSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'department/addDepartment',
                            param = JSON.stringify({
                                name: self.deptForm.name,
                                shortName: self.deptForm.shortName,
                                parentDeptId: self.deptForm.parentDeptId,
                                remark: self.deptForm.remark,
                                deptNo: self.deptForm.deptNo,
                                companyId: 139353,
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增数据成功!',
                                    type: 'success'
                                });
                                self.deptAddShow = false;
                                self.deptList();
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 查看
            popShowClick(id) {
                if (this.checkboxArr.length != 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.staffList();
                this.popShow = true;
                this.popNum = id;
                this.deptCheckActive = '0'
            },
            // 删除
            deptDel: function () {
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
                    var method = 'department/delDepartment',
                        param = JSON.stringify({
                            deptIds: arr.join(','),

                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.deptList();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 部门维护-编辑部门 
            deptEdit: function (obj) {
                this.deptForm.name = obj.name;
                this.deptForm.shortName = obj.shortName;
                this.deptForm.remark = obj.remark;
                this.deptForm.deptNo = obj.deptNo;
                this.deptForm.parentDeptId = obj.parentDeptId;

                this.treeSelectData.keys.push(obj.parentDeptId);
                this.treeSelectData.names = obj.parentDeptName;

                // 延迟回调更新部门
                this.$nextTick(function () {
                    this.$refs.treeParent.setChecked();
                });

                this.deptEditShow = true;
            },
            deptEditSubmit: function (formName) {
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'department/updateDepartment',
                            param = JSON.stringify({
                                companyId: 61,
                                deptId: self.checkboxObj.id,
                                name: self.deptForm.name,
                                shortName: self.deptForm.shortName,
                                parentDeptId: self.deptForm.parentDeptId,
                                remark: self.deptForm.remark,
                                deptNo: self.deptForm.deptNo,
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                self.deptEditShow = false;
                                self.popNum = -1;
                                self.deptList();
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            deptCheckTab: function (tab) {
                console.log(tab.index)
                switch (tab.index) {
                    case '0':
                        this.staffList()
                        break;
                    case '1':
                        this.positionList()
                        break;
                    case '2':
                        this.fileList()
                        break;
                    case '3':
                        this.personnelList()
                        this.leaderList()
                        break;
                }
            },
            // 部门维护-员工列表
            staffList: function (pageNum) {
                var self = this;
                var method = 'user/getUsers',
                    param = JSON.stringify({
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 5,
                        deptId: this.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.staffListData = res.data.data.users
                        self.staffListPage = res.data.data.page
                    };
                this.$http(method, param, succeed);
            },
            // 部门维护-职位列表
            positionList: function (pageNum) {
                var self = this;
                var method = 'positionManage/getPositionInfoListByParams',
                    param = JSON.stringify({
                        companyId: 61,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 5,
                        deptId: this.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.positionListData = res.data.data.result
                        self.positionListPage = res.data.data.page
                    };
                this.$http(method, param, succeed);
            },
            // // 部门维护-附件列表 
            // fileList: function () {
            //     var self = this;
            //     var method = 'fileUpload/getFileInfoList',
            //         param = JSON.stringify({
            //             "businessId": 1,
            //             "isTemplate": 2,
            //             "fId": 1,
            //             "pageNum": 1,
            //             "pageSize": 10
            //         }),
            //         succeed = function (res) {
            //             var arr = res.data.data.fileInfoList;
            //             // for (var i = 0; i < arr.length; i++) {
            //             //     arr[i].name = arr[i].fileName;
            //             //     delete arr[i]['fileName'];
            //             // }
            //             self.fileListData = arr;
            //         };
            //     this.$http(method, param, succeed);
            // },
            // 部门维护-其他信息-人员编制
            personnelList: function () {
                var self = this;
                var method = 'departmentPersonNum/getDepartmentPersonNum',
                    param = JSON.stringify({
                        companyId: 61,
                        deptId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.personnelListData = res.data.data
                    };
                this.$http(method, param, succeed);
            },
            // 部门维护-其他信息-负责人
            leaderList: function () {
                var self = this;
                var method = 'departmentPrincipal/getDepartmentPrincipal',
                    param = JSON.stringify({
                        companyId: 61,
                        deptId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.leaderListData = res.data.data
                    };
                this.$http(method, param, succeed);
            },
            // 部门维护-其他信息-人员编制-新增
            personnelAdd: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'departmentPersonNum/addDepartmentPersonNum',
                            param = JSON.stringify({
                                companyId: 61,
                                deptId: self.checkboxObj.id,
                                startDate: this.$date(self.personnalForm.startDate),
                                endDate: this.$date(self.personnalForm.endDate),
                                personnalForce: self.personnalForm.personnalForce,
                            }),
                            succeed = function (res) {
                                self.form9 = {
                                    startDate: '',
                                    endDate: '',
                                    depManagerUserId: '',
                                };
                                self.$message({
                                    message: '新增人员编制成功!',
                                    type: 'success'
                                });
                                self.$refs[formName].resetFields();
                                self.personnelList();
                                self.personnalAddShow = false
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 部门维护-其他信息-负责人-新增
            leaderTreeArr(v) {
                console.log(v[0])
                this.leaderForm.depManagerUserId = v[0]
            },
            leaderAdd: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'departmentPrincipal/addDepartmentPrincipal',
                            param = JSON.stringify({
                                companyId: 61,
                                deptId: self.checkboxObj.id,
                                startDate: this.$date(self.leaderForm.startDate),
                                endDate: this.$date(self.leaderForm.endDate),
                                depManagerUserId: self.leaderForm.depManagerUserId,
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增负责人成功!',
                                    type: 'success'
                                });
                                self.$refs[formName].resetFields();
                                self.leaderList();
                                self.leaderAddShow = false;
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 部门维护-其他信息-人员编制-删除
            personnelDel: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'departmentPersonNum/delDepartmentPersonNum',
                        param = JSON.stringify({
                            id: id,
                        }),
                        succeed = function (res) {
                            self.personnelList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 部门维护-其他信息-负责人-删除
            leaderDel: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'departmentPrincipal/delDepartmentPrincipal',
                        param = JSON.stringify({
                            id: id,
                        }),
                        succeed = function (res) {
                            self.leaderList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 部门维护-其他信息-人员编制-编辑
            personnelEdit: function (obj) {
                console.log(obj)
                this.personnalForm.startDate = obj.startDate;
                this.personnalForm.endDate = obj.endDate;
                this.personnalForm.personnalForce = obj.personnalForce;
                this.personnalForm.id = obj.id;
                this.personnalEditShow = true;
            },
            personnelEditSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'departmentPersonNum/updateDepartmentPersonNum',
                            param = JSON.stringify({
                                companyId: 61,
                                deptId: self.checkboxObj.id,
                                startDate: this.$date(self.personnalForm.startDate),
                                endDate: this.$date(self.personnalForm.endDate),
                                personnalForce: self.personnalForm.personnalForce,
                                id: self.personnalForm.id
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.personnelList();
                                self.personnalEditShow = false // 二级弹窗
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 部门维护-其他信息-负责人-编辑
            leaderEdit: function (obj) {
                console.log(obj)
                this.leaderForm.startDate = obj.startDate;
                this.leaderForm.endDate = obj.endDate;
                this.leaderForm.id = obj.id;
                this.leaderEditShow = true;

                this.treeSelectData.keys.push(obj.userId);
                this.treeSelectData.names = obj.userName;

                // 延迟回调更新部门
                this.$nextTick(function () {
                    this.$refs.treeParent.setChecked();
                });
            },
            leaderEditSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'departmentPrincipal/updateDepartmentPrincipal',
                            param = JSON.stringify({
                                companyId: 61,
                                deptId: self.checkboxObj.id,
                                startDate: this.$date(self.leaderForm.startDate),
                                endDate: this.$date(self.leaderForm.endDate),
                                depManagerUserId: self.leaderForm.depManagerUserId,
                                id: self.leaderForm.id
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.leaderList();
                                self.leaderEditShow = false // 二级弹窗
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },


            // 快速维护

            // 快速维护表格行点击事件
            quickCheckListRow: function (row, event, column) {
                this.quickToggleSelection([row]);
            },
            quickToggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.quickTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.quickTable.clearSelection();
                }
            },
            // 表格多选框change事件
            quickCheckList: function (selection, row) {
                this.quickCheckboxNum = selection.length;
                if (selection.length > 0) {
                    this.quickCheckObj = selection[0];
                    this.quickCheckArr = selection;
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
            quickAddTreeArr: function (v) {
                this.quickForm.deptId = v[0]
            },
            quickEditTreeArr: function (v) {
                this.quickForm.deptId = v[0]
            },
            // 列表
            quickList: function (pageNum) {
                var self = this;
                var method = 'user/getUsers',
                    param = JSON.stringify({
                        "companyId": 139353,
                        "pageNum": pageNum ? pageNum : 1,
                        "pageSize": 10
                    }),
                    succeed = function (res) {
                        self.quickListData = self.$tableNull(res.data.data.users);
                        self.quickListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 新增
            quickAdd: function () {
                var self = this;
                if (self.quickListPage.totalCount>=30 && !self.userData.hasUsbkey) {
                    self.$alert("您的免费版本人数已经达到上限，请联系客服进行购买专业版本！客服电话： 15868429129客服邮箱： biz@iyenei.com","提示",{
                        confirmButtonText: '确定',
                        callback: action => {
                            console.log(action);
                            if(action  == "confirm"){
                                location.href = "https://aijuhr.com/price/";
                            }
                        }
                    });
                    return false;
                };
                this.quickAddShow = true;
                this.quickForm = {
                    realname: "",
                    phone: "",
                    userNo: "",
                    positionId: "",
                    deptId: "",
                    hrmRoleId:'',
                }

            },
            quickAddSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'user/addUser',
                            param = JSON.stringify({
                                "companyId": 139353,
                                "user": {
                                    "realname": self.quickForm.realname,
                                    "phone": self.quickForm.phone,
                                    "deptId": self.quickForm.deptId,
                                    "positionId": self.quickForm.positionId,
                                    "userNo": self.quickForm.userNo,
                                    'email':self.quickForm.email,
                                    "hrmRoleId":self.quickForm.hrmRoleId
                                },
                                type:'2'
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加员工成功!',
                                    type: 'success'
                                });
                                self.quickList();
                                self.quickAddShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 编辑
            quickEdit: function () {
                if (this.quickCheckArr.length != 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                var obj = this.quickCheckObj;

                this.quickForm = {
                    realname: obj.realname,
                    phone: obj.phone,
                    userNo: obj.userNo,
                    positionId: obj.positionId,
                    deptId: obj.deptId,
                    email:obj.email,
                    hrmRoleId:obj.hrmRoleId
                }


                this.treeSelectData.keys.push(obj.deptId);
                this.treeSelectData.names = obj.deptName;


                // 延迟回调更新部门
                this.$nextTick(function () {
                    this.$refs.treeParent.setChecked();
                });


                this.quickEditShow = true;
            },
            quickEditSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'user/updateUser',
                            param = JSON.stringify({
                                "user": {
                                    "companyId": 139353,
                                    "realname": self.quickForm.realname,
                                    "phone": self.quickForm.phone,
                                    "deptId": self.quickForm.deptId,
                                    "positionId": self.quickForm.positionId,
                                    "id": self.quickCheckObj.id,
                                    "userNo": self.quickForm.userNo,
                                    'email':self.quickForm.email,
                                    'hrmRoleId':self.quickForm.hrmRoleId
                                },
                                'type':"2"
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改员工成功!',
                                    type: 'success'
                                });
                                self.quickList();
                                self.quickEditShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 删除
            quickDel: function () {
                if (this.quickCheckArr.length < 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.$confirm('此操作将永久删除这条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'user/deleteByIds',
                        param = JSON.stringify({
                            id: self.quickCheckObj.id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.quickList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            deptUploadAssign: function (method) {
                var param = JSON.stringify({
                    companyId: 61,
                })
                this.deptImportParam = {
                    param: param,
                    sign: this.$md5(method, param)
                }
            },
            deptImport: function () {
                this.deptImportShow = true;

            },
            deptImportSubmit: function (res) {
                this.deptList();
                if (res.code == 0) {
                    this.deptImportShow = false;
                    this.$message({
                        message: '导入部门数据成功!',
                        type: 'success'
                    });
                } else {
                    this.deptImportShow = false;
                    this.$message({
                        message: '操作失败，原因：' + res.message,
                        type: 'error'
                    });
                }
            },
            quickUploadAssign: function (method) {
                var param = JSON.stringify({
                    companyId: 61,
                    type: 2,
                })
                this.quickImportParam = {
                    param: param,
                    sign: this.$md5(method, param)
                }
            },
            quickImport: function () {
                var self = this;
                if (self.quickListPage.totalCount>=30 && !self.userData.hasUsbkey) {
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
                this.quickImportShow = true;
            },
            quickImportSubmit: function (res) {
                this.quickList();
                if (res.code == 0) {
                    this.quickImportShow = false;
                    this.$message({
                        message: '导入员工数据成功!',
                        type: 'success'
                    });
                } else {
                    this.quickImportShow = false;
                    this.$message({
                        message: '操作失败，原因：' + res.message,
                        type: 'error'
                    });
                }
            },
            // 导出
            deptExport: function () {
                var method = "department/downDeptModelExcel",
                    param = JSON.stringify({
                        companyId: 61,
                        isExportData: "1",
                        modelType: "1",
                    });
                this.$exportOut(method, param)
            },
            quickExport: function () {
                var method = "user/ExportExceByUsers",
                    param = JSON.stringify({
                        type: "2",
                    });
                this.$exportOut(method, param)
            },
            // 下载模版
            deptTemplate: function () {
                var method = "department/downDeptModelExcel",
                    param = JSON.stringify({
                        modelType: "1",
                        isExportData: "0",
                        companyId: "61",
                    });
                this.$exportOut(method, param)
            },
            quickTemplate: function () {
                var method = "user/exportTemplate",
                    param = JSON.stringify({
                        companyId: "61",
                        type: "2",
                    });
                this.$exportOut(method, param)
            },
            //获取当前登录的用户信息
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
            treeComponent,fileUpload
        }


    }

</script>

<style scoped>
    .manage_con span {
        margin-right: 10px;
    }
    
    .manage_con .manage_select {
        margin-right: 30px;
    }
    
    .dept_tree {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        /* Firefox */
        -webkit-box-sizing: border-box;
        /* Safari */
    }
    
    .dept_tree_div {
        padding: 20px;
        /*border: 1px solid blue;*/
        text-align: center;
        display: inline-block;
        vertical-align: top;
        position: relative;
        /*border-top: 1px solid blue;*/
    }
    
    .dept_tree_text {
        height: 52px;
    }
    
    .dept_tree .dept_tree_span {
        width: 108px;
        height: 40px;
        margin: 0;
        line-height: 40px;
        padding: 0 5px;
        white-space: nowrap;
        /*overflow: hidden;*/
        text-overflow: ellipsis;
        background: #5b9bd5;
        color: #fff;
        display: inline-block;
        position: relative;
    }
    
    .dept_tree_line {
        /*border-top: 1px solid #5b9bd5;*/
        margin: 0 auto;
        margin: 0 78px 0 81px;
    }
    
    .lineTop:after {
        content: "";
        height: 25px;
        border-left: 1px solid #5b9bd5;
        bottom: 31px;
        left: 60px;
        position: absolute;
    }
    
    .lineBottom:before {
        content: "";
        height: 25px;
        border-left: 1px solid #5b9bd5;
        top: 31px;
        left: 60px;
        position: absolute;
    }
    
    .lineHTop:after {
        content: "";
        width: 100%;
        height: 25px!important;
        border-top: 1px solid #5b9bd5;
        top: 4px;
        left: 1px;
        position: absolute;
    }
    
    .lineHTopFirst:after {
        content: "";
        width: 50%;
        height: 25px!important;
        border-top: 1px solid #5b9bd5;
        top: 4px;
        right: -1px;
        position: absolute;
    }
    
    .lineHTopLast:after {
        content: "";
        width: 50%;
        height: 25px!important;
        border-top: 1px solid #5b9bd5;
        top: 4px;
        left: 1px;
        position: absolute;
    }
</style>