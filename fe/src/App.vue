<template>
 <v-app>
   <v-navigation-drawer
   persistent
   :mini-variant="miniVariant"
   :clipped="clipped"
   v-model="drawer"
   enable-resize-watcher
   fixed
    app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
          value="true"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to">
            <v-list-item-title>
              <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="subitem in subItems"
            :to="subitem.to"
          >
            <v-list-item-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span></span>
    </v-footer>
    <v-dialog v-model="alarmModal" persistent max-width="400px">
      <v-card class="ma-0 pa-1">
        <v-card-title>
          <span class="headline">알람팝업창</span>
        </v-card-title>
        <v-card-text class="ma-1 pa-1">
          <v-simple-table dense class="elevation-3">
            <tbody>
              <tr>
                <td width="120px" style="border-right: 1px solid lightgrey;">알람발생시간</td>
                <td>{{alram.Time}}</td>
              </tr>
              <!-- <tr>
                <td>사이트정보</td>
                <td>{{alram.SiteInfo}}</td>
              </tr>
              <tr>
                <td style="border-right: 1px solid lightgrey;">발생구역</td>
                <td>{{alram.Module}}</td>
              </tr> -->
              <tr>
                <td style="border-right: 1px solid lightgrey;">알람등급</td>
                <td>
                  <v-card
                    v-if="this.alram.Level === 1"
                    class="d-inline-flex ma-1 pa-1"
                    color="red lighten-1"
                    outlined
                  >
                    <div>Critical</div>
                  </v-card>
                  <v-card
                    v-if="this.alram.Level === 2"
                    class="d-inline-flex ma-1 pa-1"
                    color="orange accent-2"
                    outlined
                  >
                    <div>Major</div>
                  </v-card>
                  <v-card
                    v-if="this.alram.Level === 3"
                    class="d-inline-flex ma-1 pa-1"
                    color="yellow lighten-3"
                    outlined
                  >
                    <div>Minor</div>
                  </v-card>
                  <v-card
                    v-if="this.alram.Level === 4"
                    class="d-inline-flex ma-1 pa-1"
                    outlined
                  >
                    <div>Information</div>
                  </v-card>
                  <div v-if="this.alram.Level === 0">&nbsp;-&nbsp;</div>
                </td>
              </tr>
              <tr>
                <td style="border-right: 1px solid lightgrey;">알람내역</td>
                <td>{{alram.szContent}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="alarmModal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      alarmModal: false,
      clipped: false,
      drawer: true,
      fixed: false,
      timer: '',
      alram: {},
      items: [],
      subItems: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '객실예약시스템'
    }
  },
  mounted () {
    this.getSiteInfo()
  },
  created () {
    this.getAlarm()
    this.timer = setInterval(this.getAlarm, 5000)
  },
  methods: {
    getSiteInfo () {
      // axios.get(`http://localhost:3000/api/rooms/getSiteInfo`)
      axios.get(`${this.$apiRootPath}rooms/getSiteInfo`)
        .then((r) => {
          if (r.data.siteInfo === 1) {
            document.title = "객실 관리 EMS"
            this.items = [
              {
                icon: 'favorite',
                title: '설정',
                to: { path: '/emsSysConfig' }
              },
              {
                icon: 'favorite',
                title: '객실상태',
                to: { path: '/rooms' }
              },
              {
                icon: 'favorite',
                title: '스케쥴관리',
                to: { path: '/groupSchedule' }
              },
              {
                icon: 'help',
                title: '트랜드',
                to: { path: '/roomTrend' }
              }
            ]
            this.subItems = [
              {
                icon: 'help',
                title: '객실상태그래프',
                to: { path: '/roomTrend' }
              },
              {
                icon: 'help',
                title: '통계그래프',
                to: { path: '/roomAvgTrend' }
              }
            ]
          } else {
            document.title = "HVAC EMS"
            this.items = [
              {
                icon: 'favorite',
                title: '설정',
                to: { path: '/emsSysConfig' }
              },
              {
                icon: 'favorite',
                title: '공조기상태',
                to: { path: '/ahusStat' }
              },
              {
                icon: 'favorite',
                title: '공조기설정',
                to: { path: '/ahusConfig' }
              },
              {
                icon: 'help',
                title: '트랜드',
                to: { path: '/ahuTrend' }
              }
            ]
            this.subItems = [
              {
                icon: 'help',
                title: '공조기상태그래프',
                to: { path: '/ahuTrend' }
              },
              {
                icon: 'help',
                title: '통계그래프',
                to: { path: '/ahuAvgTrend' }
              }
            ]
          }
        })
        .catch((e) => {
          // alert(e.message)
          console.error(e.message)
        })
    },
    getAlarm () {
      // axios.get(`http://localhost:3000/api/rooms/getAlarm`)
      axios.get(`${this.$apiRootPath}rooms/getAlarm`)
        .then((r) => {
          if (r.data !== '' && r.data !== null && !r.data.beChecked) {
            this.alram = r.data
            this.alram.Time = this.$moment(new Date(this.alram.Time * 1000).toISOString()).format('YYYY/MM/DD/ kk:mm:ss')
            this.alarmModal = true
          }
        })
        .catch((e) => {
          // alert(e.message)
          clearInterval(this.myVar)
          console.error(e.message)
        })
    }
  }
}
</script>
