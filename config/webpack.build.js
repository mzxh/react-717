let baseCofig=require('./webpack.base')
const webpack=require('webpack')
let UglifyPlugin =webpack.optimize.UglifyJsPlugin;
let DefinePlugin=webpack.DefinePlugin;
    //往plugins中追加插件
    baseCofig.plugins.push(new UglifyPlugin())
    baseCofig.plugins.push(new DefinePlugin({
        "process.env":'"production"'
    }))
    module.exports={
        ...baseCofig
    }
