<template>
  <div class="hrm_module">
    <div id="content" class="hrm_module_con">
      <div class="left_btn">
        <el-button :disabled="multipleSelection.length != 1" @click="edit()" type="primary">
          <i class="el-icon-edit"></i>
          <span>修改</span>
        </el-button>
        <el-button :disabled="multipleSelection.length == 0" @click="deleteBtn()" type="primary">
          <i class="el-icon-delete"></i>
          <span>删除</span>
        </el-button>

        <!-- <el-button :disabled="multipleSelection.length == 0" @click="setPrice()" type="primary">
          <i class="iconfont" style="font-size: 14px">&#xe624;</i>
          <span>设置奖励</span>
        </el-button> -->
        <el-button :disabled="multipleSelection.length !=1" @click="copyPosition()" type="primary">
          <i class="iconfont" style="font-size: 14px">&#xe65c;</i>
          <span>复制职位</span>
        </el-button>        
        <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom"
                                                                                            :class="{'el-icon-caret-top':gjSearchCon}"></i>
        </el-button>
        <!-- <el-input v-model="character.value"
          class="search_usercare"
          @keyup.enter.native="search()"
          @blur="search()" placeholder="输入工作年限、应聘职位、学历等搜索" icon="search"></el-input> -->
        <el-input placeholder="输入关键词" v-model="character.value" style="width: 350px; float: right;"
                  @keyup.enter.native="search()"
                  @blur="search()">
          <el-select v-model="character.type" slot="prepend" @blur="search()" placeholder="请选择" style="width: 105px;">
            <el-option label="职位名称" value="1"></el-option>
            <el-option label="创建人" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>

      <div class="hrm_module_search" v-show="gjSearchCon">
        <el-form :model="recruitPosition" label-width="100px" class="clearfix">
          <el-form-item label="职位分类" prop="categoryId" style="display: inline-block; width: 300px; ">
            <el-select v-model="recruitPosition.categoryId">
              <el-option v-for="item in positionNameList" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建日期" prop="categoryId" style="display: inline-block;">
            <el-date-picker
              v-model="recruitPosition.startDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-date-picker
              v-model="recruitPosition.endDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作城市" prop="workCity">
            <el-cascader
              expand-trigger="hover"
              :options="workCityLists"
              v-model="recruitPosition.workCityArr"
              change-on-select
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetAdvancedSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        ref="multipleTable"
        :data="positionList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        class="table-fixed"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          select="selectChange">
        </el-table-column>
        <el-table-column
          prop="positionName"
          width="170"
          label="职位名称"
          class="pos"
          class-name="text-align_left"
        >
          <template scope="scope">
            <a href="javascript:;" @click="getDetail(scope.row)">
                <el-tag type="danger" class="tips" v-if="scope.row.isUrgent == '1'">{{ scope.row.isUrgent  | urgentFilter }}</el-tag>
                <span style="margin-left:34px;">{{ scope.row.positionName }}</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="posiEndDate"-->
          <!--label="截止日期">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="categoryName"
          label="职位分类">
        </el-table-column>
        <el-table-column
          prop="creatorName"
          label="创建人">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="updateDate"-->
          <!--label="更新日期">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="workCity"
          label="地区">
        </el-table-column>
        <el-table-column
          prop="zhaopinNum"
          label="招聘人数">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.zhaopinNum | numFilter }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="isUrgent"-->
          <!--label="是否急招">-->
          <!--<template scope="scope">-->
            <!--<span style="margin-left: 10px">{{ scope.row.isUrgent | isUrgentFilter }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!-- <el-table-column
         prop="yingPinNum"
         label="应聘人数">
          <template scope="scope">
           <a href="javascript:;" @click="jump(scope.row)">{{ scope.row.yingPinNum }}</a>
         </template>
       </el-table-column> -->
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

    <el-dialog
      title="红包规制设置"
      :visible.sync="priceVisible"
      width="30%"
      class="priceDialog"
    >
      <div class="main">
        <div>红包类型：固定红包</div>
          <div class="count">
            <p class="priceNum">红包金额：</p>
            <div class="digital-counter-new">
              <div class="u-counter">
                <!--<a href="javascript:;" class="u-btn" @click="increasePrice">-</a>-->
                <span class="tot">
                  <input type="number" v-model="recruitPosition.rewardAmount">
                </span>
                <!--<a href="javascript:;" class="tot-btn" @click="addPrice">+</a>-->
              </div>
            </div>
            <p class="priceNum">&nbsp;&nbsp; 元 &nbsp;&nbsp;<span>（红包金额应该在1-200之间）</span></p>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="priceVisible = false">取 消</el-button>
      <el-button type="primary" @click="setSuccess">确 定</el-button>
    </span>
    </el-dialog>

  </div>
</template>
<script>

  import allcity from '../../script/allcity';

  export default {
    name: 'publishList',
    data(){
      return {
        workCity: '',
        recruitPosition: {
          pageNum: '',	//是	int	页码
          pageSize: '',//	是	int	每页大小
          positionName: '',//	否	string	职位名称
          creatorName: '',//	否	string	职位创建人
          categoryId: '',//	否	int	职位分类id
          startDate: '',//	否	string	创建日期 起始时间
          endDate: '',//否	string	创建日期 结束时间
          workCity: '',//	否	string	工作城市,如：杭州
          workCityArr: [],
          isUrgent: '', //是否急招,
          rewardAmount: ''
        },
        workCityLists: [],
        positionNameList: [],//职位名称
        gjSearchCon: false,
        priceVisible: false,
        positionIdList: [],
        config: {
          pageSize: 10,
          pageNum: 1,
          processStatus: '1',
          totalCount: 0
        },
        character: {
          type: '1',
          value: ''
        },
        positionList: [],
        multipleSelection: [],
        newPosition:true
      }
    },
    methods: {
      transitionWork(){
        let provinces = allcity.province,
          citys = allcity.city;
        for (let j = 0; j < provinces.length; j++) {
          let item = provinces[j]
          item.value = item.name
          item.label = item.name
          item.children = citys[item.id]
        }
        for (let k in citys) {
          let city = citys[k]
          for (let i = 0; i < city.length; i++) {
            let item = city[i]
            item.value = item.name
            item.label = item.name
          }
        }
        this.workCityLists = provinces;
      },
      getDetail(row){
        this.$router.push({path: 'detail', query: {id: row.id}});
      },
      jump(row){
        if (row.interviewerIds) {
          this.$router.push({name: 'newResume', query: {'interviewerIds': row.interviewerIds}});
        }
      },
      getPositionCategoryList(){
        let methods = 'recruitPosition/getPositionCategoryList',
          param = JSON.stringify({}),
          self = this,
          successd = function (res) {
            self.positionNameList = res.data.data;
          }
        this.$http(methods, param, successd)
      },
      handleChange(val){
        this.recruitPosition.workCity = val[1];
      },
      edit(){
        let id = this.multipleSelection[0].id;
        this.$router.push({path: 'post', query: {id: id}});
      },
      copyPosition(){
       let id = this.multipleSelection[0].id;
        this.$router.push({
          name:'publishPosition',
          path: 'post',
          query: {id: id},
          params:{
            newPosition:this.newPosition
          }
         });  
      },
      search(){
        this.recruitPosition.positionName = '';
        this.recruitPosition.creatorName = '';
        if (this.character.type == '1') {
          this.recruitPosition.positionName = this.character.value
        } else if (this.character.type == '2') {
          this.recruitPosition.creatorName = this.character.value
        }
        let method = 'recruitPosition/getPositionListByCondition',
          self = this,
          param = JSON.stringify({
            pageSize: this.config.pageSize,
            pageNum: this.config.pageNum,
            positionName: this.recruitPosition.positionName,
            creatorName: this.recruitPosition.creatorName,
            categoryId: this.recruitPosition.categoryId,
            startDate: this.$date(this.recruitPosition.startDate),
            endDate: this.$date(this.recruitPosition.endDate),
            workCity: this.recruitPosition.workCity,
            isUrgent: this.recruitPosition.isUrgent,
            rewardAmount: this.recruitPosition.rewardAmount
          }),
          successd = function (res) {
            console.log(res.data)
            self.positionList = self.$tableNull(res.data.data.positionList);
            self.positionList.isUrgent = res.data.data.positionList.isUrgent
            self.config.totalCount = res.data.data.page.totalCount;
          }
        this.$http(method, param, successd);
      },
      deleteBtn() {

        let str = '';
        for (var i = 0; i < this.multipleSelection.length; i++) {
          str += this.multipleSelection[i].id;
          str = this.multipleSelection.length - 1 > i ? str + ',' : str;
        }
        let self = this;
        self
          .$confirm("确认删除该职位, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            let method = 'recruitPosition/batchDeletePosition',
              self = this,
              param = JSON.stringify({
                ids: str
              }),
              successd = function (res) {
                self.search();
              }
            this.$http(method, param, successd);
          })
          .catch(() => {});          
      },
      setPrice(){
        this.priceVisible = true
      },
      setSuccess(){
        var _this = this;
        if (_this.recruitPosition.rewardAmount <= 0 || _this.recruitPosition.rewardAmount >=200) {
          _this.$message({
            showClose: true,
            message: '红包金额应该在1-200之间'
          });
          _this.recruitPosition.rewardAmount = ''
          return;
        }
        var method = "recruitPosition/setRedEnvelopes";
        var param = JSON.stringify({
          positionIdList: String(_this.positionIdList),
          rewardAmount: _this.recruitPosition.rewardAmount
        });
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.priceVisible = false
            _this.search()
          }
        }
        _this.$http(method, param, successd);
      },
      increasePrice(){
        if (this.recruitPosition.rewardAmount <= 0) {
          return
        }
        this.recruitPosition.rewardAmount--
      },
      addPrice(){
        this.recruitPosition.rewardAmount++
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.positionIdList = this.fileterSelect(val)
      },
      fileterSelect(item) {
        let arr = []
        for (var i = 0; i < item.length; i++) {
          arr[i] = item[i].id
        }
        return arr
      },
      changePageSize(pageSize){
        var self = this;
        self.config.pageSize = pageSize;
        self.config.pageNum = 1;
        this.search();
      },
      changePageNum(pageNum){
        var self = this;
        self.config.pageNum = pageNum;
        this.search();
      },
      resetAdvancedSearch(){
        this.recruitPosition = {
          pageNum: '',	//是	int	页码
          pageSize: '',//	是	int	每页大小
          positionName: '',//	否	string	职位名称
          creatorName: '',//	否	string	职位创建人
          categoryId: '',//	否	int	职位分类id
          startDate: '',//	否	string	创建日期 起始时间
          endDate: '',//否	string	创建日期 结束时间
          workCity: '',//	否	string	工作城市,如：杭州
          workCityArr: [],
        }
      },
    },
    filters: {
      numFilter: function (value) {
        if (value == "0") {
          value = '不限'
        }
        return value;
      },
      isUrgentFilter: function (value) {
        if (value == "1") {
          value = "是"
        } else {
          value = "否"
        }
        return value;
      },
      urgentFilter:function (value) {
        if(value == "1"){
            value = '急'
        }else {
            value = ''
        }
        return value
      },
      rewardAmountFilter:function (value) {
        if(value == ''){
            value = 0.00
        }
        return value
      }
    },
    mounted(){
      this.getPositionCategoryList();
      this.transitionWork();
      this.search();
      this.$nextTick(()=>{
        setTimeout(() => {
          // document.getElementsByClassName('el-table__fixed')[0].style.height = "100%"; 
          // document.getElementsByClassName('el-table__fixed')[0].style.borderRightStyle = "none";
        }, 1000);
      })
    }
  }
