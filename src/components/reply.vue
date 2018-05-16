<template>
  <div id="reply" class="clearfix" v-loading="loading" element-loading-text="拼命加载中">
    <div class="reply_top">
      <div class="reply_top_header iconfont">&#xe605;</div>
      <div class="reply_top_input">
        <el-input v-model="replyCon"></el-input>
      </div>
      <div class="reply_top_btn">
        <el-button @click="replySubmit()">回复</el-button>
      </div>
    </div>
    <div class="reply_item" v-for="list in replyList">
      <div class="reply_item_con">
        <div class="reply_item_con_header" v-if="list.logo != null"><img :src="list.logo"></div>
        <div class="reply_item_con_header" v-if="list.logo == null" :style="{backgroundColor:list.bgC}">{{list.userName != null?list.userName.slice(-2):"无名"}}</div>
        <div class="reply_item_con_top">
          <span class="reply_item_con_name">{{list.userName}}</span><span v-if="list.receiveUid !=0">回复<span class="reply_item_con_receiveName">{{list.receiveName}}</span></span>：
          <span class="reply_item_con_text">{{list.replyCon}}</span>
        </div>
        <div class="reply_item_con_bottom">
          <span class="reply_item_con_time">{{list.createTime}}</span>
          <div class="reply_item_con_btns">
            <el-button type="text" @click="replyDel(list.id,list.userId)" v-if="commUser.id == list.userId">撤回</el-button>
            <el-button type="text" @click="replyClick(list.id)">回复</el-button>
          </div>
        </div>
        <div class="reply_item_con_reply" v-if="replyShow==list.id">
          <div class="reply_item_con_reply_input">
            <el-input v-model="replyCons"></el-input>
          </div>
          <div class="reply_item_con_reply_btn">
            <el-button @click="replySubmit(list.id,list.userId)">回复</el-button>
          </div>
        </div>
      </div>
      <div class="reply_item_reply">
        <div class="reply_item_reply_input"></div>
        <div class="reply_item_reply_btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Util from '../script/util.js';
  export default {
    props: {
      // isshow: Boolean,
      replyid: Number,
      scenetype: Number,
      userId: Number,
    },
    data() {
      return {
        replyShow: String,
        replyList: {},
        replyCon: '',
        replyCons: '',
        loading: false,
      }
    },
    mounted: function () {
      this.replyListAjax();
    },
    methods: {
      // 获取列表
      replyListAjax: function () {
        var self = this;
        self.loading = true;
        var method = "reply/getReplyListByScene";
        var  param = JSON.stringify({
            "companyId": 61,
            "id": this.replyid,
            "sceneType": this.scenetype,
        });
        var successd = function (res) {
          self.replyList = res.data.data.result;
          self.commUser = res.data.data.commUser;
          for(var i=0;i<self.replyList.length;i++){
              self.replyList[i].bgC = Util.noHeadImage[self.replyList[i].lastLetter] || "";
          }
          // 清空数据
          self.replyCon = '';
          self.replyCons = '';
          self.loading = false;
        }
        self.$http(method,param,successd);
        // this.$ajax.post(Util.url,
        //   'method=reply/getReplyListByScene'
        //   + '&param=' + JSON.stringify({
        //     "companyId": 61,
        //     "id": this.replyid,
        //     "sceneType": this.scenetype,
        //   })
        // ).then(function (res) {
        //   self.replyList = res.data.data.result;
        //   // 清空数据
        //   self.replyCon = '';
        //   self.replyCons = '';
        //   self.loading = false;
        // }).catch(function (err) {
        //   self.loading = false;
          
        //   console.log(err);
        // });
      },
      // 查看回复
      replyClick: function (id) {
        if (this.replyShow == id) {
          this.replyShow = 0;
        } else {
          this.replyShow = id;
        }
      },
      // 添加回复
      replySubmit: function (id, userid) {
        var self = this;
        self.loading = true;
        if (id) {
          var replyCon = self.replyCons;
          var receiveUid = userid;
          var replyPid = id;
          self.replyShow = 0;
        } else {
          var replyCon = self.replyCon;
          var receiveUid = self.userId;
          var replyPid = '';
        }
        if(replyCon == ""){
          self.$message.error('回复内容不能为空!');
          self.loading = false;
          return;
        }
        var method = "reply/addReply",
            param = JSON.stringify({
              "companyId": 61,
              "userId": 64660,
              "sceneType": self.scenetype,
              "replyPid": replyPid,
              "pid": self.replyid,
              "pidUid": self.userId,
              "receiveUid": receiveUid,
              "replyCon": replyCon,
            }),
            successd = function (res) {
              self.replyListAjax();
              self.loading = false;
              self.$message({
                message: '回复成功',
                type: 'success'
              });
            };
        self.$http(method,param,successd);
        // this.$ajax.post(Util.url,
        //   'method=reply/addReply'
        //   + '&param=' + JSON.stringify({
        //     "companyId": 61,
        //     "userId": 64660,
        //     "sceneType": self.scenetype,
        //     "replyPid": replyPid,
        //     "pid": self.replyid,
        //     "pidUid": self.userId,
        //     "receiveUid": receiveUid,
        //     "replyCon": replyCon,
        //   })
        // ).then(function (res) {
        //   self.replyListAjax();
        //   self.loading = false;
        //   self.$message({
        //     message: '回复成功',
        //     type: 'success'
        //   });
        // }).catch(function (err) {
        //   self.loading = false;
          
        //   console.log(err);
        // });
      },
      // 撤回回复
      replyDel: function (id,userId) {
        var self = this;
        self.loading = true;
        var method = "reply/cancelReply",
            param = JSON.stringify({
              "companyId": 61,
              "id": id,
              "replyUid":userId
            }),
            successd = function (res) {
              self.replyListAjax();
              self.loading = false;
              self.$message({
                message: '撤回成功',
                type: 'success'
              });
            };
          self.$http(method,param,successd);
        // this.$ajax.post(Util.url,
        //   'method=reply/cancelReply'
        //   + '&param=' + JSON.stringify({
        //     "companyId": 61,
        //     "id": id,
        //   })
        // ).then(function (res) {
        //   self.replyListAjax();
        //   self.loading = false;
        //   self.$message({
        //     message: '撤回成功',
        //     type: 'success'
        //   });
        // }).catch(function (err) {
        //   self.loading = false;
          
        //   console.log(err);
        // });
      }
    }
  }

