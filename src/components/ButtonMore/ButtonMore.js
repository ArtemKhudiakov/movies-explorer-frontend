import React from "react";

function ButtonMore({onClick}) {

    return (
        <div className="button__container">
            <button type="button" className="button-more" onClick={onClick}>Еще</button>
        </div>
    )
}

export default ButtonMore;