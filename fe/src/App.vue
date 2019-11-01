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
      <v-card>
        <v-card-title>
          <span class="headline">알람팝업창</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <tbody>
              <tr>
                <td width="120px">알람발생시간</td>
                <td>{{alram.Time}}</td>
              </tr>
              <tr>
                <td>사이트정보</td>
                <td>{{alram.SiteInfo}}</td>
              </tr>
              <tr>
                <td>발생구역</td>
                <td>{{alram.Module}}</td>
              </tr>
              <tr>
                <td>알람등급</td>
                <td>
                  <v-card
                    v-if="this.alram.Level === 1"
                    class="d-inline-flex ma-1 pa-1"
                    color="red lighten-1"
                    outlined
                  >
                    <div>Critica</div>
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
                  <v-card
                    v-if="this.alram.Level === 0"
                    class="d-inline-flex  ma-0 pa-0"
                    outlined
                  >
                    <div> - </div>
                  </v-card>
                </td>
              </tr>
              <tr>
                <td>알람내역</td>
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
      items: [
        {
          icon: 'bubble_chart',
          title: '메인',
          to: { path: '/' }
        },
        {
          icon: 'favorite',
          title: '객실상태',
          to: { path: '/rooms' }
        },
        {
          icon: 'favorite',
          title: '객실설정',
          to: { path: '/roomsConfig' }
        },
        {
          icon: 'favorite',
          title: '설정',
          to: { path: '/emsSysConfig' }
        },
        {
          icon: 'favorite',
          title: '공조기설정',
          to: { path: '/ahusConfig' }
        },
        {
          icon: 'help',
          title: '트랜드',
          to: { path: '/trend' }
        },
        {
          icon: 'help',
          title: '쏠트랜드',
          to: { path: '/solTrend' }
        },
        {
          icon: 'help',
          title: '이력',
          to: { path: '/history' }
        }
      ],
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
                title: '객실설정',
                to: { path: '/roomsConfig' }
              },
              {
                icon: 'help',
                title: '트랜드',
                to: { path: '/trend' }
              }
            ]
          } else {
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
                title: '쏠트랜드',
                to: { path: '/solTrend' }
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
