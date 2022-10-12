import React, {useEffect, useState} from 'react';
import Form from "../Form/Form";

function Login( {onLogin, isLoading} ) {

const INPUTS = [

    {
        key: 1,
        type: 'text',
        name: 'name',
        label: 'Имя',
        placeholder: 'Artem',
        required: true,
    },
    {
        key: 1,
        type: 'email',
        name: 'email',
        label: 'E-mail',
        placeholder: 'E-mail',
        required: true,
    },
    {
        key: 2,
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        require: true,
    }
];

const LINK = {
    title: 'Регистрация',
    path: '/signup',
}
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
    const isValid = userData.email.isValid && userData.password.isValid;


    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    useEffect(() => {
        isValid ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    const handleChange = (evt) => {
        // console.log(isValid)
        console.log(isDisabled)
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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin({
            email: userData.email.value,
            password: userData.password.value
        });
        setUserData({email: '', password: ''});
    }
    return (
        <article className="login">
            <Form
                name="auth"
                title='Рады видеть!'
                inputs={INPUTS}
                button='Войти'
                text='Еще не зарегистрированы?'
                link={LINK}
                onSubmit={handleSubmit}
                userData={userData}
                onChange={handleChange}
                isDisabled={isDisabled}
            />
        </article>
    );
}

export default Login;