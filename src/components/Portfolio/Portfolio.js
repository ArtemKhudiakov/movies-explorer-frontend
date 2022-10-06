import React from "react";

function Portfolio() {
    return(

        <section className="portfolio" id='portfolio'>
            <h2 className='portfolio__header'>Портфолио</h2>
            <ul className="portfolio__items">
                <li className="portfolio__item">
                    <a
                        className="portfolio__item-link"
                        href="https://github.com/ArtemKhudiakov/how-to-learn"
                        target="_blank"
                        rel="noreferrer">
                        Статичный сайт
                    </a>
                </li>

                <li className="portfolio__item">
                    <a
                        className="portfolio__item-link"
                        href="https://artemkhudiakov.github.io/russian-travel/"
                        target="_blank"
                        rel="noreferrer">
                        Адаптивный сайт
                    </a>
                </li>

                <li className="portfolio__item">
                    <a
                        className="portfolio__item-link"
                        href="https://github.com/ArtemKhudiakov/react-mesto-api-full"
                        target="_blank"
                        rel="noreferrer">
                        Одностраничное приложение
                    </a>
                </li>
            </ul>
        </section>

    );
}

export default Portfolio;
