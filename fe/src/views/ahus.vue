<template>
  <v-container grid-list-md>
    <v-simple-table dense class="elevation-3">
      <template>
        <thead>
          <tr>
            <th class="text-center black--text ma-0 pa-0 pt-8 right-bold-border bottom-border" rowspan="2" style="width:200px;font-size:medium;font-weight:bold;">구분</th>
            <th class="text-center black--text ma-0 pa-0 pt-1 right-bold-border bottom-border" colspan="4" style="font-size:medium;font-weight:bold;">냉난방모드</th>
            <th class="text-center black--text ma-0 pa-0 pt-1 right-bold-border bottom-border" colspan="2" style="font-size:medium;font-weight:bold;">Fan</th>
            <th class="text-center black--text ma-0 pa-0 pt-1 right-bold-border bottom-border" colspan="3" style="font-size:medium;font-weight:bold;">Damper</th>
            <th class="text-center black--text ma-0 pa-0 pt-1 right-bold-border bottom-border" colspan="2" style="font-size:medium;font-weight:bold;">CO2센서</th>
          </tr>
          <tr>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">냉난방<br>설정모드</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">냉난방<br>상태</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">냉난방<br>설정온도</th>
            <th class="text-center black--text ma-0 pa-0 pt-3 right-bold-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">실내온도</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">FAN<br>동작설정</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-bold-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">공급FAN<br>상태</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">Damper<br>설정모드</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">Damper<br>설정값</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-bold-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">Damper<br>현재값</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">CO2<br>설정값</th>
            <th class="text-center black--text ma-0 pa-0 pt-0 right-bold-border" style="font-size:medium;font-weight:bold;background-color:rgb(204, 255, 204);border-bottom:4px solid lightgrey;">CO2<br>현재값</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="zone in mergezones">
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-bold-border " style="cursor: pointer;background-color:rgb(294, 294, 189)" @mousedown.left='openAhuGraph(zone.zone.nZoneIdx)'>{{zone.ahu.ahu_name}}({{zone.ahu.ahu_desc}})</td>
            <td v-if="!(zone.zone.cMode_hc_mode === 1 || zone.zone.cMode_hc_mode === 0)" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.hc_mode}}</td>
            <td v-if="zone.zone.cMode_hc_mode === 0" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold red--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.hc_mode}}</td>
            <td v-if="zone.zone.cMode_hc_mode === 1" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold blue--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.hc_mode}}</td>
            <td v-if="!(zone.zone.nHCState === 1 || zone.zone.nHCState === 0)" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.nHCState}}</td>
            <td v-if="zone.zone.nHCState === 0" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold red--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.nHCState}}</td>
            <td v-if="zone.zone.nHCState === 1" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold blue--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.nHCState}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{(zone.zone.fData_hc_set_temp === -1)? '-' : zone.zone.fData_hc_set_temp}} <sup>o</sup>C</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-bold-border" style="background-color:rgb(240, 240, 240)">{{(zone.zone.fData_temp_return === -1)? '-' : zone.zone.fData_temp_return}} <sup>o</sup>C</td>
            <td v-if="zone.zone.cMode_manual_mode !== 1" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.manual_mode}}</td>
            <td v-if="zone.zone.cMode_manual_mode === 1" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold red--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.manual_mode}}</td>
            <td v-if="zone.zone.cState_supplay_fan !== 1" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.supplay_fan}}</td>
            <td v-if="zone.zone.cState_supplay_fan === 1" class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold red--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.supplay_fan}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{zone.damper_auto_manual}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{(zone.zone.nRdamp_set === -1)? '-' : zone.zone.nRdamp_set}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-bold-border" style="background-color:rgb(240, 240, 240)">{{(zone.zone.fData_damper_manual_set === -1)? '-' : zone.zone.fData_damper_manual_set}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-border" style="background-color:rgb(240, 240, 240)">{{(zone.zone.nPPMco2_set === -1)? '-' : zone.zone.nPPMco2_set}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2 font-weight-bold black--text right-bold-border" style="background-color:rgb(240, 240, 240)">
              <span v-if="zone.zone.nPPMco2_set < zone.zone.nPPMco2_cur" style="color:red">{{(zone.zone.nPPMco2_cur === -1)? '-' : zone.zone.nPPMco2_cur}}</span>
              <span v-if="zone.zone.nPPMco2_set >= zone.zone.nPPMco2_cur">{{(zone.zone.nPPMco2_cur === -1)? '-' : zone.zone.nPPMco2_cur}}</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model='ahuGraphModal' persistent  height="950px">
      <v-card height="900px">
        <v-toolbar dark icons-and-text>
          <v-toolbar-title>
            <span class='headline'>{{graphTitle}} 상태 그래프</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="ahuGraphModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <div>
            <v-row>
              <v-col class="d-flex pa-0 ma-0 mt-3 ml-3" cols="12" sm="1">
                <v-select
                  v-model="time.value"
                  :items="this.times"
                  item-value="value"
                  item-text="name"
                  label='시간단위'
                  class='ma-0 mt-1 pa-0 grey--text caption'
                ></v-select>
              </v-col>
              <v-col class="d-flex pa-0 ma-0 mt-3 ml-3" cols="12" sm="2">
                <v-text-field label='시작일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='startTime'></v-text-field>
              </v-col>
              <v-col class="d-flex pa-0 ma-0 mt-3 ml-3" cols="12" sm="2">
                <v-text-field label='종료일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='endTime'></v-text-field>
              </v-col>
              <v-col class="d-flex pa-0 ma-0 mt-3 ml-3" cols="12" sm="1">
                <v-btn class="d-flex" :loading="searchloading" :disabled="loading" @click="getSiteEnv(curAhuNo)">
                  <span>검색</span>
                </v-btn>
              </v-col>
            </v-row>
            <div>
              <div class="ma-0 pa-0 mb-n3">
                <v-chip
                  class="ma-0 ml-5 mb-n3"
                  color="orange"
                  label
                  outlined
                >
                {{graphTitle2}}
                </v-chip>
                <apexchart type=line height=200 :options="chartOptionsLine2" :series="series2" />
              </div>
              <div class="ma-0 pa-0 mb-n3">
                <v-chip
                  class="ma-0 ml-5 mb-n5"
                  color="orange"
                  label
                  outlined
                >
                {{graphTitle1}}
                </v-chip>
                <apexchart type=line height=200 :options="chartOptionsLine1" :series="series1" />
              </div>
              <div class="ma-0 pa-0 mb-n3">
                <v-chip
                  class="ma-0 ml-5 mb-n5"
                  color="orange"
                  label
                  outlined
                >
                {{graphTitle3}}
                </v-chip>
                <apexchart type=line height=200 :options="chartOptionsLine3" :series="series3" />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style>
.centered-input input {
  text-align: center
}
.centered-select select {
  text-align: center
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
.config-column-margin {
  margin: -4px 0px -30px 0px;
}
</style>
<script>
import axios from 'axios'
Apex = {
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
    //dashArray: [0,10],
  },
  yaxis: {
    tickAmount: 3
  }
}
export default {
  created () {
    this.getAhus()
    this.getZones()
    this.timer = setInterval(this.getAhus, 10000)
    this.timer = setInterval(this.getZones, 10000)
  },
  data () {
    return {
      graphTitle: '',
      settingTitle: '',
      mergezones: [],
      ahus: [],
      zones: [],
      ahuGraphModal: false,
      hcModes: ['난방', '냉방'],
      manualModes: ['중지', '가동'],
      damperAutoManual: ['자동', '수동'],
      ahuOperMode: ['난방ON', '냉방ON', '난방OFF', '냉방OFF'],
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      activeBtn: 0,
      datas: [],
      envDatas: [],
      mergeDatas: [],
      series1: [],
      chartOptionsLine1: [],
      series2: [],
      chartOptionsLine2: [],
      series3: [],
      chartOptionsLine3: [],
      series4: [],
      chartOptionsLine4: [],
      pSize: 0,
      phSize: 0,
      curAhuNo: 0,
      startTime: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY/MM/DD kk:mm'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD kk:mm'),
      searchloading: false,
      loading: false,
      graphTitle1: '온도 정보',
      graphTitle2: 'CO2 농도',
      graphTitle3: '설정 및 상태 정보'
    }
  },
  methods: {
    getAhus () {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfigDB`)
        .then((r) => {
          this.ahus = r.data
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getZones () {
      // axios.get(`http://localhost:3000/api/rooms/zones`)
      axios.get(`${this.$apiRootPath}rooms/zones`)
        .then((r) => {
          this.zones = r.data
          this.mergeZonesAhu()
        })
        .catch((e) => {
          alert('getZones error : ' + e.message)
          console.error(e.message)
        })
    },
    mergeZonesAhu () {
      var trncMode_hc_mode
      var trncMode_manual_mode
      var trncMode_damper_auto_manual
      var trncState_supplay_fan
      var trncState_ahu
      this.mergezones = []
      for (var i = 0; i < this.zones.length; i++) {
        trncMode_hc_mode = (this.zones[i].cMode_hc_mode !== -1) ? this.hcModes[this.zones[i].cMode_hc_mode] : '중지'
        trncMode_manual_mode = (this.zones[i].cMode_manual_mode !== -1) ? this.manualModes[this.zones[i].cMode_manual_mode] : '미설정'
        trncState_supplay_fan = (this.zones[i].cState_supplay_fan !== -1) ? this.manualModes[this.zones[i].cState_supplay_fan] : '미설정'
        trncMode_damper_auto_manual = (this.zones[i].cMode_damper_auto_manual !== -1) ? this.damperAutoManual[this.zones[i].cMode_damper_auto_manual] : '미설정'
        trncState_ahu = (this.zones[i].nHCState !== -1) ? this.ahuOperMode[this.zones[i].nHCState] : '미설정'
        this.zones[i].fData_hc_set_temp = this.zones[i].fData_hc_set_temp.toFixed(1)
        this.zones[i].fData_temp_return = this.zones[i].fData_temp_return.toFixed(1)
        this.mergezones.push({ zone: this.zones[i], ahu: this.ahus[i], hc_mode: trncMode_hc_mode, manual_mode: trncMode_manual_mode, supplay_fan: trncState_supplay_fan, damper_auto_manual: trncMode_damper_auto_manual, nHCState: trncState_ahu })
      }
    },
    openAhuGraph (ahuNo) {
      this.curAhuNo = ahuNo
      for (var i = 0; i < this.mergezones.length; i++) {
        if (this.mergezones[i].zone.nZoneIdx === ahuNo) {
          this.graphTitle = this.mergezones[i].ahu.ahu_desc + '(' + this.mergezones[i].ahu.ahu_name + ')'
          break
        }
      }
      this.getSiteEnv(ahuNo)
    },
    getSiteEnv (ahuNo) {
      this.searchloading = true
      this.loading = true
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.envDatas = r.data
          // alert("getSiteEnv : " + JSON.stringify(this.envDatas))
          this.getAhuTrend(ahuNo)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    mergeData () {
      var Tout = 0
      this.mergeDatas = []
      for (var i = 0; i < this.datas.length; i++) {
        Tout = 0
        for (var j = 0; j < this.envDatas.length; j++) {
          if (this.datas[i].m === this.envDatas[j].m) {
            Tout = this.envDatas[j].fTout
            break
          }
        }
        if (Tout > 50 || Tout < -50) Tout = 0
        this.mergeDatas.push({ 'ahu': this.datas[i], 'Tout': Tout })
      }
    },
    getAhuTrend (ahuNo) {
      // axios.put(`http://localhost:3000/api/rooms/solAhuTrend`, { ahuNo: ahuNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/solAhuTrend`, { ahuNo: ahuNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          // this.datas = []
          // this.datas.push('ahu': r.data, 'env':this.envDatas)
          this.datas = r.data
          this.mergeData()
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var data6 = []
          var data7 = []
          var data8 = []
          var data9 = []
          var data10 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].fData_damper_manual_set !== null) {
              data0.push(this.mergeDatas[i].ahu.fData_damper_manual_set.toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.datas[i].fData_temp_supply !== null) {
              data1.push(this.mergeDatas[i].ahu.fData_temp_supply.toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.datas[i].fData_temp_return !== null) {
              data2.push(this.mergeDatas[i].ahu.fData_temp_return.toFixed(2))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].cState_supplay_fan !== null) {
              data3.push(this.mergeDatas[i].ahu.cState_supplay_fan.toFixed(2))
            } else {
              data3.push(-1)
            }
            if (this.datas[i].cMode_damper_auto_manual !== null) {
              data4.push(this.mergeDatas[i].ahu.cMode_damper_auto_manual.toFixed(2))
            } else {
              data4.push(-1)
            }
            if (this.datas[i].fData_hc_set_temp !== null) {
              data5.push(this.mergeDatas[i].ahu.fData_hc_set_temp.toFixed(2))
            } else {
              data5.push(-1)
            }
            if (this.datas[i].nPPMco2_cur !== null) {
              data6.push(this.mergeDatas[i].ahu.nPPMco2_cur.toFixed(2))
            } else {
              data6.push(-1)
            }
            if (this.datas[i].cMode_manual_mode !== null) {
              data7.push(this.mergeDatas[i].ahu.cMode_manual_mode.toFixed(2))
            } else {
              data7.push(-1)
            }
            if (this.datas[i].cMode_auto_mode !== null) {
              data8.push(this.mergeDatas[i].ahu.cMode_auto_mode.toFixed(2))
            } else {
              data8.push(-1)
            }
            if (this.datas[i].cMode_auto_manual !== null) {
              data9.push(this.mergeDatas[i].ahu.cMode_auto_manual.toFixed(2))
            } else {
              data9.push(-1)
            }
            if (this.datas[i].Tout !== null) {
              data10.push(this.mergeDatas[i].Tout.toFixed(2))
            } else {
              data10.push(-1)
            }
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series1 = [
            {
              name: '급기온도',
              data: data1
            },
            {
              name: '환기온도',
              data: data2
            },
            {
              name: '설정온도',
              data: data5
            },
            {
              name: '외부온도',
              data: data10
            }
          ]
          this.series2 = [
            {
              name: 'CO2',
              data: data6
            }
          ]
          this.series3 = [
            {
              name: '댐퍼설정값',
              data: data0
            },
            {
              name: '공급팬상태',
              data: data3
            },
            {
              name: '댐퍼자동수동',
              data: data4
            },
            {
              name: '수동팬설정',
              data: data7
            },
            {
              name: '자동팬설정',
              data: data8
            },
            {
              name: '팬자동수동',
              data: data9
            }
          ]
          this.chartOptionsLine1 = {
            chart: {
              id: 'ab',
              width: '100%',
              group: 'social',
              toolbar: {
                show: false
              }
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            chart: {
              id: 'bw',
              width: '100%',
              group: 'social',
              toolbar: {
                show: false
              }
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.chartOptionsLine3 = {
            chart: {
              id: 'cb',
              width: '100%',
              group: 'social',
              toolbar: {
                show: false
              }
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.searchloading = false
          this.loading = false
          this.ahuGraphModal = true
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    }
  }
}
</script>
