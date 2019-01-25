<template>
  <div class="ui two column grid">
    <div class="row">
      <div class="sixteen wide column">
        <h3 class="ui horizontal divider header">
          Gelato
        </h3>
      </div>
    </div>
    <div class="centered row">
      <div class="sixteen wide column">
        <div class="two ui basic buttons">
          <div class="ui left labeled button" :class="{active: isSingle}" @click="isSingle = true">
            <div class="ui label">
              <i class="dollar icon"></i> 110
            </div>
            <div class="ui button">{{ $t("flavor.one") }}</div>
          </div>
          <div class="or"></div>
          <div class="ui labeled button" :class="{active: !isSingle}" @click="isSingle = false">
            <div class="ui button">{{ $t("flavor.two") }}</div>
            <div class="ui label">
              <i class="dollar icon"></i> 140
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="centered row" style="min-height: 250px">

      <div class="ui large loader" :class="{active: isLoading}"></div>

      <div v-for="item in menuData" :key="item.tw" class="sixteen wide mobile eight wide tablet five wide computer column">

        <div class="ui fluid card" style="margin-bottom:30px;">
          <div v-if="item.img != '' && item.img != undefined" class="image">
            <img :src="imgUrl(item.img)">
          </div>
          <div class="content">
            <div v-if="lang == 'tw'" class="header">{{ item.tw }}</div>
            <div v-if="lang == 'en'" class="header">{{ item.en }}</div>
            <div v-if="lang == 'jp'" class="header">{{ item.jp }}</div>
          </div>
          <div class="content">

            <div class="ui centered grid">
              <div v-for="(match, title) in item.matches" :key="title" class="sixteen wide column">
                <div v-if="match.name != undefined">
                  <h3 v-if="title != 'Wiffogato'" class="ui dividing grey header">
                    <i v-if="title == 'Affogato'" class="coffee icon"></i>
                    <i v-else-if="title == 'Affoshoto'" class="star outline icon"></i>
                    {{title}}
                  </h3>
                </div>
                <h3 v-else-if="title == 'Wiffogato' " class="ui dividing grey header">
                  <i class="glass martini icon"></i>
                  {{title}}
                </h3>

                <div class="ui relaxed divided large list">

                  <div v-if="title != 'Wiffogato' && match.name != undefined" class="item">
                    <div class="right floated content">
                      <i class="dollar icon"></i>
                      {{ basicPrice + parseInt(match.price) }}
                    </div>
                    <div class="content"> {{match.name}} </div>
                  </div>

                  <div v-if="title == 'Wiffogato'">

                    <div v-for="(wines, i) in match" :key="i" class="item">
                      <div class="content">
                        <h4 class="ui header">{{ i }}</h4>
                      </div>
                      <div class="middle aligned divided list">
                        <div v-for="wine in wines" :key="wine.name" class="item">
                          <div class="right floated content">
                            <i class="dollar icon"></i>
                            {{ basicPrice + parseInt(wine.price) }}
                          </div>
                          <div class="content"> {{wine.name}} </div>
                        </div>
                      </div>
                      <div class="ui divider"></div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
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
      menuData: [],
      isLoading: false,
      basicPrice: 110,
      isSingle: true,
    }
  },
  mounted() {
    setTimeout(() => this.loginCheck(), 1000);
  },
  watch: {
    isSingle (val) {
      if (val) {
        this.basicPrice = 110
      }else{
        this. basicPrice = 140
      }
    }
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
      this.isLoading = true
      this.$getGapiClient()
          .then(gapi => {

            setTimeout(() => {
              gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1ojqj2gt1Sb_D-ZmTfHvnI_rc-JEB5P-DTUc_wWpo65o',
                range: 'Gelato!A2:M',
              }).then(response =>  {
                let sheet = response.result.values
                let menu = {}

                let currentItem = ""
                let winff = ""
                let isOnMenu = false

                sheet.forEach((item) => {

                  if (item[0] != "") {

                    if (item[1] == "TRUE") {
                      menu[item[0]] = {matches: {}}
                      currentItem = item[0]
                      isOnMenu = true

                      menu[item[0]]['tw'] = item[2]
                      menu[item[0]]['en'] = item[3]
                      menu[item[0]]['jp'] = item[4]
                      if (item[5] != "") {
                        menu[item[0]]['matches']['Wiffogato'] = { [item[5]]: [{name: item[6], price: item[7]}] }
                        winff = item[5]
                      } else {
                        winff = ""
                      }
                      if (item[8] != "") { menu[item[0]]['matches']['Affogato'] = {name: item[8], price: item[9]} }
                      if (item[10] != "") { menu[item[0]]['matches']['Affoshoto'] = {name: item[10], price: item[11]} }

                      menu[item[0]]['img'] = item[12]
                    }

                  } else {

                    if (item[5] != "" && isOnMenu) {
                      menu[currentItem]['matches']['Wiffogato'][item[5]] = [{name: item[6], price: item[7]}]
                      winff = item[5]
                    } else if (item[6] != "" && isOnMenu) {
                      menu[currentItem]['matches']['Wiffogato'][winff].push({name: item[6], price: item[7]})
                    }

                  }
                }, this)

                window.vue.menuData = Object.keys(menu).map(function(key) {
                  return menu[key]
                })
                this.isLoading = false
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
