const user = {
    name: 'Виталий',
    email: 'pochta@yandex.ru',
};

function ProfileData({ header, children }) {

    return (
        <div className="profile__data">
            <div className="profile__data-header">{header}</div>
            <div className="profile__data-text">{children}</div>
        </div>
    );
}

function Profile() {

    return (

        <article className="profile">

            <div className="profile__container">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <div className="profile__info">
                    <ProfileData header="Имя">{user.name}</ProfileData>
                    <span className="profile__line" />
                    <ProfileData header="Email">{user.email}</ProfileData>
                </div>
                <div className="profile__buttons">

                    <button
                        className="profile__button link-hover"
                        type="button"
                    >
                        Редактировать
                    </button>

                    <button
                        className="profile__button link-hover"
                        type="button"
                    >
                        Выйти из аккаунта
                    </button>

                </div>
            </div>

        </article>
    );
}

export default Profile;
