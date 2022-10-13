import React, {useEffect, useState} from 'react';
import Form from '../Form/Form';

function Register( {onRegister, isLoading} ) {

    const [userData, setUserData] = useState({

        name: {

            value: "",
            isValid: false,
            errorMessage: ""

        },
        email: {

            value: "",
            isValid: false,
            errorMessage: ""

        },
        password: {

            value: "",
            isValid: false,
            errorMessage: ""

        }
    });

    const [isDisabled, setDisabled] = useState(false);

    const isValid =
        userData.name.isValid &&
        userData.email.isValid &&
        userData.password.isValid;


    useEffect(() => {
        isValid ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    const INPUTS = [
        {
            key: 1,
            type: 'text',
            name: 'name',
            label: 'Имя',
            placeholder: 'Имя',
            required: true,
        },
        {
            key: 2,
            type: 'email',
            name: 'email',
            label: 'E-mail',
            placeholder: 'example@yandex.ru',
            required: true,
        },
        {
            key: 3,
            type: 'password',
            name: 'password',
            label: 'Пароль',
            placeholder: '********',
            require: true,
        }
    ];

    const LINK = {
        title: 'Войти',
        path: '/signin',
    }
    const handleSubmit = (evt) => {

        evt.preventDefault();
        onRegister({
            name: userData.name.value,
            email: userData.email.value,
            password: userData.password.value
        });
    }

    const handleChange = (evt) => {

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
        <article className="register">
            <Form
                name="register"
                title='Добро пожаловать!'
                inputs={INPUTS}
                button='Зарегистрироваться'
                text='Уже зарегистрированы?'
                link={LINK}
                onSubmit={handleSubmit}
                userData={userData}
                onChange={handleChange}
                isDisabled={isDisabled}
            />
        </article>
    );
}

export default Register;
