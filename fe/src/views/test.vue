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
            md="3"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">Common Config</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>EMS Local </v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field label="IP Addr" :rules="rules"></v-text-field><v-text-field label="PortNo" :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>EMS Remote </v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field label="IP Addr" :rules="rules"></v-text-field><v-text-field label="PortNo" :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>MinPktIntervalSec</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>ControlPeriodSec</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
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
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">FloorRad Config</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                    <template>
                      <v-row>
                        <v-col><v-card>
                          <v-card-title class="subheading font-weight-bold">default</v-card-title>
                          <v-divider></v-divider>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content>Option:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>RoomCnt:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>UseTsuf:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Protein:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Sodium:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Calcium:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-content>Iron:</v-list-item-content>
                              <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                      <v-col><v-card>
                        <v-card-title class="subheading font-weight-bold">SolBeach Config</v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>Calories:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Fat:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Carbs:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Protein:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Sodium:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Calcium:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Iron:</v-list-item-content>
                            <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
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
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Fat:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Carbs:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Protein:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Sodium:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Calcium:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Iron:</v-list-item-content>
                  <v-list-item-content class="align-end"><v-text-field :rules="rules"></v-text-field></v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
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
        rules: [
          value => !!value || 'Required.',
          value => (value || '').length <= 20 || 'Max 20 characters',
          value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        ],
      }
    }
  }
</script>
