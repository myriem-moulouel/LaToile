import React from "react";
import "./barreGauche.css";
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

const tweetBox = () => {
    return <TweetBox />
}

function BarreGauche({ activate, accedeHome, accedeProfile }) {
    return (
        <div className="barre" style={{width: 300, minHeight: 100 }}>
            <GoZap className="barre__twitterIcon" />
            { activate === 'Home' && 
                <div>
                <BarreOption active Icon={HomeIcon} text="Home" accede={accedeHome} />
                <BarreOption Icon={PermIdentityIcon} text="Profile" accede={accedeProfile}/>
                <BarreOption Icon={MailOutlineIcon} text="Messages" />
                <BarreOption Icon={Group} text="Followers" />
                <BarreOption Icon={GroupAdd} text="Followings" />
                <BarreOption Icon={PersonAddDisabledIcon} text="Delete account" />
                <BarreOption Icon={ExitToAppIcon} text="Exit" />
                
                </div>
            }
            { activate === 'Profile' &&
                <div>
                <BarreOption Icon={HomeIcon} text="Home" accede={accedeHome} />
                <BarreOption active Icon={PermIdentityIcon} text="Profile" accede={accedeProfile} />
                <BarreOption Icon={MailOutlineIcon} text="Messages" />
                <BarreOption Icon={Group} text="followers" />
                <BarreOption Icon={GroupAdd} text="followings" />
                <BarreOption Icon={PersonAddDisabledIcon} text="delete account" />
                <BarreOption Icon={ExitToAppIcon} text="Exit" />
                </div>
            }
            {/* Button -> Tweet */}
            <Button variant="outlined" className="barre__tweet" fullWidth type="submit" onClick={tweetBox}> 
                Tweet
            </Button>
        </div>
    );
};

export default BarreGauche;
