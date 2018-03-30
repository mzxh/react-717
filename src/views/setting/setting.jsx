import React,{Component} from "react"
import {loginout} from "../../utils/utils"
import "./setting.css"
import {Dialog} from "../../components/dlog/dialog"
class Setting extends Component{
    constructor(){
        super()
        this.state={
            flag:false
        }
        this.Back=this.Back.bind(this)
        this.loginOut=this.loginOut.bind(this)
    }
    Back(){
     this.props.history.push('/index/mine')
    }
    loginOut(){
        this.setState({
            flag:true
        })
        let dialog_bg = document.querySelector('.dialog_bg')
        dialog_bg!=null?dialog.className='dialog_bg':''
    }
    render(){
        return <div id="setting">
            <header><span onClick={this.Back}>返回</span>设置</header>
            <section>
                <p>我的头像<span className="iconfont icon-mine"></span></p>
                <p>用户名<span>路飞</span></p>
                <p>我的二维码名片<span className="iconfont icon-catagory"></span></p>
                  <button onClick={this.loginOut} className="lOut">退出登录</button>
                   {
                    this.state.flag &&<Dialog loginout={loginout} history={this.props}></Dialog>
                }
            </section>
          
        </div>
    }
}
export default Setting