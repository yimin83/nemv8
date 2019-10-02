<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <template>
        <v-row>
          <v-col>
            <v-card
              class="mx-auto"
              max-width="200"
            >
              <v-list
                shaped
                class="overflow-y-auto"
                max-height="600">
                <template  v-for="(item, i) in items">
                  <v-list-item v-if="i==0">
                    <v-list-item-action class="ma-0 pa-1">
                      <v-checkbox
                        v-model="beAll"
                        color="primary"
                        @change="allCheckBox()"
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="ma-0 pa-0">
                      <v-list-item-subtitle>전체</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action class="ma-0 pa-1">
                      <v-checkbox
                        v-model="bePriShow"
                        color="primary"
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="ma-0 pa-0">
                      <v-list-item-subtitle>우선<br>순위</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item >
                    <v-list-item-action class="ma-0 pa-1">
                      <v-checkbox
                        v-model="item.beChecked"
                        color="primary"
                        @change="selectCheckBox(item.RoomNo)"
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="ma-0 pa-0">
                      <v-list-item-subtitle>{{item.RoomNo}} <v-icon v-if="bePriShow" x-small @click="upPrio(item.RoomNo)">keyboard_arrow_up</v-icon><v-icon v-if="bePriShow" x-small @click="downPrio(item.RoomNo)">keyboard_arrow_down</v-icon></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              max-width="450"
              class="mx-auto">
            <v-list dense>
              <v-card-title class="subheading font-weight-bold">자동난방설정</v-card-title>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>체크인:</v-list-item-title>
                <v-list-item-title width=100>{{trnCheckInTime}} ~ {{trnCheckOutTime}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>방상태:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.RoomState"></v-text-field></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>예약방<br>난방타입:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.ReservedRoomType"></v-text-field></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>예상<br>입실시간:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.ReservedRoomHour"></v-text-field></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>자동난방<br>설정온도:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.Tset"></v-text-field></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>자동난방<br>온도제어<br>범위:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.Tcr"></v-text-field></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col>
          <v-card
          max-width="400"
          class="mx-auto">
          <v-card-title class="subheading font-weight-bold">수동난방 설정</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>스케줄러사용</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.MH_SchedulerUsed"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방 가동 시간:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_HeatingTimeSec"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방 휴지 시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_HeatingStopTimeSec"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방 시작 시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_TodayStartTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>전체 난방 시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_TotalHeatingTimeSec"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 설정온도</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.MH_Tset"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 온도제어범위</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.MH_Tcr"></v-text-field></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card
        max-width="400"
        class="mx-auto">
          <v-card-title class="subheading font-weight-bold">현재 상태</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>방번호</v-list-item-title>
              <v-list-item-title class="align-end">{{roomStat.RoomNo}}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>방 온도</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.Troom_cur"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>시간당 상승온도</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.TempInc"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>시간당 하강온도</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.TempDec"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방소요시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnOptimalNeedTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>사전난방 시작시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnPreHeatingStartTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 시작시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_StartTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 종료시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_EndTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 남은시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_HeatingLeftTime"></v-text-field></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='blue darken-1' flat @click='saveRoomStat()'>저장</v-btn>
        </v-card-actions>
      </v-col>
      </v-row>
    </template>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    //this.getRooms()
    // this.getRoomPriority()
    this.getRoomStat(201)
    //this.getRoomPriority()
  },
  data () {
    return {
      bePriShow : false,
      beAll : false,
      settingTitle : "",
      curRoomNo : 201,
      roomConfig: [],
      roomStat: [],
      roomPris: [],
      trnCheckInTime: 0,
      trnCheckOutTime: 0,
      trnMH_StartTime: 0,
      trnMH_EndTime: 0,
      trnPreHeatingStartTime: 0,
      trnMH_HeatingLeftTime: 0,
      trnMH_HeatingTimeSec: 0,
      trnMH_HeatingStopTimeSec: 0,
      trnMH_TotalHeatingTimeSec: 0,
      trnMH_TodayStartTime: 0,
      trnOptimalNeedTime: 0,
      items: [
      ],
      model: [{RoomNo: 201}],

    }
  },
  methods: {
    getRoomPriority () {
      axios.get('http://localhost:3000/api/rooms/roomPriority')
        .then((r) => {
          this.roomPris = JSON.parse(r.data)
          var prio
          var i = 1
          this.items = []
          for (var key in this.roomPris.tPriority) {
             if (this.roomPris.tPriority.hasOwnProperty(key)) {
                prio = (this.roomPris.tPriority[key].Priority != 255) ? this.roomPris.tPriority[key].Priority : i
                this.items.push({RoomNo: this.roomPris.tPriority[key].RoomNo, Priority: prio, Reserved: this.roomPris.tPriority[key].Reserved, beChecked: (this.roomPris.tPriority[key].RoomNo == this.curRoomNo ? true : false)})
                i++
             }
          }
          this.refresItems()
          // for(var i = 0; i < this.roomPris.tPriority.length; i++){
          // }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRoomStat (roomNo) {
      axios.get(`http://localhost:3000/api/rooms/getRoomStat/${roomNo}`)
        .then((r) => {
          this.roomStat = JSON.parse(r.data)
          this.curRoomNo = this.roomStat.RoomNo
          // alert(JSON.stringify(this.roomStat))
          this.trnCheckInTime = this.$moment(new Date(this.roomStat.CheckInTime*1000).toISOString()).format('MM/DD/HH')
          this.trnCheckOutTime = this.$moment(new Date(this.roomStat.CheckOutTime*1000).toISOString()).format('MM/DD/HH')
          this.trnMH_StartTime = this.roomStat.MH_StartTime != 0 ? this.$moment(new Date(this.roomStat.MH_StartTime*1000).toISOString()).format('YY/MM/DD HH') : '00/00/00 00'
          this.trnMH_EndTime = this.roomStat.MH_EndTime != 0 ? this.$moment(new Date(this.roomStat.MH_EndTime*1000).toISOString()).format('YY/MM/DD HH') : '00/00/00 00'
          this.trnMH_HeatingLeftTime = this.roomStat.MH_HeatingLeftTime != 0 ?this.$moment(new Date(this.roomStat.MH_HeatingLeftTime*1000).toISOString()).format('YY/MM/DD HH') : '00/00/00 00'
          this.trnPreHeatingStartTime = this.PreHeatingStartTime != 0 ?this.$moment(new Date(this.roomStat.PreHeatingStartTime*1000).toISOString()).format('YY/MM/DD HH') : '00/00/00 00'

          this.trnMH_HeatingTimeSec = this.roomStat.MH_HeatingTimeSec != 0 ? (this.roomStat.MH_HeatingTimeSec/60/60): this.roomStat.MH_HeatingTimeSec
          this.trnMH_HeatingStopTimeSec = this.roomStat.MH_HeatingStopTimeSec != 0 ? (this.roomStat.MH_HeatingStopTimeSec/60/60): this.roomStat.MH_HeatingStopTimeSec
          this.trnMH_TotalHeatingTimeSec = this.roomStat.MH_TotalHeatingTimeSec != 0 ? (this.roomStat.MH_TotalHeatingTimeSec/60/60): this.roomStat.MH_TotalHeatingTimeSec
          this.trnMH_TodayStartTime = this.roomStat.MH_TodayStartTime != 0 ? (this.roomStat.MH_TodayStartTime/60/60): this.roomStat.MH_TodayStartTime
          this.trnOptimalNeedTime = this.roomStat.OptimalNeedTime != 0 ? (this.roomStat.OptimalNeedTime/60/60): this.roomStat.OptimalNeedTime
          this.getRoomPriority()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    saveRoomStat: function () {
      this.roomStat.MH_HeatingTimeSec = this.trnMH_HeatingTimeSec != 0 ? (this.roomStat.trnMH_HeatingTimeSec*60*60): this.roomStat.trnMH_HeatingTimeSec
      this.roomStat.MH_HeatingStopTimeSec = this.trnMH_HeatingStopTimeSec != 0 ? (this.roomStat.trnMH_HeatingStopTimeSec*60*60): this.roomStat.trnMH_HeatingStopTimeSec
      this.roomStat.MH_TotalHeatingTimeSec = this.trnMH_TotalHeatingTimeSec != 0 ? (this.roomStat.trnMH_TotalHeatingTimeSec*60*60): this.roomStat.trnMH_TotalHeatingTimeSec
      this.roomStat.MH_TodayStartTime = this.trnMH_TodayStartTime != 0 ? (this.roomStat.trnMH_TodayStartTime*60*60): this.roomStat.trnMH_TodayStartTime
      this.roomStat.OptimalNeedTime = this.trnOptimalNeedTime != 0 ? (this.roomStat.trnOptimalNeedTime*60*60): this.roomStat.trnOptimalNeedTime

      axios.put('http://localhost:3000/api/rooms/roomStat', { config:this.roomStat })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getRoomStat(this.roomStat.RoomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    saveRoomPrio: function () {
      alert("saveRoomPrio!!")
      axios.put('http://localhost:3000/api/rooms/roomPrio', { config:this.items})
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getRoomPriority()
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    selectCheckBox(roomNo) {
      this.curRoomNo = roomNo
      var isChecked
      for (var key in this.items) {
        if(this.items[key].RoomNo == roomNo && this.items[key].beChecked){
          this.getRoomStat (roomNo)
          break;
        }
      }
    },
    allCheckBox() {
      for (var key in this.items) {
        this.items[key].beChecked = this.beAll
      }
    },
    refresItems(){
      var srcArr = []
      var tmpPri = []
      for(var i = 0; i < this.items.length; i++){
        for(var j=i; j < this.items.length; j++){
          if(this.items[i].Priority > this.items[j].Priority){
            tmpPri = this.items[i]
            this.items[i] = this.items[j]
            this.items[j] = tmpPri
          }
        }
      }
      srcArr = this.items
      this.items = []
      this.items = srcArr
    },
    upPrio(roomNo) {
      var beChanged = false;
      var tmpPri
      for (var key in this.items) {
        if(this.items[key].RoomNo == roomNo) {
          if(this.items[key].Priority == 1) {
            break;
          }
          tmpPri = this.items[key].Priority
          for (var key2 in this.items) {
            if(this.items[key2].Priority == (tmpPri-1)) {
              this.items[key2].Priority = tmpPri
              this.items[key].Priority = tmpPri-1
              beChanged = true
              break;
            }
          }
        }
      }
      if(beChanged){
        //this.refresItems()
        this.saveRoomPrio()
      }
    },
    downPrio(roomNo) {
      var beChanged = false;
      var tmpPri
      for (var key in this.items) {
        if(this.items[key].RoomNo == roomNo) {
          if(this.items[key].Priority == this.items.length) {
            break;
          }
          tmpPri = this.items[key].Priority
          for (var key2 in this.items) {
            if(this.items[key2].Priority == (tmpPri+1)) {
              this.items[key2].Priority = tmpPri
              this.items[key].Priority = tmpPri+1
              beChanged = true
              break;
            }
          }
        }
      }
      if(beChanged){
        //this.refresItems()
        this.saveRoomPrio()
      }
    }
    // getRooms () {
    //   axios.get('http://localhost:3000/api/rooms')
    //     .then((r) => {
    //       this.roomConfig = r.data
    //     })
    //     .catch((e) => {
    //       alert(e.message)
    //       console.error(e.message)
    //     })
    //
    // },
    // settingRoom: function (roomNo) {
    //   //this.initRoomStatInfo()
    //   // this.getRoomStatInfo(roomNo)
    //   axios.get(`http://localhost:3000/api/rooms/getRoomConfig/${roomNo}`)
    //     .then((r) => {
    //       this.roomConfig = JSON.parse(r.data)
    //       this.settingTitle = this.roomConfig.RoomNo +"호"
    //     })
    //     .catch((e) => {
    //       alert(e.message)
    //       console.error(e.message)
    //     })
    //
    // },
    // saveSettingRoom: function (roomNo) {
    //   axios.put(`http://localhost:3000/api/rooms/${'roomStat'}`, {
    //     RoomNo: this.roomConfigs.RoomNo, Area: this.roomConfigs.Area, Direction: this.roomConfigs.Direction, ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
    //     Troom_set: this.roomConfigs.Troom_set, Tsurf_set: this.roomConfigs.Tsurf_set, Troom_cr: this.roomConfigs.Troom_cr, Tsurf_cr: this.roomConfigs.Tsurf_cr,
    //     szDesc:  this.roomConfigs.szDesc
    //   })
    //     .then((r) => {
    //       // this.$data.settingRoomModal = false
    //       this.settingRoom(roomNo)
    //     })
    //     .catch((e) => {
    //       alert(e.message)
    //       console.log(e.message)
    //     })
    // }
  }
}
</script>
