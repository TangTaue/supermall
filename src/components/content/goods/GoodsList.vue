<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :key="item.image" :goods-item="item"></GoodsListItem>
    {{goods}}
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
      components:{
        GoodsListItem
      },
        props:{
          goods:{
            type:Array,
            default(){
              return []
            }
          }
        }
    }
</script>

<style scoped>
    .goods{
      display: flex;
      flex-wrap: wrap;
      /*均等分*/
      justify-content: space-around;
      padding: 2px;
     }
</style>
