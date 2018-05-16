<template>
    <div id="interviewSet">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="面试模板" name="0">
                <div class="hrm_module padding_20">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="面试模板">
                            <el-button v-for="temp in offerTempletList" @click="getEmailTemplet(temp.id)" class="employset_tempbtn" :key="temp.id" :class="{templetDetail:templetDetailId==temp.id}">
                                {{temp.name}}
                                <i class="el-icon-close employset_dele" @click.stop="delEmailTemplet(temp.id)" v-if="temp.isDefault==2"></i>
                            </el-button>
                            <el-input style="display:inline-block;width:100px" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="clearInput">
                            </el-input>
                            <!--<el-button  class="button-new-tag" size="small">+ New Tag</el-button>-->
                            <el-button v-else-if="offerTempletList.length<8" type="warning" @click="showInput">添加模板</el-button>
                        </el-form-item>
                        <el-form-item label="邮件主题">
                            <el-input v-model="form.theme" placeholder="请输入邮件主题" :maxlength='20'></el-input>
                        </el-form-item>
                        <el-form-item label="邮件正文">
                            <div class="employset_main">
                                <el-button type="info" size="small" :plain="true" @click="addContent('name')" class="employset_main_btn">姓名</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('phone')" class="employset_main_btn">手机号</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('email')" class="employset_main_btn">邮箱</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('interview_post')" class="employset_main_btn">面试职位</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('interview_time')" class="employset_main_btn">面试时间</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('interviewer')" class="employset_main_btn">面试联系人</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('interview_phone')" class="employset_main_btn">联系人电话</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('interview_address')" class="employset_main_btn">面试地点</el-button>
                                <i class="el-icon-information"></i>
                            </div>
                            <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" @ready="onEditorReady($event)">
                            </quill-editor>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="updateEmailTemplet" :disabled="form.isDefault==1">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>

            <el-tab-pane label="淘汰原因" name="1">
                <div class="hrm_module">
                    <div class="hrm_module_btn">
                        <el-button type="primary" @click="addEliminateReasonFun">+ 添加</el-button>
                    </div>
                    <div class="hrm_module_con">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column type="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="eliminateReason" label="淘汰原因" width="120">
                            </el-table-column>
                            <el-table-column prop="remark" label="说明" class-name="text-align-left" :show-overflow-tooltip='true'>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template scope="scope">
                                    <el-button @click="updateEliminate(scope)" type="text" size="small" :disabled="scope.row.isDefault==1">编辑</el-button>
                                    <el-button type="text" size="small" @click="delEliminateReason(scope.row.id)" :disabled="scope.row.isDefault==1">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination class="margin_t_20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="面试评价表模板" name="2">
                <div class="hrm_module">
                    <div class="hrm_module_con">
                        <el-form :model="joinForm">
                            <el-form-item label="允许面试官看到其他面试反馈" label-width="200px">
                                <el-switch v-model="joinForm.isOpen" on-color="#13ce66" off-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="评价模板" label-width="80px">
                                <el-button v-for="temp in EvaluateTempletList" @click="previewEvaluateTemplet(temp.id)" class="employset_tempbtn" :key="temp.id" :class="{templetDetail:templetDetailId2==temp.id}">
                                    {{temp.name}}
                                    <i class="el-icon-close employset_dele" @click.stop="delEvaluateTemplet(temp.id)" v-if="temp.isDefault==2"></i>
                                </el-button>
                                <el-input style="display:inline-block;width:100px" v-if="inputVisible2" v-model="inputValue2" ref="saveTagInput2" @keyup.enter.native="handleInputConfirm2" @blur="handleInputConfirm2">
                                </el-input>
                                <!--<el-button  class="button-new-tag" size="small">+ New Tag</el-button>-->
                                <el-button v-else-if="EvaluateTempletList.length<8" type="warning" @click="showInput2">添加模板</el-button>
                            </el-form-item>
                            <el-form-item label="模板名称" label-width="80px">
                                <el-input v-model="joinForm.name" auto-complete="off" class="input_w_360"></el-input>
                            </el-form-item>
                            <el-form-item label="" label-width="80px">
                                <el-form class="border">
                                    <el-form-item :label="index+1" label-width="50px" v-for="(field,index) in fieldList" :key="field.id" class="field_item">
                                        <div class="" v-if="field.type==1">
                                            <div>{{field.evaluateField}} （{{field.fieldRemark}}）</div>
                                            <el-radio class="radio" :label="index2" v-for="(option,index2) in field.option" :key="option">{{option}}</el-radio>
                                            <!-- <el-radio class="radio" label="2">备选项</el-radio> -->
                                        </div>
                                        <div class="" v-else>
                                            <div>{{field.evaluateField}}</div>
                                            <el-input type="textarea" class="w_500"></el-input>
                                        </div>
                                        <div class="edit_icon">
                                            <i class="el-icon-edit" @click="editEvaluateFieldShow(field)"></i>
                                            <i class="el-icon-delete margin_l_20" @click="delEvaluateField(field.id)"></i>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label-width="50px">
                                        <div class="">
                                            <el-button @click="addEvaluateFieldShow=true;isaddEvaluateFieldShow=true;">+添加选项</el-button>
                                            <el-button @click="goevaluate()">预览</el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
                            <el-form-item label-width="80px">
                                <el-button type="primary" @click="updateEvaluateTemplet" :disabled="evaluateTempleisDefault ==1">保存模板</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="修改淘汰原因" :visible.sync="addEliminateReasonShow" size="tiny">
            <el-form :model="addEliminateReasonForm" label-width="80px">
                <el-form-item label="淘汰原因">
                    <el-input v-model="addEliminateReasonForm.eliminateReason" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="淘汰说明">
                    <el-input v-model="addEliminateReasonForm.remark" autosize auto-complete="off" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEliminateReasonShow = false">取 消</el-button>
                <el-button type="primary" @click="addEliminateReason">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="字段" :visible.sync="addEvaluateFieldShow" size="tiny">
            <el-form :model="addEvaluateFieldForm" label-width="80px">
                <el-form-item label="字段类型">
                    <el-select v-model="addEvaluateFieldForm.type" placeholder="请选择">
                        <el-option label="选项" value="1"></el-option>
                        <el-option label="多行文本" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字段名称">
                    <el-input v-model="addEvaluateFieldForm.name"></el-input>
                </el-form-item>
                <el-form-item label="字段说明" v-if="addEvaluateFieldForm.type==1">
                    <el-input v-model="addEvaluateFieldForm.fieldRemark"></el-input>
                </el-form-item>
                <el-form-item label="字段选项" v-if="addEvaluateFieldForm.type==1">
                    <div v-for="(option,index) in addEvaluateFieldForm.option" style="position:relative;margin-bottom:10px;">
                        <el-input v-model="option.value"></el-input>
                        <i class="el-icon-delete2 dele_option" @click="deleOption(index)" v-if="index!=0"></i>
                    </div>
                </el-form-item>
                <el-form-item v-if="addEvaluateFieldForm.option.length<6&&addEvaluateFieldForm.type==1">
                    <el-button @click="addOption">新增选项</el-button>
                </el-form-item>
                <el-form-item label="字段位置">
                    <el-select v-model="addEvaluateFieldForm.sortNo" placeholder="请选择">
                        <el-option label="顶部" value="0"></el-option>
                        <el-option :label="field.evaluateField" :value="(index+1)+''" v-for="(field,index) in fieldList" :key="field.sortNo"></el-option>
                    </el-select>
                    <p>字段会出现指定位置的下方</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEvaluateFieldShow=false">取 消</el-button>
                <el-button type="primary" @click="EvaluateField">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import treeComponent from '../tree.vue';
