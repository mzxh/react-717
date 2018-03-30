import React,{Component} from "react"
import {connect} from "react-redux"
import mapStateToProps from "./state"
import mapDispatchToProps from "./dispatch"
import CartItem from "../../components/cartItem/cartItem"

import "./cart.css"
class  Cart extends Component{
    constructor(){
        super()
        this.state={
            str:"all",
            edit:"编辑",
            pay:"结算"
        };
        this.cartEdit=this.cartEdit.bind(this)
        this.toDelGoods=this.toDelGoods.bind(this)
    }
    render(){
        let {str,edit,pay}=this.state;
        let {cartList,totalCost,selectAll,toggleSelectAll}=this.props;
        return <div id="cart">
       <header> 购物车<span className="edit" onClick={this.cartEdit}>{edit}</span></header>
       <div className="goods-list">
           <ul>
               {
                   cartList.map((item,index)=>{
                 return <CartItem key={index} item={item}></CartItem>
                   })
               }
           </ul>
       </div>
       <footer>             
           <div className="divS"><span onClick={()=>{
               this.setState({
                   str:str=="all"?'none':'all'
               })
               toggleSelectAll(str)}} className={"select-bttn iconfont"+(selectAll?"select-bttn iconfont icon-dh":"")}></span>全选</div>
           <div>总价<span className="zj" >{totalCost}</span><span className="cart-btn" onClick={this.toDelGoods}>{pay}</span></div>

       </footer>
        </div>
    }
   cartEdit(){
      this.setState({
           edit:this.state.edit=="编辑"?"完成":"编辑",
           pay:this.state.pay=="结算"? "删除":"结算",
      })
   }
    toDelGoods(){
        if(this.state.pay=='结算') return;
        let selectedID=[];
        this.props.cartList.forEach(item=>{
            if(item.selected==1){
                selectedID.push(item.goods_id)
            }
        })
        //console.log(selectedID)
        this.props.delCartGoods(selectedID)
    }
    componentDidMount(){
       // console.log(this.props)
       this.props.fetchGoodsList(this.props.history)
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(Cart)