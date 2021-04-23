import React from "react";
import "./barreGauche.css";
import TwitterIcon from "@material-ui/icons/Twitter";
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

function BarreGauche() {
    return (
        <div className="barre">
        <TwitterIcon className="barre__twitterIcon" />

        <BarreOption active Icon={HomeIcon} text="Home" />
        <BarreOption Icon={SearchIcon} text="Explore" />
        <BarreOption Icon={NotificationsNoneIcon} text="Notifications" />
        <BarreOption Icon={MailOutlineIcon} text="Messages" />
        <BarreOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        <BarreOption Icon={ListAltIcon} text="Lists" />
        <BarreOption Icon={PermIdentityIcon} text="Profile" />
        <BarreOption Icon={MoreHorizIcon} text="More" />

        {/* Button -> Tweet */}
        <Button variant="outlined" className="barre__tweet" fullWidth>
            Tweet
        </Button>
        </div>
    );
};

export default BarreGauche;
