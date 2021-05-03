import React from "react";
import "../style/barreGauche.css";
import { GoZap } from 'react-icons/go';
import BarreOption from "./barreOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Group from "@material-ui/icons/Group";
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { TiGroupOutline, TiGroup } from "react-icons/ti";

import TweetBox from './TweetBox';
import '../style/Myaccueil.css'
import Page from './Page'

const tweetBox = () => {
    return <TweetBox />
}

function BarreGauche({ activate, accedeHome, accedeProfile, accedeMessages, accedeFollowers, accedeFollowings, setLogout, deleteUser, lastname, firstname, login, messages, getMessage }) {
    console.log(activate);
    return (
        <div>
            <div className="Myaccueil">
                { activate === 'Home' && 
                    <div className="barre">
                        <GoZap className="barre__twitterIcon" />
                        <BarreOption active Icon={HomeIcon} text="Home" accede={accedeHome} />
                        <BarreOption Icon={PermIdentityIcon} text="Profile" accede={accedeProfile}/>
                        <BarreOption Icon={MailOutlineIcon} text="Messages" accede={accedeMessages} />
                        <BarreOption Icon={Group} text="Followers" accede={accedeFollowers} />
                        <BarreOption Icon={GroupAdd} text="Followings" accede={accedeFollowings} />
                        <BarreOption Icon={ExitToAppIcon} text="Exit" accede={setLogout} />
                        {/* Button -> Tweet */}
                        <Button variant="outlined" className="barre__tweet" fullWidth type="submit" onClick={tweetBox}> 
                            Tweet
                        </Button>
                    </div>
                }
                { activate === 'Profile' &&
                    <div className="barre">
                        <GoZap className="barre__twitterIcon" />
                        <BarreOption Icon={HomeIcon} text="Home" accede={accedeHome} />
                        <BarreOption active Icon={PermIdentityIcon} text="Profile" accede={accedeProfile} />
                        <BarreOption Icon={MailOutlineIcon} text="Messages" accede={accedeMessages} />
                        <BarreOption Icon={Group} text="Followers" accede={accedeFollowers} />
                        <BarreOption Icon={GroupAdd} text="Followings" accede={accedeFollowings} />
                        <BarreOption Icon={ExitToAppIcon} text="Exit" accede={setLogout} />
                        {/* Button -> Tweet */}
                        <Button variant="outlined" className="barre__tweet" fullWidth type="submit" onClick={tweetBox}> 
                            Tweet
                        </Button>
                    </div>
                }
                { activate === 'Messages' &&
                    <div className="barre">
                        <GoZap className="barre__twitterIcon" />
                        <BarreOption Icon={HomeIcon} text="Home" accede={accedeHome} />
                        <BarreOption Icon={PermIdentityIcon} text="Profile" accede={accedeProfile} />
                        <BarreOption active Icon={MailOutlineIcon} text="Messages" accede={accedeMessages} />
                        <BarreOption Icon={Group} text="Followers" accede={accedeFollowers} />
                        <BarreOption Icon={GroupAdd} text="Followings" accede={accedeFollowings} />
                        <BarreOption Icon={ExitToAppIcon} text="Exit" accede={setLogout} />
                        {/* Button -> Tweet */}
                        <Button variant="outlined" className="barre__tweet" fullWidth type="submit" onClick={tweetBox}> 
                            Tweet
                        </Button>
                    </div>
                }
                { activate === 'Followers' &&
                    <div className="barre">
                        <GoZap className="barre__twitterIcon" />
                        <BarreOption Icon={HomeIcon} text="Home" accede={accedeHome} />
                        <BarreOption Icon={PermIdentityIcon} text="Profile" accede={accedeProfile} />
                        <BarreOption Icon={MailOutlineIcon} text="Messages" accede={accedeMessages} />
                        <BarreOption active Icon={Group} text="Followers" accede={accedeFollowers} />
                        <BarreOption Icon={GroupAdd} text="Followings" accede={accedeFollowings} />
                        <BarreOption Icon={ExitToAppIcon} text="Exit" accede={setLogout} />
                        {/* Button -> Tweet */}
                        <Button variant="outlined" className="barre__tweet" fullWidth type="submit" onClick={tweetBox}> 
                            Tweet
                        </Button>
                    </div>
                }
                { activate === 'Followings' &&
                    <div className="barre">
                        <GoZap className="barre__twitterIcon" />
                        <BarreOption Icon={HomeIcon} text="Home" accede={accedeHome} />
                        <BarreOption Icon={PermIdentityIcon} text="Profile" accede={accedeProfile} />
                        <BarreOption Icon={MailOutlineIcon} text="Messages" accede={accedeMessages} />
                        <BarreOption Icon={Group} text="Followers" accede={accedeFollowers} />
                        <BarreOption active Icon={GroupAdd} text="Followings" accede={accedeFollowings} />
                        <BarreOption Icon={ExitToAppIcon} text="Exit" accede={setLogout} />
                        {/* Button -> Tweet */}
                        <Button variant="outlined" className="barre__tweet" fullWidth type="submit" onClick={tweetBox}> 
                            Tweet
                        </Button>
                    </div>
                }
                <div>
                    <Page activate={activate} lastname={lastname} firstname={firstname} login={login} messages={messages} />
                </div>   
            </div>
        </div>
    );
};

export default BarreGauche;
