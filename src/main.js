// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGAPI from "vue-gapi"
import VueLodash from 'vue-lodash'
import VueCookies from 'vue-cookies'
import VueI18n from 'vue-i18n'

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
Vue.use(VueI18n)

Vue.config.productionTip = false

VueCookies.config('7d')

const messages = {
  tw: {
    flavor: {
      one: '單口味',
      two: '雙口味'
    }
  },
  en: {
    flavor: {
      one: 'Single',
      two: 'Double'
    }
  },
  jp: {
    flavor: {
      one: 'シングル',
      two: 'ダブル'
    }
  }
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  i18n
})
