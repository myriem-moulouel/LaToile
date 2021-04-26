import React from 'react';
import './App.css';
import axios from 'axios';

function postLogin( login, password) {
    const response = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
    });
    response.post('/user/login',{"login":{login},"password":{password} }) 
        .then(res => {
            console.log("oualala",res); // à tester la première fois pour voir ce que retourne le serveur
        })
        .catch( (error) => {
            console.log("mmmmmmmmmmmmm",error);
        });
}

export default postLogin;
