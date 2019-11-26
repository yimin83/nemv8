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
              일반 설정
            </v-tab>
            <v-tab v-if="configs.SiteInfo === 1" href="#tab-2">
              바닥난방 설정
            </v-tab>
            <v-tab v-if="configs.SiteInfo === 2" href="#tab-3">
              공조기 설정
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
                      <v-list-item-content>SiteInfo:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 v-model="configs.SiteInfo" readonly></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>시스템주소:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" v-model="configs.tAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 v-model="configs.tAddr.PortNo"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>원격지주소:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" v-model="configs.tRemoteAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 v-model="configs.tRemoteAddr.PortNo"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>최소패킷간격(초):</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 v-model="configs.PacketMinIntervalSec"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>제어주기(초):</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 v-model="configs.ControlPeriodSec"></v-text-field></v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>DB 서버:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 label="IP Addr" v-model="configs.tDataBase.tAddr.IpAddress"></v-text-field><v-text-field label="PortNo" height=13 v-model="configs.tDataBase.tAddr.PortNo"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>DB 이름:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 v-model="configs.tDataBase.Name"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>ID:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 v-model="configs.tDataBase.ID"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>비밀번호:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field password height=13 v-model="configs.tDataBase.PassWd"></v-text-field></v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>SMS ID:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field height=13 v-model="configs.tSMS.ID"></v-text-field></v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>SMS 키값:</v-list-item-content>
                      <v-list-item-content class="align-end"><v-text-field passwd height=13 v-model="configs.tSMS.Key"></v-text-field></v-list-item-content>
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
                              <v-card-title class="subheading font-weight-bold">바닥난방</v-card-title>
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
                                <v-list-item-title>제어옵션:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.ControlOption"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>객실 수:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.RoomCnt"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>바닥온도 사용:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.UseTsurf"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>바닥온도 설정값:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tsurf_set"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>바닥온도 제어범위:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tsurf_cr"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>실내온도 설정값 :</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Troom_set"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>실내온도 제어범위:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Troom_cr"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>제어온도 최소단위:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.Tctrl_res"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>입실시간:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.CheckInHour"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>예비객실 거주시간:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.RR_StayHour"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>구동옵션:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.OperationOption"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>난방상태변화 최소시간(초):</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.MinStateChagneTimeSec"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>온도증가통계 사용:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.CalTempInc"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col>
                          <v-card
                          max-width="400"
                          class="mx-auto">
                          <v-card-title class="subheading font-weight-bold">제어변수</v-card-title>
                          <v-divider></v-divider>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-title>최대주간 객실수:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPeak.MaxHeatingRoom"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>최대야간 객실수:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPeak.NightMaxHeatingRoom"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>외기보상온도 최고값:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tVariableTemp.HeatingHighTemp"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>외기보상온도 최저값:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tVariableTemp.HeatingLowTemp"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>외기보상온도 제어폭:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>최적정지 시간(초):</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tOptimalStop.OptimalStopTimeSec"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>수요반응제어 온도:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tDemandResponse.DRTemp"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>수요반응제어 시간(시):</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tDemandResponse.DRTimeHour"></v-text-field></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card>
                        <br>
                        <v-card
                        max-width="400"
                        class="mx-auto">
                          <v-card-title class="subheading font-weight-bold">예열제어</v-card-title>
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
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.Option"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_Tavg:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.Tout_avg"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_WFto:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.WF_Toutdoor"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>PH_WFTdf:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.WF_Tdiff"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>StartTimeER:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.PH_StartTimeErrRange"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>LLStartTimeER:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.PH_LowLoadStartTimeErrRange"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>CRTsurf_init:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.CooledRoomTsurf_init"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>CRPHHourtInc:</v-list-item-title>
                              <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tFloorRadConf.tPreHeating.CooledRoomPHHourInc"></v-text-field></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                      <v-col>
                        <v-card
                          max-width="400"
                          class="mx-auto">
                          <v-list>
                            <v-card-title class="subheading font-weight-bold">운용자 연락처</v-card-title>
                            <v-divider></v-divider>
                            <v-list-item>
                              <v-list-item-title>연락처 1:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber0"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>연락처 2:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber1"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>연락처 3:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber2"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>연락처 4:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber3"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>연락처 5:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.TelNumber4"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>문자알림 옵션:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.tNotify.NotifyOption"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>문자알림 간격(초):</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.tNotify.NotifyIntervalSec"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>문자알림 시작시간:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.tNotify.NotifyStartHour"></v-text-field></v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>문자알림 종료시간:</v-list-item-title>
                              <v-list-item-title><v-text-field height=13 v-model="configs.tFloorRadConf.tNotify.NotifyEndHour"></v-text-field></v-list-item-title>
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
                                <v-card-title class="subheading font-weight-bold">기본설정</v-card-title>
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
                                  <v-list-item-title>제어옵션:</v-list-item-title>
                                  <v-list-item-title class="align-end "><v-text-field height=13 v-model="configs.tSolBeachConf.ControlOption"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>공조기 수:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.ZoneCnt"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>냉난방 모드:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.HCMode"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>실내 설정온도:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.Tzone_set"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>CO2 설정값:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.PPMco2_set"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>댐퍼 자/수동:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.DamperAutoManual"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>제어온도 최소단위:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.Tctrl_res"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>CO2 측정주기(초):</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.CO2LoadPeriodSec"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>비동작 옵션:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.NoControlOption"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>스케줄러 옵션:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.SchedulerOption"></v-text-field></v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                          <v-col>
                            <v-card>
                              <v-card-title class="subheading font-weight-bold">댐퍼제어</v-card-title>
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
                                  <v-list-item-title>제어모드:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.DamperCtrlMode"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>댐퍼설정값:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.Rdamp_set"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>댐퍼제어 최소값:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.Rdamp_min"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>댐퍼제어 최대값:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.Rdamp_max"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>댐퍼제어 최소단위:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res"></v-text-field></v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>댐퍼 비동작 옵션:</v-list-item-title>
                                  <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tRdamp.Rdamp_noctrl_max"></v-text-field></v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                          <v-col>
                            <v-card>
                            <v-card-title class="subheading font-weight-bold">재실자 제어</v-card-title>
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
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.ControlMode"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_rate_wf:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_rate_wf"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_wf:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_wf"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_empty:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_empty"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_occupied:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_occupied"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_inc_rate:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_inc_rate"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_dec_rate:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_dec_rate"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_inc_time:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_inc_time"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>CO2_dec_time:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tC02Conf.PPMco2_dec_time"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col>
                          <v-card>
                            <v-card-title class="subheading font-weight-bold">외기온도 보상제어</v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title>난방온도범위 최고값:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tVariableTemp.HeatingHighTemp"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>난방온도범위 최저값:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tVariableTemp.HeatingLowTemp"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>난방온도 제어폭:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tVariableTemp.HeatingDelatTemp"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>냉방온도범위 최고값:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tVariableTemp.CoolingHighTemp"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>냉방온도범위 최저값:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tVariableTemp.CoolingLowTemp"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>냉방온도 제어폭:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tVariableTemp.CoolingDelatTemp"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                          <br>
                          <v-card>
                            <v-card-title class="subheading font-weight-bold">PID 제어</v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-title>CtrlStepValue:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tPID.ControlStepValue"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>UserPID:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tPID.PIDCtrlMode"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Kp:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tPID.Kp"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Ki:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tPID.Ki"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>Kd:</v-list-item-title>
                                <v-list-item-title class="align-end"><v-text-field height=13 v-model="configs.tSolBeachConf.tPID.Kd"></v-text-field></v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                        <v-col>
                          <v-card
                            max-width="400"
                            class="mx-auto">
                            <v-list>
                              <v-card-title class="subheading font-weight-bold">운용자 연락처</v-card-title>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-title>연락처 1:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber0"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>연락처 2:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber1"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>연락처 3:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber2"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>연락처 4:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber3"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>연락처 5:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.TelNumber4"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>문자알림 옵션:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.tNotify.NotifyOption"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>문자알림 간격(초):</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.tNotify.NotifyIntervalSec"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>문자알림 시작시간:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.tNotify.NotifyStartHour"></v-text-field></v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>문자알림 종료시간:</v-list-item-title>
                                <v-list-item-title><v-text-field height=13 v-model="configs.tSolBeachConf.tNotify.NotifyEndHour"></v-text-field></v-list-item-title>
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
                  <v-btn v-if="configs.SiteInfo === 2" :loading="openDampLoading" :disabled="loading" class="d-flex" @click="openDamperSch(1)">스케쥴러</v-btn>
                  <v-btn :loading="saveLoading" :disabled="loading" class="d-flex" @click="applyEmsSysConfig()">저장</v-btn>
                  <v-btn :loading="closeLoading" :disabled="loading" class="d-flex" @click="getEmsSysConfig()">취소</v-btn>
                </v-card-actions>
            </v-tab-item>
          </v-tabs-items>
          <v-dialog v-model="damperSchModal" dense persistent max-width="1000px">
            <v-card>
              <v-card-title>
                <span class="headline ma-0 pa-0">스케쥴러</span>
              </v-card-title>
              <v-card-text>
                <v-row align="center">
                  <v-col cols="12" sm="2" class="ma-0 pa-0 mr-n12">
                    <v-subheader>공조기 번호 : </v-subheader>
                  </v-col>
                  <v-col cols="12" sm="1" class="ma-0 pa-0 ml-n2">
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
                  <v-col></v-col>
                </v-row>
                <v-simple-table dense class="ma-0 pa-0">
                  <thead>
                    <tr class="text-center black--text ma-0 pa-0 pt-5 config-column right-border">
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;" width="60px">단계</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">시</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">분</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">댐퍼 자/수동</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">동작</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">외기비율</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">팬 자/수동</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">동작</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">설정온도</th>
                      <th class="text-center black--text ma-0 pa-0 pt-3 config-column" style="border-bottom:1px solid lightgrey;">Economizer</th>
                    </tr>
                  </thead>
                  <tbody dense class="ma-0 pa-0" height="100px">
                    <tr v-for="(item, index) in damperSchsConfig.tSch" :key="item.idx" class="ma-0 pa-0">
                      <td class="text-center black--text font-weight-bold body-2 config-column ma-0 pa-0">{{ index+1 }}</td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.Hour"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.Min"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.DamperAM"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.DamperRun"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.DamperRatio"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.FanAM"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.FanRun"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.Tset"></v-text-field>
                      </td>
                      <td class="text-center ma-0 pa-0 config-column">
                        <v-text-field class="centered-input font-weight-bold body-2 config-margin ma-0 pa-0 mt-n1 mb-n5" v-model="item.Economizer"></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="dampSaveLoading" :disabled="loading" class="d-flex" @click="applyDamperSch(damperSchsConfig.AhuIndex)">저장</v-btn>
                <v-btn :loading="dampCloseloading" :disabled="loading" class="d-flex" @click="closeDamperSch()">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </template>
  </v-container>
