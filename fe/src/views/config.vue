<template>
  <v-container fluid>
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
                  <v-list-item-content>System Local:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules" v-model="configs.tAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules" v-model="configs.tAddr.EMSPortNo"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>System Remote:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules" v-model="configs.tRemoteAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules" v-model="configs.tRemoteAddr.EMSPortNo"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>MinPktIntervalSec:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.PacketMinIntervalSec"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>ControlPeriodSec:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.ControlPeriodSec"></v-text-field></v-list-item-content>
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
                              <v-textarea
                                name="input-3-3"
                                filled
                                auto-grow
                                readonly
                                height=110
                                class='ma-0 pa-0'
                                value="OptionValue - MH:1 SCH:2 PD:4 VT:8 PH:16 OS:32 DR:64 DAMP:128, OCCUP:256"
                              ></v-textarea>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Option:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.ControlOption"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>RoomCnt:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.RoomCount"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>UseTsuf:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.UseTsurf"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Troom_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.Troom_set"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.Tsurf_set"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Troom_cr:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.Troom_cr"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_cr:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.Tsurf_cr"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_res:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.Tctrl_res"></v-text-field></v-list-item-content>
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
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPeak.MaxHeatingRoom"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PD_NMaxHR:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPeak.NightMaxHeatingRoom"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>VT_Thigh:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tVariableTemp.HeatingHighTemp"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>VT_Tlow:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tVariableTemp.HeatingLowTemp"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>VT_Tdelta:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>OS_TimeS:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tOptimalStop.OptimalStopTimeSec"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>DR_Temp:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tDemandResponse.DRTemp"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>DR_TimeH:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tDemandResponse.DRTimeHour"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_Opt:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.Option"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_Tavg:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.Tout_avg"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_WFTo:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.WF_Toutdoor"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>PH_WFTdif:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.WF_Tdiff"></v-text-field></v-list-item-content>
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
                              <v-list-item-content class="align-end "><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.ControlOption"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>ZoneCnt:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.ZoneCnt"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>HCMode:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.HCMode"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tzone_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.Tzone_set"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>PPMco2_set:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.PPMco2_set"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Damper AM:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.DamperAutoManual"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Tsurf_res:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.Tctrl_res"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>CO2PeriodSec:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.CO2LoadPeriodSec"></v-text-field></v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                        <br>
                        <v-card>
                        <v-card-title class="subheading font-weight-bold">Occupant Control</v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>Control Mode:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.ControlMode"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_rate_wf:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_rate_wf"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_wf:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_wf"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_empty:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_empty"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_pccupied:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_occupied"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_inc_rate:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_inc_rate"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_dec_rate:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_dec_rate"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_inc_time:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_inc_time"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>CO2_dec_time:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_dec_time"></v-text-field></v-list-item-content>
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
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.DamperCtrlMode"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_set:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_set"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_min:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_min"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_max:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_max"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Rdamp_res:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>NifyInterval:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.NotifyIntervalSec"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>NifyStarHour:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.NotifyStartHour"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>NifyEndHour:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.NotifyEndHour"></v-text-field></v-list-item-content>
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
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.ControlStepValue"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>UserPID:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.PIDCtrlMode"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Kp:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.Kp"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Ki:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.Ki"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Kd:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.Kd"></v-text-field></v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      <br>
                      <center><v-btn color="primary" @click="openDamperSch(1);">DamperSch</v-btn></center>
                      <v-dialog v-model="damperSchModal" persistent max-width="550px">
                        <v-card>
                          <v-card-title>
                            <span class="headline">Damper Control Scheduler</span>
                          </v-card-title>
                          <v-card-text>
                            <v-row align="center">
                              <v-col cols="3">
                                <v-subheader>AhuIndex : </v-subheader>
                              </v-col>
                              <v-col cols="2">
                                <v-select
                                  v-model="damperSchsConfig.AhuIndex"
                                  :items="AhuIndexs"
                                  item-text="AhuIndex"
                                  item-value="AhuIndex"
                                  label="AhuIndex"
                                  persistent-hint
                                  return-object
                                  single-line
                                  width:10px
                                ></v-select>
                              </v-col>
                            </v-row>
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
                                <tr v-for="(item, index) in damperSchsConfig.tSch" :key="item.idx">
                                  <td>{{ index+1 }}</td>
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
                            <v-btn color="blue darken-1" flat @click="applyDamperSch(damperSchsConfig.AhuIndex)">Apply</v-btn>
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
            <v-btn color="blue darken-1" flat @click="applyEmsSysConfig()">Apply</v-btn>
            <v-btn color="blue darken-1" flat @click="getEmsSysConfig()">Cancel</v-btn>
          </v-card-actions>
        </v-row>
      </template>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    mounted () {
      this.getEmsSysConfig()
    },
    data () {
      return {
        select: { AhuIndex: 2},
        AhuIndexs: [
          { AhuIndex: 1 },
          { AhuIndex: 2 },
          { AhuIndex: 3 },
          { AhuIndex: 4 },
          { AhuIndex: 5 },
          { AhuIndex: 6 },
          { AhuIndex: 7 },
          { AhuIndex: 8 },
          { AhuIndex: 9 },
          { AhuIndex: 10 },
          { AhuIndex: 11 },
          { AhuIndex: 12 },
          { AhuIndex: 13 },
          { AhuIndex: 14 },
          { AhuIndex: 15 },
          { AhuIndex: 16 },
          { AhuIndex: 17 },
          { AhuIndex: 18 },
          { AhuIndex: 19 },
          { AhuIndex: 20 },
        ],
        itemsPerPage: 3,
        damperSchModal: false,
        configs:[],
        damperSchsConfig:[],
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
      getEmsSysConfig () {
        axios.get('http://localhost:3000/api/rooms/emsSysConfig')
          .then((r) => {
            this.configs = JSON.parse(r.data)
          })
          .catch((e) => {
            console.error(e.message)
          })
      },
      applyEmsSysConfig () {
        axios.put('http://localhost:3000/api/rooms/emsSysConfig', { configs:this.configs })
          .then((r) => {
            this.getEmsSysConfig()
          })
          .catch((e) => {
            alert(e.message)
            console.error(e.message)
          })
      },
      openDamperSch: function (ahuIndex) {
        axios.get(`http://localhost:3000/api/rooms/damperConfig/${ahuIndex}`)
          .then((r) => {
            // alert("getDamperScheConfig r.data : " + r.data)
            this.damperSchsConfig = JSON.parse(r.data)
          })
          .catch((e) => {
            console.error(e.message)
          })
        this.$data.damperSchModal = true
      },
      applyDamperSch: function (AhuIndex) {
        // alert(JSON.stringify(this.damperSchsConfig))
        axios.put('http://localhost:3000/api/rooms/damperConfig', { damperConfig:this.damperSchsConfig })
          .then((r) => {
            this.openDamperSch(AhuIndex)
          })
          .catch((e) => {
            alert(e.message)
            console.error(e.message)
          })
        // this.$data.damperSchModal = false
      },
      closeDamperSch: function () {
        // alert("closeDamperSch")
        this.$data.damperSchModal = false
      },
    }
  }
</script>
