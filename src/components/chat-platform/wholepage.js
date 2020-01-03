import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import Contents from './mainContent'
import socketIOClient from 'socket.io-client'
import {connect} from 'react-redux'
import UserProfile from './Profile'
import Search from './search'

let socket

class Page extends React.Component{
    constructor(props){
        super(props)
        this.state={
            endpoint:"http://localhost:5000",
            socks: "",
            profile:true,
            content:false,
            message:false
        }
    }

    
    componentDidMount(){
        socket = socketIOClient(this.state.endpoint)
        this.props.setSocks(socket) 
        socket.on("FromFriend",data=>{
            this.props.received(data)
             console.log(data)
        })
        socket.on("Toself",msg=>{
            this.props.received(msg)
            console.log(msg)
        })
    }

    clickProfile =()=>{
        this.setState({
            content:false,
            profile:true,
            message:false
        })
    }
    clickMessage=()=>{
        this.setState({
            content:true,
            profile:false,
            message:false
        })
    }

    search=()=>{
        this.setState({
            content:false,
            profile:false,
            message:true 
        })
    }
    render(){
        
        return(
            <div>   
                <Header  onFocus={this.search} onBlur={this.clickProfile}/>
                <Sidebar clickProfile={this.clickProfile} clickMessages={this.clickMessage}/>
                {this.state.content? <Contents />:<div></div>}
                {this.state.profile? <UserProfile />:<div></div>}
                {this.state.message? <Search />:<div></div>}
            </div>
        )
    }
}


const setSocket = data =>({
    type:"SET_SOCKET",
    data:data
})

const receivedMessage = data=>({
    type:"RECEIVED_MESSAGE",
    data:data
})



const mapDispatchToProps = dispatch=>{
    return{
        setSocks: (data)=>dispatch(setSocket(data)),
        received: data=> dispatch(receivedMessage(data))
    }
}

export default connect(null,mapDispatchToProps)(Page)