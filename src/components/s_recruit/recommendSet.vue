<template>
  <div id="recommend_set">
    <ul class="header_course clearfix">
      <li :class="{'active':active==1,'active2':active==2}">
        <i class="iconfont header_icon">&#xe770;</i>
        <p :class="{'color_5aa2e7':active==2}">活动设置</p>
      </li>
      <li :class="{'active':active==2}">
        <i class="el-icon-arrow-right"></i>
        <i class="iconfont header_icon">&#xe770;</i>
        <p>职位设置</p>
      </li>
      <li>
        <i class="el-icon-arrow-right"></i>
        <i class="iconfont header_icon">&#xe770;</i>
        <!-- <h3>3</h3> -->
        <p>完成</p>
      </li>
    </ul>
    <div class="recommend_con">
      <!-- 第一步 -->
      <el-form :model="form" ref="form" label-width="250px" v-if="active==1">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" class="input_w_360" placeholder="请给您的活动添加一个活动名称(20字以内)" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="上传banner">
          <p class="reminder">建议上传图片尺寸750px*350px 最大2M,支持jpg/gif/png格式 </p>
          <div class="avatar-uploader" :class="{'border_color_fff':form.picUrl}">
            <div class="el-upload"  @click="showImgUploadclick">
              <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="奖励设置" v-if="recomType==1">
          <el-checkbox v-model="form.rewardSetArray" :label="1">投递拿红包<p class="award">投递拿红包：仅限公司员工推荐人才并且HR进行确认才能领红包</p></el-checkbox><br>
          <el-checkbox v-model="form.rewardSetArray" :label="2">入职拿红包<p class="award">入职拿红包：仅限公司员工推荐的人才成功成为正式员工才能获得红包，该红包金额根据公司不同自己设置，该红包发放为HR线下发放</p></el-checkbox>
        </el-form-item>
        <el-form-item label="奖励设置" v-else>
          <el-checkbox v-model="form.rewardSetArray" :label="1">投递拿红包<p class="award">投递拿红包：分享者成功推荐人才并且HR进行确认才能领红包；</p></el-checkbox><br>
          <el-checkbox v-model="form.rewardSetArray" :label="2">入职拿红包<p class="award">入职拿红包：分享者成功推荐的人才成功成为正式员工才能获得红包，该红包金额根据公司不同自己设置，该红包发放为HR线下发放</p></el-checkbox>
        </el-form-item>
        <h2 class="headline">分享内容</h2>
        <el-form-item label="标题">
          <el-input placeholder="分享标题(20字以内)" class="input_w_360" :maxlength="20" v-model="form.shareTitle"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input placeholder="分享描述(20字以内)" class="input_w_360" :maxlength="20" v-model="form.shareDesc"></el-input>
        </el-form-item>
        <h2 class="headline">title-页面标题</h2>
        <el-form-item label="页面标题">
          <el-input placeholder="请输入页面标题" class="input_w_360" :maxlength="12" v-model="form.pageTitle"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>

      <!-- 第二步 -->
      <div v-if="active==2">
        <el-button type="primary" icon="plus" @click="addPositionShow=true">添加职位</el-button>
        <el-button type="primary" icon="plus" @click="elDialog=true" :disabled="multipleSelection.length==0">红包设置</el-button>
        <el-table :data="tableData" style="width:100%;margin-top:20px;" border  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="positionName" label="职位名称"></el-table-column>
          <el-table-column prop="isUrgent" label="是否急招"></el-table-column>
          <el-table-column prop="postReward" label="投递拿红包(元)">
            <template scope="scope">
              <span v-if="form.rewardSetArray.indexOf(1) !=-1">{{scope.row.postReward}}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column prop="entryReward" label="入职拿红包(元)">
            <template scope="scope">
              <span v-if="form.rewardSetArray.indexOf(2) !=-1">{{scope.row.entryReward}}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type='text' @click="delActivityPosition(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          style="margin-top:20px"
          v-if="page.totalCount!=0"
          @current-change="getActivityPositions"
          :total="page.totalCount">
        </el-pagination>
        </div>
        <div style="margin-top:20px">
          <el-button v-if="active==2" @click="active=1">上一步</el-button>
          <el-button v-if="active==2" type="primary" @click="active3">完成</el-button>
        </div>
      </div>

    <!-- 红包设置弹框 -->
    <el-dialog title="红包设置" :visible.sync="elDialog" class="packet">
      <div class="packet_box" v-if="form.rewardSetArray.indexOf(1) !=-1">
        <h3>投递拿红包</h3>
        <el-form label-width="75px" style="padding-left:20px;">
          <el-form-item label="红包类型">
            <el-radio class="radio" v-model="radio" :label="1">固定红包</el-radio>
            <el-radio class="radio" v-model="radio" :label="2">随机红包</el-radio>
          </el-form-item>
          <el-form-item label="红包金额" v-if="radio==1">
            <el-input style="width:90px;margin-right:5px;" v-model="postRewardFixed"></el-input>元
          </el-form-item>
          <el-form-item label="红包金额" v-if="radio==2">
            <el-input style="width:90px;margin-right:5px;" v-model="postRewardRandom1"></el-input>-
            <el-input style="width:90px;margin-right:5px;" v-model="postRewardRandom2"></el-input>元
          </el-form-item>
        </el-form>
        <p class="explain_con3">每个红包金额均为上方填写的金额，最小金额不低于1元，最大金额不高于 200元（包括最大值和最小值）</p>
      </div>
      <div class="packet_box packet_box2" v-if="form.rewardSetArray.indexOf(2) !=-1">
        <h3>入职拿红包</h3>
        <el-form label-width="75px" style="padding-left:20px;">
          <el-form-item label="红包金额">
            <el-input style="width:90px;margin-right:5px;" v-model="entryReward"></el-input>元
          </el-form-item>
        </el-form>
      </div>
      <el-form label-width="75px">
        <el-form-item label="微信风控">
          <p class="explain_con1 explain_con explain_con2">风控已开启，无法关闭</p>
          <p class="explain_con">微信官方会进行风险控制，针对微信小号、僵尸号、机器号等的拦截，可能出现<span>个别微信号无法领取</span>的情况</p>
        </el-form-item>
        <el-form-item label="领取说明">
          <p class="explain_con explain_con1">红包发放后，若24小时内粉丝未领取，红包金额将返还至红包余额。您可在 红包余额明细中查看。</p>
          <p class="explain_con">红包返还信息，由于结算核对和网络原因可能会存在一定的延迟。</p>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="elDialog=false">取消</el-button>
        <el-button type="primary" @click="setRewardMoney">确定</el-button>
      </div>
    </el-dialog>

    <!-- 图片裁剪 -->
    <img-upload :height="420" v-model="showImgUpload" @remove="remove" :width="750" @back="backUrl"></img-upload>

    <!-- 添加职位 -->
    <el-dialog title="提示" :visible.sync="addPositionShow" class="positionShow">
      <el-transfer
        v-model="value3"
        filterable
        :titles="['未选择', '已选择']"
        :data="data">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPositionShow = false">取 消</el-button>
        <el-button type="primary" @click="addActivityPosition">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import imgUpload from "../imgUpload"
