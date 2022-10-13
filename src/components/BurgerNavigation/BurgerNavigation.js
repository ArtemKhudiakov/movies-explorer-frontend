import React, { useState } from 'react';
import {Link} from "react-router-dom";


function BurgerNavigation() {
    const [isBurgerOpen, setBurgerOpen] = useState(false);

    function toggleBurger() {
        setBurgerOpen(!isBurgerOpen)
    }
    return (

        <div className="burger">
            <button type="button" className="burger__button" onClick={toggleBurger}></button>
            <div className={`menu ${isBurgerOpen && "menu_opened"}`}>
                <div className="burger__container">

                    <button className="burger__close-button" onClick={toggleBurger} type="button" aria-label="Close"></button>
                    <div className="burger__links">

                        <nav className="burger__nav">
                            <Link to="/" className="burger__link" onClick={toggleBurger}>Главная</Link>
                            <Link to="/movies" className="burger__link" onClick={toggleBurger}>Фильмы</Link>
                            <Link to="/saved-movies" className="burger__link" onClick={toggleBurger}>Сохраненные фильмы</Link>
                        </nav>
                        <Link to="/profile" className="burger__profile" onClick={toggleBurger}>
                            Аккаунт
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default BurgerNavigation;
