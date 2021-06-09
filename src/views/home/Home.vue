<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        :titles="['流行','新款','精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl1" v-show="isTabFixed">
        </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad()"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新款','精选']"
        
        @tabClick="tabClick"
        ref="tabControl2" >
        </tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/util";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBackTop: true,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
    };
  },
  //组件生命周期函数
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听item事件加载完成以及防抖
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      //console.log("1111")
      refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated(){
    //转到Y值
    //console.log("homecreate");
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.scroll.y
      //console.log(this.saveY);
      this.$bus.$off('itemImgLoad',)
    
      },
  methods: {
    //获取tabControl的offsettop值
    //所有组件都有一个属性$el,用于获取组件中的元素
    swiperImageLoad() {
      //console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //防抖函数

    loadmore() {
      //console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
    },
    //监听滚动
    contentscroll(position) {
      //console.log(position);
      //判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000;
      //决定tabcontrol是否吸顶（position:fixed;）
      this.isTabFixed = (-position.y) > this.tabOffsetTop 
    },
    /*
     *事件监听相关方法
     */
    tabClick(index) {
      //console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currrentIndex = index;
      this.$refs.tabControl2.currrentIndex = index;
    },
    /*
     *w网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //console.log(res)
        //this.result=res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh; /*视口高度*/
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/*/.tab-control{
  position:sticky ;
  top: 44px;
  z-index: 9;
}*/
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  /*height:calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;*/
}
.tab-control{
  position: relative;
  z-index: 9;
}

</style>
