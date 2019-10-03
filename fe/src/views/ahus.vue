<template>
  <v-container grid-list-md>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center" rowspan="2">Conditioning equipment</th>
            <th class="text-center" colspan="4">Fan</th>
            <th class="text-center" colspan="4">Damper</th>
            <th class="text-center" colspan="6">Heating and Cooling Value</th>
            <th class="text-center" colspan="3">Temp</th>
            <th class="text-center" colspan="3">Huml-Valve</th>
            <th class="text-center" colspan="2">Humidity</th>
            <th class="text-center" colspan="3">State</th>
          </tr>
          <tr>
            <th class="text-center">수/자동</th>
            <th class="text-center">수동시</th>
            <th class="text-center">SF</th>
            <th class="text-center">EF</th>
            <th class="text-center">수/자동</th>
            <th class="text-center">수동시</th>
            <th class="text-center">외/배기</th>
            <th class="text-center">혼합</th>
            <th class="text-center">냉/난방</th>
            <th class="text-center">수/자동</th>
            <th class="text-center">수동설정</th>
            <th class="text-center">설정온도</th>
            <th class="text-center">냉방밸브</th>
            <th class="text-center">난방밸브</th>
            <th class="text-center">급기</th>
            <th class="text-center">환기</th>
            <th class="text-center">혼합</th>
            <th class="text-center">OPEN</th>
            <th class="text-center">CLOSED</th>
            <th class="text-center">상태</th>
            <th class="text-center">급기</th>
            <th class="text-center">환기</th>
            <th class="text-center">전기히타</th>
            <th class="text-center">연감지기</th>
            <th class="text-center">필터차압</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="zone in mergezones">
            <td class="text-center">{{zone.ahu.ahu_desc}}</td>
            <td class="text-center">{{zone.zone.cMode_damper_auto_manual}}</td>
            <td class="text-center">{{zone.zone.cMode_damper_close_open}}</td>
            <td class="text-center">{{zone.zone.cMode_hum_i_valve}}</td>
            <td class="text-center">{{zone.zone.cState_supplay_fan}}</td>
            <td class="text-center">{{zone.zone.cState_return_fan}}</td>
            <td class="text-center">{{zone.zone.cState_e_heater}}</td>
            <td class="text-center">{{zone.zone.cState_smoke}}</td>
            <td class="text-center">{{zone.zone.cState_filter}}</td>
            <td class="text-center">{{zone.zone.fData_hc_manual_set}}</td>
            <td class="text-center">{{zone.zone.fData_hc_set_temp}}</td>
            <td class="text-center">{{zone.zone.fData_hc_cool_vlv}}</td>
            <td class="text-center">{{zone.zone.fData_hc_heat_vlv}}</td>
            <td class="text-center">{{zone.zone.fData_damper_manual_set}}</td>
            <td class="text-center">{{zone.zone.fData_damper_outer_set}}</td>
            <td class="text-center">{{zone.zone.fData_damper_mix_set}}</td>
            <td class="text-center">{{zone.zone.fData_temp_supply}}</td>
            <td class="text-center">{{zone.zone.fData_temp_return}}</td>
            <td class="text-center">{{zone.zone.fData_temp_mix}}</td>
            <td class="text-center">{{zone.zone.fData_hum_supply}}</td>
            <td class="text-center">{{zone.zone.fData_hum_return}}</td>
            <td class="text-center">{{zone.zone.fData_hum_i_vlv_start_hum}}</td>
            <td class="text-center">{{zone.zone.fData_hum_i_vlv_stop_hum}}</td>
            <td class="text-center">{{zone.zone.nPPMco2_set}}</td>
            <td class="text-center">{{zone.zone.nPPMco2_cur}}</td>
            <td class="text-center">{{zone.zone.nRdamp_set}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- <v-divider class='my-3'></v-divider>
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
    </v-dialog> -->
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
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],

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
