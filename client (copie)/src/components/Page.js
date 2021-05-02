import react from 'react'
import Profile from './Profile'
import Messages from './Messages'
import Followers from './Followers'
import Followings from './Followings'

class Page extends react.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        }
    }
    setMessage = () => {
        
    }


    render(){
        return <div>
            { this.props.activate === 'Home' &&
                <div>
                    <h1> home </h1>
                </div>
            }
            { this.props.activate === 'Profile' &&
                <div>
                    <h1> Profile </h1>
                    <Profile lastname={this.props.lastname} firstname={this.props.firstname} login={this.props.login} />
                </div>
            }
            { this.props.activate === 'Messages' &&
                <div>
                    <h1> messages </h1>
                    
                    <Messages />
                </div>
            }
            { this.props.activate === 'Followers' &&
                <div>
                    <h1> Followers </h1>
                    <Followers />
                </div>
            }
            { this.props.activate === 'Followings' &&
                <div>
                    <h1> Followings </h1>
                </div>
            }
        </div>
    }
}

export default Page;
