<template>
  <div id="app">
    <div class="header">
      <h3>我是父亲组件：{{muNum}}</h3>
      <span
        v-for="(item,index) in navList"
        :key="item.id"
        @click="categoryhandler(index)"
        :class="{active:currentIndex===index} "
      >
        <router-link :to="{name:item.name}">{{item.title}}</router-link>
      </span>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      currentIndex: 0,
      navList: [
        { id: 1, title: "首页", name: "Home" },
        { id: 2, title: "课程", name: "Course" },
      ],
    };
  },
  methods: {
    categoryhandler(index) {
      this.currentIndex = index;
    },
  },
  computed:{
    muNum:function(){
      return this.$store.state.num // 因为已经挂载到Vue实例中，所有组件都继承Vue
    }
  }
};
</script>
<style scoped>
.active {
  background-color: rebeccapurple;
}
.active a {
  color: white;
}
.header span {
  padding: 3px;
}
</style>
