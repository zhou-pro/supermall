<template>
  <div class="cart-list">
    <scroll class="content-four" ref="scroll">
         <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
    
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartlistItem.vue';
export default {
    computed:{
        cartList(){
            return this.$store.state.cartList
        }
    },
    components:{
       Scroll,
        CartListItem,
        
    },
    activated(){
        this.$refs.scroll.refresh()
        
    }

}
</script>

<style scoped>
.cart-list{
     height: calc(100% - 44px - 49px - 40PX);
   
}
.content-four{
    height: 100%;
    overflow: hidden;
}

</style>