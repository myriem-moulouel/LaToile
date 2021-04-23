import React from 'react'
import './App.css';
import axios from 'axios';



class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            lastname: '',
            firstname: '',
            login: '',
            password: '',
        }
    }
     
    api = axios.put('/api/user',{"lastname":"lolo", "firstname":"lili", "login":1, "password":"mm"},)
        .then((response) => {
            console.log("successful insert ",response);
        }).catch((error) => {
            console.log(error);
        })

    api
    setLastname = (reqlastname) => {
        this.setState({
            lastname: reqlastname.target.value
        });
    }

    setFirstname = (reqfistname) => {
        this.setState({
            firstname: reqfistname.target.value
        });
    }

    showValue = () => {
        alert('lastname '+ this.state.lastname + ' firstname ' + this.state.firstname)
    }

    render() {
        return <div className="LoginForm">
            <h2>Inscription</h2>
            <form action="../api/user" method="put" class="form">

                <div class="col-1">
                    <label for="lastname"> Lastname</label>
                    <input 
                        type="text" 
                        id="lastname" 
                        name="lastname" 
                        onChange={this.setLastname.bind(this)}
                    />
                </div>
                <div>
                    <label for="firstname"> Firstname</label>
                    <input type="text" 
                        id="firstname" 
                        name="firstname"
                        onChange={this.setFirstname.bind(this)}
                    />
                </div>
                <div>
                    <label for="login_in">  Login </label>
                    <input type="text" id="login_in" name="login"/>
                </div>
                <div>
                    <label for="password_in">Password</label>
                    <input type="password" id="password_in" name="password"/>
                </div>
                <div class="button">
                    <button onClick={this.createUser} type="submit">S'inscrire</button>
                </div>
            </form>
        </div>;
    }
}

export default SignUp;
