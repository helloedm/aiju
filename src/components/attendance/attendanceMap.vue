<template>
  <div class="amap-page-container">
  	<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
    <el-amap :vid="vid" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events">
       <el-amap-marker :position="marker"></el-amap-marker>
    </el-amap>
    <el-button type="primary" @click="getMapC()" class="attendanceMap_queding">确 定</el-button>
  </div>
</template>
<script>
import { AMapManager } from 'vue-amap';
let amapManager = new AMapManager();
export default {
  name: 'amap-page',
  data: function() {
    var self = this;
    return {
      formattedAddress:'',
      vid: 'amap-vue-1',
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        'moveend': () => {
          let mapCenter = this.amapManager.getMap().getCenter();
          console.log(mapCenter);
          console.log(this.amapManager.getMap());
          this.center = [mapCenter.getLng(), mapCenter.getLat()];
          this.marker = this.center;
        },
        'zoomchange': () => {
          this.zoom = this.amapManager.getMap().getCenter();
        }
      },
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.formattedAddress = result.formattedAddress;
                console.log(self.formattedAddress)
                self.$nextTick();
              }
            });
          }
        }
      }],
      amapManager: amapManager,
      marker: [121.59996, 31.197646],
      searchOption: {
	      city: '杭州',
	      citylimit: false
    	},
    };
  },
  methods: {
    getMapC: function() {
      console.log(this.amapManager.getMap());
      console.log(this.center);
      let attendanceMapName = document.querySelector('.search-box input').value;
      if(attendanceMapName == ""){
        attendanceMapName = this.formattedAddress;
      }
      let center = this.center
      center.push(attendanceMapName);
      this.$emit('mapVal',center);
    },
    onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
        	this.marker = [pois[0].lng,pois[0].lat];
          this.center = this.marker;
        }
      }
  }
};
</script>
<style scoped>
  .search-box.el-vue-search-box-container{
    border:1px solid #ddd;
    width: 100%;
    z-index: 999;
    box-shadow: none;
  }
  .attendanceMap_queding{float: right;margin-top: 20px;}
</style>