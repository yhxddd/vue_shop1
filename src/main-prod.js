import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/CSS/gobal.css'
//  导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
//  导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//  导入富文本编辑器的对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
//  导入nprogress.js 和 css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//  配置文件请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

//  在request拦截器中 展示进度条 NProgress.start()
//  设置Axios拦截器
axios.interceptors.request.use(config => {
  console.log(config)//  打印的对象中有Headers的属性
  NProgress.start()
  //  为请求头 添加token验证的 Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //  末尾必须return 固定写法
  return config
})
//  在response拦截器中隐藏进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
//  富文本编辑器注册为全局可用
Vue.use(VueQuillEditor)

//  定义全局事件过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  //  return 'yyyy-mm-dd hh:mm:ss'
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
