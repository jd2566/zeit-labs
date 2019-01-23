// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGAPI from "vue-gapi"
import VueLodash from 'vue-lodash'
import VueCookies from 'vue-cookies'

const apiConfig = {
  apiKey: "AIzaSyD-pjg5F8kmMldkYZcpdCkX3m5mgDOMGKc",
  clientId: "1047043912785-gcc8g71s8crphau1bmm806nshtfddsl4.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets.readonly"
}

Vue.use(VueAxios, axios)
Vue.use(VueGAPI, apiConfig)
Vue.use(VueLodash)
Vue.use(VueCookies)

Vue.config.productionTip = false

VueCookies.config('7d')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
