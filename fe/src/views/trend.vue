<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getAhus()
    this.getZones()
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
      settingAhuModal: false
    }
  },
  methods: {
    getAhus () {
      axios.get('http://localhost:3000/api/rooms/ahusConfig')
        .then((r) => {
          this.ahus = r.data
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getZones () {
      axios.get('http://localhost:3000/api/rooms/zones')
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
      for(var i = 0; i < this.zones.length; i++){
        this.mergezones.push({ zone:this.zones[i], ahu:this.ahus[i]})
      }
    },
    settingAhu: function (ahuIndex) {
      axios.get(`http://localhost:3000/api/rooms/ahusConfig/${ahuIndex}`)
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
      axios.put(`http://localhost:3000/api/rooms/ahusConfig`, { config:this.ahuConfig })
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
const output = require("d3node-output");
const d3nLine = require("../");
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
function generateRandomData(lines = 3, n = 6, max = 100, min = 0) {
  const data = [];
   data.allKeys = Array.from(new Array(n).keys());
   for (let i = 0; i < lines; ++i) {
     data.push([...data.allKeys].map(key => ({ key, value: randomNumber(min, max) })));
   }
   return data;
}


 const data = generateRandomData();
 console.log(data);
</script>
