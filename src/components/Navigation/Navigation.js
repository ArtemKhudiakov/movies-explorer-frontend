import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (

        <nav className="nav">
            <ul className="nav__links">
                <li className="nav__links-item">
                    <Link
                        to="/movies"
                        className="nav__link nav__link_movies"
                    >
                        Фильмы
                    </Link>
                </li>
                <li className="nav__links-item">
                    <Link
                        to="/saved-movies"
                        className="nav__link nav__link_saved-movies"
                    >
                        Сохраненные фильмы
                    </Link>

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