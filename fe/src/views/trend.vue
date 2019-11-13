<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-bottom-navigation
        :value="activeBtn"
        grow
        color="teal"
        @change="changGraph()"
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
          <v-col class="d-flex" cols="12" sm="2" v-if="this.activeBtn === 0">
            <v-select
              :items='roomNos'
              v-model='roomNo'
              label='방번호'
              class='ma-0 mt-1 pa-0 grey--text caption'
            ></v-select>
          </v-col>
            <br>
          <v-col class="d-flex" sm="2">
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
          <v-col class="d-flex" sm="3">
            <v-text-field label='시작일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='startTime'></v-text-field>
          </v-col>
          <v-col class="d-flex" sm="3">
            <v-text-field label='종료일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='endTime'></v-text-field>
          </v-col>
          <v-col class="d-flex" sm="1">
            <v-btn @click="searchGraph()">
              <span>검색</span>
            </v-btn>
          </v-col>
        </v-row>
        <div id="wrapper">
          <div id="chart-line">
            <apexchart type=line width='1300px' height='400px' :options="chartOptionsLine1" :series="series1" />
          </div>
          <div id="chart-line2">
            <apexchart type=line width='1300px' height='160px' :options="chartOptionsLine2" :series="series2" />
          </div>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
Apex = {
  animations: { enabled: false },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
    //dashArray: [0,10],
  },
  toolbar: {
    tools: {
      selection: false
    }
  },
  grid: {
    clipMarkers: false
  },
  yaxis: {
    tickAmount: 3
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  xaxis: {
    type: 'datetime'
  }
}
export default {
  mounted () {
    this.getRooms()
    // this.changGraph()
  },
  name: 'LineExample',
  data: function () {
    return {
      activeBtn: 0,
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      datas: [],
      series1: [],
      chartOptionsLine1: [],
      series2: [],
      chartOptionsLine2: [],
      pSize: 0,
      phSize: 0,
      roomNos: [],
      roomNo: 201,
      startTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD 00:00'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD 23:59')
    }
  },
  methods: {
    changGraph () {
      if (this.activeBtn === 0) {
        this.getTrend(this.roomNo)
      } else {
        this.getStatTrend()
      }
    },
    searchGraph () {
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
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].HeatingCnt !== null) {
              data0.push(this.datas[i].HeatingCnt.toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.datas[i].HeatingRoomCnt !== null) {
              data1.push(this.datas[i].HeatingRoomCnt.toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.datas[i].Tsurf_avg < 50) {
              (this.datas[i].Tsurf_avg !== null) ? data2.push(this.datas[i].Tsurf_avg.toFixed(2)) : data2.push(-1)
            } else {
              data2.push(-1)
            }
            if (this.datas[i].Troom_avg < 50) {
              (this.datas[i].Troom_avg !== null) ? data3.push(this.datas[i].Troom_avg.toFixed(2)) : data3.push(-1)
            } else {
              data3.push(-1)
            }
            if (this.datas[i].Tout < 50) {
              (this.datas[i].Tout !== null) ? data4.push(this.datas[i].Tout.toFixed(2)) : data4.push(-1)
            } else {
              data4.push(-1)
            }
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series1 = [
            {
              name: '평균바닥온도',
              type: 'line',
              data: data2
            },
            {
              name: '평균실내온도',
              type: 'line',
              data: data3
            },
            {
              name: '외기온도',
              type: 'line',
              data: data4
            }
          ]
          this.series2 = [
            {
              name: '난방 가동 수',
              type: 'line',
              data: data0
            },
            {
              name: '난방 설정 수',
              type: 'line',
              data: data1
            }
          ]
          this.chartOptionsLine1 = {
            chart: {
              id: 'fb',
              group: 'social'
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
              id: 'tw',
              group: 'social'
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
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push(this.datas[i].ucRoomState.toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push(this.datas[i].ucSetStatus.toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push(this.datas[i].ucCurStatus.toFixed(2))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].fTset !== null && this.datas[i].fTset < 50) {
              data3.push((this.datas[i].fTset).toFixed(2))
            } else {
              data3.push(-1)
            }
            if (this.datas[i].fTsurf_cur !== null && this.datas[i].fTsurf_cur < 50) {
              data4.push((this.datas[i].fTsurf_cur).toFixed(2))
            } else {
              data4.push(-1)
            }
            if (this.datas[i].fTroom_cur !== null && this.datas[i].fTroom_cur < 50) {
              data5.push((this.datas[i].fTroom_cur).toFixed(2))
            } else {
              data5.push(-1)
            }
            // if(i === 0) alert(new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(0, 10) + ' ' + new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(11, 5))
            // date.push(new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(0, 10) + ' ' + new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(11, 5) )
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series1 = [
            {
              name: '설정온도',
              data: data3
            },
            {
              name: '현재바닥온도',
              data: data4
            },
            {
              name: '현재실내온도',
              data: data5
            }
          ]
          this.series2 = [
            {
              name: '방상태',
              data: data0
            },
            {
              name: '난방설정상태',
              data: data1
            },
            {
              name: '난방가동상태',
              data: data2
            }
          ]
          this.chartOptionsLine1 = {
            chart: {
              id: 'fb',
              group: 'social'
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
              id: 'tw',
              group: 'social'
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
    },
    toggleRoomNos: function () {
      if (this.activeBtn === 0) {
        this.getTrend(this.roomNo)
      } else {
        this.getStatTrend()
      }
    },
    toggleTimes: function () {
      if (this.activeBtn === 0) {
        this.getTrend(this.roomNo)
      } else {
        this.getStatTrend()
      }
    }
  }
}
</script>
