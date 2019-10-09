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
        <v-col class="d-flex" cols="12" sm="2" v-if="this.activeBtn === 0">
          <v-select
            :items='roomNos'
            v-model='roomNo'
            auto
            label='room number'
            hide-details
            height=13
            max-width=30
            class='pa-0'
            @change='toggleRoomNos()'
          ></v-select>
        </v-col>
        <apexchart width="1000" height="700" type="line" :options="chartOptions" :series="series" ></apexchart>
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
      datas: [],
      series: [],
      chartOptions: [],
      roomNos: [],
      roomNo: 201
    }
  },
  methods: {
    changGraph () {
      if (this.activeBtn === 0) {
        this.getTrend(201)
      } else {
        this.getStatTrend()
      }
    },
    getStatTrend () {
      // axios.get(`http://localhost:3000/api/rooms/roomStatTrend`)
      axios.get(`${this.$apiRootPath}rooms/roomStatTrend`)
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
            date.push(this.$moment(new Date(this.datas[i].CurTime * 1000).toISOString()).format('YYYY/MM/DD kk:mm:ss'))
          }
          this.series = [
            {
              name: 'HeatingCnt',
              data: data0
            },
            {
              name: 'HeatingRoomCnt',
              data: data1
            },
            {
              name: 'Tsurf_avg',
              data: data2
            },
            {
              name: 'Troom_avg',
              data: data3
            },
            {
              name: 'Tout',
              data: data4
            }
          ]
          this.chartOptions = {
            xaxis: {
              categories: date
            },
            tooltip: {
              x: {
                format: 'dd MMM yyyy'
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
      // axios.get(`http://localhost:3000/api/rooms/getRoomTrend/${usRoomNo}`)
      axios.get(`${this.$apiRootPath}rooms/getRoomTrend/${usRoomNo}`)
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
            date.push(this.$moment(new Date(this.datas[i].nSetLastTime * 1000).toISOString()).format('YYYY/MM/DD kk:mm:ss'))
          }
          this.series = [
            {
              name: 'ucRoomState',
              data: data0
            },
            {
              name: 'ucSetStatus',
              data: data1
            },
            {
              name: 'ucCurStatus',
              data: data2
            },
            {
              name: 'fTset',
              data: data3
            },
            {
              name: 'fTsurf_cur',
              data: data4
            },
            {
              name: 'fTroom_cur',
              data: data5
            }
          ]
          this.chartOptions = {
            xaxis: {
              categories: date
            },
            tooltip: {
              x: {
                format: 'dd MMM yyyy'
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
      this.getTrend(this.roomNo)
    },
    generateDayWiseTimeSeries (baseval, count, yrange) {
      var i = 0
      var series = []
      while (i < count) {
        var x = baseval
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        series.push([x, y])
        baseval += 86400000
        i++
      }
      return series
    },
    updateChart () {
      let series = [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: 'North',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 20
          })
        },

        {
          name: 'Central',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 15
          })
        }
      ]
      this.series = series
    }
  }
}
</script>
