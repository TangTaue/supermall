<template>
    <Swiper class="swiper-item">
      <SwiperItem  v-for="(item,index) in topImage" :key="index">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
    export default {
        name: "DetailSwiper",
        components:{
        SwiperItem,
        Swiper
      },
        props:{
          topImage:{
            type:Array,
            default(){
                return []
            }
          }
        }
      }
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
  }
</style>
