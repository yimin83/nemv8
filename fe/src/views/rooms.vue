<template>
  <v-container grid-list-md>
    <div class="text--primary" width="100%">
      <v-row class="ma-0 pa-0 ml-n2">
        <v-col class="ma-0 pa-0">
          <!--<v-chip
            :color="sessStatColor"
            class="d-inline-flex ma-0 mr-1 pa-0 font-weight-bold"
            style="font-size:15px"
            small>&nbsp;&nbsp;{{sessionCnt}}&nbsp;&nbsp;
          </v-chip>-->
          <v-chip
            :color="sessStatColor"
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            title="세션정보"
            label>{{sessionCnt}}
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1"
            color="grey"
            title="난방설정수"
            label
            outlined>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#10ac84" enable-background="new 0 0 511.718 511.718" width="25" height="25" viewBox="0 0 511.718 511.718" class="svg" src="src/views/svg/fan_home.svg">
              <path d="M233.272,0.002C104.443,0.002,0,104.443,0,233.271c0,128.835,104.435,233.272,233.272,233.272
            		c128.833,0,233.274-104.445,233.274-233.272C466.546,104.438,362.105,0.002,233.272,0.002z M209.72,61.401
            		c0-13.01,10.546-23.552,23.552-23.552c13.01,0,23.55,10.542,23.55,23.552V223.58c0,13.006-10.54,23.554-23.55,23.554
            		c-13.006,0-23.552-10.548-23.552-23.554V61.401z M233.272,405.56c-91.006,0-165.046-74.05-165.046-165.05
            		c0-59.038,31.897-113.976,83.247-143.338c11.289-6.45,25.677-2.533,32.141,8.756c6.458,11.289,2.533,25.678-8.756,32.138
            		c-36.722,21.001-59.528,60.254-59.528,102.444c0,65.036,52.912,117.946,117.942,117.946c65.035,0,117.949-52.91,117.949-117.946
            		c0-42.19-22.818-81.443-59.539-102.444c-11.293-6.452-15.216-20.843-8.756-32.138c6.464-11.297,20.847-15.214,32.147-8.756
            		c51.347,29.362,83.246,84.284,83.246,143.338C398.32,331.51,324.287,405.56,233.272,405.56z"/>
            </svg>
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            color="grey"
            label
            outlined>{{SetStatus}}
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1"
            color="grey"
            title="보일러가동수"
            label
            outlined>
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" enable-background="new 0 0 511.718 511.718" width="25" height="25" viewBox="0 0 511.718 511.718" class="svg" src="src/views/svg/flame-active.svg">
              <path d="M312.47,369.975c-10.807,7.864-21.116,8.395-27.276,7.709c-15.68-1.753-29.748-13.574-37.631-31.62
          			c-5.29-12.109-8.104-28.372-4.929-45.535c-24.917,13.338-56.887,43.622-56.887,111.224c0,38.738,31.515,70.252,70.252,70.252
          			s70.252-31.515,70.252-70.252C326.252,396.618,321.339,381.977,312.47,369.975z"/>
              <path d="M465.097,290.749l-2.262-40.346l-24.63,32.035c-1.961,2.55-6.137,7.061-11.466,11.173
          			c2.106-6.978,3.987-14.937,5.23-23.715c4.302-30.4,1.623-77.058-35.558-126.701l-15.601-20.83l-10.222,23.932
          			c-11.792,27.606-30.871,41.455-48.603,35.283c-13.651-4.75-24.746-20.373-30.439-42.866c-5.31-20.979-8.396-57.897,7.065-114.636
          			L305.169,0l-24.345,5.484c-82.12,18.5-137.457,76.817-160.03,168.647c-9.489,38.602-11.276,75.173-11.01,99.908
          			c-19.404-15.687-29.093-29.451-29.346-29.815L61.955,217.07l-8.419,31.794c-4.627,17.475-6.972,35.553-6.972,53.732
          			c0,114.62,92.556,208.012,206.852,209.404c-54.105-1.375-97.695-45.816-97.695-100.247c0-70.168,30.144-107.552,55.432-126.557
          			c27.593-20.738,55.42-24.423,56.591-24.57l34.73-4.352l-20.784,28.164c-13.097,17.747-12.001,37.262-6.609,49.607
          			c3.901,8.929,9.567,13.364,13.45,13.798c4.897,0.557,9.823-5.063,12.321-8.455l9.809-13.326l12.313,11.054
          			c21.165,19.004,33.305,46.209,33.305,74.637c0,54.43-43.59,98.871-97.695,100.247c114.296-1.391,206.852-94.784,206.852-209.404
          			C465.437,298.762,465.323,294.775,465.097,290.749z"/>
            </svg>
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            color="grey"
            label
            outlined>{{CurStatus}}
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1"
            color="grey"
            title="스케쥴러상태"
            label
            outlined>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#84817a" enable-background="new 0 0 511.718 511.718" width="25" height="25" viewBox="0 0 511.718 511.718" class="svg" src="src/views/svg/calendar.svg.svg">
              <path d="M432,32h-32V16c0-8.844-7.156-16-16-16c-8.844,0-16,7.156-16,16v16h-64V16c0-8.844-7.156-16-16-16
          			c-8.844,0-16,7.156-16,16v16h-64V16c0-8.844-7.156-16-16-16s-16,7.156-16,16v16h-64V16c0-8.844-7.156-16-16-16S80,7.156,80,16v16
          			H48C21.532,32,0,53.532,0,80v384c0,8.844,7.156,16,16,16h264.377C265.011,457.098,256,429.591,256,400
          			c0-79.406,64.594-144,144-144c29.591,0,57.098,9.011,80,24.377V80C480,53.532,458.468,32,432,32z M112,416H80
          			c-8.844,0-16-7.156-16-16c0-8.844,7.156-16,16-16h32c8.844,0,16,7.156,16,16C128,408.844,120.844,416,112,416z M112,352H80
          			c-8.844,0-16-7.156-16-16c0-8.844,7.156-16,16-16h32c8.844,0,16,7.156,16,16C128,344.844,120.844,352,112,352z M112,288H80
          			c-8.844,0-16-7.156-16-16c0-8.844,7.156-16,16-16h32c8.844,0,16,7.156,16,16S120.844,288,112,288z M112,224H80
          			c-8.844,0-16-7.156-16-16s7.156-16,16-16h32c8.844,0,16,7.156,16,16S120.844,224,112,224z M208,416h-32c-8.844,0-16-7.156-16-16
          			c0-8.844,7.156-16,16-16h32c8.844,0,16,7.156,16,16C224,408.844,216.844,416,208,416z M208,352h-32c-8.844,0-16-7.156-16-16
          			c0-8.844,7.156-16,16-16h32c8.844,0,16,7.156,16,16C224,344.844,216.844,352,208,352z M208,288h-32c-8.844,0-16-7.156-16-16
          			c0-8.844,7.156-16,16-16h32c8.844,0,16,7.156,16,16S216.844,288,208,288z M208,224h-32c-8.844,0-16-7.156-16-16s7.156-16,16-16h32
          			c8.844,0,16,7.156,16,16S216.844,224,208,224z M304,288h-32c-8.844,0-16-7.156-16-16c0-8.844,7.156-16,16-16h32
          			c8.844,0,16,7.156,16,16S312.844,288,304,288z M304,224h-32c-8.844,0-16-7.156-16-16s7.156-16,16-16h32c8.844,0,16,7.156,16,16
          			S312.844,224,304,224z M400,224h-32c-8.844,0-16-7.156-16-16s7.156-16,16-16h32c8.844,0,16,7.156,16,16S408.844,224,400,224z
          			 M448,128H32V80c0-8.828,7.172-16,16-16h32v16c0,8.844,7.156,16,16,16s16-7.156,16-16V64h64v16c0,8.844,7.156,16,16,16
          			s16-7.156,16-16V64h64v16c0,8.844,7.156,16,16,16c8.844,0,16-7.156,16-16V64h64v16c0,8.844,7.156,16,16,16c8.844,0,16-7.156,16-16
          			V64h32c8.828,0,16,7.172,16,16V128z"/>
                <path d="M400,288c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S461.75,288,400,288z M464,416h-64
            			c-8.844,0-16-7.156-16-16v-64c0-8.844,7.156-16,16-16c8.844,0,16,7.156,16,16v48h48c8.844,0,16,7.156,16,16
            			C480,408.844,472.844,416,464,416z"/>
            </svg>
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            color="grey"
            label
            outlined>{{curSchedullerTitle}}
          </v-chip>
        </v-col>
        <v-col class="ma-0 pa-0">
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            color="grey"
            label
            outlined>{{systemTime}}
          </v-chip>
        </v-col>
        <v-col class="ma-0 pa-0" cols="auto">
          <v-chip
            :loading="refreshLoading"
            :disabled="refreshLoading"
            @click="cmdFloorRadCmData()"
            style="cursor: pointer"
            color="#4ecdc4"
            class="ma-0 pa-0 pr-1 pl-1"
            title="객실정보갱신"
            label>
            <font-awesome-icon :icon="['fas', 'sync-alt']" color="white"/>
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            color="grey"
            text-color="white"
            title="오늘사용객실"
            label
            outlined>
            <v-img
                :src="require('./svg/days.png')"
                :aspect-ratio="undefined"
            ><div class="ml-1 mt-2">{{todayTxt}}</div></v-img>
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            color="grey"
            label
            outlined>{{todayReserved}}
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            color="grey"
            text-color="white"
            title="내일사용객실"
            label
            outlined>
            <v-img
                :src="require('./svg/days.png')"
                :aspect-ratio="undefined"
            ><div class="ml-1 mt-2">{{tomorrowTxt}}</div></v-img>
          </v-chip>
          <v-chip
            class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
            style="font-size:15px"
            color="grey"
            label
            outlined>{{tomorrowReserved}}
          </v-chip>
        </v-col>
      </v-row>
    </div>
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
            <v-row justify="center" class='ma-0 pa-0'>
              <div v-if='room.usRoomNo === 201 || room.usRoomNo === 301 || room.usRoomNo === 501 || room.usRoomNo === 601'>
                <v-col class='ma-0 mr-2 pa-0'>
                  <v-card
                    color='#337ab7'
                    class='ma-0 pa-0 font-weight-bold'
                    outlined
                    width='94px'
                    height='104px'
                    lg=12
                    md=12
                    sm=3
                    xs=3>
                    <v-card-text class="text-center white--text font-weight-bold display-1 mt-4">
                      {{(room.usRoomNo+'').substr(0, 1)}}F
                    </v-card-text>
                  </v-card>
                </v-col>
              </div>
              <v-col class='ma-0 pa-0'>
                <v-card
                  :color='room.boilerColor'
                  class='ma-0 pa-0 font-weight-bold'
                  outlined
                  width='94px'
                  height='104px'
                  lg=12
                  md=12
                  sm=3
                  xs=3>
                  <v-card-text class="text-center ma-0 mt-1 pa-0">
                    <v-menu
                      :value="showMenu"
                      class="ma-0 pa-0"
                    >
                      <template v-slot:activator="{ on }" class="ma-0 pa-0">
                        <div
                          class="text--primary font-weight-bold title mb-1 border"
                          style="cursor: pointer"
                          v-on="on">
                          <label style="cursor: pointer;">{{room.usRoomNo}}호</label>
                          <label class="text--primary caption mb-1" style="cursor: pointer;">&nbsp;{{room.roomStatTxt}}</label>
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
                            <v-list-item-subtitle style="cursor: pointer" @click="selectGraph(room.usRoomNo)">객실상태그래프</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <div class="text-center white ma-0 pa-0">
                      <v-chip
                        class="ma-0 pa-0 pl-1"
                        color="white"
                        title="제어기센서 전원상태"
                        label>
                        <svg xmlns="http://www.w3.org/2000/svg" :fill="room.powerColor" enable-background="new 0 0 511.718 511.718" width="25" height="25" viewBox="0 0 511.718 511.718" class="svg" src="src/views/svg/power-icon.svg">
                          <path d="M233.272,0.002C104.443,0.002,0,104.443,0,233.271c0,128.835,104.435,233.272,233.272,233.272
                        		c128.833,0,233.274-104.445,233.274-233.272C466.546,104.438,362.105,0.002,233.272,0.002z M209.72,61.401
                        		c0-13.01,10.546-23.552,23.552-23.552c13.01,0,23.55,10.542,23.55,23.552V223.58c0,13.006-10.54,23.554-23.55,23.554
                        		c-13.006,0-23.552-10.548-23.552-23.554V61.401z M233.272,405.56c-91.006,0-165.046-74.05-165.046-165.05
                        		c0-59.038,31.897-113.976,83.247-143.338c11.289-6.45,25.677-2.533,32.141,8.756c6.458,11.289,2.533,25.678-8.756,32.138
                        		c-36.722,21.001-59.528,60.254-59.528,102.444c0,65.036,52.912,117.946,117.942,117.946c65.035,0,117.949-52.91,117.949-117.946
                        		c0-42.19-22.818-81.443-59.539-102.444c-11.293-6.452-15.216-20.843-8.756-32.138c6.464-11.297,20.847-15.214,32.147-8.756
                        		c51.347,29.362,83.246,84.284,83.246,143.338C398.32,331.51,324.287,405.56,233.272,405.56z"/>
                        </svg>
                      </v-chip>
                      <v-chip
                        class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
                        color="white"
                        title="난방모드"
                        label>
                        <v-img
                            :src="require('./svg/'+room.roomModPath)"
                            :aspect-ratio="undefined"
                            width="22"
                            height="22"
                        ></v-img>
                      </v-chip>
                      <v-chip
                        class="ma-0 pa-0 pr-1 pl-1 font-weight-bold"
                        color="white"
                        title="제어기센서 통신상태"
                        label>
                        <v-img
                            :src="require('./svg/'+room.sensorPath)"
                            :aspect-ratio="undefined"
                            width="20"
                            height="20"
                        ></v-img>
                      </v-chip>
                    </div>
                  </v-card-text>
                  <v-card-text class="text-center ma-0 pa-0">
                    <div class="text-center caption blue-grey lighten-5 ma-0 pa-0" style="height:30px">
                      <v-chip
                        class="ma-0 pa-0 caption mr-1"
                        color="#eceff1"
                        title="객실실내온도"
                        label
                        style="height:29px;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#797979" enable-background="new 0 0 511.718 511.718" width="15" height="25" viewBox="0 0 511.718 511.718" class="svg" src="src/views/svg/temperature.svg">
                          <path d="m130.28125 344.214844v-139.960938c0-8.382812-6.796875-15.179687-15.179688-15.179687-8.382812 0-15.175781 6.796875-15.175781 15.179687v139.960938c-22.875 6.601562-39.65625 27.710937-39.65625 52.683594 0 30.234374 24.597657 54.832031 54.832031 54.832031 30.234376 0 54.835938-24.597657 54.835938-54.832031 0-24.972657-16.785156-46.082032-39.65625-52.683594zm-15.179688 77.160156c-13.496093 0-24.476562-10.980469-24.476562-24.476562 0-13.5 10.980469-24.480469 24.476562-24.480469 13.496094 0 24.480469 10.984375 24.480469 24.480469 0 13.496093-10.980469 24.476562-24.480469 24.476562zm0 0"/><path d="m188.351562 308.113281v-234.867187c0-40.386719-32.859374-73.246094-73.25-73.246094-40.386718 0-73.246093 32.859375-73.246093 73.246094v234.867187c-26.347657 21.773438-41.855469 54.398438-41.855469 88.785157 0 63.464843 51.636719 115.101562 115.101562 115.101562 63.46875 0 115.105469-51.636719 115.105469-115.101562 0-34.386719-15.511719-67.011719-41.855469-88.785157zm-73.25 173.53125c-46.726562 0-84.746093-38.019531-84.746093-84.746093 0-27.289063 13.273437-53.078126 35.507812-68.980469 3.984375-2.851563 6.347657-7.449219 6.347657-12.347657v-242.324218c0-23.648438 19.242187-42.890625 42.890624-42.890625 23.652344 0 42.894532 19.242187 42.894532 42.890625v242.324218c0 4.898438 2.363281 9.496094 6.347656 12.347657 22.234375 15.902343 35.507812 41.691406 35.507812 68.980469 0 46.726562-38.019531 84.746093-84.75 84.746093zm0 0"/>
                        </svg>
                        <span class="ma-0 pa-0 ml-n2 font-weight-bold">{{(!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )) ? room.fTroom_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTroom_cur === 255 || room.fTroom_cur === -1 )"><sup>o</sup>C</span></span>
                      </v-chip>
                      <v-chip
                        class="ma-0 pa-0 caption"
                        color="#eceff1"
                        title="객실바닥온도"
                        label
                        style="height:29px;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#797979" enable-background="new 0 0 511.718 511.718" width="15" height="25" viewBox="0 0 511.718 511.718" class="svg" src="src/views/svg/heater.svg">
                          <path d="m123.585938 105.929688h335.449218c29.25 0 52.964844-23.710938 52.964844-52.964844 0-29.25-23.714844-52.964844-52.964844-52.964844h-406.070312c-29.242188.0234375-52.9414065 23.722656-52.964844 52.964844v282.484375c.0234375 29.242187 23.722656 52.941406 52.964844 52.964843h105.933594c9.738281.027344 17.625 7.917969 17.652343 17.65625v52.964844h35.3125v-52.964844c-.023437-29.242187-23.722656-52.945312-52.964843-52.96875h-105.933594c-9.738282-.027343-17.625-7.914062-17.65625-17.652343v-282.484375c.03125-9.738282 7.917968-17.625 17.65625-17.65625h406.070312c9.71875.074218 17.582032 7.9375 17.65625 17.65625-.03125 9.738281-7.917968 17.628906-17.65625 17.65625h-335.449218c-29.234376.042968-52.921876 23.730468-52.964844 52.964844.023437 29.242187 23.722656 52.941406 52.964844 52.964843h335.449218c9.71875.070313 17.582032 7.933594 17.65625 17.65625-.03125 9.738281-7.917968 17.625-17.65625 17.65625h-335.449218c-29.234376.042969-52.921876 23.730469-52.964844 52.964844.023437 29.242187 23.722656 52.941406 52.964844 52.964844h335.449218c9.71875.070312 17.582032 7.933593 17.65625 17.65625-.03125 9.738281-7.917968 17.625-17.65625 17.652343h-97.105468c-29.242188.023438-52.941407 23.726563-52.964844 52.96875v52.964844h35.3125v-52.964844c.027344-9.738281 7.914062-17.628906 17.652344-17.65625h97.105468c29.234375-.042968 52.921875-23.730468 52.964844-52.964843-.023438-29.242188-23.722656-52.945313-52.964844-52.964844h-335.449218c-9.722657-.074219-17.585938-7.933594-17.65625-17.65625.03125-9.738281 7.917968-17.628906 17.65625-17.65625h335.449218c29.234375-.042969 52.921875-23.730469 52.964844-52.964844-.023438-29.242187-23.722656-52.941406-52.964844-52.964843h-335.449218c-9.722657-.070313-17.585938-7.933594-17.65625-17.65625.03125-9.738282 7.917968-17.625 17.65625-17.65625zm0 0"/><path d="m167.722656 467.863281h52.96875c9.75 0 17.652344 7.902344 17.652344 17.652344v8.828125c0 9.75-7.902344 17.65625-17.652344 17.65625h-52.96875c-9.75 0-17.652344-7.90625-17.652344-17.65625v-8.828125c0-9.75 7.902344-17.652344 17.652344-17.652344zm0 0"/><path d="m300.136719 467.863281h52.964843c9.753907 0 17.65625 7.902344 17.65625 17.652344v8.828125c0 9.75-7.902343 17.65625-17.65625 17.65625h-52.964843c-9.75 0-17.652344-7.90625-17.652344-17.65625v-8.828125c0-9.75 7.902344-17.652344 17.652344-17.652344zm0 0"/>
                        </svg>
                        <span class="ma-0 pa-0 ml-1 font-weight-bold">{{!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 ) ? room.fTsurf_cur.toFixed(0) : '&nbsp;&nbsp;-&nbsp;&nbsp;'}}<span v-if="!(room.fTsurf_cur === 255 || room.fTsurf_cur === -1 )"><sup>o</sup>C</span></span>
                      </v-chip>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
                <apexchart type='line' width='1300px' height='200' :options='chartOptionsLine2' :series='series2'/>
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
                                  스케줄러<label v-if="roomStat.MH_SchedulerState === 1">동작</label><label v-if="roomStat.MH_SchedulerState !== 1">정지</label>(그룹번호:{{(roomStat.SchGroupIndex < 255)?roomStat.SchGroupIndex+1:' - '}},현재난방<label v-if="roomStat.SchHeatingStatus === 1">ON</label><label v-if="roomStat.SchHeatingStatus !== 1">OFF</label>)
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
      buttonTimer: null,
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
      todayTxt: this.$moment(new Date().toISOString()).format('DD'),
      tomorrowTxt: this.$moment(new Date().toISOString()).add(1,'days').format('DD'),
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
      curSchedullerTitle: '동작',
      menuItems: ['create file', 'create directory'],
      systemTime: '-',
      beFirst: true,
      envDatas: [],
      mergeDatas: [],
      todayReserved: 0,
      tomorrowReserved: 0,
      refreshLoading: false,
      sessionCnt: 0,
      sessStatColor: '#48bcb4',
      powerColor: '#ddd'
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
    cmdFloorRadCmData () {
      // axios.get(`http://localhost:3000/api/rooms`)
      clearTimeout(this.buttonTimer)
      this.refreshLoading = true;
      axios.get(`${this.$apiRootPath}/rooms/cmdFloorRadCmData`)
        .then((r) => {
          // this.refreshLoading = false;
          // this.getRoomsGroup()
            this.buttonTimer = setTimeout(this.loadingButton, 3000)
        })
        .catch((e) => {
          // this.refreshLoading = false;
          alert(e.message)
          console.error(e.message)
        })
      //
    },
    loadingButton () {
      this.refreshLoading = false;
    },
    getRoomsGroup () {
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}/rooms/groupSchedule`)
        .then((r) => {
          this.groupDatas = JSON.parse(r.data)
          if (this.groupDatas.SchedulerState === 1) {
            this.curSchedullerTitle = '동작'
          } else {
            this.curSchedullerTitle = '정지'
          }
          this.todayReserved = this.groupDatas.OccupiedRoomCnt
          this.tomorrowReserved = this.groupDatas.ReservedRoomCnt
          if(this.groupDatas.SessionState === 4){
            this.sessStatColor = '#48bcb4'
          } else {
            this.sessStatColor = 'red accent-3'
          }
          this.sessionCnt = this.groupDatas.SessionCnt
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
          var boilerColor = 'deep-orange lighten-2'
          var roomStatTxt = '공실'
          var roomModColor = 'light-green accent-2'
          var roomModTxt = '자동'
          var roomModPath = 'auto_Ja.png'
          var sensorPath = 'rs_status_n_e.png'
          var powerColor = '#ddd'
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

          for (var key in this.roomsStats) {
            if(this.roomsStats[key].ucCurStatus === 1){
              boilerColor = 'deep-orange lighten-2'
            } else if (this.roomsStats[key].ucUserSetStatus === 1 && this.roomsStats[key].ucCurStatus === 0){
              boilerColor = 'deep-orange lighten-4'
            }else if (
              !(this.roomsStats[key].ucUserSetStatus === 1 && this.roomsStats[key].ucCurStatus === 0)
              && (this.roomsStats[key].ucCurStatus === 0 || this.roomsStats[key].ucCurStatus === 2)){
              boilerColor = 'blue-grey lighten-5'
            }
            this.roomsStats[key]['boilerColor'] = boilerColor
            if (this.roomsStats[key].ucRoomState === 0 && (this.roomsStats[key].ucTotalStatus % 2 === 0)) {
              roomStatTxt = '공실'
            } else if (this.roomsStats[key].ucRoomState === 1){
              roomStatTxt = '예비'
            } else if (this.roomsStats[key].ucRoomState === 2 && (this.roomsStats[key].ucTotalStatus % 2 === 0)) {
              roomStatTxt = '외출'
            } else if (this.roomsStats[key].ucTotalStatus % 2 === 1){
              roomStatTxt = '재실'
            }
            this.roomsStats[key]['roomStatTxt'] = roomStatTxt

            if (this.roomsStats[key].usManHeatingMode === 0) {
              roomModPath = 'auto_Ja.png'
            } else if (this.roomsStats[key].usManHeatingMode === 1) {
              roomModPath = 'manual_Su.png'
            } else if (this.roomsStats[key].usManHeatingMode === 2) {
              roomModPath = 'stop_Jung.png'
            }
            this.roomsStats[key]['roomModPath'] = roomModPath

            if ( ((this.roomsStats[key].ucTotalStatus & 4) !== 0) &&
                 ((this.roomsStats[key].ucTotalStatus & 8) !== 0) ) {
              sensorPath = 'rs_status_a_e.png'
            } else if ( (this.roomsStats[key].ucTotalStatus & 4) !== 0 ){
              sensorPath = 'rs_status_t_e.png'
            } else if ( (this.roomsStats[key].ucTotalStatus & 8) !== 0 ) {
              sensorPath = 'rs_status_b_e.png'
            }  else {
              sensorPath = 'rs_status_n_e.png'
            }
            this.roomsStats[key]['sensorPath'] = sensorPath
            if ( (this.roomsStats[key].ucTotalStatus & 16) !== 0) {
              powerColor = '#10ac84'
            } else {
              powerColor = '#ddd'
            }
            this.roomsStats[key]['powerColor'] = powerColor
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
    mergeData () {
      var Tout = 0
      var prevTout = 0
      var isFind = false
      var timeValue = 1
      if (this.time.value === 0) {
        timeValue = 1
      } else {
        timeValue = this.time.value
      }
      this.mergeDatas = []
      for (var i = 0; i < this.datas.length; i++) {
        Tout = 0
        isFind = false
        for (var j = 0; j < this.envDatas.length; j++) {
          if (new Date(((this.datas[i].m * timeValue) + (9 * 60 * 60)) * 1000).toISOString().substr(0, 16) === new Date(((this.envDatas[j].m * timeValue) + (9 * 60 * 60)) * 1000).toISOString().substr(0, 16)) {
            Tout = this.envDatas[j].fTout
            prevTout = Tout
            isFind = true
            break;
          }
        }
        if (Tout > 50 || Tout < -50) Tout = 0
        if (isFind !== true){
          this.mergeDatas.push({ 'room': this.datas[i], 'Tout': prevTout })
        } else {
          this.mergeDatas.push({ 'room': this.datas[i], 'Tout': Tout })
        }
      }
    },
    getSiteEnv (roomNo) {
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: startDateTime, endTime: endDateTime, time: this.time.value })
        .then((r) => {
          this.envDatas = r.data
          // alert("getSiteEnv : " + JSON.stringify(this.envDatas))
          this.openRoomGraph(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getSiteEnvSearch (roomNo) {
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/siteEnv`, { startTime: startDateTime, endTime: endDateTime, time: this.time.value })
        .then((r) => {
          this.envDatas = r.data
          // alert("getSiteEnv : " + JSON.stringify(this.envDatas))
          this.getTrendRoomSearch(roomNo)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    selectGraph (roomNum){
      this.roomNo = roomNum
      if (this.beFirst) {
        this.getSiteEnv(roomNum)
      } else {
        this.searchGraph()
      }
      this.beFirst = false
    },
    searchGraph () {
      this.searchloading = true
      this.loading = true
      this.getSiteEnvSearch(this.roomNo)
    },
    getTrendRoomSearch (usRoomNo) {
      // axios.put(`http://localhost:3000/api/rooms/getRoomTrend`, { usRoomNo: usRoomNo, startTime: this.startTime, endTime: this.endTime, time: this.time.value })
      var startDateTime = this.startDate + ' ' + this.startTime
      var endDateTime = this.endDate + ' ' + this.endTime
      axios.put(`${this.$apiRootPath}rooms/getRoomTrend`, { usRoomNo: usRoomNo, startTime: startDateTime, endTime: endDateTime, time: this.time.value })
        .then((r) => {
          this.datas = r.data
          this.mergeData()
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
          var data10 = []
          var data11 = []
          var totalStat = 0
          var date = []
          var nCnt = 0
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '상태 정보'
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push(parseInt(this.mergeDatas[i].room.ucRoomState)+7)
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push(parseInt(this.mergeDatas[i].room.ucSetStatus)+2)
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push(parseInt(this.mergeDatas[i].room.ucCurStatus))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].fTset !== null && this.datas[i].fTset <= 60) {
              data3.push((this.mergeDatas[i].room.fTset).toFixed(2))
            } else {
              data3.push(-2)
            }
            if (this.datas[i].fTsurf_cur !== null && this.datas[i].fTsurf_cur <= 60) {
              data4.push((this.mergeDatas[i].room.fTsurf_cur).toFixed(2))
            } else {
              data4.push(-2)
            }
            if (this.datas[i].fTroom_cur !== null && this.datas[i].fTroom_cur <= 60) {
              data5.push((this.mergeDatas[i].room.fTroom_cur).toFixed(2))
            } else {
              data5.push(-2)
            }
            if (this.datas[i].fTroom_set !== null && this.datas[i].fTroom_set <= 60) {
              data6.push((this.mergeDatas[i].room.fTroom_set).toFixed(2))
            } else {
              data6.push(-2)
            }
            if (this.datas[i].fTsurf_set !== null && this.datas[i].fTsurf_set <= 60) {
              data7.push((this.mergeDatas[i].room.fTsurf_set).toFixed(2))
            } else {
              data7.push(-2)
            }
            if (this.datas[i].usManHeatingMode !== null && this.datas[i].usManHeatingMode <= 60) {
              if (this.datas[i].usManHeatingMode === 0) {
                data8.push(parseInt(this.mergeDatas[i].usManHeatingMode+6))
              } else if (this.datas[i].usManHeatingMode === 1) {
                data8.push(parseInt(this.mergeDatas[i].room.usManHeatingMode+4))
              } else {
                data8.push(parseInt(this.mergeDatas[i].room.usManHeatingMode+2))
              }
            } else {
              data8.push(-2)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur <= 60) {
              data9.push((this.mergeDatas[i].room.fTset_cur).toFixed(2))
            } else {
              data9.push(-2)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur <= 60) {
              data10.push((this.mergeDatas[i].Tout).toFixed(2))
            } else {
              data10.push(-2)
            }
            if (this.datas[i].ucTotalStatus !== null) {
              totalStat = (this.mergeDatas[i].room.ucTotalStatus % 2)
              data11.push(totalStat+7)
            } else {
              data11.push(-2)
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
            },
            {
              name: '외부온도',
              data: data10
            }
          ]
          this.series2 = [
            {
              name: '재실정보',
              data: data11
            },
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
          this.roomGraphModal = true
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
          this.mergeData()
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
          var data10 = []
          var data11 = []
          var totalStat = 0
          var date = []
          var nCnt = 0
          this.graphTitle1 = '온도 정보'
          this.graphTitle2 = '상태 정보'
          for (var i = 0; i < this.datas.length; i++) {
            if (this.datas[i].ucRoomState !== null) {
              data0.push(parseInt(this.mergeDatas[i].room.ucRoomState)+7)
            } else {
              data0.push(-1)
            }
            if (this.datas[i].ucSetStatus !== null) {
              data1.push(parseInt(this.mergeDatas[i].room.ucSetStatus)+2)
            } else {
              data1.push(-1)
            }
            if (this.datas[i].ucCurStatus !== null) {
              data2.push(parseInt(this.mergeDatas[i].room.ucCurStatus))
            } else {
              data2.push(-1)
            }
            if (this.datas[i].fTset !== null && this.datas[i].fTset <= 60) {
              data3.push((this.mergeDatas[i].room.fTset).toFixed(2))
            } else {
              data3.push(-2)
            }
            if (this.datas[i].fTsurf_cur !== null && this.datas[i].fTsurf_cur <= 60) {
              data4.push((this.mergeDatas[i].room.fTsurf_cur).toFixed(2))
            } else {
              data4.push(-2)
            }
            if (this.datas[i].fTroom_cur !== null && this.datas[i].fTroom_cur <= 60) {
              data5.push((this.mergeDatas[i].room.fTroom_cur).toFixed(2))
            } else {
              data5.push(-2)
            }
            if (this.datas[i].fTroom_set !== null && this.datas[i].fTroom_set <= 60) {
              data6.push((this.mergeDatas[i].room.fTroom_set).toFixed(2))
            } else {
              data6.push(-2)
            }
            if (this.datas[i].fTsurf_set !== null && this.datas[i].fTsurf_set <= 60) {
              data7.push((this.mergeDatas[i].room.fTsurf_set).toFixed(2))
            } else {
              data7.push(-2)
            }
            if (this.datas[i].usManHeatingMode !== null && this.datas[i].usManHeatingMode <= 60) {
              if (this.datas[i].usManHeatingMode === 0) {
                data8.push(parseInt(this.mergeDatas[i].usManHeatingMode+6))
              } else if (this.datas[i].usManHeatingMode === 1) {
                data8.push(parseInt(this.mergeDatas[i].room.usManHeatingMode+4))
              } else {
                data8.push(parseInt(this.mergeDatas[i].room.usManHeatingMode+2))
              }
            } else {
              data8.push(-2)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur <= 60) {
              data9.push((this.mergeDatas[i].room.fTset_cur).toFixed(2))
            } else {
              data9.push(-2)
            }
            if (this.datas[i].fTset_cur !== null && this.datas[i].fTset_cur <= 60) {
              data10.push((this.mergeDatas[i].Tout).toFixed(2))
            } else {
              data10.push(-2)
            }
            if (this.datas[i].ucTotalStatus !== null) {
              totalStat = (this.mergeDatas[i].room.ucTotalStatus % 2)
              data11.push(totalStat+7)
            } else {
              data11.push(-2)
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
            },
            {
              name: '외부온도',
              data: data10
            }
          ]
          this.series2 = [
            {
              name: '재실정보',
              data: data11
            },
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
            tooltip: {
              shared: true,
              intersect: false,
              y: [
              {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 7/*12*/) {
                      y = "공실"
                    } else {
                      y = "재실"
                    }
                  }
                  return y;
                }
              },
              {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 4/*12*/) {
                      y = "정지"
                    } else if (y === 5/*12*/) {
                      y = "수동"
                    } else {
                      y = "자동"
                    }
                  }
                  return y;
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 2/*9*/) {
                      y = "정지"
                    } else {
                      y = "가동"
                    }
                  }
                  return y;
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    if (y === 0/*3*/) {
                      y = "정지"
                    } else {
                      y = "가동"
                    }
                  }
                  return y;
                }
              }]
            },
            yaxis: {
              min: 0,
              max: 8,
              tickAmount:8,
              labels: {
                show: true,
                align: 'right',
                minWidth: 50,
                maxWidth: 50,
                formatter: function (value) {
                  var retVal
                  if(typeof value !== "undefined") {
                    retVal = ""
                    switch(value){
                      case 0:
                      case 2:
                      case 4:
                        retVal = "OFF"
                      break;
                      case 1:
                      case 3:
                        retVal = "ON"
                      break;
                      case 5:
                        retVal = "M"
                      break;
                      case 6:
                        retVal = "A"
                      break;
                      case 7:
                        retVal = "E"
                      break;
                      case 8:
                        retVal = "I"
                      break;
                    }
                    return retVal;
                  }
                }
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
