import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)
//创建store对象
 const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    //更改state必须通过mutation payload为传过来的参数
    mutations:{
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
            payload.checked = true
            state.cartList.push(payload)

        }
       

    },
    actions:{
        addCart(context,payload){
            //payload新添加的商品
           /*let oldProduct = null;
           for(let item of state.cartList){
               if(item.iid === payload.iid){
                   oldProduct = item ;
               }
           }*/
           let oldProduct = context.state.cartList.find(item=>item.iid == payload.iid)
           //判断oldProduct
           if(oldProduct){
              // oldProduct.count +=1
              context.commit('addCounter',oldProduct)
           }else{
               payload.count = 1
               //context.state.cartList.push(payload)
               context.commit('addToCart',payload)
           }

        }
    }

})
//导出挂载到Vue实例上
export default store