import React,{Component} from "react"
import $http from "../../utils/http"
import "./index.css"
import RouterWrapper from "../../components/routeWrapper"
import {NavLink} from "react-router-dom"
import Toast from "react-toast-mobile"
import 'react-toast-mobile/lib/react-toast-mobile.css'
class  Index extends Component{
    render(){
        let {routes}=this.props;
        return <div id="index">
            <Toast/>
            <section className="content">
              <RouterWrapper routes={routes}></RouterWrapper>
            </section>
            <footer>      
            <ul className="nav">
                <li>
                 <NavLink to="/index/home" activeClassName="active">
                    <span className="iconfont icon-home"></span>
                    <span>首页</span>
                   </NavLink>
                </li>
                <li>
                    <NavLink to="/index/catagory" activeClassName="active">
                        <span className="iconfont icon-catagory"></span>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/cart" activeClassName="active">
                        <span className="iconfont icon-cart"></span>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/mine" activeClassName="active">
                        <span className="iconfont icon-mine"></span>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
            </footer>
        </div>
    }
/*componentDidMount(){
    $http.get("/server/test.json",{})
         .then(data=>{console.log(data)})
         .catch(err=>{console.log(err)})
}*/
}
export default Index