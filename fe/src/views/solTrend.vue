<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-bottom-navigation
        :value="activeBtn"
        grow
        dark
        color="white"
        @change="changGraph()"
      >
        <v-btn @click="activeBtn = 0">
          <span>공조기 상태 그래프</span>
        </v-btn>
        <v-btn @click="activeBtn = 1">
          <span>평균 그래프</span>
        </v-btn>
      </v-bottom-navigation>
      <div>
        <v-row>
          <v-col v-if="this.activeBtn === 0" class="d-flex pa-0 ma-0 mt-3 ml-3" cols="12" sm="2">
            <v-select
              v-model="ahuNo.value"
              :items="this.ahuNos"
              item-value="value"
              item-text="name"
              label='공조기 선택'
              class='ma-0 mt-1 pa-0 grey--text caption'
            ></v-select>
          </v-col>
          <v-col class="d-flex ma-0 pa-0 mt-3 ml-3" cols="12" sm="1">
            <v-select
              v-model="time.value"
              :items="this.times"
              item-value="value"
              item-text="name"
              label='시간단위'
              class='ma-0 mt-1 pa-0 grey--text caption'
            ></v-select>
          </v-col>
          <v-col class="d-flex ma-0 pa-0 mt-3 ml-3" cols="12" sm="2">
            <v-text-field label='시작일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='startTime'></v-text-field>
          </v-col>
          <v-col class="d-flex ma-0 pa-0 mt-3 ml-3" cols="12" sm="2">
            <v-text-field label='종료일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='endTime'></v-text-field>
          </v-col>
          <v-col class="d-flex ma-0 pa-0 mt-3 ml-3" cols="12" sm="1">
            <v-btn :loading="searchloading" :disabled="loading" @click="searchGraph()">
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
            <apexchart type=line height=200 width='1300' :options="chartOptionsLine2" :series="series2" />
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
            <apexchart type=line height=300 width='1300' :options="chartOptionsLine1" :series="series1" />
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
            <apexchart type=line height=200 width='1300' :options="chartOptionsLine3" :series="series3" />
          </div>
        </div>
      </div>
    </v-layout>
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
  mounted () {
    this.getAhus()
  },
  name: 'LineExample',
  data: function () {
    return {
      ahuNo: { 'name': '그라시아스(AHU1)', 'value': 1 },
      ahuNos: [],
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
      pSize: 0,
      phSize: 0,
      startTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD 00:00'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD 23:59'),
      searchloading: false,
      loading: false,
      graphTitle1: '온도 정보',
      graphTitle2: 'CO2 농도',
      graphTitle3: '설정 및 상태 정보'
    }
  },
  methods: {
    changGraph () {
      if (this.activeBtn === 0) {
        this.getAhuTrend()
      } else {
        this.getTrend()
      }
    },
    getSiteEnv () {
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.envDatas = r.data
          // alert("getSiteEnv : " + JSON.stringify(this.envDatas))
          this.getAhuTrend()
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
    getAhuTrend () {
      // axios.put(`http://localhost:3000/api/rooms/solAhuTrend`, { ahuNo: ahuNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/solAhuTrend`, { ahuNo: this.ahuNo.value, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
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
          this.chartOptionsLine1 = {}
          this.chartOptionsLine2 = {}
          this.chartOptionsLine3 = {}
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = 'CO2 농도'
          this.graphTitle3 = '설정 및 상태 정보'
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
              id: 'chartOpt1',
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
              id: 'chartOpt2',
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
              id: 'chartOpt3',
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
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getTrend () {
      // axios.put(`http://localhost:3000/api/rooms/solTrend`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/solTrend`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var date = []
          this.chartOptionsLine1 = {}
          this.chartOptionsLine2 = {}
          this.chartOptionsLine3 = {}
          this.graphTitle1 = '실내온도'
          this.graphTitle2 = 'CO2 농도'
          this.graphTitle3 = '동작 및 설정'
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].HCOnCnt !== null) {
              data0.push(this.datas[i].HCOnCnt.toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.datas[i].Tzone !== null) {
              data1.push(this.datas[i].Tzone.toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.datas[i].Rdamp !== null) {
              data2.push((this.datas[i].Rdamp / 100).toFixed(2))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].PPMco2 !== null) {
              data3.push(this.datas[i].PPMco2.toFixed(2))
            } else {
              data3.push(-1)
            }
            if (this.datas[i].HCOffCnt !== null) {
              data4.push(this.datas[i].HCOffCnt.toFixed(2))
            } else {
              data4.push(-1)
            }
            if (this.datas[i].VentilationCnt !== null) {
              data5.push(this.datas[i].VentilationCnt.toFixed(2))
            } else {
              data5.push(-1)
            }
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series1 = [
            {
              name: '실내온도',
              data: data1
            }
          ]
          this.series2 = [
            {
              name: 'CO2',
              data: data3
            }
          ]
          this.series3 = [
            {
              name: '냉난방 on 수',
              data: data0
            },
            {
              name: '냉난방 off 수',
              data: data4
            },
            {
              name: '환기 수',
              data: data5
            },
            {
              name: '댐퍼설정값',
              data: data2
            }
          ]
          this.chartOptionsLine1 = {
            chart: {
              id: 'chartOpt4',
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
              id: 'chartOpt5',
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
              id: 'chartOpt6',
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
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getAhus () {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfigDB`)
        .then((r) => {
          var ahuData = []
          for (var i = 0; i < r.data.length; i++) {
            if (i === 0) {
              this.ahuNo = { 'name': r.data[i].ahu_desc + '(' + r.data[i].ahu_name + ')', 'value': r.data[i].ahu_id }
            }
            ahuData.push({ 'name': r.data[i].ahu_desc + '(' + r.data[i].ahu_name + ')', 'value': r.data[i].ahu_id })
          }
          this.ahuNos = ahuData
          this.getSiteEnv()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    toggleAhuNos: function () {
      this.getSiteEnv()
    },
    toggleTimes: function () {
      if (this.activeBtn === 0) {
        this.getSiteEnv()
      } else {
        this.getTrend()
      }
    },
    searchGraph: function () {
      this.searchloading = true
      this.loading = true
      if (this.activeBtn === 0) {
        this.getSiteEnv()
      } else {
        this.getTrend()
      }
    }
  }
}
</script>