export default {
    name: 'employset',
    data() {
        return {
            activeName: 0,
            input1: '',
            form: {},
            editorOption: {

            },
            content: '',
            selection: 0,//富文本focus位置
            selectionLength: 0,//富文本focus长度
            tableData: [],
            offerTempletList: [],
            inputVisible: false,
            page: {
                pageNum: 1,
                pageSize: 10,
                totalCount: 0
            },

            //淘汰原因弹框
            addEliminateReasonShow: false,
            addEliminateReasonForm: {
                eliminateReason: '',
                remark: ''
            },
            addEliminate: true,

            //面试评价列表
            joinForm: {
                isOpen: false,
                name: '',
            },
            joinForm2: {
                radio: 1,
                con: ''
            },
            templetDetailId: '',
            inputValue: '',
            EvaluateTempletList: [],
            inputVisible2: false,
            inputValue2: '',
            templetDetailId2: '',
            fieldList: [],
            addEvaluateFieldForm: {
                name: '',
                type: '1',
                option: [{value:''},{value:''}],
                sortNo: '0'
            },
            addEvaluateFieldShow: false,
            isaddEvaluateFieldShow: true,
            evaluateTempletId: '',
            fieldId: '',
            evaluateTempleisDefault:'',
        }
    },
    mounted() {
        this.getEmailTempletList();
        this.getReasonList();
        this.getEvaluateTempletList();
    },
    methods: {
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
            console.log(editor.getSelection());
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
            this.selection = editor.getSelection().index;
            this.selectionLength = editor.getSelection().length;
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
            console.log(this.content);
        },
        onEditorChange({ editor, html, text }) {
            // console.log('editor change!', editor, html, text)
            console.log(editor.getSelection());
            if (editor.getSelection()) {
                this.selection = editor.getSelection().index;
                this.selectionLength = editor.getSelection().length;
            }
            // this.content = html
        },
        addContent(v) {//添加标签
            // this.content+="<a href='#'>aaaaa</a>";
            var self = this;
            console.log(this.content)
            // this.$refs.myQuillEditor.quill.setSelection(self.selection,0)
            this.$refs.myQuillEditor.quill.insertEmbed(self.selection, 'image', 'https://aijuhr.com/images/offer/' + v + '.png')
        },
        handleClick(name) {
            console.log(name);
        },
        getEmailTempletList() {
            var self = this;
            var method = "emailTemplet/getEmailTempletList",
                param = JSON.stringify({}),
                successd = function(res) {
                    self.offerTempletList = res.data.data;
                    self.templetDetailId = res.data.data[0].id;
                    self.getEmailTemplet(res.data.data[0].id);
                };
            self.$http(method, param, successd);
        },
        getEmailTemplet(id) {
            var self = this;
            var method = "emailTemplet/getEmailTemplet",
                param = JSON.stringify({
                    id: id
                }),
                successd = function(res) {
                    self.form = res.data.data;
                    self.templetDetailId = id;
                };
            self.$http(method, param, successd);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            var self = this;
            var method = "emailTemplet/addEmailTemplet",
                param = JSON.stringify({
                    name: self.inputValue
                }),
                successd = function(res) {
                    self.inputVisible = false;
                    self.getEmailTempletList();
                };
            self.$http(method, param, successd);
        },
        delEmailTemplet(id) {
            var self = this;
            var method = "emailTemplet/delEmailTemplet",
                param = JSON.stringify({
                    id: id
                }),
                successd = function(res) {
                    self.getEmailTempletList();
                    self.$message({
                        message: '删除成功!',
                        type: 'success'
                    });
                };
            self.$http(method, param, successd);
        },
        updateEmailTemplet() {
            var self = this;
            var method = "emailTemplet/updateEmailTemplet",
                param = JSON.stringify({
                    id: self.form.id,
                    theme: self.form.theme,
                    content: self.form.content
                }),
                successd = function(res) {
                    self.getEmailTemplet(self.form.id);
                    self.$message({
                        message: '保存成功!',
                        type: 'success'
                    });
                };
            self.$http(method, param, successd);
        },

        //淘汰原因
        getReasonList() {
            var self = this;
            var method = "eliminateReason/getReasonList",
                param = JSON.stringify({
                    pageNum: self.page.pageNum,
                    pageSize: self.page.pageSize
                }),
                successd = function(res) {
                    console.log(res);
                    self.tableData = res.data.data.reasonList;
                    self.page = res.data.data.page;
                };
            self.$http(method, param, successd);
        },
        addEliminateReasonFun() {
            this.addEliminateReasonShow = true;
            this.addEliminate = true;
            this.addEliminateReasonForm = {
                eliminateReason: '',
                remark: ''
            }
        },
        addEliminateReason() {
            var self = this;
            if (self.addEliminate) {
                var method = "eliminateReason/addEliminateReason",
                    param = JSON.stringify(self.addEliminateReasonForm),
                    successd = function(res) {
                        self.getReasonList();
                        self.addEliminateReasonShow = false;
                        self.$message({
                            message: '添加成功!',
                            type: 'success'
                        })
                    };
            } else {
                var method = "eliminateReason/updateEliminateReason",
                    param = JSON.stringify(self.addEliminateReasonForm),
                    successd = function(res) {
                        self.getReasonList();
                        self.addEliminateReasonShow = false;
                        self.$message({
                            message: '修改成功!',
                            type: 'success'
                        })
                    }
            }
            self.$http(method, param, successd);
        },
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.getReasonList();
        },
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.getReasonList();
        },
        updateEliminate(scope) {
            this.addEliminateReasonForm = scope.row;
            this.addEliminate = false;
            this.addEliminateReasonShow = true;
        },
        delEliminateReason(id) {
            var self = this;
            var method = "eliminateReason/delEliminateReason",
                param = JSON.stringify({ id: id }),
                successd = function(res) {
                    self.getReasonList();
                    self.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                };
            self.$confirm('此操作将永久删除此记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.$http(method, param, successd);
            }).catch(() => {
            });

        },

        //评价模板
        getEvaluateTempletList() {
            var self = this;
            var method = "evaluateTemplet/getEvaluateTempletList",
                param = JSON.stringify({}),
                successd = function(res) {
                    self.EvaluateTempletList = res.data.data;
                    self.previewEvaluateTemplet(self.EvaluateTempletList[0].id)
                }
            self.$http(method, param, successd);
        },
        showInput2() {
            this.inputVisible2 = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput2.$refs.input.focus();
            });
        },
        handleInputConfirm2() {
            var self = this;
            var method = "evaluateTemplet/addEvaluateTemplet",
                param = JSON.stringify({
                    name: self.inputValue2
                }),
                successd = function(res) {
                    self.inputVisible2 = false;
                    self.getEvaluateTempletList();
                };
            self.$http(method, param, successd);
        },
        previewEvaluateTemplet(id) {
            var self = this;
            self.templetDetailId2 = id;
            var method = "evaluateTemplet/previewEvaluateTemplet",
                param = JSON.stringify({
                    templetId: id
                }),
                successd = function(res) {
                    self.joinForm.name = res.data.data.name;
                    self.joinForm.isOpen = res.data.data.isOpen == 2;
                    self.fieldList = res.data.data.fieldList;
                    self.evaluateTempletId = res.data.data.id;
                    self.evaluateTempleisDefault=res.data.data.isDefault;
                };
            self.$http(method, param, successd);
        },
        deleOption(index) {
            if (this.addEvaluateFieldForm.option.length == 1) {
                return;
            }
            this.addEvaluateFieldForm.option.splice(index, 1);
        },
        addOption() {
            if (this.addEvaluateFieldForm.option.length >= 6) {
                return;
            }
            this.addEvaluateFieldForm.option.push({value:''});
        },
        EvaluateField() {
            var self = this;
            if (self.isaddEvaluateFieldShow) {
                //新增
                var method = "evaluateTemplet/addEvaluateField";
                console.log(self.addEvaluateFieldForm.option);
                var evaluateField = {
                    evaluateTempletId: self.evaluateTempletId,
                    type: self.addEvaluateFieldForm.type,
                    name: self.addEvaluateFieldForm.name,
                    fieldRemark: self.addEvaluateFieldForm.fieldRemark,
                    sortNo: self.addEvaluateFieldForm.sortNo,
                    option1: self.addEvaluateFieldForm.option[0]?self.addEvaluateFieldForm.option[0].value:'',
                    option2: self.addEvaluateFieldForm.option[1]?self.addEvaluateFieldForm.option[1].value:'',
                    option3: self.addEvaluateFieldForm.option[2]?self.addEvaluateFieldForm.option[2].value:'',
                    option4: self.addEvaluateFieldForm.option[3]?self.addEvaluateFieldForm.option[3].value:'',
                    option5: self.addEvaluateFieldForm.option[4]?self.addEvaluateFieldForm.option[4].value:'',
                    option6: self.addEvaluateFieldForm.option[5]?self.addEvaluateFieldForm.option[5].value:'',
                };
                var param = JSON.stringify({ 'evaluateField': evaluateField }),
                    successd = function(res) {
                        self.addEvaluateFieldShow = false;
                        self.previewEvaluateTemplet(self.evaluateTempletId);
                    }
            } else {
                //编辑
                var method = "evaluateTemplet/updateEvaluateField";
                var evaluateField = {
                    id: self.fieldId,
                    evaluateTempletId: self.evaluateTempletId,
                    type: self.addEvaluateFieldForm.type,
                    name: self.addEvaluateFieldForm.name,
                    fieldRemark: self.addEvaluateFieldForm.fieldRemark,
                    sortNo: self.addEvaluateFieldForm.sortNo,
                    option1: self.addEvaluateFieldForm.option[0]?self.addEvaluateFieldForm.option[0].value:'',
                    option2: self.addEvaluateFieldForm.option[1]?self.addEvaluateFieldForm.option[1].value:'',
                    option3: self.addEvaluateFieldForm.option[2]?self.addEvaluateFieldForm.option[2].value:'',
                    option4: self.addEvaluateFieldForm.option[3]?self.addEvaluateFieldForm.option[3].value:'',
                    option5: self.addEvaluateFieldForm.option[4]?self.addEvaluateFieldForm.option[4].value:'',
                    option6: self.addEvaluateFieldForm.option[5]?self.addEvaluateFieldForm.option[5].value:'',
                };
                var param = JSON.stringify({ 'evaluateField': evaluateField }),
                    successd = function(res) {
                        self.addEvaluateFieldShow = false;
                        self.previewEvaluateTemplet(self.evaluateTempletId);
                    }
            };
            self.$http(method, param, successd);
        },
        editEvaluateFieldShow(field) {
            var self=this;
            field.type += "";
            // field.sortNo+="";
            this.addEvaluateFieldForm = JSON.parse(JSON.stringify(field));
            console.log(field);
            this.addEvaluateFieldForm.option.forEach(function(item,i) {
                self.addEvaluateFieldForm.option[i]={'value':field.option[i]};
                
            });
            this.addEvaluateFieldForm.name = field.evaluateField;
            console.log(this.addEvaluateFieldForm);
            this.isaddEvaluateFieldShow = false;
            this.addEvaluateFieldShow = true;
            this.fieldId = field.id;
        },
        delEvaluateField(id) {
            var self = this;
            var method = "evaluateTemplet/delEvaluateField",
                param = JSON.stringify({ 'fieldId': id }),
                successd = function(res) {
                    self.previewEvaluateTemplet(self.evaluateTempletId);
                };
            self.$http(method, param, successd);
        },
        goevaluate() {
            this.$router.push({ name: 'evaluate', params: { evaluateTempletId: this.evaluateTempletId } });
        },
        updateEvaluateTemplet() {
            var self = this;
            var method = "evaluateTemplet/updateEvaluateTemplet",
                param = JSON.stringify({
                    templetId: self.evaluateTempletId,
                    name: self.joinForm.name,
                    isOpen: self.joinForm.isOpen ? 2 : 1
                }),
                successd = function(res) {
                    self.previewEvaluateTemplet(self.evaluateTempletId);
                };
            self.$http(method, param, successd);
        },
        delEvaluateTemplet(id) {
            var self = this;
            var method = "evaluateTemplet/delEvaluateTemplet",
                param = JSON.stringify({
                    templetId: id
                }),
                successd = function(res) {
                    self.getEvaluateTempletList();
                };
            self.$http(method, param, successd);
        },
        clearInput(){
            this.inputVisible = false;
            this.inputVisible2 = false;
            this.inputValue='';
            this.inputValue2='';
        }
    },
    components: {
        treeComponent
    }
}
</script>

