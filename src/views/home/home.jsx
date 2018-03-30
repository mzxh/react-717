import React,{Component} from "react"
import $http from "../../utils/http"
import "./home.css"
import logo from "../../static/img/logo.jpg"
import SwiperComponent from "../../components/swiper/swiper.jsx"
import GoodsItem from "../../components/goodsComp/goodsComponent.jsx"
class  Home extends Component{
    constructor(){
        super()
        this.state={
          goodslist:[],
          channel_id:3,
          caniquery:true
        }
        this.toSearch=this.toSearch.bind(this)
        this.scrolling=this.scrolling.bind(this)
    }
   toSearch(){
       let {history}=this.props;
       history.push('/index/search')
   }
    render(){
       return <div id="home" onScroll={this.scrolling} ref="scroller">
               <header id="search">
                <div className="search_left">
					<img src={logo} />
				</div>
				<div className="search_ctr">
					<span className="iconfont icon-fa" style={{ fontSize:".17rem" }}></span>
					<input type="text" placeholder="请输入您要搜索的商品"  onFocus={this.toSearch}/>
				</div>
				<div className="search_right">
					<dl className="search_right1">
						<dt><span className="iconfont icon-shop" style={{ fontSize:".35rem" }}></span></dt>
						<dd>我的店铺</dd>
					</dl>
				</div>
               </header>
             <div ref="doc" className="doc">  
               <div className="banner">
                   <SwiperComponent></SwiperComponent>
               </div>
                <div className="nav ks-clear">
                    <dl><dd><img src={require("../../static/img/nav1.png")} alt=""/></dd><dt>牛奶乳品</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav2.png")} alt=""/></dd><dt>家乡味道</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav3.png")} alt=""/></dd><dt>休闲零食</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav4.png")} alt=""/></dd><dt>米面粮油</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav5.png")}alt=""/></dd><dt>调味调料</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav6.png")} alt=""/></dd><dt>酒水饮料</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav7.png")} alt=""/></dd><dt>生鲜果蔬</dt></dl>
                    <dl><dd><img src={require("../../static/img/nav8.png")} alt=""/></dd><dt>进口食品</dt></dl>
                </div>
                <div className="goods-list ks-clear" >
                   {
                       this.state.goodslist.map((item,index)=>{
                           return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                       })
                   }
                </div>
          </div>
        </div>
    }
   componentDidMount(){
       $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
       .then(res=>{
           this.setState({
               goodslist:JSON.parse(res).data.data
           })
         
       })
    }
    scrolling(){
    if(this.state. channel_id>9) return;
    if(!this.state.caniquery) return;
     let {scroller,doc}=this.refs
     let st=scroller.scrollTop;
     let sw=scroller.offsetHeight;
     let dh=doc.offsetHeight;
   
      if(dh-(st+sw)<50){
          this.setState({
              caniquery:false
          })
            console.log('满足条件，请求数据')
         this.setState({
              channel_id:++this.state.channel_id
          })
            let {goodslist} =this.state;
          $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodslist:[...this.state.goodslist,...JSON.parse(res).data.data]
            })
              this.setState({
                  caniquery:true
             })
        }) 
      }
  }
}
export default Home