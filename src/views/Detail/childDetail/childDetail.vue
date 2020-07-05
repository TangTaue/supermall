<template>
  <div>
    <NavBar>
      <div slot="left" @click="backClick" class="back">
        <img src="../../../assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item ,index) in title " class="item-title"
              :class="{active:index===currentIndex}"
              @click="itemClick(index)"
              :key="index">{{item}}</div>
       </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "childDetail",
      components:{
          NavBar
      },
      data(){
          return {
            title:['商品','参数','评论','推荐'],
            currentIndex:0
          }
      },
      methods:{
          itemClick(index){
            this.currentIndex=index
          },
        backClick(){
            // 返回到主界面
            this.$router.back()
        }
      }
    }
</script>

<style scoped>

  .title{
    display: flex;
    font-size: 13px;
  }
  .item-title{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 11px;
  }
</style>
