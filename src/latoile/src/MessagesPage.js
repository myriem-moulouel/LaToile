import React from 'react';
import BarreGauche from './BarreGauche';
import Post from './Post'
import Feed from './Feed'
import Widgets from './Widgets'

function MessagesPage({lastname, firstname, login}) {
    return <div>
        <Feed lastname={lastname} firstname={firstname} login={login}/>
        <BarreGauche />
        <Widgets />
      
      
    </div>;
}

export default MessagesPage;
