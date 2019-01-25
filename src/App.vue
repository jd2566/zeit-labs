<template>
  <div class="ui container" id="app">
    <img class="ui centered small image" src="./assets/logo.jpg">

    <Gelato :lang="currentLang"/>

    <div class="ui hidden divider" style="margin-bottom:50px"></div>

    <div class="ui bottom fixed three item large menu">
      <a class="item" :class="{active: currentLang == 'tw'}" @click="changeLang('tw')"><i class="tw flag"></i></a>
      <a class="item" :class="{active: currentLang == 'en'}" @click="changeLang('en')"><i class="us flag"></i></a>
      <a class="item" :class="{active: currentLang == 'jp'}" @click="changeLang('jp')"><i class="jp flag"></i></a>
    </div>
  </div>
</template>

<script>
import Gelato from './components/Gelato'

export default {
  name: 'App',
  data () {
    return {
      currentLang: ""
    }
  },
  components: {
    Gelato
  },
  created() {
    this.currentLang = this.$cookies.get('lang', 'tw')
    this.$i18n.locale = this.$cookies.get('lang', 'tw')
    try {
      // NOTE: 45min refresh policy is what google recommends
      window.setInterval(this.$refreshToken(), 2.7e+6)
    } catch (e) {
      console.error(e)
    }

  },
  methods: {
    changeLang (locale) {
      this.$cookies.set('lang', locale)
      this.currentLang = locale
      this.$i18n.locale = locale
    }
  }
}
</script>

<style>

</style>
