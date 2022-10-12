import React from 'react';
import { NavLink } from 'react-router-dom';

function PromoNavigation() {

    return (
        <nav className="promo__links">
            <ul className="promo__list">
                <li className="promo__link">
                    <NavLink
                        to="/signup"
                        className="promo__url"
                    >
                        Регистрация
                    </NavLink>
                </li>
                <li className="promo__link">
                    <NavLink
                        to="/signin"
                        className="promo__url button-link"
                    >
                        Войти
                    </NavLink>
                </li>
            </ul>
        </nav>

    );
}

export default PromoNavigation;