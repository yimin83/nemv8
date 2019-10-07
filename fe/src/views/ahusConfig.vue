<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <template>
        <v-row>
          <v-col>
            <v-card
              class="mx-auto"
              max-width="300"
            >
              <v-list
                shaped
                class="overflow-y-auto"
                max-height="600">
                <template
                v-for="(ahuNo, i) in ahuNos">
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
                  </v-list-item>
                  <v-list-item >
                    <v-list-item-action class="ma-0 pa-0">
                      <v-checkbox
                        v-model="ahuNo.beChecked"
                        color="primary"
                        @change="selectCheckBox(ahuNo.value)"
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content class="ma-0 pa-0">
                      <v-list-item-subtitle>
                        {{ahuNo.name}}
                      </v-list-item-subtitle>
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
              <v-card-title class="subheading font-weight-bold">공조기 설정</v-card-title>
              <v-divider class='my-0'></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title>AhuIndex:</v-list-item-title>
                  <v-list-item-title class="align-end">{{datas.AhuIndex}}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>NotifyOccupantsState:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.NotifyOccupantsState"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>HCMode:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.HCMode"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>FanAutoManual:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.FanAutoManual"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>DamperAutoManual:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.DamperAutoManual"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Tzone_set:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.Tzone_set"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Rdamp_set:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.Rdamp_set"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>PPMco2_set:</v-list-item-title>
                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="datas.PPMco2_set"></v-text-field></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Desc:</v-list-item-title>
                  <v-list-item-title class="align-end">
                    <v-text-field height=13 v-model="datas.Desc"></v-text-field>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color='blue darken-1' flat @click='saveAhuConfig()'>저장</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </template>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    this.getAhus()
  },
  data () {
    return {
      ahuNos: [],
      ahuData: [],
      datas: [],
      beAll: false,
      curAhuId: 1
    }
  },
  methods: {
    getAhus () {
      axios.get(`http://localhost:3000/api/rooms/ahusConfig`)
      // axios.get(`${this.$apiRootPath}rooms/ahusConfig`)
        .then((r) => {
          this.ahuNos = []
          for (var key in r.data) {
            if (r.data.hasOwnProperty(key)) {
              this.ahuNos.push({ 'name': r.data[key].ahu_desc + '(' + r.data[key].ahu_name + ')', 'value': r.data[key].ahu_id, 'beChecked': (r.data[key].ahu_id === this.curAhuId) })
            }
          }
          this.getAhuConfig(this.curAhuId)
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    getAhuConfig (ahuNo) {
      axios.get(`http://localhost:3000/api/rooms/ahusConfig/${ahuNo}`)
      // axios.get(`${this.$apiRootPath}rooms/ahusConfig/${ahuNo}`)
        .then((r) => {
          this.datas = JSON.parse(r.data)
          // alert("getAhuConfig : " + JSON.stringify(this.datas))
        })
        .catch((e) => {
          alert(e.message)
          console.error(e.message)
        })
    },
    saveAhuConfig: function () {
      var ahuIdxs = []
      for (var key in this.ahuNos) {
        if (this.ahuNos[key].beChecked) {
          ahuIdxs.push(this.ahuNos[key].value)
        }
      }
      axios.put(`http://localhost:3000/api/rooms/ahusConfig`, { config: this.datas, ahuIdxs: ahuIdxs })
      // axios.put(`${this.$apiRootPath}rooms/ahusConfig`, { config: this.data, ahuIdxs: ahuIdxs })
        .then((r) => {
          // this.$data.settingRoomModal = false
          this.getAhuConfig(this.curAhuId)
        })
        .catch((e) => {
          alert(e.message)
          console.log(e.message)
        })
    },
    selectCheckBox (ahuId) {
      this.curAhuId = ahuId
      for (var key in this.ahuNos) {
        if (this.ahuNos[key].value === ahuId && this.ahuNos[key].beChecked) {
          this.getAhuConfig(ahuId)
          break
        }
      }
    },
    allCheckBox () {
      for (var key in this.ahuNos) {
        this.ahuNos[key].beChecked = this.beAll
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
