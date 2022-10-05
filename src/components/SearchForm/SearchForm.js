import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

    return (
        <form className="search-form">
            <input
                type="text"
                className="search__input"
                name="film"
                required
                placeholder="Фильм"
            />
            <button
                className="search__button"
                type="submit"
            >Поиск</button>
            <FilterCheckbox />
        </form>

    );
}

export default SearchForm;