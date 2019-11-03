<template>
  <v-container grid-list-md>
    <v-simple-table dense class="ma-0 pa-0" style="width:1300px;">
      <template>
        <thead>
          <tr class="ma-0 pa-0">
            <th class="text-center ma-0 pa-0 pt-5" style="width:200px;">구분</th>
            <th class="text-center ma-0 pa-0 pt-3" style="">거주자<br>상태 보고</th>
            <th class="text-center ma-0 pa-0 pt-0" style="">이코노<br>마이저<br>사용</th>
            <th class="text-center ma-0 pa-0 pt-0" style="">외기온도<br>보상제어<br>사용</th>
            <th class="text-center ma-0 pa-0 pt-3" style="">냉난방<br>모드</th>
            <th class="text-center ma-0 pa-0 pt-0" style="">팬<br>자동/수동<br>설정</th>
            <th class="text-center ma-0 pa-0 pt-0" style="">댐퍼<br>자동/수동<br>설정</th>
            <th class="text-center ma-0 pa-0 pt-3" style="">내부<br>설정온도</th>
            <th class="text-center ma-0 pa-0 pt-3" style="">댐퍼 수동<br>설정값</th>
            <th class="text-center ma-0 pa-0 pt-3" style="">CO2 농도<br>기준 설정값</th>
            <th class="text-center ma-0 pa-0 pt-5" style="">설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datas in ahuConfigs" class="ma-0 pa-0">
            <td class="text-center ma-0 pa-0 pt-3 pb-2" style="">{{ahuNos[datas.AhuIndex-1].name}}</td>
            <td class="text-center ma-0 pa-0" style="" >
              <v-select
              v-model="datas.NotifyOccupantsState"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              menu-props="auto"
              style="margin:-4px 0px -30px 0px;text-indent: 35px;"
              class="grey--text caption"
            ></v-select></td>
            <td class="text-center ma-0 pa-0" style="">
              <v-select
              v-model="datas.EconomizerCycle"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              style="margin:-4px 0px -30px 0px;text-indent: 35px;"
              class="grey--text caption"></v-select>
            </td>
            <td class="text-center ma-0 pa-0" style="">
              <v-select
              v-model="datas.VarTempControl"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              style="margin:-4px 0px -30px 0px;text-indent: 35px;"
              class="grey--text caption"></v-select>
            </td>
            <td class="text-center ma-0 pa-0" style="">
              <v-select
              v-model="datas.HCMode"
              :items="hcOnOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              style="margin:-4px 0px -30px 0px;text-indent: 35px;"
              class="grey--text caption"></v-select>
            </td>
            <td class="text-center ma-0 pa-0" style="">
              <v-select
              v-model="datas.FanAutoManual"
              :items="onOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              style="margin:-4px 0px -30px 0px;text-indent: 35px;"
              class="grey--text caption"></v-select>
            </td>
            <td class="text-center ma-0 pa-0" style="">
              <v-select
              v-model="datas.DamperAutoManual"
              :items="onOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              style="margin:-4px 0px -30px 0px;text-indent: 35px;"
              class="grey--text caption"></v-select>
            </td>
            <td class="text-center ma-0 pa-0" style=""><v-text-field class="centered-input text--darken-3" dense style="margin:-4px 0px -30px 0px;" v-model="datas.Tzone_set"></v-text-field></td>
            <td class="text-center ma-0 pa-0" style=""><v-text-field class="centered-input text--darken-3" dense style="margin:-4px 0px -30px 0px;" v-model="datas.Rdamp_set"></v-text-field></td>
            <td class="text-center ma-0 pa-0" style=""><v-text-field class="centered-input text--darken-3" dense style="margin:-4px 0px -30px 0px;" v-model="datas.PPMco2_set"></v-text-field></td>
            <td class="text-center ma-0 pa-0" style=""><v-text-field class="centered-input text--darken-3" dense style="margin:-4px 0px -30px 0px;" v-model="datas.Desc"></v-text-field></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn color='blue darken-1' right flat @click='saveAhuConfig()'>저장</v-btn>
  </v-container>
</template>
<style>
.centered-input input {
  text-align: center
}
</style>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getAhus()
  },
  data () {
    return {
      ahuNos: [],
      ahuData: [],
      datas: [],
      beAll: false,
      curAhuId: 1,
      ahuConfigs: [],
      tempAhuConfigs: [],
      onOffs: [ {'name': '사용안함', 'value': -1}, {'name': '자동', 'value': 0}, {'name': '수동', 'value': 1}],
      hcOnOffs: [ {'name': '사용안함', 'value': -1}, {'name': '난방', 'value': 0}, {'name': '냉방', 'value': 1}],
      useUnuses: [{'name': '사용안함', 'value': 0}, {'name': '사용', 'value': 1}]
    }
  },
  methods: {
    getAhus () {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfigDB`)
        .then((r) => {
          this.ahuNos = []
          for (var key in r.data) {
            if (r.data.hasOwnProperty(key)) {
              this.ahuNos.push({ 'name': r.data[key].ahu_desc , 'value': r.data[key].ahu_id, 'beChecked': (r.data[key].ahu_id === this.curAhuId) })
            }
          }
          this.getAhuConfig()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getAhuConfig () {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig/${ahuNo}`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfig/${1}`)
        .then((r) => {
          this.ahuConfigs = r.data
          this.tempAhuConfigs = JSON.parse(JSON.stringify(r.data))
          // alert(JSON.stringify(this.tempAhuConfigs))
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    saveAhuConfig: function () {
      var ahuIdxs = []
      for (var i = 0; i < this.ahuConfigs.length; i++) {
        if (!(this.ahuConfigs[i].NotifyOccupantsState === this.tempAhuConfigs[i].NotifyOccupantsState &&
          this.ahuConfigs[i].EconomizerCycle === this.tempAhuConfigs[i].EconomizerCycle &&
          this.ahuConfigs[i].VarTempControl === this.tempAhuConfigs[i].VarTempControl &&
          this.ahuConfigs[i].HCMode === this.tempAhuConfigs[i].HCMode &&
          this.ahuConfigs[i].FanAutoManual === this.tempAhuConfigs[i].FanAutoManual &&
          this.ahuConfigs[i].DamperAutoManual === this.tempAhuConfigs[i].DamperAutoManual &&
          this.ahuConfigs[i].Tzone_set === this.tempAhuConfigs[i].Tzone_set &&
          this.ahuConfigs[i].Rdamp_set === this.tempAhuConfigs[i].Rdamp_set &&
          this.ahuConfigs[i].PPMco2_set === this.tempAhuConfigs[i].PPMco2_set &&
          this.ahuConfigs[i].Desc === this.tempAhuConfigs[i].Desc)) {
          ahuIdxs.push(this.ahuConfigs[i].AhuIndex)
        }
      }
      // axios.put(`http://localhost:3000/api/rooms/ahusConfig`, { config: this.datas, ahuIdxs: ahuIdxs })
      axios.put(`${this.$apiRootPath}rooms/ahusConfig`, { config: this.ahuConfigs, ahuIdxs: ahuIdxs })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getAhuConfig()
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    }
  }
}
</script>
