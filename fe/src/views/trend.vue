<template>
  <div class="example">
    <apexchart width="1000" height="700" type="line" :options="chartOptions" :series="series" ></apexchart>
    <div>
       <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.getTrend(201)
  },
  name: 'LineExample',
  data: function() {
    return {
      datas:[],
      series:[],
      chartOptions: {
        xaxis: {
          type: 'datetime',
          format: 'yyyy MM dd',
          categories: ['01/01/2003', '02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003'],
        },
      },
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
        //   chartOptions: {
        //     xaxis: {
        //       type: 'datetime',
        //       categories: ['01/01/2003', '02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003'],
        //     },
        //   },
        //   series: [{
        //     name: 'Series A',
        //     data: [30, 40, 45, 50, 49, 60, 70, 91]
        //   }, {
        //     name: 'Series B',
        //     data: [23, 43, 54, 12, 44, 52, 32, 11]
        //   }]

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
