<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot>
         </slot>
      </div>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
export default {
    data() {
        return {
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0

        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        this.scroll=new BSscroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            //上拉加载更多
            pullUpLoad:this.pullUpLoad

        })
        this.scroll.on('scroll',(position) => {
            //console.log(position)
            this.$emit('scroll',position)
        })
       
        //上拉加载更多 监听上拉事件
        this.scroll.on('pullingUp',()=>{
            //console.log('上拉加载更多');
            this.$emit('pullingUp')
           

        })
          this.scroll.refresh()
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        },
        //加载更多
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            console.log('----');
             this.scroll.refresh()
        }
    }

}
</script>

<style>

</style>