<template>
  <div>
    <!-- 
      width,可见区域的宽度(number)
      height,可见区域的高度(number)
      placeholder,占位符(string)
      placeholder-color,占位符颜色(string)
      placeholder-font-size,占位符字体大小(number)
      canvas-color,看见区域颜色(string)
      show-remove-button,是否展示右上角默认删除按钮(blur)
      remove-button-color,默认删除按钮颜色(string)
      remove-button-size,默认删除按钮大小(number)
      show-loading,展示Loading(blur)
      loading-size,loading大小(number)
      loading-color,loading颜色(string)
      quality,输出图像是看见区域的倍数(number)
      prevent-white-space,防止空白(blur)
      zoom-speed,缩放速度(number)默认是3
      reverse-scroll-to-zoom,改变缩放方向(blur)
      initial-position,上传图片显示的位置默认中央
      disable-click-to-choose,禁止展示区域触发选择图片(blur)默认false
      事件:
      chooseFile():触发选择图片
      file-choose(),每次选择新图片触发
      image-remove(),图片删除是触发
      new-image(),接收到新的有效图像并成功读取时发出（v0.2.0 +）
      new-image-drawn(),（v1.0.0 +）在接收到新的有效图像并成功读取时触发
      loading-start(),图片加载时触发（v1.1.0 +）
      loading-end(),图片加载结束触发（v1.1.0 +）
      generateDataUrl (mimetype, compressionRate),获取base64数据url。您可以指定mimetype(输出图片格式'image/jpeg','image/png')和compressionRate(压缩比例)来压缩文件大小。
      generateBlob(callback, mimeType, compressionRate),回调函数将生成的Blob对象作为单个参数
     -->
    
    <!-- <el-button @click="myCroppaRemove">remove</el-button>
    <el-button @click="myCroppaUpload">upload</el-button> -->
    <el-dialog title="裁剪图片" :visible="showImgUpload" class="imgUpload" :before-close="myCroppaRemove" :close-on-click-modal="false">
      <croppa 
      v-model="myCroppa"
      :width="width"
      :height="height"
      placeholder="+"
      :placeholder-font-size="200"
      :show-remove-button="false"
      :show-loading="true"
      :prevent-white-space="true"
      :quality="1" 
      ></croppa>
      <p class="zhushi">用鼠标滚轮来放大缩小图片</p>
      <p class="zhushi">用鼠标拖动图片</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="myCroppaRemoveImg" type="danger">删除图片</el-button>
        <el-button @click="myCroppaRemove">取消</el-button>
        <el-button type="primary" @click="myCroppaUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '../script/util.js';
import Axios from 'axios';
import md5 from 'js-md5';
export default {
  name:'imgUpload',
  model:{
    prop:'showImgUpload'
  },
  props:{
    width:{
      type:Number,
      default:750
    },
    height:{
      type:Number,
      default:420
    },
    quality:Number,
    showImgUpload:{
      type:Boolean,
      default:true
    }
  },
  data(){
    console.log(this.showImgUpload);
    return {
      myCroppa:{},
      dialogTableVisible:this.showImgUpload,
    }
  },
  methods:{
    myCroppaRemove(){
      this.$emit('remove',false);
      return
    },
    myCroppaRemoveImg(){
      this.myCroppa.remove();
    },
    myCroppaUpload(){
      let self=this;
      this.myCroppa.generateBlob((blob) => {
        // var myFile=new File(blob,'file');
        // console.log(myFile);
        blob.filename="file.png"
        console.log(blob)
        var param=JSON.stringify({
          fId:'-1',
          businessId:'18'
        })
        var sign=this.$md5('fileUpload/insertFileRecord',param);
        let formData=new FormData();
        formData.append("sign",sign);
        formData.append("param",param);
        formData.append("file",blob);
        let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        Axios.post(util.uploadURLForCommon,formData,config).then(function(res){
            self.$emit('remove',false);
            if (res.data.code == 0) {
              self.$emit('back',res.data.data.fileInfoList[0].url);
            } else {
              self.$message.error(res.data.message);
            }
          })
      },'image/pcg','0.8')
    },
    change(ev){

      console.log(ev.target.files[0])
    }
  }
}
</script>
<style scoped>
.zhushi{font-size: 13px;color:#999;}
</style>
<style>
.imgUpload .el-dialog{width:auto;}
</style>

