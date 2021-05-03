import react from 'react'
import '../style/Messages.css'

class Messages extends react.Component {

    msg = JSON.parse(this.props.msg).doc

    render(){
        return <div className="messages">
            <div className="enteteM">
                <div className="loginM">{this.msg.login}</div>   
                <div className="dataM">date: {this.msg.date}</div>
            </div>
            <div className="messageM">{this.msg.message}</div>
            <div>*</div>
        </div>
    }
}

export default Messages
