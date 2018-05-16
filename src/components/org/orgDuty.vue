<template>
    <div id='payManage'>
        <div class="manage_nav">

        </div>
        <div class="manage_con">
            <el-tabs v-model="dutyActiveName">
                <el-tab-pane label="职位维护" name="0">
                    <div class="hrm_module">
                        <div class="hrm_module_btn">
                            <el-button type="primary" icon="plus" @click="postAdd">新增</el-button>
                            <el-button type="primary" @click="postImport"><i class="iconfont hrm_btn_icon">&#xe649;</i>导入</el-button>
                            <el-button type="primary" @click="postExport"><i class="iconfont hrm_btn_icon">&#xe648;</i>导出</el-button>

                             <el-button type="primary" icon="search" @click="postPopShowClick(1)" :disabled="postCheckboxNum != 1 || postCheckboxNum == 0">查看</el-button>
                            <el-button type="primary" icon="delete" @click="postDel" :disabled="postCheckboxNum < 1 || postCheckboxNum == 0">删除</el-button>
                        </div>
                        <div class="hrm_module_con">
                            <el-table border highlight-current-row :data="postListData" ref="postTable"   align="center" class="hrm_mgb15" @selection-change="postCheckList" @row-click="postCheckListRow">
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column prop="positionNo" width="100" label="序号"></el-table-column>
                                <el-table-column prop="name" label="职位名称"></el-table-column>
                                <el-table-column prop="deptName" label="所属部门"></el-table-column>
                                <el-table-column prop="dutyName" label="所属职务"></el-table-column>
                                <el-table-column prop="remark" label="描述说明"></el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="postListPage.totalCount" @current-change="postList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="职务维护" name="1">
                    <div class="hrm_module">
                        <div class="hrm_module_btn">
                            <el-button type="primary" icon="plus" @click="dutyAdd">新增</el-button>
                            
                            <el-button type="primary" @click="dutyImport"><i class="iconfont hrm_btn_icon">&#xe649;</i>导入</el-button>
                            <el-button type="primary" @click="dutyExport"><i class="iconfont hrm_btn_icon">&#xe648;</i>导出</el-button> 
                            <el-button type="success" icon="view" @click="dutyBasis" class="f_r">基础数据</el-button>

                            <el-button type="primary" icon="search" @click="dutyPopShowClick(1)" :disabled="dutyCheckboxNum != 1 || dutyCheckboxNum == 0">查看</el-button>
                            <el-button type="primary" icon="delete" @click="dutyDel" :disabled="dutyCheckboxNum < 1 || dutyCheckboxNum == 0">删除</el-button>
                        </div>
                        <div class="hrm_module_con">
                            <el-table border highlight-current-row :data="dutyListData" ref="dutyTable"   align="center" class="hrm_mgb15" @selection-change="dutyCheckList" @row-click="dutyCheckListRow">
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column prop="dutyNo" width="100" label="序号"></el-table-column>
                                <el-table-column prop="name" label="职务名称"></el-table-column>
                                <el-table-column prop="dutyTypeName" label="职务类型"></el-table-column>
                                <el-table-column prop="dutyLevelBottomName" label="职等下限"></el-table-column>
                                <el-table-column prop="dutyLevelTopName" label="职等上限"></el-table-column>
                                <el-table-column prop="remark" label="描述说明"></el-table-column>
                            </el-table>
                            <el-pagination layout="total, prev, pager, next" :total="dutyListPage.totalCount" @current-change="dutyList"></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                
            </el-tabs>
            <!--职务管理-导入-->
            <el-dialog title="导入职务" :visible.sync="dutyImportShow" size="tiny">
                <el-upload class="upload-demo" :action="dutyImportUrl" :on-success="dutyImportSubmit" :data="dutyImportParam">
                    <el-button type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传指定模版文件，如果没有模版文件请点击<el-button type="text" @click="dutyTemplate">下载模版</el-button>填充后上传</div>
                </el-upload>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dutyImportShow = false">取消</el-button>
                </span>
            </el-dialog>
            <!--职位管理-导入-->
            <el-dialog title="导入职位" :visible.sync="postImportShow" size="tiny">
                <el-upload class="upload-demo" :action="postImportUrl" :on-success="postImportSubmit" :data="postImportParam">
                    <el-button type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传指定模版文件，如果没有模版文件请点击<el-button type="text" @click="postTemplate">下载模版</el-button>填充后上传</div>
                </el-upload>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="postImportShow = false">取消</el-button>
                </span>
            </el-dialog>

            <!--职务管理-新建-->
            <el-dialog title="新增职务" :visible.sync="dutyAddShow" size="tiny">
                <el-form label-width="100px" :model="dutyForm" ref="adddutyForm" :rules="dutyFormRules">
                    <el-form-item label="职务名称" prop="dutyname">
                        <el-input v-model="dutyForm.dutyname" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="职务类型" prop="dutyTypeId">
                        <el-select v-model="dutyForm.dutyTypeId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyTypeData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职等上限" prop="dutyLevelTopId">
                        <el-select v-model="dutyForm.dutyLevelTopId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyLevelData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职等下限" prop="dutyLevelBottomId">
                        <el-select v-model="dutyForm.dutyLevelBottomId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyLevelData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务序号" prop="dutyNo">
                        <el-input v-model="dutyForm.dutyNo" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述说明" prop="remark">
                        <el-input v-model="dutyForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyAddShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyAddSubmit('adddutyForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职务管理-编辑-->
            <el-dialog title="编辑职务" :visible.sync="dutyEditShow" size="tiny">
                <el-form label-width="100px" :model="dutyForm" ref="editdutyForm" :rules="dutyFormRules">
                    <el-form-item label="职务名称" prop="dutyname">
                        <el-input v-model="dutyForm.dutyname" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="职务类型" prop="dutyTypeId">
                        <el-select v-model="dutyForm.dutyTypeId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyTypeData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职等上限" prop="dutyLevelTopId">
                        <el-select v-model="dutyForm.dutyLevelTopId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyLevelData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职等下限" prop="dutyLevelBottomId">
                        <el-select v-model="dutyForm.dutyLevelBottomId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyLevelData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务序号" prop="dutyNo">
                        <el-input v-model="dutyForm.dutyNo" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述说明" prop="remark">
                        <el-input v-model="dutyForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyEditShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyEditSubmit('editdutyForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职务管理-职务维护-基础数据-->
            <el-dialog title="基础数据管理" :visible.sync="dutyBasisShow" size="tiny">
                <el-tabs v-model="dutyBasisTab" type="card">
                    <el-tab-pane label="职务类型" name="0">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav"><i class="el-icon-plus" @click="dutyTypeAddShow = true;dutyTypeForm.name = ''"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item" v-for="item in dutyTypeData">
                                    {{item.name}}
                                    <div class="hrm_msg_icon">
                                        <i class="el-icon-edit" @click="dutyTypeEdit(item.name,item.id)"></i>
                                        <i class="el-icon-delete" @click="dutyTypeDel(item.id)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="职务等级" name="1">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav"><i class="el-icon-plus" @click="dutyLevelAddShow = true;dutyLevelForm.name = ''"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item" v-for="item in dutyLevelData">
                                    {{item.name}}
                                    <div class="hrm_msg_icon">
                                        <i class="el-icon-edit" @click="dutyLevelEdit(item.name,item.id)"></i>
                                        <i class="el-icon-delete" @click="dutyLevelDel(item.id)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
            <el-dialog title="新增职务类型" :visible.sync="dutyTypeAddShow" size="tiny">
                <el-form label-width="100px" :model="dutyTypeForm" :ref="dutyTypeForm" :rules="dutyTypeFormRules">
                    <el-form-item label="职务类型" prop="name">
                        <el-input v-model="dutyTypeForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyTypeAddShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyTypeAdd(dutyTypeForm)">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="编辑职务类型" :visible.sync="dutyTypeEditShow" size="tiny">
                <el-form label-width="100px" :model="dutyTypeForm" :ref="dutyTypeForm" :rules="dutyTypeFormRules">
                    <el-form-item label="职务类型" prop="name">
                        <el-input v-model="dutyTypeForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyTypeEditShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyTypeEditSubmit(dutyTypeForm)">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="新增职务等级" :visible.sync="dutyLevelAddShow" size="tiny">
                <el-form label-width="100px" :model="dutyLevelForm" ref="adddutyLevelForm" :rules="dutyLevelFormRules">
                    <el-form-item label="职务等级" prop="name">
                        <el-input v-model="dutyLevelForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyLevelAddShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyLevelAdd('adddutyLevelForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="编辑职务等级" :visible.sync="dutyLevelEditShow" size="tiny">
                <el-form label-width="100px" :model="dutyLevelForm" ref="editdutyLevelForm" :rules="dutyLevelFormRules">
                    <el-form-item label="职务等级" prop="name">
                        <el-input v-model="dutyLevelForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyLevelEditShow = false">取消</el-button>
                        <el-button type="primary" @click="dutyLevelEditSubmit('editdutyLevelForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职务维护-查看-->
            <el-dialog title="查看职务" :visible.sync="dutyPopShow" size="tiny" v-if="dutyPopNum==1">
                <div class="hrm_msg">
                    <div class="hrm_msg_nav">职务信息<i class="el-icon-edit" @click="dutyEdit(dutyCheckboxObj)"></i></div>
                    <div class="hrm_msg_con">
                        <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>职务名称：{{dutyCheckboxObj.name}}</span></div>
                        <div class="hrm_msg_item"><span>职务类型：{{dutyCheckboxObj.dutyTypeName}}</span></div>
                        <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>职等下限：{{dutyCheckboxObj.dutyLevelBottomName}}</span></div>
                        <div class="hrm_msg_item"><span>职等上限：{{dutyCheckboxObj.dutyLevelTopName}}</span></div>
                        <div class="hrm_msg_item"><span>描述说明：{{dutyCheckboxObj.remark}}</span></div>
                    </div>
                </div>
                <el-tabs v-model="dutyCheckActive" type="card" @tab-click="dutyTabClickForm">
                    <el-tab-pane label="员工列表" name="0">
                        <el-table border :data="dutyUserListData"  >
                            <el-table-column prop="deptName" label="所属部门"></el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="certificateNo" label="证件号码" width="200"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :total="dutyUserListPage.totalCount" @current-change="dutyUserList"></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="职务说明" name="1">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav">职务说明<i class="el-icon-edit" @click="dutyExplainEdit(dutyExplainData)"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item">
                                    职责范围：<span>{{dutyExplainData.dutyScope}}</span></br>
                                    任职要求：<span>{{dutyExplainData.dutyRequire}}</span></br>
                                    补充说明：<span>{{dutyExplainData.extraRemark}}</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="能力要求" name="2">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav">能力素质<i class="el-icon-plus" @click="dutyCapacityAdd"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item" v-for="list in dutyCapacityListData">
                                    能力素质：<span>{{list.quality}}</span>
                                    <div class="hrm_msg_icon"><i class="el-icon-edit" @click="dutyCapacityEdit(list)"></i><i class="el-icon-delete"
                                            @click="dutyCapacityDel(list.id)"></i></div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="附件列表" name="3">
                         <file-upload :param="dutyParam" @fileId="dutyFileId"></file-upload>
                        <el-table border :data="dutyFileListData"  >
                            <el-table-column prop="fileName" label="附件名称"></el-table-column>
                            <el-table-column prop="url" label="操作">
                                <template scope="scope">
                                    <el-button type="text" @click="fileDownload(scope.row.id)">下载</el-button>
                                    <el-button type="text" @click="dutyFileDel(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :total="dutyFileListPage.totalCount" @current-change="dutyFileList"></el-pagination>
                    </el-tab-pane>
                </el-tabs>
                <div class="hrm_mgt20 clearfix">
                    <el-button class="f_r" @click="dutyPopShow=fasle">关闭</el-button>
                </div>
            </el-dialog>
            <!--职位管理-职位说明-编辑-->
            <el-dialog title="编辑职位说明" :visible.sync="dutyPopShow" size="tiny" v-if="dutyPopNumSecond==201">
                <el-form label-width="80px" :model="dutyExplainForm" :ref="dutyExplainForm">
                    <el-form-item label="职责范围">
                        <el-input type="textarea" :rows="2" v-model="dutyExplainForm.dutyScope"></el-input>
                    </el-form-item>
                    <el-form-item label="任职要求">
                        <el-input type="textarea" :rows="2" v-model="dutyExplainForm.dutyRequire"></el-input>
                    </el-form-item>
                    <el-form-item label="补充说明">
                        <el-input type="textarea" :rows="2" v-model="dutyExplainForm.extraRemark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dutyPopNumSecond = -1">取消</el-button>
                        <el-button type="primary" @click="dutyExplainSubmit()">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职位管理-能力要求-编辑-->
            <el-dialog title="新增能力素质" :visible.sync="dutyCapacityAddShow" size="tiny">
                <el-form :rules="dutyCapacityRules" :model="dutyCapacityForm" :ref="dutyCapacityForm" label-width="100px">
                    <el-form-item label="能力素质" prop="quality">
                        <el-input v-model="dutyCapacityForm.quality"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dutyCapacityAddSubmit(dutyCapacityForm)">确定</el-button>
                        <el-button @click="dutyCapacityAddShow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="编辑能力素质" :visible.sync="dutyCapacityEditShow" size="tiny">
                <el-form :rules="dutyCapacityRules" :model="dutyCapacityForm" :ref="dutyCapacityForm" label-width="100px">
                    <el-form-item label="能力素质" prop="quality">
                        <el-input v-model="dutyCapacityForm.quality"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dutyCapacityEditSubmit(dutyCapacityForm,dutyCapacityForm.id)">确定</el-button>
                        <el-button @click="dutyCapacityEditShow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职位管理-职位维护-新建-->
            <el-dialog title="新增职位" :visible.sync="postAddShow" size="tiny">
                <el-form label-width="100px" :model="postForm" ref="postForm" :rules="postFormRules">
                    <el-form-item label="职位名称" prop="name">
                        <el-input v-model="postForm.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门" prop="deptId">
                        <tree-component
                         @treeAssign="postFormTreeAssign"
                        :tree-btn-name="postFormBtnName"
                        :tree-support-select="true"
                        :tree-type='1'
                        ref="AddtreeParent"
                            ></tree-component>
                    </el-form-item>
                    <el-form-item label="所属职务" prop="dutyId">
                        <el-select v-model="postForm.dutyId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyListData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位序号" prop="positionNo">
                        <el-input v-model="postForm.positionNo" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述说明" prop="remark">
                        <el-input v-model="postForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="postAddShow = false">取消</el-button>
                        <el-button type="primary" @click="postAddSubmit('postForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职位管理-职位维护-编辑-->
            <el-dialog title="编辑职位" :visible.sync="postEditShow" size="tiny">
                <el-form label-width="100px" :model="postForm" :ref="postForm" :rules="postFormRules">
                    <el-form-item label="职位名称" prop="name">
                        <el-input v-model="postForm.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门" prop="deptId">
                         <tree-component @treeAssign="postFormTreeAssign" :tree-btn-name="postFormBtnName" :tree-support-select="true" :tree-type='1'
                            :tree-select-data="treeSelectData" ref="treeParent"></tree-component>
                    </el-form-item>
                    <el-form-item label="所属职务" prop="dutyId">
                        <el-select v-model="postForm.dutyId" placeholder="请选择" style="width: 200px;">
                            <el-option v-for="item in dutyListData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位序号" prop="positionNo">
                        <el-input v-model="postForm.positionNo" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="描述说明" prop="remark">
                        <el-input v-model="postForm.remark" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="postEditShow = false">取消</el-button>
                        <el-button type="primary" @click="postEditSubmit(postForm)">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!--职位维护-查看-->
            <el-dialog title="查看职位" :visible.sync="postPopShow" size="tiny" v-if="postPopNum==1">
                <div class="hrm_msg">
                    <div class="hrm_msg_nav">职位信息<i class="el-icon-edit" @click="postEdit(checkboxObj)"></i></div>
                    <div class="hrm_msg_con">
                        <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>职位名称：{{checkboxObj.name}}</span></div>
                        <div class="hrm_msg_item"><span>所属组织：{{checkboxObj.deptName}}</span></div>
                        <div class="hrm_msg_item" style="width: 50%;float: left;padding: 0;"><span>所属职务：{{checkboxObj.dutyName}}</span></div>
                        <div class="hrm_msg_item"><span>职位序号：{{checkboxObj.positionNo}}</span></div>
                        <div class="hrm_msg_item"><span>描述说明：{{checkboxObj.remark}}</span></div>
                    </div>
                </div>
                <el-tabs v-model="postCheckActive" type="card" @tab-click="postTabClickForm">
                    <el-tab-pane label="员工列表" name="0">
                        <el-table border :data="postUserListData"  >
                            <el-table-column prop="deptName" label="所属部门"></el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="certificateNo" label="证件号码"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :total="postUserListPage.totalCount" @current-change="postUserList"></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="职位说明" name="1">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav">职位说明<i class="el-icon-edit" @click="postExplainEdit(postExplainData)"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item">
                                    职责范围：<span>{{postExplainData.positionScope}}</span></br>
                                    任职要求：<span>{{postExplainData.positionRequire}}</span></br>
                                    补充说明：<span>{{postExplainData.extraRemark}}</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="能力要求" name="2">
                        <div class="hrm_msg">
                            <div class="hrm_msg_nav">能力素质<i class="el-icon-plus" @click="postCapacityAdd"></i></div>
                            <div class="hrm_msg_con">
                                <div class="hrm_msg_item" v-for="list in postCapacityListData">
                                    能力素质：<span>{{list.itemName}}</span>
                                    <div class="hrm_msg_icon"><i class="el-icon-edit" @click="postCapacityEdit(list)"></i><i class="el-icon-delete"
                                            @click="postCapacityDel(list.id)"></i></div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="附件列表" name="3">
                        <file-upload :param="postParam" @fileId="postFileId"></file-upload>
                        <el-table border :data="postFileListData"  >
                            <el-table-column prop="fileName" label="附件名称"></el-table-column>
                            <el-table-column prop="url" label="操作">
                                <template scope="scope">
                                    <el-button type="text" @click="fileDownload(scope.row.id)">下载</el-button>
                                    <el-button type="text" @click="postFileDel(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination small layout="total, prev, pager, next" :total="postFileListPage.totalCount" @current-change="postFileList"></el-pagination>
                    </el-tab-pane>
                </el-tabs>
                <div class="hrm_mgt20 clearfix">
                                        <el-button class="f_r" @click="postPopShow=fasle">关闭</el-button>
                </div>
            </el-dialog>
            <!--职位管理-职位维护-职位说明-编辑-->
            <el-dialog title="编辑职位说明" :visible.sync="postPopShow" size="tiny" v-if="postPopNumSecond==201">
                <el-form label-width="80px" :model="postExplainForm" :ref="postExplainForm">
                    <el-form-item label="职责范围">
                        <el-input type="textarea" :rows="2" v-model="postExplainForm.positionScope"></el-input>
                    </el-form-item>
                    <el-form-item label="任职要求">
                        <el-input type="textarea" :rows="2" v-model="postExplainForm.positionRequire"></el-input>
                    </el-form-item>
                    <el-form-item label="补充说明">
                        <el-input type="textarea" :rows="2" v-model="postExplainForm.extraRemark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="postPopNumSecond = -1">取消</el-button>
                        <el-button type="primary" @click="postExplainSubmit()">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--职位管理-职位维护-能力要求-编辑-->
            <el-dialog title="新增能力素质" :visible.sync="postCapacityAddShow" size="tiny">
                <el-form :rules="postCapacityRules" :model="postCapacityForm" :ref="postCapacityForm" label-width="100px">
                    <el-form-item label="能力素质" prop="itemName">
                        <el-input v-model="postCapacityForm.itemName"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="postCapacityAddSubmit(postCapacityForm)">确定</el-button>
                        <el-button @click="postCapacityAddShow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="编辑能力素质" :visible.sync="postCapacityEditShow" size="tiny">
                <el-form :rules="postCapacityRules" :model="postCapacityForm" :ref="postCapacityForm" label-width="100px">
                    <el-form-item label="能力素质" prop="itemName">
                        <el-input v-model="postCapacityForm.itemName"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="postCapacityEditSubmit(postCapacityForm,postCapacityForm.id)">确定</el-button>
                        <el-button @click="postCapacityEditShow = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            

            <!--<popup-component :dutyPopShow="dutyPopShow" :popNum="popNum" @dutyPopShowChange="dutyPopShowChange" :dutyCheckboxObj="dutyCheckboxObj"></popup-component>-->
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
                postFormBtnName: '请选择部门',
                dutyListData: [], //职务维护list
                dutyListPage: {}, //职务维护page
                dutyAddShow: false,
                dutyEditShow: false,
                dutyForm: {
                    dutyname: '',
                    dutyTypeId: '',
                    dutyLevelTopId: '',
                    dutyLevelBottomId: '',
                    dutyNo: '',
                    remark: '',
                },
                dutyFormRules: {
                    dutyname: [{ required: true, message: '请输入职务名称' }],
                    dutyTypeId: [{ required: true, message: '请输入职务类型' }],
                    dutyLevelTopId: [{ required: true, message: '请输入职等上限' }],
                    dutyLevelBottomId: [{ required: true, message: '请输入职等下限' }],
                    dutyNo: [
                        { pattern: /^\d{1,6}$/, message: '只能输入1-6位数字' }
                    ],
                    remark: [{ max: 64, message: '长度最多64个字符' }],
                },
                dutyTypeData: [],
                dutyLevelData: [],
                dutyBasisShow: false,
                dutyBasisTab: '0',

                dutyTypeAddShow: false,
                dutyTypeEditShow: false,
                dutyTypeForm: {
                    id: '',
                    name: '',
                },
                dutyTypeFormRules: {
                    name: [{ required: true, message: '请输入职务类型' }],
                },
                dutyLevelAddShow: false,
                dutyLevelEditShow: false,
                dutyLevelForm: {
                    id: '',
                    name: '',
                },
                dutyLevelFormRules: {
                    name: [{ required: true, message: '请输入职务等级' }],
                },
                // 职务维护
                dutyUserListData: [],
                dutyUserListPage: {},
                dutyExplainData: Object,
                dutyQualificationData: Object,

                dutyExplainForm: Object,
                dutyQualificationForm: Object,

                // dutyTypeData: Array,
                // dutyLevelData: Array,

                dutyCheckActive: '0',

                dutyActiveName: '0', //切换tab
                dutyPopShow: false, //是否显示弹框
                dutyPopNum: 0, //弹框序号
                dutyCheckboxObj: {}, //checkbox指定项数据
                dutyCheckboxArr: [], //checkbox数组
                dutyFileListData: [], // 附件列表
                dutyPopNumSecond: -1, // 二级弹窗

                postListData: [], //职位维护list
                postListPage: {}, //职位维护page
                postAddShow: false,
                postEditShow: false,
                postForm: {
                    name: "",
                    deptId: "",
                    dutyId: "",
                    positionNo: "",
                    remark: "",
                },
                postFormRules: {
                    name: [
                        { required: true, message: '请输入职位名称' },
                        { max: 64, message: '长度最多64个字符' }
                    ],
                    deptId: [{ required: true, message: '请选择所属部门' }],
                    dutyId: [],
                    positionNo: [{ pattern: /^\d{1,6}$/, message: '只能输入1-6位数字' }],
                    remark: [{ max: 64, message: '长度最多64个字符' }],
                },

                // 职位维护
                postUserListData: [],
                postUserListPage: {},
                postExplainData: Object,
                postQualificationData: Object,

                postExplainForm: Object,
                postQualificationForm: Object,

                postCheckActive: '0',


                // 公共
                postActiveName: '1', //切换tab
                postPopShow: false, //是否显示弹框
                postPopNum: 0, //弹框序号
                checkboxObj: {}, //checkbox指定项数据
                checkboxArr: [], //checkbox数组
                postPopNumSecond: -1, // 二级弹窗
                

                dutyImportShow: false,
                dutyImportParam: {},
                dutyImportUrl: Util.dutyImportUrl,

                postImportShow: false,
                postImportParam: {},
                postImportUrl: Util.postImportUrl,

                dutyCapacityForm: {
                    quality: '',
                },
                dutyCapacityRules: {
                    quality: [{ required: true, message: '请输入能力要求' },],
                },
                dutyCapacityListData: [],
                dutyCapacityAddShow: false,
                dutyCapacityEditShow: false,

                postCapacityForm: {
                    itemName: '',
                },
                postCapacityRules: {
                    itemName: [{ required: true, message: '请输入能力要求' },],
                },
                postCapacityListData: [],
                postCapacityAddShow: false,
                postCapacityEditShow: false,

                deptImportShow: false,
                deptImportParam: {},
                deptImportUrl: Util.deptImportUrl,

                // postImportShow: false,
                // postImportParam: {},
                // postImportUrl: Util.postImportUrl,

                // dutyFileListData: [],
                dutyFileListPage: {},
                dutyParam: {
                    businessId: 2,
                    fId: ''
                },

                postFileListData: [],
                postFileListPage: {},
                postParam: {
                    businessId: 3,
                    fId: ''
                },

                dutyCheckboxNum: '',
                postCheckboxNum: '',

                
            }
        },
        mounted: function () {
            this.dutyList();
            this.postList();

            this.dutyUploadAssign('dutyManage/importDutyData');
            this.postUploadAssign('positionManage/importPositionData');

        },
        methods: {
             // 附件
            dutyFileId(id){
                this.dutyFileList();
            },
            dutyFileList(pageNum){
                var self = this;
                var method = 'fileUpload/getFileInfoList',
                    param = JSON.stringify({
                        businessId: 2,
                        fId: self.dutyParam.fId,
                        isTemplate: 2,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                    }),
                    succeed = function (res) {
                        self.dutyFileListData = res.data.data.fileInfoList;
                        self.dutyFileListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            dutyFileDel(id){
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
                        self.dutyFileList()
                    };
                this.$http(method, param, succeed);
            },
            // 附件
            postFileId(id){
                this.postFileList();
            },
            postFileList(pageNum){
                var self = this;
                var method = 'fileUpload/getFileInfoList',
                    param = JSON.stringify({
                        businessId: 3,
                        fId: self.postParam.fId,
                        isTemplate: 2,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                    }),
                    succeed = function (res) {
                        self.postFileListData = res.data.data.fileInfoList;
                        self.postFileListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            postFileDel(id){
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
                        self.postFileList()
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
// 树
            postFormTreeAssign: function (v) {
                this.postForm.deptId = v[0]
            },
            

            // 职务维护
            dutyList: function (pageNum) {
                var self = this;
                var method = 'dutyManage/getDutyListByParams',
                    param = JSON.stringify({
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10
                    }),
                    succeed = function (res) {
                        self.dutyListData = res.data.data.result;
                        self.dutyListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 职务管理表格行点击事件
            dutyCheckListRow: function (row, event, column) {
                this.dutyToggleSelection([row]);
            },
            dutyToggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.dutyTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.dutyTable.clearSelection();
                }
            },
            // 表格多选框change事件
            dutyCheckList: function (selection, row) {
                this.dutyCheckboxNum = selection.length;
                if (selection.length > 0) {
                    this.dutyCheckboxObj = selection[0];
                    this.dutyCheckboxArr = selection;
                    this.dutyParam.fId = selection[0].id;
                }
            }, 
            // get职务类型
            dutyTypeGet() {
                var self = this;
                var method = 'dutyManage/getDutyLevelListByParams',
                    param = JSON.stringify({
                        type: 1,
                    }),
                    succeed = function (res) {
                        self.dutyTypeData = res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            // get职务等级
            dutyLevelGet() {
                var self = this;
                var method = 'dutyManage/getDutyLevelListByParams',
                    param = JSON.stringify({
                        type: 2,
                    }),
                    succeed = function (res) {
                        self.dutyLevelData = res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            // 新增
            dutyAdd: function () {
                this.dutyTypeGet();
                this.dutyLevelGet();
                this.dutyAddShow = true;

                this.dutyForm.dutyname = "";
                this.dutyForm.dutyTypeId = "";
                this.dutyForm.dutyLevelTopId = "";
                this.dutyForm.dutyLevelBottomId = "";
                this.dutyForm.dutyNo = "";
                this.dutyForm.remark = "";
            },
            // 职务维护-新增
            dutyAddSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/addDutyInfo',
                            param = JSON.stringify({
                                duty: {
                                    "name": self.dutyForm.dutyname,
                                    "dutyTypeId": self.dutyForm.dutyTypeId,
                                    "remark": self.dutyForm.remark,
                                    "dutyLevelBottomId": self.dutyForm.dutyLevelBottomId,
                                    "dutyLevelTopId": self.dutyForm.dutyLevelTopId,
                                    "dutyNo": self.dutyForm.dutyNo,
                                    "companyId": 139353
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增数据成功!',
                                    type: 'success'
                                });
                                self.dutyAddShow = false;
                                self.dutyList();
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 编辑
            dutyEdit: function (obj) {
                this.dutyTypeGet();
                this.dutyLevelGet();
                this.dutyEditShow = true;

                this.dutyForm.dutyname = obj.name;
                this.dutyForm.dutyTypeId = obj.dutyTypeId;
                this.dutyForm.dutyLevelTopId = obj.dutyLevelTopId;
                this.dutyForm.dutyLevelBottomId = obj.dutyLevelBottomId;
                this.dutyForm.dutyNo = obj.dutyNo;
                this.dutyForm.remark = obj.remark;

                console.log(obj)
            },
            // 职务维护-编辑
            dutyEditSubmit: function (formName) {
                var self = this;
                console.log(self.dutyCheckboxObj.id)
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/updateDutyInfo',
                            param = JSON.stringify({
                                duty: {
                                    "id": self.dutyCheckboxObj.id,
                                    "name": self.dutyForm.dutyname,
                                    "dutyTypeId": self.dutyForm.dutyTypeId,
                                    "remark": self.dutyForm.remark,
                                    "dutyLevelBottomId": self.dutyForm.dutyLevelBottomId,
                                    "dutyLevelTopId": self.dutyForm.dutyLevelTopId,
                                    "dutyNo": self.dutyForm.dutyNo,
                                    "companyId": 139353
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改数据成功!',
                                    type: 'success'
                                });
                                self.dutyEditShow = false;
                                self.dutyPopShow = false;
                                self.dutyList();
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },

            // 删除
            dutyDel: function () {
                if (this.dutyCheckboxArr.length == 0) {
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
                    for (var i = 0; i < self.dutyCheckboxArr.length; i++) {
                        arr.push(self.dutyCheckboxArr[i].id)
                    }
                    var method = 'dutyManage/delDutyInfo',
                        param = JSON.stringify({
                            id: arr.join(','),
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.dutyList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 查看
            dutyPopShowClick(id) {
                console.log()
                if (this.dutyCheckboxArr.length != 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.dutyUserList()
                this.dutyPopShow = true;
                this.dutyPopNum = id;
                this.dutyCheckActive = '0';

            },
            // 职务维护-查看-tab切换
            dutyTabClickForm: function (tab) {
                switch (tab.index) {
                    case '0':
                        // 员工列表
                        this.dutyUserList()
                        break;
                    case '1':
                        // 职位说明
                        this.dutyExplain()
                        break;
                    case '2':
                        // 任职资格
                        // this.dutyQualification()
                        this.dutyCapacityList()

                        break;
                    case '3':
                        // 附件列表
                        this.dutyFileList()
                        break;
                }
            },
            // 职务维护-员工列表
            dutyUserList: function (pageNum) {
                var self = this;
                var method = 'user/getUsers',
                    param = JSON.stringify({
                        dutyId: self.dutyCheckboxObj.id,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10
                    }),
                    succeed = function (res) {
                        self.dutyUserListData = res.data.data.users;
                        self.dutyUserListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 职务维护-职务说明
            dutyExplain: function () {
                var self = this;
                var method = 'dutyManage/getCompanyDutyInfoById',
                    param = JSON.stringify({
                        id: self.dutyCheckboxObj.id
                    }),
                    succeed = function (res) {
                        self.dutyExplainData = res.data.data
                    };
                this.$http(method, param, succeed);
            },
            // 职务维护-职务说明-编辑
            dutyExplainEdit: function (obj) {
                this.dutyExplainForm = {
                    dutyScope: obj.dutyScope,
                    dutyRequire: obj.dutyRequire,
                    extraRemark: obj.extraRemark,
                }
                this.dutyPopNumSecond = 201;
            },
            dutyExplainSubmit: function () {
                var self = this;
                var method = 'dutyManage/updateDutyInfo',
                    param = JSON.stringify({
                        duty: {
                            id: self.dutyCheckboxObj.id,
                            dutyScope: self.dutyExplainForm.dutyScope,
                            dutyRequire: self.dutyExplainForm.dutyRequire,
                            extraRemark: self.dutyExplainForm.extraRemark,
                        },
                        type: '2',
                    }),
                    succeed = function (res) {
                        self.$message({
                            message: '修改成功!',
                            type: 'success'
                        });
                        self.dutyExplain()
                        self.dutyPopNumSecond = -1 // 二级弹窗
                    };
                this.$http(method, param, succeed);
            },
            // 基础数据
            dutyBasis: function () {
                this.dutyTypeGet();
                this.dutyLevelGet();
                this.dutyBasisShow = true;
            },
            dutyTypeAdd: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/addDutyLevel',
                            param = JSON.stringify({
                                dutyLevel: {
                                    name: self.dutyTypeForm.name,
                                    type: 1,
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增数据成功!',
                                    type: 'success'
                                });
                                self.dutyTypeAddShow = false;
                                self.dutyTypeGet();
                                self.dutyTypeForm.name = ''
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            dutyTypeEdit: function (name, id) {
                this.dutyTypeForm.name = name;
                this.dutyTypeForm.id = id;
                this.dutyTypeEditShow = true;
            },
            dutyTypeEditSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/updateDutyLevel',
                            param = JSON.stringify({
                                dutyLevel: {
                                    id: self.dutyTypeForm.id,
                                    name: self.dutyTypeForm.name,
                                    type: 1,
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改数据成功!',
                                    type: 'success'
                                });
                                self.dutyTypeEditShow = false;
                                self.dutyTypeGet();
                                self.dutyTypeForm.name = ''
                                self.dutyTypeForm.id = ''
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            dutyTypeDel: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'dutyManage/delDutyLevel',
                        param = JSON.stringify({
                            id: id,
                            companyId: 139353,
                            type: 1
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.dutyTypeGet();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 职务等级
            dutyLevelAdd: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/addDutyLevel',
                            param = JSON.stringify({
                                dutyLevel: {
                                    name: self.dutyLevelForm.name,
                                    type: 2,
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增数据成功!',
                                    type: 'success'
                                });
                                self.dutyLevelAddShow = false;
                                self.dutyLevelGet();
                                self.dutyLevelForm.name = ''
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            dutyLevelEdit: function (name, id) {
                this.dutyLevelForm.name = name;
                this.dutyLevelForm.id = id;
                this.dutyLevelEditShow = true;
            },
            dutyLevelEditSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/updateDutyLevel',
                            param = JSON.stringify({
                                dutyLevel: {
                                    id: self.dutyLevelForm.id,
                                    name: self.dutyLevelForm.name,
                                    type: 2,
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改数据成功!',
                                    type: 'success'
                                });
                                self.dutyLevelEditShow = false;
                                self.dutyLevelGet();
                                self.dutyLevelForm.name = ''
                                self.dutyLevelForm.id = ''
                                self.$refs[formName].resetFields();

                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            dutyLevelDel: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'dutyManage/delDutyLevel',
                        param = JSON.stringify({
                            id: id,
                            companyId: 139353,
                            type: 2
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.dutyLevelGet();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 职位维护
            postList: function (pageNum) {
                var self = this;
                var method = 'positionManage/getPositionInfoListByParams',
                    param = JSON.stringify({
                        userId: 62607,
                        companyId: 139353,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10
                    }),
                    succeed = function (res) {
                        self.postListData = res.data.data.result;
                        self.postListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            
            // 职位管理表格行点击事件
            postCheckListRow: function (row, event, column) {
                this.postToggleSelection([row]);
            },
            postToggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.postTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.postTable.clearSelection();
                }
            },
            // 表格多选框change事件
            postCheckList: function (selection, row) {
                this.postCheckboxNum = selection.length;
                if (selection.length > 0) {
                    this.checkboxObj = selection[0];
                    this.checkboxArr = selection;
                    this.postParam.fId = selection[0].id;
                }
            }, 
            // tree回调赋值
            postTreeArr: function (v) {
                this.postForm.deptId = v[0];

            },
            // get职务列表
            dutyListGet: function () {
                var self = this;
                var method = 'dutyManage/getDutyListByParams',
                    param = JSON.stringify({
                        companyId: 139353,
                    }),
                    succeed = function (res) {
                        console.log(res.data.data.result)
                        self.dutyListData =res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            // 新增
            postAdd: function () {
                this.dutyListGet();
                this.postAddShow = true;


                // 延迟回调更新部门
                this.$nextTick(function () {
                    // this.$refs['postForm'].resetFields();
                });
                this.postForm.name = "";
                // this.postForm.deptId = "";
                this.postForm.dutyId = "";
                this.postForm.positionNo = "";
                this.postForm.remark = "";
                this.postFormBtnName="请选择部门";
            },
            // 职位维护-新增
            postAddSubmit: function (formName) {
                var self = this;
                console.log(self.postForm.deptId);
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'positionManage/addPositionInfo',
                            param = JSON.stringify({
                                position: {
                                    "name": self.postForm.name,
                                    "deptId": self.postForm.deptId,
                                    "dutyId": parseInt(self.postForm.dutyId),
                                    "positionNo": self.postForm.positionNo,
                                    "remark": self.postForm.remark,
                                    "companyId": 139353
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增数据成功!',
                                    type: 'success'
                                });
                                self.postAddShow = false;
                                self.postList();
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            // 编辑
            postEdit: function (obj) {
                this.dutyListGet();
                this.postEditShow = true;

                this.treeSelectData.keys.push(obj.deptId);
                this.treeSelectData.names = obj.deptName;

                // 延迟回调更新部门
                this.$nextTick(function () {
                    this.$refs.treeParent.setChecked();
                });

                this.postForm.name = obj.name;
                this.postForm.deptId = obj.deptId;
                this.postForm.dutyId = obj.dutyId;
                this.postForm.positionNo = obj.positionNo;
                this.postForm.remark = obj.remark;

            },
            // 职位维护-编辑
            postEditSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'positionManage/updatePositionInfo',
                            param = JSON.stringify({
                                position: {
                                    id: self.checkboxObj.id,
                                    name: self.postForm.name,
                                    deptId: self.postForm.deptId,
                                    dutyId: self.postForm.dutyId,
                                    positionNo: self.postForm.positionNo,
                                    remark: self.postForm.remark,
                                    companyId: 139353
                                },
                                type: '2',
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '新增数据成功!',
                                    type: 'success'
                                });
                                self.postEditShow = false;
                                self.postPopShow = false;
                                self.postList();
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },

            // 删除
            postDel: function () {
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
                    var method = 'positionManage/delPositionInfo',
                        param = JSON.stringify({
                            id: arr.join(','),
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.postList();
                        };
                    this.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 查看
            postPopShowClick(id) {
                if (this.checkboxArr.length != 1) {
                    this.$message({
                        message: '请选择一条数据进行操作',
                        type: 'warning'
                    });
                    return false;
                }
                this.postUserList()
                this.postPopShow = true;
                this.postPopNum = id;
                this.postCheckActive = '0';

            },
            // 职位维护-查看-tab切换
            postTabClickForm: function (tab) {
                switch (tab.index) {
                    case '0':
                        // 员工列表
                        this.postUserList()
                        break;
                    case '1':
                        // 职位说明
                        this.postExplain()
                        break;
                    case '2':
                        // 任职资格
                        this.postCapacityList()
                        break;
                    case '3':
                        // 附件列表
                        this.postFileList()
                        break;
                }
            },
            // 职位维护-员工列表
            postUserList: function (pageNum) {
                var self = this;
                var method = 'user/getUsers',
                    param = JSON.stringify({
                        positionId: self.checkboxObj.id,
                        pageNum: pageNum ? pageNum : 1,
                        pageSize: 10,
                    }),
                    succeed = function (res) {
                        self.postUserListData = res.data.data.users;
                        self.postUserListPage = res.data.data.page;
                    };
                this.$http(method, param, succeed);
            },
            // 职位维护-职位说明
            postExplain: function () {
                var self = this;
                var method = 'positionManage/getCompanyPositionInfoById',
                    param = JSON.stringify({
                        companyId: 139353,
                        id: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.postExplainData = res.data.data
                    };
                this.$http(method, param, succeed);
            },
            // 职位维护-能力要求
            postQualification: function () {
                var self = this;
                var method = 'positionManage/getWorkQualificationListByParams',
                    param = JSON.stringify({
                        companyId: 139353,
                        positionId: self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.postQualificationData = res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            
            // 职位维护-职位说明-编辑
            postExplainEdit: function (obj) {
                this.postExplainForm = {
                    positionScope: obj.positionScope,
                    positionRequire: obj.positionRequire,
                    extraRemark: obj.extraRemark,
                }
                this.postPopNumSecond = 201;
            },
            postExplainSubmit: function () {
                var self = this;
                var method = 'positionManage/updatePositionInfo',
                    param = JSON.stringify({
                        position: {
                            id: self.checkboxObj.id,
                            positionScope: self.postExplainForm.positionScope,
                            positionRequire: self.postExplainForm.positionRequire,
                            extraRemark: self.postExplainForm.extraRemark,
                        },
                        type: "2",
                    }),
                    succeed = function (res) {
                        self.$message({
                            message: '修改成功!',
                            type: 'success'
                        });
                        self.postExplain()
                        self.postPopNumSecond = -1 // 二级弹窗
                    };
                this.$http(method, param, succeed);
            },
            // 附件
            dutyUploadAssign: function (method) {
                var param = JSON.stringify({
                    companyId: 61,
                })
                this.dutyImportParam = {
                    param: param,
                    sign: this.$md5(method, param)
                }
            },
            dutyImport: function () {
                this.dutyImportShow = true;
            },
            dutyImportSubmit: function (res) {
                this.dutyList();
                if (res.code == 0) {
                    this.dutyImportShow = false;
                    this.$message({
                        message: '导入职务数据成功!',
                        type: 'success'
                    });
                } else {
                    this.dutyImportShow = false;
                    this.$message({
                        message: '操作失败，原因：' + res.message,
                        type: 'error'
                    });
                }
            },
            postUploadAssign: function (method) {
                var param = JSON.stringify({
                    companyId: 61,
                })
                this.postImportParam = {
                    param: param,
                    sign: this.$md5(method, param)
                }
            },
            postImport: function () {
                this.postImportShow = true;
            },
            postImportSubmit: function (res) {
                this.postList();
                if (res.code == 0) {
                    this.postImportShow = false;
                    this.$message({
                        message: '导入职位数据成功!',
                        type: 'success'
                    });
                } else {
                    this.postImportShow = false;
                    this.$message({
                        message: '操作失败，原因：' + res.message,
                        type: 'error'
                    });
                }
            },
            // 职务维护-能力要求
            dutyCapacityList: function () {
                var self = this;
                var method = 'dutyManage/getAbilityRequireListByParams',
                    param = JSON.stringify({
                        "type": "1",
                        "pId": self.dutyCheckboxObj.id
                    }),
                    succeed = function (res) {
                        self.dutyCapacityListData = res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            dutyCapacityAdd: function () {
                this.dutyCapacityAddShow = true;

                this.dutyCapacityForm = {
                    quality: "",
                }
            },
            dutyCapacityAddSubmit: function (formName) {
                var self = this;
                console.log(self.dutyCheckboxObj.id)
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/addAbilityRequire',
                            param = JSON.stringify({
                                "abilityRequire": {
                                    "quality": self.dutyCapacityForm.quality,
                                    "type": "1",
                                    "pId": self.dutyCheckboxObj.id
                                },
                                "companyId": "61"
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.dutyCapacityList();
                                self.dutyCapacityAddShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            dutyCapacityEdit: function (obj) {
                this.dutyCapacityEditShow = true;

                this.dutyCapacityForm = {
                    id: obj.id,
                    quality: obj.quality,
                }
            },
            dutyCapacityEditSubmit: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'dutyManage/updateAbilityRequire',
                            param = JSON.stringify({
                                "abilityRequire": {
                                    "companyId": 9169505,
                                    "id": id,
                                    "pId": self.dutyCheckboxObj.id,
                                    "quality": self.dutyCapacityForm.quality,
                                    "type": 1,
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.dutyCapacityList();

                                self.dutyCapacityEditShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            dutyCapacityDel: function (id) {
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
                            self.dutyCapacityList();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 职位维护-能力要求
            postCapacityList: function () {
                var self = this;
                var method = 'positionManage/getWorkQualificationListByParams',
                    param = JSON.stringify({
                        "positionId": self.checkboxObj.id
                    }),
                    succeed = function (res) {
                        self.postCapacityListData = res.data.data.result;
                    };
                this.$http(method, param, succeed);
            },
            postCapacityAdd: function () {
                this.postCapacityAddShow = true;

                this.postCapacityForm = {
                    itemName: "",
                }
            },
            postCapacityAddSubmit: function (formName) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'positionManage/addWorkQualification',
                            param = JSON.stringify({
                                "workQualification": {
                                    "itemName": self.postCapacityForm.itemName,
                                    "positionId": self.checkboxObj.id
                                },
                                "companyId": "61"
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                });
                                self.postCapacityList();
                                self.postCapacityAddShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            postCapacityEdit: function (obj) {
                this.postCapacityEditShow = true;

                this.postCapacityForm = {
                    id: obj.id,
                    itemName: obj.itemName,
                }
            },
            postCapacityEditSubmit: function (formName, id) {
                var self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var method = 'positionManage/updateWorkQualification',
                            param = JSON.stringify({
                                "workQualification": {
                                    "companyId": 9169505,
                                    "id": id,
                                    "positionId": self.checkboxObj.id,
                                    "itemName": self.postCapacityForm.itemName,
                                }
                            }),
                            succeed = function (res) {
                                self.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                self.postCapacityList();

                                self.postCapacityEditShow = false;
                                self.$refs[formName].resetFields();
                            };
                        this.$http(method, param, succeed);
                    }
                });
            },
            postCapacityDel: function (id) {
                this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var self = this;
                    var method = 'positionManage/delWorkQualification',
                        param = JSON.stringify({
                            "id": id,
                        }),
                        succeed = function (res) {
                            self.$message({
                                message: '成功删除数据',
                                type: 'success'
                            });
                            self.postCapacityList();
                        };
                    self.$http(method, param, succeed);
                }).catch(() => {
                });
            },
            // 导出
            dutyExport: function () {
                var method = "dutyManage/exportDutyModelExcel",
                    param = JSON.stringify({
                        companyId: 61,
                        isExportData: "1",
                        modelType: "1",
                    });
                this.$exportOut(method, param)
            },
            postExport: function () {
                var method = "positionManage/exportPositionModelExcel",
                    param = JSON.stringify({
                        companyId: 61,
                        isExportData: "1",
                        modelType: "1",
                    });
                this.$exportOut(method, param)
            },
            // 下载模版
            dutyTemplate: function () {
                var method = "dutyManage/exportDutyModelExcel",
                    param = JSON.stringify({
                        modelType: "1",
                        isExportData: "0",
                    });
                this.$exportOut(method, param)
            },
            postTemplate: function () {
                var method = "positionManage/exportPositionModelExcel",
                    param = JSON.stringify({
                        modelType: "1",
                        isExportData: "0",
                    });
                this.$exportOut(method, param)
            }
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
</style>