export default {
  name:'recommendSet',
  data(){
    return{
      form:{
        input:'',
        rewardSetArray:[1],
        name:'',
        picUrl:null,
        shareTitle:'',
        shareDesc:'',
        pageTitle:this.$route.query.recomType==1?'企业内推':'人才捕手'
      },
      active:1,
      tableData:[],
      elDialog:false,
      radio:2,
      showImgUpload:false,
      id:this.$route.query.id,
      recomType:this.$route.query.recomType,
      imageUrl:null,
      page:{
        pageNum:1,
        pageSize:10,
        totalCount:0
      },
      positionList:[],
      addPositionShow:false,
      data:[],
      value3:[],
      multipleSelection:[],
      postRewardFixed:"",
      postRewardRandom1:'',
      postRewardRandom2:'',
      entryReward:''
    }
  },
  mounted(){
    if(this.id){
      this.getActivity();
      this.getActivityPositions();
    }else{
      this.getShareDemo();
    }
    this.getPosistionList();
  },
  methods:{
    showImgUploadclick(){
      this.showImgUpload=true;
    },
    remove(){
      this.showImgUpload=false;
    },
    backUrl(url){
      this.form.picUrl=url;
    },
    getActivity(){
      var self=this;
      var method="positionRecommend/getActivity",
          param=JSON.stringify({
            activityId:self.id
          }),
          successd=function(res){
            self.form=res.data.data;
          };
      self.$http(method,param,successd);
    },
    updateActivity(){
      var self=this;
      self.form.activityId=self.id;
      self.form.rewardSet=self.form.rewardSetArray.join();
      var method="positionRecommend/updateActivity",
          param=JSON.stringify(self.form),
          successd=function(res){
            self.active=2;
          };
      self.$http(method,param,successd);
    },
    getActivityPositions(val){
      var self=this;
      if(val){
        self.page.pageNum=val;
      }
      var method="positionRecommend/getActivityPositions",
          param=JSON.stringify({
            activityId:self.id,
            pageNum:self.page.pageNum,
            pageSize:self.page.pageSize
          }),
          successd=function(res){
            console.log(res.data.data);
            let arr=[];
            res.data.data.positionList.forEach((item)=>{
              arr.push(item.id);
            })
            self.tableData=res.data.data.positionList;
            self.value3=arr;
            self.page=res.data.data.page;
            // self.getPosistionList();
          };
      self.$http(method,param,successd);
    },
    getPosistionList(){
      var self=this;
      var method="positionRecommend/getPosistionList",
          param=JSON.stringify({}),
          successd=function(res){
            let arr=[];
            res.data.data.forEach(function(item){
              item.key=item.id;
              item.label=item.name;
              self.value3.forEach(function(item2){
                if(item.id==item2){
                  arr.push(item2);
                }
              })
            })
            self.value3=arr;
            self.data=res.data.data;
          };
      self.$http(method,param,successd);
    },
    addActivityPosition(){
      var self=this;
      var method="positionRecommend/addActivityPosition",
          param=JSON.stringify({
            activityId:self.id,
            positionIds:self.value3.join()
          }),
          successd=function(res){
            self.addPositionShow=false;
            self.getActivityPositions();
          };
      self.$http(method,param,successd);
    },
    delActivityPosition(id){
      var self=this;
      var method="positionRecommend/delActivityPosition",
          param=JSON.stringify({activityId:self.id,positionIds:id}),
          successd=function(res){
            self.getActivityPositions();
          };
      self.$http(method,param,successd);
    },
    handleSelectionChange(s){
      let arr=[];
      s.forEach((item)=>{
        arr.push(item.id);
      })
      this.multipleSelection=arr;
    },
    setRewardMoney(){
      var self=this;
      var method="positionRecommend/setRewardMoney",
          param=JSON.stringify({
            activityId:self.id,
            positionIds:self.multipleSelection.join(),
            postRewardType:self.radio,
            postRewardFixed:self.postRewardFixed,
            postRewardRandom:self.postRewardRandom1+'~'+self.postRewardRandom2,
            entryReward:self.entryReward
          }),
          successd=function(res){
            self.elDialog=false;
            self.getActivityPositions();
          };
      self.$http(method,param,successd);
    },
    //创建活动
    createActivity(){
      var self=this;
      var method="positionRecommend/createActivity",
          param=JSON.stringify({
            recomType:self.recomType,
            name:self.form.name,
            picUrl:self.form.picUrl,
            rewardSet:self.form.rewardSetArray.join(),
            shareTitle:self.form.shareTitle,
            shareDesc:self.form.shareDesc
          }),
          successd=function(res){
            self.active=2;
            self.id=res.data.data;
            this.getActivityPositions();
            this.getPosistionList();
          };
      self.$http(method,param,successd);
    },
    next(){
      if(this.id){//修改
        this.updateActivity();
      }else{
        this.createActivity();
      }
    },
    active3(){
      this.$router.push({name:'recommendList',query:{recomType:this.recomType}});
    },
    getShareDemo(){
      var self=this;
      var method="positionRecommend/getShareDemo",
          param=JSON.stringify({}),
          successd=function(res){
            self.form.shareTitle=res.data.data.shareTitle;
            self.form.shareDesc=res.data.data.shareDesc;
            console.log(self.form);
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    imgUpload
  },
  watch:{
    // active(newV,old1){
    //   if(newV==1){//第一步
    //     this.getActivity();
    //   }else if(newV==2){//第二步
    //     this.getActivityPositions();
    //   }
    // }
  }
}
</script>
<style scoped>
.header_course{background-color: #fff;box-shadow: 0 0 1px 0 #ddd;}
.header_course li{width: 240px;height: 54px;float:left;text-align: center;line-height: 54px;position: relative;}
.header_course>li>h3{display: inline-block;width: 20px;height: 20px;border-radius: 50%;text-align: center;line-height: 20px;border:2px solid #909399;color:#909399;}
.header_course>li>p{display: inline-block;margin-left:10px;color: #909399;font-size: 16px;}
.header_icon{color:#909399;}
.header_course li.active p{color: #303133;}
.header_course li.active .header_icon{border-color: #303133;color: #303133;}
.header_course li.active2 .header_icon{color: #5aa2e7;;}
.header_course li.active2 p{border-color: #303133;color: #5aa2e7;}
.el-icon-arrow-right{color:#C0C4CC;position: absolute;left: 0;top: 50%;font-size: 18px;margin-top:-9px;}
.recommend_con{background-color: #fff;margin-top:20px;box-shadow: 0 0 1px 0 #ddd;padding:20px;}
.reminder{font-size: 12px;color: #99A9BF;}
.el-upload{width:215px;height: 120px;border: 1px dashed #d9d9d9;line-height: 120px;}
.border_color_fff .el-upload {border-color: #fff;}
.award{display: inline-block;width: 350px;margin-left:20px;font-size: 12px;color:#475669;word-wrap:break-word;white-space:normal;vertical-align: top;line-height: 20px;}
.headline{width:238px;color: #1F2D3D;text-align: right;font-size: 16px;margin-bottom: 20px;}
.packet_box{border:1px solid #E0E6ED;padding-bottom: 10px}
.packet_box h3{height: 30px;background-color: #eef1f6;line-height: 30px;padding-left: 20px;margin-bottom:10px;}
.packet_box p{padding:10px 27px 0px 42px;font-size: 12px;}
.packet_box2{margin-top:10px;margin-bottom:20px;}
.explain_con{line-height: 20px;}
.explain_con1{margin-top:8px;}
.explain_con span{color:#ff4949;}
.explain_con2{padding-left:20px;background: url(./../../images/recruit/wexin_01.png) no-repeat left ;}
.explain_con3 {background: url(./../../images/recruit/wexin_02.png) no-repeat 23px 10px;}
.avatar{width: 215px;height: 120px;}
.header_icon{font-size: 22px;line-height: 20px;display: inline-block;vertical-align: middle;}
</style>
<style>
.packet .el-dialog{width:500px;}
.positionShow .el-dialog{width:auto;}
</style>



