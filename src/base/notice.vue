<template>
 <div ref="wrap" class="wrap">
   <i class="iconfont" :class="iconClass"></i>
     <span>{{text}}</span>
 </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '212121'
      },
      color:{
          type: String,
          default: '#F2A654'
      },
      bgColor:{
         type: String,
          default: '#FFF5EB'
      },
      iconClass: {
          type: String,
          default: 'icon-jinggao'
      }
    },
    data() {
      return {

      }
    },
    mounted () {
      this.$refs.wrap.style.backgroundColor = this.bgColor
      this.$refs.wrap.style.color = this.color
    }
  }
</script>

<style scoped>

  .wrap{
      padding: 8px 16px;
      margin: 0;
      box-sizing: border-box;
      border-radius: 4px;
      position: relative;
      background-color: #FFF5EB;
      overflow: hidden;
      color: #F2A654;
      opacity: 1;
      display: inline-block;
  }
</style>