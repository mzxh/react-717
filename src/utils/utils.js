export function getCookie(name){
    let cookieStr =document.cookie;
    if(cookieStr.length==0) return;
    let arr;
    let res=null;
   if(cookieStr.indexOf(';')>-1){
       arr=cookieStr.split(';')
       arr.forEach((cookie,index)=>{
        let tmp_arr= cookie.split('=')
        if(tmp_arr[0]==name){
            res=tmp_arr[1]
        }
       })
   }else{
     let tmp_arr= cookieStr.split('=')
        if(tmp_arr[0]==name){
            res=tmp_arr[1]
        }
   }
    return res
}

export function loginout(){
    let t=new Date()//中国时区
    t.setTime(t.getTime()-1)//当前时间的上一毫秒
    document.cookie="token="+getCookie('token')+";expires="+t.toUTCString()//全球时间
}