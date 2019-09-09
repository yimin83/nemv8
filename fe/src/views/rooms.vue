<template>
  <v-container grid-list-md>
    <v-divider class="my-3"></v-divider>
    <v-subheader>베스트룸</v-subheader>
    <v-layout row wrap justify-center>
      <v-flex
          v-for="room in roomStat"
          v-if="room.isBestRoom == true"
          :key="room"
          text-xs-center
        >
        <v-item>
          <v-card
              color="blue-grey darken-2" class="white--text mx-auto"
              full-width
              max-width="120px">
              <v-card-title
              style="cursor: pointer"
              @click="scheduleRoom(room.usRoomNo);">
                <b>{{room.usRoomNo}}호</b>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn fab color="primary" @click="settingRoom(room.usRoomNo);">
                  <v-icon dark>build</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <!-- <v-subheader>1층</v-subheader>
    <v-divider class="my-1"></v-divider> -->
    <v-layout row wrap>
      <v-flex
          v-for="room in roomStat"
          :key="room"
          text-xs-left
        >
        <v-item >
          <v-card
            v-if="room.ucRoomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.usRoomNo);">
              <b>{{room.usRoomNo}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.usRoomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.ucRoomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.usRoomNo);">
              <b>{{room.usRoomNo}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.usRoomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.ucRoomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.usRoomNo);">
              <b>{{room.usRoomNo}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.usRoomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.ucRoomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.usRoomNo);">
              <b>{{room.usRoomNo}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.usRoomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.usRoomNo);">
              <b>{{room.usRoomNo}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.usRoomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <!-- <v-divider class="my-3"></v-divider>
    <v-subheader>3층</v-subheader>
    <v-divider class="my-1"></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for="room in roomStat"
          v-if="room.room_no > 300 && room.room_no < 401"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
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
          v-for="room in roomStat"
          v-if=" room.room_no > 1500 && room.room_no < 1601"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
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
          v-for="room in roomStat" v-if="room.room_no >= 601"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="120px">
            <v-card-title
            style="cursor: pointer"
            @click="scheduleRoom(room.room_no);">
              <b>{{room.room_no}}호</b>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary" @click="settingRoom(room.room_no);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-flex>
    </v-layout> -->
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
                  v-model="roomScheInfo.subsName"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="예약자 연락처"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomScheInfo.subsTel"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="투숙객 수"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomScheInfo.peopleCnt"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-switch
                 v-model="autoCheckIn"
                 :label="`${!autoCheckIn?'수동체크인아웃시간':'기본체크인아웃시간'}`"
                 @change="toggleAutoCheckIn()"
                ></v-switch>
              </v-flex>
              <v-flex xs6 v-if="!autoCheckIn">
                <v-menu
                  ref="menu1"
                  v-model="inMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="strCheckInTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="strCheckInTime"
                      label="체크인"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="inMenu"
                    v-model="strCheckInTime"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu1.save(strCheckInTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6 v-if="!autoCheckIn">
                <v-menu
                  ref="menu2"
                  v-model="outMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="strCheckOutTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="strCheckOutTime"
                      label="체크아웃"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="outMenu"
                    v-model="strCheckOutTime"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu2.save(strCheckOutTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="roomScheInfo.idx == 0" color="blue darken-1" flat @click="reserveRoomSche()">예약</v-btn>
          <v-btn v-if="roomScheInfo.idx != 0" color="blue darken-1" flat @click="saveReserveRoom(roomScheInfo.idx)">저장</v-btn>
          <v-btn v-if="roomScheInfo.idx != 0" color="blue darken-1" flat @click="cancelReserveRoom(roomScheInfo.idx)">예약취소</v-btn>
          <v-btn color="blue darken-1" flat @click="closeReserveRoom()">닫기</v-btn>
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
              <!-- <v-flex xs6>
                <v-checkbox
                  v-model="bestChkbox"
                  :label="`베스트룸`"
                ></v-checkbox>
              </v-flex>-->
              <v-flex xs6>
                <v-text-field
                  label="RoomNo"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.RoomNo"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Area"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.Area"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Direction"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.Direction"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="ExteriorWallCnt"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.ExteriorWallCnt"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Troom_set"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.Troom_set"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Tsurf_set"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomConfigs.Tsurf_set"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Troom_cr"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.Troom_cr"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Tsurf_set"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.Tsurf_cr"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="CheckInOutEnable"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.CheckInOutEnable"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="CheckInTime"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="trnCheckInTime"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="CheckOutTime"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="trnCheckOutTime"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="strDesc"
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model="roomConfigs.szDesc"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items="heatingModes"
                  v-model="heatingMode"
                  auto
                  label="usManHeatingMode"
                  hide-details
                  height=13
                  class="pa-0"
                  @change="toggleHeatingMode()"
                ></v-select>
              </v-flex>
              <!-- <v-flex xs6 v-if="roomStatInfo.usManHeatingMode == 1">
                <v-switch
                 v-model="roomStatInfo.ucCurStatus"
                 :label="`${roomStatInfo.ucCurStatus==1?'동작':'정지'}`"
                 @change="toggleBoilerOn()"
                ></v-switch>
              </v-flex> -->
              <v-flex xs6>
                보일러 동작 상태 : {{roomStatInfo.ucCurStatus==1?'동작':'정지'}}
              </v-flex>
              <v-flex xs6 v-if="roomStatInfo.usManHeatingMode == 1">
                <v-text-field
                  label="ulManHeatingTimeSec"
                  hint=''
                  class="pa-0"
                  persistent-hint
                  required
                  height=13
                  v-model="roomStatInfo.ulManHeatingTimeSec"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 v-if="roomStatInfo.usManHeatingMode == 1">
                <v-text-field
                  label="fManTset"
                  hint=''
                  class="pa-0"
                  persistent-hint
                  required
                  height=13
                  v-model="roomStatInfo.fManTset"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 v-if="roomStatInfo.usManHeatingMode == 1">
                <v-text-field
                  label="fManTset_cr"
                  hint=''
                  class="pa-0"
                  persistent-hint
                  required
                  height=13
                  v-model="roomStatInfo.fManTset_cr"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="roomStatInfo.usManHeatingMode == 1" color="blue darken-1" flat @click="cmdManualHeating(roomStatInfo.roomNo)">난방</v-btn>
          <v-btn color="blue darken-1" flat @click="saveSettingRoom(roomStatInfo.roomNo)">저장</v-btn>
          <v-btn color="blue darken-1" flat @click.native="settingRoomModal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="roomScheduleModal" persistent max-width="500px">
      <v-layout max-height="300px">
        <v-flex>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn outlined class="mr-3" @click="setToday">
                Today
              </v-btn>
              <v-btn fab text small @click="prev">
                <v-icon small>arrow_back_ios</v-icon>
              </v-btn>
              <v-btn fab text small @click="next">
                <v-icon small>arrow_forward_ios</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    outlined
                    v-on="on"
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
          <v-sheet height="500">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :event-margin-bottom="3"
              :now="today"
              :type="calType"
              @click:event="showEvent"
              @mouseenter:day="mouseEnter"
              @mousedown:day="mouseDown"
              @mouseup:day="mouseUp"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              full-width
              offset-x
            >
            </v-menu>
            </v-sheet>
            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="roomScheduleModal = false">닫기</v-btn>
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
      settingRoomModal: false,
      bestChkbox: false,
      roomTitle: '객실 예약',
      settingTitle: '객실 설정',
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
        Area:0,
        Direction:0,
        ExteriorWallCnt:0,
        szDesc:0,
        ucRoomState:0,
        ucTotalStatus:0,
        ucSetStatus:0,
        ucCurStatus: 0,
        nCheckInOutEnable:0,
        nCheckInTime:0,
        nCheckOutTime:0,
        fTset: 0,
        fTsurf_set:0,
        fTsurf_cur:0,
        fTroom_set:0,
        fTroom_cur:0,
        usManHeatingMode:0,
        ulManHeatingTimeSec:0,
        fManTset:0,
        fManTset_cr:0,
        nSetLastTime:0
      },
      roomScheInfo: {
        idx: 0,
        roomNo: 0,
        checkInOutEnbale: 0,
        strCheckInTime: '',
        checkInTime: 0,
        strCheckOutTime: '',
        checkOutTime: 0,
        subsName: '',
        subsTel: '',
        resDate: '',
        peopleCnt: 0,
        strDesc: ''
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
        return new Date().toISOString().substr(0, 4) + "/"+ new Date().toISOString().substr(5, 2)
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
      for(var i=0; i < this.events.length ; i++){
        if(this.events[i].roomNo == this.roomNo){
          if( this.events[i].start <= this.reserveStartDate && this.events[i].end >= this.reserveStartDate ){
           isDuple=true
           break;
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
        for(var i=0; i < this.events.length ; i++){
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
    initRoomStatInfo: function () {
      this.roomStatInfo.usRoomNo = 0
      this.roomStatInfo.Area = 0,
      this.roomStatInfo.Direction = 0,
      this.roomStatInfo.ExteriorWallCnt = 0,
      this.roomStatInfo.szDesc = '',
      this.roomStatInfo.ucRoomState = 0
      this.roomStatInfo.ucTotalStatus = 0
      this.roomStatInfo.ucSetStatus = 0
      this.roomStatInfo.ucCurStatus = 0
      this.roomStatInfo.nCheckInOutEnable = 0
      this.roomStatInfo.nCheckInTime = 0
      this.roomStatInfo.nCheckOutTime = 0
      this.roomStatInfo.fTset = 0
      this.roomStatInfo.fTsurf_set = 0
      this.roomStatInfo.fTsurf_cur = 0
      this.roomStatInfo.fTroom_set = 0
      this.roomStatInfo.fTroom_cur = 0
      this.roomStatInfo.usManHeatingMode = 0
      this.roomStatInfo.ulManHeatingTimeSec = 0
      this.roomStatInfo.fManTset = 0
      this.roomStatInfo.fManTset_cr = 0
      this.roomStatInfo.nSetLastTime = 0
    },
    initRoomScheInfo: function () {
      this.roomScheInfo.idx=0,
      this.roomScheInfo.roomNo= 0,
      this.roomScheInfo.checkInOutEnbale= 0,
      this.roomScheInfo.strCheckInTime= '',
      this.roomScheInfo.checkInTime= 0,
      this.roomScheInfo.strCheckOutTime= '',
      this.roomScheInfo.checkOutTime= 0,
      this.roomScheInfo.subsName= '',
      this.roomScheInfo.subsTel= '',
      this.roomScheInfo.resDate= '',
      this.roomScheInfo.peopleCnt= 0,
      this.roomScheInfo.strDesc= ''
      this.strCheckInTime = '14:00'
      this.strCheckOutTime = '12:00'
      this.autoCheckIn = true
    },
    getRoomScheInfo: function (idx) {
      if(idx == 0) {
        this.roomTitle = '객실 예약'
        this.autoCheckIn = true
        this.roomScheInfo.idx = idx
        this.roomScheInfo.roomNo = this.roomNo
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
          if (this.roomsSchedule[i].idx == idx) {
            this.roomScheInfo.idx = this.roomsSchedule[i].idx
            this.roomScheInfo.roomNo = this.roomsSchedule[i].roomNo
            this.roomScheInfo.checkInOutEnbale = this.roomsSchedule[i].checkInOutEnbale
            this.autoCheckIn = true
            this.roomScheInfo.strCheckInTime = this.roomsSchedule[i].strCheckInTime
            this.roomScheInfo.checkInTime = this.roomsSchedule[i].checkInTime
            this.roomScheInfo.strCheckOutTime = this.roomsSchedule[i].strCheckOutTime
            this.roomScheInfo.checkOutTime = this.roomsSchedule[i].checkOutTime
            if(this.roomsSchedule[i].strCheckInTime != null && this.roomsSchedule[i].strCheckInTime.trim() != '') {
              this.roomScheInfo.strCheckInTime = this.roomsSchedule[i].strCheckInTime
              this.startDate = this.roomScheInfo.strCheckInTime.substr(0, 10)
              this.strCheckInTime = this.roomScheInfo.strCheckInTime.substr(10, 6)
              if(this.strCheckInTime.trim() != '14:00'.trim())
                this.autoCheckIn = false
            }
            if(this.roomsSchedule[i].strCheckOutTime != null && this.roomsSchedule[i].strCheckOutTime.trim() != '') {
              this.roomScheInfo.strCheckOutTime = this.roomsSchedule[i].strCheckOutTime
              this.endDate = this.roomScheInfo.strCheckOutTime.substr(0, 10)
              this.strCheckOutTime = this.roomScheInfo.strCheckOutTime.substr(10, 6)
              if((!this.autoCheckIn) || this.strCheckOutTime.trim() != '12:00')
                this.autoCheckIn = false
            }
            this.roomScheInfo.subsName = this.roomsSchedule[i].subsName
            this.roomScheInfo.subsTel = this.roomsSchedule[i].subsTel
            this.roomScheInfo.peopleCnt = this.roomsSchedule[i].peopleCnt
            this.roomScheInfo.strDesc = this.roomsSchedule[i].strDesc
            break
          }
        }
      }
    },
    getRooms () {
      axios.get('http://localhost:3000/api/rooms')
        .then((r) => {
          this.roomStat = r.data
        })
        .catch((e) => {
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
          // alert(this.roomsSchedule.length)
          for(var i=0; i < this.roomsSchedule.length ; i++){
            this.events.push({
              idx: this.roomsSchedule[i].idx,
              roomNo: this.roomsSchedule[i].roomNo,
              name: this.roomsSchedule[i].subsName,
              details: this.roomsSchedule[i].strDesc,
              start: this.roomsSchedule[i].strCheckInTime,
              end: this.roomsSchedule[i].strCheckOutTime,
              color: 'grey darken-1'
            })
          }
        })
        .catch((e) => {
          console.error(e.message)
        })
      this.$data.roomScheduleModal = true
    },
    settingRoom: function (roomNo) {
      //this.initRoomStatInfo()
      // this.getRoomStatInfo(roomNo)
      axios.get(`http://localhost:3000/api/rooms/getRoomConfig/${roomNo}`)
        .then((r) => {
          this.roomConfigs = JSON.parse(r.data)
          this.trnCheckInTime = new Date(this.roomConfigs.CheckInTime*1000).toISOString().
                                                                            replace(/T/, ' ').      // replace T with a space
                                                                            replace(/\..+/, '')
          this.trnCheckOutTime = new Date(this.roomConfigs.CheckOutTime*1000).toISOString().
                                                                            replace(/T/, ' ').      // replace T with a space
                                                                            replace(/\..+/, '')
          this.roomStatInfo.Area = this.roomConfigs.Area
          this.roomStatInfo.Direction = this.roomConfigs.Direction
          this.roomStatInfo.ExteriorWallCnt = this.roomConfigs.ExteriorWallCnt
          this.roomStatInfo.szDesc = this.roomConfigs.szDesc
          // alert(this.trnCheckInTime +", "+this.trnCheckOutTime)
          for (var i = 0; i < this.roomStat.length; i++) {
             if (this.roomStat[i].roomNo == roomNo) {
               this.roomStatInfo.usRoomNo = this.roomStat[i].usRoomNo
               this.roomStatInfo.ucRoomState = this.roomStat[i].ucRoomState
               this.roomStatInfo.ucTotalStatus = this.roomStat[i].ucTotalStatus
               this.roomStatInfo.ucSetStatus = this.roomStat[i].ucSetStatus
               this.roomStatInfo.ucCurStatus = this.roomStat[i].ucCurStatus
               this.roomStatInfo.nCheckInOutEnable = this.roomStat[i].nCheckInOutEnable
               this.roomStatInfo.nCheckInTime = this.roomStat[i].nCheckInTime
               this.roomStatInfo.nCheckOutTime = this.roomStat[i].nCheckOutTime
               this.roomStatInfo.fTset = this.roomStat[i].fTset
               this.roomStatInfo.fTsurf_set = this.roomStat[i].fTsurf_set
               this.roomStatInfo.fTsurf_cur = this.roomStat[i].fTsurf_cur
               this.roomStatInfo.fTroom_set = this.roomStat[i].fTroom_set
               this.roomStatInfo.fTroom_cur = this.roomStat[i].fTroom_cur
               this.roomStatInfo.usManHeatingMode = this.roomStat[i].usManHeatingMode
               this.heatingMode == (this.roomStatInfo.usManHeatingMode  == 0) ? '자동':'수동'
               this.toggleHeatingMode()
               this.roomStatInfo.ulManHeatingTimeSec = this.roomStat[i].ulManHeatingTimeSec
               this.roomStatInfo.fManTset = this.roomStat[i].fManTset
               this.roomStatInfo.fManTset_cr = this.roomStat[i].fManTset_cr
               this.roomStatInfo.nSetLastTime = this.roomStat[i].nSetLastTime
               // this.bestChkbox = this.roomStat[i].isBestRoom
               // this.roomStatInfo.boilerOn = this.roomStat[i].boilerOn
               break
             }
           }

        })
        .catch((e) => {
          console.error(e.message)
        })
      this.$data.settingRoomModal = true
    },
    reserveRoomSche: function () {
      this.type = 'roomSche'
      this.roomScheInfo.strCheckInTime = this.startDate + " " + this.strCheckInTime
      this.roomScheInfo.strCheckOutTime = this.endDate + " " + this.strCheckOutTime
      var nCheckInTime = Math.round(new Date(this.roomScheInfo.strCheckInTime).getTime()/1000);
      var nCheckOutTime = Math.round(new Date(this.roomScheInfo.strCheckOutTime).getTime()/1000);

      axios.post('http://localhost:3000/api/rooms/', {
        usRoomNo: this.roomScheInfo.roomNo, nCheckInOutEnbale: true, nCheckInTime: nCheckInTime, nCheckOutTime: nCheckOutTime, szSubsName: this.roomScheInfo.subsName, szSubsTel: this.roomScheInfo.subsTel, tReserveDate: null, ucPeopleCnt: this.roomScheInfo.peopleCnt, szDesc: this.roomScheInfo.strDesc
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          // this.pop('객실 상태 변경')
          console.log('okok3')
          this.scheduleRoom(this.roomNo)
        })
        .catch((e) => {
        //  this.pop(e.message)
          console.log(e.message)
        })
    },
    saveReserveRoom: function (idx) {
      this.type = 'roomSche'
      this.roomScheInfo.strCheckInTime = this.startDate + " " + this.strCheckInTime
      this.roomScheInfo.strCheckOutTime = this.endDate + " " + this.strCheckOutTime
      var nCheckInTime = Math.round(new Date(this.roomScheInfo.strCheckInTime).getTime()/1000);
      var nCheckOutTime = Math.round(new Date(this.roomScheInfo.strCheckOutTime).getTime()/1000);
      axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
        nIdx: idx, usRoomNo: this.roomScheInfo.roomNo, nCheckInOutEnbale: true, nCheckInTime: nCheckInTime, nCheckOutTime: nCheckOutTime, szSubsName: this.roomScheInfo.subsName, szSubsTel: this.roomScheInfo.subsTel, tReserveDate: null, ucPeopleCnt: this.roomScheInfo.peopleCnt, szDesc: this.roomScheInfo.strDesc
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          // this.pop('객실 상태 변경')
          this.scheduleRoom(this.roomNo)
        })
        .catch((e) => {
        //  this.pop(e.message)
          console.log(e.message)
        })
    },
    cancelReserveRoom: function (nIdx) {
      this.events.pop()
      axios.delete(`http://localhost:3000/api/rooms/${nIdx}`)
        .then((r) => {
          this.$data.rsvRoomModal = false
          this.scheduleRoom(this.roomNo)
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    closeReserveRoom: function (roomNo) {
      this.rsvRoomModal = false
    },
    saveSettingRoom: function (roomNo) {
      axios.put(`http://localhost:3000/api/rooms/${'roomStat'}`, {
        RoomNo: this.roomConfigs.RoomNo, Area: this.roomConfigs.Area, Direction: this.roomConfigs.Direction, ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
        Troom_set: this.roomConfigs.Troom_set, Tsurf_set:this.roomConfigs.Tsurf_set, Troom_cr: this.roomConfigs.Troom_cr, Tsurf_cr: this.roomConfigs.Tsurf_cr,
        CheckInOutEnable: this.roomConfigs.CheckInOutEnable, CheckInTime: this.roomConfigs.CheckInTime, CheckOutTime:this.roomConfigs.CheckOutTime, szDesc:  this.roomConfigs.szDesc,
        HeatingMode: this.roomStatInfo.usManHeatingMode, HeatingTimeSec: this.roomStatInfo.ulManHeatingTimeSec, Tset: this.roomStatInfo.fManTset, Tset_cr: this.roomStatInfo.fManTset_cr

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
    toggleAutoCheckIn: function () {
    },
    toggleBoilerOn: function () {
    },
    toggleHeatingMode: function () {
      if (this.heatingMode == '자동') this.roomStatInfo.usManHeatingMode = 0
      else this.roomStatInfo.usManHeatingMode = 1
    }
  }
}
</script>
