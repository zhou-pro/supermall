<template>
  <div id="detail">  
    <!--父子通信不能用驼峰，用的话要用连字符隔开,发送事件要保持一致-->
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
       <scroll class="contentt" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"></detail-shop-info>
       <!--<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>-->
       <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
       <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
       <goods-list :goods="recommend" ref="recommend"></goods-list>
       </scroll>
       <detail-bottom-bar @addCart="addToCart"/>
       <back-top @click.native="backClick1()" v-show="isShowBackTop" class="back1"></back-top>
      </div>
      
</template>

<script>
import DetailNavBar from './childsComps/DetailNavBar'
import DetailSwiper from './childsComps/DetailSwiper.vue'
import DetailBaseInfo from './childsComps/DetailBaseInfo.vue'
import DetailShopInfo from './childsComps/DetailShopInfo.vue'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childsComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childsComps/DetailParamInfo.vue'
import DetailCommentInfo from './childsComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childsComps/DetailBottomBar.vue'
import BackTop from "components/content/backTop/BackTop";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
export default {
    name:'Detail',
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommend:[],
           themeTopYs:[],
           currentIndex:0,
            isShowBackTop: true
        }
    },
    methods:{
        addToCart(){
            //console.log("---");
            const product = {}
            product.imgage = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            console.log(product);
            //this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
        },
           backClick1() {
      this.$refs.scroll.scrollTo(0, 0);
    },
        contentScroll(position){
            //console.log(position);
            //获取Y值
            const positionY = - position.y
            //positionY和主题中的比较
            let length = this.themeTopYs.length
            for(let i = 0;i < length; i++){
                if((this.currentIndex != i)&&(i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
                this.themeTopYs[i+1])|| (i==length - 1 && positionY >= this.themeTopYs[i])){
                    this.currentIndex = i
                    //console.log(this.currentIndex)
                    this.$refs.nav.currentIndex = this.currentIndex
                }
                this.isShowBackTop = (-position.y) > 1000;
            }

        },
        titleClick(index){
            //console.log(index)
            //通过index获取高度themeTopYs
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],200)
           

        },
        imageLoad(){   
         this.$refs.scroll.refresh()
          
          
        }
    },
    components:{
        DetailNavBar,
         DetailSwiper,
         DetailBaseInfo,
          DetailShopInfo,
          Scroll,
          DetailGoodsInfo,
           DetailParamInfo,
           DetailCommentInfo,
           GoodsList,
           DetailBottomBar,
           BackTop
    },
    
        
    
    created(){
        //保存传入的iid
        this.iid = this.$route.params.iid
        //根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            //获取轮播图数据
            console.log(res);
            const data = res.result
            this.topImages = data.itemInfo.topImages
            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //保存商品的详情信息
            this.detailInfo = data.detailInfo
            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //取出评论信息
            if (data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
            //渲染完后调用
            this.$nextTick(()=>{
                this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);
            })          
            //获取推荐数据
            getRecommend().then(res=>{
                console.log(res);
                this.recommend = res.data.list
            })

        })
    },
    
     
    

}
</script>

<style scoped>
#detail{
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 1;
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.contentt{
    height: calc(100% - 44px - 49px);/*计算式 */
}
.back1 img{
    position: relative;
  
}

</style>