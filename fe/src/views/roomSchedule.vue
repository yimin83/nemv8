<template>
  <v-container grid-list-md>
    <v-layout row wrap width="100%" justify="center">
      <v-bottom-navigation
        :value="activeBtn"
        grow
        dark
        color="white"
      >
        <v-btn @click="clickTab(0)">
          <span class="body-1">난방그룹설정</span>
        </v-btn>
        <v-btn @click="clickTab(1)">
          <span class="body-1">난방시간설정</span>
        </v-btn>
      </v-bottom-navigation>
      <v-card width="100%" justify="center">
        <div v-if="this.activeBtn === 0" class="ml-1">
          <v-row justify="center">
            <template v-for='group in curGroups'>
              <v-col>
                <v-card
                  class="ma-0 pa-0"
                  dense
                  max-width="300"
                  min-width="300">
                  <v-toolbar dark dense icons-and-text>
                    <span>{{scheGrupsName[group.groupIdx]}}그룹</span>
                    <v-toolbar-items>
                      <v-btn class="ml-n2" icon dark @click="openGroup(group.groupIdx)">
                        <v-icon small> mdi-settings</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text class="ma-0">
                    <v-row class="ma-0 pa-0">
                      <template
                        v-for='(roomIdx, i) in group.groupRoomIdxs'>
                        <v-col class="ma-0 pa-0" cols="3">
                          <v-list-item
                            class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                            <v-list-item-action class="mt-0 pt-0">
                              <v-checkbox
                                v-model="group.groupRoomUses[i]"
                                v-bind:false-value = "0"
                                v-bind:true-value = "1"
                                color="primary"
                                class="ma-0 pa-0"
                                dense
                                @change=""
                              ></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                              <v-list-item-subtitle class="ma-0 pa-0">
                                <label>{{roomNos[roomIdx]}}</label>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </template>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </div>
        <center>
        <div v-if="this.activeBtn === 1" class="ml-1 text-center " justify="center" style="width:900px;justify-content: center;">
          <v-row justify="center">
            <v-col>
              <v-simple-table dense class="ma-0 pa-0 text-center " style="width:900px;justify-content: center;" justify="center">
                <thead>
                  <tr class="ma-0 pa-0">
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column right-bold-border" style="border-bottom:2px solid lightgrey;"><b>구분</b></th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">1그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">2그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">3그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">4그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">5그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">6그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">7그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">8그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">9그룹</th>
                    <th class="ma-0 pa-0 pt-2 text-center black--text config-column" style="width:80px;border-bottom:2px solid lightgrey;">10그룹</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, i) in scheduleDatas" class="ma-0 pa-0">
                    <td class="ma-0 pa-0 config-column text-center  right-bold-border">
                      <label class="ma-0 pa-0">{{i}}시 ~ {{i+1}}시</label>
                    </td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[0]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[1]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[2]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[3]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[4]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[5]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[6]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[7]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[8]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                        ></v-checkbox></td>
                    <td class="ma-0 pa-0 config-column">
                      <v-checkbox
                        v-model="data[9]"
                        v-bind:false-value = "0"
                        v-bind:true-value = "1"
                        dense
                        hide-details
                        class="ma-0 ml-2 pa-0"
                        style="justify-content: center;"
                      ></v-checkbox>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="saveLoading" :disabled="loading" class="d-flex" @click="saveTimeSchedule()">저장</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </div>
        </center>
        <v-card-actions>
          <v-spacer></v-spacer>
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
          value="19/12/01 00:00"
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
          value="19/12/01 00:00"
          type="time"
          style="max-width:100px"></v-text-field>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <v-btn v-if="this.activeBtn === 0" :loading="saveLoading" :disabled="loading" class="d-flex" @click="saveSchedule()">저장</v-btn>
          <v-btn :loading="startLoading" :disabled="loading" class="d-flex" @click="startSchedule()">구동</v-btn>
          <v-btn :loading="stopLoading" :disabled="loading" class="d-flex" @click="stopSchedule()">정지</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model='settingGroupModal' persistent width="600px" >
        <v-card  class="scroll-y">
          <v-toolbar dark icons-and-text>
            <v-toolbar-title>{{groupTitle}}그룹 설정</v-col>
            </v-row>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="closeGroup()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-row class="ma-0 pa-0">
              <template
                v-for='(room, i) in curGroupRooms'>
                <v-col v-if="i<13" class="ma-0 pa-0" cols="6" sm="2">
                  <v-list-item
                    class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                    <v-list-item-action class="mt-0 pt-0">
                      <v-checkbox
                        v-model="room.roomExist"
                        color="primary"
                        class="ma-0 pa-0"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                      <v-list-item-subtitle class="ma-0 pa-0">
                        <label>{{roomNos[room.roomIdx]}}</label>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </template>
            </v-row>
            <v-row class="ma-0 pa-0">
              <template
                v-for='(room, i) in curGroupRooms'>
                <v-col v-if="i > 12 && i < 38" class="ma-0 pa-0" cols="6" sm="2">
                  <v-list-item
                    class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                    <v-list-item-action class="mt-0 pt-0">
                      <v-checkbox
                        v-model="room.roomExist"
                        color="primary"
                        class="ma-0 pa-0"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                      <v-list-item-subtitle class="ma-0 pa-0">
                        <label>{{roomNos[room.roomIdx]}}</label>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </template>
            </v-row>
            <v-row class="ma-0 pa-0">
              <template
                v-for='(room, i) in curGroupRooms'>
                <v-col v-if="i > 37 && i < 64" class="ma-0 pa-0" cols="6" sm="2">
                  <v-list-item
                    class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                    <v-list-item-action class="mt-0 pt-0">
                      <v-checkbox
                        v-model="room.roomExist"
                        color="primary"
                        class="ma-0 pa-0"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                      <v-list-item-subtitle class="ma-0 pa-0">
                        <label>{{roomNos[room.roomIdx]}}</label>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </template>
            </v-row>
            <v-row class="ma-0 pa-0">
              <template
                v-for='(room, i) in curGroupRooms'>
                <v-col v-if="i > 63 && i < 91" class="ma-0 pa-0" cols="6" sm="2">
                  <v-list-item
                    class="ma-0 mr-1 mb-n3 pa-0 pt-0">
                    <v-list-item-action class="mt-0 pt-0">
                      <v-checkbox
                        v-model="room.roomExist"
                        color="primary"
                        class="ma-0 pa-0"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="pl-0 pt-0 pb-0 mt-n3 mb-0 ml-n8">
                      <v-list-item-subtitle class="ma-0 pa-0">
                        <label>{{roomNos[room.roomIdx]}}</label>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="d-flex" :disabled="loading"  @click='clearAllGrpCheck()'>전체선택해제</v-btn>
            <v-btn class="d-flex" :loading="saveloading" :disabled="loading"  @click='saveGroup()'>저장</v-btn>
            <v-btn class="d-flex" :loading="closeloading" :disabled="loading"  @click='closeGroup()'>취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<style>
