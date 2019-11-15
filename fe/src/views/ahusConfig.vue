<template>
  <v-container grid-list-md>
    <v-simple-table dense class="ma-0 pa-0" style="width:1300px;">
      <template>
        <thead>
          <tr class="ma-0 pa-0">
            <th class="text-center black--text ma-0 pa-0 pt-5 config-column right-bold-border" style="width:200px;border-bottom:4px solid lightgrey;"><b>구분</b></th>
            <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:4px solid lightgrey;">스케쥴러<br>사용</th>
            <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:4px solid lightgrey;">거주자<br>상태 보고</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 config-column" style="border-bottom:4px solid lightgrey;">이코노<br>마이저<br>사용</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 config-column" style="border-bottom:4px solid lightgrey;">외기온도<br>보상제어<br>사용</th>
            <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:4px solid lightgrey;">냉난방<br>모드</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 config-column" style="border-bottom:4px solid lightgrey;">팬<br>자동/수동<br>설정</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 config-column" style="border-bottom:4px solid lightgrey;">댐퍼<br>자동/수동<br>설정</th>
            <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:4px solid lightgrey;">내부<br>설정온도</th>
            <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:4px solid lightgrey;">댐퍼 수동<br>설정값</th>
            <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:4px solid lightgrey;">CO2 농도<br>기준 설정값</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datas in ahuConfigs" class="ma-0 pa-0">
            <td class="text-center black--text font-weight-bold ma-0 pa-0 pt-3 pb-2 config-column right-bold-border" style="background-color:rgb(294, 294, 189)">{{ahuNos[datas.AhuIndex-1].name}}({{ahuNos[datas.AhuIndex-1].desc}})</td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-if="datas.UseScheduler !== 1"
              v-model="datas.UseScheduler"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              menu-props="auto"
              class="font-weight-bold body-2 config-column-margin blackSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"
            ></v-select>
              <v-select
              v-if="datas.UseScheduler === 1"
              v-model="datas.UseScheduler"
              :items="useUnuses"
              :color="red"
              item-value="value"
              item-text="name"
              append-icon=""
              menu-props="auto"
              class="font-weight-bold body-2 config-column-margin redSel"
              item-color="red"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"
            ></v-select></td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-if="datas.NotifyOccupantsState !== 1"
              v-model="datas.NotifyOccupantsState"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              menu-props="auto"
              class="font-weight-bold body-2 config-column-margin blackSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"
            ></v-select>
              <v-select
              v-if="datas.NotifyOccupantsState === 1"
              v-model="datas.NotifyOccupantsState"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              menu-props="auto"
              class="font-weight-bold body-2 config-column-margin redSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"
            ></v-select></td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-if="datas.EconomizerCycle !== 1"
              v-model="datas.EconomizerCycle"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin blackSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
              <v-select
              v-if="datas.EconomizerCycle === 1"
              v-model="datas.EconomizerCycle"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin redSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
            </td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-if="datas.VarTempControl !== 1"
              v-model="datas.VarTempControl"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin blackSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
              <v-select
              v-if="datas.VarTempControl === 1"
              v-model="datas.VarTempControl"
              :items="useUnuses"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin redSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
            </td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-if="!(datas.HCMode === 0 || datas.HCMode === 1)"
              v-model="datas.HCMode"
              :items="hcOnOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin blackSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
              <v-select
              v-if="datas.HCMode === 0"
              v-model="datas.HCMode"
              :items="hcOnOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin redSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
              <v-select
              v-if="datas.HCMode === 1"
              v-model="datas.HCMode"
              :items="hcOnOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin blueSel"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
            </td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-model="datas.FanAutoManual"
              :items="onOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
            </td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)">
              <v-select
              v-model="datas.DamperAutoManual"
              :items="onOffs"
              item-value="value"
              item-text="name"
              append-icon=""
              class="font-weight-bold body-2 config-column-margin"
              style="text-indent: 15px;"
              @change="saveAhuConfig()"></v-select>
            </td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)"><v-text-field class="centered-input font-weight-bold body-2 config-column-margin" dense v-model="datas.Tzone_set" @change="saveAhuConfig()"></v-text-field></td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)"><v-text-field class="centered-input font-weight-bold body-2 config-column-margin" dense v-model="datas.Rdamp_set" @change="saveAhuConfig()"></v-text-field></td>
            <td class="text-center ma-0 pa-0 config-column" style="background-color:rgb(240, 240, 240)"><v-text-field class="centered-input font-weight-bold body-2 config-column-margin" dense v-model="datas.PPMco2_set" @change="saveAhuConfig()"></v-text-field></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- <v-btn color='blue darken-1' right flat @click='saveAhuConfig()'>저장</v-btn> -->
  </v-container>
</template>
<style>
.centered-input input {
  text-align: center
}
.td-right-border {
  border-right: 1px solid lightgrey;
}
.config-column {
  font-size: medium;
  font-weight: bold;
  border-right: 1px solid lightgrey;
}
.v-select__selection{
    width: 100%;
    text-align-last: center;
    justify-content: center;
}
.blackSel .v-select__selection {
    color:black;
}
.redSel .v-select__selection {
    color:red;
}
.blueSel .v-select__selection {
    color:blue;
}
.config-column-margin {
  margin: -4px 0px -24px 0px;
}
.right-border {
  border-right: 1px solid lightgrey;
}
.right-bold-border {
  border-right: 4px solid lightgrey;
}
.bottom-border {
  border-bottom:4px solid lightgrey;
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
      onOffs: [{ 'name': '사용안함', 'value': -1 }, { 'name': '자동', 'value': 0 }, { 'name': '수동', 'value': 1 }],
      hcOnOffs: [{ 'name': '사용안함', 'value': -1 }, { 'name': '난방', 'value': 0 }, { 'name': '냉방', 'value': 1 }],
      useUnuses: [{ 'name': '사용안함', 'value': 0 }, { 'name': '사용', 'value': 1 }]
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
              this.ahuNos.push({ 'desc': r.data[key].ahu_desc, 'name': r.data[key].ahu_name,  'value': r.data[key].ahu_id, 'beChecked': (r.data[key].ahu_id === this.curAhuId) })
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
      axios.get(`${this.$apiRootPath}rooms/ahusConfig/${255}`)
        .then((r) => {
          this.ahuConfigs = JSON.parse(r.data)
          this.tempAhuConfigs = JSON.parse(r.data)
          for (var i = 0; i < this.ahuConfigs.length; i++) {
            this.ahuConfigs[i].Tzone_set = this.ahuConfigs[i].Tzone_set.toFixed(1)
            this.tempAhuConfigs[i].Tzone_set = this.tempAhuConfigs[i].Tzone_set.toFixed(1)
          }
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
        if (!(this.ahuConfigs[i].UseScheduler === this.tempAhuConfigs[i].UseScheduler &&
          this.ahuConfigs[i].NotifyOccupantsState === this.tempAhuConfigs[i].NotifyOccupantsState &&
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
