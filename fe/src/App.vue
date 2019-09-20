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
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: '메인',
          to: { path: '/' }
        },
        {
          icon: 'favorite',
          title: '객실예약',
          to: { path: '/rooms' }
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
          title: '이력',
          to: { path: '/history' }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '객실예약시스템'
    }
  }
}
</script>
