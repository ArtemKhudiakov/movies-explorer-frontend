import React from "react";
import closeIcon from '../../images/Close_Icon.svg';

function InfoToolTip({isOpen, onClose, text}) {

    return (
        <div className={`popup ${isOpen ? `popup_opened`: ""}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose}>
                    <img className="popup__close-svg" src={closeIcon} alt="Крестик" />
                </button>
                <h2 className="popup__text">{text}</h2>
            </div>
        </div>
    )
}

export default InfoToolTip;