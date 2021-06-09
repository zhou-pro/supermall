<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick()">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
          <div v-for="(item,index) in titles" class="title-item" :class="{active:index === currentIndex}" @click="titleClick(index)">{{item}}</div>
          </div></nav-bar>
  </div>
</template>

<script>
import {getDetail} from 'network/detail'
import NavBar from 'components/common/navbar/NavBar'
export default {
    data() {
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        titleClick(index){
            this.currentIndex=index
            //发出事件
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back()//跳转页面
        }
    }

}
</script>

<style>
.title{
    display: flex;
}
.title-item{
    flex: 1;
}
.active{
    color:red;
}
.back img{
    margin-top: 12px;
}
</style>