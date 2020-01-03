import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'

class Signup extends React.Component{
    state = {
        username:"",
        email:"",
        password:""
    }

    takeInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    signUp =async(e)=>{
        e.preventDefault()
        try{
            const data = await Axios.post("http://localhost:5000/user/register",this.state)
            this.props.SIGNUP(data.data)
        }
        catch(err){
            console.log(err)
        }
        
    }
    render(){
        if(this.props.logged){
            return <Redirect to="/user" />
        }
        return(
            <div className="container h-100" style={{backgroundColor:"#E3F2FD"}}>
                <button className="btn btn-primary float-left">Back</button>
                <div className="myForm">
                    <input className="form-control mb-2 " type="text" placeholder="Username" name="username" value={this.state.username}
                        onChange={this.takeInput}
                    />
                    <input className="form-control mb-2" type="email" placeholder="Email" name="email" value={this.state.email}
                        onChange={this.takeInput}
                    />
                    <input className="form-control mb-2" type="password" placeholder="Password" name="password" value={this.state.password}
                        onChange={this.takeInput}
                    />
                    <button className="btn btn-primary" onClick={this.signUp}>Sign Up</button>
                </div>
                <div>Login if account already exists. <Link to="/">Login</Link></div>
            </div>
        )
    }
}

const signUP = data=>({
    type:"SIGNUP",
    data:data
})

const mapStateToProps = state =>{
    return {
        logged: state.user.logged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SIGNUP: (data)=>dispatch(signUP(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup)