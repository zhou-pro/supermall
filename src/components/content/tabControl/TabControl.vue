<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" 
      class="tab-control-item" :class="{active:currrentIndex===index}" @click="itemClick(index)">
          <span>{{item}}</span>
          </div>
  </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            currrentIndex:0
        }
    },
    methods: {
        itemClick(index){
             this.currrentIndex=index
             this.$emit('tabClick',index)

        }
    },
}
</script>

<style>
.tab-control{
    display:flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
   
}
.tab-control-item{
    flex: 1;
     height: 40px;
    line-height: 40px;
}
.active{
    color: var(--color-high-text);
    
}
.active span{
border-bottom: 3px solid var(--color-tint);
padding: 5px;
}
</style>