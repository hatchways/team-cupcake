import React from "react"
import { NavLink } from "react-router-dom"
import "./Nav.css"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import headshot from "../assets/Profile.png";

const useStyles = makeStyles(theme => ({
    nav: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr 4fr 1fr',
        paddingLeft: '50px',
        // -webkit-box-shadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
        // -moz-box-shadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
        boxShadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

    ul: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr) )',
    },

    a: {
        textDecoration: 'none',
        color: '#000',
        display: 'grid',
        placeContent: 'center',
        borderRadius: '4px',
    },

    active: {
        border: '1px solid rgba(179, 179, 179, 0.38)',
    },

    li: {
        listStyle: 'none',
        cursor: 'pointer'
    }
}));

const Nav = () => {
    const classes = useStyles();

    return (
        <>
            <nav className={classes.nav}>
                <h2>Instafy</h2>
                <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    label="Share and enjoy music "
                    margin="normal"
                    variant="outlined"
                    />
                <ul className={classes.ul}>
                    <NavLink className={classes.a} to="/profile" activeClassName="active"><li className={classes.li}>Share music</li></NavLink>
                    <NavLink className={classes.a} to="/discover" activeClassName="active"><li className={classes.li}>Discover</li></NavLink>
                    <NavLink className={classes.a} to="/messages" activeClassName="active"><li className={classes.li}>Messages</li></NavLink>
                </ul>
                <div className="thumbnail">
                    <img src={headshot} alt="Logo" />
                </div>
            </nav>
        </>
    )
}
export default Nav