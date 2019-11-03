<template>
  <v-container grid-list-md>
    <v-simple-table dense class="elevation-3">
      <template>
        <thead>
          <tr>
            <th class="text-center" rowspan="2">구분</th>
            <th class="text-center" colspan="4">냉난방모드</th>
            <th class="text-center" colspan="2">Fan</th>
            <th class="text-center" colspan="3">Damper</th>
            <th class="text-center" colspan="2">CO2센서</th>
          </tr>
          <tr>
            <th class="text-center">냉난방<br>설정모드</th>
            <th class="text-center">냉난방<br>설정온도</th>
            <th class="text-center">실내온도</th>
            <th class="text-center">AHU동작</th>
            <th class="text-center">FAN<br>동작설정</th>
            <th class="text-center">공급FAN<br>상태</th>
            <th class="text-center">Damper<br>설정모드</th>
            <th class="text-center">Damper<br>설정값</th>
            <th class="text-center">Damper<br>현재값</th>
            <th class="text-center">CO2<br>설정값</th>
            <th class="text-center">CO2<br>현재값</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="zone in mergezones">
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.ahu.ahu_desc}}({{zone.ahu.ahu_name}})</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.hc_mode}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.zone.fData_hc_set_temp}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.zone.fData_temp_return}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.nHCState}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.manual_mode}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.supplay_fan}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.damper_auto_manual}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.zone.nRdamp_set}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.zone.fData_damper_manual_set}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.zone.nPPMco2_set}}</td>
            <td class="text-center ma-0 pa-0 pt-3 pb-2">{{zone.zone.nPPMco2_cur}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  created () {
    this.getAhus()
    this.getZones()
    this.timer = setInterval(this.getAhus, 10000)
    this.timer = setInterval(this.getZones, 10000)
  },
  data () {
    return {
      settingTitle: '',
      mergezones: [],
      ahus: [],
      zones: [],
      hcModes: ['난방', '냉방'],
      manualModes: ['중지', '가동'],
      damperAutoManual: ['자동', '수동'],
      ahuOperMode: ['난방ON', '냉방ON', '난방OFF', '냉방OFF']
    }
  },
  methods: {
    getAhus () {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfigDB`)
        .then((r) => {
          this.ahus = r.data
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getZones () {
      // axios.get(`http://localhost:3000/api/rooms/zones`)
      axios.get(`${this.$apiRootPath}rooms/zones`)
        .then((r) => {
          this.zones = r.data
          this.mergeZonesAhu()
        })
        .catch((e) => {
          alert('getZones error : ' + e.message)
          console.error(e.message)
        })
    },
    mergeZonesAhu () {
      var trncMode_hc_mode
      var trncMode_manual_mode
      var trncMode_damper_auto_manual
      var trncState_supplay_fan
      var trncState_ahu
      this.mergezones = []
      for (var i = 0; i < this.zones.length; i++) {
        trncMode_hc_mode = (this.zones[i].cMode_hc_mode !== -1) ? this.hcModes[this.zones[i].cMode_hc_mode] : '중지'
        trncMode_manual_mode = (this.zones[i].cMode_manual_mode !== -1) ? this.manualModes[this.zones[i].cMode_manual_mode] : '미설정'
        trncState_supplay_fan = (this.zones[i].cState_supplay_fan !== -1) ? this.manualModes[this.zones[i].cState_supplay_fan] : '미설정'
        trncMode_damper_auto_manual = (this.zones[i].cMode_damper_auto_manual !== -1) ? this.damperAutoManual[this.zones[i].cMode_damper_auto_manual] : '미설정'
        trncState_ahu = (this.zones[i].nHCState !== -1) ? this.ahuOperMode[this.zones[i].nHCState] : '미설정'
        this.mergezones.push({ zone: this.zones[i], ahu: this.ahus[i], hc_mode: trncMode_hc_mode, manual_mode: trncMode_manual_mode, supplay_fan: trncState_supplay_fan, damper_auto_manual: trncMode_damper_auto_manual, nHCState: trncState_ahu })
      }
    }
  }
}
</script>
