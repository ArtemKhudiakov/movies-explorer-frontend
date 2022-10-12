import React from 'react';

function Footer() {
    const year = new Date().getFullYear();
    return (

        <footer className="footer">
            <div className="footer__container">

                <div className="footer__title">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </div>

                <div className="footer__links-container">
                    <p className="footer__year">&copy;&nbsp;{year}</p>
                    <ul className="footer__links">
                        <li className="footer__item"><a href="https://practicum.yandex.ru/" className="footer__link" target="_blank">Яндекс.Практикум</a></li>
                        <li className="footer__item"><a href="https://github.com/ArtemKhudiakov" className="footer__link" target="_blank">Github</a></li>
                    </ul>
                </div>
            </div>
        </footer>

    );
}

export default Footer;