<template>
  <v-container grid-list-md text-xs-center>
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
              max-width="200px">
              <v-card-title>
                <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
              </v-card-title>
              <v-card-actions>
                <!-- <v-spacer></v-spacer>
                <v-btn fab color="primary"  @click="reserveRoom(room.roomNo);">
                  <v-icon dark>assignment</v-icon>
                </v-btn> -->
                <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                  <v-icon dark>query_builder</v-icon>
                </v-btn>
                <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                  <v-icon dark>build</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
        </v-item>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-subheader>2층</v-subheader>
    <v-divider class="my-1"></v-divider>
    <v-layout row wrap>
      <v-flex
          v-for="room in roomStat"
          v-if="room.roomNo < 1301"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
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
          v-for="room in roomStat"
          v-if="room.roomNo > 1300 && room.roomNo < 1401"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
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
          v-if=" room.roomNo > 1500 && room.roomNo < 1601"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
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
          v-for="room in roomStat" v-if="room.roomNo >= 1601"
          :key="room"
        >
        <v-item >
          <v-card
            v-if="room.roomState == 0"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 1"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 2"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else-if="room.roomState == 3"
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="blue-grey darken-2" class="white--text mx-auto"
            full-width
            max-width="200px">
            <v-card-title>
              <v-spacer></v-spacer><b>{{room.roomNo}}호</b>({{room.roomType}}평)<v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn fab color="primary"  @click="scheduleRoom(room.roomNo);">
                <v-icon dark>query_builder</v-icon>
              </v-btn>
              <v-btn fab color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>build</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
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
                 :label="`${checkInOutEnbale?'수동체크인아웃시간':'기본체크인아웃시간'}`"
                 @change="toggleCheckInOutEnbale()"
                ></v-switch>
              </v-flex>
              <v-flex xs6 v-if="roomInfo.checkInOutEnbale">
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
              <v-flex xs6 v-if="roomInfo.checkInOutEnbale">
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
          <v-btn v-if="roomInfo.roomState == 1" color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">예약</v-btn>
          <v-btn v-if="roomInfo.roomState != 1" color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">상태변경</v-btn>
          <v-btn v-if="roomInfo.roomState != 1" color="blue darken-1" flat @click="cancelReserveRoom(roomInfo.roomNo)">예약취소</v-btn>
          <v-btn color="blue darken-1" flat @click="closeReserveRoom(roomInfo.roomNo)">닫기</v-btn>
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
                <v-checkbox
                  v-model="bestChkbox"
                  :label="`베스트룸`"
                ></v-checkbox>
              </v-flex>
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
                  v-model="roomInfo.heatingTimeSec"
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
                <v-btn color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">예약</v-btn>
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
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      // events: [
      //   {
      //     name: 'Large Event',
      //     details: 'This starts in the middle of an event and spans over multiple events',
      //     start: '2019-06-30 12:00',
      //     end: '2019-07-04 14:00',
      //     color: 'deep-purple',
      //   },
      //   {
      //     name: 'Conference',
      //     details: 'The best time of my life',
      //     start: '2019-07-21 12:00',
      //     end: '2019-07-28 14:00',
      //     color: 'grey darken-1',
      //   },
      //   {
      //     name: 'Hackathon',
      //     details: 'Code like there is no tommorrow',
      //     start: '2019-07-30 12:00',
      //     end: '2019-08-01 14:00',
      //     color: 'black',
      //   },
      //   {
      //     name: 'event 1',
      //     details: ' ',
      //     start: '2019-07-14 12:00',
      //     end: '2019-07-16 14:00',
      //     color: '#4285F4',
      //   }
      //],
      show: false,
      rsvRoomModal: false,
      roomScheduleModal: false,
      settingRoomModal: false,
      bestChkbox: false,
      smartChkbox: false,
      roomTitle: '객실 예약',
      scheduleTitle: '객실 스케쥴',
      settingTitle: '객실 설정',
      roomStat: [],
      roomsSchedule: [],
      rooms: [],
      roomStatInfo: {
        roomNo: 0,
        heatingMode: 0,
        setTemp: 0,
        controlRange: 0,
        heatingTimeSec: 0,
        roomState: 0,
        roomType: 18,
        pos: 'sea',
        isBestRoom: false
      },
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
      strCheckInOutEnbale: false,
      type: 'room',
      heatingMode: '자동',
      mouseDowned: false,
      reserveStartDate: '',
      reserveEndDate: '',
      roomNo: 0,
      roomIdx: 0
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
          this.reserveRoom(this.roomNo, null)
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
      this.reserveRoom(this.roomNo, event)
    },
    updateRange ({ start, end }) {
      //alert('updateRange')
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    initRoomStatInfo: function () {
      this.roomStatInfo.roomNo = 101
      this.roomStatInfo.heatingMode = 0
      this.roomStatInfo.setTemp = 0
      this.roomStatInfo.controlRange = 0
      this.roomStatInfo.heatingTimeSec = 0
      this.roomStatInfo.roomState = 0
      this.roomStatInfo.roomType = 18
      this.roomStatInfo.pos = 'sea'
      this.roomStatInfo.isBestRoom = false
    },
    initRoomInfo: function () {
      this.roomInfo.roomNo = 101
      this.roomInfo.heatingMode = 0
      this.roomInfo.setTemp = 0
      this.roomInfo.controlRange = 0
      this.roomInfo.heatingTimeSec = 0
      this.roomInfo.roomState = 0
      this.roomInfo.checkInOutEnbale = false
      this.roomInfo.checkInTime = '14:00'
      this.roomInfo.checkOutTime = '12:00'
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
      this.strCheckInTime = '14:00'
      this.strCheckOutTime = '12:00'
      this.bestChkbox = false
      this.toggleHeatingMode()
    },
    getRoomInfo: function (roomNo) {
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNo == roomNo) {
          this.roomInfo.roomNo = this.rooms[i].roomNo
          this.roomInfo.heatingMode = this.rooms[i].heatingMode
          this.heatingMode = (this.roomInfo.heatingMode == 0 ? '자동' : '수동')
          this.roomInfo.setTemp = this.rooms[i].setTemp
          this.roomInfo.controlRange = this.rooms[i].controlRange
          this.roomInfo.heatingTimeSec = this.rooms[i].heatingTimeSec
          this.roomInfo.roomState = this.rooms[i].roomState
          this.roomInfo.checkInOutEnbale = this.rooms[i].checkInOutEnbale
          this.checkInOutEnbale = this.rooms[i].checkInOutEnbale
          if(this.rooms[i].strCheckInTime != null && this.rooms[i].strCheckInTime.trim() != '') {
            this.roomInfo.strCheckInTime = this.rooms[i].strCheckInTime
            this.strCheckInTime = this.roomInfo.strCheckInTime
          }
          if(this.rooms[i].strCheckOutTime != null && this.rooms[i].strCheckOutTime.trim() != '') {
            this.roomInfo.strCheckOutTime = this.rooms[i].strCheckOutTime
            this.strCheckOutTime = this.roomInfo.strCheckOutTime
          }
          if(this.rooms[i].startDate != null && this.rooms[i].startDate.trim() != '') {
            this.roomInfo.startDate = this.rooms[i].startDate
            this.startDate = this.roomInfo.startDate
          }
          if(this.rooms[i].endDate != null && this.rooms[i].endDate.trim() != '') {
            this.roomInfo.endDate = this.rooms[i].endDate
            this.endDate = this.roomInfo.endDate
          }
          this.roomInfo.roomType = this.rooms[i].roomType
          this.roomInfo.pos = this.rooms[i].pos
          this.roomInfo.subsName = this.rooms[i].subsName
          this.roomInfo.subsTel = this.rooms[i].subsTel
          this.roomInfo.resDate = this.rooms[i].resDate
          this.roomInfo.peopleCnt = this.rooms[i].peopleCnt
          this.bestChkbox = this.rooms[i].isBestRoom
          break
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
    reserveRoom: function (roomNo, event) {
      if(event != null) {
        alert('event start : ' + event.start + ", end : " + event.end)
      }
      else {
        const roomSche = this.events.pop()
        alert('roomSche start : ' + roomSche.start + ", end : " + roomSche.end)
      }
      this.initRoomInfo()
      this.getRoomInfo(roomNo)
      this.$data.rsvRoomModal = true
    },
    scheduleRoom: function (roomNo) {
      this.today = new Date().toISOString().substr(0, 10)
      this.focus =  new Date().toISOString().substr(0, 10)
      this.calType = 'month'
      this.roomNo = roomNo
      axios.get(`http://localhost:3000/api/rooms/${roomNo}`)
        .then((r) => {
          this.roomsSchedule = r.data
          alert(this.roomsSchedule.length)
          for(var i=0; i < this.roomsSchedule.length ; i++){
            this.events.push({
              idx: this.roomsSchedule[i].idx,
              roomNo: this.roomsSchedule[i].roomNo,
              name: this.roomsSchedule[i].subsName,
              details: this.roomsSchedule[i].desc,
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
      this.initRoomInfo()
      this.getRoomInfo(roomNo)
      this.$data.settingRoomModal = true
    },
    saveReserveRoom: function (roomNo) {
      // this.type = 'room'
      // axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
      //   roomNo: roomNo, beReserved: true, startDate: this.startDate, endDate: this.endDate, checkInTime: this.checkInTime, checkOutTime: this.checkOutTime, subsName: this.roomInfo.subsName, subsTel: this.roomInfo.subsTel, peopleCnt: this.roomInfo.peopleCnt
      // })
      //   .then((r) => {
      //     this.$data.rsvRoomModal = false
      //     // this.pop('객실 상태 변경')
      //     console.log('okok3')
      //     this.getRooms()
      //   })
      //   .catch((e) => {
      //   //  this.pop(e.message)
      //     console.log(e.message)
      //   })
    },
    cancelReserveRoom: function (roomNo) {
      this.events.pop()
      axios.put(`http://localhost:3000/api/rooms/${'roomsSchedule'}`, {
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
    closeReserveRoom: function (roomNo) {
      this.rsvRoomModal = false
    },
    saveSettingRoom: function (roomNo) {
      this.type = 'roomTemp'
      axios.put(`http://localhost:3000/api/rooms/${'roomStat'}`, {
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
      if (this.heatingMode == '자동') this.roomInfo.HeatingMode = 0
      else this.roomInfo.HeatingMode = 1
    }
  }
}
</script>
