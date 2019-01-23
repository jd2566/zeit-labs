<template>
  <div class="ui container" id="app">
    <img src="./assets/logo.png">

    <Gelato :lang="currentLang"/>

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
    }
  }
}
</script>

<style>

</style>
