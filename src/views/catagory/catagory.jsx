import React,{Component} from "react"
import {Link} from "react-router-dom"
import $http from "../../utils/http"
import "./catagory.css"
class  Catagory extends Component{
    constructor(){
		super()
		this.state={
			listId:0,
			num:"",
			listCot:""
		}
    }
    changeBg(index,id){
		this.setState({
			listId:index
		})
		$http.get("/catagorySon",{id:id})
		.then(res=>{
			this.setState({
				listCot:res
			})
		})
	}
    toSearch(){
        this.props.history.push('/index/search',{
            from:this.props.location.pathname
        })
    }
    render(){
        let {routes} = this.props;
		let {listCot} = this.state;
        return <div id="catagory">
           <header><input type="text" placeholder="请输入你要购买的商品" onFocus={()=>{this.toSearch()}}/></header>
           <section>
                <div className="left">
                    <ul>
                        {
                            routes.map((item,index)=>{
                              return <li key={index} className={this.state.listId==index?"activeList":""} onClick={()=>{this.changeBg(index,item.id)}}>{item.name}</li>  
                            })
                        }

                    </ul>
                </div>
                <div className="right">
                         {
                             listCot&&listCot.classifyData.map((item,index)=>{
                                 return <Link to="/detail" key={index}>          
                             <dl >        
                                <dt><img src={item.imgSrc}/></dt>
                                <dd>{item.name}</dd>
                            </dl>
                            </Link>
                            })
                         }
                </div>
           </section>
        </div>
    }
    componentDidMount(){
      $http.get('/catagorySon',{id:"classify_1"})
      .then(res=>{
         this.setState({
             listCot:res
         })
      })
    }
}
export default Catagory