<template>
    <div id="employset">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="offer模板" name="0">
                <div class="hrm_module padding_20">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="offer模板">
                            <el-button v-for="temp in offerTempletList" @click="templetDetail(temp.id)" class="employset_tempbtn" :key="temp.id">
                                {{temp.name}}
                                <i class="el-icon-close employset_dele" @click.stop="deleTemp(temp.id)" v-if="temp.isTemplet==2"></i>
                            </el-button>
                            <el-input
                            style="display:inline-block;width:100px"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                            </el-input>
                            <!--<el-button  class="button-new-tag" size="small">+ New Tag</el-button>-->
                            <el-button v-else type="warning" @click="showInput">添加模板</el-button>
                        </el-form-item>
                        <el-form-item label="邮件主题">
                            <el-input v-model="input1" placeholder="请输入邮件主题"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件正文">
                            <div class="employset_main" >
                                <el-button type="info" size="small" :plain="true" @click="addContent('name')" class="employset_main_btn">姓名</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('phone')" class="employset_main_btn">手机号</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('email')" class="employset_main_btn">邮箱</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('dept')" class="employset_main_btn">入职部门</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('position')" class="employset_main_btn">入职职位</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('date')" class="employset_main_btn">入职时间</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('shiyongqi')" class="employset_main_btn">试用期</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('companyname')" class="employset_main_btn">公司名称</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('company')" class="employset_main_btn">公司地址</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('linkmanphone')" class="employset_main_btn">联系人电话</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('linkman')" class="employset_main_btn">入职联系人</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('zhuanzheng')" class="employset_main_btn">转正薪资</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('shiyong')" class="employset_main_btn">试用期薪资</el-button>
                                <el-button type="info" size="small" :plain="true" @click="addContent('remake')" class="employset_main_btn">薪酬备注</el-button>
                                <i class="el-icon-information"></i>
                            </div>
                            <quill-editor v-model="content"
                                            ref="myQuillEditor"
                                            :options="editorOption"
                                            @blur="onEditorBlur($event)"
                                            @focus="onEditorFocus($event)"
                                            @change="onEditorChange($event)"
                                            @ready="onEditorReady($event)">
                            </quill-editor>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveTeml">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="offer抄送" name="1">
                <el-alert
                    title="发送offer时，将默认抄送给指定的同事，你也可以在发送offer前手动调整需要抄送的同事"
                    type="info"
                    :closable="false"
                    style="background:#5aa2e7;"
                    show-icon>
                </el-alert>
                <div class="hrm_module">
                    <div class="hrm_module_con">
                        <h1 class="employset_chaosong_h1">请勾选需要默认抄送的同事</h1>
                        <ul class="employset_chaosong_ul">
                            <li><el-checkbox v-model="administrator">{{managerName}}(管理员)</el-checkbox></li>
                            <li><el-checkbox v-model="reportObj">新员工汇报对象</el-checkbox></li>
                            <li>
                                <el-checkbox v-model="elseObj">其他小伙伴</el-checkbox>
                                <tree-component v-if="elseObj" @treeOrderAssign="treeOrderAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='2' class="display_inlineblock" :tree-select-data="treeSelectData1" ref="tree1"></tree-component>
                            </li>
                            <li><el-button type="primary" @click="saveOfferReceive">保存</el-button></li>
                        </ul>
                    </div> 
                </div>
            </el-tab-pane>
            <el-tab-pane label="入职清单" name="2">
                <el-alert
                    title="入职清单给你带来的好处"
                    description="1. 驱动部门协作，自动提醒同事为新员工做入职准备；    2. 降低用工风险，做好入职材料的记录、检查和备忘提醒；   3. 提高入职概率，公司为新员工做得每一项准备，都能让Ta知道。"
                    type="info"
                    :closable="false"
                    style="background:#5aa2e7;"
                    show-icon>
                </el-alert>
                <div class="hrm_module">
                    <div class="hrm_module_btn">
                        <el-button type="primary" @click="certificateDialog">+新建</el-button>
                    </div>
                    <div class="hrm_module_con">
                         <el-table
                            :data="certificateList"
                            border
                            style="width: 100%">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="itemName"
                            label="项目">
                            </el-table-column>
                            <el-table-column
                            prop="remindStr"
                            label="提醒机制">
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template scope="scope">
                                <el-button @click="editruzhi(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" @click="deleruzhi(scope.row.id)">删除</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        class="margin_t_20"
                        @size-change="ruzhiSizeChange"
                        @current-change="ruzhiCurrentChange"
                        :current-page="page1.pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="page1.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page1.totalCount">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未入职原因" name="3">
                <div class="hrm_module">
                    <div class="hrm_module_btn">
                        <el-button type="primary" @click="addCause.show=true;addCause.reason='';addCause.id=false;addCause.title='新建原因';">+新建</el-button>
                    </div>
                    <div class="hrm_module_con">
                         <el-table
                            :data="noAcceptReasonList"
                            border
                            style="width: 100%">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="reason"
                            label="原因">
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template scope="scope">
                                <el-button @click="editweiruzhi(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" @click="deleweiruzhi(scope.row.id)">删除</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        class="margin_t_20"
                        @size-change="weiruzhiSizeChange"
                        @current-change="weiruzhiCurrentChange"
                        :current-page="page2.pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="page2.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page2.totalCount">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="添加项目" :visible.sync="addCertificateDialog" size="tiny">
            <el-form :model="form">
                <el-form-item label="项目名称" label-width="100px">
                <el-input v-model="itemName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否提醒" label-width="100px">
                    <el-switch
                    v-model="remind"
                    on-color="#13ce66"
                    off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="何时提醒" label-width="100px" v-if="remind">
                    <el-select v-model="remindDay" placeholder="请选择提醒时间">
                        <el-option label="入职前一天" value="1"></el-option>
                        <el-option label="入职前二天" value="2"></el-option>
                        <el-option label="入职前三天" value="3"></el-option>
                        <el-option label="入职前四天" value="4"></el-option>
                        <el-option label="入职前五天" value="5"></el-option>
                        <el-option label="入职前六天" value="6"></el-option>
                        <el-option label="入职前七天" value="7"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提醒谁" label-width="100px" v-if="remind">
                    <el-radio class="radio" v-model="remindType" label="1">在职员工</el-radio>
                    <el-radio class="radio" v-model="remindType" label="2">新员工</el-radio>
                </el-form-item>
                <el-form-item label="" label-width="100px" v-if="remind&&remindType==1">
                    <tree-component @treeOrderAssign="treeOrderAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='2'></tree-component>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCertificateDialog = false">取 消</el-button>
                <el-button type="primary" @click="addCertificate">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑项目" :visible.sync="editCertificateDialog" size="tiny">
            <el-form :model="editpro">
                <el-form-item label="项目名称" label-width="100px">
                <el-input v-model="editpro.itemName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否提醒" label-width="100px">
                    <el-switch
                    v-model="editpro.remind"
                    on-color="#13ce66"
                    off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="何时提醒" label-width="100px" v-if="editpro.remind">
                    <el-select v-model="editpro.remindDay" placeholder="请选择提醒时间">
                        <el-option label="入职前一天" value="1"></el-option>
                        <el-option label="入职前二天" value="2"></el-option>
                        <el-option label="入职前三天" value="3"></el-option>
                        <el-option label="入职前四天" value="4"></el-option>
                        <el-option label="入职前五天" value="5"></el-option>
                        <el-option label="入职前六天" value="6"></el-option>
                        <el-option label="入职前七天" value="7"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提醒谁" label-width="100px" v-if="editpro.remind">
                    <el-radio class="radio" v-model="editpro.remindType" label="1">在职员工</el-radio>
                    <el-radio class="radio" v-model="editpro.remindType" label="2">新员工</el-radio>
                </el-form-item>
                <el-form-item label="" label-width="100px" v-if="editpro.remind&&editpro.remindType==1">
                    <tree-component @treeOrderAssign="treeOrderAssign" :tree-btn-name="treeBtnName" :tree-support-select="false" :tree-type='2' :tree-select-data="treeSelectData" ref="tree"></tree-component>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCertificateDialog = false">取 消</el-button>
                <el-button type="primary" @click="editCertificate">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="addCause.title" :visible.sync="addCause.show" size="tiny">
            <el-form :model="addCause">
                <el-form-item label="未入职原因" label-width="100px">
                <el-input v-model="addCause.reason" auto-complete="off" type="textarea" :maxlength="200"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCause.show = false">取 消</el-button>
                <el-button type="primary" @click="addNoAcceptReason">确 定</el-button>
            </div>
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
import treeComponent from '../tree.vue';
import util from '../../script/util';
    export default {
        name:'employset',
        data(){
            return{
                activeName:0,
                input1:'',
                form:{},
                editorOption:{

                },
                content:'',
                selection:0,//富文本focus位置
                selectionLength:0,//富文本focus长度

                //抄送
                administrator:true,
                reportObj:false,
                elseObj:false,
                treeBtnName:'选择员工',

                //入职清单
                tableData:[],
                currentPage4:400,
                inputVisible:false,
                offerTempletList:[],
                inputValue:'',
                templetId:'',
                managerName:'管理员',
                temporarySendToPerson:[],
                temporarySendToPersonName:[],
                sendToPerson:'',
                certificateList:[],
                remindDay:'1',
                addCertificateDialog:false,
                remind:true,
                page1:{
                    pageSize:10,
                    pageNum:1,
                    totalCount:0
                },
                page2:{
                    pageSize:10,
                    pageNum:1,
                    totalCount:0
                },
                remindType:"1",
                itemName:'',
                editCertificateDialog:false,
                editpro:{
                    remindType:"1",
                    itemName:'',
                    remind:false,
                    remindDay:'1',
                    remindUids:''
                },
                noAcceptReasonList:[],
                addCause:{
                    title:'添加原因',
                    show:false,
                    reason:'',
                    id:false
                },
                treeSelectData: {
                    keys: [],
                    names: ''
                },
                treeSelectData1: {
                    keys: [],
                    names: ''
                },

                //文件上传参数
                action:util.uploadURLForCommon,
                param:{
                    param:JSON.stringify({businessId:20,fId:-1}),
                    sign:this.$md5('fileUpload/insertFileRecord',JSON.stringify({businessId:20,fId:-1}))
                }
            }
        },
        mounted(){
            this.index();
            // this.getOfferTempletList();
            this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
        },
        methods:{
            index(){
                // 初始化
                var self=this;
                var method="offerReceive/initZP",
                    param=JSON.stringify({}),
                    successd=function(res){
                        self.getOfferTempletList();
                    };
                this.$http(method,param,successd);
            },
            handleClick(tab){
                var name=tab.name;
                var self=this;
                self.page1={
                    pageSize:10,
                    pageNum:1,
                    totalCount:0
                };
                self.page2={
                    pageSize:10,
                    pageNum:1,
                    totalCount:0
                };
                switch (name) {
                    case '1':
                        self.getOfferReceive();
                        break;
                    case '2':
                        self.getCertificateList();
                        break;
                    case '3':
                        self.getNoAcceptReasonList();
                        break;
                        
                    default:
                        break;
                }
            },
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
                if(editor.getSelection()){
                    this.selection = editor.getSelection().index;
                    this.selectionLength = editor.getSelection().length;
                }
                // this.content = html
            },
            addContent(v){//添加标签
                // this.content+="<a href='#'>aaaaa</a>";
                var self = this;
                console.log(this.content)
                // this.$refs.myQuillEditor.quill.setSelection(self.selection,0)
                this.$refs.myQuillEditor.quill.insertEmbed(self.selection,'image','https://aijuhr.com/images/offer/'+v+'.png')
            },
            //offer抄送
            treeOrderAssign(v) {
                var _this = this;
                if (v.checked) {
                    _this.temporarySendToPerson.push(v.id);
                    _this.temporarySendToPersonName.push(v.name);
                } else {
                    for(var i=0;i<_this.temporarySendToPerson.length;i++){
                        if(_this.temporarySendToPerson[i] ==v.id){
                            _this.temporarySendToPerson.splice(i,1);
                            _this.temporarySendToPersonName.splice(i,1);
                        }
                    }
                }
                _this.sendToPerson = _this.temporarySendToPerson.join(',');
                _this.btnName = _this.temporarySendToPersonName.join();
            },

            //入职清单method
            editruzhi(row){//编辑入职清单
                // this.editpro=row;
                console.log(row);
                this.editpro.itemName=row.itemName;
                this.editpro.id=row.id;
                this.editpro.isDelete=row.isDelete;
                var reg=/\,/;
                if(row.remindType=='0'){
                    this.editpro.remind=false;
                }else{
                    this.editpro.remind=true;
                    this.editpro.remindType=row.remindType+"";
                    this.editpro.treeBtnName=row.numAndName+"";
                    this.editpro.remindDay=row.remindDay+"";
                    this.editpro.remindUids=row.remindUids;
                    if(reg.test(row.remindUids)){
                        this.treeSelectData.keys=row.remindUids.split(',');
                    }else{
                        this.treeSelectData.keys=[];
                        this.treeSelectData.keys.push(row.remindUids);
                    }
                    this.treeSelectData.names=row.numAndName;
                    this.$nextTick(function(){
                        this.$refs.tree.setChecked();
                    })
                }
                this.editCertificateDialog=true;
            },
            deleruzhi(id){//删除入职清单
                var self=this;
                self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var method="certificate/delCertificate",
                        param=JSON.stringify({id:id}),
                        successd=function(){
                            self.getCertificateList();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        };
                    self.$http(method,param,successd);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            ruzhiSizeChange(val){//切换入职pageSize
                this.page1.pageSize=val;
                this.getCertificateList();
            },
            ruzhiCurrentChange(val){//切换入职pageNum
                this.page1.pageNum=val;
                console.log(val);
                this.getCertificateList();
            },
            //未入职清单method
            editweiruzhi(row){//编辑未入职原因
                var self=this;
                self.addCause.reason=row.reason;
                self.addCause.id=row.id;
                self.addCause.show=true;
                self.addCause.title='编辑原因';
            },
            deleweiruzhi(id){//删除未入职原因
                var self=this;
                self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var method="noAcceptReason/delNoAcceptReason",
                        param=JSON.stringify({
                            id:id
                        }),
                        successd=function(){
                            self.getNoAcceptReasonList();
                            self.$message({
                                message:'删除成功!',
                                type:'success'
                            })
                        };
                    self.$http(method,param,successd);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });   
            },
            weiruzhiSizeChange(val){//切换未入职pageSize
                this.page2.pageSize=val;
                this.getNoAcceptReasonList();
            },
            weiruzhiCurrentChange(val){//切换未入职pageNum
                this.page2.pageNum=val;
                this.getNoAcceptReasonList();
            },
            showInput(){
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm(){
                var self=this;
                let inputValue = self.inputValue;
                if (inputValue) {
                    var method="offerTemplet/addOfferTemplet",
                        param=JSON.stringify({
                            name:inputValue
                        }),
                        successd=function(res){
                            self.getOfferTempletList();
                        };
                    self.$http(method,param,successd);
                }
                self.inputVisible = false;
                self.inputValue = '';
            },
            getOfferTempletList(){
                var self=this;
                var method="offerTemplet/getOfferTempletList",
                    param=JSON.stringify({}),
                    successd=function(res){
                        self.offerTempletList=res.data.data;
                        self.templetDetail(res.data.data[0].id);
                    };
                self.$http(method,param,successd);
            },
            templetDetail(id){//查看模板详情
                var self=this;
                self.templetId=id;
                var method="offerTemplet/getOfferTemplet",
                    param=JSON.stringify({
                        id:id
                    }),
                    successd=function(res){
                        console.log(res);
                        self.input1=res.data.data.theme;
                        self.content=res.data.data.content;
                        self.templetId=res.data.data.id;
                    };
                self.$http(method,param,successd);
            },
            saveTeml(){//保存模板
                var self=this;
                if(self.templetId===""){
                    self.$message.error("请选择模板或者新增模板")
                    return false;
                }
                var method="offerTemplet/updateOfferTemplet",
                    param=JSON.stringify({
                        id:self.templetId,
                        theme:self.input1,
                        content:self.content
                    }),
                    successd=function(res){

                    };
                self.$http(method,param,successd);
            },
            saveOfferReceive(){
                var self=this,otherIds,isSenderManager,isSenderReport;
                if(self.elseObj){
                    otherIds=self.sendToPerson;
                }
                var method="offerReceive/updateOfferReceive",
                    param=JSON.stringify({
                        otherIds:otherIds,
                        isSenderManager:self.administrator?'1':'0',
                        isSenderReport:self.reportObj?'1':'0'
                    }),
                    successd=function(res){
                        self.$message({
                            message:'保存成功!',
                            type:'success'
                        })
                    };
                self.$http(method,param,successd);
            },
            getOfferReceive(){//获取抄送数据
                var self=this;
                var method="offerReceive/getOfferReceive",
                    param=JSON.stringify({}),
                    successd=function(res){
                        console.log(res);
                        self.administrator=res.data.data.isSenderManager==0?false:true;
                        self.reportObj=res.data.data.isSenderReport==0?false:true;
                        self.elseObj=res.data.data.otherIds==null||res.data.data.otherIds==0?false:true;
                        self.managerName=res.data.data.managerName;
                        var reg=/\,/;
                        var row =res.data.data;
                        if(reg.test(row.otherIds)){
                            self.treeSelectData1.keys=row.otherIds.split(',');
                        }else{
                            self.treeSelectData1.keys=[];
                            self.treeSelectData1.keys.push(row.otherIds);
                        }
                        self.treeSelectData1.names=row.otherNames;
                        self.$nextTick(function(){
                            self.$refs.tree1.setChecked();
                        })
                    };
                self.$http(method,param,successd);
            },
            deleTemp(id){
                var self=this;
                var method="offerTemplet/delOfferTemplet",
                    param=JSON.stringify({
                        id:id
                    }),
                    successd=function(res){
                        self.getOfferTempletList();
                    };
                self.$http(method,param,successd);
            },
            getCertificateList(){
                var self=this;
                var method="certificate/getCertificateList",
                    param=JSON.stringify({pageNum:self.page1.pageNum,pageSize:self.page1.pageSize}),
                    successd=function(res){
                        self.certificateList=res.data.data.list;
                        self.page1=res.data.data.page;
                    };
                self.$http(method,param,successd);
            },
            addCertificate(){
                var self=this;
                var method="certificate/addCertificate",
                    param=JSON.stringify({
                        itemName:self.itemName,
                        remindType:self.remind?self.remindType:'0',
                        remindDay:self.remindDay,
                        remindUids:self.sendToPerson
                    }),
                    successd=function(res){
                        self.addCertificateDialog=false;
                        self.getCertificateList();
                    };
                self.$http(method,param,successd);
            },
            certificateDialog(){
                this.addCertificateDialog=true;
                this.itemName='';
                this.remind=false;
            },
            editCertificate(){
                var self=this;
                var method="certificate/updateCertificate",
                    param=JSON.stringify({
                        id:self.editpro.id,
                        itemName:self.editpro.itemName,
                        remindType:self.editpro.remind?self.editpro.remindType:'0',
                        remindDay:self.editpro.remindDay,
                        remindUids:self.sendToPerson?self.sendToPerson:self.editpro.remindUids,
                        isDelete:self.editpro.isDelete
                    }),
                    successd=function(res){
                        self.editCertificateDialog=false;
                        self.getCertificateList();
                        self.$message({
                            message:'保存成功!',
                            type:'success'
                        })
                    };
                self.$http(method,param,successd);
            },
            getNoAcceptReasonList(){
                var self=this;
                var method="noAcceptReason/getNoAcceptReasonList",
                    param=JSON.stringify({
                        pageNum:self.page2.pageNum,
                        pageSize:self.page2.pageSize
                    }),
                    successd=function(res){
                        self.noAcceptReasonList=res.data.data.list;
                        self.page2=res.data.data.page;
                    };
                self.$http(method,param,successd);
            },
            addNoAcceptReason(){
                var self=this;
                if (self.addCause.id) {
                    var method="noAcceptReason/updateNoAcceptReason",
                        param=JSON.stringify({
                            reason:self.addCause.reason,
                            id:self.addCause.id
                        }),
                        successd=function(res){
                            self.addCause.show=false;
                            self.getNoAcceptReasonList();
                        };
                    self.$http(method,param,successd);
                } else {
                    var method="noAcceptReason/addNoAcceptReason",
                        param=JSON.stringify({
                            reason:self.addCause.reason
                        }),
                        successd=function(res){
                            self.addCause.show=false;
                            self.getNoAcceptReasonList();
                            self.$message({
                                message:'保存成功!',
                                type:'success'
                            })
                        };
                    self.$http(method,param,successd);
                }
            },
            imgHandler(state){
                if(state){
                    document.getElementById('imgInput').click();
                }
            },
            uploadSuccessd(res,file,fileList){
                var self=this;
                if(res.code==0){
                    let url=res.data.fileInfoList[0].url;
                    console.log(self.selection);
                    this.$refs.myQuillEditor.quill.insertEmbed(self.selection,'image',url)
                }else{
                    this.$message.error(res.message);
                }
            }
        },
        components: {
            treeComponent
        }
    }
</script>

<style>
    #employset .ql-container.ql-snow{width:100%;min-height: 500px;}
    #employset .employset_main{border:1px solid #ccc;border-bottom: none;padding: 20px;}
    #employset .employset_main_btn{border-color: #5aa2e7;color: #5aa2e7;}
    #employset .employset_chaosong_h1{font-size: 16px;line-height: 50px;border-bottom: 1px solid #ddd;color: #1f2d3d;font-weight: 400;}
    #employset .employset_chaosong_ul li{height: 50px;line-height: 50px;padding-left: 100px;}
    #employset .employset_dele{position: absolute;top: -8px;right:-8px;padding: 2px;font-size: 5px;border-radius: 50%;color: #fff;background-color: #ccc;display: none;}
    #employset .employset_tempbtn{position: relative;}
    #employset .employset_tempbtn:hover .employset_dele{display: block;}
</style>