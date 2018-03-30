import React,{Component} from "react"
import "./mine.css"
import {loginOut} from "../../utils/utils.js"
class Mine extends Component{
    constructor(){
        super()
        this.toSetting=this.toSetting.bind(this)
    }
    render(){
        return <div id="mine">
            <header>        
             <span className="iconfont icon-set" onClick={this.toSetting}></span>我的717商城
             <dl>
                 <dt>
                     <img src={require('../../static/img/nav8.png')}alt=""/>
                 </dt>
                 <dd>user name</dd>
             </dl>
            </header>
        </div>
    }
    toSetting(){
        this.props.history.push('/setting')
    }
}
export default Mine