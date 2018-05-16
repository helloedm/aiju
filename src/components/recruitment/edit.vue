<template>
    <div>
        <div class="title">
            <span style="color:#1F2D3D;font-size:16px;font-weight:bold;"><router-link to="/ATS/recruitment">产品动态</router-link></span>
            <span style="margin:0 8px;">></span>
            <span style="color:#465669;font-size:14px;">添加动态</span>
        </div>
        <div class="content">
            <div style="color:#1F2D3D;font-size:14px;margin:24px 0 0 24px;font-weight:bold;">标题</div>
            <input type="text" v-model="edit_ped.title" maxlength="40" placeholder="请输入标题" style="margin:8px 0 0 24px;width:320px;height:32px;border:1px solid #DCDFE6;text-indent: 1em;">
            <div style="color:#1F2D3D;font-size:14px;margin:24px 0 0 24px;font-weight:bold;">产品动态描述</div>
            <textarea v-model="edit_ped.content" maxlength="1000" name="" id="" cols="30" rows="10" style="resize:none;padding-top: 10px;margin:8px 0 0 24px;width:1022px;height:88px;border:1px solid #DCDFE6;text-indent: 1em;" placeholder="请输入动态描述"></textarea>
            <div>
                <el-button type="primary" class="button" style="margin:40px 0 0 24px;color：#fff;" @click="edit_orProductTrend">发布动态</el-button>
                <el-button type="primary" class="button" style="margin:40px 0 0 24px;color：#fff;" @click="original" v-show="is_qx">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'edit',
  data(){
    return{
        edit_ped:{title:"",content:""},
        is_qx:localStorage.edit_prd == undefined?false:true
    }
  },
  created(){
    this.edit_ped = JSON.parse(localStorage.edit_prd);
  },
  methods:{
     original(){
        var _this = this;
        var method = "dashBoard/getProductTrendInfoForOP";
        var id;
        if (localStorage.edit_prd == undefined) {
            id = 0 
        }else{
            id = _this.edit_ped.id
        }
        var param = JSON.stringify({
            id: id,
        });
        var successd = function(res) {
            console.log(res);
            _this.edit_ped = res.data.data.productTrendInfo
            if (res.data.code == "0") {
                _this.$message({
                    message: "恢复数据成功！",
                    type: "warning"
                });
            }
        };
        _this.$http(method, param, successd); 
     },
     edit_orProductTrend(){
        var _this = this;
        var method = "dashBoard/editorProductTrend";
        var id;
        if (localStorage.edit_prd == undefined) {
            id = 0 
        }else{
            id = _this.edit_ped.id
        }
        var param = JSON.stringify({
            id: id,
            content: _this.edit_ped.content,
            title: _this.edit_ped.title
        });
        var successd = function(res) {
            console.log(res);
            if (res.data.code == "0") {
                _this.$message({
                    message: "操作成功！",
                    type: "warning"
                });
                _this.$router.push('/ATS/recruitment');
            }
           
        };
        _this.$http(method, param, successd);
     }
  },
  components:{}
}
</script>

<style scoped>
    .title{
        min-height: 48px;
        background: #ffffff;
        display: flex;
        align-items: center;
        padding-left: 24px;
        cursor: pointer;
    }
    .content{
        margin-top: 24px;
        background: #ffffff;
        min-height: 720px;
        overflow: hidden;
    }
    .button a{
        color: #ffffff;
    }
</style>
