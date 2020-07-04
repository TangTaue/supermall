<template>
  <div id="home">
<!--    <h2>首页</h2>-->
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl  :title="['流行','精选','新款']"
                @tabClick="tabClick" ref="tabControl1" class="tabC"
                v-show="isFixed"
    ></TabControl>
  <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">   <!--3 表示实时监听位置-->
    <HomeSwiper :cbanners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
    <HomeRecommend v-bind:cproducts="recommends"></HomeRecommend>
    <HomeFeatureView></HomeFeatureView>
    <TabControl :title="['流行','精选','新款']"
                @tabClick="tabClick" ref="tabControl2"
    ></TabControl>
    <!--    商品列表-->
    <GoodsList :goods="showData"></GoodsList>
  </Scroll>
<!--    <GoodsList :goods="goods['pop'].list"></GoodsList>-->
<!--    <GoodsList :goods="goods['pop'].list"></GoodsList>-->
<!--    向上小图标-->
    <BackTop @click.native="BackClick" v-show="isShow" ></BackTop>
  </div>

<!--  <div id="home">-->
<!--    <nav-bar class="home-nav-bar">-->
<!--      <div slot="center">购物街</div>-->
<!--    </nav-bar>-->
<!--&lt;!&ndash; ref 是用于定位元素和取到组件的内容，:是绑定属性 @是绑定方法&ndash;&gt;-->
<!--    <scroller class="home-scroller" ref="scroller" :probe-type="3" @scroll="getPostion">-->
<!--      <home-swiper :cbanners="banners"/>-->
<!--      <home-recommend :cproducts="products"/>-->
<!--      <home-feature-view/>-->
<!--      <tab-control class="home-tab-control" :ctitles="['流行', '新款', '精选']" @tabClick="pTabClick"/>-->
<!--      <goods-list :cgoods="showGoods"/>-->
<!--    </scroller>-->

