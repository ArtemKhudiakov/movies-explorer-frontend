import React from "react";
import { useHistory } from "react-router-dom";

function NotFound() {

    const history = useHistory();

    const handleBackClick = () => history.goBack();

    return(

        <main className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
            </div>
            <button
                className="not-found__button"
                onClick={handleBackClick}
            >
                Назад
            </button>
        </main>

    );
}

export default NotFound;
