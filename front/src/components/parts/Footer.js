import homeIcon from "../../assets/img/5974636.png";
import taskIcon from "../../assets/img/task.png";
import friendsIcon from "../../assets/img/friends.png";
import moneyIcon from "../../assets/img/airodrop_.png";
import React from "react";
import {Link} from "react-router-dom";

export function Footer(){
    return (
        <footer>
            <div className="nav-icons">
                <div className="icon"><Link to={'/main'}> <img src={homeIcon} alt="Home"/></Link></div>
                <div className="icon"><Link to={"/tasks"}> <img src={taskIcon} alt="List"/></Link></div>
                <div className="icon"><Link to={"/friends"}> <img src={friendsIcon} alt="User"/></Link></div>
                <div className="icon"><Link to={"/rewards"}><img src={moneyIcon} alt="Money"/></Link></div>
            </div>
        </footer>
    )
}