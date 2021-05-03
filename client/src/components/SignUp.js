import React from 'react'
import '../style/Login.css';

class SignUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            lastname: '',
            firstname: ''
        }
    }
    
    setLastname = (e) => {
        this.setState({lastname: e.currentTarget.value})
    }
    setFirstname = (e) => {
        this.setState({firstname: e.currentTarget.value})
    }
    setLogin = (e) => {
        this.setState({login: e.currentTarget.value})
    }
    setPassword = (e) => {
        this.setState({password: e.currentTarget.value})
    }
    


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        const login = this.state.login;
        const password = this.state.password;
        const lastname = this.state.lastname;
        const firstname = this.state.firstname;
        console.log("login = ",login);
        console.log("password = ",password);
        console.log("lastname = ",lastname);
        console.log("firstname = ",firstname);
        this.props.outil(this.state.login, this.state.password, this.state.lastname, this.state.firstname);
    }
    
    render() {
        return ( <div className="login">
            <h2>Inscription</h2>
            <form onSubmit={this.submitHandler} >

                <div className="elemform">
                    <label for="lastname"> Lastname</label>
                    <input
                        placeholder="lastname"
                        value={this.state.lastname}
                        type="text" 
                        id="lastname" 
                        name="lastname" 
                        onChange={ this.changeHandler }
                    />
                </div>
                <div className="elemform">
                    <label for="firstname"> Firstname</label>
                    <input
                        placeholder="firstname"
                        value={this.state.firstname}
                        type="text" 
                        id="firstname" 
                        name="firstname"
                        onChange={ this.changeHandler }
                    />
                </div>
                <div className="elemform">
                    <label for="login_in">  Login </label>
                    <input
                        placeholder="login"
                        value={this.state.login}
                        type="text" 
                        id="login_in" 
                        name="login"
                        onChange={ this.changeHandler }
                    />
                </div>
                <div className="elemform">
                    <label for="password_in">Password</label>
                    <input
                        placeholder="password"
                        value={this.state.password}
                        type="password" 
                        id="password_in" 
                        name="password"
                        onChange={ this.changeHandler }
                    />
                </div>
                <div class="button">
                    <button>S'inscrire</button>
                </div>
            </form>
            <div>
                    <button 
                        className="button-pas-encore-inscrit"
                        type="onclick" 
                        onClick={ ()=>{ this.props.acces('FirstPage') } }>
                        <span>Pas encore inscrit ?</span>
                    </button>
                </div>
        </div>
        )
    }

}

export default SignUp;
