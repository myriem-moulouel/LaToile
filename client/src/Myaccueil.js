import React from 'react';
import BarreGauche from './BarreGauche';
import Post from './Post'
import Feed from './Feed'
import Widgets from './Widgets'

class Myaccueil extends React.Component {

    render() {
        return <div>
            <h5>Bienvenue : {this.props.login} {this.props.firstname} {this.props.lastname} </h5>
            <Feed lastname={this.props.lastname} firstname={this.props.firstname} login={this.props.login} />
            <BarreGauche activate={this.props.activate} accedeHome={this.props.setHome} accedeProfile={this.props.setProfile} setLogout={this.props.setLogout} deleteUser={this.props.deleteUser} />
            <Widgets />
            
        </div>
    }
}

export default Myaccueil;
