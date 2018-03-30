#电商项目
1.页面
    首页
    分类列表页
    搜索页
        详情页
    分类页
    购物车
    我的
      登录
      注册
    邮寄地址管理
       添加
       邮寄地址列表
     订单管理页
2.common组件封装
   弹出框
   商品模块
   轮播图模块
   购物车商品模块
   邮寄地址模块
   封装cookie//主要用于存储token

3.主要用的
   React,redux,react-router,react-redux,redux-sage,webpack.react-router-dom
   react-redux和react-sage:主要用于统一管理数据
   mobile端,自适应
   数据请求：fetch，封装
   用node搭建一个简单的静态服务器，准备一定的模拟接口.

自行搭建脚手架：webpack //可以自行切换不同环境的脚手架

4./index/home 首页
   下拉加载:除头部最外面的大盒子的offsetHeight大于整个大盒子的offsetHeight和滚动条距离顶部的距离scrollTop时,利用find技术 向前端请求id 传到后端在前端id自增的时候 后台更新值就加载新的数据并渲染到页面上
   懒加载/
   点击icon为购物车按钮是，发送http请求，把token和商品的channel_id传给后台,再由后台进行匹配，数据匹配成功后保存到购物车

5.分类页面：点击每个分类把相应的id传给后台，后台进行id进行对比，利用Lodash技术，再传过去的数组里面找到的话返回-1，将数据删除

6. 重点: 购物车页面：
 点击加减:通过redux进行统一管理
删除：
      点击删除的时候把从store里面拿到的时候遍历 找到所有数据的id然后
      存到一个数组里面把所有的id传到后台 根据后台id进行比对 利用lodash技术，
      在传过去的数组里面找id 找到的时候就返回-1 顺便把数据删除
结算
    