<template>
  <v-container grid-list-md>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center" rowspan="2">구분</th>
            <th class="text-center" colspan="3">냉난방모드</th>
            <th class="text-center" colspan="2">Fan</th>
            <th class="text-center" colspan="3">Damper</th>
            <th class="text-center" colspan="2">CO2센서</th>
          </tr>
          <tr>
            <th class="text-center">냉난방설정모드</th>
            <th class="text-center">냉난방설정온도</th>
            <th class="text-center">실내온도</th>
            <th class="text-center">FAN동작설정</th>
            <th class="text-center">공급FAN상태</th>
            <th class="text-center">Damper 설정모드</th>
            <th class="text-center">Damper 설정값</th>
            <th class="text-center">Damper현재값</th>
            <th class="text-center">CO2설정값</th>
            <th class="text-center">CO2현재값</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="zone in mergezones">
            <td class="text-center">{{zone.ahu.ahu_desc}}({{zone.ahu.ahu_name}})</td>
            <td class="text-center">{{zone.zone.cMode_hc_mode}}</td>
            <td class="text-center">{{zone.zone.fData_hc_set_temp}}</td>
            <td class="text-center">{{zone.zone.fData_temp_return}}</td>
            <td class="text-center">{{zone.zone.cMode_manual_mode}}</td>
            <td class="text-center">{{zone.zone.cState_supplay_fan}}</td>
            <td class="text-center">{{zone.zone.cMode_damper_auto_manual}}</td>
            <td class="text-center">{{zone.zone.nRdamp_set}}</td>
            <td class="text-center">{{zone.zone.fData_damper_manual_set}}</td>
            <td class="text-center">{{zone.zone.nPPMco2_set}}</td>
            <td class="text-center">{{zone.zone.nPPMco2_cur}}</td>
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
      settingTitle : '',
      mergezones : [],
      ahus : [],
      zones : [],
      ahuConfig : [],
      rsvRoomModal: false,
      roomScheduleModal: false,
      settingAhuModal: false,
    }
  },
  methods: {
    getAhus () {
     // axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
     axios.get(`${this.$apiRootPath}rooms/ahusConfig`)
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
          alert("getZones error : " +e.message)
          console.error(e.message)
        })
    },
    mergeZonesAhu () {
      this.mergezones = []
      for(var i = 0; i < this.zones.length; i++){
        this.mergezones.push({ zone:this.zones[i], ahu:this.ahus[i]})
      }
    },
    settingAhu: function (ahuIndex) {
      // axios.get(`http://localhost:3000/api/rooms/ahusConfig/${ahuIndex}`)
      axios.get(`${this.$apiRootPath}rooms/ahusConfig/${ahuIndex}`)
        .then((r) => {
          this.ahuConfig = JSON.parse(r.data)
          for(var i=0; i < this.ahus.length ; i++){
            if(this.ahus[i].ahu_id == ahuIndex){
             this.settingTitle = this.ahus[i].ahu_desc + '('+this.ahus[i].ahu_id+'호 공조기)'
             break;
            }
          }
          this.$data.settingAhuModal = true
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })

    },
    saveSettingAhu: function (ahuIndex) {
      // axios.put(`http://localhost:3000/api/rooms/ahusConfig`, { config:this.ahuConfig })
      axios.put(`${this.$apiRootPath}rooms/ahusConfig`, { config:this.ahuConfig })
        .then((r) => {
          this.settingAhu(ahuIndex)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    }
  }
}
</script>