<!--    <back-top @click.native="backTopClick" v-show="isShowBackTop" />-->
<!--  </div>-->
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommend from "./childComps/HomeRecommend";
    import HomeFeatureView from "./childComps/HomeFeatureView";
    import TabControl from "../../components/content/tabControl/TabControl";

    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/sroll/Scroll";
    // 回到顶部
    import BackTop from "../../components/content/BackTop/BackTop";
    import {getHomeMultidata, getHomeGoods} from "../../network/home"

    // import NavBar from "components/common/navbar/NavBar";
    // import HomeSwiper from "./childComps/HomeSwiper";
    // import HomeRecommend from "./childComps/HomeRecommend";
    // import HomeFeatureView from "./childComps/HomeFeatureView";
    // import TabControl from "components/contents/tabControl/TabControl";
    // import GoodsList from "components/contents/good/GoodsList";
    // import Scroller from "components/common/scroller/Scroller";
    // import BackTop from "components/contents/backTop/BackTop";

    // import {getHomeMultiData, getGoodsData} from "network/home";

    export default {
      name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        HomeRecommend,
        HomeFeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
        // HomeSwiper,
        // HomeRecommend,
        // HomeFeatureView,
        // TabControl,
        // GoodsList,
        // Scroller,
        // BackTop
      },
      data() {
        return {
          banners: [],
          recommends: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []},
          },
          currentType:'pop',
          isShow:false,
          tabOffsetTop:0,
          isFixed:false,
          saveY:0
        }
      },
      // 在组件被创建之前发送网络请求
      created() {
        // 请求多个数据 axios的返回结果为promise
        this.getHomeMultidata()
        // 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
        // getHomeGoods('pop',1 ).then(res=>{
        //   console.log(res);
        // })
      },
      mounted() {
        // 在DOM渲染完毕之后监听
        // 防抖函数的调用   第一个参数是调用的参数 不用加上括号
        const refresh=this.debounce(this.$refs.scroll.refresh,50)
        // 3 事件总线的监听
        this.$bus.$on("itemImageLoad",()=>{
          refresh()
        })
      },
      computed:{
        showData(){
          return this.goods[this.currentType].list
        }
      },

      activated() {
        // 立刻回到起始位置
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        // 刷新
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY=this.$refs.scroll.scroll.y
      },
      methods: {
         swiperImageLoad(){
           // console.log(this.$refs.tabControl.$el.offsetTop);
          this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
         },
          // 防抖动的封装方法
        debounce(func,delay){
          var timer=null;
          return function (...args) {
            if (timer) clearTimeout(timer)
            timer=setTimeout(() => {
              func.apply(this,args)
            }, delay)
          }
        },
        // 上拉加载更多数据
        loadMore(){
          this.getHomeGoods(this.currentType)
          // 每次申请图片后重新进行刷新高度
          this.$refs.scroll.scroll.refresh()
        },
        contentScroll(position) {
          this.isShow=(-position.y)>1000

          this.isFixed=(-position.y)>this.tabOffsetTop
        },
        // 迅速返回顶部的方法
        BackClick(){
          // 拿到scroll对象，调用scrollTo方法
          this.$refs.scroll.scroll.scrollTo(0,0,500)
          // 调用scroll组件里面的scrollTo方法
          // this.$refs.scroll.scrollTo(0,0)
        },
        // 事件监听相关的方法
        tabClick(index){
          switch (index) {
            case 0:
              this.currentType='pop'
              break
            case 1:
              this.currentType='new'
              break
            case 2:
              this.currentType='pop'
              break
          }
          // 将状态同步更新
          this.$refs.tabControl1.currentType=index
          this.$refs.tabControl2.currentType=index
        },
        // 网络请求相关的方法
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },

        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            // console.log(res);
            // 将数据保存在goods里面
            this.goods[type].list.push(...res.data.list)
            // 改变页码
            this.goods[type].page += 1
            // 继续上拉加载更多 先关闭 ，后继续请求
            this.$refs.scroll.finishPullUp()
          })
        },
      }
    }

      // data() {
        //   return {
        //     banners: [],
        //     products: [],
        //     goods:{
        //       pop:{page:0, list:[]},
        //       new:{page:0, list:[]},
        //       sell:{page:0, list:[]}
        //     },
        //     currentType:'pop',
        //     isShowBackTop: false
        //   }
        // },
        // computed: {
        //     showGoods() {
        //         return this.goods[this.currentType].list
        //     }
        // },
        // created() {
        //     this.getHomeData()
        //
        //     this.getHomeGoodsData('pop')
        //     this.getHomeGoodsData('new')
        //     this.getHomeGoodsData('sell')
        // },
        // methods:{
        //     pTabClick(index) {
        //         switch (index) {
        //           case 0:
        //               this.currentType = 'pop'
        //               break
        //           case 1:
        //               this.currentType = 'new'
        //               break
        //           case 2:
        //               this.currentType = 'sell'
        //               break
        //       }
        //     },
        //     getHomeData() {
        //         getHomeMultiData().then(res => {
        //             this.banners = res.data.banners
        //             this.products = res.data.products
        //         })
        //     },
        //     getHomeGoodsData(type) {
        //         let page = this.goods[type].page + 1
        //         getGoodsData(type, page).then(res => {
        //             this.goods[type].list.push(...res.goods)
        //             this.goods[type].page = res.page
        //         })
        //     },
        //     backTopClick() {
        //         // 通过$refs拿到组件中的对象
        //         this.$refs.scroller.scrollTo(0, 0, 500)
        //     },
        //     getPostion(postion) {
        //         this.isShowBackTop = -postion.y > 300
        //     }
        // }

</script>

<style scoped>
  #home{
    position: relative;
    /*padding-top: 44px;*/
    /*vh是视图高度 viewpoint*/
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*top: 0px;*/
    /*right: 0px;*/
    /*left: 0px;*/
    /*z-index: 8;*/
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /*.content{*/
  /*  height:calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 51px;*/
  /*}*/
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .tabC{
    position: relative;
    z-index: 9;
  }
  /*#home {*/
  /*  padding-top: 44px;*/
  /*  height: 100vh;*/
  /*  position: relative;*/
  /*}*/

  /*.home-nav-bar {*/
  /*  background-color: var(--color-tint);*/
  /*  color:#fff;*/

  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right:0;*/
  /*  top: 0;*/
  /*  z-index: 9;*/

  /*}*/

  /*.home-tab-control{*/
  /*  !*两个要混合使用*!*/
  /*  position: sticky;*/
  /*  top: 43px;!*顶部navbar的高度*!*/
  /*  z-index: 9;*/
  /*}*/

  /*.home-scroller{*/
  /*  !*height:300px;*!*/
  /*  overflow: hidden;*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*}*/
</style>
