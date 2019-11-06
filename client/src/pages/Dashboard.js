import React from "react"
import { Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import Nav from "../Components/Nav"

const Dashboard = () => {
    return (
        <>
            <Nav />
                <Switch>
                    {/* <Route path="/dashboard" exact component={Dashboard} /> */}
                    <Route path="/dashboard/profile" component={Profile} />
                </Switch>
        </>
    )
}
export default Dashboard