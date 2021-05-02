import react from 'react'
import Profile from './Profile'
import Messages from './Messages'
import Followers from './Followers'
import Followings from './Followings'

function Page({ activate, lastname, firstname, login }) {
    if (activate === 'Home'){
        return (
            <div>
                <h1> home </h1>
            </div>
        )
    }
    if (activate === 'Profile'){
        return (
            <div>
                <h1> Profile </h1>
                <Profile lastname={lastname} firstname={firstname} login={login} />
            </div>
        )
    }
    if (activate === 'Messages'){
        return (
            <div>
                <h1> messages </h1>
                <Messages />
            </div>
        )
    }
    if (activate === 'Followers'){
        return (
            <div>
                <h1> Followers </h1>
                <Followers />
            </div>
        )
    }
    if (activate === 'Followings'){
        return (
            <div>
                <h1> Followings </h1>
            </div>
        )
    }
}

export default Page;
