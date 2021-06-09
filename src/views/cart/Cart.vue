<template>
  <div class="cart">
    <nav-bar class="shopcart">
      <div class="nav-cart" slot="center">购物车({{cartLength}})</div>
    </nav-bar>    
      <cart-list></cart-list> 
      <cart-button-bar></cart-button-bar>  
  </div>
</template>

<script>
import CartButtonBar from './childComps/CartButtonBar.vue'
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
  export default {
    name: "Cart",
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    },
    components:{
      NavBar,
      CartList,
       CartButtonBar
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.shopcart{
background-color: var(--color-tint);
}
.nav-cart{
  text-align: center;
  color: #fff;
  
}
</style>
