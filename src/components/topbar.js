import React,{Component} from 'react'

export default class TopBar extends Component{
    render(){
        return(
           <div className={"app-top-bar"}>
               <div className={"app-top-bar-inner"}>
                   <div className={"app-top-bar-left"}>
                       <div className={"site-name"}>
                           <div className={"icon-site"}>

                           </div>
                       </div>
                   </div>

                   <div className={"app-top-bar-right"}>
                       <div className={"app-top-bar-right-inner"}>
                           <div className={"user-profile"}>
                               <div className={"user-profile-img"}>
                                   <img width="50px"  src="https://academist-app-production.s3.amazonaws.com/uploads/user/profile_image/4154/default_user_icon.png"/>
                               </div>
                           </div>

                           <ul className={"user-profile-menu"}>
                               <li onClick={()=>{
                                   if(this.props.onShowLoginForm){
                                       this.props.onShowLoginForm(true);
                                   }
                               }} className={"user-signin-button"}>Вход</li>
                           </ul>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}