</script>
<style>
  #reply {
    background-color: #eef1f6;
    padding: 15px;
  }
  
  #reply div {}
  
  .reply_top {
    padding: 0 75px 0 60px;
    position: relative;
  }
  
  .reply_top_header {
    height: 36px;
    line-height: 36px;
    width: 36px;
    background: #2C3E50;
    color: #fff;
    text-align: center;
    margin-right: 15px;
    position: absolute;
    left: 0;
    top: 0;
    -moz-border-radius: 50%; 
    -webkit-border-radius: 50%; 
    border-radius: 50%;
  }
  
  .reply_top_btn {
    position: absolute;
    right: 0;
    top: 0;
  }
  
  .reply_item_con {
    margin-top: 10px;
    padding-left: 60px;
    position: relative;
  }
  
  .reply_item_con_header {
    height: 36px;
    line-height: 36px;
    width: 36px;
    background: #84d1d9;
    color: #fff;
    text-align: center;
    margin-right: 15px;
    float: left;
    margin-top: 6px;
    -moz-border-radius: 50%; 
    -webkit-border-radius: 50%; 
    border-radius: 50%;
    position: absolute;
    top:0;
    left:0;
    overflow: hidden;
  }
  .reply_item_con_header img{
    width: 100%;
    height: 100%;
  }
  
  .reply_item_con_name {
    color: #5aa2e7;
    line-height: 24px;
  }
  
  .reply_item_con_top,
  .reply_item_con_time {
    line-height: 24px;
    word-wrap: break-word;
  }
  
  .reply_item_con_btns {
    float: right;
    height: 24px;
    line-height: 24px;
  }
  
  .reply_item_con_btns .el-button {
    padding: 0px;
    line-height: 24px;
  }
  
  .reply_item_con_reply {
    padding: 0 75px 0 51px;
    position: relative;
    margin-top: 10px;
  }
  
  .reply_item_con_reply_btn {
    position: absolute;
    right: 0;
    top: 0;
  }
  .reply_item_con_receiveName{
    color: #5aa2e7;
  }
</style>