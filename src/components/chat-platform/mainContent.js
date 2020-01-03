import React from 'react'
import Chats from './chats'

class Contents extends React.Component{
    render(){
        return(
            <div className="container float-left myBorder mySize ml-2 rounded">
                <Chats />
            </div>
        )
    }
}
export default Contents