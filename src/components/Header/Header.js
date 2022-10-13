import {useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import PromoNavigation from '../PromoNavigation/PromoNavigation';
import logo from '../../images/logo.svg';
import BurgerNavigation from '../BurgerNavigation/BurgerNavigation';
import {WIDTH_1000} from '../../utils/constants'


function Header ({ isLoggedIn }) {
    const location = useLocation().pathname;

    const [width, setWidth] = useState(0);

    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
    }, []);

    return (
        <header className={(window.location.pathname !== '/') ? 'header header_dark' : 'header'}>
<div className="header__container">
            <Link to="/" className="header__logo-link">
                        <img className="header__logo" src={logo} alt="Movies Explorer" />
                </Link>
                {isLoggedIn ? <Navigation /> : <PromoNavigation />}
                {isLoggedIn&&(window.innerWidth<WIDTH_1000) ? <BurgerNavigation /> : null}
</div>
        </header>

    );
}

export default Header;
