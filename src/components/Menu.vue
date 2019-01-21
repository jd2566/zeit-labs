<template>
  <div>
    <div class="ui segment">
      <button @click="loginCheck">Authorize</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
    }
  },
  mounted() {

  },
  methods: {
    loginCheck () {
      let authed = this.$isAuthenticated()

      console.log("auth status:", authed)

      if (authed == true) {
        this.$getGapiClient()
          .then(gapi => {
            gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId: '1ojqj2gt1Sb_D-ZmTfHvnI_rc-JEB5P-DTUc_wWpo65o',
              range: 'Gelato!A2:G5',
            }).then(function(response) {
              var range = response.result;
              console.log(range)
            })
          })
      } else {
        this.$login()
      }
    },
    appendPre(message) {
      var pre = document.getElementById('content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
    }
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
