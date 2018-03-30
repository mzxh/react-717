let baseCofig=require('./webpack.base')
let webpack=require('webpack');
let DefinePlugin=webpack.DefinePlugin;
baseCofig.plugins.push(new DefinePlugin({
  "process.env":'"development"'
}))
 module.exports={
        ...baseCofig,
        devServer:{
            historyApiFallback:true,//防止刷新页面时404打印出来
            inline:true,
            open:true,
            port:3000,
            noInfo:true
        },
        devtool:"eval-source-map"
    }