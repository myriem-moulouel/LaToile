import React from 'react';
import '../style/App.css';
import axios from 'axios';

function putUser(login, password, lastname, firstname) {
    const response = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
    });
    response.put('/user',{"login":login,"password":password, "lastname":lastname, "firstname":firstname }) 
        .then(res => {
            console.log("oualala",res); // à tester la première fois pour voir ce que retourne le serveur
        })
        .catch( (error) => {
            console.log("mmmmmmmmmmmmm",error);
        });
}

export default putUser;
