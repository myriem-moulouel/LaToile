import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import Accueil from './Accueil';
import Login from './Login';
import Footer from './Footer';
import Header from './Header';

class MainPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login', // valeurs possibles: 'login', 'messages', 'signin',
      isConnected: false,
      restorer:false,
      lastname: 'none',
      firstname: 'none',
      login: -1,
      activate: 'Home'
    }
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

  setConnected = () => {
    this.setState({
      isConnected: true,
      currentPage: 'messages',
    });
  }

  setLogout = () => {
    this.setState({
      isConnected: false,
      currentPage: 'login',
    });
  }

  signup = () => {
    this.setState({ currentPage: 'signup' });
  }

  render() {
    const { isConnected, currentPage } = this.state;

    return <div>
        <Header />
        <NavigationPanel
          isConnected={isConnected}
          login={() => { this.setConnected() }}  
          logout={() => { this.setLogout() }}  
          signup={() => { this.signup() }}
        />
        <main>
          <div>
          {currentPage === 'messages'
            && <MessagesPage lastname={this.state.lastname} firstname={this.state.firstname} login={this.state.login} activate={this.state.activate} />}
          {currentPage === 'signup' 
            && <SignUp />} 
            <h3>Venez nombreux communauté bienveillante :)</h3>
            <Footer />
          </div>
        </main>
      </div>
  }
}

export default MainPage;
