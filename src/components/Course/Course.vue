<template>
  <div>
    <h1>我是Course组件：{{muNum}}</h1>
    <div class="categoryList">
      <ul>
        <li
          @click="categoryHandler(index,item.id)"
          v-for="(item,index) in categoryList"
          :key="item.id"
          :class="{active:currentIndex===index}"
        >{{item.name}}</li>
        <div style="clear: both;"></div>
      </ul>
    </div>
    <!-- <div style="clear: both;"></div> -->
    <div class="courseList">
      <ul>
        <li v-for="course in courseList" :key="course.id" @click="clickHandler(course.id)">{{course.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
// 当前组件的业务逻辑
export default {
  name: "Course", // 组件名
  data() {
    return {
      categoryList: [], //分类列表
      currentIndex: 0, //课程列表
      courseList: [],
      categoryId: 0,
    };
  },
  methods: {
    categoryHandler(index, categoryId) {
      this.currentIndex = index;
      this.categoryId = categoryId;
      this.getCourseList();
    },
    getCateGoryList() {
      this.$https
        .get("http://127.0.0.1:5000/api/v1/category/list")
        .then((response) => {
          // console.log(response);
          let data = response.data;
          if (data.error_no === 0) {
            this.categoryList = data.data;
            // console.log(this.categoryList);
            let obj = {
              id: 0,
              name: "全部",
            };
            this.categoryList.unshift(obj);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCourseList() {
      let _this = this;
      this.$https
        .get(`course/list/?sub_category=${this.categoryId}`)
        .then(function (response) {
          // console.log(response);
          let data = response.data;
          if (data.error_no === 0) {
            _this.courseList = data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickHandler(courseId){
      // 跳转到课程详细页面，方法中跳转使用编程式导航
      this.$router.push({
        name:'course.detail',
        params:{
          courseId:courseId,
        }
      })
    }
  },
  created() {
    this.getCateGoryList();
    this.getCourseList();
  },
  computed:{
    muNum:function(){
      return this.$store.state.num // 因为已经挂载到Vue实例中，所有组件都继承Vue
    }
  }
};
</script>
<style scoped>
/* 前组件的样式  */
li {
  float: left;
  margin-right: 8px;
  padding: 5px;
  cursor: pointer;
}
.categoryList {
  margin-top: 10px;
}
.active {
  background-color: rebeccapurple;
  color: white;
}
</style>