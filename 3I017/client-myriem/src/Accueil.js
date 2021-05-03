import React from 'react';

/*const Accueil = (props) =>*/
class Accueil extends React.Component {
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
            <div className="Accueil">
                <div className="btns">
                    <p>Bonjour! Soyez les bienvenues !</p>

                    <button onClick={this.accesAuformulaireI} className="btn-welcome">INSCRIPTION</button>
                    <button onClick={this.accesAuformulaireL} className="btn-welcome" >CONNEXION</button>
                </div>
               

            </div>

        );

    }

}


export default Accueil
