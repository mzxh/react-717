import {combineReducers} from "redux"
export const  ADD_CART="ADD_CART"//添加购物车
export const DELETE_CART="DELETE_CART"//删除商品
export const UPDATE_GOODS_COUNT="UPDATE_GOODS_COUNT"//改变商品数量
//改变商品选中与否
export const UPDATE_GOODS_SELECTED="UPDATE_GOODS_SELECTED"
//更新整个商品列表
export const UPDATE_GOODS_LIST="UPDATE_GOODS_LIST"
//设置全选
export const SELECTED_ALL="SELECTED_ALL"
let initState={
    cart_list:[]

}

function cart_list(state=initState.cart_list,action){
    switch(action.type){
        case ADD_CART:
        let flag=false;//新加的商品购物车里面还没有
        state.forEach((item,index)=>{
            if(item.goods_id==action.data.goods_id){
                ++item.count;
                flag=true
            }
        })
      
        return flag?[...state]:[...state,action.data]
        break;
        case UPDATE_GOODS_COUNT:
        let arr=[...state]
          arr.forEach((item)=>{
                if(item.goods_id==action.id){
                    item.count=action.data
                    return item;
                }
            });
            return arr;
            break;
            case UPDATE_GOODS_SELECTED:
            let arr2=[...state]
          arr2.forEach((item)=>{
                if(item.goods_id==action.id){
                    item.selected=action.data
                    return item;
                }
            });
            return arr2;
            break;
            case UPDATE_GOODS_LIST:
            return action.data;
            break;
            case SELECTED_ALL:
            let arr3=[...state];
            let str=action.data;
            arr3.forEach(item=>{
                item.selected=str=='all'?1:0
            });
            return arr3;
            break;
            default :return state;
    }
 return state
}

export default combineReducers({
    cart_list
})