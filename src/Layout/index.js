import React,{Component} from 'react'
import TopBar from "../components/topbar";
import LoginForm from "../components/login";

class Layout extends Component{
    constructor(props){
        super(props);

        this.state = {

            showLoginForm: false

        }
    }
    render(){
        const {showLoginForm} = this.state;

        return(
            <div className={'app-layout'}>
                <TopBar onShowLoginForm ={() => {
                    this.setState({
                        showLoginForm: true,
                    });
                }}/>
                {showLoginForm ? <LoginForm onClose={()=>{
                    this.setState({
                        showLoginForm: false,
                    });
                }
                }/>:null}
            </div>
        )
    }
}

export default Layout;

