<template>
  <v-container grid-list-md>
    <v-divider class='my-3 mt-0'></v-divider>
      <div class="text--primary ma-0">
      난방(보일러 on) : {{this.SetStatus}}({{this.CurStatus}})
      </div>
    <v-divider class='my-3 mt-0'></v-divider>
    <v-layout row wrap >
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="blue-grey lighten-4"
        small>공실
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;공실&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="orange lighten-3"
        small>
        예비
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;예비난방&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="pink lighten-2"
        small
      >
        재실
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;재실&nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="light-green accent-2"
        small
      >
        자동
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;난방모드 자동&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="indigo lighten-2"
        small
      >
        수동
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;난방모드 수동&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="blue-grey lighten-4"
        small
      >
        정지
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;난방모드 정지 &nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 ml-1 pa-1 font-weight-bold"
        color="deep-orange lighten-4"
        small
      >
        &nbsp;
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;보일러 가동&nbsp;
      </div>
      <v-chip
        class="d-inline-flex ma-0 mr-1 ml-1 pa-1 font-weight-bold"
        color="blue-grey lighten-5"
        small
      >
        &nbsp;
      </v-chip>
      <div class="text--primary">
         &nbsp;:&nbsp;보일러 중지&nbsp;|&nbsp;&nbsp;
      </div>
      <v-card
        class="d-inline-flex ma-0 pa-0 font-weight-bold"
        color="blue lighten-4"
        outlined
      >
        <div class="text--primary">실내온도</div>
      </v-card>
      &nbsp;
      <v-card
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="brown lighten-4"
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
        <v-row justify="left">
          <v-col
            v-for='room in roomsStats'
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
                    height='118px'
                    lg=12
                    md=12
                    sm=3
                    xs=3>
                    <v-card-text class="text-center font-weight-bold display-1 mt-6" >
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
                    xs=3>
                    <v-card-text class="text-center">
                      <div class="text--primary font-weight-bold title mb-1"
                      style="cursor: pointer"
                      @mousedown.left='openRoomGraph(room.usRoomNo)'
                      @mousedown.right='openRoomStat(room.usRoomNo, room.ucCurStatus)'
                      @contextmenu.prevent="handler">
                        {{room.usRoomNo}}호
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-chip
                          v-if='room.ucRoomState === 0'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="blue-grey lighten-4"
                          small>공실
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 1'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="orange lighten-3"
                          small>
                          예비
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 2'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="pink lighten-2"
                          small>
                          재실
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 0'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="light-green accent-2"
                          small>
                          자동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 1'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="blue lighten-3"
                          small>
                          수동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 2'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="blue-grey lighten-4"
                          small>
                          정지
                        </v-chip>
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-card
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="blue lighten-4"
                          label="실내온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                        </v-card>
                        <v-card
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="brown lighten-4"
                          label="바닥온도"
                          small>
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
                    xs=3>
                    <v-card-text class="text-center">
                      <div class="text--primary font-weight-bold title mb-1"
                      style="cursor: pointer"
                      @mousedown.left='openRoomGraph(room.usRoomNo)'
                      @mousedown.right='openRoomStat(room.usRoomNo, room.ucCurStatus)'
                      @contextmenu.prevent="handler">
                        {{room.usRoomNo}}호
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-chip
                          v-if='room.ucRoomState === 0'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="blue-grey lighten-4"
                          small>공실
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 1'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="orange lighten-3"
                          small>
                          예비
                        </v-chip>
                        <v-chip
                          v-if='room.ucRoomState === 2'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="pink lighten-2"
                          small>
                          재실
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 0'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="light-green accent-2"
                          small>
                          자동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 1'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="blue lighten-3"
                          small>
                          수동
                        </v-chip>
                        <v-chip
                          v-if='room.usManHeatingMode === 2'
                          class="d-inline-flex ma-0 mr-1 pa-0"
                          color="blue-grey lighten-4"
                          small>
                          정지
                        </v-chip>
                      </div>
                      <div class="text-center ma-0 pa-0">
                        <v-card
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="blue lighten-4"
                          label="실내온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                        </v-card>
                        <v-card
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="brown lighten-4"
                          label="바닥온도"
                          small>
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
                xs=3>
                <v-card-text class="text-center">
                  <div class="text--primary font-weight-bold title mb-1"
                  style="cursor: pointer"
                  @mousedown.left='openRoomGraph(room.usRoomNo)'
                  @mousedown.right='openRoomStat(room.usRoomNo, room.ucCurStatus)'
                  @contextmenu.prevent="handler">
                    {{room.usRoomNo}}호
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-chip
                      v-if='room.ucRoomState === 0'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="blue-grey lighten-4"
                      small>공실
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 1'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="orange lighten-3"
                      small>
                      예비
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 2'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="pink lighten-2"
                      small>
                      재실
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 0'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="light-green accent-2"
                      small>
                      자동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 1'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="blue lighten-3"
                      small>
                      수동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 2'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="blue-grey lighten-4"
                      small>
                      정지
                    </v-chip>
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-card
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="blue lighten-4"
                      label="실내온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                    </v-card>
                    <v-card
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="brown lighten-4"
                      label="바닥온도"
                      small>
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
                xs=3>
                <v-card-text class="text-center">
                  <div class="text--primary font-weight-bold title mb-1"
                  style="cursor: pointer"
                  @mousedown.left='openRoomGraph(room.usRoomNo)'
                  @mousedown.right='openRoomStat(room.usRoomNo, room.ucCurStatus)'
                  @contextmenu.prevent="handler">
                    {{room.usRoomNo}}호
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-chip
                      v-if='room.ucRoomState === 0'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="blue-grey lighten-4"
                      small>공실
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 1'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="orange lighten-3"
                      small>
                      예비
                    </v-chip>
                    <v-chip
                      v-if='room.ucRoomState === 2'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="pink lighten-2"
                      small>
                      재실
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 0'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="light-green accent-2"
                      small>
                      자동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 1'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="blue lighten-3"
                      small>
                      수동
                    </v-chip>
                    <v-chip
                      v-if='room.usManHeatingMode === 2'
                      class="d-inline-flex ma-0 mr-1 pa-0"
                      color="blue-grey lighten-4"
                      small>
                      정지
                    </v-chip>
                  </div>
                  <div class="text-center ma-0 pa-0">
                    <v-card
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="blue lighten-4"
                      label="실내온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(room.fTroom_cur !== 255) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}</div>
                    </v-card>
                    <v-card
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="brown lighten-4"
                      label="바닥온도"
                      small>
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
    <v-dialog v-model='roomGraphModal' persistent>
      <v-card>
        <v-toolbar dark icons-and-text>
          <span class='headline'>{{roomNo}}호 상태 그래프</span>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="roomGraphModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <div>
            <br>
            <v-row>
              <br>
              <v-col class="d-flex" sm="2">
                <br>
                <v-select
                  v-model="time.value"
                  :items="this.times"
                  item-value="value"
                  item-text="name"
                  label='시간단위'
                  class='ma-0 mt-1 pa-0 grey--text caption'
                ></v-select>
              </v-col>
              <v-col class="d-flex" sm="3">
                <v-text-field label='시작일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='startTime'></v-text-field>
              </v-col>
              <v-col class="d-flex" sm="3">
                <v-text-field label='종료일' class='ma-0 mt-1 pa-0 grey--text caption' v-model='endTime'></v-text-field>
              </v-col>
              <v-col class="d-flex" sm="1">
                <v-btn @click="openRoomGraph(this.roomNo)">
                  <span>검색</span>
                </v-btn>
              </v-col>
            </v-row>
            <div id="wrapper">
              <div id="chart-line">
                <apexchart type=line height=400 :options="chartOptionsLine1" :series="series1" />
              </div>
              <div id="chart-line2">
                <apexchart type=line height=160 :options="chartOptionsLine2" :series="series2" />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model='settingRoomModal' persistent>
      <v-card>
        <v-toolbar dark icons-and-text>
          <v-toolbar-title>{{roomNo}}호 객실 설정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="settingRoomModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <div>
            <br>
              <v-row>
                <v-col>
                  <v-card
                    class="mx-auto"
                    max-width="200"
                  >
                    <v-list
                      shaped
                      class="overflow-y-auto">
                      <v-list-item>
                        <v-list-item-title>난방모드:</v-list-item-title>
                        <v-list-item-title>
                          <v-select
                            v-model="roomStat.HeatingMode"
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
                          v-if="this.roomStat.HeatingMode === 0"
                          v-model="roomStat.RoomState"
                          :items="this.roomStats"
                          item-value="value"
                          item-text="name"
                          hide-details
                          class="text-sm-left pa-0"
                        ></v-select>
                        <v-select
                          v-if="this.roomStat.HeatingMode !== 0"
                          disabled
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
                          v-if="this.roomStat.HeatingMode === 0"
                          v-model="roomStat.ReservedRoomType"
                          :items="this.roomResevedType"
                          item-value="value"
                          item-text="name"
                          hide-details
                          height=12
                          class="text-sm-left pa-0"
                        ></v-select>
                        <v-select
                          v-if="this.roomStat.HeatingMode !== 0"
                          disabled
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
                      <v-list-item-title>예상 재실시간:</v-list-item-title>
                      <v-list-item-title>
                        <v-text-field v-if="this.roomStat.HeatingMode === 0" height=13 v-model="roomStat.ReservedRoomHour"></v-text-field>
                        <v-text-field v-if="this.roomStat.HeatingMode !== 0" disabled height=13 v-model="roomStat.ReservedRoomHour"></v-text-field>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>바닥온도:</v-list-item-title>
                      <v-list-item-title class="align-end">
                        <v-row>
                          <v-col>
                            <v-text-field v-if="this.roomStat.HeatingMode === 0" height=13 :rules="rules" label="설정온도" v-model="roomStat.Tsurf_set"></v-text-field>
                            <v-text-field v-if="this.roomStat.HeatingMode !== 0" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.Tsurf_set"></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field v-if="this.roomStat.HeatingMode === 0" height=13 :rules="rules" label="제어범위" v-model="roomStat.Tsurf_cr"></v-text-field>
                            <v-text-field v-if="this.roomStat.HeatingMode !== 0" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.Tsurf_cr"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>객실온도:</v-list-item-title>
                      <v-list-item-title class="align-end">
                        <v-row>
                          <v-col>
                            <v-text-field v-if="this.roomStat.HeatingMode === 0" height=13 :rules="rules" label="설정온도" v-model="roomStat.Troom_set"></v-text-field>
                            <v-text-field v-if="this.roomStat.HeatingMode !== 0" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.Troom_set"></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field v-if="this.roomStat.HeatingMode === 0" height=13 :rules="rules" label="제어범위" v-model="roomStat.Troom_cr"></v-text-field>
                            <v-text-field v-if="this.roomStat.HeatingMode !== 0" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.Troom_cr"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <v-col>
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
                          v-if="this.roomStat.HeatingMode === 1"
                          v-model="roomStat.MH_SchedulerUsed"
                          :items="this.roomScheduleUsed"
                          item-value="value"
                          item-text="name"
                          hide-details
                          class="text-sm-left pa-0"
                        ></v-select>
                        <v-select
                          v-if="this.roomStat.HeatingMode !== 1"
                          disabled
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
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="시간" v-model="this.trnMH_HeatingTimeHour"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="시간" v-model="this.trnMH_HeatingTimeHour"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="분" v-model="this.trnMH_HeatingTimeMin"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="분" v-model="this.trnMH_HeatingTimeMin"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>난방 휴지 시간:</v-list-item-title>
                    <v-list-item-title class="align-end">
                      <v-row>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="시간" v-model="this.trnMH_HeatingStopTimeHour"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="시간" v-model="this.trnMH_HeatingStopTimeHour"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="분" v-model="this.trnMH_HeatingStopTimeMin"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="분" v-model="this.trnMH_HeatingStopTimeMin"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>난방 시작 시간:</v-list-item-title>
                    <v-list-item-title class="align-end">
                      <v-row>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="시" v-model="this.trnMH_TodayStartTimeHour"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="시" v-model="this.trnMH_TodayStartTimeHour"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="분" v-model="this.trnMH_TodayStartTimeMin"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="분" v-model="this.trnMH_TodayStartTimeMin"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>전체 난방 시간:</v-list-item-title>
                    <v-list-item-title class="align-end">
                      <v-row>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="시간" v-model="this.trnMH_TotalHeatingTimeHour"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="시간" v-model="this.trnMH_TotalHeatingTimeHour"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="분" v-model="this.trnMH_TotalHeatingTimeMin"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="분" v-model="this.trnMH_TotalHeatingTimeMin"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥온도:</v-list-item-title>
                    <v-list-item-title class="align-end">
                      <v-row>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Tsurf_set"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Tsurf_set"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Tsurf_cr"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Tsurf_cr"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>객실온도:</v-list-item-title>
                    <v-list-item-title class="align-end">
                      <v-row>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Troom_set"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Troom_set"></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-if="this.roomStat.HeatingMode === 1" height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Troom_cr"></v-text-field>
                          <v-text-field v-if="this.roomStat.HeatingMode !== 1" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Troom_cr"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item>
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
                    <v-list-item-title>바닥 온도:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.Tsurf_cur}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>보일러 상태:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomCurStat}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>객실온도 온도:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.Troom_cur}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥온도상승/시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.Tsurf_inc}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥온도하강/시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.Tsurf_dec}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>객실온도상승/시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.Troom_dec}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>객실온도하강/시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.Troom_dec}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>난방소요시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{this.trnOptimalNeedTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>사전난방 시작시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{this.trnPreHeatingStartTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>수동난방 시작시간</v-list-item-title>
                    <v-list-item-title class="align-end">{{this.trnMH_StartTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>수동난방 종료시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{this.trnMH_EndTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>수동난방 남은시간:</v-list-item-title>
                    <v-list-item-title class="align-end">{{this.trnMH_HeatingLeftTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>난방 옵션:</v-list-item-title>
                    <v-list-item-title class="align-end">{{roomStat.PreHeatingOption}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='blue darken-1' flat @click='saveRoomStat()'>저장</v-btn>
                <v-btn color='blue darken-1' flat @click='closeRoomStat()'>취소</v-btn>
              </v-card-actions>
            </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
Apex = {
  animations: { enabled: false },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    width: 3,
    //dashArray: [0,10],
  },
  toolbar: {
    tools: {
      selection: false
    }
  },
  grid: {
    clipMarkers: false
  },
  yaxis: {
    tickAmount: 3
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  xaxis: {
    type: 'datetime'
  }
}
export default {
  created () {
    this.getRooms()
    this.timer = setInterval(this.getRooms, 10000)
  },
  data () {
    return {
      timer: null,
      datas: [],
      CurStatus: 0,
      SetStatus: 0,
      roomsStats: [],
      roomNos: [],
      roomNo: 0,
      series1: [],
      chartOptionsLine1: [],
      series2: [],
      chartOptionsLine2: [],
      roomGraphModal: false,
      settingRoomModal: false,
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }],
      startTime: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY/MM/DD kk:mm'),
      endTime: this.$moment(new Date().toISOString()).format('YYYY/MM/DD kk:mm'),
      bePriShow: false,
      beAll: false,
      settingTitle: '',
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
      roomStats: [ { name: '공실', value: 0 }, { name: '예비', value: 1 }, { name: '재실', value: 2 }
      ],
      roomHeatingModes: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      heatingModes: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      roomHeatings: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      heatings: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      roomResevedType: [ { name: '상시', value: 0 }, { name: '매일', value: 1 }, { name: '오늘', value: 2 }, { name: '내일', value: 3 }, { name: '모레', value: 4 } ],
      roomCurStat: '보일러 OFF',
    }
  },
  methods: {
    getRooms () {
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}rooms`)
        .then((r) => {
          this.roomsStats = r.data
          this.CurStatus = 0
          this.SetStatus = 0
          for (var i = 0; i < this.roomsStats.length; i++) {
            this.CurStatus = this.CurStatus + ((this.roomsStats[i].ucCurStatus === 1) ? 1 : 0)
            this.SetStatus = this.SetStatus + ((this.roomsStats[i].ucSetStatus === 1) ? 1 : 0)
            this.roomNos.push(this.roomsStats[i].usRoomNo)
          }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    openRoomGraph: function (roomNo) {
      this.roomNo = roomNo
      axios.put(`${this.$apiRootPath}rooms/getRoomTrend`, { usRoomNo: roomNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var date = []
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push((this.datas[i].ucRoomState * 5).toFixed(2))
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push((this.datas[i].ucSetStatus * 5).toFixed(2))
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push((this.datas[i].ucCurStatus * 5).toFixed(2))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].fTset !== null && this.datas[i].fTset < 50) {
              data3.push((this.datas[i].fTset).toFixed(2))
            } else {
              data3.push(-1)
            }
            if (this.datas[i].fTsurf_cur !== null && this.datas[i].fTsurf_cur < 50) {
              data4.push((this.datas[i].fTsurf_cur).toFixed(2))
            } else {
              data4.push(-1)
            }
            if (this.datas[i].fTroom_cur !== null && this.datas[i].fTroom_cur < 50) {
              data5.push((this.datas[i].fTroom_cur).toFixed(2))
            } else {
              data5.push(-1)
            }
            // if(i === 0) alert(new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(0, 10) + ' ' + new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(11, 5))
            // date.push(new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(0, 10) + ' ' + new Date(this.datas[i].m * this.time.value * 1000).toISOString().substr(11, 5) )
            date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
          }
          this.series1 = [
            {
              name: '설정온도',
              data: data3
            },
            {
              name: '현재바닥온도',
              data: data4
            },
            {
              name: '현재실내온도',
              data: data5
            }
          ]
          this.series2 = [
            {
              name: '방상태',
              data: data0
            },
            {
              name: '난방설정상태',
              data: data1
            },
            {
              name: '난방가동상태',
              data: data2
            }
          ]
          this.chartOptionsLine1 = {
            chart: {
              id: 'fb',
              group: 'social'
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            chart: {
              id: 'tw',
              group: 'social'
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, 5))
                }
              }
            }
          }
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
      this.roomGraphModal = true
    },
    closeRoomStat: function () {
      this.settingRoomModal = false
    },
    openRoomStat: function (roomNo, roomCurStat) {
      this.roomNo = roomNo
      this.roomCurStat = (roomCurStat === 1) ? '보일러 ON' : '보일러 OFF'
      axios.get(`${this.$apiRootPath}rooms/roomPriority`)
        .then((r) => {
          this.roomPris = JSON.parse(r.data)
          var prio
          var i = 1
          this.items = []
          for (var key in this.roomPris.tPriority) {
            if (this.roomPris.tPriority.hasOwnProperty(key)) {
              prio = (this.roomPris.tPriority[key].Priority !== 0) ? this.roomPris.tPriority[key].Priority : i
              this.items.push({ RoomNo: this.roomPris.tPriority[key].RoomNo, Priority: prio, Reserved: this.roomPris.tPriority[key].Reserved, beChecked: (this.roomPris.tPriority[key].RoomNo === this.roomNo) })
              i++
            }
          }
          this.refresItems()
          this.getRoomStat(this.roomNo)
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
              this.items.push({ RoomNo: this.roomPris.tPriority[key].RoomNo, Priority: prio, Reserved: this.roomPris.tPriority[key].Reserved, beChecked: (this.roomPris.tPriority[key].RoomNo === this.roomNo) })
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
          // alert(JSON.stringify(this.roomStat))
          this.roomStat.Tsurf_set = this.roomStat.Tsurf_set.toFixed(1)
          this.roomStat.Tsurf_cr = this.roomStat.Tsurf_cr.toFixed(1)
          this.roomStat.Troom_set = this.roomStat.Troom_set.toFixed(1)
          this.roomStat.Troom_cr = this.roomStat.Troom_cr.toFixed(1)
          this.roomStat.MH_Tsurf_set = this.roomStat.MH_Tsurf_set.toFixed(1)
          this.roomStat.MH_Tsurf_cr = this.roomStat.MH_Tsurf_cr.toFixed(1)
          this.roomStat.MH_Troom_set = this.roomStat.MH_Troom_set.toFixed(1)
          this.roomStat.MH_Troom_cr = this.roomStat.MH_Troom_cr.toFixed(1)
          this.roomStat.Tsurf_inc = this.roomStat.Tsurf_inc.toFixed(1)
          this.roomStat.Tsurf_dec = this.roomStat.Tsurf_dec.toFixed(1)
          this.roomStat.Troom_inc = this.roomStat.Troom_inc.toFixed(1)
          this.roomStat.Troom_dec = this.roomStat.Troom_dec.toFixed(1)
          this.roomStat.Troom_cur = this.roomStat.Troom_cur.toFixed(1)
          this.roomStat.Tsurf_cur = this.roomStat.Tsurf_cur.toFixed(1)
          this.trnCheckInTime = this.$moment(new Date(this.roomStat.CheckInTime * 1000).toISOString()).format('MM/DD/HH')
          this.trnCheckOutTime = this.$moment(new Date(this.roomStat.CheckOutTime * 1000).toISOString()).format('MM/DD/HH')
          this.trnMH_StartTime = this.roomStat.MH_StartTime !== 0 ? this.$moment(new Date(this.roomStat.MH_StartTime * 1000).toISOString()).format('YYYY/MM/DD kk') : '00/00/00 00'
          this.trnMH_EndTime = this.roomStat.MH_EndTime !== 0 ? this.$moment(new Date(this.roomStat.MH_EndTime * 1000).toISOString()).format('YYYY/MM/DD kk') : '00/00/00 00'
          var hour = parseInt(this.roomStat.MH_HeatingLeftTime / 60 / 60)
          var min = parseInt((this.roomStat.MH_HeatingLeftTime - (hour * 60 * 60)) / 60)
          this.trnMH_HeatingLeftTime = hour + '시간 ' + min + '분'
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
          hour = parseInt(this.roomStat.OptimalNeedTime / 60 / 60)
          min = parseInt((this.roomStat.OptimalNeedTime - (hour * 60 * 60)) / 60)
          this.trnOptimalNeedTime = hour + '시간 ' + min + '분'
          // this.getRoomPriority()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
      this.settingRoomModal = true
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
      axios.put(`${this.$apiRootPath}rooms/roomStat`, { config: this.roomStat, roomNos: roomNos })
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
