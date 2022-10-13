import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({onSearch, onSubmitCheckbox}) {
    const location = useLocation();
    const [clickedCheckbox, setClickedCheckbox] = useState(false);
    const [inputValue, setInputValue] = useState(false);

    const [searchError, setSearchError] = useState({
        isValid: true,
        errorMessage: ""
    });

    useEffect(() => {
        searchError.isValid && setSearchError({errorMessage: "", isValid: true});
    }, []);

    useEffect(() => {

        if (location.pathname === "/movies") {
            setInputValue(localStorage.getItem("searchWord"));
            setClickedCheckbox(JSON.parse(localStorage.getItem("checkboxStatus")));
        } else if (location.pathname === "/saved-movies")
        {
            const checkboxSaved = JSON.parse(localStorage.getItem("checkboxStatusSavedMovies"));
            setClickedCheckbox(checkboxSaved);
            onSubmitCheckbox(checkboxSaved);
        }

    }, [location]);


    function handleInputChange(evt) {

        setInputValue(evt.target.value);

        if (evt.target.value.length === 0) {
            setSearchError({
                isValid: evt.target.validity.valid,
                errorMessage: "Нужно ввести ключевое слово"
            });
        } else {
            setSearchError({
                isValid: evt.target.validity.valid,
                errorMessage: ""
            });
        }
    }

    function handleSubmitSearch(evt) {

        evt.preventDefault();

        if (!inputValue) {
            console.log(inputValue)
            return setSearchError({
                isValid: false,
                errorMessage: "Нужно ввести ключевое слово"
            });
        }

        onSearch(inputValue, clickedCheckbox);
    }

    function handleChangeCheckbox() {

        setClickedCheckbox(!clickedCheckbox);
        onSubmitCheckbox(!clickedCheckbox);
    }


    return (

        <form className="search__form" onSubmit={handleSubmitSearch} noValidate>

            <input
                type="text"
                className="search__input"
                name="film"
                required
                placeholder="Фильм"
                onChange={handleInputChange}
                value={inputValue || ""}
            />
            <button
                className="search__button"
                type="submit"
            >Поиск</button>
            <span className="search__error">{searchError.errorMessage}</span>
            <FilterCheckbox isClicked={clickedCheckbox} onSubmitCheckbox={handleChangeCheckbox}/>
        </form>

    );
}

export default SearchForm;
