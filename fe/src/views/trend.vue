<template>
  <v-container grid-list-md>
    <v-layout row wrap >
      <div>
        <br>
        <v-select
          :items='roomNos'
          v-model='roomNo'
          auto
          label='room number'
          hide-details
          height=13
          class='pa-0'
          @change='toggleRoomNos()'
        ></v-select>
      </div>
      <div>
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
  },
  name: 'LineExample',
  data: function() {
    return {
      datas:[],
      series:[],
      chartOptions: [],
      roomNos:[],
      roomNo:201
    }
  },
  methods: {
    getTrend(usRoomNo) {
      axios.get(`http://localhost:3000/api/rooms/getRoomTrend/${usRoomNo}`)
        .then((r) => {
          this.datas = r.data
          var data0 = [];
          var data1 = [];
          var data2 = [];
          var data3 = [];
          var data4 = [];
          var data5 = [];
          var date = [];
          for(var i = 0; i<this.datas.length; i++){
            data0.push((this.datas[i].ucRoomState*5).toFixed(2))
            data1.push((this.datas[i].ucSetStatus*10).toFixed(2))
            data2.push((this.datas[i].ucCurStatus*15).toFixed(2))
            data3.push(this.datas[i].fTset.toFixed(2))
            data4.push(this.datas[i].fTsurf_cur.toFixed(2))
            data5.push(this.datas[i].fTroom_cur.toFixed(2))
            date.push(new Date(this.datas[i].nSetLastTime*1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
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
          this.chartOptions  = {
            xaxis: {
                categories: date,
            },
            tooltip: {
              x: {
                format: 'dd MMM yyyy'
              }
            },
          }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRooms() {
      axios.get('http://localhost:3000/api/rooms')
        .then((r) => {
          var roomsData = [];
          for(var i = 0; i < r.data.length; i++){
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
    generateDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    },
    updateChart() {
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
