import React from 'react'
import { Button } from 'react-bootstrap'
import TextMessage from './textMessage'
import {connect} from 'react-redux'

class Chats extends React.Component{

    state ={
        message:""
    }

    takeMessage =(e)=>{
        this.setState({message:e.target.value})
    }

    sendMessage= async(e)=>{
        e.preventDefault()
        console.log(this.props.socket.id)
        this.props.socket.emit("SendToAll",{message:this.state.message,sender:"sender"},data=>console.log(data))
        this.setState({message:""})
    }

    render(){
        return (
            <div className="myBorder h-100 mt-1">
                <div className="messageBody myBorder">
                    {this.props.messages.map(data=>{
                        return <TextMessage message={data.message} style={{float:data.sender==="sender"?"right":"left",clear:"both"}}/>
                    })}
                </div>
                <form className="m-3"  onSubmit={this.sendMessage}>
                    <input type="text" className="form-control float-left" style={{width:"70%"}} onChange={this.takeMessage} 
                    value={this.state.message}/>
                    <Button className="float-left" onClick={this.sendMessage}>Send</Button>
                </form>
            </div>
        )
    }
}

const receivedMessage = data=>({
    type:"RECEIVED_MESSAGE",
    data:data
})

const mapDispatchToProps = dispatch=>{
    return {
        received: data=> dispatch(receivedMessage(data))
    }
}

const mapStateToProps =(state)=>{
    return{
        messages: state.messages,
        socket: state.socket
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Chats)