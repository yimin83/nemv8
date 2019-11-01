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
        <v-row>
          <br>
          <v-col v-if="this.activeBtn === 0" class="d-flex" cols="4" sm="2">
            <v-select
              v-model="ahuNo.value"
              :items="this.ahuNos"
              item-value="value"
              item-text="name"
              label='공조기 선택'
              height=13
              max-width=100
              @change='toggleAhuNos()'
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
      time: { 'name': '5분', 'value': 300 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      activeBtn: 0,
      datas: [],
      envDatas: [],
      mergeDatas: [],
      series: [],
      chartOptions: [],
      startTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD 00:00'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD 23:59')
    }
  },
  methods: {
    changGraph () {
      if (this.activeBtn === 0) {
        this.getAhuTrend()
      } else {
        this.getTrend()
      }
    },
    getSiteEnv() {
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.envDatas = r.data
          // alert("getSiteEnv : " + JSON.stringify(this.envDatas))
          this.getAhuTrend()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    mergeData () {
      var Tout = 0
      this.mergeDatas = []
      for (var i = 0; i < this.datas.length; i++) {
        Tout = 0
        for (var j = 0; j < this.envDatas.length; j++) {
          if (this.datas[i].m === this.envDatas[j].m){
            Tout = this.envDatas[j].fTout
            break;
          }
        }
        if( Tout > 50 || Tout < -50) Tout = 0;
        this.mergeDatas.push({ 'ahu':this.datas[i], 'Tout':Tout });
      }
      // alert("data len : " + this.datas.length + ", envDatas len : " + this.envDatas.length + ", mergeDatas len : " + this.mergeDatas.length )
      // alert("data len : " + JSON.stringify(this.mergeDatas))
    },
    getAhuTrend () {
      // axios.put(`http://localhost:3000/api/rooms/solAhuTrend`, { ahuNo: ahuNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/solAhuTrend`, { ahuNo: this.ahuNo.value, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          // this.datas = []
          // this.datas.push('ahu': r.data, 'env':this.envDatas)
          this.datas = r.data
          this.mergeData()
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
          var data10 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            data0.push(this.mergeDatas[i].ahu.fData_damper_manual_set.toFixed(2))
            data1.push(this.mergeDatas[i].ahu.fData_temp_supply.toFixed(2))
            data2.push(this.mergeDatas[i].ahu.fData_temp_return.toFixed(2))
            data3.push((this.mergeDatas[i].ahu.cState_supplay_fan * 5).toFixed(2))
            data4.push((this.mergeDatas[i].ahu.cMode_damper_auto_manual * 10).toFixed(2))
            data5.push(this.mergeDatas[i].ahu.fData_hc_set_temp.toFixed(2))
            data6.push((this.mergeDatas[i].ahu.nPPMco2_cur / 10).toFixed(2))
            data7.push((this.mergeDatas[i].ahu.cMode_manual_mode * 15).toFixed(2))
            data8.push((this.mergeDatas[i].ahu.cMode_auto_mode * 15).toFixed(2))
            data9.push((this.mergeDatas[i].ahu.cMode_auto_manual * 20).toFixed(2))
            data10.push(this.mergeDatas[i].Tout.toFixed(2))
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series = [
            {
              name: '댐퍼설정값',
              data: data0
            },
            {
              name: '급기온도',
              data: data1
            },
            {
              name: '환기온도',
              data: data2
            },
            {
              name: '설정온도',
              data: data5
            },
            {
              name: '공급팬상태',
              data: data3
            },
            {
              name: '댐퍼자동수동',
              data: data4
            },
            {
              name: 'CO2',
              data: data6
            },
            {
              name: '수동팬설정',
              data: data7
            },
            {
              name: '자동팬설정',
              data: data8
            },
            {
              name: '팬자동수동',
              data: data9
            },
            {
              name: '외부온도',
              data: data10
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
    getTrend () {
      // axios.put(`http://localhost:3000/api/rooms/solTrend`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      axios.put(`${this.$apiRootPath}rooms/solTrend`, { startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var date = []
          var HCOnCnt = 0
          var HCOffCnt = 0
          var VentilationCnt = 0
          for (var i = 0; i < this.datas.length; i++) {
            HCOnCnt = 0;
            HCOffCnt = 0
            data1.push(this.datas[i].Tzone.toFixed(2))
            data2.push(this.datas[i].Rdamp.toFixed(2))
            data3.push((this.datas[i].PPMco2 / 100).toFixed(2))
            if (this.datas[i].HCOnCnt !== null) HCOnCnt = this.datas[i].HCOnCnt;
            if (this.datas[i].HCOffCnt !== null) HCOffCnt = this.datas[i].HCOffCnt;
            if (this.datas[i].VentilationCnt !== null) VentilationCnt = this.datas[i].VentilationCnt;
            data0.push(HCOnCnt.toFixed(2))
            data4.push(HCOffCnt.toFixed(2))
            data5.push(VentilationCnt.toFixed(2))
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series = [
            {
              name: '실내온도',
              data: data1
            },
            {
              name: '댐퍼설정값',
              data: data2
            },
            {
              name: 'CO2',
              data: data3
            },
            {
              name: '냉난방 on 수',
              data: data0
            },
            {
              name: '냉난방 off 수',
              data: data4
            },
            {
              name: '환기 수',
              data: data5
            },
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
    getAhus () {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfig`)
        .then((r) => {
          var ahuData = []
          for (var i = 0; i < r.data.length; i++) {
            if (i === 0) {
              this.ahuNo = { 'name': r.data[i].ahu_desc + '(' + r.data[i].ahu_name + ')', 'value': r.data[i].ahu_id }
            }
            ahuData.push({ 'name': r.data[i].ahu_desc + '(' + r.data[i].ahu_name + ')', 'value': r.data[i].ahu_id })
          }
          this.ahuNos = ahuData
          this.getSiteEnv()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    toggleAhuNos: function () {
      this.getSiteEnv()
    },
    toggleTimes: function () {
      if (this.activeBtn === 0) {
        this.getSiteEnv()
      } else {
        this.getTrend()
      }
    },
    searchGraph: function () {
      if (this.activeBtn === 0) {
        this.getSiteEnv()
      } else {
        this.getTrend()
      }
    }
  }
}
</script>
