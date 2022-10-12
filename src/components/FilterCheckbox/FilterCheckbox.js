import React from "react";

function FilterCheckbox() {

    return (

        <label className="checkbox" htmlFor="shortfilm">
            <input
                className="checkbox__input"
                id="shortfilm"
                name="checkbox"
                type="checkbox" />
            <span className="checkbox__check"></span>
            <span className="checkbox__title">Короткометражки</span>
        </label>

    );

}

export default FilterCheckbox;
