import React,{Component} from "react"
import Home from "../views/home"
import Detail from "../views/detail"
import Login from "../views/login"
import Register from "../views/register"
import Catagory from "../views/catagory"
import Cart from "../views/cart"
import Index from "../views/index"
import Mine from "../views/mine"
import Nomatch from "../views/route404/nomatch.jsx"
import Search from "../views/search/search"
import Result from "../views/result/result"
import Setting from "../views/setting/setting"
let router={
    routers:[
        {
            path:"/detail",
            component:Detail
        },
        {
          path:"/login",
            component:Login   
        },
        {
            path:"/register",
            component:Register  
        },
        {
           path:"/setting",
            component:Setting
        },
        {
            path:"/index",
            component:Index,
            children:[
                {
                    path:"/index/home",
                    component:Home
                },
                {
                    path:"/index/catagory",
                    component:Catagory,
					children:[
						{
							"id":"classify_1",
							"name":"家乡味道"
						},
						{
							"id":"classify_2",
							"name":"进口食品"
						},
						{
							"id":"classify_3",
							"name":"牛奶乳品"
						},
						{
							"id":"classify_4",
							"name":"休闲零食"
						},
						{
							"id":"classify_5",
							"name":"生鲜果蔬"
						},
						{
							"id":"classify_6",
							"name":"米面粮油"
						},
						{
							"id":"classify_7",
							"name":"调味调料"
						},
						{
							"id":"classify_8",
							"name":"酒水饮料"
						}
					]
                },
                {
                    path:"/index/cart",
                    component:Cart,
                    authorization:true
                },
                {
                    path:"/index/mine",
                    component:Mine,
                    authorization:true
                },
                 {
                    path:"/index/search",
                    component:Search
                },
                {
                    path:"/index/result",
                    component:Result
                },
            ]
        }
       
    ]
}
export default  router