import React,{Component} from "react"
import Swiper from "swiper"
import "./swiper.css"
import "swiper/dist/css/swiper.css"
class SwiperComponent extends Component{
    render(){
        return <div className="swiper-container" id="swiper_wrap">
        <div className="swiper-wrapper">
             <div className="swiper-slide"><img src={require('../../static/img/banner1.png')} alt=""/></div> <div className="swiper-slide"><img src={require('../../static/img/banner2.png')} alt=""/></div>
             <div className="swiper-slide"><img src={require('../../static/img/banner3.png')} alt=""/></div>
             <div className="swiper-slide"><img src={require('../../static/img/banner4.png')} alt=""/></div>
        </div>
         <div className="swiper-pagination"></div>
        </div>
    }
componentDidMount(){
    new Swiper('.swiper-container',{
        autoplay:true,
        loop:true,
        pagination:'.swiper-pagination'
        

    })
}

}
export default SwiperComponent