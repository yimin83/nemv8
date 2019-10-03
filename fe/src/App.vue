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
      <span>&copy;2017</span>
    </v-footer>
    <v-dialog v-model="alarmModal" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">알람팝업창</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left" width="120px">Step</th>
                <th class="text-left">Hour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Time</td>
                <td>{{alram.Time}}</td>
              </tr>
              <tr>
                <td>Seq</td>
                <td>{{alram.Seq}}</td>
              </tr>
              <tr>
                <td>SiteInfo</td>
                <td>{{alram.SiteInfo}}</td>
              </tr>
              <tr>
                <td>Module</td>
                <td>{{alram.Module}}</td>
              </tr>
              <tr>
                <td>Level</td>
                <td>{{alram.Level}}</td>
              </tr>
              <tr>
                <td>ModuleIndex</td>
                <td>{{alram.ModuleIndex}}</td>
              </tr>
              <tr>
                <td>szContent</td>
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
      alram:{},
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
      // this.getAlarm()
      // this.timer = setInterval(this.getAlarm, 5000)
  },
  methods: {
    getStart(){
      this.myVar = setInterval(getAlarm, 1000);
    },
    getSiteInfo() {
      axios.get(`${this.$apiRootPath}rooms/getSiteInfo`)
        .then((r) => {
          if(r.data.siteInfo == 1) {
            this.items = [
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
          alert(e.message)
          console.error(e.message)
        })
    },
    getAlarm() {
      axios.get(`${this.$apiRootPath}rooms/getAlarm`)
        .then((r) => {
          if(r.data != "" && r.data != null && !r.data.beChecked){
            this.alram = r.data
            this.alram.Time = this.$moment(new Date(this.alram.Time).toISOString()).format('YYYY/MM/DD/ HH/MM/SS')
            this.alarmModal= true
          }
        })
        .catch((e) => {
          alert(e.message)
          clearInterval(this.myVar);
          console.error(e.message)
        })
    },
  }
}
</script>
