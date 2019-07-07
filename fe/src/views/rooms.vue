<template>
  <v-container grid-list-md text-xs-center>
    <v-divider class="my-3"></v-divider>
    <v-subheader>베스트룸</v-subheader>
    <v-layout row wrap justify-center>
      <v-flex
          v-for="room in rooms"
          v-if="room.roomState == 0"
          :key="room"
          xs10 sm6 md4 lg2 xl2
          text-xs-center
        >
        <v-item>
          <v-card
              slot-scope="{ active, toggle }"
              :color="room.roomState == 1 ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="200"
              @click="reserveRoom(room.roomNo);">
              <v-scroll-y-transition>
                <div
                  v-if="room.roomState == 2 "
                  class="display-3 text-xs-center"
                >
                  <div class="headline">예약완료</div>
                </div>
              </v-scroll-y-transition>
              <v-card-title primary-title style="margin:auto">
                  <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
              </v-card-title>
              <v-card-actions>
                <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                  <v-icon dark>event_available</v-icon>
                </v-btn>
                <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                  <v-icon dark>wb_sunny</v-icon>
                </v-btn>
                <!-- <v-spacer></v-spacer>
                <v-btn icon @click="upDownBestIcon(room.roomNo);">
                  <v-icon>{{ room.beBestTogle ? 'keyboard_arrow_up' : 'keyboard_arrow_down'  }}</v-icon>
                </v-btn> -->
              </v-card-actions>
              <!-- <v-slide-y-transition>
                <v-card-text v-show="room.beBestTogle">
                  <div v-if="room.beReserved == false">
                    <span>
                      예약일 : - <br>
                      설정온도 : {{room.isSmart ? room.smartTemp:room.setTemp}} <sup>o</sup>C
                  </span>
                  </div>
                  <div v-else style="margin:auto">
                    <span>
                      예약일 : {{room.startDate}} ~ {{room.endDate}} <br>
                      예약인원 : {{room.peopleCnt}} 명 <br>
                      입실시간 : {{room.checkInTime}} <br>
                      퇴실시간 : {{room.checkOutTime}} <br>
                      접수일 : {{room.resDate}} <br>
                      설정온도 : {{room.isSmart ? room.smartTemp:room.setTemp}} <sup>o</sup>C <br>
                    </span>
                  </div>
                </v-card-text>
              </v-slide-y-transition> -->
            </v-card>


        </v-item>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-subheader>3층</v-subheader>
    <v-divider class="my-1"></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for="room in rooms"
          v-if="room.roomNo < 1301"
          :key="room"
          xs10 sm6 md4 lg2 xl2
        >
        <v-item>
          <v-card>
            <v-scroll-y-transition>
              <v-img
                :color="primary"
                height="130px"
                @click="reserveRoom(room.roomNo);"
              >
                <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);" v-if="room.beReserved != false">
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">예약완료</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-scroll-y-transition>
            <v-card-title primary-title style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-subheader>3층</v-subheader>
    <v-divider class="my-1"></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for="room in rooms"
          v-if="room.roomNo > 1300 && room.roomNo < 1401"
          :key="room"
          xs10 sm6 md4 lg2 xl2
        >
        <v-item>
          <v-card>
            <v-scroll-y-transition>
              <v-img
                :color="primary"
                height="130px"
                @click="reserveRoom(room.roomNo);"
              >
                <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);" v-if="room.beReserved != false">
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">예약완료</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-scroll-y-transition>
            <v-card-title primary-title style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-subheader>5층</v-subheader>
    <v-divider class="my-1"></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for="room in rooms"
          v-if=" room.roomNo > 1500 && room.roomNo < 1601"
          :key="room"
          xs10 sm6 md4 lg2 xl2
        >
        <v-item>
          <v-card>
            <v-scroll-y-transition>
              <v-img
                :color="primary"
                height="130px"
                @click="reserveRoom(room.roomNo);"
              >
                <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);" v-if="room.beReserved != false">
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">예약완료</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-scroll-y-transition>
            <v-card-title primary-title style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-subheader>6층</v-subheader>
    <v-divider class="my-1"></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for="room in rooms" v-if="room.roomNo >= 1601"
          :key="room"
          xs10 sm6 md4 lg2 xl2
        >
        <v-item>
          <v-card>
            <v-scroll-y-transition>
              <v-img
                :color="primary"
                height="130px"
                @click="reserveRoom(room.roomNo);"
              >
                <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);" v-if="room.beReserved != false">
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">예약완료</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-scroll-y-transition>
            <v-card-title primary-title style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-dialog v-model="rsvRoomModal" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{roomTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-menu
                  v-model="startMenu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      label="예약 시작일"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" @input="startMenu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-menu
                  v-model="endMenu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endDate"
                      label="예약 종료일"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" @input="endMenu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6>
                <v-text-field
                  label="예약자 이름"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.subsName"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="예약자 연락처"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.subsTel"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="투숙객 수"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.peopleCnt"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-switch
                 v-model="checkInOutEnbale"
                 :label="`${checkInOutEnbale?'기본체크인아웃시간':'수동체크인아웃시간'}`"
                 @change="toggleCheckInOutEnbale()"
                ></v-switch>
              </v-flex>
              <v-flex xs6 v-if="roomInfo.checkInOutEnbale">
                <v-menu
                  ref="menu1"
                  v-model="inMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="checkInTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="checkInTime"
                      label="체크인"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="inMenu"
                    v-model="checkInTime"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu1.save(checkInTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6 v-if="roomInfo.checkInOutEnbale">
                <v-menu
                  ref="menu2"
                  v-model="outMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="checkOutTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="checkOutTime"
                      label="체크아웃"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="outMenu"
                    v-model="checkOutTime"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu2.save(checkOutTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="roomInfo.roomState == 1">
            <v-btn color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">예약</v-btn>
          </div>
          <div v-else>
            <v-btn color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">상태변경</v-btn>
            <v-btn color="blue darken-1" flat @click="cancelReserveRoom(roomInfo.roomNo)">예약취소</v-btn>
          </div>
          <v-btn color="blue darken-1" flat @click.native="rsvRoomModal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="settingRoomModal" persistent  max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{settingTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-xl>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  label="설정온도"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.setTemp"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="온도범위"
                  hint=''
                  persistent-hint
                  required
                  readonly
                  v-model="roomInfo.controlRange"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items="heatingModes"
                  v-model="heatingMode"
                  auto
                  label="보일러 동작 설정"
                  hide-details
                  class="pa-0"
                  @change="toggleHeatingMode()"
                ></v-select>
              </v-flex>
              <v-flex xs6 v-if="roomInfo.HeatingMode == 1">
                <v-text-field
                  label="보일러 동작 시간"
                  hint=''
                  class="pa-0"
                  persistent-hint
                  required
                  readonly
                  v-model="roomInfo.controlRange"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="saveSettingRoom(roomInfo.roomNo)">저장</v-btn>
          <v-btn color="blue darken-1" flat @click.native="settingRoomModal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
// import SweetCalendar from 'vue-sweet-calendar'
// import 'vue-sweet-calendar/dist/SweetCalendar.css'
// import moment from 'moment'
// import format from 'date-fns/format'
import axios from 'axios'
export default {
  el: '#key-example',
  name: 'about',
  mounted () {
    this.getRooms()
  },
  data () {
    return {
      show: false,
      rsvRoomModal: false,
      settingRoomModal: false,
      bestChkbox: false,
      smartChkbox: false,
      image1_src: require('./images/18pyeong.jpg'),
      image2_src: require('./images/25pyeong.jpg'),
      image3_src: require('./images/30pyeong.jpg'),
      curTemp: 'username',
      roomTitle: '예약 정보',
      settingTitle: '설정',
      rooms: [],
      roomInfo: {
        roomNo: 101,
        heatingMode: 0,
        setTemp: 0,
        controlRange: 0,
        heatingTimeSec: 0,
        roomState: 0,
        checkInOutEnbale: false,
        checkInTime: ' ',
        checkOutTime: ' ',
        roomType: 18,
        pos: 'sea',
        subsName: ' ',
        subsTel: ' ',
        resDate: 0,
        peopleCnt: 0,
        startDate: ' ',
        endDate: ' '
      },
      heatingModes : [
        { text: '자동' },
        { text: '수동' }
      ],
      userName: 'asd',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startMenu1: false,
      endMenu2: false,
      checkInTime: null,
      inMenu: false,
      checkOutTime: null,
      outMenu: false,
      checkInOutEnbale:false,
      type: 'room',
      heatingMode:'자동'
    }
  },
  methods: {
    getRooms () {
      axios.get('http://localhost:3000/api/rooms')
        .then((r) => {
          this.rooms = r.data
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    upDownIcon: function (roomNo) {
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNo == roomNo) {
          this.rooms[i].beRoomTogle = !this.rooms[i].beRoomTogle
          break
        }
      }
    },
    upDownBestIcon: function (roomNo) {
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNo == roomNo) {
          this.rooms[i].beBestTogle = !this.rooms[i].beBestTogle
          break
        }
      }
    },
    initRoomInfo: function () {
      this.roomInfo.roomNo = 101
      this.roomInfo.heatingMode = 0
      this.roomInfo.setTemp = 0
      this.roomInfo.controlRange = 0
      this.roomInfo.heatingTimeSec = 0
      this.roomInfo.roomState = 0
      this.roomInfo.checkInOutEnbale = false
      this.roomInfo.checkInTime = ' '
      this.roomInfo.checkOutTime = ' '
      this.roomInfo.startDate = new Date().toISOString().substr(0, 10)
      this.roomInfo.endDate = new Date().toISOString().substr(0, 10)
      this.roomInfo.roomType = 18
      this.roomInfo.pos = 'sea'
      this.roomInfo.subsName = ' '
      this.roomInfo.subsTel = ' '
      this.roomInfo.resDate = ' '
      this.roomInfo.peopleCnt = 0
      this.checkInOutEnbale = 0
      this.heatingMode = '자동'
      this.toggleHeatingMode();
    },
    getRoomInfo: function (roomNo) {
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNo == roomNo) {
          this.roomInfo.roomNo = this.rooms[i].roomNo
          this.roomInfo.heatingMode = this.rooms[i].heatingMode
          this.heatingMode = (this.roomInfo.heatingMode==0?'자동':'수동')
          this.roomInfo.setTemp = this.rooms[i].setTemp
          this.roomInfo.controlRange = this.rooms[i].controlRange
          this.roomInfo.heatingTimeSec = this.rooms[i].heatingTimeSec
          this.roomInfo.roomState = this.rooms[i].roomState
          this.roomInfo.checkInOutEnbale = this.rooms[i].checkInOutEnbale
          this.checkInOutEnbale = this.rooms[i].checkInOutEnbale
          this.roomInfo.checkInTime = this.rooms[i].checkInTime
          this.roomInfo.checkOutTime = this.rooms[i].checkOutTime
          this.roomInfo.startDate = this.rooms[i].startDate
          this.roomInfo.endDate = this.rooms[i].endDate
          this.roomInfo.roomType = this.rooms[i].roomType
          this.roomInfo.pos = this.rooms[i].pos
          this.roomInfo.subsName = this.rooms[i].subsName
          this.roomInfo.subsTel = this.rooms[i].subsTel
          this.roomInfo.resDate = this.rooms[i].resDate
          this.roomInfo.peopleCnt = this.rooms[i].peopleCnt
          // if (this.rooms[i].startDate != null && this.rooms[i].startDate.trim() != "")
          //   this.startDate = new Date(this.rooms[i].startDate).toISOString().substr(0, 10)
          // if (this.rooms[i].endDate != null && this.rooms[i].endDate.trim() != "")
          //   this.endDate = new Date(this.rooms[i].endDate).toISOString().substr(0, 10)
          // if (this.rooms[i].checkInTime != null && this.rooms[i].checkInTime.trim() != "")
          //   this.checkInTime = this.rooms[i].checkInTime
          // if (this.rooms[i].checkOutTime != null && this.rooms[i].checkOutTime.trim() != "")
          //   this.checkOutTime = this.rooms[i].checkOutTime
          break
        }
      }
    },

    reserveRoom: function (roomNo) {
      this.initRoomInfo();
      this.getRoomInfo(roomNo)
      this.$data.rsvRoomModal = true
    },
    settingRoom: function (roomNo) {
      this.initRoomInfo();
      this.getRoomInfo(roomNo)
      this.$data.settingRoomModal = true
    },
    saveReserveRoom: function (roomNo) {
      alert('this.roomInfo.checkInTime : '+ this.roomInfo.checkInTime)
      this.type = 'room'
      axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
        roomNo: roomNo, beReserved: true, startDate: this.startDate , endDate: this.endDate , checkInTime: this.checkInTime , checkOutTime: this.checkOutTime , subsName: this.roomInfo.subsName, subsTel: this.roomInfo.subsTel, peopleCnt: this.roomInfo.peopleCnt
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          // this.pop('객실 상태 변경')
          console.log('okok3')
          this.getRooms()
        })
        .catch((e) => {
        //  this.pop(e.message)
          console.log(e.message)
        })
    },
    cancelReserveRoom: function (roomNo) {
      this.type = 'room'
      axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
        roomNo: roomNo, beReserved: false, startDate: '', endDate: '', checkInTime: '', checkOutTime: '', subsName: '', subsTel: '', peopleCnt: 0
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          console.log('okok')
          this.getRooms()
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    saveSettingRoom: function (roomNo) {
      this.type = 'roomTemp'
      axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
        roomNo: roomNo, isBestRoom: this.bestChkbox, isSmart: this.smartChkbox, setTemp: this.roomInfo.setTemp
      })
        .then((r) => {
          this.$data.settingRoomModal = false
          console.log('okok2')
          this.getRooms()
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    toggleCheckInOutEnbale: function () {
      this.roomInfo.checkInOutEnbale = this.checkInOutEnbale
    },
    toggleHeatingMode: function () {
      if(this.heatingMode=='자동'){
        this.roomInfo.HeatingMode = 0
      }
      else{
        this.roomInfo.HeatingMode = 1
      }
    }
  }
}
</script>
