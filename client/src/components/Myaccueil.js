import React from 'react';
import BarreGauche from './BarreGauche';
import TweetBox from './TweetBox'
import Widgets from './Widgets'
import '../style/Myaccueil.css'

class Myaccueil extends React.Component {

    render() {
        return <div >
            <h5>Bienvenue : {this.props.login} {this.props.firstname} {this.props.lastname} </h5>
            <div>            
                <TweetBox lastname={this.props.lastname} firstname={this.props.firstname} login={this.props.login} addMessage={this.props.addMessage} getUser={this.props.getUser} />
            </div>
            <div>
                <BarreGauche activate={this.props.activate} accedeHome={this.props.setHome} accedeProfile={this.props.setProfile} accedeMessages={this.props.setMessages} accedeFollowers={this.props.setFollowers} accedeFollowings={this.props.setFollowings} setLogout={this.props.setLogout} deleteUser={this.props.deleteUser} lastname={this.props.lastname} firstname={this.props.firstname} login={this.props.login} messages={this.props.messages} getMessage={this.props.getMessage} />
            </div>
            <Widgets />
        </div>
    }
}

export default Myaccueil;
