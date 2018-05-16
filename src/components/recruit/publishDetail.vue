<template>
  <div id="publishDetail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/ATS/recruit/list' }">职位列表</el-breadcrumb-item>
            <el-breadcrumb-item>招聘详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btnWrap">
            <el-button @click="edit()" type="primary">
                <i class="el-icon-edit"></i>
                <span>修改</span>
            </el-button>
            <el-button @click="deleteBtn()" type="primary">
                <i class="el-icon-delete"></i>
                <span>删除</span>
            </el-button>
        </div>
        <el-row>
            <el-col :span="12">
                <div class="top">
                    <div class="title">{{ info.positionName }}</div>
                    <div class="info">
                        <span>学历: {{ info.educationRequire }} / </span>
                        <span>工作经验: {{ info.workYear }} / </span>
                        <span class="red">{{ info.salary }} </span>
                    </div>
                    <div class="info">
                        <span><i class="iconfont">&#xe618;</i> {{ info.positionTypeStr }}</span> &nbsp;
                        <span><i class="iconfont">&#xe610;</i> {{ info.workCity }}</span>&nbsp;
                        <span><i class="iconfont">&#xe631;</i> {{ info.creatorName }}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="title">详细信息</div>
                    <ul>
                        <li><span>职位分类:</span>{{ info.categoryName }}</li>
                        <li><span>职位名称:</span>{{ info.positionName }}</li>
                        <li><span>职位性质:</span>{{ info.positionTypeStr }}</li>
                        <li><span>招聘人数:</span>{{ info.posiNum }}</li>
                        <li><span>工作城市:</span>{{ info.workCity }}</li>
                        <li><span>工作地址:</span>{{ info.workAddress }}</li>
                        <li><span>简历邮箱:</span>{{ info.receiveEmail }}</li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12" style="border-left:10px solid #f5f8fa">
                 <div class="title">职位描述</div>
                 <!-- <el-input type="textarea" class="describe" readonly v-model="info.positionDesc">
                     {{ info.positionDesc }}
                 </el-input> -->
                 <div v-html="info.positionDesc"></div>
            </el-col>
        </el-row>
  </div>
</template>
<script>

import allcity from '../../script/allcity';

export default {
  name: 'publishList',
  data(){
    return{
        info: {},
        id: '',
        type: '1'
    }
  },
  methods: {
      edit(){
          this.$router.push({path:'post', query: {id: this.id}});
      },
      deleteBtn() {
        let method = 'recruitPosition/batchDeletePosition',
        self = this,
        param = JSON.stringify({
            ids: this.id
        }),
        successd = function(res){
            self.$router.go(-1);
        }
        this.$http(method, param, successd);
      },
      init(){
          console.log(this.$route)
          this.id = this.$route.query.id;
          let method = 'recruitPosition/getPositionDetail',
          self = this,
          params = JSON.stringify({
              id: this.id,
              type: this.type
          }),
          successed = function(res){
              self.info = res.data.data
          }
          this.$http(method, params, successed);
      }
  },
  mounted(){
      this.init()
  }
}
</script>
<style scoped>
.btnWrap{
    margin: 30px 0;
}
.red{
    color: red;
}
.top{
    border-bottom: 1px solid #E5E9F2;
    padding-bottom: 10px;
}
.title{
    font-size: 16px;
    color: #1F2D3D;
    padding: 20px 0;
    font-weight: 600;
}
.info{
    margin-bottom: 20px;
}
.el-col-12{
    background-color: #fff;
    height: 620px;
    padding: 0 20px;
}
li{
    line-height: 26px;
}
li span{
    min-width: 90px;
    display: inline-block;
}
.el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
}
.iconfont{
    font-size: 14px;
    color: #99a9bf;
}
.el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
}

</style>
<style>
#publishDetail .describe {height:500px}
#publishDetail .describe textarea{width:100%;height:100%;border:none;resize:none;}
</style>



