<template>
  <div class="footer-bar">
    <div class="content">
      <h1>SAVONIA PROJEKTIRYHMÄ 1</h1>
      <h3>SANTERI PIGG - JIRI TUKIAINEN - JANI POLVINEN - JOONAS NISKANEN</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-bar",
  data: function() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
.footer-bar {
    position: relative;
  width: 100%;
  margin-top:50px;
  height: 200px;
  background: #ffffff;
  box-shadow: inset 2px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.content{
    padding-top: 30px;
}

@media screen and (max-width: 950px) {
}
</style>