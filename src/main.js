// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 默认找index.js
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../static/global/index.css'
import Axios from 'axios'
// 将axios挂载到Vue原型上，这样每个组件中都可以使用
Vue.prototype.$https = Axios
// 设置公共的url
Axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1/'
Vue.config.productionTip = false // 生产环境不需要控制台有提示
Vue.use(ElementUI)
import Vuex from 'vuex'
Vue.use(Vuex) // 挂在Vuex到Vue实例中

const store = new Vuex.Store({
  state: {
    num: 1,
    questionList: []
  },
  actions: {
    // 应该在这里做异步，actions提交的是mutation，不是直接变更状态
    setActionNum(context, val) {
      // context：store实例
      context.commit('setMutaNum', val)
    },
    setAsyncActionNum: function (context, val) {
      setTimeout(() => {
        context.commit('setAsyncMutaNum', val)
      }, 1000)
    },
    course_questions({ commit }, courseId) { // {commit}  <=> {commit:commit} <=> context、context.commit(...)
      console.log(typeof (courseId)) // string
      // courseId = Number(courseId)
      console.log(this.$https) // 不要使用，undefined
      console.log(Axios)
      Axios.get(`course_questions/?course_id=${courseId}`)
        .then((res) => {
          console.log(res)
          let data = res.data.data
          commit('course_questions', data)
        })
        .catch(err => {
          console.log('获取失败！', err)
        })
    }
  },
  mutations: {
    // 应该在这里做同步，做异步会出问题，导致组件拿到的state.num永远只是上一个值
    setMutaNum(state, val) {
      state.num += val
    },
    setAsyncMutaNum: function (state, val) {
      state.num += val
    },
    course_questions(state, data) {
      state.questionList = data
    }
  },
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,// 内部会存在$store
  store, // 内部会存在$store
  components: { App },
  template: '<App/>'
})
