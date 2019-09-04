<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="2"
            lg="2"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">Common Config</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>EMS Local:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>EMS Remote:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>MinPktIntervalSec:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>ControlPeriodSec:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-textarea
                    name="input-3-3"
                    filled
                    auto-grow
                    value="OptionValue MH:1 SCH:2 PD:4 VT:8 PH:16 OS:32 DR:64 DAMP:12"
                  ></v-textarea>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="5"
            lg="5"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">FloorRad Config</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                    <template>
                      <v-row>
                        <v-col><v-card>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content>Option:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>RoomCnt:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>UseTsuf:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Troom_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Troom_cr:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_cr:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_res:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                      <v-col><v-card>
                        <v-card-title class="subheading font-weight-bold">Control Para</v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>PD_MaxHR:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PD_NMaxHR:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>VT_Thigh:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>VT_Tlow:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>VT_Tdelta:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>OS_TimeS:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>DR_Temp:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>DR_TimeH:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_Opt:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_Tavg:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_WFTo:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_WFTdif:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                    </v-row>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="5"
            lg="5"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">SolBeach Config</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                    <template>
                      <v-row>
                        <v-col>
                          <v-card>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content>Option:</v-list-item-content>
                              <v-list-item-content class="align-end "><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>ZoneCnt:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>HCMode:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tzone_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>PPMco2_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Damper AM:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_res:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                        <br>
                        <v-card>
                        <v-card-title class="subheading font-weight-bold">PID Control</v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>CtrlStepValue:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>UserPID:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Kp:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Ki:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Kd:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      </v-col>
                      <v-col><v-card>
                        <v-card-title class="subheading font-weight-bold">Damper Control</v-card-title>
                        <v-divider></v-divider><br>
                        <p class="text-center">Nt:1 Ctr:2 CtrlNt:6 sch:8</p>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>Control Mode:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_set:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_min:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_max:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_res:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>NifyInterval:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>NifyStarHour:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>NifyEndHour:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      <br>
                      <center><v-btn color="primary" @click="openDamperSch();">DamperSch</v-btn></center>
                      <v-dialog v-model="damperSchModal" persistent max-width="550px">
                        <v-card>
                          <v-card-title>
                            <span class="headline">Damper Control Scheduler</span>
                          </v-card-title>
                          <v-card-text>
                            <v-simple-table>
                              <thead>
                                <tr>
                                  <th class="text-left" width="60px">Step</th>
                                  <th class="text-left">Hour</th>
                                  <th class="text-left">Minute</th>
                                  <th class="text-left">Ratio(0~100)</th>
                                  <th class="text-left">Ctrl Mode</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in damperSchs" :key="item.idx">
                                  <td>{{ item.idx }}</td>
                                  <td><input type="text" v-model="item.Hour" size="3" maxlength="3" ></td>
                                  <td><input type="text" v-model="item.Min" size="3" maxlength="3" ></td>
                                  <td><input type="text" v-model="item.Ratio" size="3" maxlength="3" ></td>
                                  <td><input type="text" v-model="item.Mode" size="3" maxlength="3" ></td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="applyDamperSch()">Apply</v-btn>
                            <v-btn color="blue darken-1" flat @click="closeDamperSch()">Cancel</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                    </v-row>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="applyDamperSch()">Apply</v-btn>
            <v-btn color="blue darken-1" flat @click="closeDamperSch()">Cancel</v-btn>
          </v-card-actions>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        itemsPerPage: 3,
        damperSchModal: false,
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%',
          },
        ],
        damperSchs: [
          {
            idx: 1,
            Hour: 1,
            Min: 1,
            Ratio: 1,
            Mode: 1,
          },
          {
            idx: 2,
            Hour: 2,
            Min: 2,
            Ratio: 2,
            Mode: 2,
          },
          {
            idx: 3,
            Hour: 3,
            Min: 3,
            Ratio: 3,
            Mode: 3,
          },
          {
            idx: 4,
            Hour: 4,
            Min: 4,
            Ratio: 4,
            Mode: 4,
          },
          {
            idx: 5,
            Hour: 5,
            Min: 5,
            Ratio: 5,
            Mode: 5,
          },
          {
            idx: 6,
            Hour: 6,
            Min: 6,
            Ratio: 6,
            Mode: 6,
          },
          {
            idx: 7,
            Hour: 7,
            Min: 7,
            Ratio: 7,
            Mode: 7,
          },
          {
            idx: 8,
            Hour: 8,
            Min: 8,
            Ratio: 8,
            Mode: 8,
          },
          {
            idx: 9,
            Hour: 9,
            Min: 9,
            Ratio: 9,
            Mode: 9,
          },
          {
            idx: 10,
            Hour: 10,
            Min: 10,
            Ratio: 10,
            Mode: 10,
          },
          {
            idx: 11,
            Hour: 11,
            Min: 11,
            Ratio: 11,
            Mode: 11,
          },
          {
            idx: 12,
            Hour: 12,
            Min: 12,
            Ratio: 12,
            Mode: 12,
          },
        ],
        rules: [
          value => !!value || '',
          value => (value || '').length <= 20 || 'Max 20 characters',
          // value => {
          //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          //   return pattern.test(value) || 'Invalid e-mail.'
          // },
        ],
      }
    },
    methods: {
      openDamperSch: function () {
        alert("openDamperSch")
        this.$data.damperSchModal = true
      },
      applyDamperSch: function () {
        alert("applyDamperSch")
        this.$data.damperSchModal = false
      },
      closeDamperSch: function () {
        alert("closeDamperSch")
        this.$data.damperSchModal = false
      },
    }
  }
</script>