<style> 
#interviewSet .ql-container.ql-snow {
    width: 100%;
    min-height: 500px;
}

#interviewSet .employset_main {
    border: 1px solid #ccc;
    border-bottom: none;
    padding: 20px;
}

#interviewSet .employset_main_btn {
    border-color: #5aa2e7;
    color: #5aa2e7;
}

#interviewSet .employset_chaosong_h1 {
    font-size: 16px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    color: #1f2d3d;
    font-weight: 400;
}

#interviewSet .employset_chaosong_ul li {
    height: 50px;
    line-height: 50px;
    padding-left: 100px;
}

#interviewSet .employset_dele {
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 2px;
    font-size: 5px;
    border-radius: 50%;
    color: #fff;
    background-color: #ccc;
    display: none;
}

#interviewSet .employset_tempbtn {
    position: relative;
}

#interviewSet .employset_tempbtn:hover .employset_dele {
    display: block;
}

#interviewSet .border {
    border: 1px solid #bfcbd9;
    padding: 20px 0;
}

#interviewSet .templetDetail {
    border-color: #20a0ff;
    color: #20a0ff;
}

#interviewSet .dele_option {
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 10px;
}

#interviewSet .field_item {
    border: 1px dashed #ddd;
}

#interviewSet .edit_icon {
    position: absolute;
    right: 20px;
    top: 12px;
}

#interviewSet .edit_icon i {
    cursor: pointer;
    margin-left: 20px;
}
</style>