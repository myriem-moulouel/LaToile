import React, { Component } from 'react';
import './App.css';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      login: null,
      password: null
    }
    console.log(this.state)
  }
    handleChangeL = event => {
        this.setState({ login: event.target.value });
        console.log(event.currentTarget.value)
    }
        
    handleChangeP = event => {
        this.setState({ password: event.target.value });
        console.log(event.currentTarget.value)
    }
    
    submit = (e) => {
        e.preventDefault();
        console.log(`login:${this.state.login}  password:${this.state.password}`);
        const login = this.state.login;
        const password = this.state.password;
        console.log(login);
        console.log(password);
        this.props.outil( this.state.login, this.state.password );
        this.props.searching(this.state.login);
    }
  
    render() {
        return <div className="LoginForm">
            <h2>Connexion</h2>
            <form onSubmit={this.submit}>
                <div class="elemform">
                    <label for="login">  Login </label>
                    <input 
                    type="text" 
                    id="login" 
                    name="login"
                    onChange={ this.handleChangeL } 
                    value={this.state.login}/>
                </div>
                <div class="elemform">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        onChange={ this.handleChangeP }
                        value={this.state.password}/>
                </div>    
                <div class="button">
                    <button>Connexion</button>
                </div>
            </form>
                <div><p>Pas encore inscrit ? veuillez retourner </p>
                    <button 
                        type="onclick" 
                        onClick={ ()=>{ this.props.acces('Accueil') } }>
                        <span> Retour </span>
                    </button>
                </div>
        </div>;
    }
}

export default Login;
