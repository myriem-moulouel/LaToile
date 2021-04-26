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

import TweetBox from './TweetBox';

const tweetBox = () => {
    return <TweetBox />
}

function BarreGauche({ activate }) {
    return (
        <div className="barre" style={{width: 300, minHeight: 100 }}>
            <GoZap className="barre__twitterIcon" />
            { activate === 'Home' && 
                <div>
                <BarreOption active Icon={HomeIcon} text="Home" />
                <BarreOption Icon={PermIdentityIcon} text="Profile" />
                </div>
            }
            { activate === 'Profile' &&
                <div>
                <BarreOption Icon={HomeIcon} text="Home" />
                <BarreOption active Icon={PermIdentityIcon} text="Profile" />
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
