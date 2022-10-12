import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import PromoNavigation from '../PromoNavigation/PromoNavigation';
import logo from '../../images/logo.svg';

function Header ({ isLoggedIn }) {
    const location = useLocation().pathname;

    return (

        <header className={(window.location.pathname !== '/') ? 'header header_dark' : 'header'}>

            <Link to="/" className="header__logo-link">
                        <img className="header__logo" src={logo} alt="Movies Explorer" />
                </Link>

                {isLoggedIn ? <Navigation /> : <PromoNavigation />}

        </header>

    );
}

export default Header;
