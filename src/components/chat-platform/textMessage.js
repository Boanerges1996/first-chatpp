import React from 'react'

class TextMessage extends React.Component{
    render(){
        return(
            <span className="" style={this.props.style}>
                {this.props.message}
            </span>
        )
    }
}
export default TextMessage