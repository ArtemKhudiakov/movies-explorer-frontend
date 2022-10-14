import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function Navigation() {
    return (

        <nav className="nav">
            <ul className="nav__links">
                <li className="nav__links-item">
                    <NavLink
                        to="/movies"
                        className="nav__link"
                        activeClassName="nav__link_active"
                    >
                        Фильмы
                    </NavLink>
                </li>
                <li className="nav__links-item">
                    <NavLink
                        className="nav__link"
                        activeClassName="nav__link_active"
                    >
                        Сохраненные фильмы
                    </NavLink>

                </li>
                <li className="nav__links-item">
            <Link
                to="/profile"
                className="nav__link nav__link_profile"
            >
                Аккаунт
            </Link>
                </li>
            </ul>
        </nav>

    );
};

export default Navigation;