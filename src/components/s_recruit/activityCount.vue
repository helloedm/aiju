<template>
  <div class="activityCount">
      <div class="countTop">
          <div class="countBeard">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item v-if="recomType==1" :to="{ path: '/ATS/recommendList?recomType=1' }">企业内推</el-breadcrumb-item>
                <el-breadcrumb-item v-if="recomType==2" :to="{ path: '/ATS/recommendList?recomType=2' }">人才捕手</el-breadcrumb-item>
                <el-breadcrumb-item>活动统计</el-breadcrumb-item>
            </el-breadcrumb>              
          </div>
        <div class="countTab">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="countContent">
                <el-tab-pane label="推广概览" name="first" class="firstTab">
               
                    <div class="content">
                        <div class="bgImg">
                          <div class="detail">
                            <div class="detail_left">
                                <div class="postNum">
                                    <div>投递人数</div>
                                    <div>{{countList.postTotal}}人</div>
                                </div>
                                <div class="interviewNum">
                                    <div class="num_left">
                                          <div>邀约面试人数</div>
                                    <div>{{countList.inviteTotal}}人</div>
                                    </div>
                                     <div class="num_right">
                                               <div>投递简历悬赏消耗金额</div>
                                    <div>￥{{countList.postRewardTotal}}</div>
                                     </div>
                                   
                                 </div>
                                <div class="interviewNum">
                                   <div class="num_left">
                                          <div>录用人数</div>
                                    <div>{{countList.offerTotal}}人</div>
                                    </div>
                                     <div class="num_right">
                                               <div>入职悬赏消耗金额</div>
                                    <div>￥{{countList.entryRewardTotal}}</div>
                                     </div>
                                </div>
                            </div>
                            <div class="detail_right">
                                <div class="rate">
                                    面试转化率：{{countList.mianshiConversion}} 获得简历成本{{countList.resumePrimeCost}}元
                                </div>
                                <div class="base">获得人员成本{{countList.employeePrimeCost}}元</div>
                                <div class="sucRate">录用率：{{countList.hireConversion}}</div>
                            </div>
                        </div>
                        </div>

                    </div>
                    </el-tab-pane>
                <el-tab-pane label="活动明细" name="second" class="secondTab">

                     <div class="content2">
                         <div class="text"><span class="num">推广总人数：{{totalCount}}人</span><span class="price">推广奖励金额：{{totalReward}}元</span></div>
                         <div class="detailTbale">
                            <el-table
                            :data="countTableList"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="推广者姓名"
                               >
                            </el-table-column>
                            <el-table-column
                                prop="weixinNick"
                                label="推广者微信昵称"
                                width="120"
                                show-overflow-tooltip
                               >
                            </el-table-column>
                            <el-table-column
                                prop="shareDate"
                                show-overflow-tooltip
                                label="推广日期">
                            </el-table-column>
                            <el-table-column
                                prop="viewCount"
                                label="浏览次数"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="shareCount"
                                label="转发次数"
                              >
                            </el-table-column>
                            <el-table-column
                                prop="postCount"
                               width="120"
                                show-overflow-tooltip
                                label="投递简历次数">
                            </el-table-column>   
                            <el-table-column
                                prop="inviteCount"
                                label="面试数"
                               >
                            </el-table-column>
                            <el-table-column
                                prop="offerCount"
                                label="录取数"
                            >
                            </el-table-column>    
                           <el-table-column
                                prop="entryCount"
                                label="入职数"
                               >
                            </el-table-column>
                            <el-table-column
                                prop="rewardCount"
                                label="推广奖励"
                                show-overflow-tooltip
                                 >
                            </el-table-column>                                                   
                            </el-table>    
                 <el-pagination
                    class="margin_t_20"
                    @size-change="changePageSize"
                    @current-change="changePageNum"
                    :current-page="config.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="config.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="config.totalCount">
                    </el-pagination>                             
                         </div>
                    </div>
               
                    </el-tab-pane>
            </el-tabs>           
        </div>         
    </div>    
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      recomType: this.$route.query.recomType,
      activeName: "first",

      config: {
        pageSize: 10,
        pageNum: 1,
        processStatus: "1",
        totalCount: 0
      },
      countList: {},
      countTableList: [],
      totalCount: "",
      totalReward: ""
      // "postTotal": 0,             //投递人数
      // "inviteTotal": 0,           //邀约面试人数
      // "offerTotal": 0,            //录用人数
      // "postRewardTotal": "0.00",  //投递简历悬赏消耗金额
      // "entryRewardTotal": "0.00", //入职悬赏消耗金额
      // "mianshiConversion": "0.0%",//面试转化率
      // "hireConversion": "0.0%",   //录用率
      // "resumePrimeCost": 0,       //获得简历成本
      // "employeePrimeCost": 0      //获得人员成本
    };
  },
  methods: {
    handleClick() {},
    changePageSize(pageSize) {
      var self = this;
      self.config.pageSize = pageSize;
      self.config.pageNum = 1;
      self.getActivityDetailList();
    },
    changePageNum(pageNum) {
      var self = this;
      self.config.pageNum = pageNum;
      self.getActivityDetailList();
    },
    getRecommendOverview() {
      var _this = this;
      var method = "positionRecommend/getRecommendOverview";
      var param = JSON.stringify({
        activityId: _this.id
        //  activityId: 20
      });
      var successd = function(res) {
        if (res.data.code == 0) {
          if (res.data.code == 0) {
            _this.countList = res.data.data;
          }
        }
      };
      _this.$http(method, param, successd);
    },
    getActivityDetailList() {
      var _this = this;
      var method = "positionRecommend/getActivityDetailList";
      var param = JSON.stringify({
        activityId: _this.id,
    //    activityId: 20,
        pageSize: this.config.pageSize,
        pageNum: this.config.pageNum,       
      });
      var successd = function(res) {
        if (res.data.code == 0) {
          if (res.data.code == 0) {
            _this.countTableList = res.data.data.list;
            _this.totalCount = res.data.data.totalCount;
            _this.totalReward =(res.data.data.totalReward).toFixed(2);
            _this.config.pageSize = res.data.data.page.pageSize;
            _this.config.pageNum = res.data.data.page.pageNum;
            _this.config.totalCount = res.data.data.page.totalCount;
          }
        }
      };
      _this.$http(method, param, successd);
    }
  },
  mounted() {
    this.getRecommendOverview();
    this.getActivityDetailList();
  }
};
</script>
<style lang="less" scoped>
.activityCount {
  .countTop {
    height: 40px;
    background: #ffffff;
    padding-top: 14px;
    .countBeard {
      padding-left: 15px;
    }
    .countTab {
      margin-top: 14px;
      .countContent {
        height: 550px;
        .firstTab{
            background: #fff;
        }
        .secondTab{
            background: #fff;
        }
        .content {
          width: 1010px;
          background: #fff;
          height: 553px;
          padding: 21px 0 0 18px;
          position: relative;
          z-index: 1000;
          .bgImg {
            position: relative;
            height: 219px;
            width: 100%;
            background: url(../../images/count.png)no-repeat;
            background-size: 97%;
            z-index: -100;
            .detail {
              .detail_left {
                position: absolute;
                width: 300px;
                height: 219px;
                top: 0;
                left: 0;
                padding-left: 20px;
                color: #475669;
                font-size: 14px;
                div {
                  display: flex;
                  height: 65px;
                  flex-direction: column;
                  justify-content: center;
                }
                .interviewNum {
                  display: flex;
                  flex-direction: row;
                  .num_left {
                    flex: 1;
                  }
                  .num_right {
                    flex: 1;
                  }
                }
              }
              .detail_right {
                position: relative;
                width: 219px;
                height: 219px;
                float: right;
                .rate {
                  position: absolute;
                  left: 27px;
                  width: 127px;
                  height: 40px;
                  top: 50px;
                  color: #475669;
                }
                .base {
                  position: absolute;
                  bottom: 58px;
                  left: 10px;
                }
                .sucRate {
                  position: absolute;
                  right: 0;
                  top: 50%;
                  left: 49%;
                }
              }
            }
          }
          .text {
            font-size: 14px;
            color: #606266;
            margin-bottom: 20px;
            .num {
              margin-right: 20px;
            }
          }
        }
        .content2 {
          background: #fff;
          min-height: 553px;
          padding: 21px 18px 18px 18px;
          position: relative;
          z-index: 1000;
          .bgImg {
            position: relative;
            height: 219px;
            width: 100%;
            background: url(../../images/count.png)no-repeat center;
            background-size: contain;
            z-index: -100;
            .detail {
              .detail_left {
                position: absolute;
                display: flex;
                width: 300px;
                height: 219px;
                top: 0;
                left: 0;
                padding-left: 20px;
                color: #475669;
                font-size: 14px;
                div {
                  display: flex;
                  flex: 1;
                  flex-direction: column;
                  justify-content: center;
                }
                .interviewNum {
                  display: flex;
                  flex-direction: row;
                  .num_left {
                    flex: 1;
                  }
                  .num_right {
                    flex: 1;
                  }
                }
              }
              .detail_right {
                position: relative;
                width: 219px;
                height: 219px;
                float: right;
                .rate {
                  position: absolute;
                  left: 27px;
                  width: 127px;
                  height: 40px;
                  top: 50px;
                  color: #475669;
                }
                .base {
                  position: absolute;
                  bottom: 58px;
                  left: 10px;
                }
                .sucRate {
                  position: absolute;
                  right: 0;
                  top: 50%;
                  left: 49%;
                }
              }
            }
          }
          .text {
            font-size: 14px;
            color: #606266;
            margin-bottom: 20px;
            .num {
              margin-right: 20px;
            }
          }
          .detailTbale {
          }
        }        
        .el-tabs__content {
          background: #fff;
        }
      }
    }
  }
  .countBottom {
    height: 553px;
    margin-top: 20px;
  }
}
</style>