</script>
<style scoped>

  .el-form {
    padding: 10px 10px 15px;
    border: 1px solid #BFCBD9;
    margin-bottom: 20px;
  }

  .gj_search {
    float: right;
  }

  .left_btn {
    margin-bottom: 20px;
  }

  .el-input-group__prepend, .el-input-group--append .el-input__inner, .el-input-group__prepend {
    width: 90px;
  }
  .hrm_module .priceDialog .main .count {
    margin-top: 17px;
    overflow: hidden;
  }
  .hrm_module .priceDialog .main .tips{
    margin-top: 10px;
  }



  .hrm_module .priceDialog .main .count .priceNum {
    float: left;
    height: 30px;
    line-height: 30px
  }
  .hrm_module .priceDialog .main .count .priceNum span{
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    color: #ccc;
  }
  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter {
    width: 60px;
    height: 30px;
    border: 1px solid #e5e5e5;
    float: left;
    border-left: none;
  }

  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .u-btn {
    float: left;
    width: 34px;
    height: 30px;
    border-left: 1px solid #e5e5e5;
    line-height: 30px;
    text-align: center;
    font-size: 22px;
    color: #475669;
  }

  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot-btn {
    float: left;
    width: 34px;
    height: 30px;
    border-left: 1px solid #e5e5e5;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #475669
  }

  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot {
    float: left;
    width: 59px;
    height: 30px;
    border-left: 1px solid #e5e5e5;
  }


  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot input {
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    height: 30px;
    line-height: 30px;
    text-align: center;
    outline: none
  }
  

</style>

<style>
  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot .el-form-item .el-form-item__content{margin-left: 0!important;}
  .hrm_module .priceDialog .main  .el-form{
    padding: 0!important;
    border: none;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td:nth-child(2){padding-left: 39px;text-align: left!important;}
  .hrm_module .hrm_module_con .el-table .el-table__row td .cell a .tips{
    position: absolute!important;
    /*display: inline-block;*/
    width: 24px;
    height: 24px;
    text-align:center;
    line-height: 24px;
    top: 8px;
    left: 10px;
    font-size: 12px;
    /*background: url(../../images/Urgent.png)no-repeat;*/
    /*background-size: cover;*/
    padding:0;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td .cell a .tips2{
    position: absolute;
    display: inline-block;
    width: 24px;
    height: 24px;
    /*color: #fff;*/
    /*background: red;*/
    /*line-height: 24px;*/
    top: 8px;
    left: 44px;
    font-size: 12px;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td .cell a .el-tag--warning{
    background-color: rgba(247,186,41,.1);
    border-color: #fceddd;
    color: #f2a654;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td .cell a .el-tag--danger{
    border-color: #fee1e1;
    color: #f96868;
  }
</style>


