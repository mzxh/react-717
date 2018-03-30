console.log(process.env.NODE_ENV)//用来判断是开发版本还是线下版本
//dev:起服务，不用进行压缩
//build：打包模式，不用起服务，要进行压缩，代码分离
let path=require('path')
let dir=process.cwd()//获取当前程序运行的目录
let baseCofig={//commonjs规范
   entry:{
      "bundle":dir+'/src/main'
   },
   output:{
   filename:"[name].js",
   "path":dir+"/dist"
   },
   module:{
       rules:[
           {
           test:/\.(js|jsx)$/,
           use:['babel-loader']
           },
          {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
               exclude:path.resolve(__dirname, 'node_modules/')

           },
            {
               test:/\.css$/,
               use:['style-loader','css-loader']
           },{
               test:/.(eot|svg|ttf|woff)/,
               use:['url-loader']
           },{
               test:/.(jpg|png|gif|jpeg)/,
               use:['url-loader']
           }
       ]
   },
    plugins:[],
    resolve:{
        extensions:['.js','.jsx']
    }
}
module.exports=baseCofig;


