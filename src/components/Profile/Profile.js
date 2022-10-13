import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, {useContext, useState, useEffect} from "react";

function Profile({onUpdateProfile, isLoading, onSignOut}) {

    const currentUser = useContext(CurrentUserContext);

    const [userData, setUserData] = useState({
        name: {
            value: "",
            isValid: true,
            errorMessage: ""
        },
        email: {
            value: "",
            isValid: true,
            errorMessage: ""
        }
    });
    const [disabled, setDisabled] = useState(false);
    const isValid = userData.name.isValid && userData.email.isValid;

    useEffect(() => {
        if (
            currentUser.name === userData.name.value &&
            currentUser.email === userData.email.value
        ) {
            setDisabled(true);
        } else if (isValid) {
            setDisabled(false);
        } else if (!isValid) {
            setDisabled(true);
        }
    }, [isValid, currentUser, userData]);

    useEffect(() => {
        isValid === true ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    useEffect(() => {
        setUserData({
            name: {
                value: currentUser.name,
                isValid: true,
                errorMessage: ""
            },
            email: {
                value: currentUser.email,
                isValid: true,
                errorMessage: ""
            }
        });
    }, [currentUser]);

    const handleSubmit = (evt) => {

        evt.preventDefault();
        onUpdateProfile({
            name: userData.name.value,
            email: userData.email.value
        });
    }

    const handleChangeProfile = (evt) => {

        const { name, value, validity, validationMessage } = evt.target;

        setUserData((prevState) => ({
            ...prevState,
            [name]: {
                ...userData[name],
                value,
                isValid: validity.valid,
                errorMessage: validationMessage
            }
        }));
    }



    return (

        <article className="profile">

            <form className="profile__container" onSubmit={handleSubmit} >
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <div className="profile__info">
                    <label className="profile__data">
                    <span className="profile__data-header">Имя</span>
                        <input
                            className="profile__data-text"
                            name="name"
                            type="text"
                            minLength="2"
                            maxLength="30"
                            required
                            value={userData.name.value || ""}
                            onChange={handleChangeProfile}
                        />
                    </label>
                    <span className="profile__line"></span>
                    <label className="profile__data">
                    <span className="profile__data-header">Почта</span>
                        <input
                            className="profile__data-text"
                            name="email"
                            type="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            required
                            value={userData.email.value || ""}
                            onChange={handleChangeProfile}
                        />
                    </label>
                    </div>
                <div className="profile__buttons">

                    <button
                        className="profile__button link-hover"
                        type="submit"
                        disabled={disabled}
                        >
                        Редактировать
                    </button>

                    <button
                        className="profile__button link-hover"
                        type="button"
                        onClick={onSignOut}
                    >
                        Выйти из аккаунта
                    </button>

                </div>
            </form>

        </article>
    );
}

export default Profile;
