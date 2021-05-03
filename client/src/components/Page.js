import react from 'react'
import Profile from './Profile'
import Messages from './Messages'
import Followers from './Followers'
import Followings from './Followings'
import axios from 'axios';


class Page extends react.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }  

    response = axios.create({
        baseURL: '/api',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    getMessage= ()=>{
        this.response.get(`/message/${this.props.login}`)
        .then(res => {

              this.setState(
                {messages: res.data}
              )
              console.log("dans messages : ", this.state.messages)
              console.log("oualala okok msg", JSON.stringify(res.data)); // � tester la premi�re fois pour voir ce que retourne le serveur
        })
     .catch((error) => {
           console.log("mmmmmmmmmmmmm", error);
        });
    }
    
    componentDidMount() {
        this.getMessage();
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
                    {this.state.messages.map((d) => {
                        return (
                            <Messages msg={JSON.stringify(d)}/>
                        )
                    })}
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
                    <Followings />
                </div>
            }
        </div>
    }
}

export default Page;
