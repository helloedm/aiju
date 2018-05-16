// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
// import './element-variables.scss'
import Validate from 'script/filter_rules'
import AMap from 'vue-amap';

import VueQuillEditor from 'vue-quill-editor'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'

import Methods from 'script/methods'
Vue.use(Methods);
Vue.use(Croppa);

Vue.use(ElementUI,{size:'medium'});
Vue.use(Validate);
Vue.use(AMap);
Vue.use(VueQuillEditor);
Vue.use(VueAwesomeSwiper)

Vue.prototype.$ajax = axios;

new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
})

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '6d40a1e85b41bb9b1600e61224169692',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',"AMap.Geolocation"]
});
