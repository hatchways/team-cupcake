import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavDialog from '../utils/Dialog';

const useStyles = makeStyles(theme => ({
	nav: {
		display: 'grid',
		gridTemplateColumns: '1fr 4fr 1fr 2fr 1fr',
		placeContent: 'center',
		paddingLeft: '50px',
		// -webkit-box-shadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
		// -moz-box-shadow: '0px 14px 49px -27px rgba(0,0,0,0.75)',
		boxShadow: '0px 14px 49px -27px rgba(0,0,0,0.75)'
	},
	instafy: {
		textDecoration: 'none',
		color: '#000',
		maxHeight: '50px'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	},

	ul: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr) )'
	},

	a: {
		textDecoration: 'none',
		color: '#000',
		display: 'grid',
		placeContent: 'center',
		borderRadius: '4px'
	},

	active: {
		border: '1px solid rgba(179, 179, 179, 0.38)'
	},

	li: {
		listStyle: 'none',
		cursor: 'pointer'
	},
	dialogButton: {
		border: '1px solid #d4d3d3',
		maxHeight: '40px',
		display: 'grid',
		placeSelf: 'center'
	}
}));

const Nav = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const openDialog = () => {
		return setOpen(true)
	}
	const closeDialog = () => {
		return setOpen(false);
	};

	return (
		<>
			<nav className={classes.nav}>
				<NavLink className={classes.instafy} to='/profile'>
					<h2>Instafy</h2>
				</NavLink>

				<TextField
					id='outlined-basic'
					className={classes.textField}
					label='Share and enjoy music '
					margin='normal'
					variant='outlined'
				/>
				<Button className={classes.dialogButton} onClick={openDialog}>Share Music</Button>
				<ul className={classes.ul}>
					<a href='./' className={classes.a}>
						<li className={classes.li}>
							Discover
						</li>
					</a>
					<a href='./' className={classes.a}>
						<li className={classes.li}>
							Massages
						</li>
					</a>
				</ul>
				<div className='thumbnail'>
					<img src='/assets/Profile.png' alt='Logo' />
				</div>
				<NavDialog open={open} close={closeDialog} />
			</nav>
		</>
	);
};
export default Nav;
