import React from "react"
import { NavLink } from "react-router-dom"
import Following from "../Components/Following";
import headshot from "../assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png";
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
                            <NavLink to="/profile/follow" activeClassName="current"><li>Follow</li></NavLink>
                            <NavLink to="/profile/message" activeClassName="current"><li>Message</li></NavLink>
                        </ul>
                    </div>
                </div>
                <Following />
            </div>
        </>
    )
}
export default Profile