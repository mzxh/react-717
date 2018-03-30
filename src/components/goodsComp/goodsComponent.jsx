import React,{Component} from "react"
import $http from "../../utils/http"
import Lazyload from "react-lazyload"
import {getCookie} from "../../utils/utils"
//引用第三方包的封装提示框
import {ToastContainer,toast} from "react-toastify"
import {connect} from "react-redux"
import {ADD_CART} from "./../../store/reducers"
import {T} from "react-toast-mobile"
class Placeholder extends Component{
  render(){
      return <img src={require('../../static/img/nav1.png')}/>
  }
}
class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart=this.addCart.bind(this)
    }
    render(){
        let {data}=this.props;
        return  <dl className="goods-item" onClick={()=>{this.toDetail(data.goods_id)}}>
         <dt><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></dt>
             { /* <dt><Lazyload overflow once height={'100%'} placeholder={<Placeholder/>} debounce={200}><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></Lazyload></dt>*/}
            <dd>
                <p className="goods-detail">{data.goods_name}</p>
                <p className="p2"><span className="goods-price">{data.discount_price}</span><span onClick={this.addCart} className="iconfont icon-cart" onClick={this.addCart}></span></p>
                 <ToastContainer></ToastContainer>
            </dd>
        </dl>
    }
addCart(e){
    e.stopPropagation()
    let {data}=this.props;
    //先判断是否登录了
    if(getCookie('token')){
        $http.post('/user/Cart/addCart',{
                goods_id:data.goods_id,
                goods_info:data,
                token:getCookie('token')
            }).then((res)=>{
                console.log(res)
                if(res==1){
                    T.notify("购物车添加成功")
                //    toast.success('购物车添加成功',{
                //        position:toast.POSITION.TOP_CENTER
                //    }) 
                  this.props.dispatch({
                      type:ADD_CART,
                      data:{
                          ...data,
                          count:1,
                          selected:0//表示没选中
                      }
                  }) 
                }else{
                     T.notify(res.info)
                    toast.warn(res.info,{
                        position:toast.POSITION.TOP_CENTER,
                        hideProgressBar:true,
                        autoClose:2000,
                        className:'test'

                    })
                    let {history,location}=this.props;
                    history.push('/login',{
                        from:location.pathname
                    })
                }
            })
    }else{ 
        let {history,location}=this.props;
        history.push('/login',{
            from:location.pathname
        })
    }
}
toDetail(goods_id){
console.log(goods_id)
this.props.history.push('/detail?goods_id='+goods_id,{
    goods_id:goods_id
})
}
}
export default connect(null)(GoodsItem)