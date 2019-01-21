<template>
  <div class="ui container" id="app">
    <img src="./assets/logo.png">
    <Menu/>
  </div>
</template>

<script>
import Menu from './components/Menu'

export default {
  name: 'App',
  components: {
    Menu
  },
  created() {
    try {
      // NOTE: 45min refresh policy is what google recommends
      window.setInterval(this.$refreshToken(), 2.7e+6)
    } catch (e) {
      console.error(e)
    }

  }
}
</script>

<style>

</style>
