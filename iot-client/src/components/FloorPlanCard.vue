<template>
  <div class="floor-plan-card" @click="createSensor" ref="div">
    <img src="../assets/pohja.png" />
  </div>
</template>

<script>
import store from "@/services/store.js";
import axios from "axios";
import SensorService from "@/services/SensorService.js";

export default {
  name: "FloorPlanCard",
  data() {
    return {
      sensor: { celsius: "err" },
    };
  },
  methods: {
    async getSensorData() {
      SensorService.getSensorData().then((sensor) => {
        this.sensor = sensor;
        this.updateSensors();
      });
    },
    createSensor(event) {
      let x = event.pageX;
      let y = event.pageY;

      console.log(x, y);
      let sensor = document.createElement("button");
      sensor.innerHTML = this.sensor.celsius + "°";
      sensor.style.position = "absolute";
      sensor.style.left = x - 40 + "px";
      sensor.style.top = y - 40 + "px";
      sensor.classList.add("sensor-button");
      this.$refs.div.appendChild(sensor);
      let id = store.getters.getUserInfo.userId;

      axios
        .post("http://localhost:3000/api/sensors/new", {
          coordinateX: x,
          coordinateY: y,
          userid: id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          return error.response.data;
        });
    },
    updateSensors() {
      let id = store.getters.getUserInfo.userId;
      axios
        .get(`http://localhost:3000/api/sensors/get/${id}`, {})
        .then((response) => {
          console.log(response.data[3]);
          response.data.forEach((element) => {
            let x = element.location.xcoord;
            let y = element.location.ycoord;

            let sensor = document.createElement("button");
            sensor.innerHTML = this.sensor.celsius + "°";
            sensor.style.position = "absolute";
            sensor.style.left = x - 40 + "px";
            sensor.style.top = y - 40 + "px";
            sensor.classList.add("sensor-button");
            this.$refs.div.appendChild(sensor);

            // let popup = document.createElement("div");
            // let showPopup;
            // popup.style.position = "absolute";
            // popup.style.display = "flex";
            // popup.style.flexDirection = "column";
            // popup.style.left = x - 40 + "px";
            // popup.style.top = y + 50 + "px";
            // popup.classList.add("popup");
            // popup.onclick = (showPopup = !showPopup);
            // this.$refs.div.appendChild(popup);

            // const descs = ["Temp", "Humi", "plant"];
            // const unit = ["°", "%", "%"];
            // for (let i = 0; i <= 2; i++) {
            //   let popupRow = document.createElement("p");
            //   popupRow.innerHTML = descs[i] + ": " + this.sensor.celsius + unit[i];
            //   popupRow.classList.add("popup-row");
            //   popup.appendChild(popupRow);
            // }
          });
        })
        .catch((error) => {
          return error.response.data;
        });
    },
  },
  created() {
    this.getSensorData();
    this.updateSensors();
  },
};
</script>

<style lang="scss">
.floor-plan-card {
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  width: 99%;
  height: 100%;
  margin: 5rem auto;
  .sensor-button {
    font-family: "Poppins", sans-serif;
    font-weight: 100;
    position: absolute;
    background-color: #3a3a3a;
    border: none;
    color: white;
    width: 80px;
    height: 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    border-radius: 100%;
  }
  .popup {
    display: flex;
    flex-direction: row;
    font-family: "Poppins", sans-serif;
    font-weight: 100;
    background-color: #3a3a3a;
    border: none;
    color: white;
    padding: 10px;
    max-width: 130px;
    text-align: start;
    font-size: 20px;
    border-radius: 10px;
    .popup-row {
      position: relative;
      margin: 0;
      p{
        margin: 0;
      }
    }
  }
}
</style>
