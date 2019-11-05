import React from "react"
import { NavLink } from "react-router-dom"
import Follow from "./Follow";
import Message from "./Message";

import { Route, Switch } from "react-router-dom";
import headshot from "./headshot.jpg";
import "./Profile.css"

const Profile = () => {
    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <div className="headshot-container">
                        <img src={headshot} alt="Logo" />
                    </div>
                    <div className="name-container">
                        <h3>Jennifer</h3>
                        <h6>Music Lover</h6>
                        <div>
                            <span>130K Followers</span>
                            <span>340 Following</span>
                        </div>
                    </div>
                    <div className="follow-container">
                        <ul>
                            <NavLink to="/dashboard/profile/follow" activeClassName="current"><li>Follow</li></NavLink>
                            <NavLink to="/dashboard/profile/message" activeClassName="current"><li>Message</li></NavLink>
                        </ul>
                    </div>
                </div>

                <div>
                    <Switch>
                        <Route path="/dashboard/profile/follow" component={Follow} />
                        <Route path="/dashboard/profile/message" component={Message} />
                    </Switch>
                </div>
            </div>
        </>
    )
}
export default Profile