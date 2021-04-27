import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import Accueil from './Accueil';
import Login from './Login';
import Footer from './Footer';
import Header from './Header';
import Myaccueil from './Myaccueil';
import axios from 'axios';

class MainPage extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'Accueil', // valeurs possibles: 'login', 'messages', 'signin',
            isConnected: false,
            login: -1,

            restorer:false,
            lastname: 'none',
            firstname: 'none',
            
            activate: 'Home'
        }
    }
    
    response = axios.create({
        baseURL: '/api',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    accesCurrentPage = (l) => {
        console.log(Accueil)
        this.setState({ currentPage:l})
    }

    setMyaccueil = (l, p) => {
        this.setState({ currentPage: 'Myaccueil' })
    }


    setLastname = (lastname) => {
        this.state.lastname = {lastname}
    }
    setFirstname = (firstname) => {
        this.state.firstname = {firstname}
    }
    setLogin = (login) => {
        this.state.login = {login}
    }

    setHome = () => {
        this.setState({ activate: 'Home'})
    }
    setProfile = () => {
        this.setState({ activate: 'Profile'})
    }

    setConnected = (l, p ) => {
        // Mettre axios ici avec un booléen true si connecter on met à jour cette variable avec le this.isConnected
        console.log(`Depuis MainPage login=${l} password=${p}`)
        this.response.post('/user/login', {"login":l, "password":p})
            .then(res => {
                this.setState({
                    isConnected: true,
                    currentPage: 'Myaccueil',
                    login: l
            });
            console.log("oualala", res.data); // à tester la première fois pour voir ce que retourne le serveur
        })
        .catch((error) => {
            console.log("mmmmmmmmmmmmmm", error);
        });
    }

    putUser = (l, p, nom, prenom ) => {
        // Mettre axios ici avec un booléen true si connecter on met à jour cette variable avec le this.isConnected
        console.log(`Depuis MainPage login=${l} password=${p} firstname=${prenom} lastname=${nom}`)
        this.response.put('/user', {"login":l, "password":p, "lastname":nom, "firstname":prenom})
            .then(res => {
                this.setState({
                    isConnected: true,
                    currentPage: 'Myaccueil',
                    login: l,
                    lastname: nom,
                    firstname: prenom
                });
                console.log("oualala", res.data); // à tester la première fois pour voir ce que retourne le serveur
            })
            .catch((error) => {
                console.log("mmmmmmhhhhhhhhhmmmm", error);
            });
    }

    setLogout = () => {
        this.setState({
            isConnected: false,
            currentPage: 'login',
        });
    }
    
    getUser = (l) => {
        console.log(`recherche de l'utilisateur login=${l}`)
        this.response.get(`/user/${l}`)
            .then(res => {
                console.log("res = ",res);
                this.setState({
                    currentPage: 'Myaccueil',
                    login: res.data.login,
                    password: res.data.password,
                    lastname: res.data.lastname,
                    firstname: res.data.firstname
                })
                console.log("res = ",res.data);
            })
            .catch((error) => {
                console.log("une erreur dans getUser ", error);
            });
    }

  signup = () => {
    this.setState({ currentPage: 'signup' });
  }

    

    render() {
        const { isConnected, currentPage } = this.state;

        return <div>
            <main>
                <Header />
                    {currentPage === 'Accueil'
                        && <Accueil acces={ this.accesCurrentPage} />}
                    {currentPage === 'login'
                        && <Login outil={this.setConnected} acces={ this.accesCurrentPage} searching={this.getUser} />}
                    {currentPage === 'signup'
                        && <SignUp outil={this.putUser} acces={ this.accesCurrentPage} searching={this.getUser} />}
                    {currentPage === 'Myaccueil'
                        && <Myaccueil login={this.state.login} firstname={this.state.firstname} lastname={this.state.lastname} activate={this.state.activate} setHome={this.setHome} setProfile={this.setProfile} />}
                    {currentPage === 'messages'
                    && <MessagesPage lastname={this.state.lastname} firstname={this.state.firstname} login={this.state.login} activate={this.state.activate} />}
            <h3>Venez nombreux communauté bienveillante :)</h3>
            <Footer />
        </main>
      </div>
  }
}

export default MainPage;
