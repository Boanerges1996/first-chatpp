import React from 'react'
import {connect} from "react-redux"
import { Redirect } from 'react-router'
import axios from 'axios'


class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            names:[]
        }
        this.timeout = 0
    }

    doSearch= async(e)=>{
        let value = e.target.value.split(" ")
        this.setState({names:value})
        console.log(this.state.names)
        if(this.timeout) 
            clearTimeout(this.timeout)
        this.timeout = setTimeout(()=>{
            try{
                axios.get(`http://localhost:5000/user/search?name=${value}`).then(dat=>{
                    console.log(dat)
                })
            }
            catch(err){
                console.log(err)
            }
            
        },300)
    }

    // searchIng=(e)=>{
    //     console.log(this.state)
    //     e.preventDefault()
    //     Axios.get("http://localhost:5000/user/search",this.state).then(data=>console.log(data))
    // }

    logout = ()=>{
        localStorage.removeItem("state")
        this.props.redLogout()
    }
    render(){
        if(!this.props.logged){
            return <Redirect to="/"/>
        }
        return(
            <div className="w-100" style={{height:"80px",backgroundColor:"#42A5F5"}}>
                <img className="img-thumbnail rounded-circle avatar float-left" 
                src={this.props.url} />
                <button className="btn btn-primary mt-3 float-right mr-2 hover" onClick={this.logout}>Logout</button>
                <form className="form-inline my-3 my-lg-3 float-right mr-2">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.doSearch} 
                    onFocus={this.props.onFocus} onBlur={this.props.onBlur} /> {/*onBlur achieves same as out of focus */}
                    <button className="btn btn-outline-primary my-2 my-sm-0">Search</button>
                </form> 
            </div>  
        )
    }
}

const mapStateToProps = state =>{
    return{
        url: state.user.url,
        logged:state.user.logged
    }
}

const LOGOUT = ()=>({
    type:"LOGOUT"
})

const mapDispatchToProps = dispatch =>{
    return {
        redLogout: ()=> dispatch(LOGOUT())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)