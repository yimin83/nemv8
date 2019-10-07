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
                <v-list-item>
                  <v-list-item-title>난방모드:</v-list-item-title>
                  <v-list-item-title>
                    <v-select
                      v-model="roomStat.RoomState"
                      :items="this.roomHeatingModes"
                      item-value="value"
                      item-text="name"
                      hide-details
                      class="text-sm-left pa-0"
                    ></v-select>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider class='my-0'></v-divider>
              <v-list
                shaped
                class="overflow-y-auto"
                max-height="600">
                <template
                v-for="(item, i) in items">
                  <v-list-item v-if="i===0">
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
                        @change="refresItems()"
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
          <v-col v-if="roomStat.RoomState === 0">
            <v-card
              max-width="500"
              class="mx-auto">
              <v-card-title class="subheading font-weight-bold">자동난방설정</v-card-title>
              <v-divider class='my-0'>></v-divider>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>체크인:</v-list-item-title>
                <v-list-item-title width=100>{{trnCheckInTime}} ~ {{trnCheckOutTime}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>방상태:</v-list-item-title>
                <v-list-item-title>
                  <v-select
                    v-model="roomStat.RoomState"
                    :items="this.roomStats"
                    item-value="value"
                    item-text="name"
                    hide-details
                    class="text-sm-left pa-0"
                  ></v-select>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>예약방 난방타입:</v-list-item-title>
                <v-list-item-title>
                  <v-select
                    v-model="roomStat.ReservedRoomType"
                    :items="this.roomResevedType"
                    item-value="value"
                    item-text="name"
                    hide-details
                    height=12
                    class="text-sm-left pa-0"
                  ></v-select>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>예상 입실시간:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.ReservedRoomHour"></v-text-field></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>자동난방 설정온도:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.Tset"></v-text-field></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>자동난방 온도제어 범위:</v-list-item-title>
                <v-list-item-title><v-text-field height=13 v-model="roomStat.Tcr"></v-text-field></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col v-if="roomStat.RoomState === 1">
          <v-card
          max-width="500"
          class="mx-auto">
          <v-card-title class="subheading font-weight-bold">수동난방 설정</v-card-title>
          <v-divider class='my-0'>></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>스케줄러사용:</v-list-item-title>
              <v-list-item-title class="align-end">
                <v-list-item-title>
                  <v-select
                    v-model="roomStat.MH_SchedulerUsed"
                    :items="this.roomScheduleUsed"
                    item-value="value"
                    item-text="name"
                    hide-details
                    class="text-sm-left pa-0"
                  ></v-select>
                </v-list-item-title>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방 가동 시간:</v-list-item-title>
              <v-list-item-title class="align-end">
                <v-row>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="시간" v-model="this.trnMH_HeatingTimeHour"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="분" v-model="this.trnMH_HeatingTimeMin"></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방 휴지 시간:</v-list-item-title>
              <v-list-item-title class="align-end">
                <v-row>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="시간" v-model="this.trnMH_HeatingStopTimeHour"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="분" v-model="this.trnMH_HeatingStopTimeMin"></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방 시작 시간:</v-list-item-title>
              <v-list-item-title class="align-end">
                <v-row>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="시간" v-model="this.trnMH_TodayStartTimeHour"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="분" v-model="this.trnMH_TodayStartTimeMin"></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>전체 난방 시간:</v-list-item-title>
              <v-list-item-title class="align-end">
                <v-row>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="시간" v-model="this.trnMH_TotalHeatingTimeHour"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field height=13 :rules="rules" label="분" v-model="this.trnMH_TotalHeatingTimeMin"></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 설정온도:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.MH_Tset"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 온도제어범위:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.MH_Tcr"></v-text-field></v-list-item-title>
            </v-list-item>
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if='roomStat.MH_SchedulerUsed === 0' class="ma-1 pa-1 text-light" color='blue darken-1' flat @click='cmdManualHeating(roomStat.RoomNo, 1)'>난방시작</v-btn>
              <v-btn v-if='roomStat.MH_SchedulerUsed === 0' class="ma-1 pa-1 text-light" color='blue darken-1' flat @click='cmdManualHeating(roomStat.RoomNo, 2)'>난방중지</v-btn>
            </v-card-actions> -->
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card
        max-width="500"
        class="mx-auto">
          <v-card-title class="subheading font-weight-bold">현재 상태</v-card-title>
          <v-divider class='my-0'>></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>방번호:</v-list-item-title>
              <v-list-item-title class="align-end">{{roomStat.RoomNo}}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>방 온도:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.Troom_cur"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>시간당 상승온도:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.TempInc"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>시간당 하강온도:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="roomStat.TempDec"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>난방소요시간:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnOptimalNeedTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>사전난방 시작시간:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnPreHeatingStartTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 시작시간</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_StartTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 종료시간:</v-list-item-title>
              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="this.trnMH_EndTime"></v-text-field></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>수동난방 남은시간:</v-list-item-title>
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
    this.startGets()
  },
  data () {
    return {
      bePriShow: true,
      beAll: false,
      settingTitle: '',
      curRoomNo: 201,
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
      trnMH_HeatingTimeHour: 0,
      trnMH_HeatingTimeMin: 0,
      trnMH_HeatingStopTimeSec: 0,
      trnMH_HeatingStopTimeHour: 0,
      trnMH_HeatingStopTimeMin: 0,
      trnMH_TotalHeatingTimeSec: 0,
      trnMH_TotalHeatingTimeHour: 0,
      trnMH_TotalHeatingTimeMin: 0,
      trnMH_TodayStartTime: 0,
      trnMH_TodayStartTimeHour: 0,
      trnMH_TodayStartTimeMin: 0,
      trnOptimalNeedTime: 0,
      items: [
      ],
      roomScheduleUsed: [ { name: '사용안함', value: 0 }, { name: '사용', value: 1 }
      ],
      roomStats: [ { name: '빈방', value: 0 }, { name: '예약', value: 1 }, { name: '재실', value: 2 }
      ],
      roomHeatingModes: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      heatingModes: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      roomHeatings: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      heatings: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      roomResevedType: [ { name: '상시', value: 0 }, { name: '매일', value: 1 }, { name: '오늘', value: 2 }, { name: '내일', value: 3 }, { name: '모레', value: 4 }
      ],
      model: [{ RoomNo: 201 }]
    }
  },
  methods: {
    startGets () {
      // axios.get(`http://localhost:3000/api/rooms/roomPriority`)
      axios.get(`${this.$apiRootPath}rooms/roomPriority`)
        .then((r) => {
          this.roomPris = JSON.parse(r.data)
          var prio
          var i = 1
          this.items = []
          for (var key in this.roomPris.tPriority) {
            if (this.roomPris.tPriority.hasOwnProperty(key)) {
              prio = (this.roomPris.tPriority[key].Priority !== 0) ? this.roomPris.tPriority[key].Priority : i
              this.items.push({ RoomNo: this.roomPris.tPriority[key].RoomNo, Priority: prio, Reserved: this.roomPris.tPriority[key].Reserved, beChecked: (this.roomPris.tPriority[key].RoomNo === this.curRoomNo) })
              i++
            }
          }
          this.refresItems()
          this.getRoomStat(201)
          // for (var i = 0; i < this.roomPris.tPriority.length; i++) {
          // }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRoomPriority () {
      // axios.get(`http://localhost:3000/api/rooms/roomPriority`)
      axios.get(`${this.$apiRootPath}rooms/roomPriority`)
        .then((r) => {
          this.roomPris = JSON.parse(r.data)
          var prio
          var i = 1
          this.items = []
          for (var key in this.roomPris.tPriority) {
            if (this.roomPris.tPriority.hasOwnProperty(key)) {
              prio = (this.roomPris.tPriority[key].Priority !== 0) ? this.roomPris.tPriority[key].Priority : i
              this.items.push({ RoomNo: this.roomPris.tPriority[key].RoomNo, Priority: prio, Reserved: this.roomPris.tPriority[key].Reserved, beChecked: (this.roomPris.tPriority[key].RoomNo === this.curRoomNo) })
              i++
            }
          }
          this.refresItems()
          // for (var i = 0; i < this.roomPris.tPriority.length; i++) {
          // }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRoomStat (roomNo) {
      // axios.get(`http://localhost:3000/api/rooms/getRoomStat/${roomNo}`)
      axios.get(`${this.$apiRootPath}rooms/getRoomStat/${roomNo}`)
        .then((r) => {
          this.roomStat = JSON.parse(r.data)
          this.curRoomNo = this.roomStat.RoomNo
          // alert(JSON.stringify(this.roomStat))
          this.roomStat.Troom_cur = this.roomStat.Troom_cur.toFixed(2)
          this.roomStat.TempInc = this.roomStat.TempInc.toFixed(2)
          this.roomStat.TempDec = this.roomStat.TempDec.toFixed(2)
          this.trnCheckInTime = this.$moment(new Date(this.roomStat.CheckInTime * 1000).toISOString()).format('MM/DD/HH')
          this.trnCheckOutTime = this.$moment(new Date(this.roomStat.CheckOutTime * 1000).toISOString()).format('MM/DD/HH')
          this.trnMH_StartTime = this.roomStat.MH_StartTime !== 0 ? this.$moment(new Date(this.roomStat.MH_StartTime * 1000).toISOString()).format('YYYY/MM/DD kk') : '00/00/00 00'
          this.trnMH_EndTime = this.roomStat.MH_EndTime !== 0 ? this.$moment(new Date(this.roomStat.MH_EndTime * 1000).toISOString()).format('YYYY/MM/DD kk') : '00/00/00 00'
          this.trnMH_HeatingLeftTime = this.roomStat.MH_HeatingLeftTime !== 0 ? this.$moment(new Date(this.roomStat.MH_HeatingLeftTime * 1000).toISOString()).format('YYYY/MM/DD kk') : '00/00/00 00'
          this.trnPreHeatingStartTime = this.roomStat.PreHeatingStartTime !== 0 ? this.$moment(new Date(this.roomStat.PreHeatingStartTime * 1000).toISOString()).format('YYYY/MM/DD kk') : '00/00/00 00'
          this.trnMH_HeatingTimeSec = this.roomStat.MH_HeatingTimeSec !== 0 ? (this.roomStat.MH_HeatingTimeSec / 60 / 60) : this.roomStat.MH_HeatingTimeSec
          this.trnMH_HeatingTimeHour = parseInt(this.roomStat.MH_HeatingTimeSec / 60 / 60)
          this.trnMH_HeatingTimeMin = parseInt((this.roomStat.MH_HeatingTimeSec - (this.trnMH_HeatingTimeHour * 60 * 60)) / 60)
          this.trnMH_HeatingStopTimeSec = this.roomStat.MH_HeatingStopTimeSec !== 0 ? (this.roomStat.MH_HeatingStopTimeSec / 60 / 60) : this.roomStat.MH_HeatingStopTimeSec
          this.trnMH_HeatingStopTimeHour = parseInt(this.roomStat.MH_HeatingStopTimeSec / 60 / 60)
          this.trnMH_HeatingStopTimeMin = parseInt((this.roomStat.MH_HeatingStopTimeSec - (this.trnMH_HeatingStopTimeHour * 60 * 60)) / 60)
          this.trnMH_TotalHeatingTimeSec = this.roomStat.MH_TotalHeatingTimeSec !== 0 ? (this.roomStat.MH_TotalHeatingTimeSec / 60 / 60) : this.roomStat.MH_TotalHeatingTimeSec
          this.trnMH_TotalHeatingTimeHour = parseInt(this.roomStat.MH_TotalHeatingTimeSec / 60 / 60)
          this.trnMH_TotalHeatingTimeMin = parseInt((this.roomStat.MH_TotalHeatingTimeSec - (this.trnMH_TotalHeatingTimeHour * 60 * 60)) / 60)
          this.trnMH_TodayStartTime = this.roomStat.MH_TodayStartTime !== 0 ? (this.roomStat.MH_TodayStartTime / 60 / 60) : this.roomStat.MH_TodayStartTime
          this.trnMH_TodayStartTimeHour = parseInt(this.roomStat.MH_TodayStartTime / 60 / 60)
          this.trnMH_TodayStartTimeMin = parseInt((this.roomStat.MH_TodayStartTime - (this.trnMH_TodayStartTimeHour * 60 * 60)) / 60)
          var hour = parseInt(this.roomStat.OptimalNeedTime / 60 / 60)
          var min = parseInt((this.roomStat.OptimalNeedTime - (hour * 60 * 60)) / 60)
          this.trnOptimalNeedTime = hour + '시간 ' + min + '분'
          // this.getRoomPriority()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    saveRoomStat: function () {
      this.roomStat.MH_HeatingTimeSec = (this.trnMH_HeatingTimeHour * 60 * 60) + (this.trnMH_HeatingTimeMin * 60)
      this.roomStat.MH_HeatingStopTimeSec = (this.trnMH_HeatingStopTimeHour * 60 * 60) + (this.trnMH_HeatingStopTimeMin * 60)
      this.roomStat.MH_TotalHeatingTimeSec = (this.trnMH_TotalHeatingTimeHour * 60 * 60) + (this.trnMH_TotalHeatingTimeMin * 60)
      this.roomStat.MH_TodayStartTime = (this.trnMH_TodayStartTimeHour * 60 * 60) + (this.trnMH_TodayStartTimeMin * 60)
      var roomNos = []
      for (var key in this.items) {
        if (this.items[key].beChecked) {
          roomNos.push(this.items[key].RoomNo)
        }
      }
      // axios.put(`http://localhost:3000/api/rooms/roomStat`, { config: this.roomStat, roomNos: roomNos })
      axios.put(`${this.$apiRootPath}rooms/roomStat`, { config: this.roomStat })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getRoomStat(this.roomStat.RoomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    cmdManualHeating: function (roomNo, HeatingMode) {
      // axios.put(`http://localhost:3000/api/rooms/cmdManualHeating`, {
      axios.put(`${this.$apiRootPath}rooms/cmdManualHeating`, {
        RoomNo: roomNo,
        HeatingMode: HeatingMode,
        HeatingTimeSec: this.roomStat.MH_TotalHeatingTimeSec,
        Tset: this.roomStat.MH_Tset,
        Tset_cr: this.roomStat.MH_Tset
      })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getRoomStat(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    saveRoomPrio: function () {
      // axios.put(`http://localhost:3000/api/rooms/roomPrio`, { config: this.items })
      axios.put(`${this.$apiRootPath}rooms/roomPrio`, { config: this.items })
        .then((r) => {
          this.getRoomPriority()
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    selectCheckBox (roomNo) {
      this.curRoomNo = roomNo
      for (var key in this.items) {
        if (this.items[key].RoomNo === roomNo && this.items[key].beChecked) {
          this.getRoomStat(roomNo)
          break
        }
      }
    },
    allCheckBox () {
      for (var key in this.items) {
        this.items[key].beChecked = this.beAll
      }
    },
    refresItems () {
      var srcArr = []
      var tmpPri = []
      var i, j
      if (this.bePriShow) {
        for (i = 0; i < this.items.length; i++) {
          for (j = i; j < this.items.length; j++) {
            if (this.items[i].Priority > this.items[j].Priority) {
              tmpPri = this.items[i]
              this.items[i] = this.items[j]
              this.items[j] = tmpPri
            }
          }
        }
      } else {
        for (i = 0; i < this.items.length; i++) {
          for (j = i; j < this.items.length; j++) {
            if (this.items[i].RoomNo > this.items[j].RoomNo) {
              tmpPri = this.items[i]
              this.items[i] = this.items[j]
              this.items[j] = tmpPri
            }
          }
        }
      }
      srcArr = this.items
      this.items = []
      this.items = srcArr
    },
    upPrio (roomNo) {
      var beChanged = false
      var tmpPri
      for (var key in this.items) {
        if (this.items[key].RoomNo === roomNo) {
          if (this.items[key].Priority === 1) {
            break
          }
          tmpPri = this.items[key].Priority
          for (var key2 in this.items) {
            if (this.items[key2].Priority === (tmpPri - 1)) {
              this.items[key2].Priority = tmpPri
              this.items[key].Priority = (tmpPri - 1)
              beChanged = true
              break
            }
          }
        }
      }
      if (beChanged) {
        this.saveRoomPrio()
      }
    },
    downPrio (roomNo) {
      var beChanged = false
      var tmpPri
      for (var key in this.items) {
        if (this.items[key].RoomNo === roomNo) {
          if (this.items[key].Priority === this.items.length) {
            break
          }
          tmpPri = this.items[key].Priority
          for (var key2 in this.items) {
            if (this.items[key2].Priority === (tmpPri + 1)) {
              this.items[key2].Priority = tmpPri
              this.items[key].Priority = (tmpPri + 1)
              beChanged = true
              break
            }
          }
        }
      }
      if (beChanged) {
        this.saveRoomPrio()
      }
    }
  }
}
</script>
