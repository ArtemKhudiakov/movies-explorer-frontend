import React from 'react';

function NavTab() {
    return (

        <section className="navtab">
                <ul className="navtab__menu">
                    <li className="navtab__menu-item"><a className="navtab__menu-link"
                                                         href="#about_project">О проекте</a></li>
                    <li className="navtab__menu-item"><a className="navtab__menu-link"
                                                         href="#techs">Технологии</a></li>
                    <li className="navtab__menu-item"><a className="navtab__menu-link"
                                                         href="#about-me">Студент</a></li>
                </ul>
        </section>

    );
}

export default NavTab;
