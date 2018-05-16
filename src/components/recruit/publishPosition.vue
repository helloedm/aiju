<template>
  <div id="mainWrap">
      <ul>
          <li>
              <div class="title">基本信息</div>
              <el-form :model="recruitPosition" :rules="rules" ref="recruitPosition" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="8" :offset="2">
                            <el-form-item label="职位分类" prop="categoryId">
                              <el-input style="width:200px" v-if="customShow" @blur="customSave" ref="customRef" v-model="customModel" placeholder="请输入自定义职位分类"></el-input>
                              <el-select v-model="recruitPosition.categoryId" v-else>
                                <!-- <el-option v-for="item in positionNameList" :label="item.name" :value="item.id" :key="item.id"></el-option> -->
                                  <el-option
                                  v-for="(item,index) in positionNameList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                  <span style="float: left">{{ item.name}}</span>
                                  <span style="float: right; color: #FF4949; font-size: 12px;margin-right:8px;" @click.stop="deleCategory(item.id)" v-if="item.isDefault==2">删除</span>
                                </el-option>
                                <el-option value="-1">自定义分类</el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="职位名称" prop="positionName">
                                <el-input style="width: 200px;" v-model="recruitPosition.positionName"></el-input>
                            </el-form-item>
                            <el-form-item label="职位性质" prop="positionType">
                            <el-radio-group v-model="recruitPosition.positionType">
                                    <el-radio label="1">全职</el-radio>
                                    <el-radio label="2">兼职</el-radio>
                                    <el-radio label="3">实习</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="招聘人数" prop="posiNum">
                                <el-input style="width: 200px;" placeholder="不限" type="text" v-model="recruitPosition.posiNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-form-item id="endTimeSelect" label="结束日期" prop="posiEndDate">
                                <el-date-picker
                                    v-model="recruitPosition.posiEndDate"
                                    type="date"
                                     :picker-options="pickerOptions0"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="工作城市" prop="workCityArray">
                                <el-cascader
                                    expand-trigger="hover"
                                    :options="workCityLists"
                                    v-model="recruitPosition.workCityArray"
                                    change-on-select>
                                </el-cascader>
                            </el-form-item>
                             <el-form-item label="工作地址">
                                <el-input style="width: 200px;" v-model="recruitPosition.workAddress"></el-input>
                            </el-form-item>
                          <el-form-item label="是否急招">
                            <el-checkbox v-model="recruitPosition.isUrgent"></el-checkbox>
                          </el-form-item>
                        </el-col>
                    </el-row>
            </el-form>
          </li>
                  <li>
              <div class="title">职位要求</div>
              <el-form :model="recruitPosition" :rules="rules" label-width="100px" class="demo-ruleForm" ref="recruitPosition2">
                    <el-row :gutter="20">
                        <el-col :span="8" :offset="2">
                            <el-form-item label="工作经验" prop="workYear">
                                <el-select v-model="recruitPosition.workYear">
                                    <el-option v-for="item in opt.workYear" :label="item.label" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                        </el-form-item>
                            <el-form-item label="学历要求" prop="educationRequire">
                                <el-select v-model="recruitPosition.educationRequire">
                                    <el-option v-for="item in opt.education" :label="item.label" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :offset="2">
                            <el-form-item class="need" style="display: inline-block;" label="职位月薪" prop="positionSalaryLowest">
                                <el-input style="width: 95px;" type="number" placeholder="最低" v-model="recruitPosition.positionSalaryLowest">
                                </el-input>
                            </el-form-item>
                            <el-form-item style="display: inline-block" class="positionSalaryHighest" prop="positionSalaryHighest" label-width="10px" label="-">
                                <el-input style="width: 95px;" type="number" placeholder="最高" v-model="recruitPosition.positionSalaryHighest">
                                </el-input>
                            </el-form-item>
                            <el-form-item style="display: inline-block;margin-left: 16px;" label-width="0px">
                              <el-checkbox v-model="recruitPosition.showSalaryType">以K为单位</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col id="positionDesc"  :span="17" :offset="2" style="padding-left:25px;">
                          <span class="need" style="margin-left: 10px;" >职位描述</span>
                          <quill-editor
                          style="margin-top: 20px;"
                          class="quilleditor"
                          :options="editorOption"
                          v-model="recruitPosition.positionDesc"
                          ref="myTextEditor">
                          </quill-editor>
                      </el-col>
                  </el-row>
            </el-form>
          </li>
          <li>
               <el-form :model="recruitPosition" :rules="rules" ref="" label-width="100px" class="demo-ruleForm">
                  <div class="title">其他要求</div>
                    <!-- <el-row>
                        <el-col :span="8" :offset="2" style="margin-top: 20px;">
                            <el-form-item label="接收简历邮箱" prop="receiveEmail" label-width="120px">
                                <el-input v-model="recruitPosition.receiveEmail" placeholder="请输入内容" :disabled="true">></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <el-row>
                       <el-col :span="18" :offset="2" style="margin-top: 20px; padding-left: 20px;">
                        <p>职位福利：选择职位亮点，提升职位吸引力，有效增加职位投递！<span class="red">(最多可以选择8个标签)</span></p>
                        <div class="buttonWrap">
                          <a href="javascript:;" v-for="item in allPositionTags" :key="item.id" class="el-button el-button--small" @click="toggleSelect(item)" :class="{'el-button--success': positionTagIdArray.indexOf(item.id) != '-1'}" type="success">{{ item.name }}</a>
                        </div>
                       </el-col>
                    </el-row>
               </el-form>
          </li>
      </ul>
      <el-button  style="margin: 20px 0 0 10%" type="primary" v-if="id == '-1'|| newPosition" @click="publish()">发布</el-button>
      <el-button style="margin: 20px 0 0 10%" type="primary" v-if="id != '-1'&& !newPosition" @click="editSave()">保存修改</el-button>
      <el-button style="margin: 20px 0 0 10px" type="primary" v-if="id != '-1'" @click="cancle()">取消</el-button>
  </div>
