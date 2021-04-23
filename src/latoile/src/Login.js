import React from 'react';
import './App.css';

class Login extends React.Component {
  
  render() {
    return <div className="LoginForm">
      <h2>Connexion</h2>
      <form action="" method="post" className="form">
        <div className="elemform">
          <label htmlFor="login">  Login </label>
          <input type="text" id="login" name="login"/>
        </div>
        <div className="elemform">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"/>
        </div>    
        <div className="button">
          <button type="submit" href="/login" onClick={() => { this.props.login() }}>Connexion</button>
        </div>
      </form>
    </div>;
  }
}

export default Login;
