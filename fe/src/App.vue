<template>
 <v-app>
   <v-system-bar
      :height="60"
      :lights-out="lightsOut"
      fixed
      color="#22242a"
      dark
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
      <span style="color:white;">{{title}}</span>
    </v-system-bar>
   <v-navigation-drawer
   persistent
   :mini-variant="miniVariant"
   :clipped="clipped"
   v-model="drawer"
   enable-resize-watcher
   fixed
   color="#2f323a"
   dark
   app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="text--accent-4"
          value="true"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to">
            <v-list-item-title>
              <v-list-tile-action>
                  <!--
                  <font-awesome-icon :icon="['fab', 'whmcs']" />
                  <font-awesome-icon :icon="['fas', 'clock']" />
                  <font-awesome-icon :icon="['fas', 'chart-line']" />
                	<font-awesome-icon :icon="['fas', 'mouse-pointer']" />
                  <font-awesome-icon :icon="['fas', 'wrench']" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#aeb2b7" id="power_home" enable-background="new 0 0 511.718 511.718" height="15" viewBox="0 0 511.718 511.718" width="15" class="svg" src="static/svg/power_home.svg">
                    <path d="m255.859 0-255.176 209.198 19.02 23.2 15.993-13.112v292.432h440.164v-292.566l16.157 13.246 19.02-23.2zm-15 182.205h30v136.157h-30zm15 246.986c-61.112 0-110.83-49.718-110.83-110.829 0-44.641 26.568-84.723 67.685-102.114l11.687 27.631c-29.992 12.686-49.372 41.922-49.372 74.483 0 44.569 36.26 80.829 80.83 80.829s80.83-36.26 80.83-80.829c0-33.423-20.083-62.947-51.165-75.217l11.016-27.904c20.452 8.074 37.905 21.927 50.471 40.062 12.873 18.578 19.678 40.384 19.678 63.06 0 61.11-49.718 110.828-110.83 110.828z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#aeb2b7" id="Capa_1" enable-background="new 0 0 511.718 511.718" height="15" viewBox="0 0 511.718 511.718" width="15" class="svg" src="static/svg/fan_home.svg">
                    <path d="m294.102 347.399 32.332 74.904c.097.062.225.112.395.133.438.066.654-.157.756-.26l53.799-53.799c.102-.103.314-.314.26-.756-.021-.17-.071-.298-.133-.395l-74.904-32.332c-3.57 4.725-7.781 8.936-12.505 12.505z"/>
                    <path d="m184.889 170.868c-.438-.066-.654.157-.756.26l-53.799 53.799c-.102.103-.314.314-.26.756.021.17.071.298.133.395l74.904 32.332c3.569-4.724 7.78-8.935 12.504-12.504l-32.332-74.904c-.096-.063-.224-.114-.394-.134z"/>
                    <path d="m205.112 334.895-74.904 32.332c-.062.097-.112.225-.133.395-.066.438.157.654.26.756l53.799 53.799c.103.102.314.314.756.26.17-.021.298-.071.395-.133l32.332-74.904c-4.725-3.57-8.936-7.781-12.505-12.505z"/>
                    <circle cx="255.859" cy="296.652" r="33.574"/>
                    <path d="m327.585 171.128c-.103-.103-.32-.326-.756-.26-.17.021-.298.071-.395.133l-32.332 74.904c4.724 3.569 8.935 7.78 12.504 12.504l74.904-32.332c.062-.097.112-.225.133-.395.055-.441-.158-.653-.26-.756z"/>
                    <path d="m255.859 0-255.176 209.198 19.02 23.2 15.993-13.112v292.432h440.164v-292.566l16.157 13.246 19.02-23.2zm63.574 296.652c0 3.65-.326 7.223-.92 10.707l77.302 33.367.864.521c8.205 4.939 13.579 13.224 14.742 22.73s-2.054 18.842-8.825 25.613l-53.799 53.799c-6.771 6.772-16.108 9.988-25.613 8.825-9.507-1.163-17.791-6.537-22.73-14.742l-.521-.864-.399-.927-32.968-76.375c-3.484.594-7.057.92-10.707.92s-7.223-.326-10.707-.92l-33.367 77.302-.521.864c-4.939 8.205-13.224 13.579-22.73 14.742s-18.842-2.054-25.613-8.825l-53.799-53.799c-6.772-6.771-9.988-16.108-8.825-25.613 1.163-9.507 6.537-17.791 14.742-22.73l.864-.521.927-.399 76.375-32.968c-.594-3.484-.92-7.057-.92-10.707s.326-7.223.92-10.707l-77.302-33.367-.864-.521c-8.205-4.939-13.579-13.224-14.742-22.73s2.054-18.842 8.825-25.613l53.799-53.799c6.771-6.772 16.108-9.988 25.613-8.825 9.507 1.163 17.791 6.537 22.73 14.742l.521.864.399.927 32.968 76.375c3.484-.594 7.057-.92 10.707-.92s7.223.326 10.707.92l33.367-77.302.521-.864c4.939-8.205 13.224-13.579 22.73-14.742 9.509-1.168 18.842 2.054 25.613 8.825l53.799 53.799c6.771 6.771 9.988 16.107 8.825 25.613-1.163 9.507-6.537 17.791-14.742 22.73l-.864.521-.927.399-76.375 32.968c.594 3.483.92 7.057.92 10.707z"/>
                  </svg>-->
                  <font-awesome-icon :icon="[item.con1, item.con2]"/>&nbsp;&nbsp;
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title color="grey" v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="subitem in subItems"
            :to="subitem.to"
          >
            <v-list-item-tile-action>
              &nbsp;&nbsp;&nbsp;&nbsp;<font-awesome-icon :icon="[subitem.con1, subitem.con2]"/>&nbsp;&nbsp;
            </v-list-item-tile-action>
            <v-list-item-content>
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-card
            color="#2f323a"
            text-color="#797979"
            width="180px"
            class="text-xs-center ma-4 ml-7 mr-8"
            style="border:1px solid grey;"
            outlined>
            <v-card-title class="ma-0 pa-2 body-2 font-weight-bol" style="color:#797979;font-weight:bold;">외기 정보</v-card-title>
             <v-card-text class="text-center ma-0 pa-0">
               <div v-if="nForecastIcons === 8" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/sun.svg" width="60px" fill="white">
                     <path d="M256,121c-74.443,0-135,60.557-135,135s60.557,135,135,135s135-60.557,135-135S330.443,121,256,121z"/>
                     <path d="M256,91c8.291,0,15-6.709,15-15V15c0-8.291-6.709-15-15-15s-15,6.709-15,15v61C241,84.291,247.709,91,256,91z"/>
                     <path d="M256,421c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15v-61C271,427.709,264.291,421,256,421z"/>
                     <path d="M173.266,95.438c3.169,7.659,11.973,11.273,19.6,8.115c7.646-3.164,11.279-11.953,8.115-19.6l-11.484-27.715   c-3.164-7.661-11.968-11.221-19.6-8.115c-7.646,3.164-11.279,11.953-8.115,19.6L173.266,95.438z"/>
                     <path d="M338.734,416.562c-3.164-7.661-11.953-11.235-19.6-8.115c-7.646,3.164-11.279,11.953-8.115,19.6l11.484,27.715   c3.169,7.659,11.973,11.273,19.6,8.115c7.646-3.164,11.279-11.953,8.115-19.6L338.734,416.562z"/>
                     <path d="M319.135,103.554c7.627,3.158,16.431-0.456,19.6-8.115l11.484-27.715c3.164-7.646-0.469-16.436-8.115-19.6   c-7.603-3.12-16.421,0.454-19.6,8.115L311.02,83.954C307.855,91.601,311.488,100.39,319.135,103.554z"/>
                     <path d="M192.865,408.446c-7.617-3.135-16.436,0.454-19.6,8.115l-11.484,27.715c-3.164,7.646,0.469,16.436,8.115,19.6   c7.627,3.158,16.431-0.456,19.6-8.115l11.484-27.715C204.145,420.399,200.512,411.61,192.865,408.446z"/>
                     <path d="M91,256c0-8.291-6.709-15-15-15H15c-8.291,0-15,6.709-15,15s6.709,15,15,15h61C84.291,271,91,264.291,91,256z"/>
                     <path d="M497,241h-61c-8.291,0-15,6.709-15,15s6.709,15,15,15h61c8.291,0,15-6.709,15-15S505.291,241,497,241z"/>
                     <path d="M118.114,139.325c5.86,5.86,15.351,5.86,21.211,0c5.859-5.859,5.859-15.352,0-21.211L96.903,75.692   c-5.859-5.859-15.352-5.859-21.211,0s-5.859,15.352,0,21.211L118.114,139.325z"/>
                     <path d="M393.886,372.675c-5.859-5.859-15.352-5.859-21.211,0s-5.859,15.352,0,21.211l42.422,42.422   c5.86,5.86,15.351,5.86,21.211,0c5.859-5.859,5.859-15.352,0-21.211L393.886,372.675z"/>
                     <path d="M118.114,372.675l-42.422,42.422c-5.859,5.859-5.859,15.352,0,21.211c5.86,5.86,15.351,5.86,21.211,0l42.422-42.422   c5.859-5.859,5.859-15.352,0-21.211S123.974,366.815,118.114,372.675z"/>
                     <path d="M393.886,139.325l42.422-42.422c5.859-5.859,5.859-15.352,0-21.211s-15.352-5.859-21.211,0l-42.422,42.422   c-5.859,5.859-5.859,15.352,0,21.211C378.534,145.185,388.026,145.185,393.886,139.325z"/>
                     <path d="M103.554,319.135c-3.179-7.646-11.997-11.25-19.6-8.115l-27.715,11.484c-7.646,3.164-11.279,11.953-8.115,19.6   c3.169,7.659,11.973,11.273,19.6,8.115l27.715-11.484C103.085,335.57,106.718,326.781,103.554,319.135z"/>
                     <path d="M408.446,192.865c3.169,7.659,11.973,11.273,19.6,8.115l27.715-11.484c7.646-3.164,11.279-11.953,8.115-19.6   c-3.149-7.646-11.997-11.265-19.6-8.115l-27.715,11.484C408.915,176.43,405.282,185.219,408.446,192.865z"/>
                     <path d="M455.761,322.504l-27.715-11.484c-7.588-3.149-16.436,0.469-19.6,8.115s0.469,16.436,8.115,19.6l27.715,11.484   c7.627,3.158,16.431-0.456,19.6-8.115C467.04,334.457,463.407,325.668,455.761,322.504z"/>
                     <path d="M56.239,189.496l27.715,11.484c7.627,3.158,16.431-0.456,19.6-8.115c3.164-7.646-0.469-16.436-8.115-19.6l-27.715-11.484   c-7.588-3.164-16.436,0.454-19.6,8.115C44.96,177.543,48.593,186.332,56.239,189.496z"/>
                   </svg>
               </div>
               <div v-if="nForecastIcons === 2" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/partly cloudy.svg" width="60px" fill="white">
                     <path d="M391.016,135.059c-5.829-49.336-47.791-87.605-98.695-87.605c-33.184,0-62.556,16.272-80.607,41.262
                   		c2.108-0.081,4.223-0.127,6.349-0.127c74.519,0,138.462,50.218,157.487,120.164c21.304,4.704,40.866,15.374,56.667,31.173
                   		c1.403,1.403,2.764,2.836,4.085,4.297C447.852,232.648,455,216.682,455,199.04C455,163.704,426.352,135.059,391.016,135.059z"/>
                   	<path d="M350.359,236.02c-7.814-66.133-64.062-117.431-132.296-117.431c-68.234,0-124.482,51.298-132.296,117.431
                   		C38.402,236.02,0,274.417,0,321.783s38.397,85.763,85.763,85.763h264.601c47.366,0,85.763-38.397,85.763-85.763
                   		S397.725,236.02,350.359,236.02z"/>
                   </svg>
               </div>
               <div v-if="nForecastIcons === 6 || nForecastIcons === 7" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/mostly cloudy.svg" width="60px" fill="white">
                     <g>
                     	<path d="M291.171,316.527C274.105,279.848,237.353,256,196,256s-78.105,23.848-95.171,60.527C48.49,310.888,0,353.075,0,406   c0,49.629,41.371,90,91,90h210c49.629,0,90-40.371,90-90C391,353.075,343.48,310.902,291.171,316.527z"/>
                     	<path d="M368.515,166.308c18.94,1.307,36.572,7.628,52.291,16.978C420.83,182.518,421,181.769,421,181c0-41.353-33.647-75-75-75   c-13.694,0-26.499,4.12-37.767,10.734C332.551,126.971,353.718,144.046,368.515,166.308z"/>
                     	<g>
                     		<path d="M346,76c-8.291,0-15-6.709-15-15V31c0-8.291,6.709-15,15-15s15,6.709,15,15v30C361,69.291,354.291,76,346,76z"/>
                     	</g>
                     	<g>
                     		<path d="M497,196h-30c-8.291,0-15-6.709-15-15s6.709-15,15-15h30c8.291,0,15,6.709,15,15S505.291,196,497,196z"/>
                     	</g>
                     	<g>
                     		<path d="M430.858,111.142c-3.838,0-7.676-1.465-10.605-4.395c-5.859-5.859-5.859-15.352,0-21.211l21.211-21.211    c5.859-5.859,15.352-5.859,21.211,0s5.859,15.352,0,21.211l-21.211,21.211C438.534,109.677,434.696,111.142,430.858,111.142z"/>
                     	</g>
                     	<g>
                     		<path d="M261.142,111.142c-3.838,0-7.676-1.465-10.605-4.395l-21.211-21.211c-5.859-5.859-5.859-15.352,0-21.211    s15.352-5.859,21.211,0l21.211,21.211c5.859,5.859,5.859,15.352,0,21.211C268.817,109.677,264.979,111.142,261.142,111.142z"/>
                     	</g>
                     	<path d="M351.171,196.527C334.105,159.848,297.353,136,256,136s-78.105,23.848-95.171,60.527   c-52.288-5.588-101.964,36.887-99.509,93.495c7.178-1.919,14.583-3.212,22.165-3.73C108.212,249.13,150.473,226,196,226   s87.803,23.13,112.515,60.293c45.861,3.144,85.551,33.301,102.988,74.139C435.315,344.224,451,316.917,451,286   C451,233.075,403.451,190.946,351.171,196.527z"/>
                     </g>
                   </svg>
               </div>
               <div v-if="nForecastIcons === 3" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/rainy.svg" width="60px" fill="white">
                     <path d="M166,421c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15v-61C181,427.709,174.291,421,166,421z"/>
                   	<path d="M286,421c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15v-61C301,427.709,294.291,421,286,421z"/>
                   	<path d="M406,421c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15v-61C421,427.709,414.291,421,406,421z"/>
                   	<path d="M46,421c-8.291,0-15,6.709-15,15v61c0,8.291,6.709,15,15,15s15-6.709,15-15v-61C61,427.709,54.291,421,46,421z"/>
                   	<path d="M321.171,180.527C304.105,143.848,267.353,120,226,120s-78.105,23.848-95.171,60.527C78.49,174.888,31,217.075,31,270   c0,39.058,25.155,72.047,60,84.47V406c0,8.291,6.709,15,15,15s15-6.709,15-15v-46h90v46c0,8.291,6.709,15,15,15s15-6.709,15-15v-46   h90v46c0,8.291,6.709,15,15,15s15-6.709,15-15v-51.528c34.845-12.424,60-45.414,60-84.472   C421,217.075,373.48,174.902,321.171,180.527z"/>
                   	<path d="M381.171,60.527C364.105,23.848,327.353,0,286,0s-78.105,23.848-95.171,60.527c-52.288-5.588-101.964,36.887-99.509,93.495   c7.178-1.919,14.583-3.212,22.165-3.73C138.212,113.13,180.473,90,226,90s87.803,23.13,112.515,60.293   c45.861,3.144,85.551,33.301,102.988,74.139C465.315,208.224,481,180.917,481,150C481,97.075,433.451,54.946,381.171,60.527z"/>
                   </svg>
               </div>
               <div v-if="nForecastIcons === 18" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/snowy.svg" width="60px" fill="white">
                     <path d="M321.187,181.527C304.122,144.848,267.369,121,226.016,121s-78.105,23.848-95.171,60.527   c-52.339-5.64-99.829,36.548-99.829,89.473c0,49.629,40.371,90,90,90h210c49.629,0,90-40.371,90-90   C421.016,218.075,373.497,175.902,321.187,181.527z"/>
                   	<path d="M381.187,61.527C364.122,24.848,327.369,0,286.016,0s-78.105,24.848-95.171,61.527   c-52.287-5.589-101.963,36.887-99.509,93.495c7.178-1.919,14.583-3.212,22.165-3.73C138.228,114.13,180.489,91,226.016,91   s87.803,23.13,112.515,60.293c45.861,3.144,85.551,33.301,102.988,74.139c23.813-16.208,39.498-43.515,39.498-74.432   C481.016,98.075,433.467,55.946,381.187,61.527z"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -259.0996 101.974)" cx="45.988" cy="497" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -240.4267 166.261)" cx="165.988" cy="497" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -221.7537 230.5481)" cx="285.988" cy="497" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -225.6555 127.1151)" cx="105.988" cy="452" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -206.9825 191.4022)" cx="225.988" cy="452" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -188.3096 255.6893)" cx="345.988" cy="452" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -203.0808 294.8352)" cx="405.988" cy="497" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -210.8843 87.9692)" cx="45.988" cy="407" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -192.2113 152.2563)" cx="165.988" cy="407" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -173.5384 216.5434)" cx="285.988" cy="407" rx="15" ry="14.999"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -154.8654 280.8305)" cx="405.988" cy="407" rx="15" ry="14.999"/>
                   </svg>
               </div>
               <div v-if="nForecastIcons === 19" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/rainy_snowy.svg" width="60px" fill="white">
                     <ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -254.4185 118.0348)" cx="75.988" cy="496.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -240.4154 166.2476)" cx="165.988" cy="496.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -226.4122 214.4604)" cx="255.988" cy="496.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -212.4091 262.6732)" cx="345.988" cy="496.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -237.3136 86.9268)" cx="30.988" cy="451.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -223.3105 135.1396)" cx="120.988" cy="451.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -209.3074 183.3524)" cx="210.988" cy="451.999" rx="15" ry="15"/>
                   	<ellipse transform="matrix(0.8444 -0.5357 0.5357 0.8444 -195.3042 231.5653)" cx="300.988" cy="451.999" rx="15" ry="15"/>
                   	<path d="M336.187,181.527C319.122,144.848,282.369,121,241.016,121s-78.105,23.848-95.171,60.527   c-52.339-5.64-99.829,36.548-99.829,89.473c0,27.299,12.473,51.497,31.725,68.016l-30.143,60.275   c-3.706,7.412-0.703,16.421,6.709,20.127c7.487,3.718,16.441,0.642,20.127-6.709l29.022-58.033   c10.126,3.955,21.05,6.324,32.56,6.324h20.728l-19.146,38.291c-3.706,7.412-0.703,16.421,6.709,20.127   c7.487,3.718,16.441,0.642,20.127-6.709L190.289,361h56.455l-19.146,38.291c-3.706,7.412-0.703,16.421,6.709,20.127   c7.487,3.718,16.441,0.642,20.127-6.709L280.289,361h56.455l-19.146,38.291c-3.706,7.412-0.703,16.421,6.709,20.127   c7.487,3.718,16.441,0.642,20.127-6.709l28.072-56.146c36.649-11.391,63.51-45.214,63.51-85.563   C436.016,218.075,388.497,175.902,336.187,181.527z"/>
                   	<path d="M396.187,61.527C379.122,24.848,342.369,0,301.016,0s-78.105,24.848-95.171,61.527   c-52.288-5.588-101.964,36.887-99.509,93.495c7.178-1.919,14.583-3.212,22.165-3.73C153.228,114.13,195.489,91,241.016,91   s87.803,23.13,112.515,60.293c45.861,3.144,85.551,33.301,102.988,74.139c23.813-16.208,39.498-43.515,39.498-74.432   C496.016,98.075,448.467,55.946,396.187,61.527z"/>
                   </svg>
               </div>
               <div v-if="nForecastIcons === 255" class="text-center ma-0 pa-0">
                   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 511.718 511.718" viewBox="0 0 511.718 511.718" class="svg" src="static/svg/cloud.svg" width="60px" fill="white">
                     <path id="CloudApp" d="M19.123,77.442l-0.006,0.021h0.46c0.238,0.011,0.473,0.037,0.713,0.037c0.242,0,0.476-0.026,0.714-0.037
                   		h45.104v-0.012c0.33,0.012,0.651,0.049,0.983,0.049C79.743,77.5,90,67.16,90,54.406c0-12.756-10.257-23.095-22.909-23.095
                   		c-0.466,0-0.923,0.042-1.383,0.07C63.742,20.643,54.421,12.5,43.198,12.5c-12.651,0-22.908,10.34-22.908,23.095
                   		c0,0.335,0.036,0.664,0.05,0.996c-0.017,0-0.032-0.002-0.05-0.002C9.085,36.589,0,45.747,0,57.044
                   		C0,67.944,8.464,76.829,19.123,77.442z"/>
                   </svg>
               </div>
               <div class="text-center ma-0 pa-2">
                 <v-row>
                   <v-col class='ma-0 pa-0 ml-3 subheading font-weight-bol' cols="12" sm="6">
                     <font-awesome-icon :icon="['fas', 'temperature-high']" color="#4ecdc4" class="ma-0 pa-0 mr-2" /><label style="color:#4ecdc4;" >{{fTout}}ºC</label>
                   </v-col>
                   <v-col class='ma-0 pa-0 subheading font-weight-bol'>
                     <font-awesome-icon :icon="['fas', 'tint']" color="#4ecdc4" class="ma-0 pa-0 mr-2" /><label style="color:#4ecdc4;" >{{fHout}}%</label>
                   </v-col>
                   </v-row>
               </div>
            </v-card-text>
          </v-card>
        </div>
      </template>
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
      lightsOut: false,
      window: false,
      alarmModal: false,
      clipped: false,
      drawer: true,
      fixed: false,
      timer: '',
      alram: {},
      datas: {},
      items: [],
      subItems: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '객실제어시스템',
      fTout: 15,
      fHout: 95,
      nForecastIcons: 8,
    }
  },
  mounted () {
    this.getSiteInfo()
  },
  created () {
    this.getAlarm()
    this.timer = setInterval(this.getAlarm, 5000)
    this.getTemps()
    this.tempTimer = setInterval(this.getTemps, 3000)
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
                con1:'fab',
                con2:'whmcs',
                to: { path: '/emsSysConfig' }
              },
              {
                icon: 'favorite',
                title: '객실상태',
                con1:'fas',
                con2:'clipboard-list',
                to: { path: '/rooms' }
              },
              {
                icon: 'favorite',
                title: '스케쥴관리',
                con1:'fas',
                con2:'clock',
                to: { path: '/groupSchedule' }
              },
              {
                icon: 'help',
                title: '트랜드',
                con1:'fas',
                con2:'chart-line',
                to: { path: '/roomTrend' }
              }
            ]
            this.subItems = [
              {
                icon: 'help',
                title: '객실상태그래프',
                con1:'fas',
                con2:'chart-line',
                to: { path: '/roomTrend' }
              },
              {
                icon: 'help',
                title: '통계그래프',
                con1:'fas',
                con2:'chart-line',
                to: { path: '/roomAvgTrend' }
              }
            ]
          } else {
            document.title = "HVAC EMS"
            this.items = [
              {
                icon: 'favorite',
                title: '설정',
                con1:'fab',
                con2:'whmcs',
                to: { path: '/emsSysConfig' }
              },
              {
                icon: 'favorite',
                title: '공조기상태',
                con1:'fas',
                con2:'mouse-pointer',
                to: { path: '/ahusStat' }
              },
              {
                icon: 'favorite',
                title: '공조기설정',
                con1:'fas',
                con2:'wrench',
                to: { path: '/ahusConfig' }
              },
              {
                icon: 'help',
                title: '트랜드',
                con1:'fas',
                con2:'chart-line',
                to: { path: '/ahuTrend' }
              }
            ]
            this.subItems = [
              {
                icon: 'help',
                title: '공조기상태그래프',
                con1:'fas',
                con2:'chart-line',
                to: { path: '/ahuTrend' }
              },
              {
                icon: 'help',
                title: '통계그래프',
                con1:'fas',
                con2:'chart-line',
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
          clearInterval(this.timer)
          console.error(e.message)
        })
    },
    getTemps () {
      axios.get(`${this.$apiRootPath}rooms/getTemps`)
        .then((r) => {
          this.fTout = r.data[0].fTout
          this.fHout = r.data[0].fHout
          this.nForecastIcons = r.data[0].nForecastIcons
        })
        .catch((e) => {
          // alert(e.message)
          clearInterval(this.tempTimer)
          console.error(e.message)
        })
    }

  }
}
</script>
