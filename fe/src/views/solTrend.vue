<template>
  <v-container grid-list-md>
    <v-layout row wrap >
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
    this.getTrend()
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
    getTrend() {
      axios.get(`${this.$apiRootPath}rooms/solTrend`)
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var date = []
          for(var i = 0; i<this.datas.length; i++){
            data0.push(this.datas[i].FanOperationCnt.toFixed(2))
            data1.push(this.datas[i].Tzone.toFixed(2))
            data2.push(this.datas[i].Rdamp.toFixed(2))
            data3.push(this.datas[i].PPMco2.toFixed(2))
            date.push(new Date(this.datas[i].CurTime*1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
          }
          this.series = [
            {
              name: 'FanOperationCnt',
              data: data0
            },
            {
              name: 'Tzone',
              data: data1
            },
            {
              name: 'Rdamp',
              data: data2
            },
            {
              name: 'PPMco2',
              data: data3
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
