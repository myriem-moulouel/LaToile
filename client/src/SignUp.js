import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import putUser from './putUser'

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
    
    render() {
        return ( <div className="LoginForm">
            <h2>Inscription</h2>
            <form action="../api/user" method="put" class="form">

                <div class="col-1">
                    <label for="lastname"> Lastname</label>
                    <input 
                        type="text" 
                        id="lastname" 
                        name="lastname" 
                        onChange={(e) => this.setState({lastname: e.target.value}) }
                    />
                </div>
                <div>
                    <label for="firstname"> Firstname</label>
                    <input type="text" 
                        id="firstname" 
                        name="firstname"
                        onChange={(e) => this.setState({firstname: e.target.value}) }
                    />
                </div>
                <div>
                    <label for="login_in">  Login </label>
                    <input type="text" 
                        id="login_in" 
                        name="login"
                        onChange={(e) => this.setState({login: e.target.value}) }
                    />
                </div>
                <div>
                    <label for="password_in">Password</label>
                    <input type="password" 
                        id="password_in" 
                        name="password"
                        onChange={(e) => this.setState({password: e.target.value}) }
                    />
                </div>
                <div class="button">
                    <button 
                        type="submit"
                        onClick={putUser(this.state.login, this.state.password, this.state.lastname, this.state.firstname)} >S'inscrire</button>
                </div>
            </form>
        </div>)
    }

}

export default SignUp;
