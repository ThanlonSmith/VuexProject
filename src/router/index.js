import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home/Home";
import Course from "@/components/Course/Course";
import CourseDetail from "@/components/Course/CourseDetail"
Vue.use(Router)

export default new Router({
  mode: 'history', // 不显示#号
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/course',
      name: 'Course',
      component: Course
    },
    {
      path: '/course/detail/:courseId',
      name: 'course.detail',
      component: CourseDetail
    },
  ]
})