</template>
<script>
import allcity from "../../script/allcity";

export default {
  name: "publishPosition",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!/^[1-9]+\d*$/.test(value)&&value) {
        callback(new Error("请输入正确的招聘人数"));
      } else {
        callback();
      }
    };
    var self = this;
    var positionSalaryLowest = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入月薪范围"));
      } else if (Number(value) < 0) {
        callback(new Error("薪资不能为负数!"));
      } else if (
        Number(value) > Number(self.recruitPosition.positionSalaryHighest) &&
        self.recruitPosition.positionSalaryHighest != ""
      ) {
        callback(new Error("最高月薪不能低于最低月薪!"));
      } else {
        callback();
      }
    };
    var positionSalaryHighest = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入月薪范围"));
      } else if (Number(value) < 0) {
        callback(new Error("薪资不能为负数!"));
      } else if (
        Number(value) < Number(self.recruitPosition.positionSalaryLowest) &&
        self.recruitPosition.positionSalaryLowest != ""
      ) {
        callback(new Error("最高月薪不能低于最低月薪!"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      },
      id: "-1",
      recruitPosition: {
        categoryId: "", //职位分类id
        positionName: "", //职位名称
        positionType: "1", //职位性质 1:全职 2:兼职 3:实习
        // classifyName: '',//职位类别名称
        posiNum: null, //招聘人数
        workCityArray: localStorage.workCityArray?JSON.parse(localStorage.workCityArray):[], //工作城市
        posiEndDate: "", //职位截止日期
        workYear: 1, //工作经验/工作年限 1:不限 2:应届毕业生 3:1年以下 4:1-3年 5:3-5年 6:5-10年 7:10年以上
        educationRequire: 1, //学历要求 1:不限 2:大专以下 3:大专 4:本科 5:硕士 6:博士
        positionSalaryLowest: "", //职位最低月薪
        positionSalaryHighest: "", //职位最高月薪
        positionDesc: "", //职位描述
        receiveEmail: "", //接收简历邮箱,
        workAddress: localStorage.workAddress?JSON.parse(localStorage.workAddress):'', //是否急招
        isUrgent: true,
        showSalaryType:true
      },

      rules: {
        categoryId: [{ required: true,type:'number', message: "请选择职位分类", trigger: "blur,change" }],
        positionName: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
          { max: 100, message: "长度在100个字符以内", trigger: "change" }
        ],
        positionType: [],
        classifyId: [{ required: true, message: "请选择职位类别", trigger: "blur" }],
        posiNum: [{ validator: checkAge, trigger: "blur" }],
        posiEndDate: [
          { type: "date", required: true, message: "请选择日期", trigger: "blur" }
        ],
        workCityArray: [{ required: true,type:'array', message: "请选择城市", trigger: "blur" }],
        workAddress: [{ required: true, message: "请输入工作地址", trigger: "blur" }],
        workYear: [],
        educationRequire: [],
        positionSalaryLowest: [
          { validator: positionSalaryLowest, trigger: "blur" }
        ],
        positionSalaryHighest: [
          { validator: positionSalaryHighest, trigger: "blur" }
        ],
        positionDesc: [{ required: true, message: "请输入职位描述", trigger: "blur" }],
        receiveEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      positionNameList: [], //职位分类列表
      classifyList: [], //职位类别列表
      classifyLists: [],
      workCityLists: [],
      opt: {
        workYear: [
          { value: 1, label: "不限" },
          { value: 2, label: "应届" },
          { value: 3, label: "1年以下" },
          { value: 4, label: "1-3年" },
          { value: 5, label: "3-5年" },
          { value: 6, label: "5-10年" },
          { value: 7, label: "10年以上" }
        ],
        education: [
          { value: 1, label: "不限" },
          { value: 2, label: "大专以下" },
          { value: 3, label: "大专" },
          { value: 4, label: "本科" },
          { value: 5, label: "硕士" },
          { value: 6, label: "博士" }
        ]
      },
      allPositionTags: [],
      positionTagIdArray:localStorage.positionTagIdArray?JSON.parse(localStorage.positionTagIdArray):[1,2,3,5,9,10,16,17],
      editorOption: {
        // theme: "bubble",
        placeholder: "请输入职位描述，支持html",
        modules: {
           toolbar: [
              ['bold', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],

              [{'header': 1}, {'header': 2}],               // custom button values
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
              [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
              [{'direction': 'rtl'}],                         // text direction

              [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
              [{'header': [1, 2, 3, 4, 5, 6, false]}],

              [{'color': []}, {'background': []}],          // dropdown with defaults from theme
              [{'font': []}],
              [{'align': []}],
           ]
        }
      },
      newPosition:true,
      customShow:false,
      customModel:'',
    }
  },
  methods: {
    toggleSelect(item){
      var index = this.positionTagIdArray.indexOf(item.id);
      if(index == -1){
        if(this.positionTagIdArray.length < 8){
          this.positionTagIdArray.push(item.id)
        }
      }else{
        this.positionTagIdArray.splice(index, 1);
      }
    },
    init() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        let methods = "recruitPosition/getPositionDetail",
          self = this,
          param = JSON.stringify({
            id: this.id,
            type: "2"
          }),
          successd = function(res) {
            self.recruitPosition = res.data.data;
            self.recruitPosition.posiEndDate = new Date(
              res.data.data.posiEndDate
            );
            self.recruitPosition.isUrgent = res.data.data.isUrgent == 1 ? true : false;
            self.recruitPosition.showSalaryType=res.data.data.showSalaryType==1?true:false;
            self.positionTagIdArray = res.data.data.positionTagIdArray;
            console.log(self.positionTagIdArray)
          };
        this.$http(methods, param, successd);
      }
    },
    empty() {
      this.recruitPosition = {
        categoryId: "", //职位分类id
        positionName: "", //职位名称
        positionType: "1", //职位性质 1:全职 2:兼职 3:实习
        posiNum: null, //招聘人数
        workCityArray: [], //工作城市
        posiEndDate: "", //职位截止日期
        workYear: 1, //工作经验/工作年限 1:不限 2:应届毕业生 3:1年以下 4:1-3年 5:3-5年 6:5-10年 7:10年以上
        educationRequire: 1, //学历要求 1:不限 2:大专以下 3:大专 4:本科 5:硕士 6:博士
        positionSalaryLowest: "", //职位最低月薪
        positionSalaryHighest: "", //职位最高月薪
        positionDesc: "", //职位描述
        workAddress: "",
        receiveEmail: this.recruitPosition.receiveEmail,
        isUrgent: true,
        showSalaryType:true
      };
      positionTagIdArray: []
    },
    getPositionCategoryList() {
      let methods = "recruitPosition/getPositionCategoryList",
        param = JSON.stringify({}),
        self = this,
        successd = function(res) {
          self.positionNameList = res.data.data;
        };
      this.$http(methods, param, successd);
    },
    getEmail() {
      let methods = "recruitPosition/getAdminEamil",
        param = JSON.stringify({}),
        self = this,
        successd = function(res) {
          self.recruitPosition.receiveEmail = res.data.data;
        };
      this.$http(methods, param, successd);
    },
    getPositionClassifyTree() {
      let methods = "recruitPosition/getPositionClassifyTree",
        param = JSON.stringify({}),
        self = this,
        successd = function(res) {
          self.classifyList = res.data.data;
          self.transitionClassifyLists();
        };
      this.$http(methods, param, successd);
    },
    getAllPositionTags(){
      let methods = "recruitPosition/getAllPositionTags",
        param = JSON.stringify({}),
        self = this,
        successd = (res)=>{
          this.allPositionTags = res.data.data;
        }
      this.$http(methods, param, successd);
    },
    transitionCityLists() {
      let provinces = allcity.province,
        citys = allcity.city;
      for (let j = 0; j < provinces.length; j++) {
        let item = provinces[j];
        item.value = item.name;
        item.label = item.name;
        item.children = citys[item.id];
      }
      for (let k in citys) {
        let city = citys[k];
        for (let i = 0; i < city.length; i++) {
          let item = city[i];
          item.value = item.name;
          item.label = item.name;
        }
      }
      this.workCityLists = provinces;
    },
    transitionClassifyLists() {
      let obj = this.classifyList,
        opt = [];
      for (var i = 0; i < obj.length; i++) {
        var o1 = [];
        o1.label = obj[i].name;
        o1.value = obj[i].id;
        o1.children = [];
        opt.push(o1);
        for (var j = 0; j < obj[i].childrens.length; j++) {
          var o2 = [];
          o2.label = obj[i].childrens[j].name;
          o2.value = obj[i].childrens[j].id;
          o2.children = [];
          opt[i].children.push(o2);
          for (var k = 0; k < obj[i].childrens[j].childrens.length; k++) {
            var o3 = [];
            o3.label = obj[i].childrens[j].childrens[k].name;
            o3.value = obj[i].childrens[j].childrens[k].id;
            opt[i].children[j].children.push(o3);
          }
        }
      }
      this.classifyLists = opt;
    },
    cancle() {
      this.$router.go(-1);
    },
    publishBefore() {
      var b=true,self=this;
      self.$refs["recruitPosition"].validate(valid => {
        self.$refs['recruitPosition2'].validate(valid2=>{
          if(!(valid2&&valid)){
            b=false;
          }
        })
      });
      return b;
    },
    publish() {
      if (!this.publishBefore()) {
        return false;
      }
      if (this.recruitPosition.workCityArray.length < 2) {
        this.$message({
          message: "请选择城市",
          type: "warning"
        });
        return;
      }
      if (
        this.recruitPosition.posiNum == "" ||
        this.recruitPosition.posiNum == null
      ) {
        this.recruitPosition.posiNum = 0;
      }

      let methods = "recruitPosition/publishNewPosition",
        self = this,
        param = JSON.stringify({
          recruitPosition: {
            categoryId: self.recruitPosition.categoryId, //职位分类id
            positionName: self.recruitPosition.positionName, //职位名称
            positionType: self.recruitPosition.positionType, //职位性质 1:全职 2:兼职 3:实习
            posiNum: self.recruitPosition.posiNum, //招聘人数
            workCityArray: self.recruitPosition.workCityArray, //工作城市
            posiEndDate: self.$date(self.recruitPosition.posiEndDate), //职位截止日期
            workYear: self.recruitPosition.workYear, //工作经验/工作年限 1:不限 2:应届毕业生 3:1年以下 4:1-3年 5:3-5年 6:5-10年 7:10年以上
            educationRequire: self.recruitPosition.educationRequire, //学历要求 1:不限 2:大专以下 3:大专 4:本科 5:硕士 6:博士
            positionSalaryLowest: self.recruitPosition.positionSalaryLowest, //职位最低月薪
            positionSalaryHighest: self.recruitPosition.positionSalaryHighest, //职位最高月薪
            positionDesc: self.recruitPosition.positionDesc, //职位描述
            receiveEmail: self.recruitPosition.receiveEmail, //接收简历邮箱,
            workAddress: self.recruitPosition.workAddress,
            isUrgent: self.recruitPosition.isUrgent ? 1 : 0,
            positionTagIds: self.positionTagIdArray.toString(),
            showSalaryType:self.recruitPosition.showSalaryType ? 1 : 2
          }
        }),
        successd = function(res) {
          console.log(param);
          self.$message({
            message: res.data.message,
            type: "success"
          });
          self.empty();
          self.$router.push({ path: "/ATS/recruit/list" });
        };
      self.$http(methods, param, successd);
    },
    editSave() {
      if (!this.publishBefore()) {
        return false;
      }
      if (this.recruitPosition.workCityArray.length < 2) {
        this.$message({
          message: "请选择城市",
          type: "warning"
        });
        return;
      }
      let methods = "recruitPosition/updatePosition",
        self = this,
        param = JSON.stringify({
          recruitPosition: {
            id: this.id,
            categoryId: self.recruitPosition.categoryId, //职位分类id
            positionName: self.recruitPosition.positionName, //职位名称
            positionType: self.recruitPosition.positionType, //职位性质 1:全职 2:兼职 3:实习
            posiNum: self.recruitPosition.posiNum, //招聘人数
            workCityArray: self.recruitPosition.workCityArray, //工作城市
            posiEndDate: self.$date(self.recruitPosition.posiEndDate), //职位截止日期
            workYear: self.recruitPosition.workYear, //工作经验/工作年限 1:不限 2:应届毕业生 3:1年以下 4:1-3年 5:3-5年 6:5-10年 7:10年以上
            educationRequire: self.recruitPosition.educationRequire, //学历要求 1:不限 2:大专以下 3:大专 4:本科 5:硕士 6:博士
            positionSalaryLowest: self.recruitPosition.positionSalaryLowest, //职位最低月薪
            positionSalaryHighest: self.recruitPosition.positionSalaryHighest, //职位最高月薪
            positionDesc: self.recruitPosition.positionDesc, //职位描述
            receiveEmail: self.recruitPosition.receiveEmail, //接收简历邮箱,
            workAddress: self.recruitPosition.workAddress,
            isUrgent: self.recruitPosition.isUrgent ? 1 : 0,
            positionTagIds: self.positionTagIdArray.toString(),
            showSalaryType:self.recruitPosition.showSalaryType ? 1 : 2
          }
        }),
        successd = function(res) {
          console.log(param);
          self.$message({
            message: "保存成功",
            type: "success"
          });
          self.$router.push({ path: "/ATS/recruit/list" });
        };
      this.$http(methods, param, successd);
    },
    //删除自定义的分类
    deleCategory(id){
      let self=this;
      let method="recruitPosition/delPositionCategory",
          param=JSON.stringify({
            categoryId:id
          }),
          successd=function(){
            self.getPositionCategoryList();
            self.recruitPosition.categoryId="";
          };
      self.$http(method,param,successd);
    },
    //自定义职位分类input失去焦点事件
    customSave(){
      let self=this;
      console.log(self.customModel)
      if(self.customModel==""){
        self.customShow=false;
        self.recruitPosition.categoryId='';
      }else{
        let method="recruitPosition/addPositionCategory",
            param=JSON.stringify({
              categoryName:self.customModel
            }),
            successd=function(res){
              console.log(res);
              self.customShow=false;
              self.getPositionCategoryList();
              self.$nextTick(_=>{
                self.recruitPosition.categoryId=res.data.data.id;
              })
            };
        self.$http(method,param,successd);
      }
    }
  },
  mounted() {
    // this.getPositionClassifyTree()
    this.newPosition = this.$route.params.newPosition;
    this.getPositionCategoryList();
    this.transitionCityLists();
    this.getEmail();
    this.init();
    this.getAllPositionTags();
  },
  watch:{
    'recruitPosition.categoryId':function(oldV,newV){
      var self=this;
      if(self.recruitPosition.categoryId==-1){
        self.customShow=true;
        self.$nextTick(_=>{
          self.$refs.customRef.$refs.input.focus();
        })
      }
    },
    'recruitPosition.workCityArray':function(){
      var self=this;
      if(self.recruitPosition.workCityArray){
        localStorage.setItem('workCityArray',JSON.stringify(self.recruitPosition.workCityArray))
      }
    },
    'recruitPosition.workAddress':function(){
      var self=this;
      if(self.recruitPosition.workAddress){
        localStorage.setItem('workAddress',JSON.stringify(self.recruitPosition.workAddress))
      }
    },
    'positionTagIdArray':function(){
      var self=this;
      if(self.positionTagIdArray){
        localStorage.setItem('positionTagIdArray',JSON.stringify(self.positionTagIdArray))
      }
    }
  }
};
</script>
<style scoped>
#mainWrap {
  background-color: #fff;
  padding: 20px;
}
.red{
  color: #F96868;
}
.el-button+.el-button{
  margin: 0 10px 10px 0;
}
.buttonWrap .el-button{
  margin: 0 10px 10px 0;
}
.buttonWrap{
  margin-top: 20px;
}
li .el-row {
  margin: 20px 0;
}
.title {
  width: 100%;
  height: 18px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(31, 45, 61, 1);
  line-height: 14px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 15px;
}
span > .iconfont {
  font-size: 14px;
}
#endTimeSelect .el-date-editor.el-input {
  width: 100%;
  width: 200px;
}

.ql-container.ql-snow {
  width: 100%;
}
.ql-editor {
  min-height: 100px;
}
.el-select {
  width: 200px;
}

.el-cascader {
  width: 200px;
}
</style>
<style>
#positionDesc .ql-editor {
  min-height: 100px;
}
#mainWrap .positionSalaryHighest > .el-form-item__content {
  margin-left: 0;
}
#mainWrap .positionSalaryHighest > .el-form-item__label {
  padding-right: 6px;
}
.need:before{
  content: '*'!important;
  color: #ff4949;
  margin-right: 0px;
  margin-top: 0px;
  position: absolute;
  top: 10px;
  left: 20px;
}
.need{
  position: relative;
}
#positionDesc .need:before{
  top:0;
  left: -10px;
  margin-right: 5px;
}

</style>



