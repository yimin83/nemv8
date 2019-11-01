<template>
  <v-container grid-list-md>
    <v-divider class='my-3 mt-0'></v-divider>
      <div class="text--primary ma-0">
      난방(보일러 on) : {{this.SetStatus}}({{this.CurStatus}})
      </div>
    <v-divider class='my-3 mt-0'></v-divider>
    <v-layout row wrap >
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="blue-grey lighten-4"
        x-small>공실
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;공실&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="orange lighten-3"
        x-small>
        예비
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;예비난방&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="pink lighten-2"
        small
      >
        입실
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;입실&nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="light-green accent-2"
        small
      >
        자동
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;난방모드 자동&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="indigo lighten-2"
        small
      >
        수동
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;난방모드 수동&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="blue-grey lighten-4"
        small
      >
        정지
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;난방모드 정지 &nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="deep-orange lighten-4"
        small
      >
        &nbsp;
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;보일러 가동&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 pa-1 font-weight-bold"
        color="blue-grey lighten-5"
        small
      >
        &nbsp;
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;보일러 중지&nbsp;|&nbsp;&nbsp;
      </div>
      <v-card
        class="d-inline-flex  ma-0 pa-0 font-weight-bold"
        color="blue lighten-4"
        outlined
      >
        <div class="text--primary">실내온도</div>
      </v-card>
      &nbsp;
      <v-card
        class="d-inline-flex ma-0 pa-0 font-weight-bold"
        color="light-blue accent-1"
        outlined
      >
        <div class="text--primary">바닥온도</div>
      </v-card>
    </v-layout>
    <v-divider class='my-3'></v-divider>
    <v-layout row wrap>
      <v-flex
          text-xs-left
        >
        <v-row justify="center">
          <v-col
            v-for='room in roomStat'
            :key='room'
            cols="auto"
            class='ma-1 pa-0'
          >
            <div v-if='room.usRoomNo === 201 || room.usRoomNo === 301 || room.usRoomNo === 501 || room.usRoomNo === 601'>
              <v-row justify="center" class='ma-0 pa-0'>
                <v-col class='ma-0 mr-2 pa-0'>
                  <!-- <v-divider class='ma-0 pa-0' color='deep-orange lighten-4' dark vertical></v-divider>
                  <v-divider class='ma-0 pa-0' color='deep-orange lighten-4' dark vertical></v-divider>
                  <v-divider class='ma-0 pa-0' color='deep-orange lighten-4' dark vertical></v-divider>
                  <v-divider class='ma-0 pa-0' color='deep-orange lighten-4' dark vertical></v-divider>
                  <v-divider class='ma-0 pa-0' color='deep-orange lighten-4' dark vertical></v-divider>
                  <v-divider class='ma-0 pa-0' color='deep-orange lighten-4' dark vertical></v-divider> -->
                  <v-card
                    color='light-blue lighten-4'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    height='105px'
                    lg=12
                    md=12
                    sm=3
                    xs=3>
                    <v-card-text class="text-center font-weight-bold display-1 mt-4" >
                      {{(room.usRoomNo+'').substr(0, 1)}}F
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col class='ma-0 pa-0'>
                  <v-card
                    v-if='room.ucCurStatus === 1'
                    color='deep-orange lighten-4'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    lg=12
                    md=12
                    sm=3
                    xs=3
                    @click='openRoomGraph(room.usRoomNo)'>
                    <v-card-text class="text-center">
                      <div class="text--primary mb-1">
                        {{room.usRoomNo}}호
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-chip
                          v-if='room.ucRoomState === 0'
                          class="d-inline-flex ma-0 pa-0"
                          color="blue-grey lighten-4"
                          x-small>공실
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 1'
                          class="d-inline-flex ma-0 pa-0"
                          color="orange lighten-3"
                          x-small>
                          예비
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 3'
                          class="d-inline-flex ma-0 pa-0"
                          color="pink lighten-2"
                          x-small>
                          입실
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 0'
                          class="d-inline-flex ma-0 pa-0"
                          color="light-green accent-2"
                          x-small>
                          자동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 1'
                          class="d-inline-flex ma-0 pa-0"
                          color="blue lighten-3"
                          x-small>
                          수동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 2'
                          class="d-inline-flex ma-0 pa-0"
                          color="blue-grey lighten-4"
                          x-small>
                          정지
                        </v-chip>
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-card
                          class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                          color="blue lighten-4"
                          label="실내온도"
                          x-small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                        </v-card>
                        <v-card
                          class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                          color="light-blue accent-1"
                          label="바닥온도"
                          x-small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTsurf_cur !== 255) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                        </v-card>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if='room.ucCurStatus === 0 || room.ucCurStatus === 2'
                    color='blue-grey lighten-5'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    lg=12
                    md=12
                    sm=3
                    xs=3
                    @click='openRoomGraph(room.usRoomNo)'>
                    <v-card-text class="text-center">
                      <div class="text--primary mb-1">
                        {{room.usRoomNo}}호
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-chip
                          v-if='room.ucRoomState === 0'
                          class="d-inline-flex ma-0 pa-1"
                          color="blue-grey lighten-4"
                          x-small>공실
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 1'
                          class="d-inline-flex ma-0 pa-1"
                          color="orange lighten-3"
                          x-small>
                          예비
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 3'
                          class="d-inline-flex ma-0 pa-1"
                          color="pink lighten-2"
                          x-small>
                          입실
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 0'
                          class="d-inline-flex ma-0 pa-1"
                          color="light-green accent-2"
                          x-small>
                          자동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 1'
                          class="d-inline-flex ma-0 pa-1"
                          color="blue lighten-3"
                          x-small>
                          수동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 2'
                          class="d-inline-flex ma-0 pa-1"
                          color="blue-grey lighten-4"
                          x-small>
                          정지
                        </v-chip>
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-card
                          class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                          color="blue lighten-4"
                          label="실내온도"
                          x-small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                        </v-card>
                        <v-card
                          class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                          color="light-blue accent-1"
                          label="바닥온도"
                          x-small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTsurf_cur !== 255) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                        </v-card>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div v-if='!(room.usRoomNo === 201 || room.usRoomNo === 301 || room.usRoomNo === 501 || room.usRoomNo === 601)'>
              <v-card
                v-if='room.ucCurStatus === 1'
                color='deep-orange lighten-4'
                class='ma-0 pa-0 font-weight-bold'
                outlined
                width='94px'
                lg=12
                md=12
                sm=3
                xs=3
                @click='openRoomGraph(room.usRoomNo)'>
                <v-card-text class="text-center">
                  <div class="text--primary mb-1">
                    {{room.usRoomNo}}호
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-chip
                      v-if='room.ucRoomState === 0'
                      class="d-inline-flex ma-0 pa-1"
                      color="blue-grey lighten-4"
                      x-small>공실
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 1'
                      class="d-inline-flex ma-0 pa-0"
                      color="orange lighten-3"
                      x-small>
                      예비
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 3'
                      class="d-inline-flex ma-0 pa-1"
                      color="pink lighten-2"
                      x-small>
                      입실
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 0'
                      class="d-inline-flex ma-0 pa-1"
                      color="light-green accent-2"
                      x-small>
                      자동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 1'
                      class="d-inline-flex ma-0 pa-1"
                      color="blue lighten-3"
                      x-small>
                      수동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 2'
                      class="d-inline-flex ma-0 pa-1"
                      color="blue-grey lighten-4"
                      x-small>
                      정지
                    </v-chip>
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-card
                      class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                      color="blue lighten-4"
                      label="실내온도"
                      x-small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                    </v-card>
                    <v-card
                      class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                      color="light-blue accent-1"
                      label="바닥온도"
                      x-small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTsurf_cur !== 255) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                    </v-card>
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                v-if='room.ucCurStatus === 0 || room.ucCurStatus === 2'
                color='blue-grey lighten-5'
                class='ma-0 pa-0 font-weight-bold'
                outlined
                width='94px'
                lg=12
                md=12
                sm=3
                xs=3
                @click='openRoomGraph(room.usRoomNo)'>
                <v-card-text class="text-center">
                  <div class="text--primary mb-1">
                    {{room.usRoomNo}}호
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-chip
                      v-if='room.ucRoomState === 0'
                      class="d-inline-flex ma-0 pa-1"
                      color="blue-grey lighten-4"
                      x-small>공실
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 1'
                      class="d-inline-flex ma-0 pa-1"
                      color="orange lighten-3"
                      x-small>
                      예비
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 3'
                      class="d-inline-flex ma-0 pa-1"
                      color="pink lighten-2"
                      x-small>
                      입실
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 0'
                      class="d-inline-flex ma-0 pa-1"
                      color="light-green accent-2"
                      x-small>
                      자동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 1'
                      class="d-inline-flex ma-0 pa-1"
                      color="blue lighten-3"
                      x-small>
                      수동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 2'
                      class="d-inline-flex ma-0 pa-1"
                      color="blue-grey lighten-4"
                      x-small>
                      정지
                    </v-chip>
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-card
                      class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                      color="blue lighten-4"
                      label="실내온도"
                      x-small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                    </v-card>
                    <v-card
                      class="d-inline-flex ma-0 mt-1 pa-0 pl-1 pr-1"
                      color="light-blue accent-1"
                      label="바닥온도"
                      x-small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTsurf_cur !== 255) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                    </v-card>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <v-dialog v-model='roomGraphModal' max-width='1000px'>
      <v-card>
        <v-card-title>
          <span class='headline'>{{roomNo}}호 상태 그래프</span>
        </v-card-title>
        <v-card-text>
          <div>
            <apexchart type="line" :options="chartOptions" :series="series" ></apexchart>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
          <v-btn v-if='roomScheInfo.nIdx === 0' color='indigo lighten-2' flat @click='reserveRoomSche()'>예약</v-btn>
          <v-btn v-if='roomScheInfo.nIdx != 0' color='indigo lighten-2' flat @click='saveReserveRoom(roomScheInfo.nIdx)'>예약수정</v-btn>
          <v-btn v-if='roomScheInfo.nIdx != 0' color='indigo lighten-2' flat @click='cancelReserveRoom(roomScheInfo.nIdx)'>예약취소</v-btn>
          <v-btn color='indigo lighten-2' flat @click='closeReserveRoom()'>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model='settingRoomModal' persistent  max-width='500px'>
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
                  v-model='roomConfigs.RoomNo'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Area'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.Area'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Direction'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.Direction'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='ExteriorWallCnt'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.ExteriorWallCnt'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Troom_set'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.Troom_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Tsurf_set'
                  hint=''
                  persistent-hint
                  required
                  v-model='roomConfigs.Tsurf_set'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Troom_cr'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.Troom_cr'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='Tsurf_set'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.Tsurf_cr'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='CheckInOutEnable'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.CheckInOutEnable'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='CheckInTime'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='trnCheckInTime'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='CheckOutTime'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='trnCheckOutTime'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label='strDesc'
                  hint=''
                  persistent-hint
                  required
                  height=13
                  v-model='roomConfigs.szDesc'
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items='heatingModes'
                  v-model='heatingMode'
                  auto
                  label='usManHeatingMode'
                  hide-details
                  height=13
                  class='pa-0'
                  @change='toggleHeatingMode()'
                ></v-select>
              </v-flex>
              <v-flex xs6>
                보일러 동작 상태 : {{roomStatInfo.ucCurStatus==1?'동작':'정지'}}
              </v-flex>
              <v-flex xs6 v-if='roomStatInfo.usManHeatingMode === 1'>
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
              <v-flex xs6 v-if='roomStatInfo.usManHeatingMode === 1'>
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
              <v-flex xs6 v-if='roomStatInfo.usManHeatingMode === 1'>
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
          <v-btn color='indigo lighten-2' flat @click='cmdRoomState(roomConfigs.RoomNo)'>{{reservedTxt}}</v-btn>
          <v-btn v-if='roomStatInfo.usManHeatingMode === 1' color='indigo lighten-2' flat @click='cmdManualHeating(roomConfigs.RoomNo)'>{{boilerOnOffTxt}}</v-btn>
          <v-btn color='indigo lighten-2' flat @click='saveSettingRoom(roomConfigs.RoomNo)'>저장</v-btn>
          <v-btn color='indigo lighten-2' flat @click.native='settingRoomModal = false'>닫기</v-btn>
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
                <v-icon x-small>arrow_back_ios</v-icon>
              </v-btn>
              <v-btn fab text small @click='next'>
                <v-icon x-small>arrow_forward_ios</v-icon>
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
                <v-btn color='indigo lighten-2' flat @click.native='roomScheduleModal = false'>닫기</v-btn>
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
  created () {
    this.getRooms()
    this.timer = setInterval(this.getRooms, 10000)
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
        '4day': '4 Days'
      },
      datas: [],
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
      boilerOnOffTxt: '난방시작',
      reservedTxt: '예열시작',
      CurStatus: 0,
      SetStatus: 0,
      roomStat: [],
      roomConfigs: [],
      roomsSchedule: [],
      roomConfig: {
        RoomNo: 0,
        Area: 0,
        Direction: 0,
        ExteriorWallCnt: 0,
        Troom_set: 0,
        Tsurf_set: 0,
        Troom_cr: 0,
        Tsurf_cr: 0,
        CheckInOutEnable: 0,
        CheckInTime: 0,
        CheckOutTime: 0,
        szDesc: ''
      },
      roomStatInfo: {
        usRoomNo: 0,
        Area: 0,
        Direction: 0,
        ExteriorWallCnt: 0,
        szDesc: 0,
        ucRoomState: 0,
        ucTotalStatus: 0,
        ucSetStatus: 0,
        ucCurStatus: 0,
        nCheckInOutEnable: 0,
        nCheckInTime: 0,
        nCheckOutTime: 0,
        fTset: 0,
        fTsurf_set: 0,
        fTsurf_cur: 0,
        fTroom_set: 0,
        fTroom_cur: 0,
        usManHeatingMode: 0,
        ulManHeatingTimeSec: 0,
        fManTset: 0,
        fManTset_cr: 0,
        nSetLastTime: 0
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
      boilerOn: true,
      type: 'room',
      heatingMode: '자동',
      mouseDowned: false,
      reserveStartDate: '',
      reserveEndDate: '',
      roomNo: 0,
      roomIdx: 0,
      trnCheckInTime: 0,
      trnCheckOutTime: 0,
      series: [],
      chartOptions: [],
      roomGraphModal: false,
      startTime: this.$moment(new Date((new Date().getTime()-(2*24*60*60*1000))).toISOString()).format('YYYY/MM/DD kk:mm'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD kk:mm')
    }
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return new Date().toISOString().substr(0, 4) + '/' + new Date().toISOString().substr(5, 2)
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
        timeZone: 'UTC',
        month: 'long'
      })
    }
  },
  methods: {
    chngNumStr: function (data) {
      return (data < 10 ? '0' + data : data)
    },
    viewDay ({ date }) {
      this.focus = date
      this.calType = 'day'
    },
    mouseDown ({ year, month, day }) {
      this.reserveStartDate = year + '-' + this.chngNumStr(month) + '-' + this.chngNumStr(day) + ' 14:00'
      var isDuple = false
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].roomNo === this.roomNo) {
          if (this.events[i].start <= this.reserveStartDate && this.events[i].end >= this.reserveStartDate) {
            isDuple = true
            break
          }
        }
      }
      if (!isDuple) {
        this.mouseDowned = true
        this.events.push({
          name: '',
          start: this.reserveStartDate,
          color: 'deep-purple'
        })
      }
    },
    mouseUp ({ year, month, day }) {
      this.reserveEndDate = year + '-' + this.chngNumStr(month) + '-' + this.chngNumStr(day) + ' 12:00'
      var isDuple = false
      if (this.mouseDowned) {
        if (this.reserveStartDate.substr(0, 10) === this.reserveEndDate.substr(0, 10)) {
          this.events.pop()
          return
        }
        for (var i = 0; i < this.events.length; i++) {
          if (this.events[i].roomNo === this.roomNo) {
            if (this.events[i].start <= this.reserveEndDate && this.events[i].end >= this.reserveEndDate) {
              isDuple = true
            }
          }
        }
        if (!isDuple) {
          this.reserveRoom(0, null)
        }
      }
      this.mouseDowned = false
    },
    mouseEnter ({ year, month, day }) {
      if (this.mouseDowned) {
        const tempDate = year + '-' + this.chngNumStr(month) + '-' + this.chngNumStr(day) + ' 12:00'
        this.events.pop()
        this.events.push({
          name: '',
          start: this.reserveStartDate,
          end: tempDate,
          color: 'deep-purple'
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
      this.mouseDowned = false
      this.reserveRoom(this.roomIdx, event)
    },
    updateRange ({ start, end }) {
      // alert('updateRange')
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    initRoomStatInfo: function () {
      this.roomStatInfo.usRoomNo = 0
      this.roomStatInfo.Area = 0
      this.roomStatInfo.Direction = 0
      this.roomStatInfo.ExteriorWallCnt = 0
      this.roomStatInfo.szDesc = ''
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
      this.roomScheInfo.nIdx = 0
      this.roomScheInfo.usRoomNo = 0
      this.roomScheInfo.nCheckInOutEnbale = 0
      this.roomScheInfo.strCheckInTime = ''
      this.roomScheInfo.nCheckInTime = 0
      this.roomScheInfo.strCheckOutTime = ''
      this.roomScheInfo.nCheckOutTime = 0
      this.roomScheInfo.szSubsName = ''
      this.roomScheInfo.szSubsTel = ''
      this.roomScheInfo.tReserveDate = ''
      this.roomScheInfo.ucPeopleCnt = 0
      this.roomScheInfo.szDesc = ''
      this.strCheckInTime = '14:00'
      this.strCheckOutTime = '12:00'
      this.autoCheckIn = true
    },
    getRoomScheInfo: function (idx) {
      this.getRoomConfig(this.usRoomNo)
      if (idx === 0) {
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
      } else {
        this.roomTitle = '객실 예약 정보'
        for (var i = 0; i < this.roomsSchedule.length; i++) {
          if (this.roomsSchedule[i].nIdx === idx) {
            this.roomScheInfo.nIdx = this.roomsSchedule[i].nIdx
            this.roomScheInfo.usRoomNo = this.roomsSchedule[i].usRoomNo
            this.roomScheInfo.nCheckInOutEnbale = this.roomsSchedule[i].nCheckInOutEnbale
            this.autoCheckIn = true
            this.roomScheInfo.nCheckInTime = this.roomsSchedule[i].nCheckInTimee
            this.roomScheInfo.strCheckInTime = this.$moment(new Date(this.roomsSchedule[i].nCheckInTime * 1000).toISOString()).format('MM/DD/HH')
            this.startDate = this.roomScheInfo.strCheckInTime.substr(0, 10)
            this.strCheckInTime = this.roomScheInfo.strCheckInTime.substr(10, 6)
            if (this.strCheckInTime.trim() !== '14:00'.trim()) {
              this.autoCheckIn = false
            }
            this.roomScheInfo.nCheckOutTime = this.roomsSchedule[i].nCheckOutTime
            this.roomScheInfo.strCheckOutTime = this.$moment(new Date(this.roomsSchedule[i].nCheckOutTime * 1000).toISOString()).format('MM/DD/HH')
            this.endDate = this.roomScheInfo.strCheckOutTime.substr(0, 10)
            this.strCheckOutTime = this.roomScheInfo.strCheckOutTime.substr(10, 6)
            if ((!this.autoCheckIn) || this.strCheckOutTime.trim() !== '12:00') {
              this.autoCheckIn = false
            }
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
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}rooms`)
        .then((r) => {
          this.roomStat = r.data
          this.CurStatus = 0
          this.SetStatus = 0
          for (var i = 0; i < this.roomStat.length; i++) {
            this.CurStatus = this.CurStatus + ((this.roomStat[i].ucCurStatus === 1) ? 1 : 0)
            this.SetStatus = this.SetStatus + ((this.roomStat[i].ucSetStatus === 1) ? 1 : 0)
          }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    reserveRoom: function (idx, event) {
      if (event === null) {
        this.events.pop()
      }
      this.initRoomScheInfo()
      this.getRoomScheInfo(idx)
      this.$data.rsvRoomModal = true
    },
    scheduleRoom: function (usRoomNo) {
      this.today = new Date().toISOString().substr(0, 10)
      this.focus = new Date().toISOString().substr(0, 10)
      this.calType = 'month'
      this.roomNo = usRoomNo
      this.events = []
      // axios.get(`http://localhost:3000/api/rooms/${usRoomNo}`)
      axios.get(`${this.$apiRootPath}rooms/${usRoomNo}`)
        .then((r) => {
          this.roomsSchedule = r.data
          // alert(JSON.stringify(this.roomsSchedule))
          for (var i = 0; i < this.roomsSchedule.length; i++) {
            var strCheckInTime = this.$moment(new Date(this.roomsSchedule[i].nCheckInTime * 1000).toISOString()).format('MM/DD/HH')
            var strCheckOutTime = this.$moment(new Date(this.roomsSchedule[i].nCheckOutTime * 1000).toISOString()).format('MM/DD/HH')
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
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
      this.$data.roomScheduleModal = true
    },
    getRoomConfig: function (roomNo) {
      // axios.get(`http://localhost:3000/api/rooms/getRoomConfig/${roomNo}`)
      axios.get(`${this.$apiRootPath}rooms/getRoomConfig/${roomNo}`)
        .then((r) => {
          this.roomConfigs = JSON.parse(r.data)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    settingRoom: function (roomNo) {
      // axios.get(`http://localhost:3000/api/rooms/getRoomConfig/${roomNo}`)
      axios.get(`${this.$apiRootPath}rooms/getRoomConfig/${roomNo}`)
        .then((r) => {
          this.roomConfigs = JSON.parse(r.data)
          if (this.roomConfigs.CheckInTime !== '0') {
            this.trnCheckInTime = this.$moment(new Date(this.roomConfigs.CheckInTime * 1000).toISOString()).format('MM/DD/HH')
          } else {
            this.trnCheckInTime = 0
          }
          if (this.roomConfigs.CheckOutTime !== '0') {
            this.trnCheckOutTime = this.$moment(new Date(this.roomConfigs.CheckOutTime * 1000).toISOString()).format('MM/DD/HH')
          } else {
            this.trnCheckOutTime = 0
          }
          this.roomStatInfo.Area = this.roomConfigs.Area
          this.roomStatInfo.Direction = this.roomConfigs.Direction
          this.roomStatInfo.ExteriorWallCnt = this.roomConfigs.ExteriorWallCnt
          this.roomStatInfo.szDesc = this.roomConfigs.szDesc
          for (var i = 0; i < this.roomStat.length; i++) {
            if (this.roomStat[i].roomNo === roomNo) {
              this.roomStatInfo.usRoomNo = this.roomStat[i].usRoomNo
              this.roomStatInfo.ucRoomState = this.roomStat[i].ucRoomState
              this.roomStatInfo.ucTotalStatus = this.roomStat[i].ucTotalStatus
              this.roomStatInfo.ucSetStatus = this.roomStat[i].ucSetStatus
              this.roomStatInfo.ucCurStatus = this.roomStat[i].ucCurStatus
              this.boilerOnOffTxt = this.roomStatInfo.ucCurStatus === 1 ? '난방정지' : '난방시작'
              this.roomStatInfo.nCheckInOutEnable = this.roomStat[i].nCheckInOutEnable
              this.roomStatInfo.nCheckInTime = this.roomStat[i].nCheckInTime
              this.roomStatInfo.nCheckOutTime = this.roomStat[i].nCheckOutTime
              this.roomStatInfo.fTset = this.roomStat[i].fTset
              this.roomStatInfo.fTsurf_set = this.roomStat[i].fTsurf_set
              this.roomStatInfo.fTsurf_cur = this.roomStat[i].fTsurf_cur
              this.roomStatInfo.fTroom_set = this.roomStat[i].fTroom_set
              this.roomStatInfo.fTroom_cur = this.roomStat[i].fTroom_cur
              this.roomStatInfo.usManHeatingMode = this.roomStat[i].usManHeatingMode
              this.heatingMode = (this.roomStatInfo.usManHeatingMode === 0) ? '자동' : '수동'
              this.toggleHeatingMode()
              this.roomStatInfo.ulManHeatingTimeSec = this.roomStat[i].ulManHeatingTimeSec
              this.roomStatInfo.fManTset = this.roomStat[i].fManTset
              this.roomStatInfo.fManTset_cr = this.roomStat[i].fManTset_cr
              this.roomStatInfo.nSetLastTime = this.roomStat[i].nSetLastTime
              break
            }
          }
          this.$data.settingRoomModal = true
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    reserveRoomSche: function () {
      this.type = 'roomSche'
      this.roomScheInfo.strCheckInTime = this.startDate + this.strCheckInTime
      this.roomScheInfo.strCheckOutTime = this.endDate + this.strCheckOutTime
      var nCheckInTime = Math.round((new Date(this.roomScheInfo.strCheckInTime).getTime() + (9 * 3600 * 1000)) / 1000)
      var nCheckOutTime = Math.round((new Date(this.roomScheInfo.strCheckOutTime).getTime() + (9 * 3600 * 1000)) / 1000)

      // axios.post(`http://localhost:3000/api/rooms/`, {
      axios.post(`${this.$apiRootPath}rooms/`, {
        usRoomNo: this.roomScheInfo.usRoomNo,
        nCheckInOutEnable: 1,
        nCheckInTime: nCheckInTime,
        nCheckOutTime: nCheckOutTime,
        szSubsName: this.roomScheInfo.szSubsName,
        szSubsTel: this.roomScheInfo.szSubsTel,
        tReserveDate: null,
        ucPeopleCnt: this.roomScheInfo.ucPeopleCnt,
        szDesc: this.roomScheInfo.szDesc,
        Area: this.roomConfigs.Area,
        Direction: this.roomConfigs.Direction,
        ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
        Troom_set: this.roomConfigs.Troom_set,
        Tsurf_set: this.roomConfigs.Tsurf_set,
        Troom_cr: this.roomConfigs.Troom_cr,
        Tsurf_cr: this.roomConfigs.Tsurf_cr
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
      var nCheckInTime = Math.round((new Date(this.roomScheInfo.strCheckInTime).getTime() + (9 * 3600 * 1000)) / 1000)
      var nCheckOutTime = Math.round((new Date(this.roomScheInfo.strCheckOutTime).getTime() + (9 * 3600 * 1000)) / 1000)
      // axios.put(`http://localhost:3000/api/rooms/${this.type}`, {
      axios.put(`${this.$apiRootPath}rooms/${this.type}`, {
        nIdx: idx,
        usRoomNo: this.roomScheInfo.usRoomNo,
        nCheckInOutEnable: 1,
        nCheckInTime: nCheckInTime,
        nCheckOutTime: nCheckOutTime,
        szSubsName: this.roomScheInfo.szSubsName,
        szSubsTel: this.roomScheInfo.szSubsTel,
        tReserveDate: null,
        ucPeopleCnt: this.roomScheInfo.ucPeopleCnt,
        szDesc: this.roomScheInfo.szDesc,
        Area: this.roomConfigs.Area,
        Direction: this.roomConfigs.Direction,
        ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
        Troom_set: this.roomConfigs.Troom_set,
        Tsurf_set: this.roomConfigs.Tsurf_set,
        Troom_cr: this.roomConfigs.Troom_cr,
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
      // axios.delete(`http://localhost:3000/api/rooms/`, { data: { nIdx: nIdx, usRoomNo: this.roomScheInfo.usRoomNo } })
      axios.delete(`${this.$apiRootPath}rooms/`, { data: { nIdx: nIdx, usRoomNo: this.roomScheInfo.usRoomNo } })
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
    saveSettingRoom: function (roomNo) {
      var nCheckInTime = (this.trnCheckInTime !== '0') ? Math.round((new Date(this.trnCheckInTime).getTime() + (9 * 3600)) / 1000) : this.trnCheckInTime
      var nCheckOutTime = (this.trnCheckOutTime !== '0') ? Math.round((new Date(this.trnCheckOutTime).getTime() + (9 * 3600)) / 1000) : this.trnCheckInTime
      // axios.put(`http://localhost:3000/api/rooms/${'roomStat'}`, {
      axios.put(`${this.$apiRootPath}rooms/${'roomStat'}`, {
        RoomNo: this.roomConfigs.RoomNo,
        Area: this.roomConfigs.Area,
        Direction: this.roomConfigs.Direction,
        ExteriorWallCnt: this.roomConfigs.ExteriorWallCnt,
        Troom_set: this.roomConfigs.Troom_set,
        Tsurf_set: this.roomConfigs.Tsurf_set,
        Troom_cr: this.roomConfigs.Troom_cr,
        Tsurf_cr: this.roomConfigs.Tsurf_cr,
        CheckInOutEnable: this.roomConfigs.CheckInOutEnable,
        CheckInTime: nCheckInTime,
        CheckOutTime: nCheckOutTime,
        szDesc: this.roomConfigs.szDesc,
        HeatingMode: this.roomStatInfo.usManHeatingMode,
        HeatingTimeSec: this.roomStatInfo.ulManHeatingTimeSec,
        Tset: this.roomStatInfo.fManTset,
        Tset_cr: this.roomStatInfo.fManTset_cr
      })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.settingRoom(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    cmdManualHeating: function (roomNo) {
      // alert('cmdManualHeating usManHeatingMode : ' + this.roomStatInfo.usManHeatingMode + ', '+((this.roomStatInfo.usManHeatingMode === 1) ? 2 : 1))
      // axios.put(`http://localhost:3000/api/rooms/cmdManualHeating`, {
      axios.put(`${this.$apiRootPath}rooms/cmdManualHeating`, {
        RoomNo: roomNo,
        HeatingMode: (this.roomStatInfo.ucCurStatus === 1) ? 2 : 1,
        HeatingTimeSec: this.roomStatInfo.ulManHeatingTimeSec,
        Tset: this.roomStatInfo.fManTset,
        Tset_cr: this.roomStatInfo.fManTset_cr
      })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.settingRoom(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    cmdRoomState: function (roomNo) {
      // axios.put(`http://localhost:3000/api/rooms/cmdRoomState/${roomNo}`)
      axios.put(`${this.$apiRootPath}rooms/cmdRoomState/${roomNo}`)
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getRooms()
          this.settingRoom(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    openRoomGraph: function (roomNo) {
      this.roomNo = roomNo
      axios.put(`${this.$apiRootPath}rooms/roomSummaryTrend`, { usRoomNo: roomNo, startTime: this.startTime, endTime: this.endTime, time: 600 })
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            data0.push(this.datas[i].ucCurStatus)
            if (this.datas[i].fTsurf_cur < 100) {
              data1.push(this.datas[i].fTsurf_cur.toFixed(2))
            } else {
              data1.push(-1)
            }
            // data1.push(this.datas[i].fTsurf_cur.toFixed(2))
            if (this.datas[i].fTroom_cur < 100) {
              data2.push(this.datas[i].fTroom_cur.toFixed(2))
            } else {
              data2.push(-1)
            }
            date.push(new Date((this.datas[i].m * 600 + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series = [
            {
              name: '난방가동상태',
              data: data0
            },
            {
              name: '바닥온도',
              data: data1
            },
            {
              name: '실내온도',
              data: data2
            }
          ]
          this.chartOptions = {
            chart: {
                height: 350,
                width: '100%',
                markers: {
                  size: 6
                }
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                //format: 'yy/MM/dd HH:mm',
                formatter: function(value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
            // yaxis: {
            //   max:50
            // }
          }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
        this.roomGraphModal = true
    },
    toggleAutoCheckIn: function () {
    },
    toggleBoilerOn: function () {
    },
    toggleHeatingMode: function () {
      if (this.heatingMode === '자동') this.roomStatInfo.usManHeatingMode = 0
      else this.roomStatInfo.usManHeatingMode = 1
    }
  }
}
</script>
