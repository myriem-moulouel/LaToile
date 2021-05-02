import React from 'react';
import { GoZap } from 'react-icons/go';
import '../style/Header.css'

const Header = () => {
    return (
        <header>
            
            <div className="entete">
                <logo> <GoZap className="logo" alt="logo" /> </logo>
                <h1> LaToile </h1>
            </div>
           
        </header>
        )
}
export default Header;
