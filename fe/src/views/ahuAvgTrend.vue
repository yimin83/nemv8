<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-bottom-navigation
        :value="activeBtn"
        grow
        dark
        color="white"
      >
      <span class="mt-3">평균 그래프</span>
      </v-bottom-navigation>
      <div>
        <v-row>
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
              class="ma-0 ml-5 mb-n5"
              color="orange"
              label
              outlined
            >
            {{graphTitle1}}
            </v-chip>
            <apexchart type=line width='1300px' height=300 :options="chartOptionsLine1" :series="series1" />
          </div>
          <div class="ma-0 pa-0 mb-n3">
            <v-chip
              class="ma-0 ml-5 mb-n3"
              color="orange"
              label
              outlined
            >
            {{graphTitle2}}
            </v-chip>
            <apexchart type=line width='1360px' height=200 :options="chartOptionsLine2" :series="series2" />
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
            <apexchart type=line width='1300px' height=200 class='ml-3' :options="chartOptionsLine3" :series="series3" />
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
    this.getTrend()
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
      startTime: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY/MM/DD HH:mm'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD HH:mm'),
      searchloading: false,
      loading: false,
      graphTitle1: '온도 정보',
      graphTitle2: 'CO2 농도',
      graphTitle3: '설정 및 상태 정보'
    }
  },
  methods: {
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
              data2.push(this.datas[i].Rdamp.toFixed(2))
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
            },
            {
              name: '환기비율',
              data: data2
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
            }
          ]
          this.chartOptionsLine1 = {
            chart: {
              id: 'ahuAvgChart1',
              group: 'ahuAvgChart',
              width: '100%',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            stroke: {
              width: 1,
              //dashArray: [0,10],
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
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            chart: {
              id: 'ahuAvgChart2',
              group: 'ahuAvgChart',
              width: '100%',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            stroke: {
              width: 1,
              //dashArray: [0,10],
            },
            yaxis: [{
              },
              {
                opposite: true,
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
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.chartOptionsLine3 = {
            chart: {
              id: 'ahuAvgChart3',
              group: 'ahuAvgChart',
              width: '100%',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            stroke: {
              width: 1,
              //dashArray: [0,10],
            },
            yaxis: {},
            xaxis: {
              type: 'datetime',
              width: '100%',
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
    searchGraph: function () {
      this.searchloading = true
      this.loading = true
      this.getTrend()
    }
  }
}
</script>
