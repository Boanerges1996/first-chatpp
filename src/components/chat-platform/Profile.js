import React from 'react'
import { Card } from 'react-bootstrap'
import {connect} from 'react-redux'
import {storage} from '../../firebase/index'
import Axios from 'axios'

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            othernames: this.props.othernames,
            password: "",
            email:this.props.email,
            telephone:"",
            url: this.props.url,
            imageUrl:"",
            firstnameDisable: true,
            lastnameDisable:true,
            othernamesDisable:true,
            telephoneDisable:true,
            passwordDisable:true,
            emailDisable:true
        }
    }

    componentDidMount(){
        Axios.get(`http://localhost:5000/user/get/info/${this.props.username}`).then(data=>{
            this.props.getUserInfo(data.data)
        })
    }

    firstNameDisable = ()=>{
        this.setState({
            firstnameDisable:!this.state.firstnameDisable
        })
    }
    lastNameDisable =()=>{
        this.setState({
            lastnameDisable:!this.state.lastnameDisable
        })
    }
    othernamesDisable =()=>{
        this.setState({
            othernamesDisable:!this.state.othernamesDisable
        })
    }
    telephoneDisable =()=>{
        this.setState({
            telephoneDisable:!this.state.telephoneDisable
        })
    }

    passwordDisable =()=>{
        this.setState({
            passwordDisable:!this.state.passwordDisable
        })
    }
    emailDisable =()=>{
        this.setState({
            emailDisable:!this.state.emailDisable
        })
    }

    changeInput = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    pickImage=(e)=>{
        if(e.target.files[0]){
            this.setState({imageUrl:e.target.files[0]})
        }
        const file = e.target.files[0]
        const uploadTask = storage.ref(`images/${file.name}`).put(file)
        uploadTask.on('state_changed',(snapshot)=>{
            // Shows our progress
        },(error)=>{
            // error function
            console.log(error)
        },
        ()=>{
            storage.ref('images').child(file.name).getDownloadURL().then(imageUrl=>{
                console.log(imageUrl)
                this.setState({url:imageUrl})
            })
        })
    }

    updateUser =async ()=>{
        const data = {
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            othernames:this.state.othernames,
            url:this.state.url,
            telephone:this.state.telephone
        }
        console.log(data)
        try{
            const info = await Axios.put(`http://localhost:5000/user/update/${this.props.username}`,data)
            console.log(info.data)
            this.props.updateuser(info.data)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }

    render(){
        return (
            <div className="float-left myBorder mySize ml-2 rounded ">
                <Card style={{width:"30rem",margin:"0 auto"}} className="mt-2">
                    <Card.Img variant="top" src={this.props.url} style={{width:"100%", height:"300px"}} alt="user avatar"/>
                    <Card.Body>
                        <label htmlFor="myimage">Select image</label>
                        <input className="btn btn-primary" type="file" name="myImage" accept="image/*" onChange={this.pickImage} id="myimage"/>
                        <Card.Title>{this.props.username}</Card.Title>
                        <Card.Text as={"div"}>
                            <div className="row">
                                <div className="input-group mb-2 col-6">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text myHover"  onClick={this.firstNameDisable}>Edit</div>
                                    </div>
                                    <input type="text" className="form-control"
                                    placeholder="Firstname"
                                    disabled={this.state.firstnameDisable} value={this.state.firstname}
                                    name="firstname" onChange={this.changeInput}
                                    />
                                </div>
                                <div className="input-group mb-2 col-6">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text myHover" onClick={this.lastNameDisable}>Edit</div>
                                    </div>
                                    <input type="text" className="form-control"
                                    placeholder="Lastname" name="lastname"
                                    disabled={this.state.lastnameDisable} value={this.state.lastname} onChange={this.changeInput}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-2 col-6">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text myHover" onClick={this.othernamesDisable}>Edit</div>
                                    </div>
                                    <input type="text" className="form-control"  placeholder="Othernames"
                                    disabled={this.state.othernamesDisable} value={this.state.othernames} onChange={this.changeInput}
                                    name="othernames"/>
                                </div>
                                <div className="input-group mb-2 col-6">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text myHover" onClick={this.telephoneDisable}>Edit</div>
                                    </div>
                                    <input type="number" className="form-control" placeholder="Telephone"
                                    disabled={this.state.telephoneDisable} value={this.state.telephone} name="telephone"
                                    onChange={this.changeInput}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text myHover" onClick={this.passwordDisable}>Edit</div>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Password"
                                    disabled={this.state.passwordDisable} onChange={this.changeInput}
                                    name="email"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text myHover" onClick={this.emailDisable}>Edit</div>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Email"
                                    disabled={this.state.emailDisable} value={this.state.email} onChange={this.changeInput}/>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-2" onClick={this.updateUser}>Save</button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        username: state.user.username,
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        othernames: state.user.othernames,
        telephone: state.user.telephone,
        email: state.user.email,
        url: state.user.url
    }
}

const UpdateUser = data=>({
    type:"UPDATE_USER",
    data:data
})
const getUser = data =>({
    type:"GET_INFO",
    data:data
})

const mapDispatchToProps = dispatch=>{
    return {
        updateuser: data=>dispatch(UpdateUser(data)),
        getUserInfo: data=>dispatch(getUser(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)