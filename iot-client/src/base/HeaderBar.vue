<template>
  <div class="header-bar">
    <div id="nav">
      <div>
        <svg
          class="logo"
          width="30"
          height="30"
          viewBox="0 0 40 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="18" width="23" height="21" rx="2" fill="#7BFF98" />
          <rect x="29" y="18" width="11" height="21" rx="2" fill="#94ECFF" />
          <rect width="40" height="15" rx="2" fill="#FF7A7A" />
        </svg>
      </div>
      <div class="flexbox">
        <router-link class="link" to="/home">HOME</router-link>
        <router-link class="link" to="/history">HISTORY</router-link>
        <router-link class="link" to="/places">PLACES</router-link>
        <router-link class="link" to="/user">USER</router-link>
      </div>
      <div class="mobile-view">
        <button
          class="dropdown-button"
          @click="active = !active, $event.target.classList.toggle('active')"
        >
          <div class="line0"></div>
          <div class="line1"></div>
        </button>
      </div>
      <div>
        <img
          class="profile-pic"
          id="image0"
          src="https://upload.wikimedia.org/wikipedia/fi/7/77/Pikachu.png"
          @click="dropMenu = !dropMenu"
        />

        <transition name="drop">
          <div v-if="dropMenu" class="drop-menu">
            <!-- <h1>:-D</h1> -->
            <!--  <router-link class="link" to="/user" @click="logOut">LOG OUT</router-link> -->
            <button class="btn button-submit" @click="logOut">Log out</button>
          </div>
        </transition>
      </div>
    </div>
    <transition name="toggle">
      <div @click="active = !active" v-if="active" class="mobile-flexbox">
        <router-link class="link" to="/home">HOME</router-link>
        <router-link class="link" to="/history">HISTORY</router-link>
        <router-link class="link" to="/places">PLACES</router-link>
        <router-link class="link" to="/user">USER</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import SensorService from "@/services/SensorService.js";
import store from "@/services/store.js";

export default {
  name: "header-bar",
  data() {
    return {
      event: null,
      active: false,
      dropMenu: false
    };
  },
  methods: {
    logOut() {
      store.dispatch("logOut");
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.header-bar {
  width: 100%;
}
.logo {
  margin-top: 5px;
  margin-left: 10px;
}

.mobile-flexbox {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding-top: 30px;
  bottom: 20px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 2px 2px rgba(66, 47, 47, 0.25);
  .link {
    position: relative;
    font-weight: bold;
    color: #5e5e5e;
    text-decoration: none;
    margin: 0 30px;
    font-size: 20px;
    padding-bottom: 10px;
  }
}

// Mobile nav animations
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.3s;
}
.toggle-enter,
.toggle-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}

.profile-pic {
  position: relative;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  margin-right: 10px;
  margin-top: 4px;
  transition: 0.3s;
  transition: all 0.2s;
  z-index: 20;
}
.profile-pic:hover {
  filter:drop-shadow(8px 8px 10px gray);
}

//ÄLÄ POISTA!!
.drop-enter-active,
.drop-leave-active {
  transition: all 0.2s;
}
.drop-enter,
.drop-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

// :-D
/* .drop-enter-active,
.drop-leave-active {
  transition: all 5s;
}
.drop-enter,
.drop-leave-to {
  transform: scale(0) translateX(-5000px) translate3d(42px, 62px, 135px) rotate3d(1, 1, 1, 500deg) skewX(500deg) scaleZ(100) matrix3d(
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      -50,-100,0,1.1
    );
}

.drop-menu:hover {
  transform: translateX(-5000px)
}
// :-D */

.drop-menu {
  position: absolute;
  z-index: 19;
  right: 0px;
  background-color: #ffffff;
  padding: 50px;
  box-shadow: 0px 2px 2px rgba(66, 47, 47, 0.25);
  border-radius: 10px;
}

.active {
  transform: rotateX(180deg) rotateY(180deg);
}

#nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(66, 47, 47, 0.25);
  border-radius: 10px;
  z-index: 2;
}

#nav .link {
  font-weight: bold;
  color: #5e5e5e;
  text-decoration: none;
  margin: 0 30px;
  font-size: 17px;
}

#nav a.router-link-exact-active {
  color: #000000;
}

.line0 {
  position: relative;
  display: block;
  background-color: #000000;
  width: 25px;
  height: 1px;
  transform: rotate(135deg);
  top: 1px;
  left: 9px;
}
.line1 {
  position: relative;
  display: block;
  background-color: black;
  width: 25px;
  height: 1px;
  transform: rotate(45deg);
  left: -8px;
}

.mobile-view {
  display: none;
}

.dropdown-button {
  position: relative;
  border-style: none;
  color: none;
  background-color: transparent;
  height: 30px;
  top: 5px;
  perspective: 1000px;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

button:focus {
  outline: 0;
}

@media screen and (max-width: 950px) {
  .flexbox {
    display: none;
  }
  .mobile-view {
    display: block;
  }
}
@media screen and (min-width: 950px) {
  .mobile-flexbox {
    display: none;
  }
}
</style>