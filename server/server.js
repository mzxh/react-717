const express= require('express')
const bodyParser=require('body-parser')
const app=express()
const api=require('./api.js')
app.use(bodyParser.json())
//设置跨域
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:3000")//支持跨域的
    res.header('Access-Control-Allow-Headers',"Content-Type,Token")//请求头里面包括的字段
    res.header('Content-Type',"application/json;charset=utf-8")//响应头
    next()
})
api(app)
app.listen(9000,function(){
    console.log('server listen 9000')
})
