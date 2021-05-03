import React from 'react';

class Mdp extends React.Component {

  render() {
    return 
    <div className="Mot-de-passe-perdu-form">
      <h2>Mot de passe perdu</h2>
       <form action="../api/user" method="put" class="form">
   
         <div class="col-1">
            <label for="login"> Login</label>
            <input type="text" id="login" name="login"/>
         </div>
         <div>
            <label for="mdp_perdu"> Ton ami(e)</label>
            <input type="text" id="mdp_perdu" name="mdp_perdu"/>
         </div>
       </form>
    </div>;
  }
}

export default Mdp;
