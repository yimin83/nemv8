<template>
  <v-container grid-list-md>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
        width="150">
      </el-table-column>
      <el-table-column label="Delivery Info">
        <el-table-column
          prop="name"
          label="Name"
          width="120">
        </el-table-column>
        <el-table-column label="Address Info">
          <el-table-column
            prop="state"
            label="State"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="City"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="Address"
            width="300">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Zip"
            width="120">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <v-divider class='my-3'></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for='zone in this.mergezones'
          :key='zone'
          text-xs-left
        >
        <v-item >
          <v-card
            :elevation="10"
            color='grey lighten-3' class='ma-0 pa-0'
            full-width
            width='180px'
            lg=12
            md=12
            sm=3
            xs=3
            @click='settingAhu(zone.ahu.ahu_id);'>
            <v-card-title>
              <b>{{zone.ahu.ahu_name}}</b>
            </v-card-title>
            <v-card-text>
              <div><b>{{zone.ahu.ahu_desc}}</b></div>
              <div><b>co2: {{zone.ahu.co2}}</b></div>
              <div><b>fan동작:{{zone.zone.cMode_manual_mode}}</b></div>
              <div><b>냉난방모드:{{zone.zone.cMode_hc_mode}}</b></div>
              <div><b>Damper 현재 값:{{zone.zone.fData_damper_outer_set}}</b></div>
              <div><b>AHU zone 온도:{{zone.zone.fData_temp_supply}}</b></div>
              <div><b>CO2 현재값:{{zone.zone.nPPMco2_cur}}</b></div>
            </v-card-text>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-dialog v-model='settingAhuModal' persistent  max-width='500px'>
      <v-card>
        <v-card-title>
          <span class='headline'>{{settingTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  label='AhuIndex'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.AhuIndex'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='NotifyOccupantsState'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.NotifyOccupantsState'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='HCMode'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.HCMode'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='FanAutoManual'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.FanAutoManual'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='DamperAutoManual'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.DamperAutoManual'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Tzone_set'
                  hint=''
                  persistent-hint
                  required
                  v-model='ahuConfig.Tzone_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Rdamp_set'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.Rdamp_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='PPMco2_set'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.PPMco2_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Desc'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='ahuConfig.Desc'
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='blue darken-1' flat @click='saveSettingAhu(ahuConfig.AhuIndex)'>저장</v-btn>
          <v-btn color='blue darken-1' flat @click.native='settingAhuModal = false'>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      settingAhuModal: false,
      tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }]
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
</script>
