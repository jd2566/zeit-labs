<template>
  <div>

    <div v-for="item in menuData" :key="item.tw" class="ui piled segment">
      <div class="ui card">
        <div v-if="item.img != ''" class="image">
          <img :src="imgUrl(item.img)">
        </div>
        <div class="content">
          <div v-if="lang == 'tw'" class="header">{{ item.tw }}</div>
          <div v-if="lang == 'en'" class="header">{{ item.en }}</div>
          <div v-if="lang == 'jp'" class="header">{{ item.jp }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Gelato',
  props: ['lang'],
  data () {
    return {
      menuData: []
    }
  },
  mounted() {
    setTimeout(() => this.loginCheck(), 1000);
  },
  methods: {
    loginCheck () {
      let authed = this.$isAuthenticated()
      console.log("auth status:", authed)

      if (authed == true) {
        this.syncData()
      } else {
        this.$login()
      }
    },
    imgUrl (id) {
      return "https://drive.google.com/uc?id="+id
    },
    syncData () {
      window.vue = this
      this.$getGapiClient()
          .then(gapi => {

            setTimeout(() => {
              gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1ojqj2gt1Sb_D-ZmTfHvnI_rc-JEB5P-DTUc_wWpo65o',
                range: 'Gelato!A2:J',
              }).then(response =>  {
                let sheet = response.result.values
                let menu = {}

                let currentItem = ""
                let winff = ""
                let isOnMenu = false

                sheet.forEach((item) => {

                  if (item[0] != "") {

                    if (item[9] == "TRUE") {
                      menu[item[0]] = {}
                      currentItem = item[0]
                      isOnMenu = true

                      menu[item[0]]['img'] = item[1]
                      menu[item[0]]['tw'] = item[2]
                      menu[item[0]]['en'] = item[3]
                      menu[item[0]]['jp'] = item[4]
                      if (item[5] != "") {
                        menu[item[0]]['Wiffogato'] = { [item[5]]: [item[6]] }
                        winff = item[5]
                      } else {
                        winff = ""
                      }
                      if (item[7] != "") { menu[item[0]]['Affogato'] = item[7] }
                      if (item[8] != "") { menu[item[0]]['Affoshoto'] = item[8] }
                    }

                  } else {

                    if (item[5] != "" && isOnMenu) {
                      menu[currentItem]['Wiffogato'][item[5]] = [item[6]]
                      winff = item[5]
                    } else if (item[6] != "" && isOnMenu) {
                      menu[currentItem]['Wiffogato'][winff].push(item[6])
                    }

                  }
                }, this)

                window.vue.menuData = Object.keys(menu).map(function(key) {
                  return menu[key]
                })
              })
            }, 1500);

          })
    }
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
