import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {

	const auth = useSelector( state => state.auth );

	return (
		<div className="site-navigation text-right text-md-center" role="navigation">
			<div className="container">
				<ul className="site-menu js-clone-nav d-none d-md-block">
					<li className="has-children active">
						<Link to="/">Home</Link>
						<ul className="dropdown">
							<li><Link to="/">Menu One</Link></li>
							<li><Link to="/">Menu Two</Link></li>
							<li><Link to="/">Menu Three</Link></li>
							<li className="has-children">
								<Link to="/">Sub Menu</Link>
								<ul className="dropdown">
									<li><Link to="/">Menu One</Link></li>
									<li><Link to="/">Menu Two</Link></li>
									<li><Link to="/">Menu Three</Link></li>
								</ul>
							</li>
						</ul>
					</li>
					<li className="has-children">
						<Link to="/about">About</Link>
						<ul className="dropdown">
							<li><Link to="/">Menu One</Link></li>
							<li><Link to="/">Menu Two</Link></li>
							<li><Link to="/">Menu Three</Link></li>
						</ul>
					</li>
					<li><Link to="/shop">Shop</Link></li> 
					<li><Link to="/categories">categories</Link></li>
					<li><Link to="/cart">Cart</Link></li> 
					<li><Link to="/shop">New Arrivals</Link></li>
					<li><Link to="/contact">Contact</Link></li>
					{ !auth.isLoggedIn ? 
						<Fragment>
							<li><Link to="/register">Register</Link></li>
							<li><Link to="/login">Login</Link></li>
						</Fragment>
						: 
						<Fragment>
							<li><Link to="/myaccount">Myaccount</Link></li>
						</Fragment>
					}
				</ul>
			</div>
		</div>
	)
}

export default Nav;