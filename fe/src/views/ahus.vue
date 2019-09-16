<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex
          v-for='ahu in ahus'
          :key='ahu'
          text-xs-left
        >
        <v-item >
          <v-card
            color='blue-grey darken-2'
            class='white--text mx-auto'
            full-width
            max-width='200px'
            style='cursor: pointer'
            @click='settingAhu(ahu.ahu_id);'>
            <v-card-title>
              <b>{{ahu.ahu_name}}</b>
            </v-card-title>
            <v-card-text>
              <div><b>{{ahu.ahu_desc}}</b></div>
              <div><b>{{ahu.co2}}</b></div>
            </v-card-text>
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color='primary' @click='settingAhu(ahu.ahu_id);'>
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions> -->
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
  },
  data () {
    return {
      settingTitle : '',
      ahus : [],
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
