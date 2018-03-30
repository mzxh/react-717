const jwt=require('jsonwebtoken')
const http=require('http');
const querystring=require('querystring')
const fs=require('fs')
const _=require('lodash')
module.exports=function(app){
//商品列表的接口
const options = {
    hostname: 'www.lb717.com',
    port: 80,
    path: '/mall/index/getGoodsChannel',
    method: "post",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
    }
    };
    app.post('/mall/index/getGoodsChannel', function(req, res) { 
    let data="";
    let request=http.request(options,(response)=>{
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
            data+=chunk;
            });
         response.on('end', () => {
           res.end(JSON.stringify(data));
            });
        }) 
        request.write(querystring.stringify(req.body)) 
        request.end()
    })
    

//注册接口
    app.post('/user/register',function(req,res){
    console.log(req.body)
    let user=fs.readFileSync('user.json',{encoding:"utf-8"})//读取文件
    user=JSON.parse(user);
    user.push(req.body);
    fs.writeFile('user.json',JSON.stringify(user),function(){
        res.end(JSON.stringify({
        "success":1,
        "info":"register success"
    }))
    })
    
    })
//login接口
    app.post('/user/login',function(req,res){
    let user=fs.readFileSync(__dirname+'/user.json',{encoding:"utf-8"})//读取文件
    user=JSON.parse(user);
    let login=req.body
    let resInfo={
        success:0,
        info:"用户名或密码错误",
        token:''
    }
    user.forEach(usr=>{
        if(usr.username==login.username&&usr.password==login.password){
            resInfo.success=1;
            resInfo.info="login success"
        }
    });
    if(resInfo.success==1){
       resInfo.token= jwt.sign(login,"1221",{
           expiresIn:60*60
       })
    }
    res.end(JSON.stringify(resInfo))
})
//添加购物车
    app.post('/user/Cart/addCart',function(req,res){
    console.log(req.body)
    jwt.verify(req.body.token,"1221",(err,decoded)=>{
        if(err){
            res.end(JSON.stringify({
                info:"登录过期,重新登录",
                detail:err.TokenExpiredError
            }))  
        }else{
            console.log(decoded)
            let cartInfo=JSON.parse(fs.readFileSync(__dirname+"/cart.json",{encoding:'utf-8'}))
             if(cartInfo[decoded.username]){
                 let recordList =cartInfo[decoded.username];
                 let flag=false;//新家商品
                 recordList .forEach((item,index)=>{
                     if(item.goods_id==req.body.goods_info.goods_id){
                         ++item.count;
                         flag=true;//重复商品
                     }
                 })
                if(!flag){
                    let record=req.body.goods_info;
                        record.count=1;
                        record.selected=0;
                        cartInfo[decoded.username].push(record)  
                }
               
                }else{
                    let record=req.body.goods_info;
                    record.count=1;
                    record.selected=0;
                    cartInfo[decoded.username]=[record]
            }
            fs.writeFile(__dirname+"/cart.json",JSON.stringify(cartInfo),function(){
                res.end("1")
            })    
        }
         })
    })
    //分类接口
   /* app.get('/catagorySon',function(req,res,next){
     let body=req.body;
     let cataInfo=JSON.parse(fs.readFileSync('./catagroy.json',{encoding:"utf-8"}))
     cataInfo.map((item,index)=>{
         if(item.id==body.id){
             res.end(JSON.stringify(item))
         }
     })
    })*/
//分类
    app.get("/catagorySon", function(req, res, next) {
        let body = req.query;
        let cartInfo = JSON.parse(fs.readFileSync("./catagroy.json", { encoding: "utf-8" }))
        cartInfo.map((item, index) => {
            if (item.id == body.id) {
                console.log(item)
                res.end(JSON.stringify(item))
            }
        })
    })

    app.post('/user/Cart/goodsList',function(req,res){
    console.log(req.body)
     jwt.verify(req.body.token,"1221",(err,decoded)=>{
        if(err){
            console.log(err)
            res.end(JSON.stringify({
                info:"登录过期,重新登录",
                detail:err.TokenExpiredError,
                error:1
            }))  
        }else{
        try{
            let goodsRecord=JSON.parse(fs.readFileSync('./cart.json',{encoding:"utf-8"}))
            let goodsList=goodsRecord[decoded.username]||[]
            res.json(goodsList)  
        } 
       catch(error){
         res.json(error)
        }
           
        }
    
    })
})
//删除购物车指定商品
app.post('/user/Cart/delGoods',function(req,res){
  console.log(req.body)
  let cartRecord=JSON.parse(fs.readFileSync(__dirname+"/cart.json",{encoding:"utf-8"}))//读取文件时，必须加————dirname
    jwt.verify(req.body.token,'1221',function(err,decoded){
        if(err){
            res.json(err)
        }else{
            let cartList=cartRecord[decoded.username]
            _.remove(cartList,function(item){
            return   req.body.selectedID.indexOf((item.goods_id)>-1)
              
    })
        console.log(cartList)
        cartRecord[decoded.username]=cartList;
      fs.writeFile(__dirname+"/cart.json",JSON.stringify(cartRecord),function(){
                res.json({
                success:1,
                info:"删除成功",
                delGoods:req.body.selectedID
            }) 
     })  
   
}
})
})
}