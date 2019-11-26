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
        <br>
        <v-row>
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
            <apexchart type=line class="ma-0 pa-0" width='1300px' height='400px' :options="this.chartOptionsLine1" :series="this.series1" />
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
            <apexchart type=line class="ma-0 pa-0" width='1300px' height='160px' :options="this.chartOptionsLine2" :series="this.series2" />
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
    this.getStatTrend()
  },
  name: 'LineExample',
  data: function () {
    return {
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      datas: [],
      series1: [],
      chartOptionsLine1: [],
      series2: [],
      chartOptionsLine2: [],
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
      this.getStatTrend()
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
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '난방 정보'
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
          this.series2 = [
            {
              name: '난방 가동 수',
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
              id: 'avgTrendCht1',
              group: 'avgTrend',
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
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            chart: {
              id: 'avgTrendCht1',
              group: 'avgTrend',
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
    }
  }
}
</script>
