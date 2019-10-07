<template>
  <v-container fluid>
      <template>
        <v-card>
          <v-tabs
            v-model="tab"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">
              Common Config
            </v-tab>
            <v-tab href="#tab-2">
              FloorRad Config
            </v-tab>
            <v-tab href="#tab-3">
              SolBeach Config
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="i in 3"
              :key="i"
              :value="'tab-' + i"
            >
              <v-card flat v-if='i === 1' max-width="1000" class="mx-auto">
                <v-row>
                  <v-col>
                    <v-list dense>
                    <v-list-item>
                      <v-list-item-content>System Local:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules" v-model="configs.tAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules" v-model="configs.tAddr.PortNo"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>System Remote:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules" v-model="configs.tRemoteAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules" v-model="configs.tRemoteAddr.PortNo"></v-text-field></v-list-item-content>
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
                </v-col>
                <v-col>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>DB Server:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" :rules="rules" v-model="configs.tDataBase.tAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 :rules="rules" v-model="configs.tDataBase.tAddr.PortNo"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>DB Name:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tDataBase.Name"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>ID:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tDataBase.ID"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>PassWd:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tDataBase.PassWd"></v-text-field></v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>SMS ID:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSMS.ID"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>SMS:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSMS.Key"></v-text-field></v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
              </v-card>
              <v-card flat v-if='i === 2'>
                <v-list dense>
                  <v-list-item>
                      <template>
                        <v-row>
                          <v-col>
                            <v-card
                              max-width="400"
                              class="mx-auto">
                            <v-list>
                              <v-card-title class="subheading font-weight-bold">FloorRad Config</v-card-title>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-textarea
                                  name="input-3-3"
                                  filled
                                  auto-grow
                                  readonly
                                  class="overflow-y-auto ma-0 pa-0"
                                  max-height="130"
                                  value="ManualHeating:1 (기본 설정), Scheduler:2 (기본 설정), PeakDemand:4 (최대 난방 수 조절), VariableTemp:8(가변온도), PreHeating:16 (사전난방), DemandResp:64 (부하시간대 온도조절)"
                                ></v-textarea>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Option:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.ControlOption"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>RoomCnt:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.RoomCount"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>UseTsuf:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.UseTsurf"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Troom_set:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Troom_set.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Tsurf_set:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tsurf_set.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Troom_cr:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Troom_cr.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Tsurf_cr:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tsurf_cr.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Tctrl_res:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tctrl_res.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Check In Hour:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.CheckInHour"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>RR_CheckInHour:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.RR_CheckInHour"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>RR_StayHour:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.RR_StayHour"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Tsurf_init:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tsurf_init.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Tset_inc:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tset_init_inc.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col>
                          <v-card
                          max-width="400"
                          class="mx-auto">
                          <v-card-title class="subheading font-weight-bold">Control Para</v-card-title>
                          <v-divider></v-divider>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-title>PD_MaxHR:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPeak.MaxHeatingRoom"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PD_NMaxHR:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPeak.NightMaxHeatingRoom"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>VT_Thigh:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tVariableTemp.HeatingHighTemp.toFixed(2)"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>VT_Tlow:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tVariableTemp.HeatingLowTemp.toFixed(2)"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>VT_Tdelta:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp.toFixed(2)"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>OS_TimeS:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tOptimalStop.OptimalStopTimeSec"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>DR_Temp:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tDemandResponse.DRTemp.toFixed(2)"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>DR_TimeH:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tDemandResponse.DRTimeHour"></v-text-field></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                      <v-col>
                        <v-card
                        max-width="400"
                        class="mx-auto">
                          <v-card-title class="subheading font-weight-bold">Pre Heating Control</v-card-title>
                          <v-divider></v-divider>
                          <v-list dense>
                            <v-list-item>
                              <v-textarea
                                name="input-3-3"
                                filled
                                auto-grow
                                readonly
                                height=100
                                class='ma-0 pa-0'
                                value="1:ML 2:온도기울기통계 4:난방룸 수 8:경부하시간"
                              ></v-textarea>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_Opt:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.Option"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_RR_Opt:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.RerservedRoomOption"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_Tavg:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.Tout_avg.toFixed(2)"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_WFto:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.WF_Toutdoor"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_WFTdf:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.WF_Tdiff"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_STER:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.PH_StartTimeErrRange"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_LL_STE:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tFloorRadConf.tPreHeating.PH_LowLoadStartTimeErrRange"></v-text-field></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card>
                        <br>
                        <v-card
                          max-width="400"
                          class="mx-auto">
                          <v-list>
                            <v-card-title class="subheading font-weight-bold">User Telephones</v-card-title>
                            <v-divider></v-divider>
                            <v-list-item>
                              <v-list-item-title>TelNo_1:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber0"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>TelNo_2:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber1"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>TelNo_3:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber2"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>TelNo_4:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber3"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>TelNo_5:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber4"></v-text-field></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                      </v-row>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
                <v-card flat v-if='i === 3'>
                  <v-list dense>
                    <v-list-item>
                        <template>
                          <v-row>
                            <v-col>
                              <v-card>
                              <v-list dense>
                                <v-card-title class="subheading font-weight-bold">SolBeach Config</v-card-title>
                                <v-divider></v-divider>
                                <v-list-item>
                                  <v-textarea
                                    name="input-3-3"
                                    filled
                                    auto-grow
                                    readonly
                                    height=100
                                    class='ma-0 pa-0'
                                    value="DamperCtrl:128 (외부환기비율), OccupantCtrl:256(재실자 판단)"
                                  ></v-textarea>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Option:</v-list-item-title>
                                  <v-list-item-title class="align-end "><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.ControlOption"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>ZoneCnt:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.ZoneCnt"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>HCMode:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.HCMode"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Tzone_set:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.Tzone_set.toFixed(2)"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>PPMco2_set:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.PPMco2_set"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Damper AM:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.DamperAutoManual"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Tctrl_res:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.Tctrl_res.toFixed(2)"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>CO2PeriodSec:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.CO2LoadPeriodSec"></v-text-field></v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                          <v-col>
                            <v-card>
                              <v-card-title class="subheading font-weight-bold">Damper Control</v-card-title>
                              <v-divider></v-divider>
                              <v-list dense>
                                <v-list-item>
                                  <v-textarea
                                    name="input-3-3"
                                    filled
                                    auto-grow
                                    readonly
                                    height=100
                                    class='ma-0 pa-0'
                                    value="Nt:1 Ctrl:2 CtrlNt:6 sch:8"
                                  ></v-textarea>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Control Mode:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.DamperCtrlMode"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Rdamp_set:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_set.toFixed(2)"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Rdamp_min:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_min.toFixed(2)"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Rdamp_max:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_max.toFixed(2)"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>Rdamp_res:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res.toFixed(2)"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>NifyInterval:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.NotifyIntervalSec"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>NifyStarHour:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.NotifyStartHour"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>NifyEndHour:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tRdamp.NotifyEndHour"></v-text-field></v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-card>
                            <br>
                            <center><v-btn color="primary" @click="openDamperSch(1)">DamperSch</v-btn></center>
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
                                        v-model="select"
                                        :items="AhuIndexs"
                                        item-text="AhuIndex"
                                        item-value="AhuIndex"
                                        label="AhuIndex"
                                        persistent-hint
                                        return-object
                                        single-line
                                        width:10px
                                        @change="openDamperSch(select.AhuIndex)"
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
                          <v-col>
                            <v-card>
                            <v-card-title class="subheading font-weight-bold">Occupant Control</v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-item>
                                <v-textarea
                                  name="input-3-3"
                                  filled
                                  auto-grow
                                  readonly
                                  height=100
                                  class='ma-0 pa-0'
                                  value="Ntfy:1 CtrlFan:2"
                                ></v-textarea>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Control Mode:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.ControlMode"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_rate_wf:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_rate_wf"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_wf:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_wf"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_empty:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_empty"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_occupied:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_occupied"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_inc_rate:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_inc_rate"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_dec_rate:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_dec_rate"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_inc_time:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_inc_time"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_dec_time:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tC02Conf.PPMco2_dec_time"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col>
                          <v-card>
                            <v-card-title class="subheading font-weight-bold">PID Control</v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title>CtrlStepValue:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.ControlStepValue"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>UserPID:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.PIDCtrlMode"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Kp:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.Kp.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Ki:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.Ki.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Kd:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 :rules="rules" v-model="configs.tSolBeachConf.tPID.Kd.toFixed(2)"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                          <br>
                          <v-card
                            max-width="400"
                            class="mx-auto">
                            <v-list>
                              <v-card-title class="subheading font-weight-bold">User Telephones</v-card-title>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-title>TelNo_1:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber0"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>TelNo_2:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber1"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>TelNo_3:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber2"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>TelNo_4:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber3"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>TelNo_5:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber4"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        </v-row>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="applyEmsSysConfig()">Apply</v-btn>
                  <v-btn color="blue darken-1" flat @click="getEmsSysConfig()">Cancel</v-btn>
                </v-card-actions>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
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
      tab: null,
      select: { AhuIndex: 1 },
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
        { AhuIndex: 20 }
      ],
      itemsPerPage: 3,
      damperSchModal: false,
      configs: [],
      damperSchsConfig: [],
      rules: [
        value => !!value || '',
        value => (value || '').length <= 20 || 'Max 20 characters'
        // value => {
        //   const pattern = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.) +[a-zA-Z]{2,}))$/
        //   return pattern.test(value) || 'Invalid e-mail.'
        // },
      ]
    }
  },
  methods: {
    getEmsSysConfig () {
      axios.get(`http://localhost:3000/api/rooms/emsSysConfig`)
      // axios.get(`${this.$apiRootPath}rooms/emsSysConfig`)
        .then((r) => {
          // alert("emsSysConfig r.data : " + JSON.parse(r.data))
          this.configs = JSON.parse(r.data)
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
    },
    applyEmsSysConfig () {
      axios.put(`http://localhost:3000/api/rooms/emsSysConfig`, { configs: this.configs })
      // axios.put(`${this.$apiRootPath}rooms/emsSysConfig`, { configs: this.configs })
        .then((r) => {
          this.getEmsSysConfig()
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
    },
    openDamperSch: function (ahuIndex) {
      axios.get(`http://localhost:3000/api/rooms/damperConfig/${ahuIndex}`)
      // axios.get(`${this.$apiRootPath}rooms/damperConfig/${ahuIndex}`)
        .then((r) => {
          this.damperSchsConfig = JSON.parse(r.data)
          this.select = { AhuIndex : this.damperSchsConfig.AhuIndex }
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
      this.$data.damperSchModal = true
    },
    applyDamperSch: function (AhuIndex) {
      // alert(JSON.stringify(this.damperSchsConfig))
      axios.put(`http://localhost:3000/api/rooms/damperConfig`, { damperConfig: this.damperSchsConfig })
      // axios.put(`${this.$apiRootPath}rooms/damperConfig`, { damperConfig: this.damperSchsConfig })
        .then((r) => {
          this.openDamperSch(AhuIndex)
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
    },
    closeDamperSch: function () {
      // alert("closeDamperSch")
      this.$data.damperSchModal = false
    }
  }
}
</script>
