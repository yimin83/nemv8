<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-bottom-navigation
        :value="activeBtn"
        grow
        dark
        color="white"
        @change="changeGraph()"
      >
        <v-btn @click="activeBtn = 0">
          <span>객실 상태 그래프</span>
        </v-btn>
        <v-btn @click="activeBtn = 1">
          <span>평균 그래프</span>
        </v-btn>
      </v-bottom-navigation>
      <div>
        <br>
        <v-row>
          <br>
          <v-col class="d-flex" cols="12" sm="1" v-if="this.activeBtn === 0">
            <v-select
              :items='roomNos'
              v-model='roomNo'
              label='방번호'
              class='ma-0 mt-1 pa-0 grey--text caption'
            ></v-select>
          </v-col>
            <br>
          <v-col class="d-flex" cols="12" sm="1">
            <br>
            <v-select
              v-model="time.value"
              :items="this.times"
              item-value="value"
              item-text="name"
              label='시간단위'
              class='ma-0 mt-1 pa-0 grey--text caption'
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="2">
            <v-text-field label='시작일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='startTime'></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="2">
            <v-text-field label='종료일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='endTime'></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="1">
            <v-btn class="d-flex" :loading="searchloading" :disabled="loading" @click="searchGraph()">
              <span>검색</span>
            </v-btn>
          </v-col>
        </v-row>
        <div>
          <div id="chart1" v-if="this.activeBtn === 0" class="ma-0 pa-0 mb-n3">
            <v-chip
              class="ma-0 ml-5 mb-n3"
              color="orange"
              label
              outlined
            >
            {{this.graphTitle1}}
            </v-chip>
            <apexchart type='line' width='1300px' height='400px' :options="this.chartOptionsLine1" :series="this.series1" />
          </div>
          <div id="chart2" v-if="this.activeBtn === 0" class="ma-0 pa-0 mb-n3">
            <v-chip
              class="ma-0 ml-5 mb-n3"
              color="orange"
              label
              outlined
            >
            {{this.graphTitle2}}
            </v-chip>
            <apexchart type='heatmap' width='1300px' height='160px' :options="this.chartOptionsLine2" :series="this.series2" />
          </div>
        </div>
        <div>
          <div id="chart3" v-if="this.activeBtn === 1" class="ma-0 pa-0 mb-n3">
            <v-chip
              class="ma-0 ml-5 mb-n3"
              color="orange"
              label
              outlined
            >
            {{this.graphTitle1}}
            </v-chip>
            <apexchart type='line' width='1300px' height='400px' :options="this.chartOptionsLine3" :series="this.series3" />
          </div>
          <div id="chart4" v-if="this.activeBtn === 1" class="ma-0 pa-0 mb-n3">
            <v-chip
              class="ma-0 ml-5 mb-n3"
              color="orange"
              label
              outlined
            >
            {{this.graphTitle2}}
            </v-chip>
            <apexchart type='line' width='1300px' height='160px' :options="this.chartOptionsLine4" :series="this.series4" />
          </div>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getRooms()
  },
  data: function () {
    return {
      activeBtn: 0,
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      statDatas: [],
      trandDatas: [],
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
      roomNos: [],
      roomNo: 201,
      startTime: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY/MM/DD HH:mm'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD HH:mm'),
      searchloading: false,
      loading: false,
      graphTitle1: '온도 정보',
      graphTitle2: '상태 정보'
    }
  },
  methods: {
    changeGraph () {
      this.time = { 'name': '10분', 'value': 600 }
      this.roomNo = 201
      this.startTime = this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY/MM/DD HH:mm')
      this.endTime = this.$moment(new Date().toISOString()).format('YYYY/MM/DD HH:mm')
      if (this.activeBtn === 0) {
        this.getTrend(this.roomNo)
      } else {
        this.getStatTrend()
      }
    },
    searchGraph () {
      this.searchloading = true
      this.loading = true
      if (this.activeBtn === 0) {
        this.getTrend(this.roomNo)
      } else {
        this.getStatTrend()
      }
    },
    getStatTrend () {
      // axios.put(`http://localhost:3000/api/rooms/roomStatTrend`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/roomStatTrend`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.trandDatas = []
          this.statDatas = []
          this.series3 = [];
          this.series4 = [];
          this.chartOptionsLine3 = [];
          this.chartOptionsLine4 = [];
          this.statDatas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var date = []
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '난방 정보'
          for (var i = 0; i < this.statDatas.length; i++) {
            if (this.statDatas[i].HeatingCnt !== null) {
              data0.push(this.statDatas[i].HeatingCnt.toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.statDatas[i].HeatingRoomCnt !== null) {
              data1.push(this.statDatas[i].HeatingRoomCnt.toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.statDatas[i].Tsurf_avg < 50) {
              (this.statDatas[i].Tsurf_avg !== null) ? data2.push(this.statDatas[i].Tsurf_avg.toFixed(2)) : data2.push(-1)
            } else {
              data2.push(-1)
            }
            if (this.statDatas[i].Troom_avg < 50) {
              (this.statDatas[i].Troom_avg !== null) ? data3.push(this.statDatas[i].Troom_avg.toFixed(2)) : data3.push(-1)
            } else {
              data3.push(-1)
            }
            if (this.statDatas[i].Tout < 50) {
              (this.statDatas[i].Tout !== null) ? data4.push(this.statDatas[i].Tout.toFixed(2)) : data4.push(-1)
            } else {
              data4.push(-1)
            }
            date.push(new Date((this.statDatas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series3 = [
            {
              name: '평균바닥온도',
              data: data2
            },
            {
              name: '평균실내온도',
              data: data3
            },
            {
              name: '외기온도',
              data: data4
            }
          ];
          this.series4 = [
            {
              name: '난방 설정 수',
              data: data1
            },
            {
              name: '난방 가동 수',
              data: data0
            }
          ];
          this.chartOptionsLine3 = {
            chart: {
              id: 'statCh1',
              group: 'stat',
              width: '100%',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
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
            },
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
          };
          this.chartOptionsLine4 = {
            chart: {
              id: 'statCh2',
              group: 'stat',
              width: '100%',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              }
            },
            stroke: {
              show: true,
              curve: 'smooth',
              lineCap: 'butt',
              colors: [ "#259ffb", "#25e6a5"],
              width: 3,
              //dashArray: [0,10],
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
            },
            yaxis: {
              tickAmount: 3
            }
          };
          this.searchloading = false
          this.loading = false
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getTrend (usRoomNo) {
      // axios.put(`http://localhost:3000/api/rooms/getRoomTrend`, { usRoomNo: usRoomNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/getRoomTrend`, { usRoomNo: usRoomNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.trandDatas = []
          this.trandDatas = r.data
          this.statDatas = []
          this.series1 = [];
          this.series2 = [];
          this.chartOptionsLine1 = [];
          this.chartOptionsLine2 = [];
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var date = []
          var heatData1 = []
          var heatData2 = []
          var heatData3 = []
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '상태 정보'
          // this.graphTitle4 = '상태 정보'
          for (var i = 0; i < this.trandDatas.length; i++) {
            if (this.trandDatas[i].ucRoomState !== null) {
              data0.push(this.trandDatas[i].ucRoomState.toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.trandDatas[i].ucSetStatus !== null) {
              data1.push(this.trandDatas[i].ucSetStatus.toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.trandDatas[i].ucCurStatus !== null) {
              data2.push(this.trandDatas[i].ucCurStatus.toFixed(2))
            } else {
              data2.push(-1)
            }
            if (this.trandDatas[i].fTset !== null && this.trandDatas[i].fTset < 50) {
              data3.push((this.trandDatas[i].fTset).toFixed(2))
            } else {
              data3.push(-1)
            }
            if (this.trandDatas[i].fTsurf_cur !== null && this.trandDatas[i].fTsurf_cur < 50) {
              data4.push((this.trandDatas[i].fTsurf_cur).toFixed(2))
            } else {
              data4.push(-1)
            }
            if (this.trandDatas[i].fTroom_cur !== null && this.trandDatas[i].fTroom_cur < 50) {
              data5.push((this.trandDatas[i].fTroom_cur).toFixed(2))
            } else {
              data5.push(-1)
            }
            date.push(new Date((this.trandDatas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          for(var i = 0; i< date.length; i++){
            heatData1.push({ x: date[i], y: (parseInt(data0[i])+4) })
            heatData2.push({ x: date[i], y: (parseInt(data1[i])+2) })
            heatData3.push({ x: date[i], y: data2[i] })
          };
          this.series1 = [
            {
              name: '설정온도',
              type: 'line',
              data: data3
            },
            {
              name: '현재바닥온도',
              type: 'line',
              data: data4
            },
            {
              name: '현재실내온도',
              type: 'line',
              data: data5
            }
          ];
          this.series2 = [
            {
              name: '난방가동상태',
              data: heatData3
            },
            {
              name: '난방설정상태',
              data: heatData2
            },
            {
              name: '재실정보',
              data: heatData1
            }
          ];
          this.chartOptionsLine1 = {
            chart: {
              width: '100%',
              id: 'lineCh1',
              group: 'trend',
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
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
            },
            stroke: {
              width: 1,
              //dashArray: [0,10],
            }
          };
          this.chartOptionsLine2 = {
            chart: {
              width: '100%',
              id: 'trendCh2',
              group: 'trend',
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
            plotOptions: {
              heatmap: {
                radius: 0,
                enableShades: false,
                shadeIntensity: 0,
                colorScale: {
                  ranges: [{
                      from: 1,
                      to: 1,
                      name: '설정',
                      color: '#E53935'
                    },
                    {
                      from: 0,
                      to: 0,
                      name: '해제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;',
                      color: '#ECEFF1'
                    },
                    {
                      from: 3,
                      to: 3,
                      name: '가동',
                      color: '#EC407A'
                    },
                    {
                      from: 2,
                      to: 2,
                      name: '중지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;',
                      color: '#ECEFF1'
                    },
                    {
                      from: 6,
                      to: 6,
                      name: '재실',
                      color: '#8E24AA'
                    },
                    {
                      from:5,
                      to: 5,
                      name: '예비',
                      color: '#CE93D8'
                    },
                    {
                      from: 4,
                      to: 4,
                      name: '공실',
                      color: '#ECEFF1'
                    }
                  ]
                }
              }
            },
            dataLabels: {
              enabled: false
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
          };
          this.searchloading = false
          this.loading = false
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRooms () {
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}rooms`)
        .then((r) => {
          var roomsData = []
          for (var i = 0; i < r.data.length; i++) {
            roomsData.push(r.data[i].usRoomNo)
          }
          this.roomNos = roomsData
          this.getTrend(201)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    }
  }
}
</script>
