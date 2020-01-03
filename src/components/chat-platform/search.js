import React from 'react'
import { Card } from 'react-bootstrap'

class Search extends React.Component{
    render(){
        return(
            <div className="ml-2 mt-2" style={{width:"350%"}}>
                <Card style={{width:"20%"}}>
                    <Card.Img src="https://image.flaticon.com/icons/png/512/126/126486.png"
                    style={{width:"20%"}} className="mt-2 float-left"/>
                    <Card.Body className="float-left">
                    
                    </Card.Body>

                </Card>
            </div>
        )
    }
}
export default Search