.config-column {
  font-size: medium;
  font-weight: bold;
  border: 1px solid lightgrey;
}
.right-bold-border {
  border-right: 2px solid lightgrey;
}
.bottom-border {
  border-bottom:4px solid lightgrey;
}
</style>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getRoomsGroup()
  },
  data: function () {
    return {
      activeBtn: 0,
      scheGrupsName: ['1','2','3','4','5','6','7','8','9','10'],
      scheGrups: [
        {value:0, name:'1'},
        {value:1, name:'2'},
        {value:2, name:'3'},
        {value:3, name:'4'},
        {value:4, name:'5'},
        {value:5, name:'6'},
        {value:6, name:'7'},
        {value:7, name:'8'},
        {value:8, name:'9'},
        {value:9, name:'10'},
        {value:255, name:'-'}
      ],
      roomNos: [
        '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213',
        '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325',
        '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '520', '521', '522', '523', '524', '525', '526',
        '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627'],
      curGroups: [], // vue 화면에서 표시하기 쉽게 변형된 전체 그룹정보
      groupDatas: [], // be로 전송할 난방설정 json 데이터(난방그룹의 저장, 구동시 사용)
      groupMemDatas: [], // be로 전송할 난방설정 json 데이터(난방그룹의 저장, 구동시 사용)
      curGroupRooms: [], // vue 화면에서 표시하기 쉽게 변형된 그룹소속 객실 정보
      curGroupIdx: 0,
      srcScheduleDatas: [], // be로 전송할 난방시간설정 json 데이터
      scheduleDatas: [], // vue 화면에서 표시하기 쉽게 변형된 난방시간설정 정보
      startLoading: false,
      stopLoading: false,
      saveloading: false,
      stopLoading: false,
      loading: false,
      settingGroupModal: false,
      groupTitle:0,
      startMenu:false,
      startDate: new Date().toISOString().substr(0, 10),
      startTime: '',
      endMenu:false,
      endDate: new Date().toISOString().substr(0, 10),
      endTime: ''
    }
  },
  methods: {
    getRoomsGroup () {
      // axios.get(`http://localhost:3000/api/rooms`)
      axios.get(`${this.$apiRootPath}/rooms/groupSchedule`)
        .then((r) => {
          var tmpTime
          this.groupDatas = JSON.parse(r.data)
          this.groupMemDatas = JSON.parse(r.data)
          this.startDate = this.groupDatas.StartTime !== 0 ? this.$moment(new Date(this.groupDatas.StartTime * 1000).toISOString()).format('YYYY-MM-DD') : '0000-00-00'
          this.startTime = this.groupDatas.StartTime !== 0 ? this.$moment(new Date(this.groupDatas.StartTime * 1000).toISOString()).format('HH:mm') : '00:00'
          this.endDate = this.groupDatas.EndTime !== 0 ? this.$moment(new Date(this.groupDatas.EndTime * 1000).toISOString()).format('YYYY-MM-DD') : '0000-00-00'
          this.endTime = this.groupDatas.EndTime !== 0 ? this.$moment(new Date(this.groupDatas.EndTime * 1000).toISOString()).format('HH:mm') : '00:00'
          // this.groupDatas.GroupIndex = [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
          // this.groupDatas.Use = [0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0]
          this.refreshGroupForVue()
          // alert(JSON.stringify(this.curGroups))
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    refreshGroupForVue() {
      var groupRoomIdxs = []
      var groupRoomUses = []
      this.curGroups = []
      for (var i = 0; i < 10; i++) {
        groupRoomIdxs = []
        groupRoomUses = []
        for (var key in this.groupDatas.GroupIndex) {
          if (i === this.groupDatas.GroupIndex[key]){
            groupRoomIdxs.push(key)
            groupRoomUses.push(this.groupDatas.Use[key])
          }
        }
        this.curGroups.push({ 'groupIdx':i, 'groupRoomIdxs':groupRoomIdxs, 'groupRoomUses':groupRoomUses })
      }
    },
    makeSaveScheduleGroup(){
      // this.curGroups.push({ 'groupIdx':i, 'groupRoomIdxs':groupRoomIdxs, 'groupRoomUses':groupRoomUses })
      for (var grpKey in this.groupDatas.GroupIndex){
        for (var curGrpKey in this.curGroups){
          for (var curGrpRoomIdxkey in this.curGroups[curGrpKey].groupRoomIdxs) {
            if(grpKey === this.curGroups[curGrpKey].groupRoomIdxs[curGrpRoomIdxkey]){
              this.groupDatas.GroupIndex[grpKey] = this.curGroups[curGrpKey].groupIdx
              this.groupDatas.Use[grpKey] = this.curGroups[curGrpKey].groupRoomUses[curGrpRoomIdxkey]
              break;
            }
          }
        }
      }
      var nStartDate = Math.round((new Date(this.startDate + " " + this.startTime).getTime()) / 1000)
      var nEndDate = Math.round((new Date(this.endDate + " " + this.endTime).getTime()) / 1000)
      this.groupDatas.StartTime = nStartDate
      this.groupDatas.EndTime = nEndDate
      alert(JSON.stringify(this.groupDatas))
    },
    openGroup(grpId) {
      this.groupTitle = parseInt(grpId + 1)
      this.curGroupIdx = grpId
      var roomIdx = []
      var roomUse = []
      var roomExist = []
      this.curGroupRooms = []
      for (var key in this.groupDatas.GroupIndex) {
        roomIdx = key
        if (grpId === this.groupDatas.GroupIndex[key]){
          roomExist = 1
        } else {
          roomExist = 0
        }
        this.curGroupRooms.push({'roomIdx':roomIdx, 'roomExist':roomExist })
      }
      this.settingGroupModal = true
    },
    clearAllGrpCheck() {
      for (var key in this.curGroupRooms) {
        this.curGroupRooms[key].roomExist = false
      }
    },
    saveGroup() {
      for (var key in this.curGroupRooms) {
        if (this.curGroupRooms[key].roomExist === 1 || this.curGroupRooms[key].roomExist === true){
          if (this.groupMemDatas.GroupIndex[key] !== this.curGroupIdx) {
            this.groupMemDatas.GroupIndex[key] = this.curGroupIdx
            this.groupMemDatas.Use[key] = 0
          }
        } else if (this.curGroupRooms[key].roomExist !== 1 && (this.groupMemDatas.GroupIndex[key] === this.curGroupIdx)) {
          this.groupMemDatas.GroupIndex[key] = 255
          this.groupMemDatas.Use[key] = 0
        }
      }
      axios.put(`${this.$apiRootPath}rooms/groupSchedule`, { config: this.groupMemDatas })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getRoomsGroup()
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    closeGroup() {
      this.settingGroupModal = false
    },
    makeSchedulerGroupForVue() {
      var hourData = []
      this.scheduleDatas = []
      for (var i = 0; i < 24; i++){
        hourData = []
        for (var key in this.srcScheduleDatas) {
          hourData.push(this.srcScheduleDatas[key][i])
        }
        this.scheduleDatas.push(hourData)
      }
      // alert(JSON.stringify(this.scheduleDatas))
    },
    makeSchedulerGroupForEMS() {
      var hourData = []
      for (var i = 0; i < 10; i++ ) {
        for (var key in this.scheduleDatas) {
          this.srcScheduleDatas['HeatingState'+i][key] = this.scheduleDatas[key][i]
        }
      }
      // alert(JSON.stringify(this.srcScheduleDatas))
    },
    getSchedule() {
      axios.get(`${this.$apiRootPath}/rooms/timeSchedule`)
        .then((r) => {
          this.srcScheduleDatas = JSON.parse(r.data)
          this.makeSchedulerGroupForVue()
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    saveTimeSchedule() {
      this.makeSchedulerGroupForEMS();
      axios.put(`${this.$apiRootPath}rooms/timeSchedule`, { config: this.srcScheduleDatas })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getSchedule()
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    changeTab () {
      if (this.activeBtn === 0) {
        this.getRoomsGroup()
      } else {
        this.getSchedule()
      }
    },
    clickTab (act) {
      this.activeBtn = act
      this.changeTab()
    },
    saveSchedule() {
      alert("saveSchedule")
      this.groupDatas.SchedulerSate = 2
      this.makeSaveScheduleGroup();
    },
    startSchedule() {
      alert("startSchedule")
      this.groupDatas.SchedulerSate = 1
      this.makeSaveScheduleGroup();
    },
    stopSchedule() {
      alert("stopSchedule")
      this.groupDatas.SchedulerSate = 0
      this.makeSaveScheduleGroup();
    }
  }
}
</script>
