import React,{Component} from "react"
import "./search.css"
import "../../static/css/rest.css"
class Search extends Component{
        constructor(){
            super()
            this.state={
                historyList:[]
            }
            this.toSearch=this.toSearch.bind(this)  
            this.clearHistory=this.clearHistory.bind(this)
            }
    render(){
        
        let {historyList} =this.state;
        return <div id="sear">
            <header> <input  type="text" ref="keyWords" placeholder="请输入您要购买的商品"/> <button onClick={this.toSearch}>搜索</button></header>
            <section>
            <div className="recent-sear">
                <p className="ks-clear">最近搜索 <span className="sc" onClick={this.clearHistory}>删除</span></p>
                {historyList.length==0?<p>暂无搜索记录...</p>:
                <ul>
                  {this.state.historyList.map((item,index)=>{
                      return <li key={index} onClick={()=>{this.toResult(item)}}>{item}</li>
                  })}
                </ul>}
            </div>
             <div className="common-sear">
                 <p className="ks-clear">大家都在搜索</p>
                 <ol>
                      <li>粽子</li> <li>芒果</li> <li>手机</li> <li>方方面</li>
                      <li>粽子</li> <li>粽子</li>
                 </ol>
            </div>
        </section>
        </div>
    }
clearHistory(){//清空history
    localStorage.removeItem('SearchHistory');
   this.setState({
       historyList:[]
   })

}
    toSearch(){
        if(!this.refs.keyWords.value) return;
        let keyWords=this.refs.keyWords.value;
        let ls=localStorage;
        if(ls.getItem('SearchHistory')){
     let shArr=JSON.parse(ls.getItem('SearchHistory'));
         if(shArr.indexOf(keyWords)>-1) return;
         shArr.push(keyWords)
         ls.setItem('SearchHistory',JSON.stringify(shArr))
        }else{
           ls.setItem('SearchHistory',JSON.stringify([keyWords]));  
        }
       this.props.history.push('/index/result',{
           key_words:keyWords
       }) 
    }
    toResult(keyWords){
       this.props.history.push('/index/result',{
           key_words:keyWords
       })  
    }
    componentDidMount(){
        if(localStorage.getItem('SearchHistory')){
             this.setState({
                 historyList:JSON.parse(localStorage.getItem('SearchHistory'))
             })
        }
    }
         
  
}
export default Search