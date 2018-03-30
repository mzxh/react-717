import React,{Component} from "react"
import ReactDOM from "react-dom"
console.log(process.env)
import {Provider} from "react-redux"
import store from "./store/store"
import router from "./router/router.config"
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"
import RouteWrapper from "./components/routeWrapper.jsx"
console.log(router)
import "./static/css/rest.css"
import "./static/font/iconfont.css"
import "./utils/fontset"
import "./static/css/common.css"
import "./static/css/goodsComponent.css"
ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <Switch> 
        <Redirect exact from="/" to="/index/home"> </Redirect>
    <RouteWrapper routes={router.routers}></RouteWrapper>
    
    </Switch>
</BrowserRouter>
</Provider>,
    document.getElementById('root'))