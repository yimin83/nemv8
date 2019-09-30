<template>
  <v-container grid-list-md>
    <v-divider class='my-3'></v-divider>
    난방(보일러 on) : {{this.SetStatus}}({{this.CurStatus}})
    <v-divider class='my-3'></v-divider>
    <v-layout row wrap >
      <v-icon color="gray">delete_outline</v-icon>: 예약가능&nbsp;
      <v-icon color="pink">date_range</v-icon>: 예열&nbsp;
      <v-icon color="green">date_range</v-icon>: 예약&nbsp;
      <v-icon color="red">delete</v-icon>: 재실&nbsp;
      <v-icon color="blue">wb_sunny</v-icon>: 보일러off&nbsp;
      <v-icon color="pink">wb_sunny</v-icon>: 보일러on&nbsp;
      <v-card
        class="d-inline-flex  ma-0 pa-0"
        color="blue lighten-4"
        outlined
      >
        <div>실내온도</div>
      </v-card>
      &nbsp;
      <v-card
        class="d-inline-flex ma-0 pa-0"
        color="light-blue accent-1"
        outlined
      >
        <div>온수관표면온도</div>
      </v-card>
    </v-layout>
    <v-divider class='my-3'></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for='room in roomStat'
          :key='room'
          text-xs-left
        >
        <v-item >
          <v-card
            :elevation="10"
            color='grey lighten-3' class='ma-0 pa-0'
            full-width
            width='110px'
            lg=12
            md=12
            sm=3
            xs=3>
            <v-card-title
              style='cursor: pointer'
              @click='scheduleRoom(room.usRoomNo)'>
                {{room.usRoomNo}}호
            </v-card-title>
            <v-card-text
              style='cursor: pointer'
              @click='scheduleRoom(room.usRoomNo)'>
              <div class="text-center ma-0 pa-0">
                  <v-icon v-if='room.ucRoomState == 0 || room.ucRoomState == 1 || room.ucRoomState == 4' color="gray">delete_outline</v-icon>
                  <v-icon v-if='room.ucRoomState == 2 && room.nCheckInOutEnable == 1' color="green">date_range</v-icon>
                  <v-icon v-if='room.ucRoomState == 2 && room.nCheckInOutEnable == 0' color="pink">date_range</v-icon>
                  <v-icon v-if='room.ucRoomState == 3' color="red">delete</v-icon>
                  <v-icon v-if='room.ucCurStatus == 0 || room.ucCurStatus == 2' color="blue">wb_sunny</v-icon>
                  <v-icon v-if='room.ucCurStatus == 1'  color="pink">wb_sunny</v-icon>
              </div>
              <div class="text-center ma-0 pa-0">
                <v-card
                  class="d-inline-flex  ma-1 pa-0"
                  color="blue lighten-4"
                  label="실내온도"
                  outlined
                >
                  <div>{{room.fTroom_cur}}</div>
                </v-card>
                <v-card
                  class="d-inline-flex ma-1 pa-0"
                  color="light-blue accent-1"
                  label="바닥온도"
                  outlined
                >
                  <div>{{room.fTsurf_cur}}</div>
                </v-card>
              </div>
            </v-card-text>
            <v-card-actions class="ma-0 pa-0">
              <v-spacer></v-spacer>
              <v-btn color='grey darken-1' height=30 class=" ma-0 pa-0" x-small @click='cmdRoomState(room.usRoomNo, room.ucRoomState)'>
                <label styel="font-size:3px;" v-if='room.ucRoomState != 2'>예비<br>난방</label>
                <label styel="font-size:3px;" v-if='room.ucRoomState == 2'>예비<br>난방해제</label>
              </v-btn>
              <v-btn height=30 color='grey darken-1' class=" ma-1 pa-0" x-small @click='manualSettingRoom(room.usRoomNo)'>
                <label styel="font-size:3px;" v-if='room.usManHeatingMode != 1'>수동<br>난방on</label>
                <label styel="font-size:3px;" v-if=' room.usManHeatingMode == 1'>수동<br>난방off</label>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-dialog v-model='rsvRoomModal' persistent max-width='500px'>
      <v-card>
        <v-card-title>
          <span class='headline'>{{roomTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-menu
                  v-model='startMenu1'
                  :close-on-content-click='false'
                  :nudge-right='40'
                  lazy
                  transition='scale-transition'
                  offset-y
                  full-width
                  min-width='290px'
                >
                  <template v-slot:activator='{ on }'>
                    <v-text-field
                      v-model='startDate'
                      label='예약 시작일'
                      prepend-icon='event'
                      readonly
                      v-on='on'
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model='startDate' @input='startMenu1 = false'></v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-menu
                  v-model='endMenu2'
                  :close-on-content-click='false'
                  :nudge-right='40'
                  lazy
                  transition='scale-transition'
                  offset-y
                  full-width
                  min-width='290px'
                >
                  <template v-slot:activator='{ on }'>
                    <v-text-field
                      v-model='endDate'
                      label='예약 종료일'
                      prepend-icon='event'
                      readonly
                      v-on='on'
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model='endDate' @input='endMenu2 = false'></v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-text-field
                  label='예약자 이름'
                  hint=''
                  persistent-hint
                  required
                  v-model='roomScheInfo.szSubsName'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='예약자 연락처'
                  hint=''
                  persistent-hint
                  required
                  v-model='roomScheInfo.szSubsTel'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='투숙객 수'
                  hint=''
                  persistent-hint
                  required
                  v-model='roomScheInfo.ucPeopleCnt'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-switch
                 v-model='autoCheckIn'
                 :label="`${!autoCheckIn ? '수동체크인아웃시간' : '기본체크인아웃시간'}`"
                 @change='toggleAutoCheckIn()'
                ></v-switch>
              </v-flex>
              <v-flex xs6 v-if='!autoCheckIn'>
                <v-menu
                  ref='menu1'
                  v-model='inMenu'
                  :close-on-content-click='false'
                  :nudge-right='40'
                  :return-value.sync='strCheckInTime'
                  lazy
                  transition='scale-transition'
                  offset-y
                  full-width
                  max-width='290px'
                  min-width='290px'
                >
                  <template v-slot:activator='{ on }'>
                    <v-text-field
                      v-model='strCheckInTime'
                      label='체크인'
                      prepend-icon='access_time'
                      readonly
                      v-on='on'
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if='inMenu'
                    v-model='strCheckInTime'
                    format='24hr'
                    full-width
                    @click:minute='$refs.menu1.save(strCheckInTime)'
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6 v-if='!autoCheckIn'>
                <v-menu
                  ref='menu2'
                  v-model='outMenu'
                  :close-on-content-click='false'
                  :nudge-right='40'
                  :return-value.sync='strCheckOutTime'
                  lazy
                  transition='scale-transition'
                  offset-y
                  full-width
                  max-width='290px'
                  min-width='290px'
                >
                  <template v-slot:activator='{ on }'>
                    <v-text-field
                      v-model='strCheckOutTime'
                      label='체크아웃'
                      prepend-icon='access_time'
                      readonly
                      v-on='on'
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if='outMenu'
                    v-model='strCheckOutTime'
                    format='24hr'
                    full-width
                    @click:minute='$refs.menu2.save(strCheckOutTime)'
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if='roomScheInfo.nIdx == 0' color='blue darken-1' flat @click='reserveRoomSche()'>예약</v-btn>
          <v-btn v-if='roomScheInfo.nIdx != 0' color='blue darken-1' flat @click='saveReserveRoom(roomScheInfo.nIdx)'>예약수정</v-btn>
          <v-btn v-if='roomScheInfo.nIdx != 0' color='blue darken-1' flat @click='cancelReserveRoom(roomScheInfo.nIdx)'>예약취소</v-btn>
          <v-btn color='blue darken-1' flat @click='closeReserveRoom()'>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model='manualSettingRoomModal' persistent  max-width='500px'>
      <v-card>
        <v-card-title>
          <span class='headline'>{{manualHeatingTitle}}</span>
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
                  v-model='roomStatInfo.usRoomNo'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='ulManHeatingTimeSec'
                  hint=''
                  class='pa-0'
                  persistent-hint
                  required
                  height=13
                  v-model='roomStatInfo.ulManHeatingTimeSec'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='fManTset'
                  hint=''
                  class='pa-0'
                  persistent-hint
                  required
                  height=13
                  v-model='roomStatInfo.fManTset'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='fManTset_cr'
                  hint=''
                  class='pa-0'
                  persistent-hint
                  required
                  height=13
                  v-model='roomStatInfo.fManTset_cr'
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if='roomStatInfo.usManHeatingMode == 1' color='blue darken-1' flat @click='cmdManualHeating(roomConfigs.RoomNo)'>난방시작</v-btn>
          <v-btn color='blue darken-1' flat @click.native='manualSettingRoomModal = false'>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model='roomScheduleModal' persistent max-width='500px'>
      <v-layout max-height='300px'>
        <v-flex>
          <v-sheet height='64'>
            <v-toolbar flat color='white'>
              <v-btn outlined class='mr-3' @click='setToday'>
                Today
              </v-btn>
              <v-btn fab text small @click='prev'>
                <v-icon small>arrow_back_ios</v-icon>
              </v-btn>
              <v-btn fab text small @click='next'>
                <v-icon small>arrow_forward_ios</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator='{ on }'>
                  <v-btn
                    outlined
                    v-on='on'
                  >
                    <span>{{ typeToLabel[calType] }}</span>
                    <v-icon right>arrow_drop_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="calType = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="calType = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="calType = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="calType = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height='500'>
            <v-calendar
              ref='calendar'
              v-model='focus'
              color='primary'
              :events='events'
              :event-color='getEventColor'
              :event-margin-bottom='3'
              :now='today'
              :type='calType'
              @click:event='showEvent'
              @mouseenter:day='mouseEnter'
              @mousedown:day='mouseDown'
              @mouseup:day='mouseUp'
              @change='updateRange'
            ></v-calendar>
            <v-menu
              v-model='selectedOpen'
              :close-on-content-click='false'
              :activator='selectedElement'
              full-width
              offset-x
            >
            </v-menu>
            </v-sheet>
            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='blue darken-1' flat @click.native='roomScheduleModal = false'>닫기</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getRooms()
  },
  data () {
    return {
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      calType: 'month',
      typeToLabel: {
        'month': 'Month',
        'week': 'Week',
        'day': 'Day',
        '4day': '4 Days',
      },
      start: null,
      end: null,
      selectedElement: null,
      selectedOpen: false,
      events: [],
      rsvRoomModal: false,
      roomScheduleModal: false,
      manualSettingRoomModal: false,
      bestChkbox: false,
      roomTitle: '객실 예약',
      manualHeatingTitle: '수동 난방 설정',
      boilerOnOffTxt: '수동/<br/>난방on',
      reservedTxt:'예열시작',
      CurStatus:0,
      SetStatus:0,
      roomStat: [],
      roomConfigs: [],
      roomsSchedule: [],
      roomConfig:{
        RoomNo:0,
        Area:0,
        Direction:0,
        ExteriorWallCnt:0,
        Troom_set:0,
        Tsurf_set:0,
        Troom_cr:0,
        Tsurf_cr:0,
        CheckInOutEnable:0,
        CheckInTime:0,
        CheckOutTime:0,
        szDesc: ''
      },
      roomStatInfo: {
        usRoomNo: 0,
        usManHeatingMode:0,
        ulManHeatingTimeSec:0,
        fManTset:0,
        fManTset_cr:0,
        nSetLastTime:0
      },
      roomScheInfo: {
        nIdx: 0,
        usRoomNo: 0,
        nCheckInOutEnbale: 0,
        strCheckInTime: '',
        nCheckInTime: 0,
        strCheckOutTime: '',
        nCheckOutTime: 0,
        szSubsName: '',
        szSubsTel: '',
        tReserveDate: '',
        ucPeopleCnt: 0,
        szDesc: ''
      },
      heatingModes: [
        { text: '자동' },
        { text: '수동' }
      ],
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startMenu1: false,
      endMenu2: false,
      strCheckInTime: null,
      inMenu: false,
      strCheckOutTime: null,
      outMenu: false,
      autoCheckIn: false,
      boilerOn:true,
      type: 'room',
      heatingMode: '자동',
      mouseDowned: false,
      reserveStartDate: '',
      reserveEndDate: '',
      roomNo: 0,
      roomIdx: 0,
      trnCheckInTime:0,
      trnCheckOutTime:0
    }
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return new Date().toISOString().substr(0, 4) + '/'+ new Date().toISOString().substr(5, 2)
      }
      const startMonth = this.chngNumStr(start.month)
      const endMonth = this.chngNumStr(end.month)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = this.chngNumStr(start.day)
      const endDay = this.chngNumStr(end.day)

      switch (this.calType) {
        case 'month':
          return `${startYear}/${startMonth}`
        case 'week':
        case '4day':
          return `${startYear}/${startMonth}/${startDay} - ${suffixYear}/${suffixMonth}/${endDay}`
        case 'day':
          return `${startYear}/${startMonth}/${startDay}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
  },
  methods: {
    chngNumStr: function (data) {
      return (data < 10 ? '0'+data : data)
    },
    viewDay ({ date }) {
      this.focus = date
      this.calType = 'day'
    },
    mouseDown ({ year, month, day }) {
      this.reserveStartDate =  year + '-' + this.chngNumStr(month)+ '-' + this.chngNumStr(day) + ' 14:00'
      const isDuple = false
      for(var i = 0; i < this.events.length;  i++){
        if(this.events[i].roomNo == this.roomNo){
          if( this.events[i].start <= this.reserveStartDate && this.events[i].end >= this.reserveStartDate ){
           isDuple=true
           break
         }
        }
      }
      if(!isDuple){
        this.mouseDowned=true
        this.events.push({
          name: '',
          start: this.reserveStartDate,
          color: 'deep-purple',
        })
      }
    },
    mouseUp ({ year, month, day }) {
      this.reserveEndDate =  year + '-' +  this.chngNumStr(month)+ '-' + this.chngNumStr(day) + ' 12:00'
      const isDuple = false
      if(this.mouseDowned) {
        if(this.reserveStartDate.substr(0, 10) == this.reserveEndDate.substr(0, 10)) {
          this.events.pop()
          return
        }
        for(var i = 0; i < this.events.length;  i++){
          if(this.events[i].roomNo == this.roomNo){
            if( this.events[i].start <= this.reserveEndDate && this.events[i].end >= this.reserveEndDate ) {
             isDuple = true
           }
          }
        }
        if(!isDuple){
          this.reserveRoom(0, null)
        }
      }
      this.mouseDowned=false
    },
    mouseEnter ({ year, month, day }) {
      if(this.mouseDowned){
        const tempDate =  year + '-' +  this.chngNumStr(month)+ '-' + this.chngNumStr(day) + ' 12:00'
        this.events.pop()
        this.events.push({
          name: '',
          start: this.reserveStartDate,
          end: tempDate,
          color: 'deep-purple',
        })
      }
    },

    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      this.roomIdx = event.idx
      this.mouseDowned=false
      this.reserveRoom(this.roomIdx, event)
    },
    updateRange ({ start, end }) {
      //alert('updateRange')
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    getRoomScheInfo: function (idx) {
      if(idx == 0) {
        this.roomTitle = '객실 예약'
        this.autoCheckIn = true
        this.roomScheInfo.nIdx = idx
        this.roomScheInfo.usRoomNo = this.roomNo
        this.roomScheInfo.strCheckInTime = this.reserveStartDate
        this.startDate = this.reserveStartDate.substr(0, 10)
        this.strCheckInTime = this.reserveStartDate.substr(10, 6)
        this.roomScheInfo.strCheckOutTime = this.reserveEndDate
        this.endDate = this.reserveEndDate.substr(0, 10)
        this.strCheckOutTime = this.reserveEndDate.substr(10, 6)
      }
      else{
        this.roomTitle = '객실 예약 정보'
        for (var i = 0; i < this.roomsSchedule.length; i++) {
          if (this.roomsSchedule[i].nIdx == idx) {
            this.roomScheInfo.nIdx = this.roomsSchedule[i].nIdx
            this.roomScheInfo.usRoomNo = this.roomsSchedule[i].usRoomNo
            this.roomScheInfo.nCheckInOutEnbale = this.roomsSchedule[i].nCheckInOutEnbale
            this.autoCheckIn = true
            this.roomScheInfo.nCheckInTime = this.roomsSchedule[i].nCheckInTimee
            this.roomScheInfo.strCheckInTime = new Date(this.roomsSchedule[i].nCheckInTime*1000).toISOString().
                                                                              replace(/T/, ' ').      // replace T with a space
                                                                              replace(/\..+/, '')
            this.startDate = this.roomScheInfo.strCheckInTime.substr(0, 10)
            this.strCheckInTime = this.roomScheInfo.strCheckInTime.substr(10, 6)
            if(this.strCheckInTime.trim() != '14:00'.trim())
              this.autoCheckIn = false
            this.roomScheInfo.nCheckOutTime = this.roomsSchedule[i].nCheckOutTime
            this.roomScheInfo.strCheckOutTime = new Date(this.roomsSchedule[i].nCheckOutTime*1000).toISOString().
                                                                              replace(/T/, ' ').      // replace T with a space
                                                                              replace(/\..+/, '')
            this.endDate = this.roomScheInfo.strCheckOutTime.substr(0, 10)
            this.strCheckOutTime = this.roomScheInfo.strCheckOutTime.substr(10, 6)
            if((!this.autoCheckIn) || this.strCheckOutTime.trim() != '12:00')
              this.autoCheckIn = false
            this.roomScheInfo.szSubsName = this.roomsSchedule[i].szSubsName
            this.roomScheInfo.szSubsTel = this.roomsSchedule[i].szSubsTel
            this.roomScheInfo.ucPeopleCnt = this.roomsSchedule[i].ucPeopleCnt
            this.roomScheInfo.szDesc = this.roomsSchedule[i].szDesc
            break
          }
        }
      }
    },
    getRooms () {
      axios.get('http://localhost:3000/api/rooms')
        .then((r) => {
          this.roomStat = r.data
          this.CurStatus = 0
          this.SetStatus = 0
          for(var i = 0; i < this.roomStat.length; i++ ) {
            this.CurStatus = this.CurStatus + ((this.roomStat[i].ucCurStatus == 1) ? 1 : 0)
            this.SetStatus = this.SetStatus + ((this.roomStat[i].ucSetStatus == 1) ? 1 : 0)
          }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })

    },
    reserveRoom: function (idx, event) {
      if(event == null) {
        this.events.pop()
      }
      this.initRoomScheInfo()
      this.getRoomScheInfo(idx)
      this.$data.rsvRoomModal = true
    },
    scheduleRoom: function (usRoomNo) {
      this.today = new Date().toISOString().substr(0, 10)
      this.focus =  new Date().toISOString().substr(0, 10)
      this.calType = 'month'
      this.roomNo = usRoomNo
      this.events = []
      axios.get(`http://localhost:3000/api/rooms/${usRoomNo}`)
        .then((r) => {
          this.roomsSchedule = r.data
          //alert(JSON.stringify(this.roomsSchedule))
          for(var i = 0; i < this.roomsSchedule.length; i++){

            var strCheckInTime = new Date(this.roomsSchedule[i].nCheckInTime*1000).toISOString().
                                                                              replace(/T/, ' ').      // replace T with a space
                                                                              replace(/\..+/, '')
            var strCheckOutTime = new Date(this.roomsSchedule[i].nCheckOutTime*1000).toISOString().
                                                                              replace(/T/, ' ').      // replace T with a space
                                                                              replace(/\..+/, '')
            this.events.push({
              idx: this.roomsSchedule[i].nIdx,
              roomNo: this.roomsSchedule[i].usRoomNo,
              name: this.roomsSchedule[i].szSubsName,
              details: this.roomsSchedule[i].szDesc,
              start: strCheckInTime,
              end: strCheckOutTime,
              color: 'grey darken-1'
            })
          }
          this.getRoomConfig(usRoomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
      this.$data.roomScheduleModal = true
    },
    manualSettingRoom: function (roomNo) {
      //this.initRoomStatInfo()
      // this.getRoomStatInfo(roomNo)
      this.getRooms()
      for (var i = 0; i < this.roomStat.length; i++) {
         if (this.roomStat[i].usRoomNo == roomNo) {
           this.roomStatInfo.usRoomNo = this.roomStat[i].usRoomNo
           this.roomStatInfo.usManHeatingMode = this.roomStat[i].usManHeatingMode
           this.roomStatInfo.ulManHeatingTimeSec = this.roomStat[i].ulManHeatingTimeSec
           this.roomStatInfo.fManTset = this.roomStat[i].fManTset
           this.roomStatInfo.fManTset_cr = this.roomStat[i].fManTset_cr
           this.roomStatInfo.nSetLastTime = this.roomStat[i].nSetLastTime
           break
         }
       }
       if(this.roomStatInfo.usManHeatingMode != 1) {
         this.$data.manualSettingRoomModal = true
       }
       else {
         this.cmdManualHeating(roomNo)
       }

    },
    reserveRoomSche: function () {
      this.type = 'roomSche'
      this.roomScheInfo.strCheckInTime = this.startDate + this.strCheckInTime
      this.roomScheInfo.strCheckOutTime = this.endDate + this.strCheckOutTime
      var nCheckInTime = Math.round((new Date(this.roomScheInfo.strCheckInTime).getTime()+(9 * 3600 * 1000)) / 1000)
      var nCheckOutTime = Math.round((new Date(this.roomScheInfo.strCheckOutTime).getTime()+(9 * 3600 * 1000)) / 1000)

      axios.post('http://localhost:3000/api/rooms/', {
        usRoomNo: this.roomScheInfo.usRoomNo, nCheckInOutEnable: 1, nCheckInTime: nCheckInTime,
        nCheckOutTime: nCheckOutTime, szSubsName: this.roomScheInfo.szSubsName,
        szSubsTel: this.roomScheInfo.szSubsTel, tReserveDate: null, ucPeopleCnt: this.roomScheInfo.ucPeopleCnt,
        szDesc: this.roomScheInfo.szDesc, Area: this.roomConfigs.Area, Direction: this.roomConfigs.Direction,
        ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt, Troom_set: this.roomConfigs.Troom_set,
        Tsurf_set:this.roomConfigs.Tsurf_set, Troom_cr: this.roomConfigs.Troom_cr, Tsurf_cr: this.roomConfigs.Tsurf_cr
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          // this.pop('객실 상태 변경')
          console.log('okok3')
          this.scheduleRoom(this.roomNo)
        })
        .catch((e) => {
        //  this.pop(e.message)
          alert(e.message)
          console.log(e.message)
        })
    },
    saveReserveRoom: function (idx) {
      this.type = 'roomSche'
      this.roomScheInfo.strCheckInTime = this.startDate + ' ' + this.strCheckInTime
      this.roomScheInfo.strCheckOutTime = this.endDate + ' ' + this.strCheckOutTime
      var nCheckInTime = Math.round((new Date(this.roomScheInfo.strCheckInTime).getTime()+(9 * 3600 * 1000)) / 1000)
      var nCheckOutTime = Math.round((new Date(this.roomScheInfo.strCheckOutTime).getTime()+(9 * 3600* 1000)) / 1000)
      axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
        nIdx: idx, usRoomNo: this.roomScheInfo.usRoomNo, nCheckInOutEnable: 1, nCheckInTime: nCheckInTime,
        nCheckOutTime: nCheckOutTime, szSubsName: this.roomScheInfo.szSubsName, szSubsTel: this.roomScheInfo.szSubsTel,
        tReserveDate: null, ucPeopleCnt: this.roomScheInfo.ucPeopleCnt, szDesc: this.roomScheInfo.szDesc,
        Area: this.roomConfigs.Area, Direction: this.roomConfigs.Direction, ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
        Troom_set: this.roomConfigs.Troom_set, Tsurf_set:this.roomConfigs.Tsurf_set, Troom_cr: this.roomConfigs.Troom_cr,
        Tsurf_cr: this.roomConfigs.Tsurf_cr
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          // this.pop('객실 상태 변경')
          this.scheduleRoom(this.roomScheInfo.usRoomNo)
        })
        .catch((e) => {
        //  this.pop(e.message)
          alert(e.message)
          console.log(e.message)
        })
    },
    cancelReserveRoom: function (nIdx) {
      this.events.pop()
      axios.delete(`http://localhost:3000/api/rooms/`, { data: { nIdx: nIdx, usRoomNo : this.roomScheInfo.usRoomNo } } )
        .then((r) => {
          this.$data.rsvRoomModal = false
          this.scheduleRoom(this.roomScheInfo.usRoomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    closeReserveRoom: function (roomNo) {
      this.rsvRoomModal = false
    },
    cmdManualHeating: function (roomNo) {
      //alert('cmdManualHeating usManHeatingMode : ' + this.roomStatInfo.usManHeatingMode + ', '+((this.roomStatInfo.usManHeatingMode == 1) ? 2 : 1))
      axios.put('http://localhost:3000/api/rooms/cmdManualHeating', {
        RoomNo: roomNo, HeatingMode: (this.roomStatInfo.ucCurStatus == 1) ? 2 : 1,
        HeatingTimeSec: this.roomStatInfo.ulManHeatingTimeSec,
        Tset: this.roomStatInfo.fManTset, Tset_cr: this.roomStatInfo.fManTset_cr
      })
        .then((r) => {
          // this.$data.manualSettingRoomModal = false
          this.manualSettingRoom(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    cmdRoomState: function (roomNo, ucRoomState) {
      axios.put('http://localhost:3000/api/rooms/cmdRoomState', {
        RoomNo: roomNo, RoomState: (ucRoomState == 2) ? 1 : 2
      })
        .then((r) => {
          // this.$data.manualSettingRoomModal = false
          this.getRooms()
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    }
  }
}
</script>
