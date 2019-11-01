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
              label='room number'
              height=13
              max-width=30
              @change='toggleRoomNos()'
            ></v-select>
          </v-col>
            <br>
          <v-col class="d-flex" sm="1">
            <br>
            <v-select
              v-model="time.value"
              :items="this.times"
              item-value="value"
              item-text="name"
              label='시간단위'
              height=13
              max-width=120
              @change='toggleTimes()'
            ></v-select>
          </v-col>
          <v-col class="d-flex" sm="3">
            <v-text-field label='시작일' hide-details class='d-inline-flex ma-0 pa-0' v-model='startTime'></v-text-field>
          </v-col>
          <v-col class="d-flex" sm="3">
            <v-text-field label='종료일' hide-details class='d-inline-flex  ma-0 pa-0' v-model='endTime'></v-text-field>
          </v-col>
          <v-col class="d-flex" sm="3">
            <v-btn @click="searchGraph()">
              <span>검색</span>
            </v-btn>
          </v-col>
        </v-row>
        <apexchart max-width="1500" height="700" type="line" :options="chartOptions" :series="series" ></apexchart>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getRooms()
    // this.changGraph()
  },
  name: 'LineExample',
  data: function () {
    return {
      activeBtn: 0,
      time: { 'name': '5분', 'value': 300 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      datas: [],
      series: [],
      chartOptions: [],
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
            data0.push(this.datas[i].HeatingCnt.toFixed(2))
            data1.push(this.datas[i].HeatingRoomCnt.toFixed(2))
            data2.push(this.datas[i].Tsurf_avg.toFixed(2))
            data3.push(this.datas[i].Troom_avg.toFixed(2))
            data4.push(this.datas[i].Tout.toFixed(2))
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series = [
            {
              name: '난방 가동 수',
              data: data0
            },
            {
              name: '난방 설정 수',
              data: data1
            },
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
          ]
          this.chartOptions = {
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                //format: 'yy/MM/dd HH:mm',
                formatter: function(value) {
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
            data0.push((this.datas[i].ucRoomState * 5).toFixed(2))
            data1.push((this.datas[i].ucSetStatus * 10).toFixed(2))
            data2.push((this.datas[i].ucCurStatus * 15).toFixed(2))
            data3.push(this.datas[i].fTset.toFixed(2))
            data4.push(this.datas[i].fTsurf_cur.toFixed(2))
            data5.push(this.datas[i].fTroom_cur.toFixed(2))
            //if(i === 0) alert(new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(0, 10) + ' ' + new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(11, 5))
            //date.push(new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(0, 10) + ' ' + new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(11, 5) )
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series = [
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
            },
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
          this.chartOptions = {
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                //format: 'yy/MM/dd HH:mm',
                formatter: function(value) {
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
