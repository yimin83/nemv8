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
          <span>공조기 상태 그래프</span>
        </v-btn>
        <v-btn @click="activeBtn = 1">
          <span>평균 그래프</span>
        </v-btn>
      </v-bottom-navigation>
      <div>
        <br>
        <v-col class="d-flex" cols="12" sm="3" v-if="this.activeBtn === 0">
          <v-select
            v-model="ahuNo.value"
            :items="this.ahuNos"
            item-value="value"
            item-text="name"
            auto
            label='공조기 선택'
            hide-details
            height=13
            max-width=100
            class='pa-0'
            @change='toggleAhuNos()'
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
    this.getAhus()
  },
  name: 'LineExample',
  data: function () {
    return {
      ahuNo: { 'name': '그라시아스(AHU1)', 'value': 1 },
      ahuNos: [],
      activeBtn: 0,
      datas: [],
      series: [],
      chartOptions: []
    }
  },
  methods: {
    changGraph () {
      if (this.activeBtn === 0) {
        this.getAhuTrend(1)
      } else {
        this.getTrend()
      }
    },
    getAhuTrend (ahuNo) {
      axios.get(`http://localhost:3000/api/rooms/solAhuTrend/${ahuNo}`)
      // axios.get(`${this.$apiRootPath}rooms/solAhuTrend/${ahuNo}`)
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            data0.push(this.datas[i].fData_damper_manual_set.toFixed(2))
            data1.push(this.datas[i].fData_temp_supply.toFixed(2))
            data2.push(this.datas[i].nPPMco2_cur.toFixed(2))
            date.push(this.$moment(new Date(this.datas[i].nLastUpdateTime * 1000 + (9 * 60 * 60 * 1000)).toISOString()).format('YYYY/MM/DD kk:mm:ss'))
          }
          this.series = [
            {
              name: 'fData_damper_manual_set',
              data: data0
            },
            {
              name: 'fData_temp_supply',
              data: data1
            },
            {
              name: 'nPPMco2_cur',
              data: data2
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
    getTrend () {
      axios.get(`http://localhost:3000/api/rooms/solTrend`)
      // axios.get(`${this.$apiRootPath}rooms/solTrend`)
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            data0.push(this.datas[i].FanOperationCnt.toFixed(2))
            data1.push(this.datas[i].Tzone.toFixed(2))
            data2.push(this.datas[i].Rdamp.toFixed(2))
            data3.push(this.datas[i].PPMco2.toFixed(2))
            date.push(this.$moment(new Date(this.datas[i].CurTime * 1000 + (9 * 60 * 60 * 1000)).toISOString()).format('YYYY/MM/DD kk:mm:ss'))
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
    getAhus () {
      axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      // axios.get(`${this.$apiRootPath}rooms/ahusConfig`)
        .then((r) => {
          var ahuData = []
          for (var i = 0; i < r.data.length; i++) {
            if (i === 0) {
              this.ahuNo = { 'name': r.data[i].ahu_desc + '(' + r.data[i].ahu_name + ')', 'value': r.data[i].ahu_id }
            }
            ahuData.push({ 'name': r.data[i].ahu_desc + '(' + r.data[i].ahu_name + ')', 'value': r.data[i].ahu_id })
          }
          this.ahuNos = ahuData
          this.getAhuTrend(1)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    toggleAhuNos: function () {
      this.getAhuTrend(this.ahuNo.value)
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
