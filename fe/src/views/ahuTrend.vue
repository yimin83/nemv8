<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-bottom-navigation
        :value="activeBtn"
        grow
        dark
        color="white"
      >
      <span class="mt-3">공조기 상태 그래프</span>
      </v-bottom-navigation>
      <div>
        <v-row>
          <v-col v-if="this.activeBtn === 0" class="d-flex pa-0 ma-0 mt-3 ml-3" cols="12" sm="8">
            &nbsp;&nbsp;
            <v-autocomplete
              v-model="ahuNo.value"
              :items="this.ahuNos"
              item-value="value"
              item-text="name"
              label='공조기 선택'
              class='grey--text caption'
            ></v-autocomplete>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <v-autocomplete
              v-model="time.value"
              :items="this.times"
              item-value="value"
              item-text="name"
              label='시간단위'
              style='max-width:80px'
              class='grey--text caption'
            ></v-autocomplete>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <v-menu
                v-model='startMenu'
                :close-on-content-click='false'
                :nudge-right='40'
                lazy
                transition='scale-transition'
                offset-y
                full-width
                min-width='290px'
              >
              <template v-slot:activator='{ on }'>
                <v-text-field
                  v-model='startDate'
                  label='시작일'
                  prepend-icon='event'
                  readonly
                  v-on='on'
                  style='max-width:120px'
                ></v-text-field>
              </template>
              <v-date-picker v-model='startDate' no-title @input='startMenu = false'></v-date-picker>
            </v-menu>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <v-text-field
            v-model="startTime"
            label="시작시간"
            type="time"
            style="max-width:100px"></v-text-field>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-menu
                v-model='endMenu'
                :close-on-content-click='false'
                :nudge-right='40'
                lazy
                transition='scale-transition'
                offset-y
                full-width
                min-width='290px'
              >
              <template v-slot:activator='{ on }'>
                <v-text-field
                  v-model='endDate'
                  label='종료일'
                  prepend-icon='event'
                  readonly
                  v-on='on'
                  style='max-width:120px'
                ></v-text-field>
              </template>
              <v-date-picker v-model='endDate' no-title @input='endMenu = false'></v-date-picker>
            </v-menu>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <v-text-field
            v-model="endTime"
            label="종료시간"
            type="time"
            style="max-width:100px"></v-text-field>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn class="d-flex" :loading="searchloading" :disabled="loading" @click="searchGraph()">
              <span>검색</span>
            </v-btn>
          </v-col>
        </v-row>
        <div>
          <div class="ma-0 pa-0 mb-n3">
            <apexchart type=line width='1283px' height=300 :options="chartOptionsLine1" :series="series1" />
          </div>
          <div class="ma-0 pa-0 mb-n3">
            <apexchart type=line width='1399px' height=210 :options="chartOptionsLine2" :series="series2" />
          </div>
          <div class="ma-0 pa-0 mb-n3">
            <apexchart type=line width='1273px' height=250 class='ml-3' :options="chartOptionsLine3" :series="series3" />
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
// Apex = {
//   stroke: {
//     show: true,
//     curve: 'smooth',
//     lineCap: 'butt',
//     width: 3,
//     //dashArray: [0,10],
//   },
//   yaxis: {
//     tickAmount: 3
//   }
// }
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
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }, { 'name': '전체', 'value': 0 }],
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
      startMenu:false,
      startDate: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY-MM-DD'),
      startTime: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('HH:mm'),
      endMenu:false,
      endDate: this.$moment(new Date().toISOString()).format('YYYY-MM-DD'),
      endTime: this.$moment(new Date().toISOString()).format('HH:mm'),
      searchloading: false,
      loading: false,
      graphTitle1: '온도 정보',
      graphTitle2: 'CO2 농도',
      graphTitle3: '설정 및 상태 정보'
    }
  },
  methods: {
    getSiteEnv () {
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: startDateTime, endTime: endDateTime, time: this.time.value })
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
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/solAhuTrend`, { ahuNo: this.ahuNo.value, startTime: startDateTime, endTime: endDateTime, time: this.time.value })
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
          var data11 = []
          var date = []
          var nCnt = 0
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
              data3.push(parseInt(this.mergeDatas[i].ahu.cState_supplay_fan)+6/*9*/)
            } else {
              data3.push(-1)
            }
            if (this.datas[i].cMode_damper_auto_manual !== null) {
              data4.push(parseInt(this.mergeDatas[i].ahu.cMode_damper_auto_manual)+8/*12*/)
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
              data7.push(parseInt(this.mergeDatas[i].ahu.cMode_manual_mode)+4/*6*/)
            } else {
              data7.push(-1)
            }
            if (this.datas[i].cMode_auto_mode !== null) {
              data8.push(parseInt(this.mergeDatas[i].ahu.cMode_auto_mode)+2/*3*/)
            } else {
              data8.push(-1)
            }
            if (this.datas[i].cMode_auto_manual !== null) {
              data9.push(parseInt(this.mergeDatas[i].ahu.cMode_auto_manual))
            } else {
              data9.push(-1)
            }
            if (this.datas[i].Tout !== null) {
              data10.push(this.mergeDatas[i].Tout.toFixed(2))
            } else {
              data10.push(-1)
            }
            if (this.datas[i].fData_damper_outer_set !== null) {
              data11.push(this.mergeDatas[i].ahu.fData_damper_outer_set.toFixed(2))
            } else {
              data11.push(-1)
            }
            if (this.time.value === 0 ){
              date.push(new Date((this.datas[i].m + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 3
            } else {
              date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 0
            }
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
            },
            {
              name: '외기설정값',
              data: data0
            },
            {
              name: '외기현재값',
              data: data11
            }
          ]
          this.series3 = [
            {
              name: '댐퍼자동수동',
              data: data4
            },
            {
              name: '공급팬상태',
              data: data3
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
              id: 'ahuChart1',
              group: 'ahuChart',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            title: {
                text: '온도 정보',
                align: 'center',
                margin: -20,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '16px',
                  color:  'orange'
                },
            },
            stroke: {
              width: 2,
              //dashArray: [0,10],
            },
            yaxis: {
              labels: {
                show: true,
                align: 'right',
                minWidth: 83,
                maxWidth: 83,
              }
            },
            xaxis: {
              type: 'datetime',
              width: '100%',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            chart: {
              id: 'ahuChart2',
              group: 'ahuChart',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            stroke: {
              width: 2,
              //dashArray: [0,10],
            },
            title: {
                text: 'CO2',
                align: 'center',
                margin: -20,
                offsetX: -55,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '16px',
                  color:  'orange'
                },
            },
            yaxis: [
              {
                opposite: false,
                title: {
                  text: 'CO2'
                },
                labels: {
                  show: true,
                  align: 'right',
                  style: {
                      color: "#008ffb",
                  },
                  minWidth: 199,
                  maxWidth: 199,
                },
              },
              {
                opposite: true,
                title: {
                  text: '외기설정값'
                },
                labels: {
                  show: true,
                  align: 'right',
                  style: {
                      color: "#00e396",
                  },
                  formatter: function (value) {
                    return parseInt(value)
                  }
                },
              },
              {
                opposite: true,
                title: {
                  text: '외기현재값'
                },
                labels: {
                  show: true,
                  align: 'right',
                  style: {
                      color: "#feb019",
                  },
                  formatter: function (value) {
                    return parseInt(value)
                  }
                },
              },
            ],
            xaxis: {
              type: 'datetime',
              width: '100%',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.chartOptionsLine3 = {
            chart: {
              id: 'ahuChart3',
              group: 'ahuChart',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            stroke: {
              width: 2,
              //dashArray: [0,10],
            },
            title: {
                text: '설정 및 상태정보',
                align: 'center',
                margin: -20,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '16px',
                  color:  'orange'
                },
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: [
              {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 8/*12*/) {
                      y = "자동"
                    } else {
                      y = "수동"
                    }
                  }
                  return y;
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 6/*9*/) {
                      y = "정지"
                    } else {
                      y = "가동"
                    }
                  }
                  return y;
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 4/*6*/) {
                      y = "정지"
                    } else {
                      y = "가동"
                    }
                  }
                  return y;
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 2/*3*/) {
                      y = "정지"
                    } else {
                      y = "가동"
                    }
                  }
                  return y;
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 0) {
                      y = "자동"
                    } else {
                      y = "수동"
                    }
                  }
                  return y;
                }
              }]
            },
            yaxis: {
              min: 0,
              max: 10,
              tickAmount:10,
              labels: {
                show: true,
                align: 'right',
                minWidth: 73,
                maxWidth: 73,
                formatter: function (value) {
                  var retVal

                  if(typeof value !== "undefined") {
                    retVal = ""
                    switch(value){
                      case 0:
                      case 8/*12*/:
                        retVal = "A"
                      break;
                      case 1:
                      case 9/*13*/:
                        retVal = "M"
                      break;
                      /*case 3:
                      case 6:
                      case 9:*/
                      case 2:
                      case 4:
                      case 6:
                        retVal = "Off"
                      break;
                      /*case 4:
                      case 7:
                      case 10:*/
                      case 3:
                      case 5:
                      case 7:
                        retVal = "On"
                      break;
                    }

                    return retVal;
                  }
                }
              }
            },
            xaxis: {
              type: 'datetime',
              width: '100%',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
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
    searchGraph: function () {
      this.searchloading = true
      this.loading = true
      this.getSiteEnvSearch()
    },
    getSiteEnvSearch () {
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: startDateTime, endTime: endDateTime, time: this.time.value })
        .then((r) => {
          this.envDatas = r.data
          // alert("getSiteEnv : " + JSON.stringify(this.envDatas))
          this.getAhuTrendSearch()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getAhuTrendSearch () {
      // axios.put(`http://localhost:3000/api/rooms/solAhuTrend`, { ahuNo: ahuNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/solAhuTrend`, { ahuNo: this.ahuNo.value, startTime: startDateTime, endTime: endDateTime, time: this.time.value })
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
          var data11 = []
          var date = []
          var nCnt = 0
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
              data3.push(parseInt(this.mergeDatas[i].ahu.cState_supplay_fan)+6/*9*/)
            } else {
              data3.push(-1)
            }
            if (this.datas[i].cMode_damper_auto_manual !== null) {
              data4.push(parseInt(this.mergeDatas[i].ahu.cMode_damper_auto_manual)+8/*12*/)
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
              data7.push(parseInt(this.mergeDatas[i].ahu.cMode_manual_mode)+4/*6*/)
            } else {
              data7.push(-1)
            }
            if (this.datas[i].cMode_auto_mode !== null) {
              data8.push(parseInt(this.mergeDatas[i].ahu.cMode_auto_mode)+2/*3*/)
            } else {
              data8.push(-1)
            }
            if (this.datas[i].cMode_auto_manual !== null) {
              data9.push(parseInt(this.mergeDatas[i].ahu.cMode_auto_manual))
            } else {
              data9.push(-1)
            }
            if (this.datas[i].Tout !== null) {
              data10.push(this.mergeDatas[i].Tout.toFixed(2))
            } else {
              data10.push(-1)
            }
            if (this.datas[i].fData_damper_outer_set !== null) {
              data11.push(this.mergeDatas[i].ahu.fData_damper_outer_set.toFixed(2))
            } else {
              data11.push(-1)
            }
            if (this.time.value === 0 ){
              date.push(new Date((this.datas[i].m + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 3
            } else {
              date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 0
            }
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
            },
            {
              name: '외기설정값',
              data: data0
            },
            {
              name: '외기현재값',
              data: data11
            }
          ]
          this.series3 = [
            {
              name: '댐퍼자동수동',
              data: data4
            },
            {
              name: '공급팬상태',
              data: data3
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
            xaxis: {
              type: 'datetime',
              width: '100%',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            xaxis: {
              type: 'datetime',
              width: '100%',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.chartOptionsLine3 = {
            xaxis: {
              type: 'datetime',
              width: '100%',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
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
    }
  }
}
</script>
