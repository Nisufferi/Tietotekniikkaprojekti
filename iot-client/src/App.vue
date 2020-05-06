<template>
  <div id="app">
    <HeaderBar v-if="isLoggedIn"></HeaderBar>
    <router-view style="min-height: 100vh"/>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import HeaderBar from "@/base/HeaderBar.vue";
import FooterBar from "@/base/FooterBar.vue";
import store from "@/services/store.js";

export default {
  components: {
    HeaderBar,
    FooterBar
  },
  computed: {
    isLoggedIn() {
      return store.getters.isLoggedIn;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins:200&display=swap");
html {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #e4f7f9;
}

body {
  display: flex;
  flex-direction: column;
}

#app {
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  margin: 0;
  padding: 0;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(77, 77, 77);
  border-radius: 2px;
}
</style>
