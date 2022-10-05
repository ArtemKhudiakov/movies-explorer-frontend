import React from "react";

function Button({ onClick }) {

    return(
        <button
            className="button"
            title="Открыть меню"
            type="button"
            onClick={ onClick }/>
    )

}

export default Button;
