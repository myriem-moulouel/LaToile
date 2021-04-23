import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';

class MainPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login', // valeurs possibles: 'login', 'messages', 'signin',
      isConnected: false,
      restorer:false,
    }
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
        <h1>Birdy !</h1>
        <NavigationPanel
          isConnected={isConnected}
          login={() => { this.setConnected() }}  
          logout={() => { this.setLogout() }}  
          signup={() => { this.signup() }}
          mdp={() => { this.restaurer() }}
        />
        <main>
          <div>
          {currentPage === 'messages'
            && <MessagesPage />}
          {currentPage === 'signup' 
            && <SignUp />} 
            <p>Venez nombreux communauté bienveillante :)</p>
          </div>
        </main>
      </div>
  }
}

export default MainPage;
