import React from 'react';
import BarreGauche from './BarreGauche';
import Post from './Post'
import Feed from './Feed'
import Widgets from './Widgets'
import Myaccueil from './Myaccueil'

function MessagesPage({lastname, firstname, login, activate}) {
    return <div>
        <Myaccueil />
        <Feed lastname={lastname} firstname={firstname} login={login} />
        <BarreGauche activate={activate} />
        <Widgets />
    </div>;
}

export default MessagesPage;
