import React from 'react';
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
	}
}));

const Nav = () => {
	const classes = useStyles();

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
				<NavDialog label={'Share Music'} />
				<ul className={classes.ul}>
					<a href='./' className={classes.a}>
						<li className={classes.li}>
							<NavDialog label={'Discover'} />
						</li>
					</a>
					<a href='./' className={classes.a}>
						<li className={classes.li}>
							<NavDialog label={'Massages'} />
						</li>
					</a>
				</ul>
				<div className='thumbnail'>
					<img src='/assets/Profile.png' alt='Logo' />
				</div>
			</nav>
		</>
	);
};
export default Nav;
