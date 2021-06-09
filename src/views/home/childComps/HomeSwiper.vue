<template>
  <Swiper>
    <swiper-item v-for="item in banners">
      <a href="item.link">
        <img :src="item.image" alt @load="imageLoad()" />
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  data() {
    return {
      isLoad:false
    };
  },
  props: {
    banners: Array,
    default() {
      return [];
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    //监听图片加载完
    imageLoad() {
      // console.log("over");
      if(!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad=true

      }
    },
  },
};
</script>

<style>
</style>