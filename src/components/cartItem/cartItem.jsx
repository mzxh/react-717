import React,{Component} from "react"
import {connect} from "react-redux"
import mapDispatchToProps from "./dispatch.js"
class CartItem extends Component{
    constructor(){
        super()
    }
    render(){
        let {toggleSelect,updateCount,item}=this.props;
        console.log(item.selected)
        return  <li>
                   <span onClick={()=>{toggleSelect((1-item.selected),item.goods_id)}} className={item.selected==0?"select-bttn iconfont":"select-bttn iconfont icon-dh"}></span>
                   <span className="goods-img">
                       <img src={"http://www.lb717.com/"+item.obj_data} alt=""/></span>
                   <div className="divR">
                       <p>{item.goods_name}</p>
                       <div className="flex">
                           <div className="price">
                               <p>x{item.count}</p>
                               <p>￥{item.discount_price}</p>
                           </div>
                           <div className="count-box" >
                               <span onClick={()=>{updateCount(--item.count,item.goods_id)}}>-</span>
                               <span>{item.count}</span>
                               <span onClick={()=>{updateCount(++item.count,item.goods_id)}}>+</span>
                           </div>
                       </div>
                   </div>
               </li>
    }

}
export default connect(function(state){
    console.log(state)
return {}
},mapDispatchToProps,null,{pure:false})(CartItem)