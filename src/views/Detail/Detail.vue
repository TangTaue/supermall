<template>
  <div>
    <h2>跳转详情页</h2>
    {{iid}}
  </div>
</template>

<script>
    export default {
      name: "Detail",
      data(){
        return{
          iid:null
        }
      },
      created() {
        // console.log(this.$route.params);
        // 拿到iid属性
        this.iid=this.$route.params.iid
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
