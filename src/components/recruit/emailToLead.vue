<template>
  <div id="emailTolead">
      <div class="title">邮箱设置（接收简历邮箱）</div>
      <div class="formContent">
          <el-button type="primary" style="float: left;" @click="emailSet">绑定邮箱</el-button>
          <notice style="margin-left: 15px;" text="填写的邮箱需是绑定各渠道简历的邮箱，新简历才会自动同步到系统中"/>
          <!-- <el-alert
            title="填写的邮箱需是绑定各渠道简历的邮箱，新简历才会自动同步到系统中"
            type="info"
            :closable="false"
            style="display:inline;margin-left: 15px;"
            show-icon>
        </el-alert> -->
         <el-table
            :data="tableData"
            border
            style="width: 100%; margin: 15px 0 0;">
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            label="状态">
             <template scope="scope">
                 {{scope.row.status | statusFilter}}
             </template>
            </el-table-column>
            <el-table-column
            label="最近投递时间">
             <template scope="scope">
                 {{ $date(scope.row.receiveDate) }}
             </template>
            </el-table-column>
            <el-table-column
            label="操作"
            width="100">
            <template scope="scope">
                <el-button @click="unbundlingEmail(scope.row)" type="text" size="small">解绑</el-button>
                <el-button @click="editClick(scope.row)" type="text" size="small">修改</el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>

        <el-dialog  title="邮箱收取简历须知" :visible.sync="agreement" class="agreement emailTolead">
            <div class="agreementWrap">
                <p>请仔细阅读以下事项，如无异议，勾选“我已阅读并同意以上内容”，并点击“下一步”</p>
                <ul>
                    <li>1. 我保证当前操作的爱聚帐号、邮箱帐号是本人所有或有权进行邮箱绑定等操作；</li>
                    <li>2. 我自愿授权爱聚微招聘系统检查邮箱中的邮件，以将包含简历信息的邮件及其附件内容保存到爱聚微招聘模块中；</li>
                    <li>3. 我保证在爱聚微招聘绑定简历接收邮箱，符合公司及邮箱服务商的规定，违反规定所致后果与爱聚微招聘无关； </li>
                    <li>4. 爱聚微招聘不会将邮箱密码及邮件内容披露给任何第三方，且仅会获取简历信息相关邮件，不会获取无关内容；</li>
                    <li>5. 收取到的简历将仅供当前操作的爱聚微招聘所在公司使用，未经允许爱聚微招聘不会另做他用；</li>
                </ul>
            </div>
            <el-checkbox v-model="checked">我已阅读并同意以上内容</el-checkbox>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="next()">下一步</el-button>
                <el-button @click="agreement = false">取 消</el-button>
            </div>
		</el-dialog>

      <el-dialog title="邮箱收取" class="qddr"  ref="aaavvv"  :visible.sync="emailSetShow">
        <!-- <el-alert
            title="填写接收各渠道简历的邮箱，新简历会自动同步到系统中"
            type="info"
            :closable="false"
            style="margin-bottom: 15px;"
            show-icon>
        </el-alert> -->
          <notice text="填写的邮箱需是绑定各渠道简历的邮箱，新简历才会自动同步到系统中"/>
        <el-form style="margin-top: 15px;" :model="emailFormList" :rules="rules" ref="emailFormList" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="emailFormList.email"></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="emailFormList.password"></el-input>
            </el-form-item>
            <el-form-item label="简历导入时间">
                <el-form-item>
                    <el-date-picker type="date" placeholder="选择日期" v-model="emailFormList.importDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
        </el-form>
        <p class="info"><i class="icon-tixing iconfont" ></i>建议设置导入时间，若不设置时间，默认 从绑定账号当日开始导入</p>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateBindingEmail()">绑定</el-button>
            <el-button @click="emailSetShow = false">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import Notice from 'base/notice'

export default {
  name: 'publishList',
  data(){
    return{
        agreement: false,
        emailSetShow: false,
        checked: true,
       tableData: [],
        dialog: false,
        id: null,
        emailFormList:{
            email: '1',
            password: '2',
            importDate: new Date(),
        },
        rules: {
          email: [
           { required: true, message: '请输入邮箱地址', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          importDate: [
            { required: false, message: '请选择日期', trigger: 'change' }
          ],
        }
    }
  },
  mounted(){
      this.qrybindingEmailList();
  },
  methods: {
      next(){
          if(this.checked){
            this.emailFormList = {
                email: '',
                password: '',
                importDate: new Date(),
            }
            this.agreement = false;
            this.emailSetShow = true;
          }else{
            this.$message({
                message: '请勾选我已阅读并同意以上内容',
                type: 'warning'
            });
          }
    },
     emailSet(){
        this.agreement = true;
     },
     qrybindingEmailList(){
          let method = 'platform/qrybindingEmailList',
          params = {},
          callBack = (res)=>{
            this.tableData = res.data.data;
              console.log(this.tableData)
          }
          this.$webHttp(method, params, callBack);
      },
      unbundlingEmail(item){
           let method = 'platform/unbundlingEmail',
          params = {
              id: item.id,
          },
          callBack = (res)=>{
            this.qrybindingEmailList();
          }
        this.$confirm('确认解绑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解绑成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          });
        });
          this.$webHttp(method, params, callBack);
      },
      editClick(item){
          console.log(item)
          this.id = item.id;
          this.emailFormList = { email: item.email, password: item.password, importDate: item.importDate };
          this.emailSetShow = true;
      },
      updateBindingEmail(){
          let method = 'platform/updateBindingEmail',
          params = {
              id: this.id,
              email: this.emailFormList.email,
              password: this.emailFormList.password,
              importDate: Number(this.emailFormList.importDate),
          },
          callBack = (res)=>{
            this.emailSetShow = false;
            this.id = null;
            this.qrybindingEmailList();
            this.$message({
                message: '绑定成功',
                type: 'success'
            });
          }
             this.$refs.emailFormList.validate((valid) => {
              if(valid){
                  if(!params.id){
                     delete params.id;
                     method =  'platform/bindingEmail'
                  }
                  this.$webHttp(method, params, callBack);
              }
          })
      },
      openDialog(dialog){
          this.dialog = true;
      },
      lagouSubmit(){
        this.bindingPlatformAccount()
      },
      edit(){
          this.$router.push({path:'post', query: {id: this.id}});
      },
  },
  filters: {
      statusFilter:function(value){
          if(value=='1'){
              return '正常'
          }else{
              return '异常'
          }
      }
  },
  components: {
      Notice
  }
}
</script>
<style>
.qddr .el-dialog.el-dialog--small{
    width: 528px;
}
</style>

<style scoped lang="less">
.title{
    color: #475669;
    font-size: 14px;
    height: 40px;
    width: 100%;
    background :#fff;
    line-height: 40px;
    text-indent: 12px;
    border-radius: 3px;
}
.formContent{
    padding: 20px;
    background:#fff;
    margin-top:15px;
    border-radius: 3px;
}
.agreementWrap{
    width: 90%;
    margin: 0 auto;
    background: #F5F7FA;
    padding: 16px;
}
.agreement p{
    margin-bottom: 10px;
}
.agreement p, .agreement li{
    color: #475669;
    font-size: 14px;
}
.agreement .el-checkbox{
    position: absolute;
    bottom: 20px;
    left: 24px;
}
.info{
    color :#98A9BF;
    margin-left: 100px;
}
</style>



