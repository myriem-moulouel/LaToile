import './App.css';
import MainPage from './MainPage';
import Accueil from './Accueil';

import React from 'react';
import axios from 'axios';


function App() {

  const api = axios.create({
	    baseURL : '/api/',
	    timeout : 1000,
	    headers : {'X-Custom-Header' : 'foobar'}
	});
    
	api.put('/user',{"login":"fdfsdfdsfdsfds","password":"1234", "lastname":"chu", "firstname":"pika"},) 
        .then(response => {
            console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        })
        .catch( (error) => {
            console.log(error);
        });


  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
