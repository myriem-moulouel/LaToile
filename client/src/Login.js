import React, { Component } from 'react';
import './App.css';
import postLogin from './postLogin'

class Login extends Component {

  constructor(){
    super();
    this.state = {
      login: '',
      password: ''
    }
  }
  oo = () => {
    console.log("lll");
  }
  
  post = () => {
    postLogin(this.state.login, this.state.password);
  }
  
  render() {
    return <div className="LoginForm">
      <h2>Connexion</h2>
      <form action="../api/user/login" method="post" className="form">
        <div className="elemform">
          <label htmlFor="login">  Login </label>
          <input 
            type="text" 
            id="login" 
            name="login"
            onChange={(e) => this.setState({login: e.target.value}) }/>
        </div>
        <div className="elemform">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            onChange={(e) => this.setState({password: e.target.value}) }/>
        </div>    
        <div class="button">
          <button 
            type="submit"
            onClick={ postLogin(this.state.login, this.state.password) }>Connexion</button>
        </div>
      </form>
    </div>;
  }
}

export default Login;
