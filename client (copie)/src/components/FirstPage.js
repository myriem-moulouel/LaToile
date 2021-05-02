import React from 'react';
import mainImage from '../images/twitter.png';
import '../style/FirstPage.css';

class FirstPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: '',
        }
    }

    connexion = (l) => {
        <div>
            <p> l</p>

        </div>
    }


    accesAuformulaireL = (e) => {

        //this.setState({ page: 'login' })
        //console.log(this.state.page)
        console.log(this.props.acces('login'))
    }
    accesAuformulaireI = (e) => {

        //this.setState({ page: 'login' })
        //console.log(this.state.page)
        console.log(this.props.acces('signup'))
    }
    render() {
        return (
            <div className="firstPage">
                <img className="mainImage" src={mainImage} />
                <div className="welcome">
                    <h2>Venez nombreux communauté bienveillante :)</h2>
                    <h3>Rejoignez-nous.</h3>
                    <button onClick={this.accesAuformulaireI} className="btn-welcome">S'inscrire</button>
                    <button onClick={this.accesAuformulaireL} className="btn-welcome" >Se connecter</button>
                </div>


            </div>

        );

    }

}
export default FirstPage
