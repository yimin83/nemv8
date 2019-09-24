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
    this.getTrend(201)
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
          var date = [];
          for(var i = 0; i<this.datas.length; i++){
            data0.push((this.datas[i].fTroom_cur*100).toFixed(2))
            data1.push((this.datas[i].fTsurf_cur*100).toFixed(2))
            data2.push(this.datas[i].fManTset.toFixed(2))
            date.push(new Date(this.datas[i].nCheckInTime*1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
          }
          this.series = [
            {
              name: 'fTroom_cur',
              data: data0
            },
            {
              name: 'fTsurf_cur',
              data: data1
            },
            {
              name: 'fManTset',
              data: data2
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
