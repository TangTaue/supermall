<template>
  <div id="detail">
    <childDetail class="detail-nav-bar"></childDetail>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :top-image="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="Shop"></DetailShopInfo>
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </Scroll>
  </div>
</template>

<script>

  import childDetail from "./childDetail/childDetail";
  import DetailSwiper from "./childDetail/DetailSwiper";
  import {getDetail,Goods,Shop,GoodsParams} from "../../network/Detail";
  import DetailBaseInfo from "./childDetail/DetailBaseInfo";
  import DetailShopInfo from "./childDetail/DetailShopInfo";
  import Scroll from "../../components/common/sroll/Scroll";
  import DetailGoodsInfo from "./childDetail/DetailGoodsInfo";
  import DetailParamInfo from "./childDetail/DetailParamInfo";

  export default {
      name: "Detail",
      data(){
        return{
          iid:null,
          topImages:[],
          goods:{},
          Shop:{},
          detailInfo:{},
          paramInfo:{}
        }
       },
      components:{
        childDetail,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
      },
      created() {
        // console.log(this.$route.params);
        // 拿到iid属性
        this.iid=this.$route.params.iid
        getDetail(this.iid).then(res=>{
          // console.log(res);
          const data=res.result
          // 拿到轮播图数据
          this.topImages=res.result.itemInfo.topImages
          this.goods=new Goods(data.itemInfo,data.columns,  data.shopInfo.services)
          this.Shop=new Shop(data.shopInfo)
          this.detailInfo=data.detailInfo
          this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)

        })
      },
      methods:{
        imageLoad(){
          this.$refs.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    }
  .detail-nav-bar{
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content{
    height: calc(100%-44px);
  }
</style>
