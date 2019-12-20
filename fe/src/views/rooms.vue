<template>
  <v-container grid-list-md>
    <v-divider class='my-3 mt-0 mb-3'></v-divider>
      <div class="text--primary" width="1000px">
        <v-row class="ma-0 pa-0">
          <v-col cols="12" sm="4" class="ma-0 pa-0">난방(보일러 on) : {{SetStatus}}({{CurStatus}}) - {{curSchedullerTitle}}</v-col><v-col cols="12" sm="6" class="ma-0 pa-0" >시스템 시간 : {{systemTime}}</v-col>
        </v-row>
      </div>
    <v-divider class='my-3'></v-divider>
    <v-layout row wrap class='ml-0'>
      재실모드(&nbsp;
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="blue-grey lighten-4"
        small>공실
      </v-chip>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="orange lighten-3"
        small>
        예비
      </v-chip>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="pink lighten-2"
        small
      >
        재실
      </v-chip>)&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;난방모드(&nbsp;
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="light-green accent-2"
        small
      >자동
      </v-chip>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="indigo lighten-2"
        small
      >수동
      </v-chip>
      <v-chip
        class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
        color="blue-grey lighten-4"
        small
      >정지
    </v-chip>)&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;보일러상태(&nbsp;
      &nbsp;가동:
      <v-chip
        class="d-inline-flex ma-0 mr-1 ml-1 pa-1 font-weight-bold"
        color="deep-orange lighten-2"
        small
      >&nbsp;
      </v-chip>
      &nbsp;가동준비:
      <v-chip
        class="d-inline-flex ma-0 mr-1 ml-1 pa-1 font-weight-bold"
        color="deep-orange lighten-4"
        small
      >&nbsp;
      </v-chip>
      &nbsp;중지:
      <v-chip
        class="d-inline-flex ma-0 mr-1 ml-1 pa-1 font-weight-bold"
        color="blue-grey lighten-5"
        small
      >&nbsp;
      </v-chip>)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
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
                  <v-card
                    color='light-blue lighten-4'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    height='104px'
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
                    color='deep-orange lighten-2'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    lg=12
                    md=12
                    sm=3
                    xs=3>
                    <v-card-text class="text-center ma-0 mt-1 mb-3 pa-0">
                      <v-menu
                        :value="showMenu"
                        class="ma-0 pa-0"
                      >
                        <template v-slot:activator="{ on }" class="ma-0 pa-0">
                          <div
                            class="text--primary font-weight-bold title mb-1"
                            style="cursor: pointer"
                            v-on="on">
                            <label v-if='((room.ucTotalStatus & 8) !== 0)' style="color: #78909C;cursor: pointer;">{{room.usRoomNo}}호</label>
                            <label v-if='((room.ucTotalStatus & 8) === 0)' style="cursor: pointer;">{{room.usRoomNo}}호</label>
                          </div>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="cursor: pointer" @click="openRoomStat(room.usRoomNo)" >객실난방설정</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="cursor: pointer" @click="openRoomGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-menu>
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
                          color="indigo lighten-2"
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
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                        <v-card
                          v-if='((room.ucTotalStatus & 16) !== 0)'
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="brown lighten-4"
                          label="바닥온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                        <v-card
                          v-if='((room.ucTotalStatus & 16) === 0)'
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="#eeeeee"
                          label="바닥온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if='(room.ucUserSetStatus === 1 && room.ucCurStatus === 0)'
                    color='deep-orange lighten-4'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    lg=12
                    md=12
                    sm=3
                    xs=3>
                    <v-card-text class="text-center ma-0 mt-1 mb-3 pa-0">
                      <v-menu
                        :value="showMenu"
                        class="ma-0 pa-0"
                      >
                        <template v-slot:activator="{ on }" class="ma-0 pa-0">
                          <div
                            class="text--primary font-weight-bold title mb-1"
                            style="cursor: pointer"
                            v-on="on">
                            <label v-if='((room.ucTotalStatus & 8) !== 0)' style="color: #78909C;cursor: pointer;">{{room.usRoomNo}}호</label>
                            <label v-if='((room.ucTotalStatus & 8) === 0)' style="cursor: pointer;">{{room.usRoomNo}}호</label>
                          </div>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="cursor: pointer" @click="openRoomStat(room.usRoomNo)" >객실난방설정</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="cursor: pointer" @click="openRoomGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-menu>
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
                          color="indigo lighten-2"
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
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{(!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                        <v-card
                          v-if='((room.ucTotalStatus & 16) !== 0)'
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="brown lighten-4"
                          label="바닥온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                        <v-card
                          v-if='((room.ucTotalStatus & 16) === 0)'
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="#eeeeee"
                          label="바닥온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if='(!(room.ucUserSetStatus === 1 && room.ucCurStatus === 0) && (room.ucCurStatus === 0 || room.ucCurStatus === 2))'
                    color='blue-grey lighten-5'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    lg=12
                    md=12
                    sm=3
                    xs=3>
                    <v-card-text class="text-center ma-0 mt-1 mb-3 pa-0">
                      <v-menu
                        :value="showMenu"
                        class="ma-0 pa-0"
                      >
                        <template v-slot:activator="{ on }" class="ma-0 pa-0">
                          <div
                            class="text--primary font-weight-bold title mb-1"
                            style="cursor: pointer"
                            v-on="on">
                            <label v-if='((room.ucTotalStatus & 8) !== 0)' style="color: #78909C;cursor: pointer;">{{room.usRoomNo}}호</label>
                            <label v-if='((room.ucTotalStatus & 8) === 0)' style="cursor: pointer;">{{room.usRoomNo}}호</label>
                          </div>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="cursor: pointer" @click="openRoomStat(room.usRoomNo)" >객실난방설정</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="cursor: pointer" @click="openRoomGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-menu>
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
                          color="indigo lighten-2"
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
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTroom_cur === 255 || room.fTroom_cur === -1 ) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                        <v-card
                          v-if='((room.ucTotalStatus & 16) !== 0)'
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="brown lighten-4"
                          label="바닥온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                        </v-card>
                        <v-card
                          v-if='((room.ucTotalStatus & 16) === 0)'
                          class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                          color="#eeeeee"
                          label="바닥온도"
                          small>
                          <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
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
                color='deep-orange lighten-2'
                class='ma-0 pa-0 font-weight-bold'
                outlined
                width='94px'
                lg=12
                md=12
                sm=3
                xs=3>
                <v-card-text class="text-center ma-0 mt-1 mb-3 pa-0">
                  <v-menu
                    :value="showMenu"
                    class="ma-0 pa-0"
                  >
                    <template v-slot:activator="{ on }" class="ma-0 pa-0">
                      <div
                        class="text--primary font-weight-bold title mb-1"
                        style="cursor: pointer"
                        v-on="on">
                        <label v-if='((room.ucTotalStatus & 8) !== 0)' style="color: #78909C;cursor: pointer;">{{room.usRoomNo}}호</label>
                        <label v-if='((room.ucTotalStatus & 8) === 0)' style="cursor: pointer;">{{room.usRoomNo}}호</label>
                      </div>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle style="cursor: pointer" @click="openRoomStat(room.usRoomNo)" >객실난방설정</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle style="cursor: pointer" @click="openRoomGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
                      color="indigo lighten-2"
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
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTroom_cur === 255 || room.fTroom_cur === -1 ) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                    <v-card
                      v-if='((room.ucTotalStatus & 16) !== 0)'
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="brown lighten-4"
                      label="바닥온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                    <v-card
                      v-if='((room.ucTotalStatus & 16) === 0)'
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="#eeeeee"
                      label="바닥온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                v-if='(room.ucUserSetStatus === 1 && room.ucCurStatus === 0)'
                color='deep-orange lighten-4'
                class='ma-0 pa-0 font-weight-bold'
                outlined
                width='94px'
                lg=12
                md=12
                sm=3
                xs=3>
                <v-card-text class="text-center ma-0 mt-1 mb-3 pa-0">
                  <v-menu
                    :value="showMenu"
                    class="ma-0 pa-0"
                  >
                    <template v-slot:activator="{ on }" class="ma-0 pa-0">
                      <div
                        class="text--primary font-weight-bold title mb-1"
                        style="cursor: pointer"
                        v-on="on">
                        <label v-if='((room.ucTotalStatus & 8) !== 0)' style="color: #78909C;cursor: pointer;">{{room.usRoomNo}}호</label>
                        <label v-if='((room.ucTotalStatus & 8) === 0)' style="cursor: pointer;">{{room.usRoomNo}}호</label>
                      </div>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle style="cursor: pointer" @click="openRoomStat(room.usRoomNo)" >객실난방설정</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle style="cursor: pointer" @click="openRoomGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
                      color="indigo lighten-2"
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
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{(!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                    <v-card
                      v-if='((room.ucTotalStatus & 16) !== 0)'
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="brown lighten-4"
                      label="바닥온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                    <v-card
                      v-if='((room.ucTotalStatus & 16) === 0)'
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="#eeeeee"
                      label="바닥온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                  </div>
                </v-card-text>
              </v-card>
              <v-card
                v-if='(!(room.ucUserSetStatus === 1 && room.ucCurStatus === 0) && (room.ucCurStatus === 0 || room.ucCurStatus === 2))'
                color='blue-grey lighten-5'
                class='ma-0 pa-0 font-weight-bold'
                outlined
                width='94px'
                lg=12
                md=12
                sm=3
                xs=3>
                <v-card-text class="text-center ma-0 mt-1 mb-3 pa-0">
                  <v-menu
                    :value="showMenu"
                    class="ma-0 pa-0"
                  >
                    <template v-slot:activator="{ on }" class="ma-0 pa-0">
                      <div
                        class="text--primary font-weight-bold title mb-1"
                        style="cursor: pointer"
                        v-on="on">
                        <label v-if='((room.ucTotalStatus & 8) !== 0)' style="color: #78909C;cursor: pointer;">{{room.usRoomNo}}호</label>
                        <label v-if='((room.ucTotalStatus & 8) === 0)' style="cursor: pointer;">{{room.usRoomNo}}호</label>
                      </div>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle style="cursor: pointer" @click="openRoomStat(room.usRoomNo)" >객실난방설정</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle style="cursor: pointer" @click="openRoomGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
                      color="indigo lighten-2"
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
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTroom_cur === 255 || room.fTroom_cur === -1 ) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                    <v-card
                      v-if='((room.ucTotalStatus & 16) !== 0)'
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="brown lighten-4"
                      label="바닥온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                    <v-card
                      v-if='((room.ucTotalStatus & 16) === 0)'
                      class="d-inline-flex ma-0 mt-1 ml-1 mr-1 pa-0 "
                      color="#eeeeee"
                      label="바닥온도"
                      small>
                      <div class='body-2 font-weight-bold ma-0 pa-0'>{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></div>
                    </v-card>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <v-dialog v-model='roomGraphModal' persistent width="1400px">
      <v-card>
        <v-toolbar dark icons-and-text>
          <span class='headline'>{{roomNo}}호 상태 그래프</span>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="closeRoomGraph()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <div>
            <v-row>
              <v-col class="d-flex" cols="12" sm="8">&nbsp;&nbsp;
              <v-autocomplete
                v-model="time.value"
                :items="this.times"
                item-value="value"
                item-text="name"
                label='시간단위'
                style='max-width:80px'
                class='grey--text caption'
              ></v-autocomplete>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <v-menu
                  v-model='startMenu'
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
                    label='시작일'
                    prepend-icon='event'
                    readonly
                    v-on='on'
                    style='max-width:120px'
                  ></v-text-field>
                </template>
                <v-date-picker v-model='startDate' no-title @input='startMenu = false'></v-date-picker>
              </v-menu>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <v-text-field
              v-model="startTime"
              label="시작시간"
              type="time"
              style="max-width:100px"></v-text-field>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-menu
                  v-model='endMenu'
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
                    label='종료일'
                    prepend-icon='event'
                    readonly
                    v-on='on'
                    style='max-width:120px'
                  ></v-text-field>
                </template>
                <v-date-picker v-model='endDate' no-title @input='endMenu = false'></v-date-picker>
              </v-menu>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <v-text-field
              v-model="endTime"
              label="종료시간"
              type="time"
              style="max-width:100px"></v-text-field>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-btn class="d-flex" :loading="searchloading" :disabled="loading" @click="searchGraph()">
                <span>검색</span>
              </v-btn>
              </v-col>
              <v-col></v-col>
            </v-row>
            <div>
              <div class="ma-0 pa-0 mb-n3">
                <v-chip
                  class="ma-0 ml-5 mb-n3"
                  color="orange"
                  label
                  outlined
                >
                {{graphTitle1}}
                </v-chip>
                <apexchart type='line' width='1300px' height='400' :options='chartOptionsLine1' :series='series1'/>
              </div>
              <div class="ma-0 pa-0 mb-n3">
                <v-chip
                  class="ma-0 ml-5 mb-n3"
                  color="orange"
                  label
                  outlined
                >
                {{graphTitle2}}
                </v-chip>
                <apexchart type='line' width='1300px' height='160' :options='chartOptionsLine2' :series='series2'/>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model='settingRoomModal' persistent width="1300px" >
      <v-card  class="scroll-y">
        <v-toolbar dark icons-and-text>
          <v-toolbar-title>
            <v-row>
            <v-col class='ma-0 pr-0 pt-5'>
              <v-autocomplete
                  :items='roomNos'
                  v-model='roomNo'
                  autocomplete
                  class="grey--text headline roomSel"
                  style="max-width:80px;"
                  @change='openRoomStat(roomNo)'
                ></v-autocomplete>
            </v-col>
            <v-col class='ma-0 pt-6 pl-0'>호 객실 설정</v-col>
          </v-row>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="closeRoomStat()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <div>
              <v-row>
                <v-col cols="12" sm="3" class='ml-0 mr-0'>
                  <v-card
                    class="mx-auto"
                    max-width="230"
                  >
                    <v-list
                      shaped
                      class="ma-0 pa-0"
                      dense
                      max-height="800px">
                      <v-row dense class="ma-0 pa-0" justify="left">
                        <template v-for="(item, i) in items" dense class="ma-0 pa-0" justify="left">
                          <v-col v-if="i === 0" dense class="ma-0 pa-0" cols="6" sm="3" max-width="60px">
                            <v-list-item class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                              <v-list-item-action class="mt-0 pt-0">
                                <v-checkbox
                                  v-model="beAll"
                                  color="primary"
                                  @click.native.prevent="allCheckBox()"
                                ></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8 mr-n2">
                                <v-list-item-subtitle class="ma-0 pa-0">전체</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                          <v-col v-if="i<13" class="ma-0 pa-0" cols="6" sm="3" max-width="60px">
                            <v-list-item
                              class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                              <v-list-item-action class="mt-0 pt-0">
                                <v-checkbox
                                  v-model="item.beChecked"
                                  color="primary"
                                  class="ma-0 pa-0"
                                  @change="chkCheckBoxs()"
                                ></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                                <v-list-item-subtitle class="ma-0 pa-0">
                                  {{item.RoomNo}}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </template>
                      </v-row>
                      <v-row class="ma-0 pa-0">
                        <template v-for="(item, i) in items" dense class="ma-0 pa-0" justify="left">
                          <v-col v-if="i > 12 && i < 38" class="ma-0 pa-0" cols="6" sm="3" max-width="60px">
                            <v-list-item
                              class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                              <v-list-item-action class="mt-0 pt-0">
                                <v-checkbox
                                  v-model="item.beChecked"
                                  color="primary"
                                  class="ma-0 pa-0"
                                  @change="chkCheckBoxs()"
                                ></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                                <v-list-item-subtitle class="ma-0 pa-0">
                                  {{item.RoomNo}}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </template>
                      </v-row>
                      <v-row class="ma-0 pa-0">
                        <template v-for="(item, i) in items" dense class="ma-0 pa-0" justify="left">
                          <v-col v-if="i > 37 && i < 64" class="ma-0 pa-0" cols="6" sm="3" max-width="60px">
                            <v-list-item
                              class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                              <v-list-item-action class="mt-0 pt-0">
                                <v-checkbox
                                  v-model="item.beChecked"
                                  color="primary"
                                  class="ma-0 pa-0"
                                  @change="chkCheckBoxs()"
                                ></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                                <v-list-item-subtitle class="ma-0 pa-0">
                                  {{item.RoomNo}}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </template>
                      </v-row>
                      <v-row class="ma-0 pa-0">
                        <template v-for="(item, i) in items" dense class="ma-0 pa-0" justify="left">
                          <v-col v-if="i > 63 && i < 91" class="ma-0 pa-0" cols="6" sm="3" max-width="60px">
                            <v-list-item
                              class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                              <v-list-item-action class="mt-0 pt-0">
                                <v-checkbox
                                  v-model="item.beChecked"
                                  color="primary"
                                  class="ma-0 pa-0"
                                  @change="chkCheckBoxs()"
                                ></v-checkbox>
                              </v-list-item-action>
                              <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                                <v-list-item-subtitle class="ma-0 pa-0">
                                  {{item.RoomNo}}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </template>
                      </v-row>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" class='ml-0 mr-0'>
                  <v-card
                    dense
                    max-width="6560px"
                    class="mx-auto">
                    <v-card-title class="subheading font-weight-bold">난방설정 ({{curSettingTitle}})</v-card-title>
                    <v-divider class='my-0'>></v-divider>
                    <v-card-text class="ma-0 ml-2 pb-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col class="ma-0 pa-0" cols="12" sm="5">
                          <v-radio-group v-model="roomStat.HeatingMode" row label="모드 : " class="pa-0 font-weight-bold black--text body-2">
                            <v-radio label="자동" :value="0"></v-radio>
                            <v-radio label="수동" :value="1"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12" sm="6">
                          <v-radio-group v-model="roomStat.UseTsurf" row label="기준 : "class="pa-0 font-weight-bold black--text body-2">
                            <v-radio label="바닥온도" :value="1"></v-radio>
                            <v-radio label="실내온도" :value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text class="pt-0 mt-0">
                      <v-row class="mt-0">
                        <v-col class="ma-0 pa-0">
                          <v-card
                            max-width="290px"
                            class="mx-auto">
                            <v-card-title class="subheading font-weight-bold">자동난방설정</v-card-title>
                            <v-divider class='my-0'>></v-divider>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title>체크인:</v-list-item-title>
                                <v-list-item-title width=100>{{trnCheckInTime}} ~ {{trnCheckOutTime}}</v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>재실모드:</v-list-item-title>
                                <v-list-item-title>
                                  <v-select
                                    v-if="roomStat.HeatingMode === 0"
                                    v-model="roomStat.RoomState"
                                    :items="roomStats"
                                    item-value="value"
                                    item-text="name"
                                    hide-details
                                    class="pa-0 font-weight-bold black--text body-2 roomSel"
                                  ></v-select>
                                  <v-select
                                    v-if="roomStat.HeatingMode !== 0"
                                    disabled
                                    v-model="roomStat.RoomState"
                                    :items="roomStats"
                                    item-value="value"
                                    item-text="name"
                                    hide-details
                                    class="pa-0 font-weight-bold black--text body-2 roomSel"
                                  ></v-select>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>예약방 난방타입:</v-list-item-title>
                                <v-list-item-title>
                                  <v-select
                                    v-if="roomStat.HeatingMode === 0"
                                    v-model="roomStat.ReservedRoomType"
                                    :items="roomResevedType"
                                    item-value="value"
                                    item-text="name"
                                    hide-details
                                    height=12
                                    class="pa-0 font-weight-bold black--text body-2 roomSel"
                                  ></v-select>
                                  <v-select
                                    v-if="roomStat.HeatingMode !== 0"
                                    disabled
                                    v-model="roomStat.ReservedRoomType"
                                    :items="roomResevedType"
                                    item-value="value"
                                    item-text="name"
                                    hide-details
                                    height=12
                                    class="pa-0 font-weight-bold black--text body-2 roomSel"
                                  ></v-select>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>예상 입실시간:</v-list-item-title>
                                <v-list-item-title>
                                  <v-text-field v-if="roomStat.HeatingMode === 0" class="text-center ma-0 pa-0 pt-3" height=13 v-model="roomStat.ReservedRoomHour"></v-text-field>
                                  <v-text-field v-if="roomStat.HeatingMode !== 0" class="text-center ma-0 pa-0 pt-3" disabled height=13 v-model="roomStat.ReservedRoomHour"></v-text-field>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>바닥온도:</v-list-item-title>
                                <v-list-item-title class="align-end">
                                  <v-row>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 0" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="설정온도" v-model="roomStat.Tsurf_set"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 0" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.Tsurf_set"></v-text-field>
                                    </v-col>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 0" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="제어범위" v-model="roomStat.Tsurf_cr"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 0" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.Tsurf_cr"></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>객실온도:</v-list-item-title>
                                <v-list-item-title class="align-end">
                                  <v-row>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 0" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="설정온도" v-model="roomStat.Troom_set"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 0" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.Troom_set"></v-text-field>
                                    </v-col>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 0" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="제어범위" v-model="roomStat.Troom_cr"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 0" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.Troom_cr"></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col class="ma-0 pa-0">
                            <v-card
                              dense
                              max-width="280px"
                              class="mx-auto">
                            <v-card-title class="subheading font-weight-bold">수동난방 설정</v-card-title>
                            <v-divider class='my-0'>></v-divider>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title>난방 가동 시간:</v-list-item-title>
                                <v-list-item-title class="align-end">
                                  <v-row>
                                    <v-col>
                                      <v-text-field v-if="(roomStat.HeatingMode === 1)" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="시간" v-model="trnMH_HeatingTimeHour"></v-text-field>
                                      <v-text-field v-if="(roomStat.HeatingMode !== 1)" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="시간" v-model="trnMH_HeatingTimeHour"></v-text-field>
                                    </v-col>
                                    <v-col>
                                      <v-text-field v-if="(roomStat.HeatingMode === 1)" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="분" v-model="trnMH_HeatingTimeMin"></v-text-field>
                                      <v-text-field v-if="(roomStat.HeatingMode !== 1)" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="분" v-model="trnMH_HeatingTimeMin"></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>그룹스케줄 :</v-list-item-title>
                                <v-list-item
                                  class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                                  <v-list-item-action class="mt-0 pt-0">
                                    <v-checkbox
                                      v-if="roomStat.HeatingMode === 1"
                                      v-model="roomStat.SchUse"
                                      color="primary"
                                      class="ma-0 pa-0"
                                    ></v-checkbox>
                                    <v-checkbox
                                      v-if="roomStat.HeatingMode !== 1"
                                      disabled
                                      v-model="roomStat.SchUse"
                                      color="primary"
                                      class="ma-0 pa-0"
                                    ></v-checkbox>
                                  </v-list-item-action>
                                  <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                                    <v-list-item-subtitle class="ma-0 pa-0">
                                      사용
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item>
                              <v-list-item>
                                  스케줄러<label v-if="roomStat.MH_SchedulerState === 1">동작</label><label v-if="roomStat.MH_SchedulerState !== 1">정지</label>(그룹번호:{{roomStat.SchGroupIndex+1}},현재난방<label v-if="roomStat.SchHeatingStatus === 1">ON</label><label v-if="roomStat.SchHeatingStatus !== 1">OFF</label>)
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>바닥온도:</v-list-item-title>
                                <v-list-item-title class="align-end">
                                  <v-row>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 1" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Tsurf_set"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 1" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Tsurf_set"></v-text-field>
                                    </v-col>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 1" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Tsurf_cr"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 1" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Tsurf_cr"></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>객실온도:</v-list-item-title>
                                <v-list-item-title class="align-end">
                                  <v-row>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 1" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Troom_set"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 1" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="설정온도" v-model="roomStat.MH_Troom_set"></v-text-field>
                                    </v-col>
                                    <v-col>
                                      <v-text-field v-if="roomStat.HeatingMode === 1" class="text-center ma-0 pa-0 pt-3" height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Troom_cr"></v-text-field>
                                      <v-text-field v-if="roomStat.HeatingMode !== 1" class="text-center ma-0 pa-0 pt-3" disabled height=13 :rules="rules" label="제어범위" v-model="roomStat.MH_Troom_cr"></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
              </v-col>
            <v-col class='ml-0 mr-0'>
              <v-card
                dense
                max-width="350px"
                class="mx-auto">
                <v-card-title class="subheading font-weight-bold">현재 상태 ({{curStatTitle}} )</v-card-title>
                <v-divider class='my-0'>></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>난방상태(설정/현재):</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{roomStat.HeatingSetState}}/{{roomStat.HeatingCurState}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>전체 상태:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{roomStat.TotalStatus}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥 설정온도/제어범위:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{roomStat.Tset_cur}}/{{roomStat.Tcr_cur}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥/객실 온도:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnTsurf_cur}}/{{trnTroom_cur}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥/객실 온도상승(시):</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{roomStat.Tsurf_inc}}/{{roomStat.Troom_inc}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>바닥/객실 온도하강(시):</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{roomStat.Tsurf_dec}}/{{roomStat.Troom_dec}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>난방소요시간:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnOptimalNeedTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>사전난방 시작시간:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnPreHeatingStartTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>수동난방 시작시간</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnMH_StartTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>수동난방 종료시간:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnMH_EndTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>수동난방 남은시간:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnMH_HeatingLeftTime}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>난방 옵션:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{roomStat.PreHeatingOption}}</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>온도 동작 상태:</v-list-item-title>
                    <v-list-item-title class="align-end" style="margin:-9px 0px 0px 19px;">
                      <v-text-field dense solo flat class="body-2" style="height:30px;" v-model="roomStat.OperationState"></v-text-field>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>최종제어시간:</v-list-item-title>
                    <v-list-item-title class="align-end" style="max-width:110px">{{trnLastControlTime}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="d-flex ma-0 pa-0" :loading="saveloading" :disabled="loading"  @click='saveRoomStat()'>난방시작</v-btn>
                <v-btn class="d-flex ma-0 ml-1 pa-0" :loading="saveloading" :disabled="loading"  @click='stopRoomStat()'>난방중지</v-btn>
                <v-btn class="d-flex ma-0 ml-1 pa-0" :loading="reloading" :disabled="loading" @click='openRoomStat(roomNo)'>새로고침</v-btn>
                <v-btn class="d-flex ma-0 ml-1 pa-0" :loading="closeloading" :disabled="loading"  @click='closeRoomStat()'>취소</v-btn>
              </v-card-actions>
            </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style>
.v-dialog > .v-card > .v-toolbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
<script>
import axios from 'axios'
// Apex = {
//   stroke: {
//     show: true,
//     curve: 'smooth',
//     lineCap: 'butt',
//     width: 3,
//     //dashArray: [0,10],
//   },
//   yaxis: {
//     tickAmount: 3
//   }
// }
export default {
  created () {
    this.getRooms()
    this.timer = setInterval(this.getRooms, 5000)
    this.refreshTime()
  },
  data () {
    return {
      timer: null,
      refreshTimer: null,
      datas: [],
      CurStatus: 0,
      SetStatus: 0,
      roomsStats: [],
      roomsOldStats: [],
      roomNos: [],
      roomNo: 0,
      series1: [],
      chartOptionsLine1: [],
      series2: [],
      chartOptionsLine2: [],
      roomGraphModal: false,
      settingRoomModal: false,
      time: { 'name': '10분', 'value': 600 },
      times: [{ 'name': '5분', 'value': 300 }, { 'name': '10분', 'value': 600 }, { 'name': '1시간', 'value': 3600 }, { 'name': '하루', 'value': (3600 * 24) }, { 'name': '전체', 'value': 0 }],
      startMenu:false,
      startDate: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY-MM-DD'),
      startTime: this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('HH:mm'),
      endMenu:false,
      endDate: this.$moment(new Date().toISOString()).format('YYYY-MM-DD'),
      endTime: this.$moment(new Date().toISOString()).format('HH:mm'),
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
      trnTsurf_cur: 0,
      trnTroom_cur: 0,
      trnLastControlTime: 0,
      items: [],
      roomScheduleUsed: [ { name: '사용안함', value: 0 }, { name: '사용', value: 1 } ],
      heatingTypes: [ { name: '객실온도', value: 0 }, { name: '바닥온도', value: 1 } ],
      roomStats: [ { name: '공실', value: 0 }, { name: '예비', value: 1 }, { name: '재실', value: 2 }],
      roomHeatingModes: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }],
      heatingModes: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      roomHeatings: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      heatings: [ { name: '자동', value: 0 }, { name: '수동', value: 1 }, { name: '정지', value: 2 } ],
      roomResevedType: [ { name: '상시', value: 0 }, { name: '매일', value: 1 }, { name: '오늘', value: 2 }, { name: '내일', value: 3 }, { name: '모레', value: 4 } ],
      roomCurStat: '보일러 OFF',
      loading: false,
      reloading: false,
      saveloading: false,
      closeloading: false,
      searchloading: false,
      graphTitle1: '온도 정보',
      graphTitle2: '상태 정보',
      curStatTitle: '-',
      curSettingTitle: '-',
      curSchedullerTitle: '스케줄러 동작',
      menuItems: ['create file', 'create directory'],
      systemTime: '-'
    }
  },
  methods: {
    startReload () {
      this.getRooms()
      clearInterval(this.timer)
      this.timer = setInterval(this.getRooms, 5000)
    },
    refreshTime() {
      clearTimeout(this.refreshTimer)
      this.refreshTimer = setTimeout(this.refreshTime, 1000)
      axios.get(`${this.$apiRootPath}/rooms/getTime`)
        .then((r) => {
          this.systemTime = this.$moment(r.data.curTime).format('YYYY/MM/DD HH:mm:ss')
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRoomsGroup () {
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}/rooms/groupSchedule`)
        .then((r) => {
          this.groupDatas = JSON.parse(r.data)
          if (this.groupDatas.SchedulerState === 1) {
            this.curSchedullerTitle = '스케줄러 동작'
          } else {
            this.curSchedullerTitle = '스케줄러 정지'
          }
          // alert(JSON.stringify(this.curGroups))
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getRooms () {
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}rooms`)
        .then((r) => {
          if (this.roomsOldStats.length !== 0) {
            for (var key in this.roomsOldStats) {
              if( this.roomsOldStats[key].ucRoomState !==  r.data[key].ucRoomState ) {
                this.roomsStats[key].ucRoomState = r.data[key].ucRoomState
              }
              if( this.roomsOldStats[key].ucTotalStatus !==  r.data[key].ucTotalStatus ) {
                this.roomsStats[key].ucTotalStatus = r.data[key].ucTotalStatus
              }
              if( this.roomsOldStats[key].ucCurStatus !==  r.data[key].ucCurStatus ) {
                this.roomsStats[key].ucCurStatus = r.data[key].ucCurStatus
              }
              if( this.roomsOldStats[key].fTsurf_cur !==  r.data[key].fTsurf_cur ) {
                this.roomsStats[key].fTsurf_cur = r.data[key].fTsurf_cur
              }
              if( this.roomsOldStats[key].fTroom_cur !==  r.data[key].fTroom_cur ) {
                this.roomsStats[key].fTroom_cur = r.data[key].fTroom_cur
              }
              if( this.roomsOldStats[key].usManHeatingMode !==  r.data[key].usManHeatingMode ) {
                this.roomsStats[key].usManHeatingMode = r.data[key].usManHeatingMode
              }
              if( this.roomsOldStats[key].ucUserSetStatus !==  r.data[key].ucUserSetStatus ) {
                this.roomsStats[key].ucUserSetStatus = r.data[key].ucUserSetStatus
              }
            }
          } else {
            this.roomsStats = r.data
          }
          this.CurStatus = 0
          this.SetStatus = 0
          for (var i = 0; i < this.roomsStats.length; i++) {
            this.CurStatus = this.CurStatus + ((this.roomsStats[i].ucCurStatus === 1) ? 1 : 0)
            this.SetStatus = this.SetStatus + (((this.roomsStats[i].ucTotalStatus & 16) !== 0) ? 1 : 0)
            this.roomNos.push(this.roomsStats[i].usRoomNo)
          }
          this.roomsOldStats = this.roomsStats
          this.getRoomsGroup()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    searchGraph () {
      this.searchloading = true
      this.loading = true
      this.getTrendRoomSearch(this.roomNo)
    },
    getTrendRoomSearch (usRoomNo) {
      // axios.put(`http://localhost:3000/api/rooms/getRoomTrend`, { usRoomNo: usRoomNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/getRoomTrend`, { usRoomNo: usRoomNo, startTime: startDateTime, endTime: endDateTime, time: this.time.value })
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var data6 = []
          var data7 = []
          var data8 = []
          var data9 = []
          var date = []
          var nCnt = 0
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '상태 정보'
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push(parseInt(this.datas[i].ucRoomState)+7)
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push(parseInt(this.datas[i].ucSetStatus)+2)
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push(parseInt(this.datas[i].ucCurStatus))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].fTset !== null && this.datas[i].fTset <= 60) {
              data3.push((this.datas[i].fTset).toFixed(2))
            } else {
              data3.push(-2)
            }
            if (this.datas[i].fTsurf_cur !== null && this.datas[i].fTsurf_cur <= 60) {
              data4.push((this.datas[i].fTsurf_cur).toFixed(2))
            } else {
              data4.push(-2)
            }
            if (this.datas[i].fTroom_cur !== null && this.datas[i].fTroom_cur <= 60) {
              data5.push((this.datas[i].fTroom_cur).toFixed(2))
            } else {
              data5.push(-2)
            }
            if (this.datas[i].fTroom_set !== null && this.datas[i].fTroom_set <= 60) {
              data6.push((this.datas[i].fTroom_set).toFixed(2))
            } else {
              data6.push(-2)
            }
            if (this.datas[i].fTsurf_set !== null && this.datas[i].fTsurf_set <= 60) {
              data7.push((this.datas[i].fTsurf_set).toFixed(2))
            } else {
              data7.push(-2)
            }
            if (this.datas[i].usManHeatingMode !== null && this.datas[i].usManHeatingMode <= 60) {
              if (this.datas[i].usManHeatingMode === '0') {
                data8.push(parseInt(this.datas[i].usManHeatingMode+6))
              } else if (this.datas[i].usManHeatingMode === '1') {
                data8.push(parseInt(this.datas[i].usManHeatingMode+5))
              } else {
                data8.push(parseInt(this.datas[i].usManHeatingMode+4))
              }
            } else {
              data8.push(-2)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur <= 60) {
              data9.push((this.datas[i].fTset_cur).toFixed(2))
            } else {
              data9.push(-2)
            }
            if (this.time.value === 0 ){
              date.push(new Date((this.datas[i].m + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 3
            } else {
              date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 0
            }
          }
          this.series1 = [
            {
              name: '설정온도',
              data: data3
            },
            {
              name: '제어기설정온도',
              data: data9
            },
            {
              name: '실내설정온도',
              data: data6
            },
            // {
            //   name: '바닥설정온도',
            //   data: data7
            // },
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
              name: '난방모드',
              data: data8
            },
            // {
            //   name: '재실정보',
            //   data: data0
            // },
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
            xaxis: {
              categories: date,
              type: 'datetime',
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.searchloading = false
          this.loading = false
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    openRoomGraph: function (roomNo) {
      clearInterval(this.timer)
      this.searchloading = true
      this.loading = true
      this.roomNo = roomNo
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/getRoomTrend`, { usRoomNo: roomNo, startTime: startDateTime, endTime: endDateTime, time: this.time.value })
        .then((r) => {
          this.datas = r.data
          var data0 = []
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var data6 = []
          var data7 = []
          var data8 = []
          var data9 = []
          var date = []
          var nCnt = 0
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '상태 정보'
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push(parseInt(this.datas[i].ucRoomState)+7)
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push(parseInt(this.datas[i].ucSetStatus)+2)
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push(parseInt(this.datas[i].ucCurStatus))
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
            if (this.datas[i].fTroom_set !== null && this.datas[i].fTroom_set < 50) {
              data6.push((this.datas[i].fTroom_set).toFixed(2))
            } else {
              data6.push(-1)
            }
            if (this.datas[i].fTsurf_set !== null && this.datas[i].fTsurf_set < 50) {
              data7.push((this.datas[i].fTsurf_set).toFixed(2))
            } else {
              data7.push(-1)
            }
            if (this.datas[i].usManHeatingMode !== null && this.datas[i].usManHeatingMode < 50) {
              if (this.datas[i].usManHeatingMode === '0') {
                data8.push(parseInt(this.datas[i].usManHeatingMode+6))
              } else if (this.datas[i].usManHeatingMode === '1') {
                data8.push(parseInt(this.datas[i].usManHeatingMode+5))
              } else {
                data8.push(parseInt(this.datas[i].usManHeatingMode+4))
              }
            } else {
              data8.push(-1)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur < 50) {
              data9.push((this.datas[i].fTset_cur).toFixed(2))
            } else {
              data9.push(-1)
            }
            if (this.time.value === 0 ){
              date.push(new Date((this.datas[i].m + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 3
            } else {
              date.push(new Date((this.datas[i].m * this.time.value + (9 * 60 * 60)) * 1000).toISOString())
              nCnt = 0
            }
          }
          this.series1 = [
            {
              name: '설정온도',
              data: data3
            },
            {
              name: '제어기설정온도',
              data: data9
            },
            {
              name: '실내설정온도',
              data: data6
            },
            // {
            //   name: '바닥설정온도',
            //   data: data7
            // },
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
              name: '난방모드',
              data: data8
            },
            // {
            //   name: '재실정보',
            //   data: data0
            // },
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
              id: 'trendCht1',
              group: 'trend',
              width: '100%',
              toolbar: {
                show: false
              }
            },
            stroke: {
              width: 3,
              //dashArray: [0,10],
            },
            yaxis: {
                labels: {
                  show: true,
                  align: 'right',
                  minWidth: 50,
                  maxWidth: 50
              }
            },
            xaxis: {
              categories: date,
              type: 'datetime',
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.chartOptionsLine2 = {
            chart: {
              id: 'trendCht2',
              group: 'trend',
              width: '100%',
              toolbar: {
                show: false
              }
            },
            stroke: {
              width: 3,
              //dashArray: [0,10],
            },
            yaxis: {
                labels: {
                  show: true,
                  align: 'right',
                  minWidth: 50,
                  maxWidth: 50
              }
            },
            xaxis: {
              type: 'datetime',
              categories: date,
              labels: {
                show: true,
                rotate: 0,
                // format: 'yy/MM/dd HH:mm',
                formatter: function (value) {
                  return (new Date(value).toISOString().substr(2, 8) + ' ' + new Date(value).toISOString().substr(11, parseInt(5 + nCnt)))
                }
              }
            }
          }
          this.searchloading = false
          this.loading = false
          this.roomGraphModal = true
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    closeRoomGraph: function () {
      this.startReload()
      this.time = { 'name': '10분', 'value': 600 }
      this.startDate = this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('YYYY-MM-DD')
      this.startTime = this.$moment(new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))).toISOString()).format('HH:mm')
      this.endDate = this.$moment(new Date().toISOString()).format('YYYY-MM-DD')
      this.endTime = this.$moment(new Date().toISOString()).format('HH:mm')
      this.searchloading = false
      this.loading = false
      this.roomGraphModal = false
    },
    closeRoomStat: function () {
      this.startReload()
      this.searchloading = false
      this.loading = false
      this.settingRoomModal = false
    },
    openRoomStat: function (roomNo) {
      clearInterval(this.timer)
      this.reloading = true
      this.loading = true
      this.roomNo = roomNo
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
    getRoomPriority (isSave) {
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
          this.bePriShow = true
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

          if (this.roomStat.SchState === 1){
            this.curSettingTitle = '스케줄러 동작중'
          } else {
            this.curSettingTitle = '스케줄러 중지'
          }
          if (this.roomStat.HeatingMode === 0){
            this.curStatTitle = '자동모드'
          } else if (this.roomStat.HeatingMode === 1){
            this.curStatTitle = '수동모드'
          } else {
            this.curStatTitle = '정지'
          }
          // alert(JSON.stringify(this.roomStat))
          // alert(this.roomStat.UseTsurf + ", " + this.roomStat.HeatingMode)
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
          this.trnTsurf_cur = (this.roomStat.Tsurf_cur >= 255 || this.roomStat.Tsurf_cur === -1) ? ' - ' : this.roomStat.Tsurf_cur
          this.trnTroom_cur = (this.roomStat.Troom_cur >= 255 || this.roomStat.Troom_cur === -1) ? ' - ' : this.roomStat.Troom_cur
          this.trnCheckInTime = this.$moment(new Date(this.roomStat.CheckInTime * 1000).toISOString()).format('MM/DD/HH')
          this.trnCheckOutTime = this.$moment(new Date(this.roomStat.CheckOutTime * 1000).toISOString()).format('MM/DD/HH')
          this.trnMH_StartTime = this.roomStat.MH_StartTime !== 0 ? this.$moment(new Date(this.roomStat.MH_StartTime * 1000).toISOString()).format('YY/MM/DD HH:mm') : '00/00/00 00'
          this.trnMH_EndTime = this.roomStat.MH_EndTime !== 0 ? this.$moment(new Date(this.roomStat.MH_EndTime * 1000).toISOString()).format('YY/MM/DD HH:mm') : '00/00/00 00'
          this.trnLastControlTime = this.roomStat.LastControlTime !== 0 ? this.$moment(new Date(this.roomStat.LastControlTime * 1000).toISOString()).format('YY/MM/DD HH:mm:ss') : '00/00/00 00:00:00'
          var hour = parseInt(this.roomStat.MH_HeatingLeftTime / 60 / 60)
          var min = parseInt((this.roomStat.MH_HeatingLeftTime - (hour * 60 * 60)) / 60)
          this.trnMH_HeatingLeftTime = hour + '시간 ' + min + '분'
          this.trnPreHeatingStartTime = this.roomStat.PreHeatingStartTime !== 0 ? this.$moment(new Date(this.roomStat.PreHeatingStartTime * 1000).toISOString()).format('YY/MM/DD HH') : '00/00/00 00'
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
          this.saveloading = false
          this.reloading = false
          this.loading = false
          this.settingRoomModal = true
          // this.getRoomPriority()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    stopRoomStat: function () {
      var roomNos = []
      this.roomStat.HeatingMode = 2
      this.roomStat.MH_HeatingTimeSec = (this.trnMH_HeatingTimeHour * 60 * 60) + (this.trnMH_HeatingTimeMin * 60)
      this.roomStat.MH_HeatingStopTimeSec = (this.trnMH_HeatingStopTimeHour * 60 * 60) + (this.trnMH_HeatingStopTimeMin * 60)
      this.roomStat.MH_TotalHeatingTimeSec = (this.trnMH_TotalHeatingTimeHour * 60 * 60) + (this.trnMH_TotalHeatingTimeMin * 60)
      this.roomStat.MH_TodayStartTime = (this.trnMH_TodayStartTimeHour * 60 * 60) + (this.trnMH_TodayStartTimeMin * 60)
      if (this.groupDatas.SchedulerState === 1 && this.beAll === true) {
        alert("스케줄러 동작 중에는 전체 선택을 할 수 없습니다.");
        return
      }
      this.saveloading = true
      this.loading = true
      if (this.beAll) {
        roomNos.push(65535)
      } else {
        for (var key in this.items) {
          if (this.items[key].beChecked) {
            roomNos.push(this.items[key].RoomNo)
          }
        }
      }
      // for (var key in this.items) {
      //   if (this.items[key].beChecked) {
      //     roomNos.push(this.items[key].RoomNo)
      //   }
      // }
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
    saveRoomStat: function () {
    var roomNos = []
      this.roomStat.MH_HeatingTimeSec = (this.trnMH_HeatingTimeHour * 60 * 60) + (this.trnMH_HeatingTimeMin * 60)
      if (this.groupDatas.SchedulerState === 1 && this.beAll === true) {
        alert("스케줄러 동작 중에는 전체 선택을 할 수 없습니다.");
        return
      }
      this.saveloading = true
      this.loading = true
      if (this.beAll) {
        roomNos.push(65535)
      } else {
        for (var key in this.items) {
          if (this.items[key].beChecked) {
            roomNos.push(this.items[key].RoomNo)
          }
        }
      }
      // for (var key in this.items) {
      //   if (this.items[key].beChecked) {
      //     roomNos.push(this.items[key].RoomNo)
      //   }
      // }
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
          this.bePriShow = true
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
      if (this.roomStat.SchState === 1) {
        alert("스케줄러 동작 중에는 전체 선택을 할 수 없습니다.");
        this.beAll = false
        return
      }
      for (var key in this.items) {
        this.items[key].beChecked = this.beAll
      }
    },
    chkCheckBoxs() {
      var beAllChecked = true
      for (var key in this.items) {
        if (!this.items[key].beChecked) {
          beAllChecked = false
          break
        }
      }
      this.beAll = beAllChecked
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
      this.chkCheckBoxs()
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
        this.bePriShow = false
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
        this.bePriShow = false
        this.saveRoomPrio()
      }
    }
  }
}
</script>
