<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
    export default {
      name: "Scroll",
      props:{
        probeType: {
          type:Number,
          default:0
        },
        pullUpLoad:{
          type:Boolean,
          default: false
        }
      },
      data(){
          return {
            scroll:null
          }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          // prototype: 3
          click:true,
          probeType: this.probeType,
          pullUpLoad:this.pullUpLoad
        })
        this.scroll.on("scroll",(position)=>{
          this.$emit('scroll',position)
        })
        this.scroll.on("pullingUp",()=>{
          // 将事件发送出去
          this.$emit("pullingUp")
        })
      },
      methods:{
        // scrollto的封装
        scrollTop(x, y,time=300) {
           this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
          this.scroll.finishPullUp()
        }
      }
  }
</script>

<style scoped>

</style>
