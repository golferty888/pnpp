<template>
  <div>
    <navbar />

    <div class="devices">
      <h1 class="heading grey--text ml-5 mt-5">Devices</h1>

      <div v-if="connectInfo == null ">
        <v-dialog max-width="600">
          <v-btn rounded slot="activator" @click="findDevice()" class="button">
            <v-icon class="grey--text">add</v-icon>
          </v-btn>
          <v-card>
            <v-card-title>Add IoT Device</v-card-title>
            <v-card-text>
              <div v-for="device in info" :key="device.name" class="device">
                <v-layout align-content-center>
                  <v-avatar tile size="40" class="ml-2 mr-2">
                    <img :src="'/Lightbulb_off.png'" />
                  </v-avatar>
                  <v-card class="ml-2" flat height="50" width="100">
                    <div class="text-uppercase mt-1">{{device[0].device}}</div>
                    <div class="text-uppercase">{{device[0].name}}</div>
                  </v-card>

                  <v-spacer></v-spacer>
                  <v-btn class="success" @click="connectDevice()">Connect</v-btn>
                </v-layout>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div v-else>
        <v-container class="ml-3">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="device in info" :key="device.name">
              <v-card flat class="ma-3">
                <v-responsive>
                  <div v-if="device[0].device==='light'">
                    <v-avatar tile size="150" class="ma-3">
                      <img :src="img_path" />
                    </v-avatar>
                    <div v-for="device in info" :key="device.name"></div>
                  </div>
                </v-responsive>
                <v-card-text>
                  <div class="font-weight-regular title ml-3">{{device[0].name}}</div>
                  <div class="mt-2 font-weight-thin subheader ml-3">{{device[0].device}}</div>
                  <v-btn class="success mt-3" @click="turnOnDevice()">Turn On</v-btn>
                  <v-btn class="error mt-3" @click="turnOffDevice()">Turn Off</v-btn>
                  <v-btn @click="disconnectDevice()">Disconnect</v-btn>
                </v-card-text>

                <!-- <div v-if="device.status==true" ＠click="openDevice()"></div> -->
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "./home_navbar";
import ngrokconfig from "../ngrok_config"

export default {
  components: {
    navbar
  },

  data() {
    return {
      info: null,
      connectInfo: null,
      disconnectInfo: null,
      openInfo: null,
      img_path: "/Lightbulb_off.png",
      dialog: false,
      turnoffInfo: null
    };
  },
  methods: {
    findDevice() {
      axios.get(ngrokconfig.path+"/find/findRas").then(response => {
        this.info = response.data;
        this.dialog = true;
        // console.log(response.data);
      });
    },
    connectDevice() {
      axios
        .post(ngrokconfig.path+"/find/connect", {
          url: ngrokconfig.url+":8080/connect"
        })
        .then(response => (this.connectInfo = response.data));
      this.dialog = false;
    },
    turnOnDevice() {
      axios
        .post(ngrokconfig.path+"/send/sendMessage", {
          url: ngrokconfig.url+":8080?action=",
          action: "on"
        })
        .then(response => (this.openInfo = response.data));
      this.img_path = "/Lightbulb_on.png";
    },
    turnOffDevice() {
      axios.post(ngrokconfig.path+"/send/sendMessage", {
        url: ngrokconfig.url+":8080?action=",
        action: "off"
      }).then(response => (this.turnoffInfo = response.data));
      this.img_path = "/Lightbulb_off.png";
    },
    disconnectDevice() {
      this.turnOffDevice();
      axios
        .post(ngrokconfig.path+"/find/disconnect", {
          url: ngrokconfig.url+":8080/connect"
        })
        .then(response => (this.disconnectInfo = response.data));
      alert("Your device has been disconnected.");
      this.info = null;
      this.connectInfo = null;
    }
  }
};
</script>


<style>
.btn {
  margin-top: -10px;
  margin-left: 15px;
  margin-bottom: 10px;
}
.button {
  margin-left: 50px;
  margin-top: 10px;
  width: 150px;
  height: 200px;
}
.text {
  margin-left: 50px;
  margin-top: 5px;
}
</style>

