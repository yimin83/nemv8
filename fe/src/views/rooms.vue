<template>
  <v-container grid-list-md text-xs-center>
    <v-divider class="my-3"></v-divider>
    <v-subheader>베스트룸</v-subheader>
    <v-layout row wrap justify-center>
      <v-flex
          v-for="room in rooms"
          v-if="room.isBestRoom == true"
          :key="room"
          xs10 sm6 md4 lg2 xl2
          text-xs-center
        >
        <v-item>
          <v-card>
            <div v-if="room.roomType == 18">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else-if="room.roomType == 30">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else>
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <v-card-title primary-title>
              <div style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
              </div>
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
                    입실시간 : {{room.inTime}} <br>
                    퇴실시간 : {{room.outTime}} <br>
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
          v-if="room.roomNo < 1501"
          :key="room"
          xs10 sm6 md4 lg2 xl2
        >
        <v-item>
          <v-card>
            <v-scroll-y-transition>
            <div v-if="room.roomN0 == 1501">
              <v-divider class="my-3"></v-divider>
            </div>
            <div v-if="room.roomType == 18">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else-if="room.roomType == 30">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else>
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            </v-scroll-y-transition>
            <v-card-title primary-title>
              <div style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
              <!-- <v-spacer></v-spacer>
              <v-btn icon @click="upDownIcon(room.roomNo);">
                <v-icon>{{ room.beRoomTogle ? 'keyboard_arrow_up' : 'keyboard_arrow_down'  }}</v-icon>
              </v-btn> -->
            </v-card-actions>
            <!-- <v-slide-y-transition>
              <v-card-text v-show="room.beRoomTogle">
                <div v-if="room.beReserved == false" >
                  예약일 : - <br>
                  설정온도 : {{room.isSmart ? room.smartTemp:room.setTemp}} <sup>o</sup>C
                </div>
                <div v-else style="margin:auto">
                  <span>
                    예약일 : {{room.startDate}} ~ {{room.endDate}} <br>
                    예약인원 : {{room.peopleCnt}} 명 <br>
                    입실시간 : {{room.inTime}} <br>
                    퇴실시간 : {{room.outTime}} <br>
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
            <div v-if="room.roomN0 == 1501">
              <v-divider class="my-3"></v-divider>
            </div>
            <div v-if="room.roomType == 18">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else-if="room.roomType == 30">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else>
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            </v-scroll-y-transition>
            <v-card-title primary-title>
              <div style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
              <!-- <v-spacer></v-spacer>
              <v-btn icon @click="upDownIcon(room.roomNo);">
                <v-icon>{{ room.beRoomTogle ? 'keyboard_arrow_up' : 'keyboard_arrow_down'  }}</v-icon>
              </v-btn> -->
            </v-card-actions>
            <!-- <v-slide-y-transition>
              <v-card-text v-show="room.beRoomTogle">
                <div v-if="room.beReserved == false" >
                  예약일 : - <br>
                  설정온도 : {{room.isSmart ? room.smartTemp:room.setTemp}} <sup>o</sup>C
                </div>
                <div v-else style="margin:auto">
                  <span>
                    예약일 : {{room.startDate}} ~ {{room.endDate}} <br>
                    예약인원 : {{room.peopleCnt}} 명 <br>
                    입실시간 : {{room.inTime}} <br>
                    퇴실시간 : {{room.outTime}} <br>
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
            <div v-if="room.roomN0 == 1501">
              <v-divider class="my-3"></v-divider>
            </div>
            <div v-if="room.roomType == 18">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image1_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else-if="room.roomType == 30">
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image3_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            <div v-else>
              <div v-if="room.beReserved == false">
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  :src="image2_src"
                  height="130px"
                  @click="reserveRoom(room.roomNo);"
                >
                  <v-container fill-height fluid style="background-color: rgba(255, 255, 255, 0.7);">
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">예약완료</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </div>
            </div>
            </v-scroll-y-transition>
            <v-card-title primary-title>
              <div style="margin:auto">
                <center><b>{{room.roomNo}}호</b> ({{room.roomType}}평형) </center>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn fab dark small left color="primary"  @click="reserveRoom(room.roomNo);">
                <v-icon dark>event_available</v-icon>
              </v-btn>
              <v-btn fab dark small left color="primary" @click="settingRoom(room.roomNo);">
                <v-icon dark>wb_sunny</v-icon>
              </v-btn>
              <!-- <v-spacer></v-spacer>
              <v-btn icon @click="upDownIcon(room.roomNo);">
                <v-icon>{{ room.beRoomTogle ? 'keyboard_arrow_up' : 'keyboard_arrow_down'  }}</v-icon>
              </v-btn> --> -->
            </v-card-actions>
            <!-- <v-slide-y-transition>
              <v-card-text v-show="room.beRoomTogle">
                <div v-if="room.beReserved == false" >
                  예약일 : - <br>
                  설정온도 : {{room.isSmart ? room.smartTemp:room.setTemp}} <sup>o</sup>C
                </div>
                <div v-else style="margin:auto">
                  <span>
                    예약일 : {{room.startDate}} ~ {{room.endDate}} <br>
                    예약인원 : {{room.peopleCnt}} 명 <br>
                    입실시간 : {{room.inTime}} <br>
                    퇴실시간 : {{room.outTime}} <br>
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
    <v-dialog v-model="rsvRoomModal" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{roomTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
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
              <v-flex xs12 sm6 md4>
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
              <v-flex xs11 sm5>
                <v-menu
                  ref="menu1"
                  v-model="inMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="inTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="inTime"
                      label="체크인"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="inMenu"
                    v-model="inTime"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu1.save(inTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs11 sm5>
                <v-menu
                  ref="menu2"
                  v-model="outMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="outTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="outTime"
                      label="체크아웃"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="outMenu"
                    v-model="outTime"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu2.save(outTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="예약자 이름"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.subsName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="예약자 연락처"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.subsTel"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="투숙객 수"
                  hint=''
                  persistent-hint
                  required
                  v-model="roomInfo.peopleCnt"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="roomInfo.beReserved == false">
            <v-btn color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">예약</v-btn>
          </div>
          <div v-else>
            <v-btn color="blue darken-1" flat @click="saveReserveRoom(roomInfo.roomNo)">예약변경</v-btn>
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
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-checkbox
                  v-model="bestChkbox"
                  :label="`베스트룸`"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-checkbox
                  v-model="smartChkbox"
                  :label="`스마트온도`"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <div v-if="smartChkbox == false">
                  <v-text-field
                    label="설정온도"
                    hint=''
                    persistent-hint
                    required
                    v-model="roomInfo.setTemp"
                  ></v-text-field>
                </div>
                <div v-else>
                  <v-text-field
                    label="스마트온도"
                    hint=''
                    persistent-hint
                    required
                    readonly
                    v-model="roomInfo.smartTemp"
                  ></v-text-field>
                </div>
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
        roomType: 18,
        pos: 'sea',
        setTemp: 0,
        beReserved: false,
        peopleCnt: 0,
        startDate: ' ',
        endDate: ' ',
        inTime: ' ',
        outTime: ' ',
        subsName: ' ',
        subsTel: ' '
      },
      userName: 'asd',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startMenu1: false,
      endMenu2: false,
      inTime: null,
      inMenu: false,
      outTime: null,
      outMenu: false,
      type: 'room'
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
    reserveRoom: function (roomNo) {
      this.startDate = new Date().toISOString().substr(0, 10)
      this.endDate = new Date().toISOString().substr(0, 10)
      this.inTime = ''
      this.outTime = ''
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNo == roomNo) {
          console.log('startData : ' + this.rooms[i].startDate + 'endDate : ' + this.rooms[i].endDate +'resDate : ' + this.rooms[i].resDate)
          this.roomInfo.roomNo = this.rooms[i].roomNo
          this.roomInfo.roomType = this.rooms[i].roomType
          this.roomInfo.pos = this.rooms[i].pos
          this.roomInfo.isSmart = this.rooms[i].isSmart
          this.roomInfo.isBestRoom = this.rooms[i].isBestRoom
          this.roomInfo.setTemp = this.rooms[i].setTemp
          this.roomInfo.smartTemp = this.rooms[i].smartTemp
          if (this.rooms[i].beReserved == false) { break }
          this.roomInfo.beReserved = this.rooms[i].beReserved
          this.roomInfo.peopleCnt = this.rooms[i].peopleCnt
          if (this.rooms[i].startDate.trim() != "")
            this.startDate = new Date(this.rooms[i].startDate).toISOString().substr(0, 10)
          if (this.rooms[i].endDate.trim() != "")
            this.endDate = new Date(this.rooms[i].endDate).toISOString().substr(0, 10)
          if (this.rooms[i].inTime.trim() != "")
            this.inTime = this.rooms[i].inTime
          if (this.rooms[i].outTime.trim() != "")
            this.outTime = this.rooms[i].outTime
          this.roomInfo.subsName = this.rooms[i].subsName
          this.roomInfo.subsTel = this.rooms[i].subsTel
          break
        }
      }
      this.$data.rsvRoomModal = true
    },
    settingRoom: function (roomNo) {
      this.roomInfo.isSmart = false
      this.roomInfo.isBestRoom = false
      this.roomInfo.smartTemp = 0
      this.roomInfo.setTemp = 0
      this.bestChkbox = false
      this.smartChkbox = false
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomNo == roomNo) {
          this.roomInfo.roomNo = this.rooms[i].roomNo
          this.bestChkbox = this.rooms[i].isBestRoom
          this.smartChkbox = this.rooms[i].isSmart
          this.roomInfo.smartTemp = this.rooms[i].smartTemp
          this.roomInfo.setTemp = this.rooms[i].setTemp
          break
        }
      }
      this.$data.settingRoomModal = true
    },
    saveReserveRoom: function (roomNo) {
      alert("this.roomInfo.inTime : "+ this.roomInfo.inTime + "")
      this.type = 'room'
      axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
        roomNo: roomNo, beReserved: true, startDate: this.startDate , endDate: this.endDate , inTime: this.inTime , outTime: this.outTime , subsName: this.roomInfo.subsName, subsTel: this.roomInfo.subsTel, peopleCnt: this.roomInfo.peopleCnt
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
        //  this.pop('객실 상태 변경')
          console.log("okok3")
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
        roomNo: roomNo, beReserved: false, startDate: '', endDate: '', inTime: '', outTime: '', subsName: '', subsTel: '', peopleCnt: 0
      })
        .then((r) => {
          this.$data.rsvRoomModal = false
          console.log("okok")
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
          this.$data.rsvRoomModal = false
          console.log("okok2")
          this.getRooms()
        })
        .catch((e) => {
          console.log(e.message)
        })
    }
  }
}
</script>
