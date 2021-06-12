<template>
  <div class="button-bar">
     <div class="check-content" @click="checkClick">
          <check-button class="check-button" :checked="isSelectAll" ></check-button>
          <span>全选</span>
     </div>
     <div class="price">
         合计：￥{{totalPrice}}
     </div>
     <div class="calculate">
         去计算:({{checkLength}})
     </div>
  </div>
</template>

<script>
 import CheckButton from './CheckButton'
export default {
components:{
   CheckButton 
},
methods:{
checkClick(){
    if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false )
    }else{
      this.$store.state.cartList.forEach(item => item.checked = true )  
    }
}
},
computed:{
    totalPrice(){
        return this.$store.state.cartList.filter(item=>{
            return item.checked
        }).reduce((preValue,item) => {
            return preValue + item.price*item.count
        },0).toFixed(2)
    },
    checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
        return (!this.$store.state.cartList.filter(item => !item.checked).length)
    }
}
}
</script>

<style scoped>
.button-bar{
    display: flex;
    height: 40PX;
    background-color:#ccc;
    position: relative;
    line-height: 40px;
    font-size: 14px;
    
   
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 20px;
    width: 60px;
   
}
.check-button{
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin: 2px;
}
.price{
   margin-left: 30px;
   flex: 1;
}
.calculate{
    margin-left: 10px;
    width: 90px;
    text-align: center;
    background-color: rgb(228, 208, 98);
    color: #fff;
}
</style>