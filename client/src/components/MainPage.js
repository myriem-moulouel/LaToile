import React from 'react';
import SignUp from './SignUp';
import FirstPage from './FirstPage';
import Login from './Login';
import Footer from './Footer';
import Header from './Header';
import Myaccueil from './Myaccueil';
import axios from 'axios';

class MainPage extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'FirstPage', // valeurs possibles: 'login', 'messages', 'signin',
            isConnected: false,
            login: -1,
            password: 'none',

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
        console.log(this.state.currentPage)
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

    setMessages = () => {
        this.setState({ activate: 'Messages'})
    }

    setFollowers = () => {
        this.setState({ activate: 'Followers'})
    }

    setFollowings = () => {
        this.setState({ activate: 'Followings'})
    }

    setConnected = (l, p ) => {
        // Mettre axios ici avec un booléen true si connecter on met à jour cette variable avec le this.isConnected
        console.log(`Depuis MainPage login=${l} password=${p}`)
        this.response.post('/user/login', {"login":l, "password":p})
            .then(res => {
                this.setState({
                    isConnected: true,
                    currentPage: 'Myaccueil',
                    login: l,
                    password: p,
            });
            console.log("oualala", res.data); // à tester la première fois pour voir ce que retourne le serveur
        })
        .catch((error) => {
            this.setState({
                isConnected: false,
                currentPage: 'FirstPage',
                login: -1,
                password: 'none',
                lastname: 'none',
                firstname: 'none',
                activate: 'Home'
            })
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
                    firstname: prenom,
                    password: p
                });
                console.log("oualala", res.data); // à tester la première fois pour voir ce que retourne le serveur
            })
            .catch((error) => {
                this.setState({
                    isConnected: false,
                    currentPage: 'FirstPage',
                    login: 'none',
                    lastname: 'none',
                    firstname: 'none',
                    password: 'none'
                });
                console.log("mmmmmmhhhhhhhhhmmmm", error);
            });
    }

    setLogout = () => {
        this.response.get(`/user/${this.state.login}/logout`)
            .then(res => {
                console.log(`${this.state.login}`)
                this.setState({
                    idConnected: false,
                    currentPage: 'FirstPage',
                    login: -1,
                    password: 'none',
                    lastname: 'none',
                    firstname: 'none',
                    activate: 'Home'
                });
                console.log('je me suis deconnecte !');
            })
            .catch((error) => {
                console.log("erreur dans logout ", error)
            })
    }
    
    getUser = (l) => {
        console.log(`recherche de l'utilisateur login=${l}`)
        this.response.get(`/user/${l}`)
            .then(res => {
                console.log("res = ",res);
                this.setState({
                    login: res.data.login,
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

    deleteUser = () => {
        console.log("password = ",this.state.password);
        const password = this.state.password;
        this.response.delete('/user',{ "login": this.state.login, "password": password })
            .then(res => {
                this.setState({
                    isConnected: false,
                    currentPage: 'FirstPage',
                    login: -1,
                    lastname: 'none',
                    firstname: 'none',
                    password: 'none'
                })
                console.log("deleteUser res = ", res.data)
            })
            .catch((error) => {
                console.log("une erreur dans deleteUser ", error)
            })
    }    

    addMessage=(login,msg,img)=>{
        this.response.post(`/message/add/${login}`,{"message":msg,"image":img})
        .then(res => {

            this.setState({
                isConnected: true,
                currentPage: 'Myaccueil',
                login: login,
            });
           // console.log("oualala", res.data); // � tester la premi�re fois pour voir ce que retourne le serveur
        })
     .catch((error) => {
           console.log("mmmmmmmmmmmmm", error);
        });
    }

    

    

    render() {
        return <div>
            <main>
                <Header />
                {this.state.currentPage === 'FirstPage'
                    && <FirstPage acces={ this.accesCurrentPage} />}
                {this.state.currentPage === 'login'
                    && <Login 
                            outil={this.setConnected} 
                            acces={ this.accesCurrentPage} 
                            searching={this.getUser} 
                            logout={this.setLogout} 
                />}
                {this.state.currentPage === 'signup'
                    && <SignUp 
                                outil={this.putUser} 
                                acces={ this.accesCurrentPage} 
                                searching={this.getUser} 
                />}
                {this.state.currentPage === 'Myaccueil'
                    && <Myaccueil login={this.state.login} 
                                firstname={this.state.firstname} 
                                lastname={this.state.lastname} 
                                activate={this.state.activate} 
                                setHome={this.setHome} 
                                setProfile={this.setProfile}
                                setMessages={this.setMessages}
                                setFollowers={this.setFollowers}
                                setFollowings={this.setFollowings}
                                setLogout={this.setLogout} 
                                deleteUser={this.deleteUser}
                                addMessage={this.addMessage}
                />}
            <Footer />
        </main>
      </div>
  }
}

export default MainPage;
