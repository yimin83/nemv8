<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-card>
        <v-card-title>
          <span class='headline'>{{settingTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  label='RoomNo'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.RoomNo'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Area'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.Area'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Direction'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.Direction'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='ExteriorWallCnt'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.ExteriorWallCnt'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Troom_set'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.Troom_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Tsurf_set'
                  hint=''
                  persistent-hint
                  required
                  v-model='roomConfig.Tsurf_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Troom_cr'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.Troom_cr'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Tsurf_cr'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.Tsurf_cr'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='strDesc'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfig.szDesc'
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='blue darken-1' flat @click='saveSettingRoom(roomConfig.RoomNo)'>저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getRooms()
    this.settingRoom(201)
  },
  data () {
    return {
      settingTitle : "",
      roomStat: [],
      trnCheckInTime: 0,
      trnCheckOutTime: 0,
    }
  },
  methods: {
    getRooms () {
      axios.get('http://localhost:3000/api/rooms')
        .then((r) => {
          this.roomStat = r.data
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })

    },
    settingRoom: function (roomNo) {
      //this.initRoomStatInfo()
      // this.getRoomStatInfo(roomNo)
      axios.get(`http://localhost:3000/api/rooms/getRoomConfig/${roomNo}`)
        .then((r) => {
          this.roomConfig = JSON.parse(r.data)
          this.settingTitle = this.roomConfig.RoomNo +"호"
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })

    },
    saveSettingRoom: function (roomNo) {
      axios.put(`http://localhost:3000/api/rooms/${'roomStat'}`, {
        RoomNo: this.roomConfigs.RoomNo, Area: this.roomConfigs.Area, Direction: this.roomConfigs.Direction, ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
        Troom_set: this.roomConfigs.Troom_set, Tsurf_set: this.roomConfigs.Tsurf_set, Troom_cr: this.roomConfigs.Troom_cr, Tsurf_cr: this.roomConfigs.Tsurf_cr,
        szDesc:  this.roomConfigs.szDesc
      })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.settingRoom(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    }
  }
}
</script>
