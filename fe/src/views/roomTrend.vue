<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <v-bottom-navigation
        :value="activeBtn"
        grow
        dark
        color="white"
      >
      <span class="mt-3">객실 상태 그래프</span>
      </v-bottom-navigation>
      <div>
        <br>
        <v-row>
          <br>
          <v-col class="d-flex" cols="12" sm="1">
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
          <div class="ma-0 pa-0 mb-n3">
            <v-chip
              class="ma-0 ml-5 mb-n3"
              color="orange"
              label
              outlined
            >
            {{graphTitle1}}
            </v-chip>
            <apexchart type=line width='1300px' height='400px' :options="this.chartOptionsLine1" :series="this.series1" />
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
            <apexchart type=line width='1300px' height='160px' :options="this.chartOptionsLine2" :series="this.series2" />
          </div>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>
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
    this.getRooms()
    // this.changGraph()
  },
  name: 'LineExample',
  data: function () {
    return {
      activeBtn: 0,
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }, { 'name': '전체', 'value': 0 }],
      datas: [],
      series1: [],
      chartOptionsLine1: [],
      series2: [],
      chartOptionsLine2: [],
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
    searchGraph () {
      this.searchloading = true
      this.loading = true
      this.getTrend(this.roomNo)
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
          var data6 = []
          var data7 = []
          var data8 = []
          var data9 = []
          var date = []
          var nCnt = 0
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '상태 정보'
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push(parseInt(this.datas[i].ucRoomState)+7)
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push(parseInt(this.datas[i].ucSetStatus)+2)
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push(parseInt(this.datas[i].ucCurStatus))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].fTset !== null && this.datas[i].fTset <= 60) {
              data3.push((this.datas[i].fTset).toFixed(2))
            } else {
              data3.push(-2)
            }
            if (this.datas[i].fTsurf_cur !== null && this.datas[i].fTsurf_cur <= 60) {
              data4.push((this.datas[i].fTsurf_cur).toFixed(2))
            } else {
              data4.push(-2)
            }
            if (this.datas[i].fTroom_cur !== null && this.datas[i].fTroom_cur <= 60) {
              data5.push((this.datas[i].fTroom_cur).toFixed(2))
            } else {
              data5.push(-2)
            }
            if (this.datas[i].fTroom_set !== null && this.datas[i].fTroom_set <= 60) {
              data6.push((this.datas[i].fTroom_set).toFixed(2))
            } else {
              data6.push(-2)
            }
            if (this.datas[i].fTsurf_set !== null && this.datas[i].fTsurf_set <= 60) {
              data7.push((this.datas[i].fTsurf_set).toFixed(2))
            } else {
              data7.push(-2)
            }
            if (this.datas[i].usManHeatingMode !== null && this.datas[i].usManHeatingMode <= 60) {
              if (this.datas[i].usManHeatingMode === '0') {
                data8.push(parseInt(this.datas[i].usManHeatingMode+6))
              } else if (this.datas[i].usManHeatingMode === '1') {
                data8.push(parseInt(this.datas[i].usManHeatingMode+5))
              } else {
                data8.push(parseInt(this.datas[i].usManHeatingMode+4))
              }
            } else {
              data8.push(-2)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur <= 60) {
              data9.push((this.datas[i].fTset_cur).toFixed(2))
            } else {
              data9.push(-2)
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
              name: '설정온도',
              data: data3
            },
            {
              name: '제어기설정온도',
              data: data9
            },
            {
              name: '실내설정온도',
              data: data6
            },
            {
              name: '바닥설정온도',
              data: data7
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
              name: '난방모드',
              data: data8
            },
            // {
            //   name: '재실정보',
            //   data: data0
            // },
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
              id: 'trendCht1',
              group: 'trend',
              width: '100%',
              toolbar: {
                show: false
              }
            },
            yaxis: {
                labels: {
                  show: true,
                  align: 'right',
                  minWidth: 50,
                  maxWidth: 50
              }
            },
            xaxis: {
              categories: date,
              type: 'datetime',
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
              id: 'trendCht2',
              group: 'trend',
              width: '100%',
              toolbar: {
                show: false
              }
            },
            yaxis: {
                labels: {
                  show: true,
                  align: 'right',
                  minWidth: 50,
                  maxWidth: 50
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
