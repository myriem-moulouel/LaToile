import react from 'react'

class Profile extends react.Component {
    render(){
        return <div onClick={ this.fun} >
            <h2>Personal informations :</h2>
            <h4>Lastname: {this.props.lastname}</h4>
            <h4>Firstname: {this.props.firstname}</h4>
            <h4>Login: {this.props.login}</h4>
        </div>
    }
}

export default Profile
