import React from 'react';
import BarreGauche from './BarreGauche';
import Post from './Post'
import Feed from './Feed'
import Widgets from './Widgets'
import './Myaccueil.css'

class Myaccueil extends React.Component {

    render() {
        return <div >
            <h5>Bienvenue : {this.props.login} {this.props.firstname} {this.props.lastname} </h5>
            <div>            
                <Feed lastname={this.props.lastname} firstname={this.props.firstname} login={this.props.login} />
            </div>
            <div>
                <BarreGauche activate={this.props.activate} accedeHome={this.props.setHome} accedeProfile={this.props.setProfile} accedeMessages={this.props.setMessages} accedeFollowers={this.props.setFollowers} accedeFollowings={this.props.setFollowings} setLogout={this.props.setLogout} deleteUser={this.props.deleteUser} lastname={this.props.lastname} firstname={this.props.firstname} login={this.props.login} />
            </div>
            <Widgets />
        </div>
    }
}

export default Myaccueil;
