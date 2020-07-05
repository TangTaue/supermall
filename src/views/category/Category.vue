<template>
  <div class="wrapper">
    <Detail></Detail>
  </div>
</template>

<script>
  import Detail from "../Detail/Detail";
  import BScroll from "better-scroll"
    export default {
        name: "Category",
        data(){
          return{
            scroll:null
          }
        },
      components:{
          Detail
      },
        mounted() {
          this.scroll=new BScroll(document.querySelector(".wrapper"),{
            prototype:3,
            // 上拉加载更多
            pullUpLoad:true
          })
          this.scroll.on('scroll',(position)=>{
            console.log(position);
          })
          this.scroll.on("pullingUp",()=>{

          })
      }
    }
</script>

<style scoped>
  /*.wrapper{*/
  /*  width: 100px;*/
  /*  height: 100px;*/
  /*  background-color: red;*/
  /*}*/
</style>
