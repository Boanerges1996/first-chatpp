import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux';

class Login extends React.Component{
    state={
        username:"",
        password:""
    }

    takeInput =e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    login=async()=>{
        try{
            let info = await Axios.post("http://localhost:5000/user/login",this.state)
            console.log(info)
            this.props.redLogin(info.data)
        }
        catch(err){
            console.log(err)
        }
    }

    render(){
        if(this.props.logged){
            return <Redirect to="/user"/>
        }
        return(
            <div className="container h-100" style={{backgroundColor:"#E3F2FD"}}>
                <div className="myForm">
                    <input className="form-control mb-2" type="text" placeholder="Username..." name="username"
                    onChange={this.takeInput} />
                    <input className="form-control mb-2" type="password" placeholder="Password..."  name="password" 
                    onChange={this.takeInput}/>
                    <button className="btn btn-primary" onClick={this.login}>Login</button>
                </div>
                <div>Please sign up if you dont have Account. <Link to='/signup'>Signup</Link></div>
            </div>
        )
    }
}


const login=data=>({
    type:"LOGIN",
    data:data
})

const mapStateToProps=state=>{
    return{
        logged: state.user.logged
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        redLogin: (data)=>dispatch(login(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)