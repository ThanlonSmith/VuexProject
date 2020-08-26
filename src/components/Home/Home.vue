<template>
  <div id="home">
    <h3>{{myNum}}</h3>
    <button @click="addNum">同步修改+1</button>

    <button @click="addAsyncNum">异步修改+2</button>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    myNum: function () {
      return this.$store.state.num;
    },
  },
  methods: {
    addNum() {
      // this.$store.commit("setNum", 1);
      this.$store.dispatch("setActionNum", 1); // 每次加1
    },
    addAsyncNum() {
      // this.$store.commit("setAsyncMutaNum", 1);
      this.$store.dispatch("setAsyncActionNum", 2); //每次加2
    },
  },
};
</script>
<style>
#home {
  margin-top: 10px;
}
</style>
