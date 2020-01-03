import React from 'react'
import { Nav } from 'react-bootstrap'

class Sidebar extends React.Component{
    render(){
        return(
            <div className="myNav float-left rounded">   
                <Nav defaultActiveKey="Friends" className="flex-column" variant="pills">
                    <Nav.Link eventKey="Profile" className="text-center myBorder" onClick={this.props.clickProfile}>Profile</Nav.Link>
                    <Nav.Link eventKey="Friends" className="text-center myBorder" onClick={this.props.clickFriends}>Friends</Nav.Link>
                    <Nav.Link eventKey="Messages" className="text-center myBorder" onClick={this.props.clickMessages}>Messages</Nav.Link>
                    <Nav.Link eventKey="Search" className="text-center myBorder">Search</Nav.Link>
                </Nav>
            </div>
        )
    }
}

export default Sidebar