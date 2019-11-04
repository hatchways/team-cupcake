import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import headshot from "./headshot.jpg";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Nav = () => {
    const classes = useStyles();
    return (
        <>
            <nav>
                <h2>Instafy</h2>
                <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    label="Share and enjoy music "
                    margin="normal"
                    variant="outlined"
                    />
                <ul>
                    <li className="active"><Link>Share music</Link></li>
                    <li><Link>Discover</Link></li>
                    <li><Link>Messages</Link></li>
                </ul>
                <div className="thumbnail">
                <img src={headshot} alt="Logo" />
                </div>
            </nav>
        </>
    )
}
export default Nav