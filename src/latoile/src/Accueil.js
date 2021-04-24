import React from 'react';
import MainPage from './MainPage';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';

const Accueil = () => {
    return (
        <div>
        <h1>LaToile !</h1>
        <Header/>
        <div className="accueil">
            <div className="leftBox">
                <p className="btn-welcome"></p>
            </div>
            
            </div>
            <Footer/>
        </div>
        );
}
export default Accueil;
