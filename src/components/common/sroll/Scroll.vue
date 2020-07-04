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
        // 2 或者 3 的时候监听滚动
        if(this.probeType === 2|| this.probeType === 3){
          this.scroll.on("scroll",(position)=>{
            this.$emit('scroll',position)
          })
        }
        if(this.pullUpLoad){
          this.scroll.on("pullingUp",()=>{
            // 将事件发送出去
            this.$emit("pullingUp")
          })
        }
      },
      methods:{
        // scrollto的封装
        scrollTop(x, y,time=300) {
           this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
          // scroll有值的情况下调用refresh()函数
          this.scroll && this.scroll.refresh()
        }
      }
  }
</script>

<style scoped>

</style>
