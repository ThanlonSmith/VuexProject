<template>
    <div>
        <h4>我是课程详情页面！</h4>
        <p v-for="(question,index) in questionList" :key="question.id">{{question.name}}</p>
    </div>
</template>
<script>
export default {
    name:'CourseDetail',
    created(){
        console.log(this.$route) // {name: "course.detail", meta: {…}, path: "/course/detail/4", hash: "", query: {…}, …}
        console.log(this.$route.params) // {courseId: "4"}
        console.log(this.$route.params.courseId) // 4
        this.$store.dispatch('course_questions',this.$route.params.courseId)
    },
    computed:{
        questionList(){
            return this.$store.state.questionList
        }
    }
}
</script>