</template>
<style>
.centered-input input {
  text-align: center;
  vertical-align: middle;
}
.td-right-border {
  border-right: 1px solid lightgrey;
}
.config-column {
  font-size: medium;
  font-weight: bold;
  border-right: 1px solid lightgrey;
}
.config-margin {
  margin: -4px 0px -30px 0px;
}
.right-border {
  border-right: 1px solid lightgrey;
}
.bottom-border {
  border-bottom: 1px solid lightgrey;
}
</style>
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
      ],
      openDampLoading: false,
      saveDampLoading: false,
      closeDampLoading: false,
      saveLoading: false,
      closeLoading: false,
      loading: false
    }
  },
  methods: {
    getEmsSysConfig () {
    this.loading = true
      // axios.get(`http://localhost:3000/api/rooms/emsSysConfig`)
      axios.get(`${this.$apiRootPath}rooms/emsSysConfig`)
        .then((r) => {
          // alert("emsSysConfig r.data : " + JSON.parse(r.data))
          this.configs = JSON.parse(r.data)
          this.configs.tFloorRadConf.Troom_set = this.configs.tFloorRadConf.Troom_set.toFixed(1)
          this.configs.tFloorRadConf.Tsurf_set = this.configs.tFloorRadConf.Tsurf_set.toFixed(1)
          this.configs.tFloorRadConf.Troom_cr = this.configs.tFloorRadConf.Troom_cr.toFixed(1)
          this.configs.tFloorRadConf.Tsurf_cr = this.configs.tFloorRadConf.Tsurf_cr.toFixed(1)
          this.configs.tFloorRadConf.Tctrl_res = this.configs.tFloorRadConf.Tctrl_res.toFixed(1)
          this.configs.tFloorRadConf.tVariableTemp.HeatingHighTemp = this.configs.tFloorRadConf.tVariableTemp.HeatingHighTemp.toFixed(1)
          this.configs.tFloorRadConf.tVariableTemp.HeatingLowTemp = this.configs.tFloorRadConf.tVariableTemp.HeatingLowTemp.toFixed(1)
          this.configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp = this.configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp.toFixed(1)
          this.configs.tFloorRadConf.tDemandResponse.DRTemp = this.configs.tFloorRadConf.tDemandResponse.DRTemp.toFixed(1)
          this.configs.tFloorRadConf.tPreHeating.Tout_avg = this.configs.tFloorRadConf.tPreHeating.Tout_avg.toFixed(1)
          this.configs.tSolBeachConf.Tzone_set = this.configs.tSolBeachConf.Tzone_set.toFixed(1)
          this.configs.tSolBeachConf.Tctrl_res = this.configs.tSolBeachConf.Tctrl_res.toFixed(1)
          this.configs.tSolBeachConf.tRdamp.Rdamp_set = this.configs.tSolBeachConf.tRdamp.Rdamp_set.toFixed(1)
          this.configs.tSolBeachConf.tRdamp.Rdamp_min = this.configs.tSolBeachConf.tRdamp.Rdamp_min.toFixed(1)
          this.configs.tSolBeachConf.tRdamp.Rdamp_max = this.configs.tSolBeachConf.tRdamp.Rdamp_max.toFixed(1)
          this.configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res = this.configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res.toFixed(1)
          this.configs.tSolBeachConf.tVariableTemp.HeatingHighTemp = this.configs.tSolBeachConf.tVariableTemp.HeatingHighTemp.toFixed(1)
          this.configs.tSolBeachConf.tVariableTemp.HeatingLowTemp = this.configs.tSolBeachConf.tVariableTemp.HeatingLowTemp.toFixed(1)
          this.configs.tSolBeachConf.tVariableTemp.HeatingDelatTemp = this.configs.tSolBeachConf.tVariableTemp.HeatingDelatTemp.toFixed(1)
          this.configs.tSolBeachConf.tVariableTemp.CoolingHighTemp = this.configs.tSolBeachConf.tVariableTemp.CoolingHighTemp.toFixed(1)
          this.configs.tSolBeachConf.tVariableTemp.CoolingLowTemp = this.configs.tSolBeachConf.tVariableTemp.CoolingLowTemp.toFixed(1)
          this.configs.tSolBeachConf.tVariableTemp.CoolingDelatTemp = this.configs.tSolBeachConf.tVariableTemp.CoolingDelatTemp.toFixed(1)
          this.configs.tSolBeachConf.tPID.Kp = this.configs.tSolBeachConf.tPID.Kp.toFixed(1)
          this.configs.tSolBeachConf.tPID.Ki = this.configs.tSolBeachConf.tPID.Ki.toFixed(1)
          this.configs.tSolBeachConf.tPID.Kd = this.configs.tSolBeachConf.tPID.Kd.toFixed(1)
          this.openDampLoading = false
          this.saveLoading = false
          this.loading = false
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
    },
    applyEmsSysConfig () {
      this.saveLoading = true
      this.loading = true
      // axios.put(`http://localhost:3000/api/rooms/emsSysConfig`, { configs: this.configs })
      axios.put(`${this.$apiRootPath}rooms/emsSysConfig`, { configs: this.configs })
        .then((r) => {
          this.getEmsSysConfig()
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
    },
    openDamperSch: function (ahuIndex) {
      this.openDampLoading = true
      this.loading = true
      // axios.get(`http://localhost:3000/api/rooms/damperConfig/${ahuIndex}`)
      axios.get(`${this.$apiRootPath}rooms/damperConfig/${ahuIndex}`)
        .then((r) => {
          this.damperSchsConfig = JSON.parse(r.data)
          this.select = { AhuIndex: this.damperSchsConfig.AhuIndex }
          this.saveDampLoading = false
          this.openDampLoading = false
          this.loading = false
          this.damperSchModal = true
        })
        .catch((e) => {
          alert(e.message)
          // console.error(e.message)
        })
    },
    applyDamperSch: function (AhuIndex) {
      this.saveDampLoading = true
      this.loading = true
      // alert(JSON.stringify(this.damperSchsConfig))
      // axios.put(`http://localhost:3000/api/rooms/damperConfig`, { damperConfig: this.damperSchsConfig })
      axios.put(`${this.$apiRootPath}rooms/damperConfig`, { damperConfig: this.damperSchsConfig })
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
      this.saveDampLoading = false
      this.openDampLoading = false
      this.loading = false
      this.damperSchModal = false
    }
  }
}
</script>
