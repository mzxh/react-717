import React,{Component} from "react"
import "./login.css"
import $http from  "../../utils/http"
import {Link} from "react-router-dom"
class  Login extends Component{
    constructor(){
        super()
        this.toLogin=this.toLogin.bind(this)
    }
    render(){
        return <div id="login">
             <h1>登录页面</h1>
             <p><Link to="/register" style={{float:"right",padding:"0 0.2rem"}}> 注册     </Link></p>
             <p><input type="text" className="username" ref="username"/></p>
             <p><input type="password" className="password" ref="password"/></p>
             <p><button onClick={this.toLogin}>注册</button></p>
        </div>
    }
  toLogin(){
     let {username,password}=this.refs;
     $http.post('/user/login',{
         username:username.value,
         password:password.value
     })
        .then(res=>{
            if(res.success==1){
                let from=this.props.location.state?this.props.location.from||"index/home":"index/home";
            document.cookie="token="+res.token;
            this.props.history.push(from)
            }else{
     alert('登录错误')
            }
          
        })
  }

}
export default Login